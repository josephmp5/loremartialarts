'use client';

export default function ImmersiveFooter() {
  const mono = "'Space Mono', monospace";
  const serif = "'Cormorant Garamond', serif";
  const cream = 'rgba(237,228,211,';
  const gold = '#C4A35A';

  return (
    <footer style={{ padding: '100px 40px 80px', display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', gap: 32 }}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="https://fmkglpsfszlkubobcmhg.supabase.co/storage/v1/object/public/site-assets/logo.png"
        alt="LORE"
        style={{ width: 58, height: 58, objectFit: 'contain', opacity: 0.65, filter: 'drop-shadow(0 0 12px rgba(196,163,90,0.3))' }}
      />

      <div style={{ width: 110, height: 1, background: 'linear-gradient(to right, transparent, rgba(196,163,90,0.3), transparent)' }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {[
          { href: 'tel:+905069770077', label: '0506 977 00 77' },
          { href: 'mailto:contact@lorebjj.com', label: 'contact@lorebjj.com' },
          { href: 'https://www.instagram.com/loremartialarts/', label: '@loremartialarts' },
        ].map(({ href, label }) => (
          <a key={href} href={href}
            target={href.startsWith('http') ? '_blank' : undefined}
            rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            style={{ fontFamily: mono, fontSize: '0.62rem', letterSpacing: '0.2em', color: `${cream}0.28)`, textDecoration: 'none', textTransform: 'uppercase', transition: 'color 0.3s' }}
            onMouseEnter={e => (e.currentTarget.style.color = gold)}
            onMouseLeave={e => (e.currentTarget.style.color = `${cream}0.28)`)}
          >
            {label}
          </a>
        ))}
      </div>

      <div style={{ fontFamily: mono, fontSize: '0.62rem', letterSpacing: '0.2em', color: `${cream}0.22)`, textTransform: 'uppercase' }}>
        Monday · Wednesday · Friday — 20:30
      </div>

      <span style={{ fontFamily: serif, fontSize: '0.9rem', letterSpacing: '0.15em', color: `${cream}0.22)` }}>Lara, Antalya</span>

      <div style={{ width: 110, height: 1, background: 'linear-gradient(to right, transparent, rgba(196,163,90,0.3), transparent)' }} />

      <div style={{ fontFamily: mono, fontSize: '0.52rem', letterSpacing: '0.2em', color: `${cream}0.18)`, textTransform: 'uppercase' }}>
        © 2026 LORE Martial Arts · Antalya, Turkey
      </div>
      <div style={{ fontFamily: serif, fontStyle: 'italic', fontSize: '0.85rem', color: `${cream}0.12)`, letterSpacing: '0.1em' }}>
        The art lives on the mat.
      </div>
    </footer>
  );
}
