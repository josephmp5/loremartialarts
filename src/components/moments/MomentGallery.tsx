'use client';

import { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { supabase } from '@/lib/supabase';

gsap.registerPlugin(ScrollTrigger);

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image_url: string;
  display_order: number;
}

function getGalleryUrl(url: string) {
  if (url.startsWith('http')) return url;
  return `https://fmkglpsfszlkubobcmhg.supabase.co/storage/v1/object/public/training-gallery/${url}`;
}

function GalleryCard({ img, index }: { img: GalleryImage; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const st = ScrollTrigger.create({
      trigger: el, start: 'top 88%',
      onEnter: () => gsap.to(el, {
        opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: (index % 3) * 0.12,
      }),
    });
    return () => st.kill();
  }, [index]);

  return (
    <div
      ref={cardRef}
      style={{
        opacity: 0, transform: 'translateY(40px)',
        position: 'relative', overflow: 'hidden',
        border: `1px solid ${hovered ? 'rgba(196,163,90,0.45)' : 'rgba(196,163,90,0.15)'}`,
        transition: 'border-color 0.4s',
        willChange: 'transform, opacity',
        cursor: 'pointer',
        aspectRatio: '4/3',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={getGalleryUrl(img.image_url)}
        alt={img.title}
        loading="lazy"
        style={{
          width: '100%', height: '100%', objectFit: 'cover', display: 'block',
          transition: 'transform 0.6s ease, filter 0.4s ease',
          transform: hovered ? 'scale(1.04)' : 'scale(1)',
          filter: hovered ? 'grayscale(0%) brightness(0.85)' : 'grayscale(25%) brightness(0.7)',
        }}
      />

      {/* Permanent dark vignette */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.1) 50%, transparent 100%)', pointerEvents: 'none' }} />

      {/* Title */}
      {img.title && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          padding: '16px 20px',
          transform: hovered ? 'translateY(0)' : 'translateY(4px)',
          transition: 'transform 0.3s ease, opacity 0.3s ease',
          opacity: hovered ? 1 : 0.7,
        }}>
          <div style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.58rem', letterSpacing: '0.2em', color: 'rgba(196,163,90,0.85)', textTransform: 'uppercase' }}>
            {img.title}
          </div>
        </div>
      )}

      {/* Gold corner accent on hover */}
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: hovered ? 28 : 0, height: 1,
        background: '#C4A35A',
        transition: 'width 0.4s ease',
      }} />
      <div style={{
        position: 'absolute', top: 0, left: 0,
        width: 1, height: hovered ? 28 : 0,
        background: '#C4A35A',
        transition: 'height 0.4s ease',
      }} />
    </div>
  );
}

export default function MomentGallery() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const labelRef = useRef<HTMLDivElement>(null);
  const headRef  = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    supabase
      .from('training_gallery')
      .select('*')
      .eq('active', true)
      .order('display_order', { ascending: true })
      .then(({ data }) => {
        if (data && data.length > 0) setImages(data);
      });
  }, []);

  useEffect(() => {
    if (!labelRef.current || !headRef.current) return;
    const sts = [
      ScrollTrigger.create({ trigger: labelRef.current, start: 'top 82%',
        onEnter: () => gsap.to(labelRef.current, { opacity: 1, y: 0, duration: 0.7 }) }),
      ScrollTrigger.create({ trigger: headRef.current, start: 'top 82%',
        onEnter: () => gsap.to(headRef.current, { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 0.15 }) }),
    ];
    return () => sts.forEach(s => s.kill());
  }, []);

  if (images.length === 0) return null;

  return (
    <section style={{ padding: '100px 0 80px' }}>
      <div style={{ maxWidth: 1000, margin: '0 auto', padding: '0 40px' }}>

        <div ref={labelRef} style={{ fontFamily: "'Space Mono', monospace", fontSize: '0.6rem', letterSpacing: '0.4em', color: '#C4A35A', textTransform: 'uppercase', marginBottom: 32, textAlign: 'center', opacity: 0, transform: 'translateY(16px)' }}>
          On the Mat
        </div>

        <h2 ref={headRef} style={{ fontFamily: "'Anton', sans-serif", fontSize: 'clamp(2rem, 5vw, 4.5rem)', lineHeight: 1, color: '#EDE4D3', textAlign: 'center', marginBottom: 64, opacity: 0, transform: 'translateY(28px)' }}>
          The work<br />in progress.
        </h2>

        <style>{`
          #gallery-grid { grid-template-columns: repeat(3, 1fr); }
          @media (max-width: 640px) { #gallery-grid { grid-template-columns: 1fr; } }
        `}</style>
        <div id="gallery-grid" style={{ display: 'grid', gap: 20 }}>
          {images.map((img, i) => (
            <GalleryCard key={img.id} img={img} index={i} />
          ))}
        </div>

      </div>
    </section>
  );
}
