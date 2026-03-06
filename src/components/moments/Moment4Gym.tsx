'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const MAPS_URL = 'https://www.google.com/maps/search/?api=1&query=Lara+Judo+Academy+Antalya&query_place_id=0xbe8f56c9580354f0';

function LocationCard() {
  const mono  = "'Space Mono', monospace";
  const serif = "'Cormorant Garamond', serif";
  const gold  = '#C4A35A';

  return (
    <a
      href={MAPS_URL}
      target="_blank"
      rel="noopener noreferrer"
      style={{ display: 'block', textDecoration: 'none', maxWidth: 460, margin: '0 auto' }}
    >
      <div
        style={{
          border: '1px solid rgba(196,163,90,0.2)',
          borderRadius: 2,
          padding: '32px 36px',
          background: 'rgba(196,163,90,0.03)',
          transition: 'border-color 0.4s, background 0.4s',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(196,163,90,0.5)';
          (e.currentTarget as HTMLDivElement).style.background  = 'rgba(196,163,90,0.06)';
        }}
        onMouseLeave={e => {
          (e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(196,163,90,0.2)';
          (e.currentTarget as HTMLDivElement).style.background  = 'rgba(196,163,90,0.03)';
        }}
      >
        {/* Pin icon */}
        <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <svg width="20" height="24" viewBox="0 0 20 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 0C4.477 0 0 4.477 0 10C0 17.5 10 24 10 24C10 24 20 17.5 20 10C20 4.477 15.523 0 10 0ZM10 13.5C8.067 13.5 6.5 11.933 6.5 10C6.5 8.067 8.067 6.5 10 6.5C11.933 6.5 13.5 8.067 13.5 10C13.5 11.933 11.933 13.5 10 13.5Z" fill={gold} fillOpacity="0.7"/>
          </svg>
        </div>

        {/* Address */}
        <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '1.2rem', color: 'rgba(237,228,211,0.85)', marginBottom: 6, letterSpacing: '0.04em' }}>
          Lara, Antalya
        </div>
        <div style={{ fontFamily: mono, fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(237,228,211,0.4)', textTransform: 'uppercase', marginBottom: 24 }}>
          Turkey
        </div>

        {/* Coordinates line */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 24 }}>
          <span style={{ fontFamily: mono, fontSize: '0.58rem', letterSpacing: '0.12em', color: 'rgba(196,163,90,0.5)' }}>
            36.8528° N
          </span>
          <span style={{ fontFamily: mono, fontSize: '0.58rem', color: 'rgba(196,163,90,0.3)' }}>·</span>
          <span style={{ fontFamily: mono, fontSize: '0.58rem', letterSpacing: '0.12em', color: 'rgba(196,163,90,0.5)' }}>
            30.7527° E
          </span>
        </div>

        {/* CTA */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8 }}>
          <span style={{ fontFamily: mono, fontSize: '0.6rem', letterSpacing: '0.22em', color: gold, textTransform: 'uppercase' }}>
            Open in Maps
          </span>
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
            <path d="M1 6H11M11 6L7 2M11 6L7 10" stroke={gold} strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </a>
  );
}

export default function Moment4Gym() {
  const outerRef   = useRef<HTMLElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLHeadingElement>(null);
  const nameRef    = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const sl1Ref     = useRef<HTMLDivElement>(null);
  const sl2Ref     = useRef<HTMLDivElement>(null);
  const sl3Ref     = useRef<HTMLDivElement>(null);
  const locRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const st = ScrollTrigger.create({
      trigger: outer, start: 'top 75%',
      onEnter: () => {
        gsap.to(labelRef.current,   { opacity: 1, duration: 0.6 });
        gsap.to(headRef.current,    { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 0.2 });
        gsap.to(nameRef.current,    { opacity: 1, duration: 0.8, delay: 0.5 });
        gsap.to(detailsRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.7 });
        [sl1Ref, sl2Ref, sl3Ref].forEach((r, i) => {
          gsap.to(r.current, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: 0.9 + i * 0.15 });
        });
        gsap.to(locRef.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 1.4 });
      },
    });
    return () => st.kill();
  }, []);

  const mono  = "'Space Mono', monospace";
  const serif = "'Cormorant Garamond', serif";
  const anton = "'Anton', sans-serif";
  const gold  = '#C4A35A';

  return (
    <section id="moment-gym" ref={outerRef} style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 40px' }}>
      <div style={{ textAlign: 'center', maxWidth: 580, width: '100%' }}>

        <div ref={labelRef} style={{ fontFamily: mono, fontSize: '0.6rem', letterSpacing: '0.4em', color: gold, textTransform: 'uppercase', marginBottom: 32, opacity: 0 }}>
          The Gym
        </div>

        <h2 ref={headRef} style={{ fontFamily: anton, fontSize: 'clamp(2.5rem, 8vw, 7rem)', lineHeight: 1, color: '#EDE4D3', marginBottom: 12, opacity: 0, transform: 'translateY(40px)' }}>
          Your new<br />home mat.
        </h2>

        <div ref={nameRef} style={{ fontFamily: serif, fontSize: '1.1rem', letterSpacing: '0.3em', color: 'rgba(196,163,90,0.6)', marginBottom: 56, opacity: 0 }}>
          LORE Martial Arts
        </div>

        <div ref={detailsRef} style={{ opacity: 0, transform: 'translateY(20px)' }}>

          {/* Schedule */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
            {([sl1Ref, sl2Ref, sl3Ref] as React.RefObject<HTMLDivElement>[]).map((r, i) => (
              <div key={i} ref={r} style={{ fontFamily: mono, fontSize: '0.78rem', letterSpacing: '0.15em', color: gold, opacity: 0, transform: 'translateX(-20px)' }}>
                {['Monday — 20:30', 'Wednesday — 20:30', 'Friday — 20:30'][i]}
              </div>
            ))}
          </div>

          <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '0.95rem', color: 'rgba(237,228,211,0.35)', marginBottom: 52 }}>
            Monthly membership · Message us for details
          </div>

          {/* Location card — replaces broken map */}
          <div ref={locRef} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <LocationCard />
          </div>

        </div>
      </div>
    </section>
  );
}
