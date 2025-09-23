'use client';

import { useState } from 'react';

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav style={{
      backgroundColor: 'rgba(44, 24, 16, 0.9)',
      backdropFilter: 'blur(10px)',
      borderBottom: '2px solid #8b4513',
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      zIndex: 1000,
      fontFamily: 'Crimson Text, serif'
    }}>
      <div style={{ 
        maxWidth: '1152px', 
        margin: '0 auto', 
        padding: '0 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '64px'
      }}>
        <div style={{
          fontSize: '1.5rem',
          fontWeight: 'bold',
          color: '#fef3c7',
          fontFamily: 'Go3v2, serif',
          textShadow: '0 0 1px rgba(44, 24, 16, 0.3), 0 1px 2px rgba(44, 24, 16, 0.2)'
        }}>
          LORE BJJ
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex" style={{ gap: '32px' }}>
          <a 
            href="#about" 
            style={{
              color: '#fef3c7',
              textDecoration: 'none',
              fontSize: '1.125rem',
              fontWeight: '500',
              position: 'relative',
              transition: 'all 0.3s ease',
              borderBottom: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderBottomColor = '#8b4513';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderBottomColor = 'transparent';
            }}
          >
            About
          </a>
          <a 
            href="#training" 
            style={{
              color: '#fef3c7',
              textDecoration: 'none',
              fontSize: '1.125rem',
              fontWeight: '500',
              position: 'relative',
              transition: 'all 0.3s ease',
              borderBottom: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderBottomColor = '#8b4513';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderBottomColor = 'transparent';
            }}
          >
            Training
          </a>
          <a 
            href="#locations" 
            style={{
              color: '#fef3c7',
              textDecoration: 'none',
              fontSize: '1.125rem',
              fontWeight: '500',
              position: 'relative',
              transition: 'all 0.3s ease',
              borderBottom: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderBottomColor = '#8b4513';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderBottomColor = 'transparent';
            }}
          >
            Locations
          </a>
          <a 
            href="#contact" 
            style={{
              color: '#fef3c7',
              textDecoration: 'none',
              fontSize: '1.125rem',
              fontWeight: '500',
              position: 'relative',
              transition: 'all 0.3s ease',
              borderBottom: '2px solid transparent'
            }}
            onMouseEnter={(e) => {
              (e.target as HTMLElement).style.borderBottomColor = '#8b4513';
            }}
            onMouseLeave={(e) => {
              (e.target as HTMLElement).style.borderBottomColor = 'transparent';
            }}
          >
            Contact
          </a>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#fef3c7',
            fontSize: '1.5rem',
            cursor: 'pointer'
          }}
        >
          ☰
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden" style={{
          backgroundColor: 'rgba(44, 24, 16, 0.95)',
          borderTop: '1px solid #8b4513',
          padding: '20px'
        }}>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '16px' 
          }}>
            <a 
              href="#about" 
              style={{
                color: '#fef3c7',
                textDecoration: 'none',
                fontSize: '1.125rem',
                fontWeight: '500',
                padding: '8px 0',
                borderBottom: '1px solid rgba(139, 69, 19, 0.3)'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </a>
            <a 
              href="#training" 
              style={{
                color: '#fef3c7',
                textDecoration: 'none',
                fontSize: '1.125rem',
                fontWeight: '500',
                padding: '8px 0',
                borderBottom: '1px solid rgba(139, 69, 19, 0.3)'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Training
            </a>
            <a 
              href="#locations" 
              style={{
                color: '#fef3c7',
                textDecoration: 'none',
                fontSize: '1.125rem',
                fontWeight: '500',
                padding: '8px 0',
                borderBottom: '1px solid rgba(139, 69, 19, 0.3)'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Locations
            </a>
            <a 
              href="#contact" 
              style={{
                color: '#fef3c7',
                textDecoration: 'none',
                fontSize: '1.125rem',
                fontWeight: '500',
                padding: '8px 0'
              }}
              onClick={() => setIsMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        </div>
      )}
    </nav>
  );
} 