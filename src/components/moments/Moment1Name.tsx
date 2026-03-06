'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useImmersiveStore } from '@/store/immersive';

gsap.registerPlugin(ScrollTrigger);

const LOGO = 'https://fmkglpsfszlkubobcmhg.supabase.co/storage/v1/object/public/site-assets/logo.png';

export default function Moment1Name() {
  const sectionRef = useRef<HTMLElement>(null);
  const logoRef    = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const { setHeroPhase, setConvergenceProgress } = useImmersiveStore.getState();

    // Initial logo entrance on page load
    gsap.to(logoRef.current, { opacity: 1, scale: 1, duration: 1.8, ease: 'power3.out', delay: 0.8 });

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom top',
      pin: true,
      scrub: 1.2,
      onUpdate(self) {
        const p = self.progress;

        // Drive particle convergence toward logo shape
        if (p < 0.35) {
          setHeroPhase('converging');
          setConvergenceProgress(p / 0.35);
        } else if (p < 0.65) {
          setHeroPhase('holding');
          setConvergenceProgress(1);
        } else {
          setHeroPhase('dispersing');
          setConvergenceProgress((p - 0.65) / 0.35);
        }

        // Logo: fade out as particles start dispersing
        if (logoRef.current) {
          const fade = 1 - Math.min(Math.max((p - 0.62) / 0.20, 0), 1);
          logoRef.current.style.opacity = String(fade);
        }

        // Sub text: in during hold, out during dispersion
        if (subRef.current) {
          const fadeIn  = Math.min(Math.max((p - 0.38) / 0.12, 0), 1);
          const fadeOut = Math.min(Math.max((p - 0.60) / 0.08, 0), 1);
          subRef.current.style.opacity  = String(Math.min(fadeIn, 1 - fadeOut));
          subRef.current.style.transform = `translateY(${(1 - Math.min(fadeIn, 1)) * 16}px)`;
        }
      },
      onLeaveBack() {
        setHeroPhase('idle');
        setConvergenceProgress(0);
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ height: '95vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', gap: 32 }}
    >
      {/* Logo — particles converge to form its shape, logo image displayed on top */}
      <div
        ref={logoRef}
        style={{ opacity: 0, transform: 'scale(0.92)', transformOrigin: 'center', transition: 'filter 0.5s' }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={LOGO}
          alt="LORE Martial Arts"
          style={{
            width: 'clamp(120px, 18vw, 220px)',
            height: 'auto',
            filter: 'invert(1) drop-shadow(0 0 20px rgba(196,163,90,0.4)) drop-shadow(0 0 60px rgba(196,163,90,0.15))',
            display: 'block',
          }}
        />
      </div>

      {/* Sub text — appears during hold phase */}
      <div ref={subRef} style={{ textAlign: 'center', opacity: 0, transform: 'translateY(16px)' }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', letterSpacing: '0.5em', color: 'rgba(196,163,90,0.75)', textTransform: 'uppercase', marginBottom: 10 }}>
          Martial Arts · Antalya
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.15rem', letterSpacing: '0.22em', color: 'rgba(237,228,211,0.5)' }}>
          Train · Grow · Belong
        </div>
      </div>
    </section>
  );
}
