'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase, getGalleryImageUrl } from '@/lib/supabase'

interface GalleryImage {
  id: string
  title: string
  description: string
  image_url: string
  display_order: number
  active: boolean
  created_at: string
}

export default function GalleryManagement() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [images, setImages] = useState<GalleryImage[]>([])
  const [loadingImages, setLoadingImages] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingImage, setEditingImage] = useState<GalleryImage | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image_url: '',
    display_order: 0,
    active: true
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchImages()
    }
  }, [user])

  const fetchImages = async () => {
    if (!supabase) {
      // Show hardcoded images when Supabase is not available
      const hardcodedImages = [
        { id: 'static-1', title: 'Outdoor Training', description: 'BJJ techniques in nature\'s embrace', image_url: getGalleryImageUrl('insta1.png'), display_order: 1, active: true, created_at: new Date().toISOString() },
        { id: 'static-2', title: 'Team Training', description: 'Building strength together in Antalya', image_url: getGalleryImageUrl('insta10.jpg'), display_order: 2, active: true, created_at: new Date().toISOString() },
        { id: 'static-3', title: 'Beach Training', description: 'Training by the Mediterranean Sea', image_url: getGalleryImageUrl('lore1.png'), display_order: 3, active: true, created_at: new Date().toISOString() },
        { id: 'static-4', title: 'Technique Focus', description: 'Perfecting BJJ techniques outdoors', image_url: getGalleryImageUrl('lore2.png'), display_order: 4, active: true, created_at: new Date().toISOString() },
        { id: 'static-5', title: 'Park Sessions', description: 'Training in Antalya\'s beautiful parks', image_url: getGalleryImageUrl('lore3.png'), display_order: 5, active: true, created_at: new Date().toISOString() },
        { id: 'static-6', title: 'Community Spirit', description: 'Building bonds through BJJ', image_url: getGalleryImageUrl('lore4.png'), display_order: 6, active: true, created_at: new Date().toISOString() }
      ]
      setImages(hardcodedImages)
      setLoadingImages(false)
      return
    }
    
    const { data, error } = await supabase
      .from('training_gallery')
      .select('*')
      .order('display_order', { ascending: true })

    if (data && data.length > 0) {
      setImages(data)
    } else {
      // If no database images, show existing hardcoded images with option to import
      const hardcodedImages = [
        { id: 'static-1', title: 'Outdoor Training', description: 'BJJ techniques in nature\'s embrace', image_url: getGalleryImageUrl('insta1.png'), display_order: 1, active: true, created_at: new Date().toISOString() },
        { id: 'static-2', title: 'Team Training', description: 'Building strength together in Antalya', image_url: getGalleryImageUrl('insta10.jpg'), display_order: 2, active: true, created_at: new Date().toISOString() },
        { id: 'static-3', title: 'Beach Training', description: 'Training by the Mediterranean Sea', image_url: getGalleryImageUrl('lore1.png'), display_order: 3, active: true, created_at: new Date().toISOString() },
        { id: 'static-4', title: 'Technique Focus', description: 'Perfecting BJJ techniques outdoors', image_url: getGalleryImageUrl('lore2.png'), display_order: 4, active: true, created_at: new Date().toISOString() },
        { id: 'static-5', title: 'Park Sessions', description: 'Training in Antalya\'s beautiful parks', image_url: getGalleryImageUrl('lore3.png'), display_order: 5, active: true, created_at: new Date().toISOString() },
        { id: 'static-6', title: 'Community Spirit', description: 'Building bonds through BJJ', image_url: getGalleryImageUrl('lore4.png'), display_order: 6, active: true, created_at: new Date().toISOString() }
      ]
      setImages(hardcodedImages)
    }
    setLoadingImages(false)
  }

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file || !supabase) return

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be smaller than 5MB')
      return
    }

    // Check file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    try {
      setError('')
      const fileExt = file.name.split('.').pop()
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`
      const filePath = `gallery-images/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('gallery-images')
        .upload(filePath, file)

      if (uploadError) {
        setError('Failed to upload image')
        return
      }

      const { data } = supabase.storage
        .from('gallery-images')
        .getPublicUrl(filePath)

      setFormData(prev => ({
        ...prev,
        image_url: data.publicUrl
      }))
    } catch (err) {
      setError('Failed to upload image')
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError('')

    if (!supabase) {
      setError('Database not available')
      setSaving(false)
      return
    }

    try {
      if (editingImage) {
        // Update existing image
        const { error } = await supabase
          .from('training_gallery')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingImage.id)

        if (error) {
          setError(error.message)
        } else {
          fetchImages()
          resetForm()
        }
      } else {
        // Create new image
        const { error } = await supabase
          .from('training_gallery')
          .insert(formData)

        if (error) {
          setError(error.message)
        } else {
          fetchImages()
          resetForm()
        }
      }
    } catch (err) {
      setError('Failed to save image')
    }
    
    setSaving(false)
  }

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image_url: '',
      display_order: images.length + 1,
      active: true
    })
    setEditingImage(null)
    setShowAddForm(false)
    setError('')
  }

  const handleEdit = (image: GalleryImage) => {
    setFormData({
      title: image.title,
      description: image.description,
      image_url: image.image_url,
      display_order: image.display_order,
      active: image.active
    })
    setEditingImage(image)
    setShowAddForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this image?')) {
      return
    }

    // Handle static images
    if (id.startsWith('static-')) {
      setError('Cannot delete static images. Use "Import to Database" to manage them.')
      return
    }

    if (!supabase) {
      setError('Database not available')
      return
    }

    try {
      const { error } = await supabase
        .from('training_gallery')
        .delete()
        .eq('id', id)

      if (error) {
        setError(error.message)
      } else {
        fetchImages()
      }
    } catch (err) {
      setError('Failed to delete image')
    }
  }

  const importStaticImages = async () => {
    if (!supabase) {
      setError('Database not available')
      return
    }

    try {
      const hardcodedImages = [
        { title: 'Outdoor Training', description: 'BJJ techniques in nature\'s embrace', image_url: getGalleryImageUrl('insta1.png'), display_order: 1, active: true },
        { title: 'Team Training', description: 'Building strength together in Antalya', image_url: getGalleryImageUrl('insta10.jpg'), display_order: 2, active: true },
        { title: 'Beach Training', description: 'Training by the Mediterranean Sea', image_url: getGalleryImageUrl('lore1.png'), display_order: 3, active: true },
        { title: 'Technique Focus', description: 'Perfecting BJJ techniques outdoors', image_url: getGalleryImageUrl('lore2.png'), display_order: 4, active: true },
        { title: 'Park Sessions', description: 'Training in Antalya\'s beautiful parks', image_url: getGalleryImageUrl('lore3.png'), display_order: 5, active: true },
        { title: 'Community Spirit', description: 'Building bonds through BJJ', image_url: getGalleryImageUrl('lore4.png'), display_order: 6, active: true }
      ]

      const { error } = await supabase
        .from('training_gallery')
        .insert(hardcodedImages)

      if (error) {
        setError('Failed to import images: ' + error.message)
      } else {
        fetchImages()
        setError('')
      }
    } catch (err) {
      setError('Failed to import images')
    }
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    if (!supabase) {
      setError('Database not available')
      return
    }
    
    try {
      const { error } = await supabase
        .from('training_gallery')
        .update({ active: !currentStatus })
        .eq('id', id)

      if (!error) {
        fetchImages()
      }
    } catch (err) {
      setError('Failed to update image status')
    }
  }

  if (loading || loadingImages) {
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
            Training Gallery Management
          </h1>
          <p style={{
            margin: '5px 0 0 0',
            opacity: 0.8,
            fontSize: '1rem'
          }}>
            Manage your training moment images
          </p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button
            onClick={() => setShowAddForm(true)}
            style={{
              background: 'rgba(139, 69, 19, 0.8)',
              color: '#f5f5dc',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(139, 69, 19, 1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(139, 69, 19, 0.8)'
            }}
          >
            + Add Image
          </button>
          {images.some(img => img.id.startsWith('static-')) && (
            <button
              onClick={importStaticImages}
              style={{
                background: 'rgba(16, 185, 129, 0.8)',
                color: '#f5f5dc',
                border: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(16, 185, 129, 0.8)'
              }}
            >
              Import to Database
            </button>
          )}
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
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            }}
          >
            ← Back to Admin
          </a>
        </div>
      </header>

      <div style={{ padding: '40px' }}>
        {/* Add/Edit Form */}
        {showAddForm && (
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '30px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            marginBottom: '40px'
          }}>
            <h2 style={{
              fontSize: '1.5rem',
              marginBottom: '20px',
              textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
            }}>
              {editingImage ? 'Edit Image' : 'Add New Image'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    color: '#f5f5dc',
                    marginBottom: '8px',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                    required
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#f5f5dc',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    color: '#f5f5dc',
                    marginBottom: '8px',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    Display Order
                  </label>
                  <input
                    type="number"
                    value={formData.display_order}
                    onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#f5f5dc',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  color: '#f5f5dc',
                  marginBottom: '8px',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}>
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={3}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#f5f5dc',
                    fontSize: '0.9rem',
                    outline: 'none',
                    resize: 'vertical'
                  }}
                />
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  color: '#f5f5dc',
                  marginBottom: '8px',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}>
                  Image Upload
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{
                    width: '100%',
                    padding: '10px 12px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    background: 'rgba(255, 255, 255, 0.1)',
                    color: '#f5f5dc',
                    fontSize: '0.9rem',
                    outline: 'none'
                  }}
                />
                {formData.image_url && (
                  <div style={{ marginTop: '10px' }}>
                    <img
                      src={formData.image_url}
                      alt="Image preview"
                      style={{
                        maxWidth: '200px',
                        height: '120px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        border: '1px solid rgba(255, 255, 255, 0.2)'
                      }}
                    />
                  </div>
                )}
              </div>

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer'
                }}>
                  <input
                    type="checkbox"
                    checked={formData.active}
                    onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
                    style={{ margin: 0 }}
                  />
                  <span style={{ fontSize: '0.9rem' }}>Active (show on website)</span>
                </label>
              </div>

              {error && (
                <div style={{
                  background: 'rgba(220, 38, 38, 0.2)',
                  border: '1px solid rgba(220, 38, 38, 0.5)',
                  color: '#fca5a5',
                  padding: '10px',
                  borderRadius: '6px',
                  marginBottom: '15px',
                  fontSize: '0.9rem'
                }}>
                  {error}
                </div>
              )}

              <div style={{ display: 'flex', gap: '10px' }}>
                <button
                  type="submit"
                  disabled={saving}
                  style={{
                    background: saving ? 'rgba(139, 69, 19, 0.5)' : 'rgba(139, 69, 19, 0.8)',
                    color: '#f5f5dc',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: saving ? 'not-allowed' : 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  {saving ? 'Saving...' : (editingImage ? 'Update' : 'Add Image')}
                </button>
                <button
                  type="button"
                  onClick={resetForm}
                  style={{
                    background: 'rgba(107, 114, 128, 0.8)',
                    color: '#f5f5dc',
                    border: 'none',
                    padding: '10px 20px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                    fontSize: '0.9rem'
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Gallery Images Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '20px'
        }}>
          {images.map((image) => (
            <div key={image.id} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                width: '100%',
                height: '200px',
                overflow: 'hidden'
              }}>
                <img
                  src={image.image_url}
                  alt={image.title}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                />
              </div>
              
              <div style={{ padding: '15px' }}>
                <h3 style={{
                  fontSize: '1.1rem',
                  fontWeight: '600',
                  marginBottom: '8px',
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}>
                  {image.title}
                </h3>
                
                {image.description && (
                  <p style={{
                    fontSize: '0.9rem',
                    opacity: 0.8,
                    marginBottom: '10px',
                    lineHeight: '1.4'
                  }}>
                    {image.description}
                  </p>
                )}
                
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginBottom: '15px'
                }}>
                  <span style={{
                    fontSize: '0.8rem',
                    opacity: 0.7
                  }}>
                    Order: {image.display_order}
                  </span>
                  <span style={{
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '0.8rem',
                    background: image.active ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                    color: image.active ? '#10b981' : '#f59e0b'
                  }}>
                    {image.active ? 'Active' : 'Inactive'}
                  </span>
                </div>
                
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {!image.id.startsWith('static-') ? (
                    <button
                      onClick={() => handleEdit(image)}
                      style={{
                        background: 'rgba(59, 130, 246, 0.8)',
                        color: '#f5f5dc',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 1)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'rgba(59, 130, 246, 0.8)'
                      }}
                    >
                      Edit
                    </button>
                  ) : (
                    <span style={{
                      background: 'rgba(107, 114, 128, 0.3)',
                      color: '#9ca3af',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      fontSize: '0.8rem'
                    }}>
                      Static Image
                    </span>
                  )}
                  
                  <button
                    onClick={() => toggleActive(image.id, image.active)}
                    style={{
                      background: image.active ? 'rgba(245, 158, 11, 0.8)' : 'rgba(16, 185, 129, 0.8)',
                      color: '#f5f5dc',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.opacity = '0.8'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.opacity = '1'
                    }}
                  >
                    {image.active ? 'Hide' : 'Show'}
                  </button>
                  
                  <button
                    onClick={() => handleDelete(image.id)}
                    style={{
                      background: 'rgba(220, 38, 38, 0.8)',
                      color: '#f5f5dc',
                      border: 'none',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      fontSize: '0.8rem',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = 'rgba(220, 38, 38, 1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = 'rgba(220, 38, 38, 0.8)'
                    }}
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {images.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              marginBottom: '15px',
              opacity: 0.8
            }}>
              No images yet
            </h3>
            <p style={{
              fontSize: '1rem',
              opacity: 0.6,
              marginBottom: '20px'
            }}>
              Add your first training moment image to get started
            </p>
            <button
              onClick={() => setShowAddForm(true)}
              style={{
                background: 'rgba(139, 69, 19, 0.8)',
                color: '#f5f5dc',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '1rem',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(139, 69, 19, 1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(139, 69, 19, 0.8)'
              }}
            >
              Add First Image
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
