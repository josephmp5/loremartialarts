"use client";
import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
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
    features: ["Outdoor", "Park environment", "Free"],
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d13876.319305870049!2d30.724678237779546!3d36.86152747044313!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39a96f66c21a3%3A0x5ab1804ecb60e6ac!2zUHJvZi4gRHIuIEVyZGFsIMSwbsO2bsO8IEtlbnQgUGFya8Sx!5e0!3m2!1str!2str!4v1758723843412!5m2!1str!2str",
  },
  {
    name: "Konyaaltı Beach",
    address: "Konyaaltı Sahili, Antalya",
    time: "Every Saturday — 20:00",
    features: ["Beach", "Ocean view", "Free"],
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5917.067834386882!2d30.619716250488217!3d36.84404483028264!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c3930b9036fa3b%3A0xbfcc82d429337e53!2sKonyaalt%C4%B1%20Plajlar!5e0!3m2!1str!2str!4v1758724463039!5m2!1str!2str",
  },
];

export default function Home() {
  const [galleryImages, setGalleryImages] = useState<GalleryImage[]>([]);
  const [loadingGallery, setLoadingGallery] = useState(true);
  const [siteContent, setSiteContent] = useState<ContentBySection>({});

  useEffect(() => {
    fetchSiteContent().then(setSiteContent).catch(console.error);
    fetchGalleryImages();
  }, []);

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

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  /* ─── inline style helpers ─── */
  const S = {
    section: (bg = 'transparent'): React.CSSProperties => ({
      padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px)',
      background: bg,
      position: 'relative',
      width: '100%',
    }),
    container: (): React.CSSProperties => ({
      maxWidth: '1200px',
      margin: '0 auto',
    }),
    sectionLabel: (): React.CSSProperties => ({
      display: 'block',
      fontFamily: 'Space Grotesk, sans-serif',
      fontSize: '0.65rem',
      fontWeight: 500,
      letterSpacing: '0.22em',
      textTransform: 'uppercase' as const,
      color: '#C4922A',
      marginBottom: '20px',
    }),
    h2: (size = 'clamp(2.8rem, 7vw, 5rem)'): React.CSSProperties => ({
      fontFamily: 'Cormorant Garamond, serif',
      fontSize: size,
      fontWeight: 600,
      color: '#EDE9E0',
      lineHeight: 1.05,
      marginBottom: '24px',
    }),
    body: (): React.CSSProperties => ({
      fontFamily: 'Space Grotesk, sans-serif',
      fontSize: 'clamp(0.95rem, 2vw, 1.05rem)',
      fontWeight: 300,
      color: '#8A857D',
      lineHeight: 1.8,
    }),
  };

  return (
    <div className="page-container">
      {/* SEO hidden content */}
      <div style={{ position: 'absolute', left: '-9999px', visibility: 'hidden' }}>
        <h1>Antalya BJJ Training - Brazilian Jiu-Jitsu Classes in Antalya, Turkey</h1>
        <p>Join LORE BJJ for outdoor Brazilian Jiu-Jitsu training in Antalya at Erdal İnönü Park and Konyaaltı Beach.</p>
      </div>

      <Navigation />

      {/* ═══ HERO ═══ */}
      <section style={{
        minHeight: '100vh',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Background */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url(${getSiteAssetUrl('background.jpg')})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundAttachment: 'fixed',
          zIndex: 0,
        }} />
        {/* Dark overlay — heavier at bottom */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom, rgba(12,12,12,0.55) 0%, rgba(12,12,12,0.7) 60%, rgba(12,12,12,0.95) 100%)',
          zIndex: 1,
        }} />

        {/* Content */}
        <div style={{
          position: 'relative',
          zIndex: 2,
          textAlign: 'center',
          padding: '0 clamp(24px, 6vw, 80px)',
          animation: 'fadeUp 0.9s ease both',
        }}>
          {/* Brand mark */}
          <p style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: '0.65rem',
            fontWeight: 500,
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: '#C4922A',
            marginBottom: '32px',
          }}>
            Antalya · Brazilian Jiu-Jitsu
          </p>

          {/* Logo image, fallback to text */}
          <div style={{ marginBottom: '12px' }}>
            <img
              src={getSiteAssetUrl('logo.png')}
              alt="LORE BJJ"
              loading="eager"
              style={{ maxWidth: 'clamp(200px, 30vw, 340px)', height: 'auto', display: 'block', margin: '0 auto' }}
              onError={e => {
                const img = e.target as HTMLImageElement;
                img.style.display = 'none';
                const el = document.createElement('div');
                el.innerHTML = '<span style="font-family:\'Cormorant Garamond\',serif;font-size:clamp(5rem,18vw,12rem);font-weight:700;color:#EDE9E0;line-height:0.9;letter-spacing:-0.02em;">LORE</span>';
                img.parentElement?.appendChild(el);
              }}
            />
          </div>

          {/* Tagline */}
          <p style={{
            fontFamily: 'Space Grotesk, sans-serif',
            fontSize: 'clamp(0.75rem, 1.5vw, 0.9rem)',
            fontWeight: 300,
            letterSpacing: '0.18em',
            color: '#8A857D',
            textTransform: 'uppercase',
            marginBottom: '56px',
          }}>
            Train · Grow · Belong
          </p>

          {/* Hero nav links */}
          <div style={{
            display: 'flex',
            gap: 'clamp(20px, 4vw, 48px)',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}>
            {[
              { label: 'Our Story', id: 'about' },
              { label: 'Gallery',   id: 'gallery' },
              { label: 'Locations', id: 'locations' },
              { label: 'Camps',     id: 'youtube' },
            ].map(({ label, id }) => (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                style={{
                  background: 'none',
                  border: 'none',
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.72rem',
                  fontWeight: 400,
                  letterSpacing: '0.14em',
                  textTransform: 'uppercase',
                  color: '#8A857D',
                  cursor: 'pointer',
                  padding: '4px 0',
                  transition: 'color 0.2s ease',
                  position: 'relative',
                }}
                onMouseEnter={e => (e.currentTarget.style.color = '#EDE9E0')}
                onMouseLeave={e => (e.currentTarget.style.color = '#8A857D')}
              >
                {label}
              </button>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div style={{
          position: 'absolute',
          bottom: '36px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
          opacity: 0.4,
        }}>
          <div style={{
            width: '1px',
            height: '48px',
            background: 'linear-gradient(to bottom, transparent, #EDE9E0)',
          }} />
        </div>
      </section>

      {/* ═══ ABOUT ═══ */}
      <section id="about" style={S.section('#111111')}>
        <div style={S.container()}>
          <div style={{ maxWidth: '700px', marginBottom: 'clamp(60px, 10vw, 100px)' }}>
            <span style={S.sectionLabel()}>— Our History</span>
            <h2 style={S.h2()}>
              {getContent(siteContent, 'about', 'section_title') || 'The Art. The Craft. The Lineage.'}
            </h2>
            <p style={S.body()}>
              {getContent(siteContent, 'about', 'intro_text') || 'Brazilian Jiu-Jitsu is more than a martial art — it is a living language of leverage, patience, and problem-solving. At LORE, we carry that tradition forward.'}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(1px, 0.2vw, 1px)',
            background: '#1E1E1E',
          }}>
            {[
              {
                num: '01',
                title: getContent(siteContent, 'about', 'philosophy_title') || 'Philosophy',
                body: getContent(siteContent, 'about', 'philosophy_text') || 'Jiu-jitsu teaches you to be comfortable in uncomfortable positions. That mindset extends beyond the mat.',
              },
              {
                num: '02',
                title: getContent(siteContent, 'about', 'training_title') || 'Training',
                body: getContent(siteContent, 'about', 'training_text') || 'We train outdoors — in parks, on beaches — because the art was born in open air. No mats, no problem.',
              },
              {
                num: '03',
                title: getContent(siteContent, 'about', 'community_title') || 'Community',
                body: getContent(siteContent, 'about', 'community_text') || 'A team that rolls together, grows together. We welcome every level — white belt to black belt.',
              },
            ].map(({ num, title, body }) => (
              <div key={num} style={{
                background: '#111111',
                padding: 'clamp(32px, 5vw, 56px)',
                borderTop: '2px solid #1E1E1E',
                transition: 'border-color 0.25s ease',
              }}
              onMouseEnter={e => (e.currentTarget.style.borderTopColor = '#C4922A')}
              onMouseLeave={e => (e.currentTarget.style.borderTopColor = '#1E1E1E')}
              >
                <span style={{
                  display: 'block',
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: '3.5rem',
                  fontWeight: 400,
                  color: '#C4922A',
                  lineHeight: 1,
                  marginBottom: '20px',
                  opacity: 0.5,
                }}>{num}</span>
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1.6rem, 3vw, 2rem)',
                  fontWeight: 600,
                  color: '#EDE9E0',
                  marginBottom: '16px',
                  lineHeight: 1.1,
                }}>{title}</h3>
                <p style={S.body()}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ GALLERY ═══ */}
      <section id="gallery" style={S.section('#0C0C0C')}>
        <div style={S.container()}>
          <div style={{ marginBottom: 'clamp(48px, 8vw, 80px)', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '20px' }}>
            <div>
              <span style={S.sectionLabel()}>— Training Moments</span>
              <h2 style={{ ...S.h2('clamp(2.4rem, 5vw, 3.5rem)'), marginBottom: 0 }}>
                On the Mat. On the Shore.
              </h2>
            </div>
            <a
              href="https://www.instagram.com/loremartialarts/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline"
            >
              Instagram
            </a>
          </div>

          {loadingGallery ? (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2px',
            }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} style={{
                  height: '280px',
                  background: '#161616',
                  animation: 'fadeIn 0.5s ease both',
                }} />
              ))}
            </div>
          ) : galleryImages.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: '80px 20px',
              borderTop: '1px solid #1E1E1E',
            }}>
              <p style={S.body()}>Gallery coming soon — check our Instagram for the latest.</p>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '2px',
            }}>
              {galleryImages.map((image, index) => (
                <div
                  key={image.id}
                  style={{
                    position: 'relative',
                    overflow: 'hidden',
                    aspectRatio: '4/3',
                    background: '#161616',
                  }}
                  onMouseEnter={e => {
                    const overlay = e.currentTarget.querySelector('.gallery-overlay') as HTMLElement;
                    if (overlay) overlay.style.opacity = '1';
                    const img = e.currentTarget.querySelector('img') as HTMLElement;
                    if (img) img.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={e => {
                    const overlay = e.currentTarget.querySelector('.gallery-overlay') as HTMLElement;
                    if (overlay) overlay.style.opacity = '0';
                    const img = e.currentTarget.querySelector('img') as HTMLElement;
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
                      transition: 'transform 0.5s ease',
                    }}
                  />
                  <div className="gallery-overlay" style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(12,12,12,0.75)',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '24px',
                    opacity: 0,
                    transition: 'opacity 0.3s ease',
                  }}>
                    <h3 style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '1.3rem',
                      fontWeight: 600,
                      color: '#EDE9E0',
                      marginBottom: '6px',
                    }}>{image.title}</h3>
                    {image.description && (
                      <p style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '0.8rem',
                        color: '#8A857D',
                      }}>{image.description}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ═══ YOUTUBE ═══ */}
      <section id="youtube" style={S.section('#111111')}>
        <div style={{ ...S.container(), maxWidth: '800px' }}>
          <div style={{ textAlign: 'center', marginBottom: '48px' }}>
            <span style={S.sectionLabel()}>— Follow Our Journey</span>
            <h2 style={{ ...S.h2('clamp(2.4rem, 5vw, 3.5rem)'), marginBottom: '16px' }}>
              Latest Vlog
            </h2>
            <p style={{ ...S.body(), maxWidth: '520px', margin: '0 auto' }}>
              Watch us train in the open air, travel to camps, and build the community.
            </p>
          </div>

          <div style={{
            position: 'relative',
            overflow: 'hidden',
            marginBottom: '32px',
            border: '1px solid #1E1E1E',
          }}>
            <img
              src="https://img.youtube.com/vi/PoCnx58dYZk/maxresdefault.jpg"
              alt="Latest vlog thumbnail"
              loading="lazy"
              style={{ width: '100%', display: 'block', objectFit: 'cover' }}
            />
          </div>

          <div style={{ textAlign: 'center' }}>
            <a
              href="https://www.youtube.com/watch?v=PoCnx58dYZk&t=1s"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold"
            >
              Watch Latest Vlog
            </a>
          </div>
        </div>
      </section>

      {/* ═══ LOCATIONS ═══ */}
      <section id="locations" style={S.section('#0C0C0C')}>
        <div style={S.container()}>
          <div style={{ marginBottom: 'clamp(48px, 8vw, 80px)' }}>
            <span style={S.sectionLabel()}>— Where We Train</span>
            <h2 style={S.h2()}>
              {getContent(siteContent, 'locations', 'section_title') || 'Training Grounds'}
            </h2>
            <p style={{ ...S.body(), maxWidth: '560px' }}>
              {getContent(siteContent, 'locations', 'subtitle') || 'We take the mat to Antalya\'s most iconic outdoor spaces. No gym fees. Just jiu-jitsu.'}
            </p>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '2px',
          }}>
            {locations.map((loc, index) => (
              <div key={index} style={{
                background: '#111111',
                borderTop: '2px solid #C4922A',
                padding: 'clamp(28px, 4vw, 48px)',
              }}>
                <h3 style={{
                  fontFamily: 'Cormorant Garamond, serif',
                  fontSize: 'clamp(1.8rem, 3.5vw, 2.4rem)',
                  fontWeight: 600,
                  color: '#EDE9E0',
                  marginBottom: '8px',
                  lineHeight: 1.1,
                }}>{loc.name}</h3>
                <p style={{
                  fontFamily: 'Space Grotesk, sans-serif',
                  fontSize: '0.8rem',
                  color: '#8A857D',
                  letterSpacing: '0.04em',
                  marginBottom: '24px',
                }}>{loc.address}</p>

                <div style={{
                  paddingTop: '20px',
                  borderTop: '1px solid #1E1E1E',
                  marginBottom: '24px',
                }}>
                  <span style={{
                    display: 'block',
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '0.65rem',
                    fontWeight: 500,
                    letterSpacing: '0.18em',
                    textTransform: 'uppercase',
                    color: '#4A4540',
                    marginBottom: '8px',
                  }}>Schedule</span>
                  <p style={{
                    fontFamily: 'Space Grotesk, sans-serif',
                    fontSize: '0.9rem',
                    color: '#EDE9E0',
                  }}>{loc.time}</p>
                </div>

                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '28px' }}>
                  {loc.features.map(f => (
                    <span key={f} style={{
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '0.7rem',
                      fontWeight: 400,
                      letterSpacing: '0.08em',
                      color: '#C4922A',
                      background: 'rgba(196,146,42,0.08)',
                      border: '1px solid rgba(196,146,42,0.2)',
                      padding: '5px 12px',
                    }}>{f}</span>
                  ))}
                </div>

                <div style={{ overflow: 'hidden', border: '1px solid #1E1E1E' }}>
                  <iframe
                    src={loc.mapEmbed}
                    width="100%"
                    height="260"
                    style={{ border: 0, display: 'block', filter: 'grayscale(30%) contrast(1.1)' }}
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

      {/* ═══ BLOG ═══ */}
      <section style={S.section('#111111')}>
        <div style={{ ...S.container(), textAlign: 'center', maxWidth: '680px' }}>
          <span style={S.sectionLabel()}>— Knowledge</span>
          <h2 style={S.h2()}>Latest Stories</h2>
          <p style={{ ...S.body(), marginBottom: '40px' }}>
            Technique breakdowns, training insights, and community stories from the mat.
          </p>
          <a href="/blog" className="btn-gold">Read the Blog</a>
        </div>
      </section>

      {/* ═══ CONTACT / FOOTER ═══ */}
      <section id="contact" style={{
        padding: 'clamp(80px, 12vw, 140px) clamp(24px, 6vw, 80px) clamp(48px, 6vw, 80px)',
        background: '#0C0C0C',
        borderTop: '1px solid #1E1E1E',
      }}>
        <div style={S.container()}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'clamp(48px, 8vw, 80px)',
            marginBottom: 'clamp(60px, 8vw, 80px)',
          }}>
            {/* Brand col */}
            <div>
              <h2 style={{
                fontFamily: 'Cormorant Garamond, serif',
                fontSize: 'clamp(2.2rem, 4vw, 3rem)',
                fontWeight: 600,
                color: '#EDE9E0',
                lineHeight: 1.0,
                marginBottom: '12px',
              }}>LORE BJJ</h2>
              <p style={{
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.68rem',
                fontWeight: 400,
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color: '#C4922A',
                marginBottom: '20px',
              }}>Antalya, Turkey</p>
              <p style={{ ...S.body(), maxWidth: '320px' }}>
                {getContent(siteContent, 'contact', 'main_text') || 'Open mats, open minds. Come train with us — no experience needed, just the will to learn.'}
              </p>
            </div>

            {/* Contact col */}
            <div>
              <span style={{
                display: 'block',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#4A4540',
                marginBottom: '24px',
              }}>Contact</span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                {[
                  { label: 'Phone', href: 'tel:05069770077', text: '0506 977 00 77' },
                  { label: 'Email', href: 'mailto:contact@lorebjj.com', text: 'contact@lorebjj.com' },
                  { label: 'Instagram', href: 'https://www.instagram.com/loremartialarts/', text: '@loremartialarts' },
                ].map(({ label, href, text }) => (
                  <div key={label}>
                    <span style={{
                      display: 'block',
                      fontFamily: 'Space Grotesk, sans-serif',
                      fontSize: '0.62rem',
                      letterSpacing: '0.15em',
                      textTransform: 'uppercase',
                      color: '#4A4540',
                      marginBottom: '4px',
                    }}>{label}</span>
                    <a
                      href={href}
                      target={href.startsWith('http') ? '_blank' : undefined}
                      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                      style={{
                        fontFamily: 'Space Grotesk, sans-serif',
                        fontSize: '0.92rem',
                        fontWeight: 400,
                        color: '#EDE9E0',
                        textDecoration: 'none',
                        transition: 'color 0.2s ease',
                      }}
                      onMouseEnter={e => (e.currentTarget.style.color = '#C4922A')}
                      onMouseLeave={e => (e.currentTarget.style.color = '#EDE9E0')}
                    >
                      {text}
                    </a>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA col */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', gap: '16px' }}>
              <span style={{
                display: 'block',
                fontFamily: 'Space Grotesk, sans-serif',
                fontSize: '0.65rem',
                fontWeight: 500,
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color: '#4A4540',
                marginBottom: '8px',
              }}>Get Started</span>
              <p style={{ ...S.body(), marginBottom: '24px' }}>
                Show up to any session. The first class is always free. Gi or no-gi, beginner or experienced — you are welcome.
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
          <div style={{
            borderTop: '1px solid #1E1E1E',
            paddingTop: '28px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '12px',
          }}>
            <p style={{
              fontFamily: 'Space Grotesk, sans-serif',
              fontSize: '0.72rem',
              color: '#4A4540',
            }}>
              © {new Date().getFullYear()} LORE BJJ · Antalya, Turkey
            </p>
            <p style={{
              fontFamily: 'Cormorant Garamond, serif',
              fontSize: '0.9rem',
              fontStyle: 'italic',
              color: '#4A4540',
            }}>
              The art lives on the mat.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
