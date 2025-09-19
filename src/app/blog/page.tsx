'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { supabase, getSiteAssetUrl } from '@/lib/supabase'

interface BlogPost {
  id: string
  title: string
  slug: string
  excerpt: string
  featured_image_url: string | null
  created_at: string
  updated_at: string
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPosts()
  }, [])

  const fetchPosts = async () => {
    if (!supabase) {
      setLoading(false)
      return
    }
    
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('published', true)
      .order('created_at', { ascending: false })

    if (data) {
      setPosts(data)
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundImage: `url('${getSiteAssetUrl('background.jpg')}')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
        color: '#2c1810',
        fontFamily: 'Go3v2, serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid rgba(139, 69, 19, 0.3)',
            borderTop: '3px solid #dc2626',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Loading blog posts...</p>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
        backgroundImage: `url('${getSiteAssetUrl('background.jpg')}')`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
      backgroundAttachment: 'fixed',
      color: '#2c1810',
      fontFamily: 'Go3v2, serif'
    }}>
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }
        `
      }} />

      {/* Header */}
      <header style={{
        background: 'rgba(139, 69, 19, 0.2)',
        backdropFilter: 'blur(5px)',
        padding: '40px',
        textAlign: 'center',
        borderBottom: '2px solid rgba(139, 69, 19, 0.3)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: 'clamp(2.5rem, 8vw, 4rem)',
            fontWeight: '700',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            animation: 'fadeInUp 1s ease-out'
          }}>
            LORE BJJ Blog
          </h1>
          <p style={{
            fontSize: 'clamp(1.2rem, 4vw, 1.5rem)',
            opacity: 0.9,
            maxWidth: '600px',
            margin: '0 auto',
            animation: 'fadeInUp 1s ease-out 0.2s both'
          }}>
            Stories from our nomadic BJJ journey in Antalya
          </p>
          <div style={{ marginTop: '30px' }}>
            <Link
              href="/"
              style={{
                color: '#e8e8d0',
                textDecoration: 'none',
                padding: '12px 24px',
                borderRadius: '8px',
                background: 'rgba(139, 69, 19, 0.8)',
                transition: 'all 0.3s ease',
                display: 'inline-block'
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
              ← Back to Home
            </Link>
          </div>
        </div>
      </header>

      {/* Blog Posts */}
      <main style={{ padding: '60px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        {posts.length === 0 ? (
          <div style={{
            textAlign: 'center',
            padding: '80px 20px',
            background: 'rgba(139, 69, 19, 0.1)',
            borderRadius: '12px',
            border: '2px solid rgba(139, 69, 19, 0.3)'
          }}>
            <h2 style={{
              fontSize: '2rem',
              marginBottom: '20px',
              opacity: 0.8
            }}>
              No posts yet
            </h2>
            <p style={{
              fontSize: '1.2rem',
              opacity: 0.6
            }}>
              Check back soon for our latest BJJ adventures!
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
            gap: '30px'
          }}>
            {posts.map((post, index) => (
              <article
                key={post.id}
                style={{
                  background: 'rgba(139, 69, 19, 0.1)',
                  backdropFilter: 'blur(5px)',
                  borderRadius: '12px',
                  border: '2px solid rgba(139, 69, 19, 0.3)',
                  overflow: 'hidden',
                  transition: 'all 0.3s ease',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)'
                  e.currentTarget.style.background = 'rgba(139, 69, 19, 0.15)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.background = 'rgba(139, 69, 19, 0.1)'
                }}
              >
                {post.featured_image_url && (
                  <div style={{
                    width: '100%',
                    height: '200px',
                    overflow: 'hidden'
                  }}>
                    <img
                      src={post.featured_image_url}
                      alt={post.title}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        transition: 'transform 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.05)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                      }}
                    />
                  </div>
                )}
                
                <div style={{ padding: '25px' }}>
                  <h2 style={{
                    fontSize: '1.5rem',
                    fontWeight: '700',
                    marginBottom: '15px',
                    lineHeight: '1.3',
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                  }}>
                    {post.title}
                  </h2>
                  
                  {post.excerpt && (
                    <p style={{
                      fontSize: '1rem',
                      lineHeight: '1.6',
                      opacity: 0.9,
                      marginBottom: '20px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {post.excerpt}
                    </p>
                  )}
                  
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '20px'
                  }}>
                    <time style={{
                      fontSize: '0.9rem',
                      opacity: 0.7
                    }}>
                      {new Date(post.created_at).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </time>
                  </div>
                  
                  <Link
                    href={`/blog/${post.slug}`}
                    style={{
                      display: 'inline-block',
                      background: 'rgba(139, 69, 19, 0.8)',
                      color: '#f5f5dc',
                      padding: '10px 20px',
                      borderRadius: '6px',
                      textDecoration: 'none',
                      fontWeight: '600',
                      transition: 'all 0.3s ease',
                      fontSize: '0.9rem'
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
                    Read More
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer style={{
        background: 'rgba(139, 69, 19, 0.2)',
        backdropFilter: 'blur(5px)',
        padding: '40px',
        textAlign: 'center',
        borderTop: '2px solid rgba(139, 69, 19, 0.3)',
        marginTop: '60px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{
            fontSize: '1.1rem',
            opacity: 0.8,
            marginBottom: '20px'
          }}>
            Join our nomadic BJJ journey in Antalya
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a
              href="https://www.instagram.com/loremartialarts/"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                color: '#2c1810',
                textDecoration: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                background: 'rgba(139, 69, 19, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(139, 69, 19, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(139, 69, 19, 0.3)'
              }}
            >
              Follow on Instagram
            </a>
            <a
              href="mailto:contact@lorebjj.com"
              style={{
                color: '#2c1810',
                textDecoration: 'none',
                padding: '10px 20px',
                borderRadius: '6px',
                background: 'rgba(139, 69, 19, 0.3)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(139, 69, 19, 0.5)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(139, 69, 19, 0.3)'
              }}
            >
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
