'use client';

import { useState, useEffect } from 'react';

const links = [
  { label: 'Story',     section: 'about' },
  { label: 'Gallery',   section: 'gallery' },
  { label: 'Locations', section: 'locations' },
  { label: 'Camps',     section: 'youtube' },
];

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

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

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        height: '58px',
        display: 'flex',
        alignItems: 'center',
        padding: '0 clamp(20px, 5vw, 60px)',
        justifyContent: 'space-between',
        background: scrolled ? 'rgba(6,6,6,0.95)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
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
          background: 'linear-gradient(to right, rgba(196,146,42,0.4), #C4922A)',
          transition: 'width 0.08s linear',
          opacity: scrolled ? 1 : 0,
        }}
      />

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
          gap: '7px',
        }}
      >
        <span
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontWeight: 700,
            fontSize: '1.4rem',
            color: '#EDE9E0',
            letterSpacing: '0.06em',
            lineHeight: 1,
            transition: 'color 0.2s ease',
          }}
        >
          LORE
        </span>
        <span
          style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontWeight: 300,
            fontSize: '0.62rem',
            color: '#C4922A',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            lineHeight: 1,
          }}
        >
          BJJ
        </span>
      </button>

      {/* Desktop links */}
      <div
        className="hidden md:flex"
        style={{ gap: '32px', alignItems: 'center' }}
      >
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
            fontSize: '0.68rem',
            fontWeight: 500,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#000',
            background: '#C4922A',
            border: 'none',
            padding: '9px 20px',
            cursor: 'pointer',
            transition: 'background 0.2s ease, transform 0.2s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#D4A83A';
            e.currentTarget.style.transform = 'translateY(-1px)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = '#C4922A';
            e.currentTarget.style.transform = 'translateY(0)';
          }}
        >
          Join Us
        </button>
      </div>

      {/* Mobile hamburger */}
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
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: '20px',
              height: '1px',
              background: '#EDE9E0',
              transition: 'transform 0.25s ease, opacity 0.25s ease',
              transform: menuOpen
                ? i === 0
                  ? 'translateY(6px) rotate(45deg)'
                  : i === 2
                  ? 'translateY(-6px) rotate(-45deg)'
                  : 'scaleX(0)'
                : 'none',
              opacity: menuOpen && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          style={{
            position: 'absolute',
            top: '58px',
            left: 0,
            right: 0,
            background: 'rgba(6,6,6,0.98)',
            borderBottom: '1px solid #141414',
            padding: '16px clamp(20px, 5vw, 60px) 24px',
            display: 'flex',
            flexDirection: 'column',
            backdropFilter: 'blur(16px)',
          }}
        >
          {links.map(({ label, section }) => (
            <button
              key={section}
              onClick={() => scrollTo(section)}
              style={{
                background: 'none',
                border: 'none',
                borderBottom: '1px solid #141414',
                padding: '15px 0',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.8rem',
                fontWeight: 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: '#8A857D',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'color 0.2s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#EDE9E0')}
              onMouseLeave={(e) => (e.currentTarget.style.color = '#8A857D')}
            >
              {label}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            style={{
              marginTop: '18px',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.68rem',
              fontWeight: 500,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#000',
              background: '#C4922A',
              border: 'none',
              padding: '13px 24px',
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
