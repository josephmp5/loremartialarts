'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useImmersiveStore } from '@/store/immersive';

gsap.registerPlugin(ScrollTrigger);

export default function Moment5Call() {
  const sectionRef = useRef<HTMLElement>(null);
  const headRef    = useRef<HTMLDivElement>(null);
  const subRef     = useRef<HTMLParagraphElement>(null);
  const ctaRef     = useRef<HTMLAnchorElement>(null);
  const linksRef   = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const entryST = ScrollTrigger.create({
      trigger: el, start: 'top 80%',
      onEnter:     () => useImmersiveStore.getState().setParticleMode('condensing'),
      onLeaveBack: () => useImmersiveStore.getState().setParticleMode('normal'),
    });

    const revealST = ScrollTrigger.create({
      trigger: el, start: 'top 72%',
      onEnter: () => {
        gsap.to(headRef.current,  { opacity: 1, y: 0, duration: 1.2, ease: 'back.out(1.7)' });
        gsap.to(subRef.current,   { opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.5 });
        gsap.to(ctaRef.current,   { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out', delay: 0.9 });
        gsap.to(linksRef.current, { opacity: 1, duration: 0.8, delay: 1.2 });
      },
    });

    return () => { entryST.kill(); revealST.kill(); };
  }, []);

  const mono  = "'Space Mono', monospace";
  const serif = "'Cormorant Garamond', serif";
  const anton = "'Anton', sans-serif";
  const gold  = '#C4A35A';

  return (
    <section
      id="moment-call"
      ref={sectionRef}
      style={{ minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '80px 40px' }}
    >
      <div
        ref={headRef}
        style={{ fontFamily: anton, fontSize: 'clamp(3.5rem, 14vw, 14rem)', lineHeight: 0.9, color: '#EDE4D3', textShadow: '0 0 80px rgba(196,163,90,0.04)', opacity: 0, transform: 'translateY(60px)', willChange: 'transform, opacity' }}
      >
        Ready<br />to roll?
      </div>

      <p
        ref={subRef}
        style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '1.15rem', color: gold, maxWidth: 460, lineHeight: 1.85, margin: '32px auto 48px', opacity: 0, transform: 'translateY(20px)' }}
      >
        Step onto the mat. The first class is the hardest — after that, you belong.
      </p>

      <a
        ref={ctaRef}
        href="https://wa.me/905069770077"
        target="_blank"
        rel="noopener noreferrer"
        style={{ display: 'inline-block', fontFamily: mono, fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: gold, border: `1px solid ${gold}`, padding: '18px 52px', textDecoration: 'none', transition: 'background 0.4s, color 0.4s', opacity: 0, transform: 'translateY(20px)' }}
        onMouseEnter={e => { e.currentTarget.style.background = gold; e.currentTarget.style.color = '#000'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = gold; }}
      >
        Message on WhatsApp
      </a>

      <div ref={linksRef} style={{ display: 'flex', gap: 40, marginTop: 28, opacity: 0 }}>
        {[
          { href: 'https://www.instagram.com/loremartialarts/', label: '@loremartialarts' },
          { href: 'mailto:contact@lorebjj.com', label: 'contact@lorebjj.com' },
        ].map(({ href, label }) => (
          <a key={href} href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{ fontFamily: mono, fontSize: '0.6rem', letterSpacing: '0.2em', color: 'rgba(237,228,211,0.35)', textDecoration: 'none', textTransform: 'uppercase', borderBottom: '1px solid transparent', transition: 'color 0.3s, border-color 0.3s' }}
            onMouseEnter={e => { e.currentTarget.style.color = gold; e.currentTarget.style.borderBottomColor = 'rgba(196,163,90,0.4)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(237,228,211,0.35)'; e.currentTarget.style.borderBottomColor = 'transparent'; }}
          >
            {label}
          </a>
        ))}
      </div>
    </section>
  );
}
