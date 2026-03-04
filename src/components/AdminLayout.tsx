'use client';

import { useAuth } from '@/contexts/AuthContext';

const navItems = [
  { label: 'Dashboard',  href: '/admin',          icon: '▣' },
  { label: 'Content',    href: '/admin/content',   icon: '✎' },
  { label: 'Blog',       href: '/admin/blog/new',  icon: '◈' },
  { label: 'Gallery',    href: '/admin/gallery',   icon: '◻' },
  { label: 'Locations',  href: '/admin/locations', icon: '◎' },
];

export default function AdminLayout({ children, active }: { children: React.ReactNode; active?: string }) {
  const { user, signOut } = useAuth();

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#0C0C0C' }}>
      {/* Sidebar */}
      <aside style={{
        width: '220px',
        minHeight: '100vh',
        background: '#111111',
        borderRight: '1px solid #1E1E1E',
        display: 'flex',
        flexDirection: 'column',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 100,
      }}>
        {/* Brand */}
        <div style={{
          padding: '28px 24px 20px',
          borderBottom: '1px solid #1E1E1E',
        }}>
          <a href="/" style={{ textDecoration: 'none' }}>
            <span style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '1.3rem',
              fontWeight: 700,
              color: '#EDE9E0',
              letterSpacing: '0.04em',
              display: 'block',
            }}>LORE</span>
            <span style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.58rem',
              fontWeight: 400,
              color: '#C4922A',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
            }}>Admin Panel</span>
          </a>
        </div>

        {/* Nav */}
        <nav style={{ padding: '16px 0', flex: 1 }}>
          {navItems.map(({ label, href, icon }) => {
            const isActive = active === label;
            return (
              <a
                key={href}
                href={href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 24px',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.8rem',
                  fontWeight: 400,
                  letterSpacing: '0.04em',
                  color: isActive ? '#C4922A' : '#8A857D',
                  textDecoration: 'none',
                  background: isActive ? 'rgba(196,146,42,0.07)' : 'transparent',
                  borderLeft: isActive ? '2px solid #C4922A' : '2px solid transparent',
                  transition: 'color 0.15s ease, background 0.15s ease',
                }}
                onMouseEnter={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#EDE9E0';
                    e.currentTarget.style.background = '#161616';
                  }
                }}
                onMouseLeave={e => {
                  if (!isActive) {
                    e.currentTarget.style.color = '#8A857D';
                    e.currentTarget.style.background = 'transparent';
                  }
                }}
              >
                <span style={{ fontSize: '0.9rem', opacity: 0.7 }}>{icon}</span>
                {label}
              </a>
            );
          })}
        </nav>

        {/* User footer */}
        <div style={{
          padding: '16px 24px 24px',
          borderTop: '1px solid #1E1E1E',
        }}>
          {user && (
            <p style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.7rem',
              color: '#4A4540',
              marginBottom: '12px',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'nowrap',
            }}>{user.email}</p>
          )}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <a
              href="/"
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.72rem',
                fontWeight: 400,
                letterSpacing: '0.06em',
                color: '#8A857D',
                textDecoration: 'none',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#EDE9E0')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8A857D')}
            >
              ← View Site
            </a>
            <button
              onClick={signOut}
              style={{
                background: 'none',
                border: 'none',
                padding: 0,
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.72rem',
                fontWeight: 400,
                letterSpacing: '0.06em',
                color: '#8A857D',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'color 0.15s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#f87171')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8A857D')}
            >
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <main style={{
        marginLeft: '220px',
        flex: 1,
        padding: 'clamp(32px, 4vw, 56px)',
        minHeight: '100vh',
        background: '#0C0C0C',
      }}>
        {children}
      </main>
    </div>
  );
}
