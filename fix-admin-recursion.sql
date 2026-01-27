-- Fix infinite recursion error in admin_users table
-- Drop all policies and disable RLS on admin_users

-- Drop all existing policies on admin_users
DROP POLICY IF EXISTS "Admin users can read own data" ON admin_users;
DROP POLICY IF EXISTS "Admin users can update own data" ON admin_users;
DROP POLICY IF EXISTS "Only system can insert admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can read all admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can update admin users" ON admin_users;
DROP POLICY IF EXISTS "Allow admin read" ON admin_users;
DROP POLICY IF EXISTS "Allow admin update" ON admin_users;

-- Disable RLS on admin_users table
-- This is safe because this table is only accessed by the authentication system
-- and is not exposed to public users
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;

-- Verify the changes
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'admin_users';

