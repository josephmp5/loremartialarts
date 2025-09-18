'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

interface TrainingLocation {
  id: string
  name: string
  address: string
  schedule: string
  features: string[]
  map_embed_url: string | null
  icon: string
  active: boolean
  created_at: string
  updated_at: string
}

export default function LocationsManagement() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [locations, setLocations] = useState<TrainingLocation[]>([])
  const [loadingLocations, setLoadingLocations] = useState(true)
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingLocation, setEditingLocation] = useState<TrainingLocation | null>(null)
  const [formData, setFormData] = useState({
    name: '',
    address: '',
    schedule: '',
    features: [] as string[],
    map_embed_url: '',
    icon: '🏠',
    active: true
  })
  const [newFeature, setNewFeature] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchLocations()
    }
  }, [user])

  const fetchLocations = async () => {
    if (!supabase) {
      setLoadingLocations(false)
      return
    }
    
    const { data, error } = await supabase
      .from('training_locations')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) {
      setLocations(data)
    }
    setLoadingLocations(false)
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
      if (editingLocation) {
        // Update existing location
        const { error } = await supabase
          .from('training_locations')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingLocation.id)

        if (error) {
          setError(error.message)
        } else {
          fetchLocations()
          resetForm()
        }
      } else {
        // Create new location
        const { error } = await supabase
          .from('training_locations')
          .insert(formData)

        if (error) {
          setError(error.message)
        } else {
          fetchLocations()
          resetForm()
        }
      }
    } catch (err) {
      setError('Failed to save location')
    }
    
    setSaving(false)
  }

  const resetForm = () => {
    setFormData({
      name: '',
      address: '',
      schedule: '',
      features: [],
      map_embed_url: '',
      icon: '🏠',
      active: true
    })
    setEditingLocation(null)
    setShowAddForm(false)
    setError('')
    setNewFeature('')
  }

  const handleEdit = (location: TrainingLocation) => {
    setFormData({
      name: location.name,
      address: location.address,
      schedule: location.schedule,
      features: location.features || [],
      map_embed_url: location.map_embed_url || '',
      icon: location.icon,
      active: location.active
    })
    setEditingLocation(location)
    setShowAddForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this location?')) {
      return
    }

    if (!supabase) {
      setError('Database not available')
      return
    }

    try {
      const { error } = await supabase
        .from('training_locations')
        .delete()
        .eq('id', id)

      if (error) {
        setError(error.message)
      } else {
        fetchLocations()
      }
    } catch (err) {
      setError('Failed to delete location')
    }
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    if (!supabase) {
      setError('Database not available')
      return
    }
    
    try {
      const { error } = await supabase
        .from('training_locations')
        .update({ active: !currentStatus })
        .eq('id', id)

      if (!error) {
        fetchLocations()
      }
    } catch (err) {
      setError('Failed to update location status')
    }
  }

  const addFeature = () => {
    if (newFeature.trim() && !formData.features.includes(newFeature.trim())) {
      setFormData(prev => ({
        ...prev,
        features: [...prev.features, newFeature.trim()]
      }))
      setNewFeature('')
    }
  }

  const removeFeature = (feature: string) => {
    setFormData(prev => ({
      ...prev,
      features: prev.features.filter(f => f !== feature)
    }))
  }

  if (loading || loadingLocations) {
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
            Training Locations Management
          </h1>
          <p style={{
            margin: '5px 0 0 0',
            opacity: 0.8,
            fontSize: '1rem'
          }}>
            Manage your training locations and schedules
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
            + Add Location
          </button>
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
              {editingLocation ? 'Edit Location' : 'Add New Location'}
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
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
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
                    Icon
                  </label>
                  <input
                    type="text"
                    value={formData.icon}
                    onChange={(e) => setFormData(prev => ({ ...prev, icon: e.target.value }))}
                    placeholder="🏠"
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
                  Address *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData(prev => ({ ...prev, address: e.target.value }))}
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

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  color: '#f5f5dc',
                  marginBottom: '8px',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}>
                  Schedule *
                </label>
                <input
                  type="text"
                  value={formData.schedule}
                  onChange={(e) => setFormData(prev => ({ ...prev, schedule: e.target.value }))}
                  placeholder="Every Tuesday & Thursday 20:00"
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

              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  color: '#f5f5dc',
                  marginBottom: '8px',
                  fontSize: '1rem',
                  fontWeight: '600'
                }}>
                  Features
                </label>
                <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                  <input
                    type="text"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    placeholder="Add a feature"
                    style={{
                      flex: 1,
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid rgba(255, 255, 255, 0.3)',
                      background: 'rgba(255, 255, 255, 0.1)',
                      color: '#f5f5dc',
                      fontSize: '0.9rem',
                      outline: 'none'
                    }}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault()
                        addFeature()
                      }
                    }}
                  />
                  <button
                    type="button"
                    onClick={addFeature}
                    style={{
                      background: 'rgba(59, 130, 246, 0.8)',
                      color: '#f5f5dc',
                      border: 'none',
                      padding: '10px 15px',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Add
                  </button>
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                  {formData.features.map((feature, index) => (
                    <span key={index} style={{
                      background: 'rgba(139, 69, 19, 0.3)',
                      color: '#f5f5dc',
                      padding: '6px 12px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px'
                    }}>
                      {feature}
                      <button
                        type="button"
                        onClick={() => removeFeature(feature)}
                        style={{
                          background: 'none',
                          border: 'none',
                          color: '#f5f5dc',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        ×
                      </button>
                    </span>
                  ))}
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
                  Google Maps Embed URL
                </label>
                <textarea
                  value={formData.map_embed_url}
                  onChange={(e) => setFormData(prev => ({ ...prev, map_embed_url: e.target.value }))}
                  placeholder="https://www.google.com/maps/embed?pb=..."
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
                  {saving ? 'Saving...' : (editingLocation ? 'Update' : 'Add Location')}
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

        {/* Locations List */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '20px'
        }}>
          {locations.map((location) => (
            <div key={location.id} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(10px)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              padding: '20px',
              transition: 'all 0.3s ease'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: '15px'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span style={{ fontSize: '2rem' }}>{location.icon}</span>
                  <div>
                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: '600',
                      marginBottom: '5px',
                      textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                    }}>
                      {location.name}
                    </h3>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      background: location.active ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                      color: location.active ? '#10b981' : '#f59e0b'
                    }}>
                      {location.active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <strong>Address:</strong> {location.address}
              </div>
              
              <div style={{ marginBottom: '10px' }}>
                <strong>Schedule:</strong> {location.schedule}
              </div>
              
              {location.features && location.features.length > 0 && (
                <div style={{ marginBottom: '15px' }}>
                  <strong>Features:</strong>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '5px' }}>
                    {location.features.map((feature, index) => (
                      <span key={index} style={{
                        background: 'rgba(139, 69, 19, 0.2)',
                        color: '#f5f5dc',
                        padding: '4px 8px',
                        borderRadius: '4px',
                        fontSize: '0.8rem'
                      }}>
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                <button
                  onClick={() => handleEdit(location)}
                  style={{
                    background: 'rgba(59, 130, 246, 0.8)',
                    color: '#f5f5dc',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Edit
                </button>
                
                <button
                  onClick={() => toggleActive(location.id, location.active)}
                  style={{
                    background: location.active ? 'rgba(245, 158, 11, 0.8)' : 'rgba(16, 185, 129, 0.8)',
                    color: '#f5f5dc',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  {location.active ? 'Hide' : 'Show'}
                </button>
                
                <button
                  onClick={() => handleDelete(location.id)}
                  style={{
                    background: 'rgba(220, 38, 38, 0.8)',
                    color: '#f5f5dc',
                    border: 'none',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    fontSize: '0.8rem'
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>

        {locations.length === 0 && (
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
              No training locations yet
            </h3>
            <p style={{
              fontSize: '1rem',
              opacity: 0.6,
              marginBottom: '20px'
            }}>
              Add your first training location to get started
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
                fontSize: '1rem'
              }}
            >
              Add First Location
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
