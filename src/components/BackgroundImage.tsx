'use client'

import { useEffect } from 'react'
import { getSiteAssetUrl } from '@/lib/supabase'

export default function BackgroundImage() {
  useEffect(() => {
    const backgroundUrl = getSiteAssetUrl('background.jpg')
    console.log('Setting background URL:', backgroundUrl) // Debug log
    
    // Set background with fallback
    if (backgroundUrl && backgroundUrl !== '/background.jpg') {
      // Use setAttribute to ensure !important rules are respected
      document.body.setAttribute('style', `
        background-image: url('${backgroundUrl}') !important;
        background-size: cover !important;
        background-position: center center !important;
        background-repeat: no-repeat !important;
        background-attachment: fixed !important;
        ${document.body.getAttribute('style') || ''}
      `.replace(/\s+/g, ' ').trim())
      console.log('Background image set successfully')
    } else {
      console.error('Background URL not generated properly:', backgroundUrl)
      // Fallback to a solid color
      document.body.style.setProperty('background-color', '#1a1a2e', 'important')
    }
  }, [])

  return null
}
