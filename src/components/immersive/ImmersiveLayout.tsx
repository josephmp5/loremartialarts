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
import MomentGallery     from '@/components/moments/MomentGallery';
import Moment4Gym        from '@/components/moments/Moment4Gym';
import Moment5Call       from '@/components/moments/Moment5Call';

const Scene = dynamic(() => import('@/components/canvas/Scene'), { ssr: false });

gsap.registerPlugin(ScrollTrigger);

export default function ImmersiveLayout() {
  const lenisRef = useRef<import('lenis').default | null>(null);

  useEffect(() => {
    async function init() {
      const { default: Lenis } = await import('lenis');
      const lenis = new Lenis({
        lerp: 0.12,
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1.5,
      });
      lenisRef.current = lenis;
      lenis.on('scroll', ScrollTrigger.update);
      gsap.ticker.add((time) => lenis.raf(time * 1000));
      gsap.ticker.lagSmoothing(0);
    }
    init();

    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0) useImmersiveStore.getState().setScrollProgress(window.scrollY / max);
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    const onMouse = (e: MouseEvent) => {
      useImmersiveStore.getState().setCursor({
        x:  (e.clientX / window.innerWidth)  * 2 - 1,
        y: -((e.clientY / window.innerHeight) * 2 - 1),
      });
      const c = document.getElementById('lore-cursor');
      const r = document.getElementById('lore-cursor-ring');
      if (c) { c.style.left = e.clientX + 'px'; c.style.top = e.clientY + 'px'; }
      if (r) { r.style.left = e.clientX + 'px'; r.style.top = e.clientY + 'px'; }
    };
    window.addEventListener('mousemove', onMouse, { passive: true });

    return () => {
      lenisRef.current?.destroy();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('mousemove', onMouse);
    };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;
    if (lenisRef.current) {
      lenisRef.current.scrollTo(el, { duration: 1.6, easing: (t: number) => t < 0.5 ? 2*t*t : -1+(4-2*t)*t });
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
        body::after  { display: none !important; }
        #lore-cursor {
          position: fixed; width: 8px; height: 8px;
          background: rgba(196,163,90,0.9); border-radius: 50%;
          pointer-events: none; z-index: 9999;
          transform: translate(-50%,-50%); mix-blend-mode: screen;
          will-change: left, top;
        }
        #lore-cursor-ring {
          position: fixed; width: 32px; height: 32px;
          border: 1px solid rgba(196,163,90,0.35); border-radius: 50%;
          pointer-events: none; z-index: 9998;
          transform: translate(-50%,-50%);
          transition: width 0.3s, height 0.3s;
          will-change: left, top;
        }
        @media (pointer: coarse) {
          #lore-cursor, #lore-cursor-ring { display: none; }
          body { cursor: auto !important; }
        }
        @media (prefers-reduced-motion: reduce) {
          * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
        }
      `}</style>

      {/* Guaranteed black background — visible on mobile where Canvas is skipped */}
      <div style={{ position: 'fixed', inset: 0, background: '#000000', zIndex: 0, pointerEvents: 'none' }} />

      <div id="lore-cursor" />
      <div id="lore-cursor-ring" />
      <Scene />
      <GrainOverlay />
      <ImmersiveNav onScrollTo={scrollTo} />

      <div style={{ position: 'relative', zIndex: 1 }}>
        <Moment0Void />
        <Moment1Name />
        <Moment2Philosophy />
        <Moment3Story />
        <MomentGallery />
        <Moment4Gym />
        <Moment5Call />
        <ImmersiveFooter />
      </div>
    </>
  );
}
