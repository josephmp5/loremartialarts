'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LOGO = 'https://fmkglpsfszlkubobcmhg.supabase.co/storage/v1/object/public/site-assets/logo.png';

export default function Moment1Name() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef    = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Logo fades in on load
    gsap.to(logoRef.current, {
      opacity: 1, scale: 1, duration: 2.0, ease: 'power3.out', delay: 0.6,
    });

    // Scroll: logo + sub fade out as user scrolls away
    const st = ScrollTrigger.create({
      trigger: sectionRef.current,
      start: 'top top',
      end: 'bottom top',
      pin: true,
      scrub: 1.2,
      onUpdate(self) {
        const p = self.progress;
        if (!logoRef.current || !subRef.current) return;

        // Logo glow intensifies slightly then fades out near end
        const logoFade = 1 - Math.min(Math.max((p - 0.65) / 0.25, 0), 1);
        logoRef.current.style.opacity = String(logoFade);

        // Sub text: in 0.15–0.30, hold, out 0.65–0.80
        const subIn  = Math.min(Math.max((p - 0.15) / 0.15, 0), 1);
        const subOut = Math.min(Math.max((p - 0.65) / 0.15, 0), 1);
        subRef.current.style.opacity = String(Math.min(subIn, 1 - subOut));
        subRef.current.style.transform = `translateY(${(1 - subIn) * 14}px)`;
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ height: '95vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 36 }}
    >
      {/* Logo with gold glow */}
      <div
        ref={logoRef}
        style={{ opacity: 0, transform: 'scale(0.94)', willChange: 'opacity, transform' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO}
          alt="LORE Martial Arts"
          style={{
            width: 'clamp(110px, 16vw, 200px)',
            height: 'auto',
            display: 'block',
            // Invert to white, then add gold glow
            filter: 'invert(1) drop-shadow(0 0 18px rgba(196,163,90,0.5)) drop-shadow(0 0 50px rgba(196,163,90,0.18))',
          }}
        />
      </div>

      {/* Subtitle */}
      <div ref={subRef} style={{ textAlign: 'center', opacity: 0, transform: 'translateY(14px)', willChange: 'opacity, transform' }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '0.95rem', letterSpacing: '0.5em', color: 'rgba(196,163,90,0.72)', textTransform: 'uppercase', marginBottom: 10 }}>
          Martial Arts · Antalya
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.1rem', letterSpacing: '0.22em', color: 'rgba(237,228,211,0.45)' }}>
          Train · Grow · Belong
        </div>
      </div>
    </section>
  );
}
