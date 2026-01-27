-- =============================================
-- FIX ADMIN_USERS RLS - Remove red warning
-- This is safe because only authenticated users
-- can access this table through the API
-- =============================================

-- Drop any existing policies on admin_users
DO $$ 
DECLARE
    pol RECORD;
BEGIN
    FOR pol IN 
        SELECT policyname 
        FROM pg_policies 
        WHERE tablename = 'admin_users'
    LOOP
        EXECUTE format('DROP POLICY IF EXISTS %I ON admin_users', pol.policyname);
    END LOOP;
END $$;

-- Enable RLS on admin_users
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Policy: Authenticated users can read their own admin record
-- This allows login to check if user is admin
CREATE POLICY "Users can read own admin record"
ON admin_users FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Policy: Admins can read all admin records
-- (for admin management features)
CREATE POLICY "Admins can read all admins"
ON admin_users FOR SELECT
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.id = auth.uid()
  )
);

-- Policy: Super admins can insert new admins
-- (you can manage this through direct SQL if needed)
CREATE POLICY "Admins can insert admins"
ON admin_users FOR INSERT
TO authenticated
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.id = auth.uid() 
    AND au.role = 'admin'
  )
);

-- Policy: Super admins can update admin records
CREATE POLICY "Admins can update admins"
ON admin_users FOR UPDATE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.id = auth.uid() 
    AND au.role = 'admin'
  )
)
WITH CHECK (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.id = auth.uid() 
    AND au.role = 'admin'
  )
);

-- Policy: Super admins can delete admin records
CREATE POLICY "Admins can delete admins"
ON admin_users FOR DELETE
TO authenticated
USING (
  EXISTS (
    SELECT 1 FROM admin_users au 
    WHERE au.id = auth.uid() 
    AND au.role = 'admin'
  )
);

-- =============================================
-- RESULT: RED WARNING REMOVED
-- =============================================
-- ✅ admin_users now has RLS enabled
-- ✅ Secure: Users can only see their own admin status
-- ✅ Secure: Only admins can manage other admins
-- ✅ No more "UNRESTRICTED" warning
-- =============================================

