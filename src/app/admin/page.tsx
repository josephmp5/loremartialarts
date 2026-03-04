'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/AdminLayout';

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  published: boolean;
  created_at: string;
}

interface ContactSubmission {
  id: string;
  name: string;
  email: string;
  message: string;
  created_at: string;
  read: boolean;
}

const S = {
  label: {
    display: 'block',
    fontFamily: 'Space Grotesk, sans-serif',
    fontSize: '0.62rem',
    fontWeight: 500,
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: '#4A4540',
    marginBottom: '8px',
  } as React.CSSProperties,
  h1: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: 'clamp(1.8rem, 3vw, 2.4rem)',
    fontWeight: 600,
    color: '#EDE9E0',
    lineHeight: 1.1,
    marginBottom: '4px',
  } as React.CSSProperties,
  sectionTitle: {
    fontFamily: 'Cormorant Garamond, serif',
    fontSize: '1.3rem',
    fontWeight: 600,
    color: '#EDE9E0',
    marginBottom: '20px',
  } as React.CSSProperties,
};

export default function AdminDashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [stats, setStats] = useState({ total: 0, published: 0, unread: 0 });

  useEffect(() => {
    if (!loading && !user) router.push('/admin/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) { fetchBlogPosts(); fetchContactSubmissions(); }
  }, [user]);

  const fetchBlogPosts = async () => {
    if (!supabase) return;
    const { data } = await supabase.from('blog_posts').select('*').order('created_at', { ascending: false });
    if (data) {
      setBlogPosts(data);
      setStats(prev => ({ ...prev, total: data.length, published: data.filter(p => p.published).length }));
    }
  };

  const fetchContactSubmissions = async () => {
    if (!supabase) return;
    const { data } = await supabase.from('contact_submissions').select('*').order('created_at', { ascending: false });
    if (data) {
      setContactSubmissions(data);
      setStats(prev => ({ ...prev, unread: data.filter(s => !s.read).length }));
    }
  };

  const togglePublish = async (id: string, current: boolean) => {
    if (!supabase) return;
    await supabase.from('blog_posts').update({ published: !current }).eq('id', id);
    fetchBlogPosts();
  };

  const markRead = async (id: string) => {
    if (!supabase) return;
    await supabase.from('contact_submissions').update({ read: true }).eq('id', id);
    fetchContactSubmissions();
  };

  if (loading || !user) {
    return (
      <div style={{ minHeight: '100vh', background: '#0C0C0C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.8rem', color: '#4A4540', letterSpacing: '0.1em' }}>Loading…</span>
      </div>
    );
  }

  return (
    <AdminLayout active="Dashboard">
      {/* Header */}
      <div style={{ marginBottom: '48px', paddingBottom: '28px', borderBottom: '1px solid #1E1E1E' }}>
        <span style={S.label}>Dashboard</span>
        <h1 style={S.h1}>Good to see you.</h1>
        <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.82rem', color: '#4A4540' }}>
          {user.email}
        </p>
      </div>

      {/* Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
        gap: '2px',
        marginBottom: '48px',
        background: '#1E1E1E',
      }}>
        {[
          { label: 'Total Posts', value: stats.total, color: '#EDE9E0' },
          { label: 'Published', value: stats.published, color: '#34d399' },
          { label: 'Unread Messages', value: stats.unread, color: stats.unread > 0 ? '#fbbf24' : '#EDE9E0' },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ background: '#111111', padding: '28px 24px' }}>
            <span style={{ display: 'block', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: '#4A4540', marginBottom: '12px' }}>
              {label}
            </span>
            <span style={{ fontFamily: 'Cormorant Garamond, serif', fontSize: '2.8rem', fontWeight: 600, color, lineHeight: 1 }}>
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div style={{ marginBottom: '48px' }}>
        <span style={S.label}>Quick Actions</span>
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '12px' }}>
          {[
            { label: '+ New Post',       href: '/admin/blog/new' },
            { label: 'Manage Content',   href: '/admin/content' },
            { label: 'Manage Gallery',   href: '/admin/gallery' },
            { label: 'Manage Locations', href: '/admin/locations' },
          ].map(({ label, href }) => (
            <a key={href} href={href} className="btn-outline" style={{ fontSize: '0.72rem' }}>
              {label}
            </a>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div style={{ marginBottom: '48px' }}>
        <h2 style={S.sectionTitle}>Recent Posts</h2>
        <div style={{ background: '#111111', border: '1px solid #1E1E1E' }}>
          {blogPosts.length === 0 ? (
            <p style={{ padding: '24px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.82rem', color: '#4A4540' }}>
              No posts yet.
            </p>
          ) : (
            blogPosts.slice(0, 6).map((post, i) => (
              <div
                key={post.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '16px 20px',
                  borderBottom: i < Math.min(blogPosts.length, 6) - 1 ? '1px solid #1E1E1E' : 'none',
                  gap: '16px',
                  flexWrap: 'wrap',
                }}
              >
                <div style={{ flex: 1, minWidth: '160px' }}>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.88rem', color: '#EDE9E0', marginBottom: '4px' }}>
                    {post.title}
                  </p>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.72rem', color: '#4A4540' }}>
                    {new Date(post.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <span className={post.published ? 'badge badge-green' : 'badge badge-amber'}>
                    {post.published ? 'Published' : 'Draft'}
                  </span>
                  <button
                    onClick={() => togglePublish(post.id, post.published)}
                    className="btn-outline"
                    style={{ fontSize: '0.68rem', padding: '6px 14px' }}
                  >
                    {post.published ? 'Unpublish' : 'Publish'}
                  </button>
                  <a
                    href={`/admin/blog/${post.id}`}
                    className="btn-outline"
                    style={{ fontSize: '0.68rem', padding: '6px 14px' }}
                  >
                    Edit
                  </a>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Contact Submissions */}
      <div>
        <h2 style={S.sectionTitle}>Recent Messages</h2>
        <div style={{ background: '#111111', border: '1px solid #1E1E1E' }}>
          {contactSubmissions.length === 0 ? (
            <p style={{ padding: '24px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.82rem', color: '#4A4540' }}>
              No messages yet.
            </p>
          ) : (
            contactSubmissions.slice(0, 5).map((sub, i) => (
              <div
                key={sub.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  padding: '16px 20px',
                  borderBottom: i < Math.min(contactSubmissions.length, 5) - 1 ? '1px solid #1E1E1E' : 'none',
                  gap: '16px',
                  flexWrap: 'wrap',
                  background: !sub.read ? 'rgba(196,146,42,0.04)' : 'transparent',
                }}
              >
                <div style={{ flex: 1 }}>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.88rem', color: '#EDE9E0', marginBottom: '2px' }}>
                    {sub.name}
                  </p>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.72rem', color: '#4A4540', marginBottom: '8px' }}>
                    {sub.email}
                  </p>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.8rem', color: '#8A857D', lineHeight: 1.6 }}>
                    {sub.message.substring(0, 120)}{sub.message.length > 120 ? '…' : ''}
                  </p>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexShrink: 0 }}>
                  <span className={sub.read ? 'badge badge-gray' : 'badge badge-amber'}>
                    {sub.read ? 'Read' : 'Unread'}
                  </span>
                  {!sub.read && (
                    <button
                      onClick={() => markRead(sub.id)}
                      className="btn-outline"
                      style={{ fontSize: '0.68rem', padding: '6px 14px' }}
                    >
                      Mark Read
                    </button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
