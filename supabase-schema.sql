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
  ('Outdoor Training', 'BJJ techniques in nature''s embrace', '/insta1.png', 1),
  ('Team Training', 'Building strength together in Antalya', '/insta10.jpg', 2),
  ('Beach Training', 'Training by the Mediterranean Sea', '/lore1.png', 3),
  ('Technique Focus', 'Perfecting BJJ techniques outdoors', '/lore2.png', 4),
  ('Park Sessions', 'Training in Antalya''s beautiful parks', '/lore3.png', 5),
  ('Community Spirit', 'Building bonds through BJJ', '/lore4.png', 6)
ON CONFLICT DO NOTHING;

-- Create site_content table for managing all text content
CREATE TABLE IF NOT EXISTS site_content (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  section VARCHAR(100) NOT NULL,
  key VARCHAR(100) NOT NULL,
  title VARCHAR(500),
  content TEXT,
  content_type VARCHAR(50) DEFAULT 'text', -- text, html, url, json
  display_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(section, key)
);

-- Enable RLS
ALTER TABLE site_content ENABLE ROW LEVEL SECURITY;

-- Create policies for site_content (public read, admin write)
CREATE POLICY "Site content is viewable by everyone" ON site_content
  FOR SELECT USING (active = true);

CREATE POLICY "Only authenticated users can manage site content" ON site_content
  FOR ALL USING (auth.role() = 'authenticated');

-- Insert default site content
INSERT INTO site_content (section, key, title, content, content_type) VALUES
  -- Hero Section
  ('hero', 'main_title', 'LORE BJJ', 'LORE BJJ', 'text'),
  ('hero', 'subtitle', 'Brazilian Jiu-Jitsu in Antalya', 'Brazilian Jiu-Jitsu in Antalya', 'text'),
  
  -- About Section
  ('about', 'section_title', 'About Our Team', 'About Our Team', 'text'),
  ('about', 'intro_text', 'We are not a traditional gym...', 'We are not a traditional gym. We are Antalya''s premier nomadic BJJ family that trains in nature''s embrace.', 'text'),
  ('about', 'philosophy_title', 'Our Philosophy', 'Our Philosophy', 'text'),
  ('about', 'philosophy_text', 'We believe in the freedom of outdoor BJJ training in Antalya. No walls, no restrictions, just pure BJJ in nature''s embrace. Our nomadic lifestyle connects us with the ancient warrior traditions while exploring Antalya''s beautiful landscapes.', 'We believe in the freedom of outdoor BJJ training in Antalya. No walls, no restrictions, just pure BJJ in nature''s embrace. Our nomadic lifestyle connects us with the ancient warrior traditions while exploring Antalya''s beautiful landscapes.', 'text'),
  ('about', 'training_title', 'Antalya BJJ Training', 'Antalya BJJ Training', 'text'),
  ('about', 'training_text', 'Our BJJ training in Antalya adapts to nature''s conditions. From soft grass to sandy beaches, we learn to flow with any surface, making us more versatile and adaptable fighters in Antalya''s diverse outdoor environments.', 'Our BJJ training in Antalya adapts to nature''s conditions. From soft grass to sandy beaches, we learn to flow with any surface, making us more versatile and adaptable fighters in Antalya''s diverse outdoor environments.', 'text'),
  ('about', 'community_title', 'Antalya BJJ Community', 'Antalya BJJ Community', 'text'),
  ('about', 'community_text', 'We welcome all levels to our Antalya BJJ community, from beginners to advanced practitioners. Our team supports each other''s growth in a free, outdoor environment across Antalya''s beautiful training locations.', 'We welcome all levels to our Antalya BJJ community, from beginners to advanced practitioners. Our team supports each other''s growth in a free, outdoor environment across Antalya''s beautiful training locations.', 'text'),
  
  -- YouTube Section
  ('youtube', 'section_title', 'Latest Training Video', 'Latest Training Video', 'text'),
  ('youtube', 'subtitle', 'Stay connected with our outdoor BJJ adventures', 'Stay connected with our outdoor BJJ adventures', 'text'),
  ('youtube', 'video_url', 'YouTube Video URL', 'https://www.youtube.com/embed/dQw4w9WgXcQ', 'url'),
  ('youtube', 'video_description', 'Join us on our latest outdoor BJJ adventure! Watch as we train in Antalya''s beautiful landscapes, share techniques, and build our nomadic community. Experience the freedom of outdoor martial arts.', 'Join us on our latest outdoor BJJ adventure! Watch as we train in Antalya''s beautiful landscapes, share techniques, and build our nomadic community. Experience the freedom of outdoor martial arts.', 'text'),
  
  -- Gallery Section
  ('gallery', 'section_title', 'Training Moments', 'Training Moments', 'text'),
  ('gallery', 'subtitle', 'Capturing the spirit of outdoor BJJ training in Antalya', 'Capturing the spirit of outdoor BJJ training in Antalya', 'text'),
  ('gallery', 'empty_message', 'Training Gallery Coming Soon', 'Training Gallery Coming Soon', 'text'),
  
  -- Locations Section
  ('locations', 'section_title', 'Training Locations', 'Training Locations', 'text'),
  ('locations', 'subtitle', 'Discover our outdoor training spots across Antalya''s beautiful landscapes', 'Discover our outdoor training spots across Antalya''s beautiful landscapes', 'text'),
  ('locations', 'schedule_title', 'Training Schedule', 'Training Schedule', 'text'),
  
  -- Contact Section
  ('contact', 'main_text', 'Ready to experience outdoor BJJ training? Contact us to join our next session.', 'Ready to experience outdoor BJJ training? Contact us to join our next session.', 'text'),
  ('contact', 'button_text', 'Contact Us', 'Contact Us', 'text'),
  ('contact', 'instagram_url', 'https://instagram.com/lorebjj', 'https://instagram.com/lorebjj', 'url'),
  
  -- Navigation
  ('navigation', 'home_text', 'HOME', 'HOME', 'text'),
  ('navigation', 'about_text', 'ABOUT', 'ABOUT', 'text'),
  ('navigation', 'locations_text', 'LOCATIONS', 'LOCATIONS', 'text'),
  ('navigation', 'gallery_text', 'GALLERY', 'GALLERY', 'text'),
  ('navigation', 'youtube_text', 'YOUTUBE', 'YOUTUBE', 'text'),
  ('navigation', 'blog_text', 'BLOG', 'BLOG', 'text')
ON CONFLICT (section, key) DO NOTHING;

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
INSERT INTO storage.buckets (id, name, public) VALUES ('site-assets', 'site-assets', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('fonts', 'fonts', true);

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

-- Create storage policies for site assets (background, logo, etc.)
CREATE POLICY "Anyone can view site assets" ON storage.objects
  FOR SELECT USING (bucket_id = 'site-assets');

CREATE POLICY "Authenticated users can upload site assets" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'site-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update site assets" ON storage.objects
  FOR UPDATE USING (bucket_id = 'site-assets' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete site assets" ON storage.objects
  FOR DELETE USING (bucket_id = 'site-assets' AND auth.role() = 'authenticated');

-- Create storage policies for fonts
CREATE POLICY "Anyone can view fonts" ON storage.objects
  FOR SELECT USING (bucket_id = 'fonts');

CREATE POLICY "Authenticated users can upload fonts" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'fonts' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update fonts" ON storage.objects
  FOR UPDATE USING (bucket_id = 'fonts' AND auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete fonts" ON storage.objects
  FOR DELETE USING (bucket_id = 'fonts' AND auth.role() = 'authenticated');
