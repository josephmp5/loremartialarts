'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

interface SiteContent {
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

interface ContentBySection {
  [section: string]: SiteContent[]
}

export default function ContentManagement() {
  const { user, loading } = useAuth()
  const router = useRouter()
  const [content, setContent] = useState<ContentBySection>({})
  const [loadingContent, setLoadingContent] = useState(true)
  const [editingContent, setEditingContent] = useState<SiteContent | null>(null)
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    section: '',
    key: '',
    title: '',
    content: '',
    content_type: 'text',
    display_order: 0,
    active: true
  })
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [selectedSection, setSelectedSection] = useState('all')

  const sectionNames: { [key: string]: string } = {
    hero: 'Hero Section',
    about: 'About Section',
    youtube: 'YouTube Section',
    gallery: 'Gallery Section',
    locations: 'Locations Section',
    contact: 'Contact Section',
    navigation: 'Navigation Menu'
  }

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchContent()
    }
  }, [user])

  const fetchContent = async () => {
    if (!supabase) {
      setLoadingContent(false)
      return
    }
    
    const { data, error } = await supabase
      .from('site_content')
      .select('*')
      .order('section', { ascending: true })
      .order('display_order', { ascending: true })

    if (data) {
      // Group by section
      const grouped: ContentBySection = {}
      data.forEach(item => {
        if (!grouped[item.section]) {
          grouped[item.section] = []
        }
        grouped[item.section].push(item)
      })
      setContent(grouped)
    }
    setLoadingContent(false)
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
      if (editingContent) {
        // Update existing content
        const { error } = await supabase
          .from('site_content')
          .update({
            ...formData,
            updated_at: new Date().toISOString()
          })
          .eq('id', editingContent.id)

        if (error) {
          setError(error.message)
        } else {
          fetchContent()
          resetForm()
        }
      } else {
        // Create new content
        const { error } = await supabase
          .from('site_content')
          .insert(formData)

        if (error) {
          setError(error.message)
        } else {
          fetchContent()
          resetForm()
        }
      }
    } catch (err) {
      setError('Failed to save content')
    }
    
    setSaving(false)
  }

  const resetForm = () => {
    setFormData({
      section: '',
      key: '',
      title: '',
      content: '',
      content_type: 'text',
      display_order: 0,
      active: true
    })
    setEditingContent(null)
    setShowAddForm(false)
    setError('')
  }

  const handleEdit = (contentItem: SiteContent) => {
    setFormData({
      section: contentItem.section,
      key: contentItem.key,
      title: contentItem.title,
      content: contentItem.content,
      content_type: contentItem.content_type,
      display_order: contentItem.display_order,
      active: contentItem.active
    })
    setEditingContent(contentItem)
    setShowAddForm(true)
  }

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this content item?')) {
      return
    }

    if (!supabase) {
      setError('Database not available')
      return
    }

    try {
      const { error } = await supabase
        .from('site_content')
        .delete()
        .eq('id', id)

      if (error) {
        setError(error.message)
      } else {
        fetchContent()
      }
    } catch (err) {
      setError('Failed to delete content')
    }
  }

  const toggleActive = async (id: string, currentStatus: boolean) => {
    if (!supabase) {
      setError('Database not available')
      return
    }
    
    try {
      const { error } = await supabase
        .from('site_content')
        .update({ active: !currentStatus })
        .eq('id', id)

      if (!error) {
        fetchContent()
      }
    } catch (err) {
      setError('Failed to update content status')
    }
  }

  if (loading || loadingContent) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: '#f5f5dc',
        fontFamily: 'Go3v2, serif'
      }}>
        Loading...
      </div>
    )
  }

  if (!user) {
    return null
  }

  const filteredContent = selectedSection === 'all' 
    ? content 
    : { [selectedSection]: content[selectedSection] || [] }

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
            Content Management
          </h1>
          <p style={{
            margin: '5px 0 0 0',
            opacity: 0.8,
            fontSize: '1rem'
          }}>
            Manage all text content on your website
          </p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <select
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              color: '#f5f5dc',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              padding: '8px 12px',
              borderRadius: '6px',
              fontSize: '0.9rem',
              outline: 'none'
            }}
          >
            <option value="all">All Sections</option>
            {Object.keys(content).map(section => (
              <option key={section} value={section}>
                {sectionNames[section] || section}
              </option>
            ))}
          </select>
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
            + Add Content
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
              {editingContent ? 'Edit Content' : 'Add New Content'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    color: '#f5f5dc',
                    marginBottom: '8px',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    Section *
                  </label>
                  <select
                    value={formData.section}
                    onChange={(e) => setFormData(prev => ({ ...prev, section: e.target.value }))}
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
                  >
                    <option value="">Select Section</option>
                    {Object.keys(sectionNames).map(section => (
                      <option key={section} value={section}>
                        {sectionNames[section]}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div>
                  <label style={{
                    display: 'block',
                    color: '#f5f5dc',
                    marginBottom: '8px',
                    fontSize: '1rem',
                    fontWeight: '600'
                  }}>
                    Key *
                  </label>
                  <input
                    type="text"
                    value={formData.key}
                    onChange={(e) => setFormData(prev => ({ ...prev, key: e.target.value }))}
                    placeholder="unique_key"
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
                    Content Type
                  </label>
                  <select
                    value={formData.content_type}
                    onChange={(e) => setFormData(prev => ({ ...prev, content_type: e.target.value }))}
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
                  >
                    <option value="text">Text</option>
                    <option value="html">HTML</option>
                    <option value="url">URL</option>
                  </select>
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
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Display title"
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
                  Content *
                </label>
                <textarea
                  value={formData.content}
                  onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                  placeholder="Enter your content..."
                  required
                  rows={formData.content_type === 'url' ? 2 : 5}
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

              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px' }}>
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
                      width: '120px',
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
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    marginTop: '32px'
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
                  {saving ? 'Saving...' : (editingContent ? 'Update' : 'Add Content')}
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

        {/* Content Sections */}
        {Object.keys(filteredContent).length === 0 ? (
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
              No content found
            </h3>
            <p style={{
              fontSize: '1rem',
              opacity: 0.6,
              marginBottom: '20px'
            }}>
              You need to run the SQL schema to populate the content database
            </p>
            <div style={{
              background: 'rgba(59, 130, 246, 0.1)',
              border: '1px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '8px',
              padding: '20px',
              marginBottom: '20px',
              textAlign: 'left'
            }}>
              <h4 style={{ fontSize: '1.1rem', marginBottom: '10px' }}>📋 To fix this:</h4>
              <ol style={{ fontSize: '0.9rem', lineHeight: '1.6', paddingLeft: '20px' }}>
                <li>Go to your <strong>Supabase project dashboard</strong></li>
                <li>Click <strong>"SQL Editor"</strong> in the left sidebar</li>
                <li>Copy and paste the entire <strong>supabase-schema.sql</strong> file content</li>
                <li>Click <strong>"Run"</strong></li>
                <li>Refresh this page</li>
              </ol>
            </div>
            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
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
                Add Content Manually
              </button>
              <button
                onClick={() => window.location.reload()}
                style={{
                  background: 'rgba(34, 197, 94, 0.8)',
                  color: '#f5f5dc',
                  border: 'none',
                  padding: '12px 24px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Refresh Page
              </button>
            </div>
          </div>
        ) : (
          Object.keys(filteredContent).map(section => (
            <div key={section} style={{
              marginBottom: '40px',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              overflow: 'hidden'
            }}>
              <div style={{
                background: 'rgba(139, 69, 19, 0.3)',
                padding: '15px 25px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
              }}>
                <h3 style={{
                  fontSize: '1.3rem',
                  margin: 0,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}>
                  {sectionNames[section] || section} ({filteredContent[section].length} items)
                </h3>
              </div>
              
              <div style={{ padding: '20px' }}>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
                  gap: '20px'
                }}>
                  {filteredContent[section].map((item) => (
                    <div key={item.id} style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      borderRadius: '8px',
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
                        <div>
                          <h4 style={{
                            fontSize: '1.1rem',
                            fontWeight: '600',
                            marginBottom: '5px',
                            color: '#f5f5dc'
                          }}>
                            {item.title || item.key}
                          </h4>
                          <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                            <span style={{
                              fontSize: '0.8rem',
                              background: 'rgba(59, 130, 246, 0.2)',
                              color: '#60a5fa',
                              padding: '2px 6px',
                              borderRadius: '3px'
                            }}>
                              {item.key}
                            </span>
                            <span style={{
                              fontSize: '0.8rem',
                              background: 'rgba(16, 185, 129, 0.2)',
                              color: '#34d399',
                              padding: '2px 6px',
                              borderRadius: '3px'
                            }}>
                              {item.content_type}
                            </span>
                            <span style={{
                              padding: '2px 6px',
                              borderRadius: '3px',
                              fontSize: '0.8rem',
                              background: item.active ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                              color: item.active ? '#10b981' : '#f59e0b'
                            }}>
                              {item.active ? 'Active' : 'Inactive'}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div style={{ marginBottom: '15px' }}>
                        <div style={{
                          background: 'rgba(0, 0, 0, 0.2)',
                          padding: '10px',
                          borderRadius: '4px',
                          fontSize: '0.9rem',
                          maxHeight: '100px',
                          overflowY: 'auto',
                          wordBreak: 'break-word'
                        }}>
                          {item.content_type === 'url' ? (
                            <a href={item.content} target="_blank" rel="noopener noreferrer" style={{
                              color: '#60a5fa',
                              textDecoration: 'none'
                            }}>
                              {item.content}
                            </a>
                          ) : (
                            item.content
                          )}
                        </div>
                      </div>
                      
                      <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                        <button
                          onClick={() => handleEdit(item)}
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
                          onClick={() => toggleActive(item.id, item.active)}
                          style={{
                            background: item.active ? 'rgba(245, 158, 11, 0.8)' : 'rgba(16, 185, 129, 0.8)',
                            color: '#f5f5dc',
                            border: 'none',
                            padding: '6px 12px',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '0.8rem'
                          }}
                        >
                          {item.active ? 'Hide' : 'Show'}
                        </button>
                        
                        <button
                          onClick={() => handleDelete(item.id)}
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
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
