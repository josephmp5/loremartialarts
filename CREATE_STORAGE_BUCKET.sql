-- Run this in your Supabase SQL Editor to create the storage bucket

-- Create the storage bucket
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
  'blog-images', 
  'blog-images', 
  true, 
  5242880, -- 5MB limit
  ARRAY['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp']
)
ON CONFLICT (id) DO NOTHING;

-- Create storage policies for the bucket
CREATE POLICY "Anyone can view blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (
    bucket_id = 'blog-images' 
    AND auth.role() = 'authenticated'
    AND (storage.foldername(name))[1] = 'blog-images'
  );

CREATE POLICY "Authenticated users can update blog images" ON storage.objects
  FOR UPDATE USING (
    bucket_id = 'blog-images' 
    AND auth.role() = 'authenticated'
  );

CREATE POLICY "Authenticated users can delete blog images" ON storage.objects
  FOR DELETE USING (
    bucket_id = 'blog-images' 
    AND auth.role() = 'authenticated'
  );

-- Verify the bucket was created
SELECT * FROM storage.buckets WHERE id = 'blog-images';
