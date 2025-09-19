'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { supabase } from '@/lib/supabase'

interface BlogPost {
  id: string
  title: string
  slug: string
  published: boolean
  created_at: string
  updated_at: string
}

interface ContactSubmission {
  id: string
  name: string
  email: string
  message: string
  created_at: string
  read: boolean
}

export default function AdminDashboard() {
  const { user, loading, signOut } = useAuth()
  const router = useRouter()
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([])
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([])
  const [stats, setStats] = useState({
    totalPosts: 0,
    publishedPosts: 0,
    unreadMessages: 0
  })

  useEffect(() => {
    if (!loading && !user) {
      router.push('/admin/login')
    }
  }, [user, loading, router])

  useEffect(() => {
    if (user) {
      fetchBlogPosts()
      fetchContactSubmissions()
    }
  }, [user])

  const fetchBlogPosts = async () => {
    if (!supabase) return
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) {
      setBlogPosts(data)
      setStats(prev => ({
        ...prev,
        totalPosts: data.length,
        publishedPosts: data.filter(post => post.published).length
      }))
    }
  }

  const fetchContactSubmissions = async () => {
    if (!supabase) return
    
    const { data, error } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false })

    if (data) {
      setContactSubmissions(data)
      setStats(prev => ({
        ...prev,
        unreadMessages: data.filter(submission => !submission.read).length
      }))
    }
  }

  const togglePostStatus = async (id: string, currentStatus: boolean) => {
    if (!supabase) return
    
    const { error } = await supabase
      .from('blog_posts')
      .update({ published: !currentStatus })
      .eq('id', id)

    if (!error) {
      fetchBlogPosts()
    }
  }

  const markAsRead = async (id: string) => {
    if (!supabase) return
    
    const { error } = await supabase
      .from('contact_submissions')
      .update({ read: true })
      .eq('id', id)

    if (!error) {
      fetchContactSubmissions()
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
            LORE BJJ Admin
          </h1>
          <p style={{
            margin: '5px 0 0 0',
            opacity: 0.8,
            fontSize: '1rem'
          }}>
            Welcome back, {user.email}
          </p>
        </div>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a
            href="/"
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
            View Site
          </a>
          <button
            onClick={signOut}
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
            Sign Out
          </button>
        </div>
      </header>

      <div style={{ padding: '40px' }}>
        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginBottom: '40px'
        }}>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>Total Posts</h3>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: '700', color: '#dc2626' }}>
              {stats.totalPosts}
            </p>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>Published</h3>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: '700', color: '#10b981' }}>
              {stats.publishedPosts}
            </p>
          </div>
          <div style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            padding: '20px',
            borderRadius: '12px',
            border: '1px solid rgba(255, 255, 255, 0.2)'
          }}>
            <h3 style={{ margin: '0 0 10px 0', fontSize: '1.2rem' }}>Unread Messages</h3>
            <p style={{ margin: 0, fontSize: '2rem', fontWeight: '700', color: '#f59e0b' }}>
              {stats.unreadMessages}
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '40px'
        }}>
          <h2 style={{ margin: '0 0 20px 0', fontSize: '1.5rem' }}>Quick Actions</h2>
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap' }}>
            <a
              href="/admin/blog/new"
              style={{
                background: 'rgba(139, 69, 19, 0.8)',
                color: '#f5f5dc',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(139, 69, 19, 1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(139, 69, 19, 0.8)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              + New Blog Post
            </a>
            <a
              href="/admin/locations"
              style={{
                background: 'rgba(59, 130, 246, 0.8)',
                color: '#f5f5dc',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(59, 130, 246, 0.8)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Manage Locations
            </a>
            <a
              href="/admin/gallery"
              style={{
                background: 'rgba(168, 85, 247, 0.8)',
                color: '#f5f5dc',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(168, 85, 247, 1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(168, 85, 247, 0.8)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Manage Gallery
            </a>
            
            <a
              href="/admin/content"
              style={{
                background: 'rgba(34, 197, 94, 0.8)',
                color: '#f5f5dc',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(34, 197, 94, 1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(34, 197, 94, 0.8)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              Manage Content
            </a>
            
            <a
              href="/admin/migrate-images"
              style={{
                background: 'rgba(245, 158, 11, 0.8)',
                color: '#f5f5dc',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                fontWeight: '600',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(245, 158, 11, 1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(245, 158, 11, 0.8)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              🚀 Optimize Images
            </a>
          </div>
        </div>

        {/* Recent Blog Posts */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          marginBottom: '40px'
        }}>
          <h2 style={{ margin: '0 0 20px 0', fontSize: '1.5rem' }}>Recent Blog Posts</h2>
          {blogPosts.length === 0 ? (
            <p style={{ opacity: 0.8, fontStyle: 'italic' }}>No blog posts yet. Create your first post!</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {blogPosts.slice(0, 5).map((post) => (
                <div key={post.id} style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  padding: '15px',
                  borderRadius: '8px',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{post.title}</h3>
                    <p style={{ margin: 0, opacity: 0.7, fontSize: '0.9rem' }}>
                      {new Date(post.created_at).toLocaleDateString()}
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      background: post.published ? 'rgba(16, 185, 129, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                      color: post.published ? '#10b981' : '#f59e0b'
                    }}>
                      {post.published ? 'Published' : 'Draft'}
                    </span>
                    <button
                      onClick={() => togglePostStatus(post.id, post.published)}
                      style={{
                        background: post.published ? 'rgba(245, 158, 11, 0.8)' : 'rgba(16, 185, 129, 0.8)',
                        color: '#f5f5dc',
                        border: 'none',
                        padding: '6px 12px',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '0.8rem'
                      }}
                    >
                      {post.published ? 'Unpublish' : 'Publish'}
                    </button>
                    <a
                      href={`/admin/blog/${post.id}`}
                      style={{
                        color: '#e8e8d0',
                        textDecoration: 'none',
                        fontSize: '0.8rem',
                        padding: '6px 12px',
                        background: 'rgba(59, 130, 246, 0.8)',
                        borderRadius: '4px'
                      }}
                    >
                      Edit
                    </a>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Recent Contact Submissions */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.1)',
          backdropFilter: 'blur(10px)',
          padding: '20px',
          borderRadius: '12px',
          border: '1px solid rgba(255, 255, 255, 0.2)'
        }}>
          <h2 style={{ margin: '0 0 20px 0', fontSize: '1.5rem' }}>Recent Contact Submissions</h2>
          {contactSubmissions.length === 0 ? (
            <p style={{ opacity: 0.8, fontStyle: 'italic' }}>No contact submissions yet.</p>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {contactSubmissions.slice(0, 5).map((submission) => (
                <div key={submission.id} style={{
                  background: submission.read ? 'rgba(255, 255, 255, 0.05)' : 'rgba(245, 158, 11, 0.1)',
                  padding: '15px',
                  borderRadius: '8px',
                  border: submission.read ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(245, 158, 11, 0.3)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}>
                  <div>
                    <h3 style={{ margin: '0 0 5px 0', fontSize: '1.1rem' }}>{submission.name}</h3>
                    <p style={{ margin: '0 0 5px 0', opacity: 0.7, fontSize: '0.9rem' }}>{submission.email}</p>
                    <p style={{ margin: 0, opacity: 0.8, fontSize: '0.9rem' }}>
                      {submission.message.substring(0, 100)}...
                    </p>
                  </div>
                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                    <span style={{
                      padding: '4px 8px',
                      borderRadius: '4px',
                      fontSize: '0.8rem',
                      background: submission.read ? 'rgba(107, 114, 128, 0.2)' : 'rgba(245, 158, 11, 0.2)',
                      color: submission.read ? '#6b7280' : '#f59e0b'
                    }}>
                      {submission.read ? 'Read' : 'Unread'}
                    </span>
                    {!submission.read && (
                      <button
                        onClick={() => markAsRead(submission.id)}
                        style={{
                          background: 'rgba(16, 185, 129, 0.8)',
                          color: '#f5f5dc',
                          border: 'none',
                          padding: '6px 12px',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '0.8rem'
                        }}
                      >
                        Mark Read
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
