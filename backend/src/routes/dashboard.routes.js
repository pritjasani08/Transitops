const express = require('express');
const router = express.Router();
router.get('/fleet', (req, res) => res.json({ success: true, data: { totalVehicles: 10, activeVehicles: 5 } }));
router.get('/dispatcher', (req, res) => res.json({ success: true, data: { todaysTrips: 3 } }));
router.get('/safety', (req, res) => res.json({ success: true, data: { safetyScore: 98 } }));
router.get('/finance', (req, res) => res.json({ success: true, data: { totalExpense: 5000 } }));
module.exports = router;
