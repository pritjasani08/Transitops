class BaseRepository {
  constructor(tableName) {
    this.tableName = tableName;
    this.db = require('../config/db');
  }

  async findAll(filters = {}, options = {}) {
    let query = `SELECT * FROM ${this.tableName} WHERE 1=1`;
    const params = [];
    let paramIndex = 1;

    for (const [key, value] of Object.entries(filters)) {
      query += ` AND ${key} = $${paramIndex}`;
      params.push(value);
      paramIndex++;
    }

    if (options.orderBy) {
      query += ` ORDER BY ${options.orderBy} ${options.orderDesc ? 'DESC' : 'ASC'}`;
    }

    if (options.limit) {
      query += ` LIMIT $${paramIndex}`;
      params.push(options.limit);
      paramIndex++;
    }

    if (options.offset) {
      query += ` OFFSET $${paramIndex}`;
      params.push(options.offset);
      paramIndex++;
    }

    const { rows } = await this.db.query(query, params);
    
    // Get total count
    let countQuery = `SELECT COUNT(*) FROM ${this.tableName} WHERE 1=1`;
    const countParams = [];
    let countIndex = 1;
    for (const [key, value] of Object.entries(filters)) {
      countQuery += ` AND ${key} = $${countIndex}`;
      countParams.push(value);
      countIndex++;
    }
    const countResult = await this.db.query(countQuery, countParams);

    return { data: rows, total: parseInt(countResult.rows[0].count) };
  }

  async findById(id) {
    const { rows } = await this.db.query(`SELECT * FROM ${this.tableName} WHERE id = $1`, [id]);
    return rows[0];
  }

  async create(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const placeholders = keys.map((_, i) => `$${i + 1}`).join(', ');
    const query = `INSERT INTO ${this.tableName} (${keys.join(', ')}) VALUES (${placeholders}) RETURNING *`;
    const { rows } = await this.db.query(query, values);
    return rows[0];
  }

  async update(id, data) {
    const keys = Object.keys(data);
    const values = Object.values(data);
    const setClause = keys.map((key, i) => `${key} = $${i + 2}`).join(', ');
    const query = `UPDATE ${this.tableName} SET ${setClause}, updated_at = CURRENT_TIMESTAMP WHERE id = $1 RETURNING *`;
    const { rows } = await this.db.query(query, [id, ...values]);
    return rows[0];
  }

  async delete(id) {
    const { rows } = await this.db.query(`DELETE FROM ${this.tableName} WHERE id = $1 RETURNING id`, [id]);
    return rows[0];
  }
}

module.exports = BaseRepository;
