-- Insert Roles
INSERT INTO roles (name, description) VALUES 
('Admin', 'System Administrator'),
('Fleet Manager', 'Manages vehicles and maintenance'),
('Dispatcher', 'Manages trips and drivers'),
('Safety Officer', 'Ensures compliance and driver safety'),
('Financial Analyst', 'Monitors expenses and ROI')
ON CONFLICT (name) DO NOTHING;

-- Insert Mock Admin User (Password is 'password123' hashed with bcrypt)
INSERT INTO users (first_name, last_name, email, password, role_id, is_verified, status)
SELECT 'System', 'Admin', 'admin@transithub.com', '$2a$10$rN/4Q.X253S/h19G.YlK2.j3lJ19P779t2O.48u1l9/l9M09V1pG2', id, true, 'active' 
FROM roles WHERE name = 'Admin'
ON CONFLICT (email) DO NOTHING;

-- Insert Mock Vehicles
INSERT INTO vehicles (registration_number, vehicle_name, vehicle_model, vehicle_type, maximum_load_capacity, status) VALUES 
('TRX-1000', 'Heavy Hauler', 'Volvo FH16', 'Truck', 20000, 'Available'),
('TRX-2000', 'City Sprinter', 'Mercedes Sprinter', 'Van', 3500, 'Available'),
('TRX-3000', 'Highway King', 'Scania R500', 'Truck', 18000, 'Available')
ON CONFLICT (registration_number) DO NOTHING;

-- Insert Mock Drivers
INSERT INTO drivers (name, email, phone, license_number, license_category, license_expiry, joining_date, status) VALUES 
('John Doe', 'john.doe@driver.com', '555-0100', 'DL-999-100', 'Heavy', '2028-12-31', '2023-01-15', 'Available'),
('Jane Smith', 'jane.smith@driver.com', '555-0101', 'DL-999-200', 'Light', '2027-06-30', '2024-03-10', 'Available'),
('Bob Wilson', 'bob.wilson@driver.com', '555-0102', 'DL-999-300', 'Heavy', '2029-01-01', '2022-11-05', 'Available')
ON CONFLICT (license_number) DO NOTHING;
