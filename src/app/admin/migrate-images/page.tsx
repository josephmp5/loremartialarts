'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

interface ImageMigration {
  filename: string
  publicPath: string
  size: string
  status: 'pending' | 'uploading' | 'completed' | 'error'
  supabaseUrl?: string
  error?: string
}

export default function ImageMigration() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [images, setImages] = useState<ImageMigration[]>([
    // Main images
    { filename: 'background.jpg', publicPath: '/background.jpg', size: '~500KB', status: 'pending' },
    { filename: 'background-original.jpg', publicPath: '/background-original.jpg', size: '~800KB', status: 'pending' },
    { filename: 'logo.png', publicPath: '/logo.png', size: '~50KB', status: 'pending' },
    
    // Training gallery images
    { filename: 'insta1.png', publicPath: '/insta1.png', size: '~200KB', status: 'pending' },
    { filename: 'insta10.jpg', publicPath: '/insta10.jpg', size: '~300KB', status: 'pending' },
    { filename: 'lore1.png', publicPath: '/lore1.png', size: '~250KB', status: 'pending' },
    { filename: 'lore2.png', publicPath: '/lore2.png', size: '~250KB', status: 'pending' },
    { filename: 'lore3.png', publicPath: '/lore3.png', size: '~250KB', status: 'pending' },
    { filename: 'lore4.png', publicPath: '/lore4.png', size: '~250KB', status: 'pending' },
    
    // Fonts (convert to CDN)
    { filename: 'go3v2.ttf', publicPath: '/fonts/go3v2.ttf', size: '~100KB', status: 'pending' },
    { filename: 'Manga.otf', publicPath: '/fonts/Manga.otf', size: '~80KB', status: 'pending' },
    { filename: 'Manga Bold.otf', publicPath: '/fonts/Manga Bold.otf', size: '~85KB', status: 'pending' },
    { filename: 'Manga Italic.otf', publicPath: '/fonts/Manga Italic.otf', size: '~82KB', status: 'pending' },
    { filename: 'Manga Bold Italic.otf', publicPath: '/fonts/Manga Bold Italic.otf', size: '~87KB', status: 'pending' },
    { filename: 'Manga Hollow.otf', publicPath: '/fonts/Manga Hollow.otf', size: '~75KB', status: 'pending' },
    { filename: 'Manga Hollow Italic.otf', publicPath: '/fonts/Manga Hollow Italic.otf', size: '~78KB', status: 'pending' }
  ])
  const [migrating, setMigrating] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, router])

  const migrateImage = async (image: ImageMigration, index: number) => {
    if (!supabase) {
      setError('Supabase not available')
      return
    }

    try {
      // Update status to uploading
      setImages(prev => prev.map((img, i) => 
        i === index ? { ...img, status: 'uploading' } : img
      ))

      // Fetch the image from public folder
      const response = await fetch(image.publicPath)
      if (!response.ok) {
        throw new Error(`Failed to fetch ${image.filename}`)
      }

      const blob = await response.blob()
      const file = new File([blob], image.filename, { type: blob.type })

      // Determine bucket based on file type
      const fileExt = image.filename.split('.').pop()?.toLowerCase()
      const fileName = `${Date.now()}-${image.filename}`
      
      let bucket = 'gallery-images'
      if (image.filename === 'background.jpg' || image.filename === 'background-original.jpg') {
        bucket = 'site-assets'
      } else if (image.filename === 'logo.png') {
        bucket = 'site-assets'
      } else if (fileExt === 'ttf' || fileExt === 'otf') {
        bucket = 'fonts'
      }
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from(bucket)
        .upload(fileName, file, {
          cacheControl: '31536000', // 1 year cache for static assets
          upsert: false
        })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from(bucket)
        .getPublicUrl(fileName)

      // Update status to completed
      setImages(prev => prev.map((img, i) => 
        i === index ? { 
          ...img, 
          status: 'completed', 
          supabaseUrl: urlData.publicUrl 
        } : img
      ))

    } catch (err: any) {
      setImages(prev => prev.map((img, i) => 
        i === index ? { 
          ...img, 
          status: 'error', 
          error: err.message 
        } : img
      ))
    }
  }

  const migrateAllImages = async () => {
    setMigrating(true)
    setError('')

    for (let i = 0; i < images.length; i++) {
      if (images[i].status === 'pending') {
        await migrateImage(images[i], i)
        // Small delay between uploads
        await new Promise(resolve => setTimeout(resolve, 500))
      }
    }

    setMigrating(false)
  }

  const updateGalleryDatabase = async () => {
    if (!supabase) {
      setError('Supabase not available')
      return
    }

    try {
      const galleryImages = images
        .filter(img => img.filename.startsWith('lore') || img.filename.startsWith('insta'))
        .filter(img => img.status === 'completed' && img.supabaseUrl)

      if (galleryImages.length === 0) {
        setError('No gallery images to update')
        return
      }

      // Update training_gallery table with new URLs
      const updates = galleryImages.map((img, index) => ({
        image_url: img.supabaseUrl,
        title: `Training Image ${index + 1}`,
        description: `Optimized training image`,
        display_order: index + 1,
        active: true
      }))

      // Clear existing and insert new
      await supabase.from('training_gallery').delete().neq('id', '00000000-0000-0000-0000-000000000000')
      
      const { error } = await supabase
        .from('training_gallery')
        .insert(updates)

      if (error) {
        setError('Failed to update gallery database: ' + error.message)
      } else {
        alert('Gallery database updated successfully!')
      }

    } catch (err: any) {
      setError('Failed to update database: ' + err.message)
    }
  }

  const generateCSSUpdates = () => {
    const completedImages = images.filter(img => img.status === 'completed' && img.supabaseUrl)
    
    if (completedImages.length === 0) {
      setError('No completed images to generate CSS for')
      return
    }

    let cssUpdates = '/* Replace these URLs in your CSS files: */\n\n'
    
    completedImages.forEach(img => {
      if (img.filename === 'background.jpg') {
        cssUpdates += `/* Background image */\n`
        cssUpdates += `/* OLD: url('/background.jpg') */\n`
        cssUpdates += `/* NEW: */ url('${img.supabaseUrl}') \n\n`
      } else if (img.filename.includes('font')) {
        cssUpdates += `/* Font: ${img.filename} */\n`
        cssUpdates += `/* OLD: url('/fonts/${img.filename}') */\n`
        cssUpdates += `/* NEW: */ url('${img.supabaseUrl}') \n\n`
      }
    })

    // Copy to clipboard and show alert
    navigator.clipboard.writeText(cssUpdates).then(() => {
      alert('CSS updates copied to clipboard! Paste them to see what needs to be updated.')
    }).catch(() => {
      // Fallback: show in console
      console.log(cssUpdates)
      alert('CSS updates logged to console (F12 to view)')
    })
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: '#f5f5dc',
        fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      }}>
        Loading...
      </div>
    )
  }

  if (!user) {
    return null
  }

  const completedCount = images.filter(img => img.status === 'completed').length
  const errorCount = images.filter(img => img.status === 'error').length

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      color: '#f5f5dc',
      fontFamily: 'system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        padding: '20px 40px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <div>
          <h1 style={{
            fontSize: '2rem',
            fontWeight: '700',
            margin: 0,
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)'
          }}>
            Image Migration Tool
          </h1>
          <p style={{
            margin: '5px 0 0 0',
            opacity: 0.8,
            fontSize: '1rem'
          }}>
            Migrate images to Supabase for faster loading
          </p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <a
            href="/admin"
            style={{
              color: '#e8e8d0',
              textDecoration: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              background: 'rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease'
            }}
          >
            ← Back to Admin
          </a>
        </div>
      </header>

      <div style={{ padding: '40px' }}>
        {/* Migration Status */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '30px'
        }}>
          <h2 style={{ fontSize: '1.3rem', marginBottom: '15px' }}>Migration Status</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', color: '#60a5fa' }}>{images.length}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Total Images</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', color: '#10b981' }}>{completedCount}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Completed</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', color: '#f59e0b' }}>{images.filter(img => img.status === 'uploading').length}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Uploading</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', color: '#ef4444' }}>{errorCount}</div>
              <div style={{ fontSize: '0.9rem', opacity: 0.8 }}>Errors</div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '30px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={migrateAllImages}
            disabled={migrating}
            style={{
              background: migrating ? 'rgba(139, 69, 19, 0.5)' : 'rgba(139, 69, 19, 0.8)',
              color: '#f5f5dc',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: migrating ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            {migrating ? 'Migrating...' : 'Migrate All Images'}
          </button>

          <button
            onClick={updateGalleryDatabase}
            disabled={completedCount === 0}
            style={{
              background: completedCount === 0 ? 'rgba(34, 197, 94, 0.5)' : 'rgba(34, 197, 94, 0.8)',
              color: '#f5f5dc',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: completedCount === 0 ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            Update Gallery Database
          </button>

          <button
            onClick={generateCSSUpdates}
            disabled={completedCount === 0}
            style={{
              background: completedCount === 0 ? 'rgba(59, 130, 246, 0.5)' : 'rgba(59, 130, 246, 0.8)',
              color: '#f5f5dc',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              cursor: completedCount === 0 ? 'not-allowed' : 'pointer',
              fontSize: '1rem',
              fontWeight: '600'
            }}
          >
            📋 Copy CSS Updates
          </button>
        </div>

        {error && (
          <div style={{
            background: 'rgba(220, 38, 38, 0.2)',
            border: '1px solid rgba(220, 38, 38, 0.5)',
            color: '#fca5a5',
            padding: '15px',
            borderRadius: '8px',
            marginBottom: '20px'
          }}>
            {error}
          </div>
        )}

        {/* Images List */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {images.map((image, index) => (
            <div key={image.filename} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '20px',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '15px'
              }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  margin: 0
                }}>
                  {image.filename}
                </h3>
                <span style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  background: 
                    image.status === 'completed' ? 'rgba(16, 185, 129, 0.2)' :
                    image.status === 'uploading' ? 'rgba(245, 158, 11, 0.2)' :
                    image.status === 'error' ? 'rgba(220, 38, 38, 0.2)' :
                    'rgba(107, 114, 128, 0.2)',
                  color: 
                    image.status === 'completed' ? '#10b981' :
                    image.status === 'uploading' ? '#f59e0b' :
                    image.status === 'error' ? '#ef4444' :
                    '#9ca3af'
                }}>
                  {image.status}
                </span>
              </div>

              <div style={{ marginBottom: '15px', fontSize: '0.9rem', opacity: 0.8 }}>
                <div>Path: {image.publicPath}</div>
                <div>Size: {image.size}</div>
              </div>

              {image.supabaseUrl && (
                <div style={{
                  background: 'rgba(0, 0, 0, 0.2)',
                  padding: '10px',
                  borderRadius: '4px',
                  fontSize: '0.8rem',
                  wordBreak: 'break-all',
                  marginBottom: '10px'
                }}>
                  <strong>Supabase URL:</strong><br />
                  {image.supabaseUrl}
                </div>
              )}

              {image.error && (
                <div style={{
                  background: 'rgba(220, 38, 38, 0.2)',
                  border: '1px solid rgba(220, 38, 38, 0.5)',
                  color: '#fca5a5',
                  padding: '10px',
                  borderRadius: '4px',
                  fontSize: '0.8rem'
                }}>
                  {image.error}
                </div>
              )}

              {image.status === 'pending' && (
                <button
                  onClick={() => migrateImage(image, index)}
                  style={{
                    background: 'rgba(59, 130, 246, 0.8)',
                    color: '#f5f5dc',
                    border: 'none',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Migrate This Image
                </button>
              )}
            </div>
          ))}
        </div>

        {/* Instructions */}
        <div style={{
          background: 'rgba(59, 130, 246, 0.1)',
          border: '1px solid rgba(59, 130, 246, 0.3)',
          borderRadius: '12px',
          padding: '20px',
          marginTop: '30px'
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>📋 Instructions</h3>
          <ol style={{ fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '20px' }}>
            <li><strong>Migrate Images:</strong> Click "Migrate All Images" to upload all images to Supabase storage</li>
            <li><strong>Update Database:</strong> After migration completes, click "Update Gallery Database" to use the new URLs</li>
            <li><strong>Copy CSS Updates:</strong> Click "📋 Copy CSS Updates" to get the new URLs for your CSS files</li>
            <li><strong>Update CSS Files:</strong> Replace old URLs with new Supabase URLs in your CSS</li>
            <li><strong>Remove Local Files:</strong> After successful migration and CSS updates, you can delete the original files from /public to reduce project size</li>
            <li><strong>Benefits:</strong> 
              <ul style={{ marginTop: '5px' }}>
                <li>✅ 3-5x faster loading times</li>
                <li>✅ Global CDN distribution</li>
                <li>✅ Reduced project size (~2-3MB smaller)</li>
                <li>✅ Better mobile performance</li>
                <li>✅ Optimized caching</li>
              </ul>
            </li>
          </ol>
        </div>

        {/* File Removal Warning */}
        <div style={{
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: '12px',
          padding: '20px',
          marginTop: '20px'
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '15px' }}>⚠️ Important: File Removal</h3>
          <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
            <p><strong>After successful migration:</strong></p>
            <ol style={{ paddingLeft: '20px', marginTop: '10px' }}>
              <li>Test your site to ensure all images load from Supabase</li>
              <li>Update CSS files with new Supabase URLs</li>
              <li>Remove these files from /public to reduce project size:</li>
              <ul style={{ marginTop: '5px', paddingLeft: '20px' }}>
                <li>background.jpg, background-original.jpg</li>
                <li>logo.png</li>
                <li>insta1.png, insta10.jpg</li>
                <li>lore1.png, lore2.png, lore3.png, lore4.png</li>
                <li>/fonts/ directory (all font files)</li>
              </ul>
            </ol>
            <p style={{ marginTop: '15px', fontWeight: 'bold', color: '#f59e0b' }}>
              🎯 Result: Project will be ~2-3MB smaller and site will load much faster!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
