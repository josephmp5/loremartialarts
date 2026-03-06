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

    const { setHeroPhase, setConvergenceProgress } = useImmersiveStore.getState();

    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top top',
      end: 'bottom top',
      pin: true,
      // scrub with a smoothing value so fast scrolling doesn't cause jerking
      scrub: 1.2,
      onUpdate(self) {
        const p = self.progress;

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

        // Fade HTML subtitle in/out during hold window
        if (contentRef.current) {
          const fadeIn  = Math.min(Math.max((p - 0.38) / 0.10, 0), 1);
          const fadeOut = Math.min(Math.max((p - 0.56) / 0.09, 0), 1);
          contentRef.current.style.opacity = String(Math.min(fadeIn, 1 - fadeOut));
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
      style={{ height: '95vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative' }}
    >
      <div ref={contentRef} style={{ textAlign: 'center', opacity: 0 }}>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1rem', letterSpacing: '0.5em', color: 'rgba(196,163,90,0.75)', textTransform: 'uppercase', marginBottom: 14 }}>
          Martial Arts · Antalya
        </div>
        <div style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.2rem', letterSpacing: '0.22em', color: 'rgba(237,228,211,0.5)' }}>
          Train · Grow · Belong
        </div>
      </div>
    </section>
  );
}
