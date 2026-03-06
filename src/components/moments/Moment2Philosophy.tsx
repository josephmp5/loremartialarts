'use client';

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const QUOTES = [
  { text: 'The mat does not care about your past.', sub: 'Everyone starts at zero.',         num: '01' },
  { text: 'Technique outlasts strength.',           sub: 'It is the weapon of the patient.',  num: '02' },
  { text: 'Show up. Every time.',                   sub: 'The belt is earned on the floor.',  num: '03' },
];

// Each quote gets ~100vh of scroll — total section height: 300vh
// Transitions happen at 0.30 and 0.64 of scrub progress

function buildWords(text: string) {
  return text.split(' ').map((w, i) => (
    <span key={i} className="q-word" style={{ display: 'inline-block', opacity: 0, transform: 'translateY(40px) scale(0.97)', marginRight: '0.22em', willChange: 'transform, opacity' }}>
      {w}
    </span>
  ));
}

export default function Moment2Philosophy() {
  const outerRef = useRef<HTMLElement>(null);
  const q1Ref    = useRef<HTMLDivElement>(null);
  const q2Ref    = useRef<HTMLDivElement>(null);
  const q3Ref    = useRef<HTMLDivElement>(null);
  const refs     = [q1Ref, q2Ref, q3Ref];

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;

    // Q1 entrance as section scrolls into view
    ScrollTrigger.create({
      trigger: outer, start: 'top 80%',
      onEnter: () => {
        const q1 = q1Ref.current;
        if (!q1) return;
        gsap.to(q1, { opacity: 1, duration: 0.3 });
        gsap.to(q1.querySelectorAll('.q-word'), { opacity: 1, y: 0, scale: 1, duration: 0.55, stagger: 0.09, ease: 'power3.out' });
        const sub = q1.querySelector<HTMLElement>('.q-sub');
        if (sub) gsap.to(sub, { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', delay: 0.55 });
      },
    });

    // Main scrub — 300vh section, 3 quotes each with ~100vh breathing room
    // scrub:1.5 = 1.5s lag so fast scrolling catches up smoothly
    const st = ScrollTrigger.create({
      trigger: outer,
      start: 'top top',
      end: 'bottom bottom',
      pin: true,
      scrub: 1.5,
      onUpdate(self) {
        const p = self.progress;
        const [q1, q2, q3] = refs.map(r => r.current);
        if (!q1 || !q2 || !q3) return;

        // ── Q1: visible 0–0.30, fade out 0.24–0.30 ──
        const q1o = 1 - Math.min(Math.max((p - 0.24) / 0.06, 0), 1);
        q1.style.opacity   = String(q1o);
        q1.style.transform = `translateY(${(1 - q1o) * -28}px)`;

        // ── Q2: in 0.28–0.42, hold 0.42–0.58, out 0.58–0.65 ──
        const q2in  = Math.min(Math.max((p - 0.28) / 0.14, 0), 1);
        const q2out = Math.min(Math.max((p - 0.58) / 0.07, 0), 1);
        const q2o   = Math.min(q2in, 1 - q2out);
        q2.style.opacity   = String(Math.max(0, q2o));
        q2.style.transform = `translateY(${(1 - q2in) * 28}px)`;
        if (q2in > 0.02) {
          q2.querySelectorAll<HTMLElement>('.q-word').forEach((w, i) => {
            const wp = Math.min(Math.max(q2in * 1.6 - i * 0.12, 0), 1);
            w.style.opacity   = String(wp * (1 - q2out));
            w.style.transform = `translateY(${(1 - wp) * 38}px) scale(${0.97 + wp * 0.03})`;
          });
          const s2 = q2.querySelector<HTMLElement>('.q-sub');
          if (s2) s2.style.opacity = String(Math.min(Math.max(q2in * 2 - 1, 0), 1) * (1 - q2out));
        }

        // ── Q3: in 0.63–0.78, holds ──
        const q3in = Math.min(Math.max((p - 0.63) / 0.15, 0), 1);
        q3.style.opacity   = String(q3in);
        q3.style.transform = `translateY(${(1 - q3in) * 28}px)`;
        if (q3in > 0.02) {
          q3.querySelectorAll<HTMLElement>('.q-word').forEach((w, i) => {
            const wp = Math.min(Math.max(q3in * 1.8 - i * 0.14, 0), 1);
            w.style.opacity   = String(wp);
            w.style.transform = `translateY(${(1 - wp) * 38}px) scale(${0.97 + wp * 0.03})`;
          });
          const s3 = q3.querySelector<HTMLElement>('.q-sub');
          if (s3) s3.style.opacity = String(Math.min(Math.max(q3in * 2 - 1, 0), 1));
        }
      },
    });

    return () => st.kill();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    // 300vh total — each quote gets roughly 100vh of scroll real-estate
    <section id="moment-philosophy" ref={outerRef} style={{ height: '220vh', position: 'relative' }}>
      <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {QUOTES.map((q, idx) => (
          <div key={idx} ref={refs[idx]} style={{ position: 'absolute', textAlign: 'center', maxWidth: 900, padding: '0 40px', opacity: 0, willChange: 'opacity, transform' }}>
            <div style={{ position: 'absolute', top: 44, right: 44, fontFamily: "'Space Mono', monospace", fontSize: '0.62rem', letterSpacing: '0.3em', color: 'rgba(196,163,90,0.25)' }}>
              {q.num}
            </div>
            <div style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2.5rem, 7vw, 7rem)', lineHeight: 1, color: '#EDE4D3', textShadow: '0 0 40px rgba(196,163,90,0.07)', marginBottom: 28 }}>
              {buildWords(q.text)}
            </div>
            <div className="q-sub" style={{ fontFamily: "'Cormorant Garamond', serif", fontStyle: 'italic', fontSize: '1.1rem', letterSpacing: '0.1em', color: '#C4A35A', opacity: 0, transform: 'translateY(16px)' }}>
              {q.sub}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
