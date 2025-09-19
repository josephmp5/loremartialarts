import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Only create client if environment variables are available
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null

// For server-side operations
export const supabaseAdmin = supabaseUrl && process.env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(
      supabaseUrl,
      process.env.SUPABASE_SERVICE_ROLE_KEY,
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false
        }
      }
    )
  : null

// Helper functions for Supabase storage URLs
export const getStorageUrl = (bucket: string, path: string): string => {
  if (!supabaseUrl) return `/${path}` // fallback to local path
  return `${supabaseUrl}/storage/v1/object/public/${bucket}/${path}`
}

// Specific helpers for different asset types
export const getSiteAssetUrl = (filename: string): string => {
  const url = getStorageUrl('site-assets', filename)
  console.log(`getSiteAssetUrl(${filename}):`, url)
  return url
}

export const getGalleryImageUrl = (filename: string): string => {
  return getStorageUrl('gallery-images', filename)
}

export const getBlogImageUrl = (filename: string): string => {
  return getStorageUrl('blog-images', filename)
}
