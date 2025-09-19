-- Run this in your Supabase SQL Editor to create ALL storage buckets

-- Create all required storage buckets
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES 
  -- Blog images bucket
  (
    'blog-images', 
    'blog-images', 
    true, 
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  ),
  -- Gallery images bucket
  (
    'gallery-images', 
    'gallery-images', 
    true, 
    5242880, -- 5MB limit
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
  ),
  -- Site assets bucket (logo, background, etc.)
  (
    'site-assets', 
    'site-assets', 
    true, 
    10485760, -- 10MB limit for larger assets
    ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml']
  ),
  -- Fonts bucket
  (
    'fonts', 
    'fonts', 
    true, 
    2097152, -- 2MB limit for fonts
    ARRAY['font/ttf', 'font/otf', 'application/font-ttf', 'application/font-otf', 'application/octet-stream']
  )
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for ALL buckets
-- Blog images policies
CREATE POLICY "Anyone can view blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update blog images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete blog images" ON storage.objects
  FOR DELETE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- Gallery images policies
CREATE POLICY "Anyone can view gallery images" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can upload gallery images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update gallery images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete gallery images" ON storage.objects
  FOR DELETE USING (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');

-- Site assets policies
CREATE POLICY "Anyone can view site assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'site-assets');

CREATE POLICY "Authenticated users can upload site assets" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'site-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update site assets" ON storage.objects
  FOR UPDATE USING (bucket_id = 'site-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete site assets" ON storage.objects
  FOR DELETE USING (bucket_id = 'site-assets' AND auth.role() = 'authenticated');

-- Fonts policies
CREATE POLICY "Anyone can view fonts" ON storage.objects
  FOR SELECT USING (bucket_id = 'fonts');

CREATE POLICY "Authenticated users can upload fonts" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'fonts' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update fonts" ON storage.objects
  FOR UPDATE USING (bucket_id = 'fonts' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete fonts" ON storage.objects
  FOR DELETE USING (bucket_id = 'fonts' AND auth.role() = 'authenticated');

-- Verify all buckets were created
SELECT id, name, public, file_size_limit FROM storage.buckets 
WHERE id IN ('blog-images', 'gallery-images', 'site-assets', 'fonts');
