'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Moment4Gym() {
  const outerRef   = useRef<HTMLElement>(null);
  const labelRef   = useRef<HTMLDivElement>(null);
  const headRef    = useRef<HTMLHeadingElement>(null);
  const nameRef    = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const sl1Ref     = useRef<HTMLDivElement>(null);
  const sl2Ref     = useRef<HTMLDivElement>(null);
  const sl3Ref     = useRef<HTMLDivElement>(null);
  const mapRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const st = ScrollTrigger.create({
      trigger: outer, start: 'top 80%',
      onEnter: () => {
        gsap.to(labelRef.current,   { opacity: 1, duration: 0.6 });
        gsap.to(headRef.current,    { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 0.2 });
        gsap.to(nameRef.current,    { opacity: 1, duration: 0.8, delay: 0.5 });
        gsap.to(detailsRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.7 });
        [sl1Ref, sl2Ref, sl3Ref].forEach((r, i) => {
          gsap.to(r.current, { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out', delay: 0.9 + i * 0.15 });
        });
        gsap.to(mapRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 1.4 });
      },
    });
    return () => st.kill();
  }, []);

  const mono  = "'Space Mono', monospace";
  const serif = "'Cormorant Garamond', serif";
  const anton = "'Anton', sans-serif";
  const gold  = '#C4A35A';
  const cream = 'rgba(237,228,211,';

  return (
    <section id="moment-gym" ref={outerRef} style={{ height: '100vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        <div style={{ textAlign: 'center', maxWidth: 580, padding: '0 40px' }}>

          <div ref={labelRef} style={{ fontFamily: mono, fontSize: '0.6rem', letterSpacing: '0.4em', color: gold, textTransform: 'uppercase', marginBottom: 32, opacity: 0 }}>
            The Gym
          </div>

          <h2 ref={headRef} style={{ fontFamily: anton, fontSize: 'clamp(2.5rem, 8vw, 7rem)', lineHeight: 1, color: '#EDE4D3', marginBottom: 12, opacity: 0, transform: 'translateY(40px)' }}>
            Your new<br />home mat.
          </h2>

          <div ref={nameRef} style={{ fontFamily: serif, fontSize: '1.1rem', letterSpacing: '0.3em', color: `${cream}0.55)`, marginBottom: 56, opacity: 0 }}>
            LORE Martial Arts
          </div>

          <div ref={detailsRef} style={{ opacity: 0, transform: 'translateY(20px)' }}>
            <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '1.2rem', color: `${cream}0.55)`, marginBottom: 32, letterSpacing: '0.05em' }}>
              Lara, Antalya
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 32 }}>
              {[sl1Ref, sl2Ref, sl3Ref].map((r, i) => (
                <div key={i} ref={r} style={{ fontFamily: mono, fontSize: '0.78rem', letterSpacing: '0.15em', color: gold, opacity: 0, transform: 'translateX(-20px)' }}>
                  {['Monday — 20:30', 'Wednesday — 20:30', 'Friday — 20:30'][i]}
                </div>
              ))}
            </div>

            <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '0.95rem', color: `${cream}0.3)`, marginBottom: 48 }}>
              Monthly membership · Message us for details
            </div>

            <div ref={mapRef} style={{ opacity: 0, transform: 'translateY(20px)', border: '1px solid rgba(196,163,90,0.15)', borderRadius: 4, overflow: 'hidden', maxWidth: 480, margin: '0 auto' }}>
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.566579779895!2d30.752719710375196!3d36.85285497211635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39bf22fcc6ee3%3A0xbe8f56c9580354f0!2sLara%20Judo%20Academy!5e0!3m2!1str!2str!4v1772750789697!5m2!1str!2str"
                style={{ display: 'block', width: '100%', height: 220, border: 0, filter: 'grayscale(1) invert(1) contrast(0.8) brightness(0.55) sepia(0.35)' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="LORE Martial Arts Location"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
