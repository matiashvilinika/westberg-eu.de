-- =============================================
-- PRODUCTION SECURITY SETUP
-- Run this before deploying to production
-- =============================================

-- Enable RLS on all tables
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE real_estate ENABLE ROW LEVEL SECURITY;
ALTER TABLE yachts ENABLE ROW LEVEL SECURITY;
ALTER TABLE motorcycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies first
DROP POLICY IF EXISTS "Public read published cars" ON cars;
DROP POLICY IF EXISTS "Public read published real_estate" ON real_estate;
DROP POLICY IF EXISTS "Public read published yachts" ON yachts;
DROP POLICY IF EXISTS "Public read published motorcycles" ON motorcycles;
DROP POLICY IF EXISTS "Admins full access cars" ON cars;
DROP POLICY IF EXISTS "Admins full access real_estate" ON real_estate;
DROP POLICY IF EXISTS "Admins full access yachts" ON yachts;
DROP POLICY IF EXISTS "Admins full access motorcycles" ON motorcycles;

-- =============================================
-- PUBLIC ACCESS (Read Only for Published Items)
-- =============================================

-- Anyone can view published cars
CREATE POLICY "Public read published cars"
ON cars FOR SELECT
USING (status = 'published');

-- Anyone can view published real estate
CREATE POLICY "Public read published real_estate"
ON real_estate FOR SELECT
USING (status = 'published');

-- Anyone can view published yachts
CREATE POLICY "Public read published yachts"
ON yachts FOR SELECT
USING (status = 'published');

-- Anyone can view published motorcycles
CREATE POLICY "Public read published motorcycles"
ON motorcycles FOR SELECT
USING (status = 'published');

-- =============================================
-- ADMIN ACCESS (Full Control)
-- =============================================

-- Helper function to check if user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM admin_users 
    WHERE id = auth.uid() 
    AND role = 'admin'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Admins have full access to cars
CREATE POLICY "Admins full access cars"
ON cars FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Admins have full access to real estate
CREATE POLICY "Admins full access real_estate"
ON real_estate FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Admins have full access to yachts
CREATE POLICY "Admins full access yachts"
ON yachts FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Admins have full access to motorcycles
CREATE POLICY "Admins full access motorcycles"
ON motorcycles FOR ALL
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- =============================================
-- ADMIN USERS TABLE
-- =============================================

-- Admins can read all admin users
CREATE POLICY "Admins read admin_users"
ON admin_users FOR SELECT
TO authenticated
USING (is_admin());

-- Only admins can insert new admins
CREATE POLICY "Admins insert admin_users"
ON admin_users FOR INSERT
TO authenticated
WITH CHECK (is_admin());

-- Admins can update admin users
CREATE POLICY "Admins update admin_users"
ON admin_users FOR UPDATE
TO authenticated
USING (is_admin())
WITH CHECK (is_admin());

-- Admins can delete admin users
CREATE POLICY "Admins delete admin_users"
ON admin_users FOR DELETE
TO authenticated
USING (is_admin());

-- =============================================
-- STORAGE SECURITY
-- =============================================

-- Public can view product images
CREATE POLICY "Public can view product images"
ON storage.objects FOR SELECT
USING (bucket_id = 'product-images');

-- Only admins can upload images
CREATE POLICY "Admins can upload product images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'product-images' AND is_admin());

-- Only admins can update images
CREATE POLICY "Admins can update product images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'product-images' AND is_admin());

-- Only admins can delete images
CREATE POLICY "Admins can delete product images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'product-images' AND is_admin());

