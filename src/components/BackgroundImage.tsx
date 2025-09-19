'use client'

import { useEffect } from 'react'
import { getSiteAssetUrl } from '@/lib/supabase'

export default function BackgroundImage() {
  useEffect(() => {
    const backgroundUrl = getSiteAssetUrl('background.jpg')
    document.body.style.backgroundImage = `url('${backgroundUrl}')`
  }, [])

  return null
}
