-- TransitHub MySQL Schema
-- Please run this in MySQL Workbench or phpMyAdmin

CREATE DATABASE IF NOT EXISTS transithub;
USE transithub;

CREATE TABLE roles (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE permissions (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    module VARCHAR(50) NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE role_permissions (
    role_id VARCHAR(36) REFERENCES roles(id) ON DELETE CASCADE,
    permission_id VARCHAR(36) REFERENCES permissions(id) ON DELETE CASCADE,
    PRIMARY KEY (role_id, permission_id)
);

CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role_id VARCHAR(36) REFERENCES roles(id) ON DELETE RESTRICT,
    status VARCHAR(20) DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'suspended')),
    last_login TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    deleted_by VARCHAR(36) NULL
);

CREATE TABLE vehicles (
    id VARCHAR(36) PRIMARY KEY,
    registration_number VARCHAR(20) UNIQUE NOT NULL,
    make VARCHAR(50) NOT NULL,
    model VARCHAR(50) NOT NULL,
    year INT NOT NULL,
    type VARCHAR(50) NOT NULL,
    status VARCHAR(20) DEFAULT 'Available' CHECK (status IN ('Available', 'On Trip', 'Maintenance', 'Out of Service')),
    odometer DECIMAL(10,2) DEFAULT 0.00,
    maximum_load_capacity DECIMAL(10,2) NOT NULL,
    fuel_type VARCHAR(20) NOT NULL,
    fuel_efficiency_standard DECIMAL(5,2),
    purchase_date DATE,
    insurance_expiry DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    deleted_by VARCHAR(36) NULL
);

CREATE TABLE drivers (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
    license_number VARCHAR(50) UNIQUE NOT NULL,
    license_type VARCHAR(20) NOT NULL,
    license_expiry DATE NOT NULL,
    status VARCHAR(20) DEFAULT 'Available' CHECK (status IN ('Available', 'On Trip', 'Off Duty', 'Suspended')),
    medical_clearance_expiry DATE,
    years_of_experience INT DEFAULT 0,
    rating DECIMAL(3,2) DEFAULT 5.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP NULL,
    deleted_by VARCHAR(36) NULL
);

CREATE TABLE trips (
    id VARCHAR(36) PRIMARY KEY,
    trip_number VARCHAR(50) UNIQUE NOT NULL,
    source VARCHAR(255) NOT NULL,
    destination VARCHAR(255) NOT NULL,
    cargo_weight DECIMAL(10,2) NOT NULL,
    planned_distance DECIMAL(10,2) NOT NULL,
    actual_distance DECIMAL(10,2),
    estimated_duration VARCHAR(50),
    actual_duration VARCHAR(50),
    trip_status VARCHAR(20) DEFAULT 'Draft' CHECK (trip_status IN ('Draft', 'Dispatched', 'In Progress', 'Completed', 'Cancelled')),
    vehicle_id VARCHAR(36) REFERENCES vehicles(id) ON DELETE RESTRICT,
    driver_id VARCHAR(36) REFERENCES drivers(id) ON DELETE RESTRICT,
    departure_time TIMESTAMP NULL,
    arrival_time TIMESTAMP NULL,
    remarks TEXT,
    created_by VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE maintenance_logs (
    id VARCHAR(36) PRIMARY KEY,
    vehicle_id VARCHAR(36) REFERENCES vehicles(id) ON DELETE CASCADE,
    service_type VARCHAR(100) NOT NULL,
    description TEXT,
    cost DECIMAL(10,2) NOT NULL,
    status VARCHAR(20) DEFAULT 'Scheduled' CHECK (status IN ('Scheduled', 'In Progress', 'Completed', 'Cancelled')),
    scheduled_date DATE NOT NULL,
    completion_date DATE,
    performed_by VARCHAR(100),
    invoice_reference VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE fuel_logs (
    id VARCHAR(36) PRIMARY KEY,
    vehicle_id VARCHAR(36) REFERENCES vehicles(id) ON DELETE CASCADE,
    trip_id VARCHAR(36) REFERENCES trips(id) ON DELETE SET NULL,
    fuel_type VARCHAR(20) NOT NULL,
    liters DECIMAL(10,2) NOT NULL,
    cost DECIMAL(10,2) NOT NULL,
    filled_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    station_name VARCHAR(100),
    receipt_reference VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE expenses (
    id VARCHAR(36) PRIMARY KEY,
    trip_id VARCHAR(36) REFERENCES trips(id) ON DELETE SET NULL,
    vehicle_id VARCHAR(36) REFERENCES vehicles(id) ON DELETE SET NULL,
    expense_type VARCHAR(50) NOT NULL CHECK (expense_type IN ('Toll', 'Parking', 'Food', 'Lodging', 'Repair', 'Other')),
    amount DECIMAL(10,2) NOT NULL,
    description TEXT,
    receipt_reference VARCHAR(100),
    date_incurred DATE NOT NULL,
    logged_by VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE audit_logs (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) REFERENCES users(id) ON DELETE SET NULL,
    module VARCHAR(50) NOT NULL,
    action VARCHAR(50) NOT NULL,
    old_values JSON,
    new_values JSON,
    ip_address VARCHAR(45),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
