'use client';

export default function ImmersiveFooter() {
  const mono  = "'Space Mono', monospace";
  const serif = "'Cormorant Garamond', serif";
  const gold  = '#C4A35A';

  return (
    <footer style={{ padding: '100px 40px 100px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 28 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://fmkglpsfszlkubobcmhg.supabase.co/storage/v1/object/public/site-assets/logo.png"
        alt="LORE"
        style={{ width: 56, height: 56, objectFit: 'contain', opacity: 0.8, filter: 'drop-shadow(0 0 14px rgba(196,163,90,0.35))' }}
      />

      <div style={{ width: 100, height: 1, background: 'linear-gradient(to right, transparent, rgba(196,163,90,0.4), transparent)' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {([
          { href: 'tel:+905069770077',                         label: '0506 977 00 77' },
          { href: 'mailto:contact@lorebjj.com',                label: 'contact@lorebjj.com' },
          { href: 'https://www.instagram.com/loremartialarts/', label: '@loremartialarts' },
        ] as { href: string; label: string }[]).map(({ href, label }) => (
          <a
            key={href} href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{
              fontFamily: mono, fontSize: '0.65rem', letterSpacing: '0.18em',
              color: 'rgba(237,228,211,0.72)', textDecoration: 'none',
              textTransform: 'uppercase', transition: 'color 0.3s', display: 'block',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = gold)}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(237,228,211,0.72)')}
          >
            {label}
          </a>
        ))}
      </div>

      <div style={{ fontFamily: mono, fontSize: '0.62rem', letterSpacing: '0.18em', color: 'rgba(237,228,211,0.58)', textTransform: 'uppercase', lineHeight: 1.8 }}>
        Monday · Wednesday · Friday — 20:30
      </div>

      <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '1rem', letterSpacing: '0.12em', color: 'rgba(237,228,211,0.52)' }}>
        Lara, Antalya
      </div>

      <div style={{ width: 100, height: 1, background: 'linear-gradient(to right, transparent, rgba(196,163,90,0.4), transparent)' }} />

      <div style={{ fontFamily: mono, fontSize: '0.55rem', letterSpacing: '0.2em', color: 'rgba(237,228,211,0.4)', textTransform: 'uppercase' }}>
        © 2026 LORE Martial Arts · Antalya, Turkey
      </div>

      <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '0.9rem', color: 'rgba(237,228,211,0.35)', letterSpacing: '0.1em' }}>
        The art lives on the mat.
      </div>
    </footer>
  );
}
