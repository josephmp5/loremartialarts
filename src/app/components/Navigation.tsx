'use client';

import { useState, useEffect } from 'react';

const links = [
  { label: 'Our Story', section: 'about' },
  { label: 'Gallery',   section: 'gallery' },
  { label: 'Locations', section: 'locations' },
  { label: 'Camps',     section: 'youtube' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      height: '60px',
      display: 'flex',
      alignItems: 'center',
      padding: '0 clamp(20px, 5vw, 60px)',
      justifyContent: 'space-between',
      background: scrolled ? 'rgba(12, 12, 12, 0.96)' : 'transparent',
      borderBottom: scrolled ? '1px solid #1E1E1E' : '1px solid transparent',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'background 0.3s ease, border-color 0.3s ease, backdrop-filter 0.3s ease',
    }}>
      {/* Logo */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: 0,
          display: 'flex',
          alignItems: 'baseline',
          gap: '8px',
        }}
      >
        <span style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontWeight: 700,
          fontSize: '1.5rem',
          color: '#EDE9E0',
          letterSpacing: '0.05em',
          lineHeight: 1,
        }}>
          LORE
        </span>
        <span style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontWeight: 300,
          fontSize: '0.7rem',
          color: '#C4922A',
          letterSpacing: '0.25em',
          textTransform: 'uppercase',
          lineHeight: 1,
        }}>
          BJJ
        </span>
      </button>

      {/* Desktop Links */}
      <div className="hidden md:flex" style={{ gap: '36px', alignItems: 'center' }}>
        {links.map(({ label, section }) => (
          <button
            key={section}
            onClick={() => scrollTo(section)}
            className="nav-link"
          >
            {label}
          </button>
        ))}
        <button
          onClick={() => scrollTo('contact')}
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '0.72rem',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#0C0C0C',
            background: '#C4922A',
            border: 'none',
            padding: '9px 20px',
            cursor: 'pointer',
            transition: 'background 0.2s ease',
          }}
          onMouseEnter={e => (e.currentTarget.style.background = '#D4A83A')}
          onMouseLeave={e => (e.currentTarget.style.background = '#C4922A')}
        >
          Join Us
        </button>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="md:hidden"
        onClick={() => setMenuOpen(!menuOpen)}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}
        aria-label="Toggle menu"
      >
        {[0, 1, 2].map(i => (
          <span key={i} style={{
            display: 'block',
            width: '22px',
            height: '1px',
            background: '#EDE9E0',
            transition: 'transform 0.2s ease, opacity 0.2s ease',
            transform: menuOpen
              ? i === 0 ? 'translateY(6px) rotate(45deg)'
              : i === 2 ? 'translateY(-6px) rotate(-45deg)'
              : 'scaleX(0)'
              : 'none',
            opacity: menuOpen && i === 1 ? 0 : 1,
          }} />
        ))}
      </button>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{
          position: 'absolute',
          top: '60px',
          left: 0,
          right: 0,
          background: 'rgba(12, 12, 12, 0.98)',
          borderBottom: '1px solid #1E1E1E',
          padding: '20px clamp(20px, 5vw, 60px) 28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '0',
        }}>
          {links.map(({ label, section }) => (
            <button
              key={section}
              onClick={() => scrollTo(section)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: '1px solid #1E1E1E',
                padding: '16px 0',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.82rem',
                fontWeight: 400,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: '#8A857D',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = '#EDE9E0')}
              onMouseLeave={e => (e.currentTarget.style.color = '#8A857D')}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            style={{
              marginTop: '20px',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.72rem',
              fontWeight: 500,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: '#0C0C0C',
              background: '#C4922A',
              border: 'none',
              padding: '14px 24px',
              cursor: 'pointer',
              alignSelf: 'flex-start',
            }}
          >
            Join Us
          </button>
        </div>
      )}
    </nav>
  );
}
