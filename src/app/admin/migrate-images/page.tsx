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
    { filename: 'background.jpg', publicPath: '/background.jpg', size: '~500KB', status: 'pending' },
    { filename: 'logo.png', publicPath: '/logo.png', size: '~50KB', status: 'pending' },
    { filename: 'insta1.png', publicPath: '/insta1.png', size: '~200KB', status: 'pending' },
    { filename: 'insta10.jpg', publicPath: '/insta10.jpg', size: '~300KB', status: 'pending' },
    { filename: 'lore1.png', publicPath: '/lore1.png', size: '~250KB', status: 'pending' },
    { filename: 'lore2.png', publicPath: '/lore2.png', size: '~250KB', status: 'pending' },
    { filename: 'lore3.png', publicPath: '/lore3.png', size: '~250KB', status: 'pending' },
    { filename: 'lore4.png', publicPath: '/lore4.png', size: '~250KB', status: 'pending' }
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

      // Upload to Supabase storage
      const fileExt = image.filename.split('.').pop()
      const fileName = `${Date.now()}-${image.filename}`
      
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        })

      if (uploadError) {
        throw uploadError
      }

      // Get public URL
      const { data: urlData } = supabase.storage
        .from('gallery-images')
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
      fontFamily: 'Go3v2, serif'
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
            <li><strong>Benefits:</strong> 
              <ul style={{ marginTop: '5px' }}>
                <li>✅ Much faster loading times</li>
                <li>✅ CDN distribution worldwide</li>
                <li>✅ Better caching</li>
                <li>✅ Reduced server load</li>
              </ul>
            </li>
            <li><strong>Note:</strong> Original images in /public will remain as backup</li>
          </ol>
        </div>
      </div>
    </div>
  )
}
