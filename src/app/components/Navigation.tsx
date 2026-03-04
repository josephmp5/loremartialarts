'use client';

import { useState, useEffect } from 'react';

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const maxY = document.documentElement.scrollHeight - window.innerHeight;
      setScrolled(y > 60);
      setProgress(maxY > 0 ? Math.min(1, y / maxY) : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '56px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(20px, 5vw, 60px)',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(6,6,6,0.94)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        transition: 'background 0.5s ease, backdrop-filter 0.5s ease',
      }}
    >
      {/* Gold progress bar */}
      <div
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          height: '1px',
          width: `${progress * 100}%`,
          background: '#C4922A',
          opacity: scrolled ? 1 : 0,
          transition: 'width 0.08s linear, opacity 0.4s ease',
        }}
      />

      {/* Brand */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'baseline', gap: '7px' }}
      >
        <span style={{ fontFamily: 'Cormorant Garamond, serif', fontWeight: 700, fontSize: '1.35rem', color: '#EDE9E0', letterSpacing: '0.06em', lineHeight: 1 }}>
          LORE
        </span>
        <span style={{ fontFamily: 'Space Grotesk, sans-serif', fontWeight: 300, fontSize: '0.6rem', color: '#C4922A', letterSpacing: '0.28em', textTransform: 'uppercase', lineHeight: 1 }}>
          BJJ
        </span>
      </button>

      {/* Single CTA */}
      <button
        onClick={() => document.getElementById('join')?.scrollIntoView({ behavior: 'smooth' })}
        style={{
          background: 'none',
          border: '1px solid rgba(196,146,42,0.4)',
          color: '#C4922A',
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '0.63rem',
          fontWeight: 500,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          padding: '8px 18px',
          cursor: 'pointer',
          transition: 'border-color 0.25s ease, background 0.25s ease',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(196,146,42,0.08)'; e.currentTarget.style.borderColor = '#C4922A'; }}
        onMouseLeave={(e) => { e.currentTarget.style.background = 'none'; e.currentTarget.style.borderColor = 'rgba(196,146,42,0.4)'; }}
      >
        Join
      </button>
    </nav>
  );
}
