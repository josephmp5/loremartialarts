'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';
import AdminLayout from '@/components/AdminLayout';

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
  const [contactSubmissions, setContactSubmissions] = useState<ContactSubmission[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    if (!loading && !user) router.push('/admin/login');
  }, [user, loading, router]);

  useEffect(() => {
    if (user) fetchContactSubmissions();
  }, [user]);

  const fetchContactSubmissions = async () => {
    if (!supabase) return;
    const { data } = await supabase
      .from('contact_submissions')
      .select('*')
      .order('created_at', { ascending: false });
    if (data) {
      setContactSubmissions(data);
      setUnreadCount(data.filter((s) => !s.read).length);
    }
  };

  const markRead = async (id: string) => {
    if (!supabase) return;
    await supabase.from('contact_submissions').update({ read: true }).eq('id', id);
    fetchContactSubmissions();
  };

  if (loading || !user) {
    return (
      <div style={{ minHeight: '100vh', background: '#0C0C0C', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.8rem', color: '#4A4540', letterSpacing: '0.1em' }}>
          Loading…
        </span>
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
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2px', marginBottom: '48px', background: '#1E1E1E' }}>
        {[
          { label: 'Unread Messages', value: unreadCount, color: unreadCount > 0 ? '#fbbf24' : '#EDE9E0' },
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

      {/* Contact Submissions */}
      <div>
        <h2 style={S.sectionTitle}>Recent Messages</h2>
        <div style={{ background: '#111111', border: '1px solid #1E1E1E' }}>
          {contactSubmissions.length === 0 ? (
            <p style={{ padding: '24px', fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.82rem', color: '#4A4540' }}>
              No messages yet.
            </p>
          ) : (
            contactSubmissions.slice(0, 8).map((sub, i) => (
              <div
                key={sub.id}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  padding: '16px 20px',
                  borderBottom: i < Math.min(contactSubmissions.length, 8) - 1 ? '1px solid #1E1E1E' : 'none',
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
                    {sub.email} · {new Date(sub.created_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.8rem', color: '#8A857D', lineHeight: 1.6 }}>
                    {sub.message.substring(0, 140)}{sub.message.length > 140 ? '…' : ''}
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
