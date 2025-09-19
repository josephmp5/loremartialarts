-- SQL to populate gallery with proper Supabase URLs
-- Replace YOUR_SUPABASE_URL with your actual Supabase URL

-- First, clear any existing static gallery data
DELETE FROM training_gallery WHERE title IN ('Outdoor Training', 'Team Training', 'Beach Training', 'Technique Focus', 'Park Sessions', 'Community Spirit');

-- Insert gallery images with proper Supabase URLs
INSERT INTO training_gallery (title, description, image_url, display_order, active) VALUES
('Outdoor Training', 'BJJ techniques in nature''s embrace', 'YOUR_SUPABASE_URL/storage/v1/object/public/gallery-images/insta1.png', 1, true),
('Team Training', 'Building strength together in Antalya', 'YOUR_SUPABASE_URL/storage/v1/object/public/gallery-images/insta10.jpg', 2, true),
('Beach Training', 'Training by the Mediterranean Sea', 'YOUR_SUPABASE_URL/storage/v1/object/public/gallery-images/lore1.png', 3, true),
('Technique Focus', 'Perfecting BJJ techniques outdoors', 'YOUR_SUPABASE_URL/storage/v1/object/public/gallery-images/lore2.png', 4, true),
('Park Sessions', 'Training in Antalya''s beautiful parks', 'YOUR_SUPABASE_URL/storage/v1/object/public/gallery-images/lore3.png', 5, true),
('Community Spirit', 'Building bonds through BJJ', 'YOUR_SUPABASE_URL/storage/v1/object/public/gallery-images/lore4.png', 6, true);

-- Verify the insertion
SELECT title, image_url, display_order, active FROM training_gallery WHERE active = true ORDER BY display_order;
