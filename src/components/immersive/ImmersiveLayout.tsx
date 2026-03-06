'use client';

import { useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useImmersiveStore } from '@/store/immersive';

import GrainOverlay      from './GrainOverlay';
import ImmersiveNav      from './ImmersiveNav';
import ImmersiveFooter   from './ImmersiveFooter';
import Moment0Void       from '@/components/moments/Moment0Void';
import Moment1Name       from '@/components/moments/Moment1Name';
import Moment2Philosophy from '@/components/moments/Moment2Philosophy';
import Moment3Story      from '@/components/moments/Moment3Story';
import Moment4Gym        from '@/components/moments/Moment4Gym';
import Moment5Call       from '@/components/moments/Moment5Call';

// R3F Canvas — never SSR
const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function ImmersiveLayout() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<import('lenis').default | null>(null);

  useEffect(() => {
    let lenis: import('lenis').default;
    let raf: number;

    async function initLenis() {
      const LenisModule = await import('lenis');
      const Lenis = LenisModule.default;
      lenis = new Lenis({ lerp: 0.08, smoothWheel: true });
      lenisRef.current = lenis;

      // Sync Lenis with GSAP ticker
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }

    initLenis();

    // Global scroll progress tracker
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (maxScroll > 0) {
        useImmersiveStore.getState().setScrollProgress(window.scrollY / maxScroll);
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // Cursor tracking
    const onMouseMove = (e: MouseEvent) => {
      useImmersiveStore.getState().setCursor({
        x:  (e.clientX / window.innerWidth)  * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      });
    };
    window.addEventListener('mousemove', onMouseMove, { passive: true });

    // Custom cursor elements
    const cursor = document.getElementById('lore-cursor');
    const ring   = document.getElementById('lore-cursor-ring');
    if (cursor && ring) {
      const onMove = (e: MouseEvent) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top  = e.clientY + 'px';
        ring.style.left   = e.clientX + 'px';
        ring.style.top    = e.clientY + 'px';
      };
      window.addEventListener('mousemove', onMove, { passive: true });
    }

    return () => {
      lenisRef.current?.destroy();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { offset: 0, duration: 1.4, easing: (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t });
    } else {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <style>{`
        html { scroll-behavior: auto !important; }
        body { background: #000 !important; overflow-x: hidden; cursor: none !important; }
        body::before { display: none !important; }

        #lore-cursor {
          position: fixed; width: 8px; height: 8px;
          background: rgba(196,163,90,0.85); border-radius: 50%;
          pointer-events: none; z-index: 9999;
          transform: translate(-50%,-50%);
          mix-blend-mode: screen;
        }
        #lore-cursor-ring {
          position: fixed; width: 30px; height: 30px;
          border: 1px solid rgba(196,163,90,0.3); border-radius: 50%;
          pointer-events: none; z-index: 9998;
          transform: translate(-50%,-50%);
          transition: width 0.3s, height 0.3s;
        }
        @media (pointer: coarse) {
          #lore-cursor, #lore-cursor-ring { display: none; }
          body { cursor: auto !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* Cursor dots */}
      <div id="lore-cursor" />
      <div id="lore-cursor-ring" />

      {/* 3D canvas — fixed background */}
      <Scene />

      {/* Film grain */}
      <GrainOverlay />

      {/* Navigation */}
      <ImmersiveNav onScrollTo={scrollTo} />

      {/* Scrollable content */}
      <div ref={containerRef} style={{ position: 'relative', zIndex: 1 }}>
        <Moment0Void />
        <Moment1Name />
        <Moment2Philosophy />
        <Moment3Story />
        <Moment4Gym />
        <Moment5Call />
        <ImmersiveFooter />
      </div>
    </>
  );
}
