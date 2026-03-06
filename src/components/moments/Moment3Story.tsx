'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function useReveal(selector: string) {
  useEffect(() => {
    const el = document.querySelector<HTMLElement>(selector);
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el, start: 'top 82%',
      onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }),
    });
    return () => st.kill();
  }, [selector]);
}

function CountUp({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el, start: 'top 85%',
      onEnter: () => {
        const dur = 1200, start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now - start) / dur, 1);
          const e = 1 - Math.pow(1 - p, 3);
          el.textContent = Math.floor(e * target) + (p >= 1 ? suffix : '');
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
    });
    return () => st.kill();
  }, [target, suffix]);
  return <span ref={ref}>0</span>;
}

export default function Moment3Story() {
  const lineRef  = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const headRef  = useRef<HTMLHeadingElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const p3Ref = useRef<HTMLParagraphElement>(null);
  const stat1Ref = useRef<HTMLDivElement>(null);
  const stat2Ref = useRef<HTMLDivElement>(null);
  const stat3Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sts: ScrollTrigger[] = [];

    // Line draw + label
    sts.push(ScrollTrigger.create({
      trigger: lineRef.current, start: 'top 80%',
      onEnter: () => {
        gsap.to(lineRef.current, { scaleX: 1, duration: 1.8, ease: 'power2.out' });
        gsap.to(labelRef.current, { opacity: 1, y: 0, duration: 0.8, delay: 0.3 });
      },
    }));

    // Headline
    sts.push(ScrollTrigger.create({
      trigger: headRef.current, start: 'top 80%',
      onEnter: () => gsap.to(headRef.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out' }),
    }));

    // Paragraphs
    [p1Ref, p2Ref, p3Ref].forEach((r, i) => {
      sts.push(ScrollTrigger.create({
        trigger: r.current, start: 'top 83%',
        onEnter: () => gsap.to(r.current, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: i * 0.08 }),
      }));
    });

    // Stats
    [stat1Ref, stat2Ref, stat3Ref].forEach((r, i) => {
      sts.push(ScrollTrigger.create({
        trigger: r.current, start: 'top 85%',
        onEnter: () => gsap.to(r.current, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', delay: i * 0.15 }),
      }));
    });

    return () => sts.forEach(s => s.kill());
  }, []);

  const mono  = "'Space Mono', monospace";
  const serif = "'Cormorant Garamond', serif";
  const anton = "'Anton', sans-serif";
  const gold  = '#C4A35A';
  const cream = 'rgba(237,228,211,';

  return (
    <section style={{ padding: '60px 0 80px', maxWidth: 680, margin: '0 auto', textAlign: 'center' }}>
      {/* Label */}
      <div ref={labelRef} style={{ fontFamily: mono, fontSize: '0.6rem', letterSpacing: '0.4em', color: gold, textTransform: 'uppercase', marginBottom: 44, opacity: 0, transform: 'translateY(20px)' }}>
        Our Story
      </div>

      {/* Gold line */}
      <div ref={lineRef} style={{ width: '80%', height: 1, background: `linear-gradient(to right, transparent, ${gold}, transparent)`, margin: '0 auto 64px', transform: 'scaleX(0)', transformOrigin: 'left' }} />

      {/* Headline */}
      <h2 ref={headRef} style={{ fontFamily: anton, fontSize: 'clamp(2.5rem, 6vw, 5.5rem)', lineHeight: 1, color: '#EDE4D3', marginBottom: 64, opacity: 0, transform: 'translateY(30px)' }}>
        Built from the<br />ground up.
      </h2>

      {/* Paragraphs */}
      {[
        { ref: p1Ref, text: "What started in early 2025 as an idea became a home. LORE Martial Arts is Antalya's dedicated Brazilian Jiu-Jitsu gym." },
        { ref: p2Ref, text: "We built this from nothing — no franchise, no backing, just belief in the art and the community around it." },
        { ref: p3Ref, text: "Over a year later, we're still growing. Every class, every roll, every new face through the door proves this was worth building." },
      ].map(({ ref, text }, i) => (
        <p key={i} ref={ref} style={{ fontFamily: serif, fontSize: '1.25rem', lineHeight: 2, color: `${cream}0.72)`, marginBottom: 44, opacity: 0, transform: 'translateY(30px)', padding: '0 40px' }}>
          {text}
        </p>
      ))}

      {/* Stats */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 80, marginTop: 88, flexWrap: 'wrap', padding: '0 20px' }}>
        {[
          { ref: stat1Ref, num: <><CountUp target={1} suffix="+" /></>, label: 'Year Strong' },
          { ref: stat2Ref, num: <><CountUp target={3} /></>,            label: 'Days a Week' },
          { ref: stat3Ref, num: <span style={{ animation: 'glow-inf 2s ease-in-out infinite' }}>&#8734;</span>, label: 'Potential' },
        ].map(({ ref, num, label }, i) => (
          <div key={i} ref={ref} style={{ textAlign: 'center', opacity: 0, transform: 'translateY(30px)' }}>
            <span style={{ fontFamily: anton, fontSize: 'clamp(3rem, 7vw, 7rem)', color: gold, lineHeight: 1, display: 'block' }}>{num}</span>
            <span style={{ fontFamily: mono, fontSize: '0.6rem', letterSpacing: '0.25em', color: `${cream}0.35)`, textTransform: 'uppercase', marginTop: 8, display: 'block' }}>{label}</span>
          </div>
        ))}
      </div>

      <style>{`
        @keyframes glow-inf {
          0%,100% { text-shadow: 0 0 20px rgba(196,163,90,0.6), 0 0 40px rgba(196,163,90,0.3) }
          50%      { text-shadow: 0 0 30px rgba(196,163,90,0.9), 0 0 60px rgba(196,163,90,0.5) }
        }
      `}</style>
    </section>
  );
}
