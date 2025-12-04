-- Add placeholder images to products
-- Use Unsplash for high-quality random images

-- Update Cars with car placeholder images
UPDATE cars SET images = ARRAY[
  'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1614162692292-7ac56d7f1f20?w=800&h=600&fit=crop'
] WHERE id = (SELECT id FROM cars LIMIT 1 OFFSET 0);

UPDATE cars SET images = ARRAY[
  'https://images.unsplash.com/photo-1580274455191-1c62238fa333?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1563720223185-11003d516935?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&h=600&fit=crop'
] WHERE id = (SELECT id FROM cars LIMIT 1 OFFSET 1);

-- Update Real Estate with property placeholder images
UPDATE real_estate SET images = ARRAY[
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&h=600&fit=crop'
] WHERE id = (SELECT id FROM real_estate LIMIT 1 OFFSET 0);

UPDATE real_estate SET images = ARRAY[
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&h=600&fit=crop'
] WHERE id = (SELECT id FROM real_estate LIMIT 1 OFFSET 1);

-- Update Yachts with yacht/boat placeholder images
UPDATE yachts SET images = ARRAY[
  'https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1621277224630-81d9af65e40e?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1622168823626-c7b293e5c5db?w=800&h=600&fit=crop'
] WHERE id = (SELECT id FROM yachts LIMIT 1 OFFSET 0);

UPDATE yachts SET images = ARRAY[
  'https://images.unsplash.com/photo-1540946485063-a40da27545f8?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1569263979104-865ab7cd8d13?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1608186319524-53c05c62e691?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1535024966820-1f57c5e1f28f?w=800&h=600&fit=crop'
] WHERE id = (SELECT id FROM yachts LIMIT 1 OFFSET 1);

-- Update Motorcycles with motorcycle placeholder images
UPDATE motorcycles SET images = ARRAY[
  'https://images.unsplash.com/photo-1558981806-ec527fa84c39?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1599819177795-2c7fe87dfde9?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1580310614729-ccd69652491d?w=800&h=600&fit=crop'
] WHERE id = (SELECT id FROM motorcycles LIMIT 1 OFFSET 0);

UPDATE motorcycles SET images = ARRAY[
  'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1581235720704-06d3acfcb36f?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1609630875171-b1321377ee65?w=800&h=600&fit=crop',
  'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=800&h=600&fit=crop'
] WHERE id = (SELECT id FROM motorcycles LIMIT 1 OFFSET 1);



