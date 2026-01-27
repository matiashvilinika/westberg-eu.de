-- COMPLETE FIX for infinite recursion in admin_users table
-- This removes ALL policies and recreates simple ones without recursion

-- =============================================
-- STEP 1: Drop ALL existing policies on admin_users
-- =============================================
DO $$ 
DECLARE
    r RECORD;
BEGIN
    FOR r IN (SELECT policyname FROM pg_policies WHERE tablename = 'admin_users') LOOP
        EXECUTE 'DROP POLICY IF EXISTS "' || r.policyname || '" ON admin_users';
    END LOOP;
END $$;

-- =============================================
-- STEP 2: Create simple, non-recursive policies
-- =============================================

-- Enable RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Allow ANY authenticated user to read their own admin record
-- This is needed for login to work
CREATE POLICY "Allow authenticated users to read own record"
ON admin_users
FOR SELECT
TO authenticated
USING (id = auth.uid());

-- Allow users to update their own record
CREATE POLICY "Allow authenticated users to update own record"
ON admin_users
FOR UPDATE
TO authenticated
USING (id = auth.uid())
WITH CHECK (id = auth.uid());

-- =============================================
-- STEP 3: Verify the setup
-- =============================================

-- Show RLS status
SELECT 
    schemaname, 
    tablename, 
    rowsecurity as "RLS Enabled"
FROM pg_tables 
WHERE tablename = 'admin_users';

-- Show all policies (should only be 2)
SELECT 
    tablename,
    policyname,
    permissive,
    roles,
    cmd as "Command",
    qual as "USING clause"
FROM pg_policies
WHERE tablename = 'admin_users'
ORDER BY policyname;

