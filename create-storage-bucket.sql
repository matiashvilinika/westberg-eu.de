-- Create storage bucket for listing images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('listings', 'listings', true)
ON CONFLICT (id) DO NOTHING;

-- Set up storage policies for listing images
CREATE POLICY "Public can view listing images" 
ON storage.objects FOR SELECT 
USING (bucket_id = 'listings');

CREATE POLICY "Admins can upload listing images" 
ON storage.objects FOR INSERT 
WITH CHECK (
  bucket_id = 'listings' AND 
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

CREATE POLICY "Admins can update listing images" 
ON storage.objects FOR UPDATE 
USING (
  bucket_id = 'listings' AND 
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

CREATE POLICY "Admins can delete listing images" 
ON storage.objects FOR DELETE 
USING (
  bucket_id = 'listings' AND 
  EXISTS (SELECT 1 FROM admin_users WHERE id = auth.uid())
);

