'use client';

import { useEffect, useRef, useState } from 'react';

interface ImmersiveNavProps {
  onScrollTo: (id: string) => void;
}

export default function ImmersiveNav({ onScrollTo }: ImmersiveNavProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navStyle: React.CSSProperties = {
    position: 'fixed', top: 0, left: 0, right: 0,
    zIndex: 100, display: 'flex', alignItems: 'center',
    justifyContent: 'space-between',
    padding: scrolled ? '16px 52px' : '28px 52px',
    background: scrolled ? 'rgba(0,0,0,0.82)' : 'transparent',
    backdropFilter: scrolled ? 'blur(12px)' : 'none',
    transition: 'all 0.4s ease',
  };

  const links = [
    { label: 'Philosophy', id: 'moment-philosophy' },
    { label: 'The Gym',    id: 'moment-gym' },
    { label: 'Join',       id: 'moment-call' },
  ];

  return (
    <>
      <nav style={navStyle}>
        <a href="#" style={{ fontFamily: "'Anton', sans-serif", fontSize: '1.1rem', letterSpacing: '0.18em', color: '#EDE4D3', textDecoration: 'none' }}>
          LORE
        </a>

        {/* Desktop links */}
        <ul style={{ display: 'flex', gap: 44, listStyle: 'none' }} className="hidden md:flex">
          {links.map(l => (
            <li key={l.id}>
              <button
                onClick={() => onScrollTo(l.id)}
                style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(237,228,211,0.5)', background: 'none', border: 'none', cursor: 'pointer', transition: 'color 0.3s' }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C4A35A')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(237,228,211,0.5)')}
              >
                {l.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Hamburger */}
        <button
          className="flex md:hidden"
          style={{ flexDirection: 'column', gap: 5, background: 'none', border: 'none', cursor: 'pointer', padding: 4 }}
          onClick={() => setMenuOpen(true)}
          aria-label="Open menu"
        >
          <span style={{ display: 'block', width: 22, height: 1, background: '#EDE4D3' }} />
          <span style={{ display: 'block', width: 22, height: 1, background: '#EDE4D3' }} />
          <span style={{ display: 'block', width: 22, height: 1, background: '#EDE4D3' }} />
        </button>
      </nav>

      {/* Mobile full-screen menu */}
      {menuOpen && (
        <div style={{ position: 'fixed', inset: 0, background: '#000', zIndex: 900, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 52 }}>
          <button
            onClick={() => setMenuOpen(false)}
            style={{ position: 'absolute', top: 28, right: 52, fontFamily: "'Space Mono', monospace", fontSize: '0.65rem', letterSpacing: '0.22em', color: 'rgba(237,228,211,0.4)', background: 'none', border: 'none', cursor: 'pointer', textTransform: 'uppercase' }}
          >
            CLOSE
          </button>
          {links.map(l => (
            <button
              key={l.id}
              onClick={() => { onScrollTo(l.id); setMenuOpen(false); }}
              style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem,12vw,5rem)', letterSpacing: '0.08em', color: '#EDE4D3', background: 'none', border: 'none', cursor: 'pointer' }}
              onMouseEnter={e => (e.currentTarget.style.color = '#C4A35A')}
              onMouseLeave={e => (e.currentTarget.style.color = '#EDE4D3')}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
    </>
  );
}
