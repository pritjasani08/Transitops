const crypto = require('crypto');

class BaseRepository {
  constructor(tableName) {
    this.tableName = tableName;
    this.db = require('../config/db');
  }

  async findAll(filters = {}, options = {}) {
    let query = `SELECT * FROM ${this.tableName} WHERE 1=1`;
    const params = [];

    for (const [key, value] of Object.entries(filters)) {
      query += ` AND ${key} = ?`;
      params.push(value);
    }

    if (options.orderBy) {
      query += ` ORDER BY ${options.orderBy} ${options.orderDesc ? 'DESC' : 'ASC'}`;
    }

    if (options.limit) {
      query += ` LIMIT ?`;
      params.push(options.limit);
    }

    if (options.offset) {
      query += ` OFFSET ?`;
      params.push(options.offset);
    }

    const { rows } = await this.db.query(query, params);
    
    // Get total count
    let countQuery = `SELECT COUNT(*) as count FROM ${this.tableName} WHERE 1=1`;
    const countParams = [];
    for (const [key, value] of Object.entries(filters)) {
      countQuery += ` AND ${key} = ?`;
      countParams.push(value);
    }
    const countResult = await this.db.query(countQuery, countParams);

    return { data: rows, total: parseInt(countResult.rows[0].count) };
  }

  async findById(id) {
    const { rows } = await this.db.query(`SELECT * FROM ${this.tableName} WHERE id = ?`, [id]);
    return rows[0];
  }

  async create(data) {
    if (!data.id) {
      data.id = crypto.randomUUID();
    }
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map(() => '?').join(', ');
    const query = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders})`;
    
    await this.db.query(query, values);
    return this.findById(data.id);
  }

  async update(id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map(key => `${key} = ?`).join(', ');
    
    const query = `UPDATE ${this.tableName} SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = ?`;
    await this.db.query(query, [...values, id]);
    
    return this.findById(id);
  }

  async delete(id) {
    const record = await this.findById(id);
    if (record) {
      await this.db.query(`DELETE FROM ${this.tableName} WHERE id = ?`, [id]);
    }
    return record;
  }
}

module.exports = BaseRepository;
