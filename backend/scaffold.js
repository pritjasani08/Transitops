const fs = require('fs');
const path = require('path');

const resources = [
  'vehicle', 'driver', 'trip', 'maintenance', 'fuel', 'expense', 'dashboard', 'auth'
];

const createCrud = (name) => {
  const Name = name.charAt(0).toUpperCase() + name.slice(1);
  const isTrip = name === 'trip';

  // Routes
  const routeContent = `const express = require('express');
const router = express.Router();
const controller = require('../controllers/${name}.controller');
const { authenticate } = require('../middlewares/auth.middleware');

${name !== 'auth' && name !== 'dashboard' ? `
router.use(authenticate);
router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/search', controller.search);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.patch('/status', controller.updateStatus);
` : ''}
${isTrip ? `
router.patch('/dispatch/:id', controller.dispatchTrip);
router.patch('/start/:id', controller.startTrip);
router.patch('/complete/:id', controller.completeTrip);
router.patch('/cancel/:id', controller.cancelTrip);
` : ''}
module.exports = router;
`;
  
  if (name !== 'auth' && name !== 'dashboard') {
    fs.writeFileSync(path.join(__dirname, 'src', 'routes', `${name}.routes.js`), routeContent);
  }

  // Controller
  if (name !== 'auth' && name !== 'dashboard' && name !== 'trip') {
    const controllerContent = `const BaseRepository = require('../repositories/base.repository');
const repo = new BaseRepository('${name}s');

exports.create = async (req, res, next) => {
  try {
    const data = await repo.create(req.body);
    res.json({ success: true, message: '${Name} created successfully', data });
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
    res.json({ success: true, message: '${Name} updated successfully', data });
  } catch (error) { next(error); }
};

exports.delete = async (req, res, next) => {
  try {
    await repo.delete(req.params.id);
    res.json({ success: true, message: '${Name} deleted successfully', data: {} });
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
`;
    fs.writeFileSync(path.join(__dirname, 'src', 'controllers', `${name}.controller.js`), controllerContent);
  }
};

resources.forEach(createCrud);

// Auth Routes & Controller (mock logic to satisfy structure)
fs.writeFileSync(path.join(__dirname, 'src', 'routes', 'auth.routes.js'), `const express = require('express');
const router = express.Router();
router.post('/login', (req, res) => {
  const jwt = require('jsonwebtoken');
  const token = jwt.sign({ id: 1, role: req.body.role || 'fleet_manager' }, process.env.JWT_SECRET || 'secret');
  res.json({ success: true, message: 'Login successful', data: { token, user: { email: req.body.email, role: req.body.role || 'fleet_manager' } } });
});
router.post('/register', (req, res) => res.json({ success: true, message: 'Registered', data: {} }));
module.exports = router;
`);

// Dashboard Routes
fs.writeFileSync(path.join(__dirname, 'src', 'routes', 'dashboard.routes.js'), `const express = require('express');
const router = express.Router();
router.get('/fleet', (req, res) => res.json({ success: true, data: { totalVehicles: 10, activeVehicles: 5 } }));
router.get('/dispatcher', (req, res) => res.json({ success: true, data: { todaysTrips: 3 } }));
router.get('/safety', (req, res) => res.json({ success: true, data: { safetyScore: 98 } }));
router.get('/finance', (req, res) => res.json({ success: true, data: { totalExpense: 5000 } }));
module.exports = router;
`);

console.log('Scaffolding complete.');
