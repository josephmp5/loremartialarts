"use client";
import { useState, useEffect, useRef } from 'react';
import Navigation from './components/Navigation';
import ParticleCanvas from '@/components/ParticleCanvas';
import { supabase, getSiteAssetUrl } from '@/lib/supabase';
import { fetchSiteContent, getContent, ContentBySection } from '@/lib/content';

interface GalleryImage {
  id: string;
  title: string;
  description: string;
  image_url: string;
  display_order: number;
}

const locations = [
  {
    name: "Erdal İnönü Park",
    address: "Konyaaltı, Antalya",
    time: "Every Tuesday & Thursday — 20:00",
    features: ["Outdoor", "Park", "Free"],
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13876.319305870049!2d30.724678237779546!3d36.86152747044313!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39a96f66c21a3%3A0x5ab1804ecb60e6ac!2zUHJvZi4gRHIuIEVyZGFsIMSwbsO2bsO8IEtlbnQgUGFya8Wx!5e0!3m2!1str!2str!4v1758723843412!5m2!1str!2str",
  },
  {
    name: "Konyaaltı Beach",
    address: "Konyaaltı Sahili, Antalya",
    time: "Every Saturday — 20:00",
    features: ["Beach", "Ocean view", "Free"],
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5917.067834386882!2d30.619716250488217!3d36.84404483028264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3930b9036fa3b%3A0xbfcc82d429337e53!2sKonyaalt%C4%B1%20Plajlar!5e0!3m2!1str!2str!4v1758724463039!5m2!1str!2str",
  },
];

const MANIFESTO = [
  { line: "The mat does not care about your past.", sub: "Everyone starts at zero." },
  { line: "Technique outlasts strength.", sub: "It is the weapon of the patient." },
  { line: "Show up. Every time.", sub: "The belt is earned on the floor." },
];

export default function Home() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [siteContent, setSiteContent] = useState<ContentBySection>({});
  const [mProgress, setMProgress] = useState(0);
  const manifestoRef = useRef<HTMLElement>(null);

  useEffect(() => {
    fetchSiteContent().then(setSiteContent).catch(console.error);
    fetchGalleryImages();
  }, []);

  // Manifesto scroll progress
  useEffect(() => {
    const onScroll = () => {
      const el = manifestoRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      setMProgress(Math.max(0, Math.min(1, -rect.top / total)));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll reveal (IntersectionObserver)
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal-on-scroll');
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            (e.target as HTMLElement).classList.add('revealed');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [siteContent, galleryImages]);

  const fetchGalleryImages = async () => {
    if (!supabase) {
      setLoadingGallery(false);
      return;
    }
    try {
      const { data } = await supabase
        .from('training_gallery')
        .select('*')
        .eq('active', true)
        .order('display_order', { ascending: true });
      if (data) setGalleryImages(data);
    } catch (err) {
      console.error('Error fetching gallery:', err);
    } finally {
      setLoadingGallery(false);
    }
  };

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  // Manifesto opacity per statement
  const getManifestoOpacity = (i: number) => {
    const fadeW = 0.07;
    const start = i / 3;
    const end = (i + 1) / 3;
    const fadeIn = i === 0 ? 1 : Math.max(0, Math.min(1, (mProgress - start) / fadeW));
    const fadeOut = i === 2 ? 1 : Math.max(0, Math.min(1, (end - mProgress) / fadeW));
    return Math.max(0, Math.min(1, fadeIn * fadeOut));
  };

  const getManifestoY = (i: number) => {
    const fadeW = 0.07;
    const start = i / 3;
    const fadeIn = i === 0 ? 1 : Math.max(0, Math.min(1, (mProgress - start) / fadeW));
    return (1 - fadeIn) * 28;
  };

  return (
    <div className="page-container">
      {/* SEO hidden */}
      <div style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}>
        <h1>Antalya BJJ Training - Brazilian Jiu-Jitsu Classes in Antalya, Turkey</h1>
        <p>Join LORE BJJ for outdoor Brazilian Jiu-Jitsu training in Antalya at Erdal İnönü Park and Konyaaltı Beach.</p>
      </div>

      <Navigation />

      {/* ═══════════════════════════════════════
          HERO — particle canvas + LORE
      ═══════════════════════════════════════ */}
      <section
        style={{
          height: '100vh',
          position: 'relative',
          background: '#000',
          overflow: 'hidden',
        }}
      >
        {/* Particle canvas */}
        <ParticleCanvas />

        {/* Giant backdrop LORE text */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 0,
            pointerEvents: 'none',
            userSelect: 'none',
          }}
        >
          <span
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(160px, 28vw, 440px)',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.022)',
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
              display: 'block',
            }}
          >
            LORE
          </span>
        </div>

        {/* Hero content */}
        <div
          style={{
            position: 'absolute',
            bottom: '11vh',
            left: 0,
            right: 0,
            zIndex: 2,
            textAlign: 'center',
            padding: '0 clamp(24px, 6vw, 80px)',
            animation: 'fadeUp 1.1s cubic-bezier(0.22, 1, 0.36, 1) both',
            animationDelay: '0.6s',
          }}
        >
          <p
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.62rem',
              fontWeight: 500,
              letterSpacing: '0.32em',
              textTransform: 'uppercase',
              color: '#C4922A',
              marginBottom: '28px',
            }}
          >
            Antalya · Brazilian Jiu-Jitsu
          </p>

          <div style={{ marginBottom: '16px' }}>
            <img
              src={getSiteAssetUrl('logo.png')}
              alt="LORE BJJ"
              loading="eager"
              style={{
                maxWidth: 'clamp(180px, 26vw, 320px)',
                height: 'auto',
                display: 'block',
                margin: '0 auto',
                filter: 'brightness(0) invert(1)',
              }}
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
                const el = document.createElement('div');
                el.innerHTML =
                  '<span style="font-family:\'Cormorant Garamond\',serif;font-size:clamp(4rem,14vw,9rem);font-weight:700;color:#EDE9E0;line-height:0.9;letter-spacing:-0.02em;display:block;">LORE</span>';
                img.parentElement?.appendChild(el);
              }}
            />
          </div>

          <p
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(0.68rem, 1.4vw, 0.82rem)',
              fontWeight: 300,
              letterSpacing: '0.22em',
              color: 'rgba(237,233,224,0.35)',
              textTransform: 'uppercase',
              marginBottom: '52px',
            }}
          >
            Train · Grow · Belong
          </p>

          <button
            onClick={() => scrollTo('manifesto')}
            style={{
              background: 'none',
              border: '1px solid rgba(196,146,42,0.4)',
              color: '#C4922A',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.68rem',
              fontWeight: 500,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              padding: '12px 28px',
              cursor: 'pointer',
              transition: 'border-color 0.25s ease, color 0.25s ease, background 0.25s ease',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#C4922A';
              e.currentTarget.style.background = 'rgba(196,146,42,0.08)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'rgba(196,146,42,0.4)';
              e.currentTarget.style.background = 'none';
            }}
          >
            Discover
          </button>
        </div>

        {/* Scroll indicator */}
        <div
          style={{
            position: 'absolute',
            bottom: '0',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            animation: 'fadeIn 2s ease both',
            animationDelay: '2s',
          }}
        >
          <div
            style={{
              width: '1px',
              height: '56px',
              background: 'linear-gradient(to bottom, transparent, rgba(196,146,42,0.5))',
            }}
          />
        </div>
      </section>

      {/* ═══════════════════════════════════════
          MANIFESTO — pinned scroll
      ═══════════════════════════════════════ */}
      <section
        ref={manifestoRef}
        id="manifesto"
        style={{ height: '300vh', background: '#000', position: 'relative' }}
      >
        <div
          style={{
            position: 'sticky',
            top: 0,
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {/* Thin gold horizontal rule */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translateX(-50%) translateY(-50%)',
              width: '1px',
              height: '60px',
              background: 'linear-gradient(to bottom, transparent, rgba(196,146,42,0.15), transparent)',
              zIndex: 0,
            }}
          />

          {MANIFESTO.map(({ line, sub }, i) => {
            const opacity = getManifestoOpacity(i);
            const translateY = getManifestoY(i);
            return (
              <div
                key={i}
                style={{
                  position: 'absolute',
                  textAlign: 'center',
                  padding: '0 clamp(32px, 8vw, 120px)',
                  opacity,
                  transform: `translateY(${translateY}px)`,
                  transition: 'opacity 0.12s linear, transform 0.12s linear',
                  maxWidth: '900px',
                  width: '100%',
                  pointerEvents: opacity < 0.1 ? 'none' : 'auto',
                }}
              >
                <p
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(2rem, 5vw, 4.2rem)',
                    fontWeight: 300,
                    fontStyle: 'italic',
                    color: '#EDE9E0',
                    lineHeight: 1.2,
                    marginBottom: '20px',
                    letterSpacing: '-0.01em',
                  }}
                >
                  {line}
                </p>
                <p
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 'clamp(0.72rem, 1.5vw, 0.82rem)',
                    fontWeight: 300,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: 'rgba(196,146,42,0.7)',
                  }}
                >
                  {sub}
                </p>
              </div>
            );
          })}

          {/* Progress indicators */}
          <div
            style={{
              position: 'absolute',
              bottom: '48px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
            }}
          >
            {MANIFESTO.map((_, i) => {
              const active = mProgress >= i / 3 && mProgress < (i + 1) / 3;
              const past = mProgress >= (i + 1) / 3;
              return (
                <div
                  key={i}
                  style={{
                    width: active ? '20px' : '4px',
                    height: '1px',
                    background: active ? '#C4922A' : past ? 'rgba(196,146,42,0.4)' : 'rgba(255,255,255,0.15)',
                    transition: 'width 0.3s ease, background 0.3s ease',
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════ */}
      <section id="about" style={{ padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px)', background: '#0A0A0A' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            className="reveal-on-scroll"
            style={{
              maxWidth: '660px',
              marginBottom: 'clamp(64px, 10vw, 100px)',
              transitionDelay: '0s',
            }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.62rem',
                fontWeight: 500,
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: '#C4922A',
                marginBottom: '24px',
              }}
            >
              — Our History
            </span>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
                fontWeight: 600,
                color: '#EDE9E0',
                lineHeight: 1.06,
                marginBottom: '24px',
              }}
            >
              {getContent(siteContent, 'about', 'section_title') ||
                'The Art.\nThe Craft.\nThe Lineage.'}
            </h2>
            <p
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
                fontWeight: 300,
                color: '#8A857D',
                lineHeight: 1.85,
              }}
            >
              {getContent(siteContent, 'about', 'intro_text') ||
                'Brazilian Jiu-Jitsu is more than a martial art — it is a living language of leverage, patience, and problem-solving. At LORE, we carry that tradition forward on the open mats of Antalya.'}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1px',
              background: '#1A1A1A',
            }}
          >
            {[
              {
                num: '01',
                title: getContent(siteContent, 'about', 'philosophy_title') || 'Philosophy',
                body:
                  getContent(siteContent, 'about', 'philosophy_text') ||
                  'Jiu-jitsu teaches you to be comfortable in uncomfortable positions. That mindset extends far beyond the mat.',
                delay: '0s',
              },
              {
                num: '02',
                title: getContent(siteContent, 'about', 'training_title') || 'Training',
                body:
                  getContent(siteContent, 'about', 'training_text') ||
                  'We train outdoors — in parks, on beaches — because the art was born in open air. No walls. No limits.',
                delay: '0.12s',
              },
              {
                num: '03',
                title: getContent(siteContent, 'about', 'community_title') || 'Community',
                body:
                  getContent(siteContent, 'about', 'community_text') ||
                  'A team that rolls together, grows together. We welcome every level — first class to black belt.',
                delay: '0.24s',
              },
            ].map(({ num, title, body, delay }) => (
              <div
                key={num}
                className="reveal-on-scroll"
                style={{
                  background: '#0A0A0A',
                  padding: 'clamp(32px, 5vw, 56px)',
                  borderTop: '2px solid transparent',
                  transition:
                    'border-color 0.3s ease, opacity 0.9s cubic-bezier(0.22, 1, 0.36, 1), transform 0.9s cubic-bezier(0.22, 1, 0.36, 1)',
                  transitionDelay: delay,
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderTopColor = '#C4922A')}
                onMouseLeave={(e) => (e.currentTarget.style.borderTopColor = 'transparent')}
              >
                <span
                  style={{
                    display: 'block',
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '4rem',
                    fontWeight: 300,
                    color: '#C4922A',
                    lineHeight: 1,
                    marginBottom: '24px',
                    opacity: 0.45,
                  }}
                >
                  {num}
                </span>
                <h3
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(1.6rem, 3vw, 2.1rem)',
                    fontWeight: 600,
                    color: '#EDE9E0',
                    marginBottom: '16px',
                    lineHeight: 1.1,
                  }}
                >
                  {title}
                </h3>
                <p
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: 'clamp(0.88rem, 1.6vw, 0.95rem)',
                    fontWeight: 300,
                    color: '#8A857D',
                    lineHeight: 1.85,
                  }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          GALLERY
      ═══════════════════════════════════════ */}
      <section
        id="gallery"
        style={{
          padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px)',
          background: '#060606',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            className="reveal-on-scroll"
            style={{
              marginBottom: 'clamp(48px, 8vw, 80px)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
            }}
          >
            <div>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.62rem',
                  fontWeight: 500,
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase',
                  color: '#C4922A',
                  marginBottom: '18px',
                }}
              >
                — Training Moments
              </span>
              <h2
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
                  fontWeight: 600,
                  color: '#EDE9E0',
                  lineHeight: 1.06,
                  marginBottom: 0,
                }}
              >
                On the Mat. On the Shore.
              </h2>
            </div>
            <a
              href={getContent(siteContent, 'social', 'instagram_url') || 'https://www.instagram.com/loremartialarts/'}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Instagram
            </a>
          </div>

          {loadingGallery ? (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2px',
              }}
            >
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    height: '280px',
                    background: '#111',
                    animation: `fadeIn 0.4s ease ${i * 0.07}s both`,
                  }}
                />
              ))}
            </div>
          ) : galleryImages.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding: '80px 20px',
                borderTop: '1px solid #1A1A1A',
              }}
            >
              <p
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.95rem',
                  color: '#8A857D',
                }}
              >
                Gallery coming soon — check our Instagram for the latest.
              </p>
            </div>
          ) : (
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '2px',
              }}
            >
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  className="reveal-on-scroll"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    aspectRatio: '4/3',
                    background: '#111',
                    transitionDelay: `${(index % 3) * 0.1}s`,
                  }}
                  onMouseEnter={(e) => {
                    const overlay = e.currentTarget.querySelector<HTMLElement>('.g-overlay');
                    const img = e.currentTarget.querySelector<HTMLElement>('img');
                    if (overlay) overlay.style.opacity = '1';
                    if (img) img.style.transform = 'scale(1.06)';
                  }}
                  onMouseLeave={(e) => {
                    const overlay = e.currentTarget.querySelector<HTMLElement>('.g-overlay');
                    const img = e.currentTarget.querySelector<HTMLElement>('img');
                    if (overlay) overlay.style.opacity = '0';
                    if (img) img.style.transform = 'scale(1)';
                  }}
                >
                  <img
                    src={image.image_url}
                    alt={image.title}
                    loading="lazy"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      display: 'block',
                      transition: 'transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)',
                    }}
                  />
                  <div
                    className="g-overlay"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, transparent 50%)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'flex-end',
                      padding: '24px',
                      opacity: 0,
                      transition: 'opacity 0.35s ease',
                    }}
                  >
                    <h3
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: '1.25rem',
                        fontWeight: 600,
                        color: '#EDE9E0',
                        marginBottom: '4px',
                      }}
                    >
                      {image.title}
                    </h3>
                    {image.description && (
                      <p
                        style={{
                          fontFamily: 'Space Grotesk, sans-serif',
                          fontSize: '0.78rem',
                          color: '#8A857D',
                        }}
                      >
                        {image.description}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          YOUTUBE
      ═══════════════════════════════════════ */}
      <section id="youtube" style={{ padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px)', background: '#0A0A0A' }}>
        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div
            className="reveal-on-scroll"
            style={{ textAlign: 'center', marginBottom: '52px' }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.62rem',
                fontWeight: 500,
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: '#C4922A',
                marginBottom: '18px',
              }}
            >
              — Follow Our Journey
            </span>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.2rem, 5vw, 3.4rem)',
                fontWeight: 600,
                color: '#EDE9E0',
                lineHeight: 1.06,
                marginBottom: '16px',
              }}
            >
              {getContent(siteContent, 'youtube', 'section_title') || 'Latest Vlog'}
            </h2>
            <p
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(0.88rem, 1.8vw, 0.96rem)',
                fontWeight: 300,
                color: '#8A857D',
                lineHeight: 1.8,
                maxWidth: '480px',
                margin: '0 auto',
              }}
            >
              {getContent(siteContent, 'youtube', 'subtitle') || 'Watch us train in the open air, travel to camps, and build the community.'}
            </p>
          </div>

          {(() => {
            const videoId = getContent(siteContent, 'youtube', 'video_id') || 'PoCnx58dYZk';
            const instagramUrl = getContent(siteContent, 'social', 'instagram_url') || 'https://www.instagram.com/loremartialarts/';
            return (
              <>
                <div
                  className="reveal-on-scroll"
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    marginBottom: '32px',
                    border: '1px solid #1A1A1A',
                  }}
                >
                  <img
                    src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
                    alt="Latest vlog thumbnail"
                    loading="lazy"
                    style={{ width: '100%', display: 'block', objectFit: 'cover' }}
                  />
                </div>

                <div style={{ textAlign: 'center', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                  <a
                    href={`https://www.youtube.com/watch?v=${videoId}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-gold"
                  >
                    Watch Latest Vlog
                  </a>
                  <a
                    href={instagramUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-outline"
                  >
                    Instagram
                  </a>
                </div>
              </>
            );
          })()}
        </div>
      </section>

      {/* ═══════════════════════════════════════
          LOCATIONS
      ═══════════════════════════════════════ */}
      <section
        id="locations"
        style={{ padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px)', background: '#060606' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            className="reveal-on-scroll"
            style={{ marginBottom: 'clamp(48px, 8vw, 80px)' }}
          >
            <span
              style={{
                display: 'block',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.62rem',
                fontWeight: 500,
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: '#C4922A',
                marginBottom: '18px',
              }}
            >
              — Where We Train
            </span>
            <h2
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.6rem, 6vw, 4.5rem)',
                fontWeight: 600,
                color: '#EDE9E0',
                lineHeight: 1.06,
                marginBottom: '20px',
              }}
            >
              {getContent(siteContent, 'locations', 'section_title') || 'Training Grounds'}
            </h2>
            <p
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(0.9rem, 1.8vw, 1rem)',
                fontWeight: 300,
                color: '#8A857D',
                maxWidth: '520px',
                lineHeight: 1.85,
              }}
            >
              {getContent(siteContent, 'locations', 'subtitle') ||
                "We take the mat to Antalya's most iconic outdoor spaces. No gym fees. Just jiu-jitsu."}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
              gap: '2px',
            }}
          >
            {locations.map((loc, index) => (
              <div
                key={index}
                className="reveal-on-scroll"
                style={{
                  background: '#0A0A0A',
                  borderTop: '2px solid #C4922A',
                  padding: 'clamp(28px, 4vw, 48px)',
                  transitionDelay: `${index * 0.1}s`,
                }}
              >
                <h3
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: 'clamp(1.8rem, 3.5vw, 2.5rem)',
                    fontWeight: 600,
                    color: '#EDE9E0',
                    marginBottom: '8px',
                    lineHeight: 1.1,
                  }}
                >
                  {loc.name}
                </h3>
                <p
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '0.8rem',
                    color: '#8A857D',
                    letterSpacing: '0.04em',
                    marginBottom: '24px',
                  }}
                >
                  {loc.address}
                </p>

                <div
                  style={{
                    paddingTop: '20px',
                    borderTop: '1px solid #1A1A1A',
                    marginBottom: '24px',
                  }}
                >
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '0.6rem',
                      fontWeight: 500,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#3A3530',
                      marginBottom: '8px',
                    }}
                  >
                    Schedule
                  </span>
                  <p
                    style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '0.9rem',
                      color: '#EDE9E0',
                    }}
                  >
                    {loc.time}
                  </p>
                </div>

                <div
                  style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}
                >
                  {loc.features.map((f) => (
                    <span
                      key={f}
                      style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '0.68rem',
                        fontWeight: 400,
                        letterSpacing: '0.08em',
                        color: '#C4922A',
                        background: 'rgba(196,146,42,0.07)',
                        border: '1px solid rgba(196,146,42,0.18)',
                        padding: '4px 12px',
                      }}
                    >
                      {f}
                    </span>
                  ))}
                </div>

                <div style={{ overflow: 'hidden', border: '1px solid #1A1A1A' }}>
                  <iframe
                    src={loc.mapEmbed}
                    width="100%"
                    height="240"
                    style={{
                      border: 0,
                      display: 'block',
                      filter: 'grayscale(40%) contrast(1.1) brightness(0.7)',
                    }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT / FOOTER
      ═══════════════════════════════════════ */}
      <section
        id="contact"
        style={{
          padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px) clamp(48px, 6vw, 72px)',
          background: '#060606',
          borderTop: '1px solid #141414',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
              gap: 'clamp(48px, 8vw, 80px)',
              marginBottom: 'clamp(60px, 8vw, 80px)',
            }}
          >
            {/* Brand */}
            <div className="reveal-on-scroll">
              <h2
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                  fontWeight: 600,
                  color: '#EDE9E0',
                  lineHeight: 1.0,
                  marginBottom: '10px',
                }}
              >
                LORE BJJ
              </h2>
              <p
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.65rem',
                  fontWeight: 400,
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#C4922A',
                  marginBottom: '20px',
                }}
              >
                Antalya, Turkey
              </p>
              <p
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'clamp(0.88rem, 1.6vw, 0.95rem)',
                  fontWeight: 300,
                  color: '#8A857D',
                  lineHeight: 1.85,
                  maxWidth: '300px',
                }}
              >
                {getContent(siteContent, 'contact', 'main_text') ||
                  'Open mats, open minds. Come train with us — no experience needed, just the will to learn.'}
              </p>
            </div>

            {/* Contact */}
            <div className="reveal-on-scroll" style={{ transitionDelay: '0.1s' }}>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.6rem',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#3A3530',
                  marginBottom: '24px',
                }}
              >
                Contact
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                {[
                  { label: 'Phone', href: 'tel:05069770077', text: '0506 977 00 77' },
                  { label: 'Email', href: 'mailto:contact@lorebjj.com', text: 'contact@lorebjj.com' },
                  {
                    label: 'Instagram',
                    href: 'https://www.instagram.com/loremartialarts/',
                    text: '@loremartialarts',
                  },
                ].map(({ label, href, text }) => (
                  <div key={label}>
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '0.6rem',
                        letterSpacing: '0.16em',
                        textTransform: 'uppercase',
                        color: '#3A3530',
                        marginBottom: '4px',
                      }}
                    >
                      {label}
                    </span>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '0.9rem',
                        fontWeight: 400,
                        color: '#EDE9E0',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#C4922A')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = '#EDE9E0')}
                    >
                      {text}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div
              className="reveal-on-scroll"
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-start',
                transitionDelay: '0.2s',
              }}
            >
              <span
                style={{
                  display: 'block',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.6rem',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#3A3530',
                  marginBottom: '20px',
                }}
              >
                Get Started
              </span>
              <p
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'clamp(0.88rem, 1.6vw, 0.95rem)',
                  fontWeight: 300,
                  color: '#8A857D',
                  lineHeight: 1.85,
                  marginBottom: '28px',
                }}
              >
                Show up to any session. The first class is always free. Gi or no-gi, beginner or
                experienced — you are welcome.
              </p>
              <a
                href="https://wa.me/905069770077"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-gold"
                style={{ alignSelf: 'flex-start' }}
              >
                Message on WhatsApp
              </a>
            </div>
          </div>

          {/* Footer bar */}
          <div
            style={{
              borderTop: '1px solid #141414',
              paddingTop: '28px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '12px',
            }}
          >
            <p
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.7rem',
                color: '#3A3530',
              }}
            >
              © {new Date().getFullYear()} LORE BJJ · Antalya, Turkey
            </p>
            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '0.92rem',
                fontStyle: 'italic',
                color: '#3A3530',
              }}
            >
              The art lives on the mat.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
