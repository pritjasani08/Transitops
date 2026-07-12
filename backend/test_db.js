const db = require('./src/config/db');
const bcrypt = require('bcryptjs');

async function test() {
  try {
    const roleRecord = await db.query("SELECT id FROM roles WHERE name = 'Fleet Manager'");
    console.log("ROLE:", roleRecord.rows);
    
    const existingUser = await db.query("SELECT id FROM users WHERE email = 'test@test.com'");
    console.log("USER EXISTS:", existingUser.rows);
    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash("password123", salt);
    
    const newUser = await db.query(
      `INSERT INTO users (first_name, last_name, email, password, role_id) 
       VALUES ($1, $2, $3, $4, $5) RETURNING id, email, first_name, last_name`,
      ['Test', 'User', 'test2@test.com', hashedPassword, roleRecord.rows[0]?.id || null]
    );
    console.log("NEW USER:", newUser.rows);
  } catch (err) {
    console.error("DB ERROR:", err);
  } finally {
    process.exit(0);
  }
}
test();
