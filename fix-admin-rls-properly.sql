-- Properly secure admin_users table without infinite recursion
-- This allows admins to log in and manage everything

-- First, drop all existing policies
DROP POLICY IF EXISTS "Admin users can read own data" ON admin_users;
DROP POLICY IF EXISTS "Admin users can update own data" ON admin_users;
DROP POLICY IF EXISTS "Only system can insert admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can read all admin users" ON admin_users;
DROP POLICY IF EXISTS "Admins can update admin users" ON admin_users;
DROP POLICY IF EXISTS "Allow admin read" ON admin_users;
DROP POLICY IF EXISTS "Allow admin update" ON admin_users;

-- Enable RLS (if not already enabled)
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Create simple, non-recursive policies using auth.uid()
-- These policies compare the authenticated user's ID directly from the JWT token
-- without querying the admin_users table, avoiding recursion

-- Allow authenticated users to read their own admin record
CREATE POLICY "Allow user to read own admin record"
ON admin_users
FOR SELECT
TO authenticated
USING (auth.uid() = id);

-- Allow authenticated users to update their own admin record
CREATE POLICY "Allow user to update own admin record"
ON admin_users
FOR UPDATE
TO authenticated
USING (auth.uid() = id)
WITH CHECK (auth.uid() = id);

-- No INSERT or DELETE policies - these should only be done via SQL by superadmin

-- Verify the setup
SELECT schemaname, tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'admin_users';

-- Show all policies on admin_users
SELECT schemaname, tablename, policyname, permissive, roles, cmd, qual, with_check
FROM pg_policies
WHERE tablename = 'admin_users';

