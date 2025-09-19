'use client'

import { useEffect } from 'react'
import { getSiteAssetUrl } from '@/lib/supabase'

export default function BackgroundImage() {
  useEffect(() => {
    const backgroundUrl = getSiteAssetUrl('background.jpg')
    console.log('Setting background URL:', backgroundUrl) // Debug log
    document.body.style.backgroundImage = `url('${backgroundUrl}')`
    document.body.style.backgroundSize = 'cover'
    document.body.style.backgroundPosition = 'center center'
    document.body.style.backgroundRepeat = 'no-repeat'
    document.body.style.backgroundAttachment = 'fixed'
  }, [])

  return null
}
