'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import AdminLayout from '@/components/AdminLayout'

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

  if (loading || loadingContent || !user) {
    return (
      <div style={{ minHeight: '100vh', background: '#0C0C0C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.8rem', color: '#4A4540', letterSpacing: '0.1em' }}>Loading…</span>
      </div>
    )
  }

  const filteredContent = selectedSection === 'all' 
    ? content 
    : { [selectedSection]: content[selectedSection] || [] }

  const lbl: React.CSSProperties = {
    display: 'block',
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '0.62rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: '#4A4540',
    marginBottom: '8px',
  }

  return (
    <AdminLayout active="Content">
    <div>
      {/* Header */}
      <div style={{ marginBottom: '36px', paddingBottom: '28px', borderBottom: '1px solid #1E1E1E', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
        <div>
          <span style={lbl}>Content Management</span>
          <h1 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: 'clamp(1.8rem, 3vw, 2.4rem)', fontWeight: 600, color: '#EDE9E0', lineHeight: 1.1, margin: 0 }}>
            Site Content
          </h1>
        </div>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          <select value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} className="input" style={{ width: 'auto', padding: '8px 12px' }}>
            <option value="all">All Sections</option>
            {Object.keys(content).map(section => (
              <option key={section} value={section}>{sectionNames[section] || section}</option>
            ))}
          </select>
          <button onClick={() => setShowAddForm(true)} className="btn-gold" style={{ fontSize: '0.72rem' }}>
            + Add Content
          </button>
        </div>
      </div>

      <div>
        {/* Add/Edit Form */}
        {/* Add / Edit Form */}
        {showAddForm && (
          <div style={{ background: '#111111', border: '1px solid #1E1E1E', borderTop: '2px solid #C4922A', padding: '28px', marginBottom: '36px' }}>
            <h2 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.5rem', fontWeight: 600, color: '#EDE9E0', marginBottom: '24px' }}>
              {editingContent ? 'Edit Content' : 'Add Content'}
            </h2>
            <form onSubmit={handleSubmit}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px', marginBottom: '16px' }}>
                <div>
                  <label style={lbl}>Section *</label>
                  <select value={formData.section} onChange={(e) => setFormData(prev => ({ ...prev, section: e.target.value }))} required className="input">
                    <option value="">Select section</option>
                    {Object.keys(sectionNames).map(s => <option key={s} value={s}>{sectionNames[s]}</option>)}
                  </select>
                </div>
                <div>
                  <label style={lbl}>Key *</label>
                  <input type="text" value={formData.key} onChange={(e) => setFormData(prev => ({ ...prev, key: e.target.value }))} placeholder="unique_key" required className="input" />
                </div>
                <div>
                  <label style={lbl}>Type</label>
                  <select value={formData.content_type} onChange={(e) => setFormData(prev => ({ ...prev, content_type: e.target.value }))} className="input">
                    <option value="text">Text</option>
                    <option value="html">HTML</option>
                    <option value="url">URL</option>
                  </select>
                </div>
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={lbl}>Title</label>
                <input type="text" value={formData.title} onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))} placeholder="Display title" className="input" />
              </div>
              <div style={{ marginBottom: '16px' }}>
                <label style={lbl}>Content *</label>
                <textarea value={formData.content} onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))} placeholder="Enter content…" required rows={formData.content_type === 'url' ? 2 : 5} className="input" style={{ resize: 'vertical' }} />
              </div>
              <div style={{ display: 'flex', gap: '20px', marginBottom: '20px', alignItems: 'center' }}>
                <div>
                  <label style={lbl}>Order</label>
                  <input type="number" value={formData.display_order} onChange={(e) => setFormData(prev => ({ ...prev, display_order: parseInt(e.target.value) || 0 }))} className="input" style={{ width: '100px' }} />
                </div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.8rem', color: '#8A857D', marginTop: '20px' }}>
                  <input type="checkbox" checked={formData.active} onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))} />
                  Active
                </label>
              </div>
              {error && (
                <div style={{ background: 'rgba(220,38,38,0.08)', border: '1px solid rgba(220,38,38,0.2)', color: '#f87171', padding: '10px 14px', marginBottom: '16px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.82rem' }}>
                  {error}
                </div>
              )}
              <div style={{ display: 'flex', gap: '8px' }}>
                <button type="submit" disabled={saving} className="btn-gold" style={{ opacity: saving ? 0.6 : 1, cursor: saving ? 'not-allowed' : 'pointer', fontSize: '0.72rem' }}>
                  {saving ? 'Saving…' : (editingContent ? 'Update' : 'Add Content')}
                </button>
                <button type="button" onClick={resetForm} className="btn-outline" style={{ fontSize: '0.72rem' }}>Cancel</button>
              </div>
            </form>
          </div>
        )}

        {/* Content sections */}
        {Object.keys(filteredContent).length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', background: '#111111', border: '1px solid #1E1E1E' }}>
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', color: '#4A4540', marginBottom: '20px' }}>
              No content found. Run the SQL schema in Supabase or add manually.
            </p>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <button onClick={() => setShowAddForm(true)} className="btn-gold" style={{ fontSize: '0.72rem' }}>Add Manually</button>
              <button onClick={() => window.location.reload()} className="btn-outline" style={{ fontSize: '0.72rem' }}>Refresh</button>
            </div>
          </div>
        ) : (
          Object.keys(filteredContent).map(section => (
            <div key={section} style={{ marginBottom: '32px', background: '#111111', border: '1px solid #1E1E1E' }}>
              <div style={{ padding: '12px 20px', borderBottom: '1px solid #1E1E1E', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <h3 style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '1.1rem', fontWeight: 600, color: '#EDE9E0', margin: 0 }}>
                  {sectionNames[section] || section}
                </h3>
                <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.7rem', color: '#4A4540' }}>
                  {filteredContent[section].length} items
                </span>
              </div>
              <div style={{ padding: '16px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '2px', background: '#1E1E1E' }}>
                {filteredContent[section].map((item) => (
                  <div key={item.id} style={{ background: '#111111', padding: '16px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                      <div>
                        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.88rem', color: '#EDE9E0', marginBottom: '6px', fontWeight: 500 }}>
                          {item.title || item.key}
                        </p>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          <span className="badge badge-gray">{item.key}</span>
                          <span className="badge badge-gray">{item.content_type}</span>
                          <span className={item.active ? 'badge badge-green' : 'badge badge-amber'}>{item.active ? 'Active' : 'Inactive'}</span>
                        </div>
                      </div>
                    </div>
                    <div style={{ background: '#0C0C0C', padding: '10px', marginBottom: '12px', maxHeight: '80px', overflowY: 'auto', wordBreak: 'break-word', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.78rem', color: '#8A857D', lineHeight: 1.5 }}>
                      {item.content_type === 'url'
                        ? <a href={item.content} target="_blank" rel="noopener noreferrer" style={{ color: '#C4922A', textDecoration: 'none' }}>{item.content}</a>
                        : item.content}
                    </div>
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button onClick={() => handleEdit(item)} className="btn-outline" style={{ fontSize: '0.68rem', padding: '5px 12px' }}>Edit</button>
                      <button onClick={() => toggleActive(item.id, item.active)} className="btn-outline" style={{ fontSize: '0.68rem', padding: '5px 12px' }}>{item.active ? 'Hide' : 'Show'}</button>
                      <button onClick={() => handleDelete(item.id)} className="btn-outline" style={{ fontSize: '0.68rem', padding: '5px 12px', color: '#f87171', borderColor: 'rgba(248,113,113,0.3)' }}>Delete</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
    </AdminLayout>
  )
}
