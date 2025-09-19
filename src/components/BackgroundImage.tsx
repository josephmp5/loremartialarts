'use client'

import { useEffect, useState } from 'react'
import { getSiteAssetUrl } from '@/lib/supabase'

export default function BackgroundImage() {
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const backgroundUrl = getSiteAssetUrl('background.jpg')
    console.log('Setting background URL:', backgroundUrl) // Debug log
    
    // Preload the background image
    if (backgroundUrl && backgroundUrl !== '/background.jpg') {
      const img = new Image()
      img.onload = () => {
        // Image loaded successfully, set as background
        document.body.setAttribute('style', `
          background-image: url('${backgroundUrl}') !important;
          background-size: cover !important;
          background-position: center center !important;
          background-repeat: no-repeat !important;
          background-attachment: fixed !important;
          ${document.body.getAttribute('style') || ''}
        `.replace(/\s+/g, ' ').trim())
        console.log('Background image loaded and set successfully')
        setIsLoaded(true)
      }
      img.onerror = () => {
        console.error('Background image failed to load:', backgroundUrl)
        document.body.style.setProperty('background-color', '#1a1a2e', 'important')
        setIsLoaded(true)
      }
      img.src = backgroundUrl
    } else {
      console.error('Background URL not generated properly:', backgroundUrl)
      document.body.style.setProperty('background-color', '#1a1a2e', 'important')
      setIsLoaded(true)
    }
  }, [])

  return null
}
