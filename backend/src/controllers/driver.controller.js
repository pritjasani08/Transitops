const BaseRepository = require('../repositories/base.repository');
const repo = new BaseRepository('drivers');
const db = require('../config/db');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

exports.create = async (req, res, next) => {
  try {
    const driverData = req.body;
    
    // Generate a unique email and password for the driver
    const driverFirstName = driverData.driver_name.split(' ')[0] || 'Driver';
    const driverLastName = driverData.driver_name.split(' ').slice(1).join(' ') || '';
    
    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const email = `${driverFirstName.toLowerCase()}${randomSuffix}@transithub.com`;
    const password = `Driver@${randomSuffix}`;
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    
    const newUserId = crypto.randomUUID();
    
    // Attempt to get Driver role id
    const roleRecord = await db.query('SELECT id FROM roles WHERE name = ?', ['Driver']);
    let roleId = null;
    
    if (roleRecord.rows.length > 0) {
      roleId = roleRecord.rows[0].id;
    } else {
      // Create role if doesn't exist (failsafe for hackathon)
      const newRoleId = crypto.randomUUID();
      await db.query('INSERT INTO roles (id, name, description) VALUES (?, ?, ?)', [newRoleId, 'Driver', 'Driver Role']);
      roleId = newRoleId;
    }
    
    // Insert user
    await db.query(
      `INSERT INTO users (id, first_name, last_name, email, password, role_id) VALUES (?, ?, ?, ?, ?, ?)`,
      [newUserId, driverFirstName, driverLastName, email, hashedPassword, roleId]
    );
    
    // Add user_id to driver payload
    driverData.user_id = newUserId;
    
    const data = await repo.create(driverData);
    
    // Send back the credentials so the Fleet Manager can give them to the driver!
    res.json({ 
      success: true, 
      message: 'Driver created successfully', 
      data: {
        ...data,
        credentials: {
          email,
          password
        }
      } 
    });
  } catch (error) { next(error); }
};

exports.getAll = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, ...filters } = req.query;
    const offset = (page - 1) * limit;
    const result = await repo.findAll(filters, { limit, offset });
    res.json({
      success: true, message: '', data: result.data,
      pagination: { page: parseInt(page), limit: parseInt(limit), total: result.total, pages: Math.ceil(result.total / limit) }
    });
  } catch (error) { next(error); }
};

exports.getById = async (req, res, next) => {
  try {
    const data = await repo.findById(req.params.id);
    if (!data) return res.status(404).json({ success: false, message: 'Not found', errors: [] });
    res.json({ success: true, message: '', data });
  } catch (error) { next(error); }
};

exports.update = async (req, res, next) => {
  try {
    const data = await repo.update(req.params.id, req.body);
    res.json({ success: true, message: 'Driver updated successfully', data });
  } catch (error) { next(error); }
};

exports.delete = async (req, res, next) => {
  try {
    await repo.delete(req.params.id);
    res.json({ success: true, message: 'Driver deleted successfully', data: {} });
  } catch (error) { next(error); }
};

exports.updateStatus = async (req, res, next) => {
  try {
    const { id, status } = req.body;
    const data = await repo.update(id, { status });
    res.json({ success: true, message: 'Status updated successfully', data });
  } catch (error) { next(error); }
};

exports.search = async (req, res, next) => {
  exports.getAll(req, res, next);
};
