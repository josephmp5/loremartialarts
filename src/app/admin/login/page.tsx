'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const { signIn } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    const { error } = await signIn(email, password);
    if (error) {
      setError(error.message);
    } else {
      router.push('/admin');
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: '#0C0C0C',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '24px',
    }}>
      {/* Gi weave texture */}
      <div style={{
        position: 'fixed',
        inset: 0,
        backgroundImage: `
          repeating-linear-gradient(45deg, transparent 0px, transparent 3px, rgba(196,146,42,0.018) 3px, rgba(196,146,42,0.018) 4px),
          repeating-linear-gradient(-45deg, transparent 0px, transparent 3px, rgba(196,146,42,0.018) 3px, rgba(196,146,42,0.018) 4px)
        `,
        pointerEvents: 'none',
      }} />

      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '380px',
        animation: 'fadeUp 0.6s ease both',
      }}>
        {/* Brand */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: '3rem',
            fontWeight: 700,
            color: '#EDE9E0',
            letterSpacing: '0.05em',
            lineHeight: 1,
            marginBottom: '8px',
          }}>LORE</div>
          <div style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '0.62rem',
            fontWeight: 400,
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: '#C4922A',
          }}>Admin Access</div>
        </div>

        {/* Form */}
        <div style={{
          background: '#111111',
          border: '1px solid #1E1E1E',
          padding: '36px',
        }}>
          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
              <label style={{
                display: 'block',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#4A4540',
                marginBottom: '8px',
              }}>Email</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                className="input"
                placeholder="your@email.com"
              />
            </div>

            <div style={{ marginBottom: '28px' }}>
              <label style={{
                display: 'block',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.15em',
                textTransform: 'uppercase',
                color: '#4A4540',
                marginBottom: '8px',
              }}>Password</label>
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                className="input"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <div style={{
                background: 'rgba(220,38,38,0.08)',
                border: '1px solid rgba(220,38,38,0.2)',
                color: '#f87171',
                padding: '12px 14px',
                marginBottom: '20px',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.82rem',
              }}>{error}</div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-gold"
              style={{
                width: '100%',
                textAlign: 'center',
                opacity: loading ? 0.6 : 1,
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
        </div>

        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <a
            href="/"
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.75rem',
              color: '#4A4540',
              textDecoration: 'none',
              letterSpacing: '0.05em',
              transition: 'color 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#8A857D')}
            onMouseLeave={e => (e.currentTarget.style.color = '#4A4540')}
          >
            ← Back to site
          </a>
        </div>
      </div>
    </div>
  );
}
