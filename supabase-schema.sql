-- =============================================
-- SUPABASE DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- =============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- CARS TABLE
-- =============================================
CREATE TABLE cars (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(12, 2),
  mileage INTEGER,
  fuel_type TEXT,
  transmission TEXT,
  color TEXT,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'sold', 'archived')),
  featured BOOLEAN DEFAULT FALSE
);

-- =============================================
-- REAL ESTATE TABLE
-- =============================================
CREATE TABLE real_estate (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  property_type TEXT NOT NULL,
  location TEXT NOT NULL,
  address TEXT,
  price DECIMAL(12, 2),
  area_sqm DECIMAL(10, 2),
  bedrooms INTEGER,
  bathrooms INTEGER,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'sold', 'archived')),
  featured BOOLEAN DEFAULT FALSE
);

-- =============================================
-- YACHTS TABLE
-- =============================================
CREATE TABLE yachts (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(12, 2),
  length_m DECIMAL(6, 2),
  cabins INTEGER,
  engine_type TEXT,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'sold', 'archived')),
  featured BOOLEAN DEFAULT FALSE
);

-- =============================================
-- MOTORCYCLES TABLE
-- =============================================
CREATE TABLE motorcycles (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  title TEXT NOT NULL,
  brand TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  price DECIMAL(12, 2),
  mileage INTEGER,
  engine_cc INTEGER,
  color TEXT,
  description TEXT,
  images TEXT[] DEFAULT '{}',
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'sold', 'archived')),
  featured BOOLEAN DEFAULT FALSE
);

-- =============================================
-- ADMIN USERS TABLE
-- =============================================
CREATE TABLE admin_users (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  email TEXT NOT NULL,
  role TEXT DEFAULT 'editor' CHECK (role IN ('admin', 'editor')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- =============================================
-- UPDATED_AT TRIGGER FUNCTION
-- =============================================
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Apply trigger to all tables
CREATE TRIGGER update_cars_updated_at BEFORE UPDATE ON cars FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_real_estate_updated_at BEFORE UPDATE ON real_estate FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_yachts_updated_at BEFORE UPDATE ON yachts FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_motorcycles_updated_at BEFORE UPDATE ON motorcycles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================

-- Enable RLS on all tables
ALTER TABLE cars ENABLE ROW LEVEL SECURITY;
ALTER TABLE real_estate ENABLE ROW LEVEL SECURITY;
ALTER TABLE yachts ENABLE ROW LEVEL SECURITY;
ALTER TABLE motorcycles ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- Public read access for published listings
CREATE POLICY "Public can view published cars" ON cars FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view published real_estate" ON real_estate FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view published yachts" ON yachts FOR SELECT USING (status = 'published');
CREATE POLICY "Public can view published motorcycles" ON motorcycles FOR SELECT USING (status = 'published');

-- Admin full access
CREATE POLICY "Admins can do everything on cars" ON cars FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admins can do everything on real_estate" ON real_estate FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admins can do everything on yachts" ON yachts FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admins can do everything on motorcycles" ON motorcycles FOR ALL USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admins can view admin_users" ON admin_users FOR SELECT USING (
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

-- =============================================
-- STORAGE BUCKET FOR IMAGES
-- =============================================
INSERT INTO storage.buckets (id, name, public) VALUES ('listings', 'listings', true);

-- Storage policies
CREATE POLICY "Public can view listing images" ON storage.objects FOR SELECT USING (bucket_id = 'listings');
CREATE POLICY "Admins can upload listing images" ON storage.objects FOR INSERT WITH CHECK (
  bucket_id = 'listings' AND EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admins can update listing images" ON storage.objects FOR UPDATE USING (
  bucket_id = 'listings' AND EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
CREATE POLICY "Admins can delete listing images" ON storage.objects FOR DELETE USING (
  bucket_id = 'listings' AND EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);
