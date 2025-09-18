'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '@/lib/supabase'

interface BlogPost {
  id: string
  title: string
  slug: string
  content: string
  excerpt: string
  featured_image_url: string | null
  created_at: string
  updated_at: string
}

export default function BlogPostPage() {
  const params = useParams()
  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (params.slug) {
      fetchPost(params.slug as string)
    }
  }, [params.slug])

  const fetchPost = async (slug: string) => {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('published', true)
      .single()

    if (error) {
      setError('Post not found')
    } else {
      setPost(data)
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
        background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        color: '#f5f5dc',
        fontFamily: 'Go3v2, serif'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '3px solid rgba(245, 245, 220, 0.3)',
            borderTop: '3px solid #dc2626',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 20px'
          }}></div>
          <p>Loading post...</p>
        </div>
      </div>
    )
  }

  if (error || !post) {
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
        <div style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', marginBottom: '20px' }}>404</h1>
          <p style={{ fontSize: '1.2rem', marginBottom: '30px' }}>Post not found</p>
          <Link
            href="/blog"
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
            Back to Blog
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
      color: '#f5f5dc',
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
          
          .blog-content h1, .blog-content h2, .blog-content h3 {
            color: #f5f5dc;
            margin-top: 2rem;
            margin-bottom: 1rem;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.5);
          }
          
          .blog-content h1 {
            font-size: 2.5rem;
            font-weight: 700;
          }
          
          .blog-content h2 {
            font-size: 2rem;
            font-weight: 600;
          }
          
          .blog-content h3 {
            font-size: 1.5rem;
            font-weight: 600;
          }
          
          .blog-content p {
            line-height: 1.8;
            margin-bottom: 1.5rem;
            font-size: 1.1rem;
          }
          
          .blog-content ul, .blog-content ol {
            margin-bottom: 1.5rem;
            padding-left: 2rem;
          }
          
          .blog-content li {
            margin-bottom: 0.5rem;
            line-height: 1.6;
          }
          
          .blog-content blockquote {
            border-left: 4px solid #dc2626;
            padding-left: 1.5rem;
            margin: 2rem 0;
            font-style: italic;
            opacity: 0.9;
          }
          
          .blog-content img {
            max-width: 100%;
            height: auto;
            border-radius: 8px;
            margin: 2rem 0;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
          }
          
          .blog-content a {
            color: #dc2626;
            text-decoration: none;
            border-bottom: 1px solid transparent;
            transition: all 0.3s ease;
          }
          
          .blog-content a:hover {
            border-bottom-color: #dc2626;
          }
        `
      }} />

      {/* Header */}
      <header style={{
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        padding: '40px',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <div style={{ marginBottom: '20px' }}>
            <Link
              href="/blog"
              style={{
                color: '#e8e8d0',
                textDecoration: 'none',
                padding: '8px 16px',
                borderRadius: '6px',
                background: 'rgba(255, 255, 255, 0.1)',
                transition: 'all 0.3s ease',
                display: 'inline-block',
                marginBottom: '20px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)'
              }}
            >
              ← Back to Blog
            </Link>
          </div>
          
          <h1 style={{
            fontSize: 'clamp(2rem, 6vw, 3rem)',
            fontWeight: '700',
            marginBottom: '20px',
            textShadow: '2px 2px 4px rgba(0,0,0,0.7)',
            animation: 'fadeInUp 1s ease-out'
          }}>
            {post.title}
          </h1>
          
          <div style={{
            display: 'flex',
            gap: '20px',
            alignItems: 'center',
            opacity: 0.8,
            fontSize: '1rem',
            animation: 'fadeInUp 1s ease-out 0.2s both'
          }}>
            <time>
              {new Date(post.created_at).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </time>
            {post.updated_at !== post.created_at && (
              <span>
                Updated: {new Date(post.updated_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* Featured Image */}
      {post.featured_image_url && (
        <div style={{
          maxWidth: '800px',
          margin: '40px auto',
          padding: '0 40px'
        }}>
          <img
            src={post.featured_image_url}
            alt={post.title}
            style={{
              width: '100%',
              height: '400px',
              objectFit: 'cover',
              borderRadius: '12px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)',
              animation: 'fadeInUp 1s ease-out 0.4s both'
            }}
          />
        </div>
      )}

      {/* Content */}
      <main style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '0 40px 60px'
      }}>
        <div
          className="blog-content"
          style={{
            animation: 'fadeInUp 1s ease-out 0.6s both'
          }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </main>

      {/* Footer */}
      <footer style={{
        background: 'rgba(0, 0, 0, 0.3)',
        backdropFilter: 'blur(10px)',
        padding: '40px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        marginTop: '60px'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
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
                color: '#e8e8d0',
                textDecoration: 'none',
                padding: '10px 20px',
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
              Follow on Instagram
            </a>
            <a
              href="mailto:contact@lorebjj.com"
              style={{
                color: '#e8e8d0',
                textDecoration: 'none',
                padding: '10px 20px',
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
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}
