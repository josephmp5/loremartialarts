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
    time: "Tuesday & Thursday — 20:00",
    features: ["Outdoor", "Park", "Free"],
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13876.319305870049!2d30.724678237779546!3d36.86152747044313!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39a96f66c21a3%3A0x5ab1804ecb60e6ac!2zUHJvZi4gRHIuIEVyZGFsIMSwbsO2bsO8IEtlbnQgUGFya8Wx!5e0!3m2!1str!2str!4v1758723843412!5m2!1str!2str",
  },
  {
    name: "Konyaaltı Beach",
    address: "Konyaaltı Sahili, Antalya",
    time: "Saturday — 20:00",
    features: ["Beach", "Ocean view", "Free"],
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5917.067834386882!2d30.619716250488217!3d36.84404483028264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3930b9036fa3b%3A0xbfcc82d429337e53!2sKonyaalt%C4%B1%20Plajlar!5e0!3m2!1str!2str!4v1758724463039!5m2!1str!2str",
  },
];

const MANIFESTO = [
  { line: "The mat does not\ncare about your past.", sub: "Everyone starts at zero." },
  { line: "Technique\noutlasts strength.", sub: "It is the weapon of the patient." },
  { line: "Show up.\nEvery time.", sub: "The belt is earned on the floor." },
];

const MARQUEE_ITEMS = [
  "Antalya BJJ", "×", "Outdoor Training", "×", "Free Sessions", "×",
  "Konyaaltı Beach", "×", "Erdal İnönü Park", "×", "All Levels Welcome", "×",
  "Gi & No-Gi", "×", "Since 2020", "×",
];

// ─── Animated stat counter ───────────────────────────────────────────────────
function AnimatedStat({
  target,
  suffix = '',
  label,
  isText = false,
  textValue = '',
}: {
  target?: number;
  suffix?: string;
  label: string;
  isText?: boolean;
  textValue?: string;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isText || !target) return;
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        obs.disconnect();
        const s = performance.now();
        const dur = 1700;
        const tick = (now: number) => {
          const t = Math.min(1, (now - s) / dur);
          const ease = 1 - Math.pow(1 - t, 3);
          setCount(Math.round(target * ease));
          if (t < 1) requestAnimationFrame(tick);
          else setCount(target);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [target, isText]);

  return (
    <div
      ref={ref}
      style={{
        flex: 1,
        textAlign: 'center',
        padding: 'clamp(40px, 6vw, 64px) clamp(16px, 3vw, 40px)',
        borderRight: '1px solid #141414',
        minWidth: '120px',
      }}
    >
      <div
        style={{
          fontFamily: 'Cormorant Garamond, serif',
          fontSize: 'clamp(3rem, 7vw, 5.5rem)',
          fontWeight: 300,
          color: '#EDE9E0',
          lineHeight: 1,
          marginBottom: '10px',
          letterSpacing: '-0.02em',
        }}
      >
        {isText ? textValue : `${count}${suffix}`}
      </div>
      <div
        style={{
          fontFamily: 'Space Grotesk, sans-serif',
          fontSize: '0.58rem',
          fontWeight: 500,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: '#C4922A',
        }}
      >
        {label}
      </div>
    </div>
  );
}
// ─────────────────────────────────────────────────────────────────────────────

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

  // Manifesto scroll — cosine crossfade, always something visible
  useEffect(() => {
    // Use absolute document position so it's not affected by CSS stacking
    let sectionDocTop = 0;
    let sectionScrollLength = 0;

    const measure = () => {
      const el = manifestoRef.current;
      if (!el) return;
      sectionDocTop = el.getBoundingClientRect().top + window.scrollY;
      sectionScrollLength = el.offsetHeight - window.innerHeight;
    };

    const onScroll = () => {
      if (sectionScrollLength <= 0) { measure(); return; }
      const p = (window.scrollY - sectionDocTop) / sectionScrollLength;
      setMProgress(Math.max(0, Math.min(1, p)));
    };

    measure();
    onScroll(); // initialise on mount
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
    };
  }, []);

  // Scroll reveal (IntersectionObserver)
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.reveal-on-scroll');
    if (!els.length) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('revealed');
            obs.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [siteContent, galleryImages]);

  const fetchGalleryImages = async () => {
    if (!supabase) { setLoadingGallery(false); return; }
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

  // Cosine crossfade — always something visible, no gaps between statements
  // 350vh section = 250vh effective scroll. centers spread across 0→1 with wide hw.
  const mOpacity = (i: number) => {
    const centers = [0, 0.5, 1.0];
    const hw = 0.42; // wide overlap = no empty space between statements
    const dist = Math.abs(mProgress - centers[i]);
    if (dist >= hw) return 0;
    return (Math.cos((dist / hw) * Math.PI) + 1) / 2;
  };

  const mY = (i: number) => {
    const centers = [0, 0.5, 1.0];
    return Math.max(-24, Math.min(24, (mProgress - centers[i]) * -28));
  };

  const videoId = getContent(siteContent, 'youtube', 'video_id') || 'PoCnx58dYZk';
  const instagramUrl = getContent(siteContent, 'social', 'instagram_url') || 'https://www.instagram.com/loremartialarts/';

  return (
    <div className="page-container">
      {/* SEO */}
      <div style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}>
        <h1>Antalya BJJ Training — Brazilian Jiu-Jitsu in Antalya, Turkey</h1>
        <p>LORE BJJ — free outdoor Brazilian Jiu-Jitsu at Erdal İnönü Park and Konyaaltı Beach.</p>
      </div>

      <Navigation />

      {/* ════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════ */}
      <section
        style={{
          height: '100vh',
          position: 'relative',
          background: '#000',
          overflow: 'hidden',
        }}
      >
        <ParticleCanvas />

        {/* Giant ghost text — gives depth to the particles */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            userSelect: 'none',
            zIndex: 0,
          }}
        >
          <span
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(160px, 30vw, 500px)',
              fontWeight: 700,
              color: 'rgba(255,255,255,0.02)',
              lineHeight: 0.85,
              letterSpacing: '-0.04em',
            }}
          >
            LORE
          </span>
        </div>

        {/* Hero content — bottom of viewport */}
        <div
          style={{
            position: 'absolute',
            bottom: '72px',
            left: 0,
            right: 0,
            zIndex: 2,
            textAlign: 'center',
            padding: '0 clamp(24px, 6vw, 80px)',
            animation: 'fadeUp 1.2s cubic-bezier(0.22,1,0.36,1) both',
            animationDelay: '0.5s',
          }}
        >
          <p
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.6rem',
              fontWeight: 500,
              letterSpacing: '0.34em',
              textTransform: 'uppercase',
              color: '#C4922A',
              marginBottom: '24px',
            }}
          >
            Antalya · Brazilian Jiu-Jitsu
          </p>

          <div style={{ marginBottom: '20px' }}>
            <img
              src={getSiteAssetUrl('logo.png')}
              alt="LORE BJJ"
              loading="eager"
              style={{ maxWidth: 'clamp(160px, 22vw, 300px)', height: 'auto', display: 'block', margin: '0 auto', filter: 'brightness(0) invert(1)' }}
              onError={(e) => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
                const el = document.createElement('div');
                el.innerHTML = '<span style="font-family:\'Cormorant Garamond\',serif;font-size:clamp(4rem,12vw,8rem);font-weight:700;color:#EDE9E0;line-height:0.9;letter-spacing:-0.02em;display:block;">LORE</span>';
                img.parentElement?.appendChild(el);
              }}
            />
          </div>

          <p
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(0.65rem, 1.3vw, 0.78rem)',
              fontWeight: 300,
              letterSpacing: '0.22em',
              color: 'rgba(237,233,224,0.3)',
              textTransform: 'uppercase',
            }}
          >
            Train · Grow · Belong
          </p>
        </div>

        {/* Scroll line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 2,
            animation: 'fadeIn 2.5s ease both',
            animationDelay: '2s',
          }}
        >
          <div style={{ width: '1px', height: '48px', background: 'linear-gradient(to bottom, transparent, rgba(196,146,42,0.45))' }} />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          MARQUEE STRIP
      ════════════════════════════════════════════ */}
      <div
        style={{
          background: '#000',
          borderTop: '1px solid rgba(255,255,255,0.05)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
          overflow: 'hidden',
          padding: '13px 0',
        }}
      >
        <div className="marquee-track">
          {[0, 1].map((rep) => (
            <span key={rep} style={{ display: 'inline-flex', whiteSpace: 'nowrap' }}>
              {MARQUEE_ITEMS.map((text, i) => (
                <span
                  key={i}
                  style={{
                    padding: '0 clamp(14px, 2vw, 24px)',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '0.6rem',
                    fontWeight: 400,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: text === '×' ? '#C4922A' : 'rgba(237,233,224,0.22)',
                  }}
                >
                  {text}
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      {/* ════════════════════════════════════════════
          MANIFESTO — 350vh pinned, cosine crossfade
      ════════════════════════════════════════════ */}
      <section
        ref={manifestoRef}
        style={{ height: '350vh', background: '#000', position: 'relative' }}
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
          {/* Large background number */}
          {MANIFESTO.map((_, i) => (
            <span
              key={`num-${i}`}
              aria-hidden="true"
              style={{
                position: 'absolute',
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(160px, 30vw, 380px)',
                fontWeight: 700,
                color: 'rgba(196,146,42,0.04)',
                lineHeight: 1,
                letterSpacing: '-0.05em',
                userSelect: 'none',
                pointerEvents: 'none',
                opacity: mOpacity(i),
                transition: 'opacity 0.1s linear',
              }}
            >
              0{i + 1}
            </span>
          ))}

          {/* Statement text */}
          {MANIFESTO.map(({ line, sub }, i) => (
            <div
              key={i}
              style={{
                position: 'absolute',
                textAlign: 'center',
                padding: '0 clamp(32px, 8vw, 120px)',
                maxWidth: '860px',
                width: '100%',
                opacity: mOpacity(i),
                transform: `translateY(${mY(i)}px)`,
                transition: 'opacity 0.08s linear, transform 0.08s linear',
                pointerEvents: mOpacity(i) < 0.05 ? 'none' : 'auto',
              }}
            >
              <p
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(2.2rem, 5.5vw, 4.8rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: '#EDE9E0',
                  lineHeight: 1.15,
                  marginBottom: '24px',
                  whiteSpace: 'pre-line',
                  letterSpacing: '-0.01em',
                }}
              >
                {line}
              </p>
              <p
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: 'clamp(0.68rem, 1.4vw, 0.78rem)',
                  fontWeight: 300,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: 'rgba(196,146,42,0.65)',
                }}
              >
                {sub}
              </p>
            </div>
          ))}

          {/* Progress dashes */}
          <div
            style={{
              position: 'absolute',
              bottom: '52px',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              gap: '8px',
              alignItems: 'center',
            }}
          >
            {MANIFESTO.map((_, i) => {
              const op = mOpacity(i);
              const active = op > 0.5;
              return (
                <div
                  key={i}
                  style={{
                    height: '1px',
                    width: active ? '24px' : '6px',
                    background: active ? '#C4922A' : 'rgba(255,255,255,0.15)',
                    transition: 'width 0.3s ease, background 0.3s ease',
                  }}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          STATS
      ════════════════════════════════════════════ */}
      <section
        style={{
          background: '#060606',
          borderTop: '1px solid #141414',
          borderBottom: '1px solid #141414',
          overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
          <AnimatedStat target={3}   suffix="+"  label="Years Active" />
          <AnimatedStat target={2}         label="Locations" />
          <AnimatedStat target={150} suffix="+"  label="Practitioners" />
          <AnimatedStat isText textValue="Free" label="Forever" />
        </div>
      </section>

      {/* ════════════════════════════════════════════
          ABOUT — editorial two-column
      ════════════════════════════════════════════ */}
      <section
        id="about"
        style={{
          padding: 'clamp(100px, 14vw, 160px) clamp(24px, 6vw, 80px)',
          background: '#0A0A0A',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        {/* Background watermark */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            right: '-0.05em',
            top: '50%',
            transform: 'translateY(-50%)',
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(120px, 22vw, 320px)',
            fontWeight: 700,
            color: 'rgba(196,146,42,0.03)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            userSelect: 'none',
            pointerEvents: 'none',
          }}
        >
          LORE
        </span>

        <div
          style={{
            maxWidth: '1200px',
            margin: '0 auto',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 0.9fr)',
            gap: 'clamp(48px, 8vw, 100px)',
            alignItems: 'start',
          }}
        >
          {/* Left — big quote */}
          <div className="reveal-on-scroll">
            <span
              style={{
                display: 'block',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.6rem',
                fontWeight: 500,
                letterSpacing: '0.26em',
                textTransform: 'uppercase',
                color: '#C4922A',
                marginBottom: '32px',
              }}
            >
              — Our History
            </span>
            <blockquote
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.4rem, 5.5vw, 4.2rem)',
                fontWeight: 300,
                fontStyle: 'italic',
                color: '#EDE9E0',
                lineHeight: 1.18,
                margin: '0 0 36px',
                letterSpacing: '-0.01em',
              }}
            >
              {getContent(siteContent, 'about', 'section_title') ||
                '"Every roll is a\nconversation.\nThe mat never lies."'}
            </blockquote>
            <p
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(0.88rem, 1.7vw, 0.98rem)',
                fontWeight: 300,
                color: '#8A857D',
                lineHeight: 1.9,
                maxWidth: '480px',
              }}
            >
              {getContent(siteContent, 'about', 'intro_text') ||
                'Brazilian Jiu-Jitsu is a living language of leverage, patience, and problem-solving. At LORE, we carry that tradition forward on the open mats of Antalya.'}
            </p>
          </div>

          {/* Right — three pillars */}
          <div style={{ paddingTop: 'clamp(0px, 4vw, 60px)' }}>
            {[
              {
                num: '01',
                title: getContent(siteContent, 'about', 'philosophy_title') || 'Philosophy',
                body: getContent(siteContent, 'about', 'philosophy_text') || 'Jiu-jitsu teaches you to be comfortable in uncomfortable positions — a lesson that extends far beyond the mat.',
                delay: '0.05s',
              },
              {
                num: '02',
                title: getContent(siteContent, 'about', 'training_title') || 'Training',
                body: getContent(siteContent, 'about', 'training_text') || 'We train outdoors — in parks, on beaches — because the art was born in open air. No walls. No ceiling.',
                delay: '0.18s',
              },
              {
                num: '03',
                title: getContent(siteContent, 'about', 'community_title') || 'Community',
                body: getContent(siteContent, 'about', 'community_text') || 'A team that rolls together grows together. White belt to black belt — every level is welcome.',
                delay: '0.31s',
              },
            ].map(({ num, title, body, delay }) => (
              <div
                key={num}
                className="reveal-on-scroll"
                style={{
                  borderTop: '1px solid #1A1A1A',
                  padding: 'clamp(24px, 3.5vw, 36px) 0',
                  transitionDelay: delay,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: '20px',
                    alignItems: 'flex-start',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1rem',
                      fontWeight: 400,
                      color: '#C4922A',
                      opacity: 0.5,
                      flexShrink: 0,
                      paddingTop: '4px',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {num}
                  </span>
                  <div>
                    <h3
                      style={{
                        fontFamily: 'Cormorant Garamond, serif',
                        fontSize: 'clamp(1.4rem, 2.5vw, 1.8rem)',
                        fontWeight: 600,
                        color: '#EDE9E0',
                        marginBottom: '10px',
                        lineHeight: 1.1,
                      }}
                    >
                      {title}
                    </h3>
                    <p
                      style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: 'clamp(0.84rem, 1.5vw, 0.92rem)',
                        fontWeight: 300,
                        color: '#8A857D',
                        lineHeight: 1.85,
                      }}
                    >
                      {body}
                    </p>
                  </div>
                </div>
              </div>
            ))}
            <div style={{ borderTop: '1px solid #1A1A1A' }} />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          GALLERY — auto-scrolling filmstrip
      ════════════════════════════════════════════ */}
      {!loadingGallery && galleryImages.length > 0 && (
        <section id="gallery" style={{ background: '#060606', paddingBottom: 0, overflow: 'hidden' }}>
          {/* Section label */}
          <div
            className="reveal-on-scroll"
            style={{
              padding: 'clamp(64px, 8vw, 100px) clamp(24px, 6vw, 80px) clamp(36px, 5vw, 52px)',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '20px',
              maxWidth: '1200px',
              margin: '0 auto',
            }}
          >
            <div>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.6rem',
                  fontWeight: 500,
                  letterSpacing: '0.26em',
                  textTransform: 'uppercase',
                  color: '#C4922A',
                  marginBottom: '16px',
                }}
              >
                — Training Moments
              </span>
              <h2
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
                  fontWeight: 600,
                  color: '#EDE9E0',
                  lineHeight: 1.06,
                }}
              >
                On the Mat. On the Shore.
              </h2>
            </div>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
              Instagram
            </a>
          </div>

          {/* Filmstrip */}
          <div style={{ overflow: 'hidden' }}>
            <div className="filmstrip-track">
              {[...galleryImages, ...galleryImages].map((img, i) => (
                <div
                  key={i}
                  style={{
                    width: 'clamp(260px, 32vw, 440px)',
                    height: 'clamp(220px, 28vw, 380px)',
                    flexShrink: 0,
                    marginRight: '2px',
                    overflow: 'hidden',
                  }}
                >
                  <img
                    src={img.image_url}
                    alt={img.title}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ════════════════════════════════════════════
          YOUTUBE
      ════════════════════════════════════════════ */}
      <section
        id="youtube"
        style={{ padding: 'clamp(100px, 14vw, 160px) clamp(24px, 6vw, 80px)', background: '#0A0A0A' }}
      >
        <div style={{ maxWidth: '760px', margin: '0 auto' }}>
          <div className="reveal-on-scroll" style={{ textAlign: 'center', marginBottom: '52px' }}>
            <span
              style={{
                display: 'block',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.6rem',
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
                fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
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
                fontSize: 'clamp(0.88rem, 1.7vw, 0.96rem)',
                fontWeight: 300,
                color: '#8A857D',
                lineHeight: 1.85,
                maxWidth: '440px',
                margin: '0 auto',
              }}
            >
              {getContent(siteContent, 'youtube', 'subtitle') || 'Training, travel, and life on the mat.'}
            </p>
          </div>

          <div
            className="reveal-on-scroll"
            style={{ marginBottom: '28px', border: '1px solid #141414', overflow: 'hidden' }}
          >
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              alt="Latest vlog"
              loading="lazy"
              style={{ width: '100%', display: 'block' }}
            />
          </div>

          <div style={{ textAlign: 'center', display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href={`https://www.youtube.com/watch?v=${videoId}`} target="_blank" rel="noopener noreferrer" className="btn-gold">
              Watch Latest Vlog
            </a>
            <a href={instagramUrl} target="_blank" rel="noopener noreferrer" className="btn-outline">
              Instagram
            </a>
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          LOCATIONS
      ════════════════════════════════════════════ */}
      <section
        id="locations"
        style={{ padding: 'clamp(100px, 14vw, 160px) clamp(24px, 6vw, 80px)', background: '#060606' }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div className="reveal-on-scroll" style={{ marginBottom: 'clamp(48px, 8vw, 80px)' }}>
            <span
              style={{
                display: 'block',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.6rem',
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
                fontSize: 'clamp(2.6rem, 6vw, 4.8rem)',
                fontWeight: 600,
                color: '#EDE9E0',
                lineHeight: 1.06,
                marginBottom: '18px',
              }}
            >
              {getContent(siteContent, 'locations', 'section_title') || 'Training Grounds'}
            </h2>
            <p
              style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: 'clamp(0.88rem, 1.7vw, 0.98rem)',
                fontWeight: 300,
                color: '#8A857D',
                maxWidth: '480px',
                lineHeight: 1.85,
              }}
            >
              {getContent(siteContent, 'locations', 'subtitle') ||
                "Antalya's most iconic outdoor spaces. No gym fees. Just jiu-jitsu."}
            </p>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
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
                    marginBottom: '6px',
                    lineHeight: 1.1,
                  }}
                >
                  {loc.name}
                </h3>
                <p
                  style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '0.78rem',
                    color: '#8A857D',
                    letterSpacing: '0.04em',
                    marginBottom: '24px',
                  }}
                >
                  {loc.address}
                </p>

                <div style={{ paddingTop: '18px', borderTop: '1px solid #1A1A1A', marginBottom: '22px' }}>
                  <span
                    style={{
                      display: 'block',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '0.58rem',
                      fontWeight: 500,
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color: '#3A3530',
                      marginBottom: '8px',
                    }}
                  >
                    Schedule
                  </span>
                  <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.9rem', color: '#EDE9E0' }}>
                    {loc.time}
                  </p>
                </div>

                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginBottom: '24px' }}>
                  {loc.features.map((f) => (
                    <span
                      key={f}
                      style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '0.65rem',
                        color: '#C4922A',
                        background: 'rgba(196,146,42,0.07)',
                        border: '1px solid rgba(196,146,42,0.16)',
                        padding: '4px 10px',
                        letterSpacing: '0.06em',
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
                    height="230"
                    style={{ border: 0, display: 'block', filter: 'grayscale(50%) contrast(1.1) brightness(0.65)' }}
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

      {/* ════════════════════════════════════════════
          JOIN — full-screen CTA
      ════════════════════════════════════════════ */}
      <section
        id="join"
        style={{
          minHeight: '100vh',
          background: '#000',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          overflow: 'hidden',
          padding: 'clamp(80px, 12vw, 120px) clamp(24px, 6vw, 80px)',
        }}
      >
        {/* Background watermark */}
        <span
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '-0.15em',
            left: '50%',
            transform: 'translateX(-50%)',
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(120px, 24vw, 400px)',
            fontWeight: 700,
            color: 'rgba(196,146,42,0.03)',
            lineHeight: 1,
            letterSpacing: '-0.04em',
            userSelect: 'none',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}
        >
          LORE
        </span>

        <div
          className="reveal-on-scroll"
          style={{
            textAlign: 'center',
            position: 'relative',
            zIndex: 1,
            maxWidth: '800px',
          }}
        >
          <span
            style={{
              display: 'block',
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.6rem',
              fontWeight: 500,
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: '#C4922A',
              marginBottom: '36px',
            }}
          >
            Antalya · Brazilian Jiu-Jitsu · Free Training
          </span>

          <h2
            style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: 'clamp(3.5rem, 11vw, 9rem)',
              fontWeight: 300,
              color: '#EDE9E0',
              lineHeight: 0.95,
              letterSpacing: '-0.02em',
              marginBottom: '48px',
              whiteSpace: 'pre-line',
            }}
          >
            {'Ready\nto roll?'}
          </h2>

          <p
            style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)',
              fontWeight: 300,
              color: '#8A857D',
              lineHeight: 1.85,
              maxWidth: '420px',
              margin: '0 auto 52px',
            }}
          >
            {getContent(siteContent, 'contact', 'main_text') ||
              'Show up to any session. No experience needed — just the will to learn. The first class is always free.'}
          </p>

          <a
            href={instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-gold"
            style={{ fontSize: '0.78rem', padding: '16px 40px' }}
          >
            DM us on Instagram
          </a>
        </div>
      </section>

      {/* ════════════════════════════════════════════
          FOOTER
      ════════════════════════════════════════════ */}
      <footer
        id="contact"
        style={{
          background: '#060606',
          borderTop: '1px solid #141414',
          padding: 'clamp(48px, 7vw, 80px) clamp(24px, 6vw, 80px) clamp(32px, 4vw, 48px)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: 'clamp(36px, 6vw, 60px)',
              marginBottom: 'clamp(40px, 6vw, 60px)',
            }}
          >
            {/* Brand */}
            <div>
              <h3
                style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(2rem, 4vw, 2.8rem)',
                  fontWeight: 600,
                  color: '#EDE9E0',
                  lineHeight: 1,
                  marginBottom: '8px',
                }}
              >
                LORE BJJ
              </h3>
              <p
                style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.62rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color: '#C4922A',
                }}
              >
                Antalya, Turkey
              </p>
            </div>

            {/* Contact */}
            <div>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.58rem',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#3A3530',
                  marginBottom: '20px',
                }}
              >
                Contact
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {[
                  { label: 'Instagram', href: instagramUrl, text: '@loremartialarts' },
                ].map(({ label, href, text }) => (
                  <div key={label}>
                    <span
                      style={{
                        display: 'block',
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '0.58rem',
                        letterSpacing: '0.14em',
                        textTransform: 'uppercase',
                        color: '#3A3530',
                        marginBottom: '3px',
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
                        fontSize: '0.88rem',
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

            {/* Sessions */}
            <div>
              <span
                style={{
                  display: 'block',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.58rem',
                  fontWeight: 500,
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#3A3530',
                  marginBottom: '20px',
                }}
              >
                Sessions
              </span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {locations.map((loc) => (
                  <div key={loc.name}>
                    <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.82rem', color: '#EDE9E0', marginBottom: '2px' }}>
                      {loc.name}
                    </p>
                    <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.72rem', color: '#8A857D' }}>
                      {loc.time}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Footer bar */}
          <div
            style={{
              borderTop: '1px solid #141414',
              paddingTop: '24px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '10px',
            }}
          >
            <p style={{ fontFamily: 'Space Grotesk, sans-serif', fontSize: '0.68rem', color: '#3A3530' }}>
              © {new Date().getFullYear()} LORE BJJ · Antalya, Turkey
            </p>
            <p
              style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: '0.9rem',
                fontStyle: 'italic',
                color: '#3A3530',
              }}
            >
              The art lives on the mat.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
