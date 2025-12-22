-- Fix admin_users RLS policies

-- Drop existing policies
DROP POLICY IF EXISTS "Admins can view themselves" ON admin_users;
DROP POLICY IF EXISTS "Admins full access" ON admin_users;

-- Allow authenticated users to read admin_users (to check if they're admin)
CREATE POLICY "Authenticated users can read admin_users"
ON admin_users FOR SELECT
TO authenticated
USING (true);

-- Allow admins to do everything
CREATE POLICY "Admins can do everything"
ON admin_users FOR ALL
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid()
  )
);




