-- Create an admin user
-- Replace 'your-email@example.com' and 'your-password' with your actual credentials

INSERT INTO admin_users (email, password, full_name, created_at, updated_at)
VALUES (
  'admin@westberg-eu.de',
  crypt('Admin123!', gen_salt('bf')),
  'Admin User',
  NOW(),
  NOW()
);

-- Note: Change the email and password above before running!




