-- Fix infinite recursion in admin_users RLS

-- Drop all existing policies
DROP POLICY IF EXISTS "Authenticated users can read admin_users" ON admin_users;
DROP POLICY IF EXISTS "Admins can do everything" ON admin_users;
DROP POLICY IF EXISTS "Admins can view themselves" ON admin_users;
DROP POLICY IF EXISTS "Admins full access" ON admin_users;

-- Simple policy: authenticated users can read their own record
CREATE POLICY "Users can read their own admin record"
ON admin_users FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Admins can update/delete (non-recursive check)
CREATE POLICY "Admins can manage admin_users"
ON admin_users FOR ALL
TO authenticated
USING (id = auth.uid());




