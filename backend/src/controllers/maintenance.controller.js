const BaseRepository = require('../repositories/base.repository');
const repo = new BaseRepository('maintenance_logs');

exports.create = async (req, res, next) => {
  try {
    const data = await repo.create(req.body);
    res.json({ success: true, message: 'Maintenance created successfully', data });
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
    res.json({ success: true, message: 'Maintenance updated successfully', data });
  } catch (error) { next(error); }
};

exports.delete = async (req, res, next) => {
  try {
    await repo.delete(req.params.id);
    res.json({ success: true, message: 'Maintenance deleted successfully', data: {} });
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
