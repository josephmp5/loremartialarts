import { supabase } from './supabase'

export interface SiteContent {
  id: string
  section: string
  key: string
  title: string
  content: string
  content_type: string
  display_order: number
  active: boolean
  created_at: string
  updated_at: string
}

export interface ContentBySection {
  [section: string]: {
    [key: string]: SiteContent
  }
}

// Fallback content when database is not available
const fallbackContent: ContentBySection = {
  hero: {
    main_title: { id: 'fallback', section: 'hero', key: 'main_title', title: 'LORE BJJ', content: 'LORE BJJ', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' },
    subtitle: { id: 'fallback', section: 'hero', key: 'subtitle', title: 'Brazilian Jiu-Jitsu in Antalya', content: 'Brazilian Jiu-Jitsu in Antalya', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' }
  },
  about: {
    section_title: { id: 'fallback', section: 'about', key: 'section_title', title: 'About Our Team', content: 'About Our Team', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' },
    intro_text: { id: 'fallback', section: 'about', key: 'intro_text', title: 'We are not a traditional gym...', content: 'We are not a traditional gym. We are Antalya\'s premier nomadic BJJ family that trains in nature\'s embrace.', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' },
    philosophy_title: { id: 'fallback', section: 'about', key: 'philosophy_title', title: 'Our Philosophy', content: 'Our Philosophy', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' },
    philosophy_text: { id: 'fallback', section: 'about', key: 'philosophy_text', title: '', content: 'We believe in the freedom of outdoor BJJ training in Antalya. No walls, no restrictions, just pure BJJ in nature\'s embrace. Our nomadic lifestyle connects us with the ancient warrior traditions while exploring Antalya\'s beautiful landscapes.', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' },
    training_title: { id: 'fallback', section: 'about', key: 'training_title', title: 'Antalya BJJ Training', content: 'Antalya BJJ Training', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' },
    training_text: { id: 'fallback', section: 'about', key: 'training_text', title: '', content: 'Our BJJ training in Antalya adapts to nature\'s conditions. From soft grass to sandy beaches, we learn to flow with any surface, making us more versatile and adaptable fighters in Antalya\'s diverse outdoor environments.', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' },
    community_title: { id: 'fallback', section: 'about', key: 'community_title', title: 'Antalya BJJ Community', content: 'Antalya BJJ Community', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' },
    community_text: { id: 'fallback', section: 'about', key: 'community_text', title: '', content: 'We welcome all levels to our Antalya BJJ community, from beginners to advanced practitioners. Our team supports each other\'s growth in a free, outdoor environment across Antalya\'s beautiful training locations.', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' }
  },
  youtube: {
    section_title: { id: 'fallback', section: 'youtube', key: 'section_title', title: 'Latest Training Video', content: 'Latest Training Video', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' },
    subtitle: { id: 'fallback', section: 'youtube', key: 'subtitle', title: 'Stay connected with our outdoor BJJ adventures', content: 'Stay connected with our outdoor BJJ adventures', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' },
    video_url: { id: 'fallback', section: 'youtube', key: 'video_url', title: 'YouTube Video URL', content: 'https://www.youtube.com/embed/dQw4w9WgXcQ', content_type: 'url', display_order: 0, active: true, created_at: '', updated_at: '' },
    video_description: { id: 'fallback', section: 'youtube', key: 'video_description', title: '', content: 'Join us on our latest outdoor BJJ adventure! Watch as we train in Antalya\'s beautiful landscapes, share techniques, and build our nomadic community. Experience the freedom of outdoor martial arts.', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' }
  },
  gallery: {
    section_title: { id: 'fallback', section: 'gallery', key: 'section_title', title: 'Training Moments', content: 'Training Moments', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' },
    subtitle: { id: 'fallback', section: 'gallery', key: 'subtitle', title: 'Capturing the spirit of outdoor BJJ training in Antalya', content: 'Capturing the spirit of outdoor BJJ training in Antalya', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' },
    empty_message: { id: 'fallback', section: 'gallery', key: 'empty_message', title: 'Training Gallery Coming Soon', content: 'Training Gallery Coming Soon', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' }
  },
  locations: {
    section_title: { id: 'fallback', section: 'locations', key: 'section_title', title: 'Training Locations', content: 'Training Locations', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' },
    subtitle: { id: 'fallback', section: 'locations', key: 'subtitle', title: 'Discover our outdoor training spots across Antalya\'s beautiful landscapes', content: 'Discover our outdoor training spots across Antalya\'s beautiful landscapes', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' },
    schedule_title: { id: 'fallback', section: 'locations', key: 'schedule_title', title: 'Training Schedule', content: 'Training Schedule', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' }
  },
  contact: {
    main_text: { id: 'fallback', section: 'contact', key: 'main_text', title: '', content: 'Ready to experience outdoor BJJ training? Contact us to join our next session.', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' },
    button_text: { id: 'fallback', section: 'contact', key: 'button_text', title: 'Contact Us', content: 'Contact Us', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' },
    instagram_url: { id: 'fallback', section: 'contact', key: 'instagram_url', title: '', content: 'https://instagram.com/lorebjj', content_type: 'url', display_order: 0, active: true, created_at: '', updated_at: '' }
  },
  navigation: {
    home_text: { id: 'fallback', section: 'navigation', key: 'home_text', title: 'HOME', content: 'HOME', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' },
    about_text: { id: 'fallback', section: 'navigation', key: 'about_text', title: 'ABOUT', content: 'ABOUT', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' },
    locations_text: { id: 'fallback', section: 'navigation', key: 'locations_text', title: 'LOCATIONS', content: 'LOCATIONS', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' },
    gallery_text: { id: 'fallback', section: 'navigation', key: 'gallery_text', title: 'GALLERY', content: 'GALLERY', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' },
    youtube_text: { id: 'fallback', section: 'navigation', key: 'youtube_text', title: 'YOUTUBE', content: 'YOUTUBE', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' },
    blog_text: { id: 'fallback', section: 'navigation', key: 'blog_text', title: 'BLOG', content: 'BLOG', content_type: 'text', display_order: 0, active: true, created_at: '', updated_at: '' }
  }
}

export async function fetchSiteContent(): Promise<ContentBySection> {
  if (!supabase) {
    return fallbackContent
  }

  try {
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .eq('active', true)
      .order('section', { ascending: true })
      .order('display_order', { ascending: true })

    if (error) {
      console.error('Error fetching site content:', error)
      return fallbackContent
    }

    if (!data || data.length === 0) {
      return fallbackContent
    }

    // Group by section and key
    const grouped: ContentBySection = {}
    data.forEach(item => {
      if (!grouped[item.section]) {
        grouped[item.section] = {}
      }
      grouped[item.section][item.key] = item
    })

    // Merge with fallback to ensure all keys exist
    const merged: ContentBySection = {}
    Object.keys(fallbackContent).forEach(section => {
      merged[section] = {
        ...fallbackContent[section],
        ...(grouped[section] || {})
      }
    })

    return merged
  } catch (err) {
    console.error('Error fetching site content:', err)
    return fallbackContent
  }
}

export function getContent(content: ContentBySection, section: string, key: string): string {
  return content[section]?.[key]?.content || fallbackContent[section]?.[key]?.content || ''
}
