# Supabase Storage Setup for Image Uploads

If you're getting "Failed to upload image" errors, the Supabase storage buckets might not be set up correctly.

## Quick Fix: Create Storage Buckets Manually

### 1. Go to Supabase Dashboard
1. Open your Supabase project dashboard
2. Click on **Storage** in the left sidebar

### 2. Create Required Buckets
Create these buckets with these exact settings:

#### Blog Images Bucket
- **Name**: `blog-images`
- **Public**: ✅ **YES** (checked)
- Click "Create bucket"

#### Gallery Images Bucket  
- **Name**: `gallery-images`
- **Public**: ✅ **YES** (checked)
- Click "Create bucket"

#### Site Assets Bucket
- **Name**: `site-assets` 
- **Public**: ✅ **YES** (checked)
- Click "Create bucket"

### 3. Set Up Policies (If Needed)

If uploads still fail, you might need to set up storage policies:

1. Go to **Storage** → **Policies**
2. For each bucket (`blog-images`, `gallery-images`, `site-assets`), create these policies:

#### SELECT Policy (View Images)
- **Policy Name**: `Public Access`
- **Allowed Operation**: `SELECT`
- **Target Roles**: `public`
- **Policy Definition**: `true`

#### INSERT Policy (Upload Images)
- **Policy Name**: `Authenticated Upload`
- **Allowed Operation**: `INSERT` 
- **Target Roles**: `authenticated`
- **Policy Definition**: `true`

#### UPDATE Policy (Update Images)
- **Policy Name**: `Authenticated Update`
- **Allowed Operation**: `UPDATE`
- **Target Roles**: `authenticated` 
- **Policy Definition**: `true`

#### DELETE Policy (Delete Images)
- **Policy Name**: `Authenticated Delete`
- **Allowed Operation**: `DELETE`
- **Target Roles**: `authenticated`
- **Policy Definition**: `true`

## Alternative: Run SQL Commands

If you prefer SQL, run this in your Supabase SQL Editor:

```sql
-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) 
VALUES 
  ('blog-images', 'blog-images', true),
  ('gallery-images', 'gallery-images', true),
  ('site-assets', 'site-assets', true)
ON CONFLICT (id) DO NOTHING;

-- Create policies for blog images
CREATE POLICY "Anyone can view blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update blog images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete blog images" ON storage.objects
  FOR DELETE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');
```

## Test the Fix

1. Go to your admin panel: `/admin/blog/new`
2. Try uploading an image
3. Check browser console (F12) for detailed error messages
4. The error message should now show the specific problem

## Common Issues

**"Bucket does not exist"** → Create the buckets as shown above

**"Policy violation"** → Set up the storage policies

**"File too large"** → Image must be under 5MB

**"Invalid file type"** → Only image files (jpg, png, gif, etc.) are allowed

## Need Help?

Check the browser console (F12) for detailed error messages. The improved error handling will show exactly what went wrong.
