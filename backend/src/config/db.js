const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'transithub',
  port: process.env.DB_PORT || 3306,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  namedPlaceholders: true
});

module.exports = {
  query: async (text, params) => {
    // In mysql2, query returns [rows, fields]
    const [rows, fields] = await pool.query(text, params);
    return { rows, fields };
  },
  getClient: async () => {
    const connection = await pool.getConnection();
    return {
      query: async (text, params) => {
        const [rows, fields] = await connection.query(text, params);
        return { rows, fields };
      },
      release: () => connection.release(),
    };
  }
};
