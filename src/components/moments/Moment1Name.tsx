'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useImmersiveStore } from '@/store/immersive';

gsap.registerPlugin(ScrollTrigger);

export default function Moment1Name() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const setPhase = useImmersiveStore.getState().setHeroPhase;
    const setConv  = useImmersiveStore.getState().setConvergenceProgress;

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom top',
      pin: true,
      scrub: true,
      onUpdate(self) {
        const p = self.progress;

        if (p < 0.35) {
          setPhase('converging');
          setConv(p / 0.35);
        } else if (p < 0.65) {
          setPhase('holding');
          setConv(1);
        } else {
          setPhase('dispersing');
          setConv((p - 0.65) / 0.35);
        }

        // Fade in HTML content during hold phase
        if (contentRef.current) {
          const show = p >= 0.38 && p <= 0.62;
          const fadeIn  = show ? Math.min((p - 0.38) / 0.08, 1) : 0;
          const fadeOut = p > 0.58 ? Math.max(1 - (p - 0.58) / 0.07, 0) : 1;
          contentRef.current.style.opacity = String(Math.min(fadeIn, fadeOut));
        }
      },
      onLeaveBack() {
        setPhase('idle');
        setConv(0);
      },
    });

    return () => st.kill();
  }, []);

  return (
    <section
      ref={sectionRef}
      style={{ height: '95vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
    >
      <div
        ref={contentRef}
        style={{ textAlign: 'center', opacity: 0, transition: 'opacity 0.3s' }}
      >
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', letterSpacing: '0.5em', color: 'rgba(196,163,90,0.7)', textTransform: 'uppercase', marginBottom: 14 }}>
          Martial Arts · Antalya
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.2rem', letterSpacing: '0.22em', color: 'rgba(237,228,211,0.45)' }}>
          Train · Grow · Belong
        </div>
      </div>
    </section>
  );
}
