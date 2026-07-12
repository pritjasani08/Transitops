const express = require('express');
const router = express.Router();
const controller = require('../controllers/trip.controller');
const { authenticate } = require('../middlewares/auth.middleware');


router.use(authenticate);
router.post('/', controller.create);
router.get('/', controller.getAll);
router.get('/search', controller.search);
router.get('/:id', controller.getById);
router.put('/:id', controller.update);
router.delete('/:id', controller.delete);
router.patch('/status', controller.updateStatus);


router.patch('/dispatch/:id', controller.dispatchTrip);
router.patch('/start/:id', controller.startTrip);
router.patch('/complete/:id', controller.completeTrip);
router.patch('/cancel/:id', controller.cancelTrip);

module.exports = router;
