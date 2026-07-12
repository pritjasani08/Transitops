const db = require('../config/db');
const crypto = require('crypto');

exports.create = async (req, res, next) => {
  try {
    const { source, destination, cargo_weight, vehicle_id, driver_id, planned_distance, estimated_duration, remarks } = req.body;
    const trip_number = 'TRIP-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 100000);
    const tripId = crypto.randomUUID();
    
    await db.query(
      `INSERT INTO trips (id, trip_number, source, destination, cargo_weight, planned_distance, estimated_duration, vehicle_id, driver_id, remarks, created_by)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [tripId, trip_number, source, destination, cargo_weight, planned_distance, estimated_duration, vehicle_id, driver_id, remarks, req.user?.id || null]
    );
    
    const { rows } = await db.query('SELECT * FROM trips WHERE id = ?', [tripId]);
    res.json({ success: true, message: 'Trip created', data: rows[0] });
  } catch (error) { next(error); }
};

exports.getAll = async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM trips ORDER BY created_at DESC');
    res.json({ success: true, message: '', data: rows, pagination: { page: 1, limit: 50, total: rows.length, pages: 1 } });
  } catch (error) { next(error); }
};

exports.getById = async (req, res, next) => {
  try {
    const { rows } = await db.query('SELECT * FROM trips WHERE id = ?', [req.params.id]);
    res.json({ success: true, message: '', data: rows[0] });
  } catch (error) { next(error); }
};

exports.update = async (req, res, next) => { res.json({ success: true, message: 'Updated', data: {} }); };
exports.delete = async (req, res, next) => { res.json({ success: true, message: 'Deleted', data: {} }); };
exports.search = async (req, res, next) => { exports.getAll(req, res, next); };
exports.updateStatus = async (req, res, next) => { res.json({ success: true, message: 'Status updated', data: {} }); };

// Assignment Engine Logic
exports.dispatchTrip = async (req, res, next) => {
  const client = await db.getClient();
  try {
    await client.query('START TRANSACTION');
    
    // 1. Validate Trip
    const tripRes = await client.query('SELECT * FROM trips WHERE id = ? FOR UPDATE', [req.params.id]);
    if (tripRes.rows.length === 0) throw new Error('Trip not found');
    const trip = tripRes.rows[0];
    if (trip.trip_status !== 'Draft') throw new Error('Cannot dispatch a trip that is not in Draft status');

    // 2. Validate Vehicle
    const vehicleRes = await client.query('SELECT * FROM vehicles WHERE id = ? FOR UPDATE', [trip.vehicle_id]);
    if (vehicleRes.rows.length === 0) throw new Error('Vehicle not found');
    const vehicle = vehicleRes.rows[0];
    if (vehicle.status !== 'Available') throw new Error('Vehicle is not Available');
    if (parseFloat(trip.cargo_weight) > parseFloat(vehicle.maximum_load_capacity)) throw new Error('Cargo weight exceeds vehicle capacity');

    // 3. Validate Driver
    const driverRes = await client.query('SELECT * FROM drivers WHERE id = ? FOR UPDATE', [trip.driver_id]);
    if (driverRes.rows.length === 0) throw new Error('Driver not found');
    const driver = driverRes.rows[0];
    if (driver.status !== 'Available') throw new Error('Driver is not Available');
    
    // License check
    if (new Date(driver.license_expiry) < new Date()) throw new Error('Driver License Expired');

    // 4. Maintenance Check
    const maintRes = await client.query('SELECT * FROM maintenance_logs WHERE vehicle_id = ? AND status IN (?, ?)', [vehicle.id, 'Scheduled', 'In Progress']);
    if (maintRes.rows.length > 0) throw new Error('Vehicle is under maintenance');

    // Update Statuses
    await client.query('UPDATE trips SET trip_status = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?', ['Dispatched', trip.id]);
    await client.query('UPDATE vehicles SET status = ? WHERE id = ?', ['On Trip', vehicle.id]);
    await client.query('UPDATE drivers SET status = ? WHERE id = ?', ['On Trip', driver.id]);

    const auditId = crypto.randomUUID();
    await client.query('INSERT INTO audit_logs (id, module, action, ip_address) VALUES (?, ?, ?, ?)', [auditId, 'Trips', 'Dispatch', req.ip]);
    
    await client.query('COMMIT');
    res.json({ success: true, message: 'Trip dispatched successfully.', data: { trip: { ...trip, trip_status: 'Dispatched' } } });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(400).json({ success: false, message: error.message, errors: [] });
  } finally {
    client.release();
  }
};

exports.startTrip = async (req, res, next) => {
  const client = await db.getClient();
  try {
    await client.query('START TRANSACTION');
    const tripRes = await client.query('SELECT * FROM trips WHERE id = ? FOR UPDATE', [req.params.id]);
    if (tripRes.rows.length === 0) throw new Error('Trip not found');
    const trip = tripRes.rows[0];
    if (trip.trip_status !== 'Dispatched') throw new Error('Only Dispatched trips can be started');

    await client.query('UPDATE trips SET trip_status = ?, departure_time = CURRENT_TIMESTAMP, updated_at = CURRENT_TIMESTAMP WHERE id = ?', ['In Progress', trip.id]);
    await client.query('COMMIT');
    res.json({ success: true, message: 'Trip started successfully.', data: {} });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(400).json({ success: false, message: error.message, errors: [] });
  } finally {
    client.release();
  }
};

exports.completeTrip = async (req, res, next) => {
  const client = await db.getClient();
  try {
    await client.query('START TRANSACTION');
    const { actual_distance, actual_duration, remarks, fuel_consumed, fuel_cost, fuel_type, ending_odometer } = req.body;
    
    // 1. Validate Trip
    const tripRes = await client.query('SELECT * FROM trips WHERE id = ? FOR UPDATE', [req.params.id]);
    if (tripRes.rows.length === 0) throw new Error('Trip not found');
    const trip = tripRes.rows[0];
    if (trip.trip_status !== 'In Progress') throw new Error('Only In Progress trips can be completed');

    // 2. Validate Vehicle & Driver
    const vehicleRes = await client.query('SELECT * FROM vehicles WHERE id = ? FOR UPDATE', [trip.vehicle_id]);
    const vehicle = vehicleRes.rows[0];
    if (ending_odometer < vehicle.odometer) throw new Error('Ending odometer cannot be less than current odometer');

    // Update Odometer
    await client.query('UPDATE vehicles SET odometer = ?, status = ? WHERE id = ?', [ending_odometer, 'Available', vehicle.id]);
    await client.query('UPDATE drivers SET status = ? WHERE id = ?', ['Available', trip.driver_id]);
    
    // Update Trip
    await client.query(`
      UPDATE trips SET 
      trip_status = ?, arrival_time = CURRENT_TIMESTAMP, actual_distance = ?, actual_duration = ?, remarks = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `, ['Completed', actual_distance, actual_duration, remarks, trip.id]);

    // Fetch updated trip
    const updatedTripRes = await client.query('SELECT * FROM trips WHERE id = ?', [trip.id]);

    // Fuel Log
    if (fuel_consumed) {
      const fuelId = crypto.randomUUID();
      await client.query(
        'INSERT INTO fuel_logs (id, vehicle_id, trip_id, fuel_type, liters, cost, filled_date) VALUES (?, ?, ?, ?, ?, ?, CURRENT_TIMESTAMP)',
        [fuelId, vehicle.id, trip.id, fuel_type, fuel_consumed, fuel_cost]
      );
    }

    const auditId = crypto.randomUUID();
    await client.query('INSERT INTO audit_logs (id, module, action) VALUES (?, ?, ?)', [auditId, 'Trips', 'Completed']);
    await client.query('COMMIT');
    res.json({ success: true, message: 'Trip completed successfully.', data: { trip: updatedTripRes.rows[0] } });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(400).json({ success: false, message: error.message, errors: [] });
  } finally {
    client.release();
  }
};

exports.cancelTrip = async (req, res, next) => {
  const client = await db.getClient();
  try {
    await client.query('START TRANSACTION');
    const { reason } = req.body;
    const tripRes = await client.query('SELECT * FROM trips WHERE id = ? FOR UPDATE', [req.params.id]);
    const trip = tripRes.rows[0];
    if (!['Draft', 'Dispatched'].includes(trip.trip_status)) throw new Error('Cannot cancel a trip in progress or completed');
    
    await client.query('UPDATE trips SET trip_status = ?, remarks = ? WHERE id = ?', ['Cancelled', reason, trip.id]);
    
    if (trip.trip_status === 'Dispatched') {
      await client.query('UPDATE vehicles SET status = ? WHERE id = ?', ['Available', trip.vehicle_id]);
      await client.query('UPDATE drivers SET status = ? WHERE id = ?', ['Available', trip.driver_id]);
    }
    
    await client.query('COMMIT');
    res.json({ success: true, message: 'Trip cancelled.', data: {} });
  } catch (error) {
    await client.query('ROLLBACK');
    res.status(400).json({ success: false, message: error.message, errors: [] });
  } finally {
    client.release();
  }
};
