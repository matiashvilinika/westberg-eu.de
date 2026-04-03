-- Make listing prices optional across all listing tables
-- Run this in the Supabase SQL Editor

ALTER TABLE cars ALTER COLUMN price DROP NOT NULL;
ALTER TABLE real_estate ALTER COLUMN price DROP NOT NULL;
ALTER TABLE yachts ALTER COLUMN price DROP NOT NULL;
ALTER TABLE motorcycles ALTER COLUMN price DROP NOT NULL;
