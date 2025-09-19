'use client'

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'
import RichTextEditor from '@/components/RichTextEditor'

interface Category {
  id: string
  name: string
  slug: string
}

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image_url: string | null
  published: boolean
  created_at: string
  updated_at: string
}

export default function EditBlogPost() {
  const { user, loading } = useAuth()
  const params = useParams()
  const router = useRouter()
  const [categories, setCategories] = useState<Category[]>([])
  const [post, setPost] = useState<BlogPost | null>(null)
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    content: '',
    excerpt: '',
    featured_image_url: '',
    published: false,
    category_ids: [] as string[]
  })
  const [saving, setSaving] = useState(false)
  const [loadingPost, setLoadingPost] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user && params.id) {
      fetchPost()
      fetchCategories()
    }
  }, [user, params.id])

  const fetchPost = async () => {
    if (!supabase) {
      setError('Database not available')
      setLoadingPost(false)
      return
    }
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select(`
        *,
        blog_post_categories(category_id)
      `)
      .eq('id', params.id)
      .single()

    if (error) {
      setError('Post not found')
    } else {
      setPost(data)
      setFormData({
        title: data.title,
        slug: data.slug,
        content: data.content,
        excerpt: data.excerpt || '',
        featured_image_url: data.featured_image_url || '',
        published: data.published,
        category_ids: data.blog_post_categories?.map((c: any) => c.category_id) || []
      })
    }
    setLoadingPost(false)
  }

  const fetchCategories = async () => {
    if (!supabase) return
    
    const { data } = await supabase
      .from('blog_categories')
      .select('*')
      .order('name')
    
    if (data) {
      setCategories(data)
    }
  }

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '')
  }

  const handleTitleChange = (title: string) => {
    setFormData(prev => ({
      ...prev,
      title,
      slug: generateSlug(title)
    }))
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
      const filePath = `blog-images/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file)

      if (uploadError) {
        setError('Failed to upload image')
        return
      }

      const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath)

      setFormData(prev => ({
        ...prev,
        featured_image_url: data.publicUrl
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
      // Update the blog post
      const { error: postError } = await supabase
        .from('blog_posts')
        .update({
          title: formData.title,
          slug: formData.slug,
          content: formData.content,
          excerpt: formData.excerpt,
          featured_image_url: formData.featured_image_url,
          published: formData.published,
          updated_at: new Date().toISOString()
        })
        .eq('id', params.id)

      if (postError) {
        setError(postError.message)
        setSaving(false)
        return
      }

      // Update categories
      // First, delete existing categories
      await supabase
        .from('blog_post_categories')
        .delete()
        .eq('post_id', params.id)

      // Then, insert new categories
      if (formData.category_ids.length > 0) {
        const categoryInserts = formData.category_ids.map(categoryId => ({
          post_id: params.id,
          category_id: categoryId
        }))

        const { error: categoryError } = await supabase
          .from('blog_post_categories')
          .insert(categoryInserts)

        if (categoryError) {
          setError('Failed to update categories')
          setSaving(false)
          return
        }
      }

      router.push('/admin')
    } catch (err) {
      setError('Failed to update blog post')
    }
    
    setSaving(false)
  }

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this blog post? This action cannot be undone.')) {
      return
    }

    if (!supabase) {
      setError('Database not available')
      return
    }

    try {
      const { error } = await supabase
        .from('blog_posts')
        .delete()
        .eq('id', params.id)

      if (error) {
        setError(error.message)
      } else {
        router.push('/admin')
      }
    } catch (err) {
      setError('Failed to delete blog post')
    }
  }

  if (loading || loadingPost) {
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

  if (!user || !post) {
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
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>404</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>Post not found</p>
          <a
            href="/admin"
            style={{
              color: '#e8e8d0',
              textDecoration: 'none',
              padding: '12px 24px',
              borderRadius: '8px',
              background: 'rgba(139, 69, 19, 0.8)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(139, 69, 19, 1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(139, 69, 19, 0.8)'
            }}
          >
            Back to Admin
          </a>
        </div>
      </div>
    )
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
            Edit Blog Post
          </h1>
          <p style={{
            margin: '5px 0 0 0',
            opacity: 0.8,
            fontSize: '1rem'
          }}>
            {post.title}
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
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
            }}
          >
            ← Back to Admin
          </a>
          <button
            onClick={handleDelete}
            style={{
              background: 'rgba(220, 38, 38, 0.8)',
              color: '#f5f5dc',
              border: 'none',
              padding: '8px 16px',
              borderRadius: '6px',
              cursor: 'pointer',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(220, 38, 38, 1)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(220, 38, 38, 0.8)'
            }}
          >
            Delete Post
          </button>
        </div>
      </header>

      <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
        <form onSubmit={handleSubmit}>
          {/* Title */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              color: '#f5f5dc',
              marginBottom: '8px',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#f5f5dc',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#dc2626'
                e.target.style.background = 'rgba(255, 255, 255, 0.15)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                e.target.style.background = 'rgba(255, 255, 255, 0.1)'
              }}
            />
          </div>

          {/* Slug */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              color: '#f5f5dc',
              marginBottom: '8px',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              URL Slug *
            </label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData(prev => ({ ...prev, slug: e.target.value }))}
              required
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#f5f5dc',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#dc2626'
                e.target.style.background = 'rgba(255, 255, 255, 0.15)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                e.target.style.background = 'rgba(255, 255, 255, 0.1)'
              }}
            />
            <p style={{
              fontSize: '0.9rem',
              opacity: 0.7,
              marginTop: '5px'
            }}>
              This will be the URL: /blog/{formData.slug}
            </p>
          </div>

          {/* Featured Image */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              color: '#f5f5dc',
              marginBottom: '8px',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              Featured Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#f5f5dc',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease'
              }}
            />
            {formData.featured_image_url && (
              <div style={{ marginTop: '15px' }}>
                <img
                  src={formData.featured_image_url}
                  alt="Featured image preview"
                  style={{
                    maxWidth: '300px',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '8px',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}
                />
              </div>
            )}
          </div>

          {/* Categories */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              color: '#f5f5dc',
              marginBottom: '8px',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              Categories
            </label>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
              {categories.map((category) => (
                <label key={category.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '8px 16px',
                  borderRadius: '6px',
                  background: formData.category_ids.includes(category.id) 
                    ? 'rgba(220, 38, 38, 0.8)' 
                    : 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}>
                  <input
                    type="checkbox"
                    checked={formData.category_ids.includes(category.id)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData(prev => ({
                          ...prev,
                          category_ids: [...prev.category_ids, category.id]
                        }))
                      } else {
                        setFormData(prev => ({
                          ...prev,
                          category_ids: prev.category_ids.filter(id => id !== category.id)
                        }))
                      }
                    }}
                    style={{ margin: 0 }}
                  />
                  {category.name}
                </label>
              ))}
            </div>
          </div>

          {/* Excerpt */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              color: '#f5f5dc',
              marginBottom: '8px',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              Excerpt (Short Summary)
            </label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
              rows={3}
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                background: 'rgba(255, 255, 255, 0.1)',
                color: '#f5f5dc',
                fontSize: '1rem',
                outline: 'none',
                transition: 'all 0.3s ease',
                resize: 'vertical'
              }}
              onFocus={(e) => {
                e.target.style.borderColor = '#dc2626'
                e.target.style.background = 'rgba(255, 255, 255, 0.15)'
              }}
              onBlur={(e) => {
                e.target.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                e.target.style.background = 'rgba(255, 255, 255, 0.1)'
              }}
            />
            <p style={{
              fontSize: '0.9rem',
              opacity: 0.7,
              marginTop: '5px'
            }}>
              A short summary of your blog post (1-2 sentences). This appears on the blog listing page and in search results.
            </p>
          </div>

          {/* Content */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'block',
              color: '#f5f5dc',
              marginBottom: '8px',
              fontSize: '1.1rem',
              fontWeight: '600'
            }}>
              Content *
            </label>
            <RichTextEditor
              value={formData.content}
              onChange={(value) => setFormData(prev => ({ ...prev, content: value }))}
              placeholder="Write your blog post content here..."
            />
            <p style={{
              fontSize: '0.9rem',
              opacity: 0.7,
              marginTop: '5px'
            }}>
              Write your content in HTML format. Use &lt;p&gt;, &lt;h2&gt;, &lt;h3&gt;, &lt;ul&gt;, &lt;li&gt;, etc.
            </p>
          </div>

          {/* Published */}
          <div style={{ marginBottom: '30px' }}>
            <label style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              cursor: 'pointer'
            }}>
              <input
                type="checkbox"
                checked={formData.published}
                onChange={(e) => setFormData(prev => ({ ...prev, published: e.target.checked }))}
                style={{ margin: 0 }}
              />
              <span style={{ fontSize: '1.1rem', fontWeight: '600' }}>
                Publish immediately
              </span>
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div style={{
              background: 'rgba(220, 38, 38, 0.2)',
              border: '1px solid rgba(220, 38, 38, 0.5)',
              color: '#fca5a5',
              padding: '12px',
              borderRadius: '8px',
              marginBottom: '20px',
              fontSize: '0.9rem'
            }}>
              {error}
            </div>
          )}

          {/* Submit Button */}
          <div style={{ display: 'flex', gap: '15px' }}>
            <button
              type="submit"
              disabled={saving}
              style={{
                background: saving ? 'rgba(139, 69, 19, 0.5)' : 'rgba(139, 69, 19, 0.9)',
                color: '#f5f5dc',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: saving ? 'not-allowed' : 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                if (!saving) {
                  e.currentTarget.style.background = 'rgba(139, 69, 19, 1)'
                  e.currentTarget.style.transform = 'translateY(-2px)'
                }
              }}
              onMouseLeave={(e) => {
                if (!saving) {
                  e.currentTarget.style.background = 'rgba(139, 69, 19, 0.9)'
                  e.currentTarget.style.transform = 'translateY(0)'
                }
              }}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
            
            <button
              type="button"
              onClick={() => router.push('/admin')}
              style={{
                background: 'rgba(107, 114, 128, 0.8)',
                color: '#f5f5dc',
                border: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(107, 114, 128, 1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(107, 114, 128, 0.8)'
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
