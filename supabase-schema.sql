-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  featured_image_url TEXT,
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  author_id UUID REFERENCES auth.users(id)
);

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blog_post_categories junction table
CREATE TABLE IF NOT EXISTS blog_post_categories (
  post_id UUID REFERENCES blog_posts(id) ON DELETE CASCADE,
  category_id UUID REFERENCES blog_categories(id) ON DELETE CASCADE,
  PRIMARY KEY (post_id, category_id)
);

-- Create training_locations table (extend your existing locations)
CREATE TABLE IF NOT EXISTS training_locations (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  address TEXT NOT NULL,
  schedule TEXT NOT NULL,
  features TEXT[],
  map_embed_url TEXT,
  icon VARCHAR(10),
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create contact_submissions table
CREATE TABLE IF NOT EXISTS contact_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  phone VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  read BOOLEAN DEFAULT false
);

-- Create training_gallery table
CREATE TABLE IF NOT EXISTS training_gallery (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  image_url TEXT NOT NULL,
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_post_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_locations ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE training_gallery ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_posts (public read, admin write)
CREATE POLICY "Blog posts are viewable by everyone" ON blog_posts
  FOR SELECT USING (published = true);

CREATE POLICY "Only authenticated users can insert blog posts" ON blog_posts
  FOR INSERT WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update blog posts" ON blog_posts
  FOR UPDATE USING (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can delete blog posts" ON blog_posts
  FOR DELETE USING (auth.role() = 'authenticated');

-- Create policies for blog_categories (public read, admin write)
CREATE POLICY "Blog categories are viewable by everyone" ON blog_categories
  FOR SELECT USING (true);

CREATE POLICY "Only authenticated users can manage categories" ON blog_categories
  FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for training_locations (public read, admin write)
CREATE POLICY "Training locations are viewable by everyone" ON training_locations
  FOR SELECT USING (active = true);

CREATE POLICY "Only authenticated users can manage locations" ON training_locations
  FOR ALL USING (auth.role() = 'authenticated');

-- Create policies for contact_submissions (admin only)
CREATE POLICY "Only authenticated users can view contact submissions" ON contact_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

CREATE POLICY "Anyone can submit contact forms" ON contact_submissions
  FOR INSERT WITH CHECK (true);

-- Create policies for training_gallery (public read, admin write)
CREATE POLICY "Training gallery is viewable by everyone" ON training_gallery
  FOR SELECT USING (active = true);

CREATE POLICY "Only authenticated users can manage training gallery" ON training_gallery
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert some sample categories
INSERT INTO blog_categories (name, slug, description) VALUES
  ('Training Tips', 'training-tips', 'BJJ techniques and training advice'),
  ('Community News', 'community-news', 'Updates about our BJJ community'),
  ('Location Updates', 'location-updates', 'Changes to training locations and schedules'),
  ('Student Spotlights', 'student-spotlights', 'Featured students and their journeys')
ON CONFLICT (slug) DO NOTHING;

-- Insert your existing training locations
INSERT INTO training_locations (name, address, schedule, features, icon) VALUES
  ('Erdal Inönü Park', 'Konyaaltı, Antalya', 'Every Tuesday & Thursday 20:00', 
   ARRAY['Outdoor training', 'Park environment', 'Fresh air'], '🌳'),
  ('Konyaaltı Beach', 'Konyaaltı Sahili, Antalya', 'Every Saturday 20:00',
   ARRAY['Beach training', 'Sunrise sessions', 'Ocean view'], '🏖️')
ON CONFLICT DO NOTHING;

-- Insert sample training gallery images
INSERT INTO training_gallery (title, description, image_url, display_order) VALUES
  ('Outdoor Training', 'BJJ techniques in nature''s embrace', '/loremartialarts/insta1.png', 1),
  ('Team Training', 'Building strength together in Antalya', '/loremartialarts/insta10.jpg', 2),
  ('Beach Training', 'Training by the Mediterranean Sea', '/loremartialarts/lore1.png', 3),
  ('Technique Focus', 'Perfecting BJJ techniques outdoors', '/loremartialarts/lore2.png', 4),
  ('Park Sessions', 'Training in Antalya''s beautiful parks', '/loremartialarts/lore3.png', 5),
  ('Community Spirit', 'Building bonds through BJJ', '/loremartialarts/lore4.png', 6)
ON CONFLICT DO NOTHING;

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published ON blog_posts(published);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_created_at ON blog_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_training_locations_active ON training_locations(active);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_created_at ON contact_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_training_gallery_active ON training_gallery(active);
CREATE INDEX IF NOT EXISTS idx_training_gallery_order ON training_gallery(display_order);

-- Create storage buckets for images
INSERT INTO storage.buckets (id, name, public) VALUES ('blog-images', 'blog-images', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('gallery-images', 'gallery-images', true);

-- Create storage policies for blog images
CREATE POLICY "Anyone can view blog images" ON storage.objects
  FOR SELECT USING (bucket_id = 'blog-images');

CREATE POLICY "Authenticated users can upload blog images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update blog images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete blog images" ON storage.objects
  FOR DELETE USING (bucket_id = 'blog-images' AND auth.role() = 'authenticated');

-- Create storage policies for gallery images
CREATE POLICY "Anyone can view gallery images" ON storage.objects
  FOR SELECT USING (bucket_id = 'gallery-images');

CREATE POLICY "Authenticated users can upload gallery images" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update gallery images" ON storage.objects
  FOR UPDATE USING (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete gallery images" ON storage.objects
  FOR DELETE USING (bucket_id = 'gallery-images' AND auth.role() = 'authenticated');
