USE transithub;

-- Default Roles
INSERT INTO roles (id, name, description) VALUES
(UUID(), 'Admin', 'Super administrator with full access to all modules.'),
(UUID(), 'Fleet Manager', 'Manages vehicles, maintenance, and fleet health.'),
(UUID(), 'Dispatcher', 'Manages trips, routes, and driver assignments.'),
(UUID(), 'Safety Officer', 'Monitors driver compliance, licenses, and incident reports.'),
(UUID(), 'Financial Analyst', 'Manages expenses, fuel logs, and financial reporting.');

-- Admin User (Password is 'password123')
INSERT INTO users (id, first_name, last_name, email, password, role_id)
SELECT 
  UUID(),
  'Super', 
  'Admin', 
  'admin@transithub.com', 
  '$2a$10$Xm5vX/C31iL5JzM0rM.23O0Hq4W1RkOa8b5eP/6fG1T8s7p7v2f8e', 
  id 
FROM roles WHERE name = 'Admin';
