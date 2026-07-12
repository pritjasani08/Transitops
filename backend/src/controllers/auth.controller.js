const db = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

const otpStore = new Map(); // Simple in-memory store for hackathon

// Setup nodemailer transporter using env vars
const getTransporter = () => {
  return nodemailer.createTransport({
    host: 'smtp.gmail.com', // fallback
    port: 587,
    secure: false,
    auth: {
      user: process.env.SMTP_USER || process.env.SMTP_EMAIL,
      pass: process.env.SMTP_PASS || process.env.SMTP_PASSWORD
    }
  });
};

exports.sendOtp = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return res.status(400).json({ success: false, message: 'Email is required' });

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    otpStore.set(email, { otp, expiresAt: Date.now() + 10 * 60 * 1000 }); // 10 min expiration

    const transporter = getTransporter();
    
    await transporter.sendMail({
      from: `"TransitHub" <${process.env.SMTP_USER || process.env.SMTP_EMAIL}>`,
      to: email,
      subject: "Your TransitHub Registration OTP",
      text: `Your One-Time Password for registration is: ${otp}. It will expire in 10 minutes.`,
      html: `<h3>Welcome to TransitHub</h3><p>Your One-Time Password for registration is: <strong>${otp}</strong></p><p>It will expire in 10 minutes.</p>`
    });

    res.json({ success: true, message: 'OTP sent successfully to ' + email });
  } catch (error) {
    console.error("Failed to send OTP:", error);
    res.status(500).json({ success: false, message: 'Failed to send OTP email. Check SMTP credentials.' });
  }
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, role, otp } = req.body;
    
    if (!otp) {
      return res.status(400).json({ success: false, message: 'OTP is required for registration' });
    }

    const storedOtpData = otpStore.get(email);
    if (!storedOtpData || storedOtpData.otp !== otp || Date.now() > storedOtpData.expiresAt) {
      return res.status(400).json({ success: false, message: 'Invalid or expired OTP' });
    }

    // Split name into first_name and last_name
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(' ') : '';

    // Check if user exists
    const existingUser = await db.query('SELECT id FROM users WHERE email = ?', [email]);
    if (existingUser.rows.length > 0) {
      return res.status(409).json({ success: false, message: 'Email already exists', errors: [] });
    }

    // Map role format: "fleet_manager" -> "Fleet Manager"
    const formattedRoleName = role.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');

    // Get role id
    const roleRecord = await db.query('SELECT id FROM roles WHERE name = ?', [formattedRoleName]);
    const roleId = roleRecord.rows.length > 0 ? roleRecord.rows[0].id : null;

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Generate UUID
    const newUserId = crypto.randomUUID();

    // Insert user
    await db.query(
      `INSERT INTO users (id, first_name, last_name, email, password, role_id) 
       VALUES (?, ?, ?, ?, ?, ?)`,
      [newUserId, firstName, lastName, email, hashedPassword, roleId]
    );

    const token = jwt.sign(
      { id: newUserId, role: role },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    // Clear OTP after successful use
    otpStore.delete(email);

    res.json({
      success: true,
      message: 'Registration successful',
      data: {
        token,
        user: { id: newUserId, email, first_name: firstName, last_name: lastName, role }
      }
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await db.query(`
      SELECT u.*, r.name as role_name 
      FROM users u 
      LEFT JOIN roles r ON u.role_id = r.id 
      WHERE u.email = ?
    `, [email]);

    if (result.rows.length === 0) {
      return res.status(401).json({ success: false, message: 'Invalid credentials', errors: [] });
    }

    const user = result.rows[0];

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: 'Invalid credentials', errors: [] });
    }

    if (user.status !== 'active') {
      return res.status(403).json({ success: false, message: 'Account is locked or inactive', errors: [] });
    }

    // Map DB role back to frontend role format (e.g. "Fleet Manager" -> "fleet_manager")
    const formattedRole = user.role_name ? user.role_name.toLowerCase().replace(' ', '_') : 'fleet_manager';

    const token = jwt.sign(
      { id: user.id, role: formattedRole },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '24h' }
    );

    // Update last login
    await db.query('UPDATE users SET last_login = CURRENT_TIMESTAMP WHERE id = ?', [user.id]);

    res.json({
      success: true,
      message: 'Login successful',
      data: {
        token,
        user: {
          id: user.id,
          name: `${user.first_name} ${user.last_name}`,
          email: user.email,
          role: formattedRole
        }
      }
    });
  } catch (error) {
    next(error);
  }
};
