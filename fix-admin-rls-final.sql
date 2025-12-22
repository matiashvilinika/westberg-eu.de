-- FINAL FIX: Remove ALL policies and disable RLS temporarily

-- Drop ALL policies on admin_users
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

-- Disable RLS on admin_users (simplest solution)
ALTER TABLE admin_users DISABLE ROW LEVEL SECURITY;




