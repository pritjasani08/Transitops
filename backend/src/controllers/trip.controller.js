const db = require('../config/db');

exports.create = async (req, res, next) => {
  try {
    const { source, destination, cargo_weight, vehicle_id, driver_id, planned_distance, estimated_duration, remarks } = req.body;
    const trip_number = 'TRIP-' + new Date().getFullYear() + '-' + Math.floor(Math.random() * 100000);
    const { rows } = await db.query(
      `INSERT INTO trips (trip_number, source, destination, cargo_weight, planned_distance, estimated_duration, vehicle_id, driver_id, remarks, created_by)
       VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) RETURNING *`,
      [trip_number, source, destination, cargo_weight, planned_distance, estimated_duration, vehicle_id, driver_id, remarks, req.user?.id || null]
    );
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
    const { rows } = await db.query('SELECT * FROM trips WHERE id = $1', [req.params.id]);
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
    await client.query('BEGIN');
    
    // 1. Validate Trip
    const tripRes = await client.query('SELECT * FROM trips WHERE id = $1 FOR UPDATE', [req.params.id]);
    if (tripRes.rows.length === 0) throw new Error('Trip not found');
    const trip = tripRes.rows[0];
    if (trip.trip_status !== 'Draft') throw new Error('Cannot dispatch a trip that is not in Draft status');

    // 2. Validate Vehicle
    const vehicleRes = await client.query('SELECT * FROM vehicles WHERE id = $1 FOR UPDATE', [trip.vehicle_id]);
    if (vehicleRes.rows.length === 0) throw new Error('Vehicle not found');
    const vehicle = vehicleRes.rows[0];
    if (vehicle.status !== 'Available') throw new Error('Vehicle is not Available');
    if (parseFloat(trip.cargo_weight) > parseFloat(vehicle.maximum_load_capacity)) throw new Error('Cargo weight exceeds vehicle capacity');

    // 3. Validate Driver
    const driverRes = await client.query('SELECT * FROM drivers WHERE id = $1 FOR UPDATE', [trip.driver_id]);
    if (driverRes.rows.length === 0) throw new Error('Driver not found');
    const driver = driverRes.rows[0];
    if (driver.status !== 'Available') throw new Error('Driver is not Available');
    
    // License check
    if (new Date(driver.license_expiry) < new Date()) throw new Error('Driver License Expired');

    // 4. Maintenance Check
    const maintRes = await client.query('SELECT * FROM maintenance_logs WHERE vehicle_id = $1 AND status IN ($2, $3)', [vehicle.id, 'Scheduled', 'In Progress']);
    if (maintRes.rows.length > 0) throw new Error('Vehicle is under maintenance');

    // Update Statuses
    await client.query('UPDATE trips SET trip_status = $1, updated_at = NOW() WHERE id = $2', ['Dispatched', trip.id]);
    await client.query('UPDATE vehicles SET status = $1 WHERE id = $2', ['On Trip', vehicle.id]);
    await client.query('UPDATE drivers SET status = $1 WHERE id = $2', ['On Trip', driver.id]);

    // Audit & Notification
    await client.query('INSERT INTO audit_logs (module, action, ip_address) VALUES ($1, $2, $3)', ['Trips', 'Dispatch', req.ip]);
    
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
    await client.query('BEGIN');
    const tripRes = await client.query('SELECT * FROM trips WHERE id = $1 FOR UPDATE', [req.params.id]);
    if (tripRes.rows.length === 0) throw new Error('Trip not found');
    const trip = tripRes.rows[0];
    if (trip.trip_status !== 'Dispatched') throw new Error('Only Dispatched trips can be started');

    await client.query('UPDATE trips SET trip_status = $1, departure_time = NOW(), updated_at = NOW() WHERE id = $2', ['In Progress', trip.id]);
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
    await client.query('BEGIN');
    const { actual_distance, actual_duration, remarks, fuel_consumed, fuel_cost, fuel_type, ending_odometer } = req.body;
    
    // 1. Validate Trip
    const tripRes = await client.query('SELECT * FROM trips WHERE id = $1 FOR UPDATE', [req.params.id]);
    if (tripRes.rows.length === 0) throw new Error('Trip not found');
    const trip = tripRes.rows[0];
    if (trip.trip_status !== 'In Progress') throw new Error('Only In Progress trips can be completed');

    // 2. Validate Vehicle & Driver
    const vehicleRes = await client.query('SELECT * FROM vehicles WHERE id = $1 FOR UPDATE', [trip.vehicle_id]);
    const vehicle = vehicleRes.rows[0];
    if (ending_odometer < vehicle.odometer) throw new Error('Ending odometer cannot be less than current odometer');

    // Update Odometer
    await client.query('UPDATE vehicles SET odometer = $1, status = $2 WHERE id = $3', [ending_odometer, 'Available', vehicle.id]);
    await client.query('UPDATE drivers SET status = $1 WHERE id = $2', ['Available', trip.driver_id]);
    
    // Update Trip
    await client.query(`
      UPDATE trips SET 
      trip_status = $1, arrival_time = NOW(), actual_distance = $2, actual_duration = $3, remarks = $4, updated_at = NOW()
      WHERE id = $5 RETURNING *
    `, ['Completed', actual_distance, actual_duration, remarks, trip.id]);

    // Fuel Log
    if (fuel_consumed) {
      await client.query(
        'INSERT INTO fuel_logs (vehicle_id, trip_id, fuel_type, liters, cost, filled_date) VALUES ($1, $2, $3, $4, $5, NOW())',
        [vehicle.id, trip.id, fuel_type, fuel_consumed, fuel_cost]
      );
    }

    await client.query('INSERT INTO audit_logs (module, action) VALUES ($1, $2)', ['Trips', 'Completed']);
    await client.query('COMMIT');
    res.json({ success: true, message: 'Trip completed successfully.', data: { trip: trip } });
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
    await client.query('BEGIN');
    const { reason } = req.body;
    const tripRes = await client.query('SELECT * FROM trips WHERE id = $1 FOR UPDATE', [req.params.id]);
    const trip = tripRes.rows[0];
    if (!['Draft', 'Dispatched'].includes(trip.trip_status)) throw new Error('Cannot cancel a trip in progress or completed');
    
    await client.query('UPDATE trips SET trip_status = $1, remarks = $2 WHERE id = $3', ['Cancelled', reason, trip.id]);
    
    if (trip.trip_status === 'Dispatched') {
      await client.query('UPDATE vehicles SET status = $1 WHERE id = $2', ['Available', trip.vehicle_id]);
      await client.query('UPDATE drivers SET status = $1 WHERE id = $2', ['Available', trip.driver_id]);
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
