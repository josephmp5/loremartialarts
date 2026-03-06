'use client';

import { useEffect, useRef } from 'react';

// ─── Styles ───────────────────────────────────────────────────────────────────
const styles = `
  html { scroll-behavior: auto; }
  body { background: #000 !important; overflow-x: hidden; cursor: none; }
  body::before { display: none !important; }

  #immersive-cursor {
    position: fixed; width: 8px; height: 8px;
    background: rgba(196,163,90,0.85); border-radius: 50%;
    pointer-events: none; z-index: 9999;
    transform: translate(-50%,-50%);
    mix-blend-mode: screen;
    transition: transform 0.15s;
  }
  #immersive-cursor-ring {
    position: fixed; width: 30px; height: 30px;
    border: 1px solid rgba(196,163,90,0.3); border-radius: 50%;
    pointer-events: none; z-index: 9998;
    transform: translate(-50%,-50%);
    transition: width 0.3s, height 0.3s;
  }

  #immersive-grain {
    position: fixed; top: -50%; left: -50%;
    width: 200%; height: 200%;
    z-index: 998; pointer-events: none; opacity: 0.038;
    animation: imm-grain 0.75s steps(1) infinite;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
    background-size: 180px 180px;
  }
  @keyframes imm-grain {
    0%  { transform: translate(0,0) }   10% { transform: translate(-3%,-2%) }
    20% { transform: translate(2%,3%) }  30% { transform: translate(-2%,4%) }
    40% { transform: translate(4%,-1%) } 50% { transform: translate(-3%,3%) }
    60% { transform: translate(3%,-3%) } 70% { transform: translate(-4%,2%) }
    80% { transform: translate(2%,-2%) } 90% { transform: translate(-1%,4%) }
    100%{ transform: translate(1%,-1%) }
  }

  #imm-canvas {
    position: fixed; top: 0; left: 0;
    width: 100%; height: 100%; z-index: 0;
  }

  #imm-nav {
    position: fixed; top: 0; left: 0; right: 0;
    z-index: 100; display: flex; align-items: center;
    justify-content: space-between; padding: 28px 52px;
    transition: background 0.5s, padding 0.3s;
  }
  #imm-nav.imm-scrolled {
    background: rgba(0,0,0,0.82);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    padding: 16px 52px;
  }
  #imm-nav-logo {
    font-family: 'Anton', sans-serif; font-size: 1.1rem;
    letter-spacing: 0.18em; color: #EDE4D3; text-decoration: none;
  }
  #imm-nav-links { display: flex; gap: 44px; list-style: none; }
  #imm-nav-links a {
    font-family: 'Space Mono', monospace; font-size: 0.62rem;
    letter-spacing: 0.22em; text-transform: uppercase;
    color: rgba(237,228,211,0.5); text-decoration: none;
    transition: color 0.3s;
  }
  #imm-nav-links a:hover { color: #C4A35A; }

  #imm-hamburger {
    display: none; flex-direction: column; gap: 5px;
    cursor: pointer; padding: 4px;
  }
  #imm-hamburger span {
    display: block; width: 22px; height: 1px;
    background: #EDE4D3; transition: all 0.3s;
  }
  #imm-mobile-menu {
    display: none; position: fixed; inset: 0;
    background: #000; z-index: 900;
    flex-direction: column; align-items: center;
    justify-content: center; gap: 52px;
  }
  #imm-mobile-menu.open { display: flex; }
  #imm-mobile-menu a {
    font-family: 'Anton', sans-serif; font-size: clamp(2.5rem, 10vw, 5rem);
    letter-spacing: 0.08em; color: #EDE4D3;
    text-decoration: none; transition: color 0.3s;
  }
  #imm-mobile-menu a:hover { color: #C4A35A; }
  #imm-mobile-close {
    position: absolute; top: 28px; right: 52px;
    font-family: 'Space Mono', monospace; font-size: 0.65rem;
    letter-spacing: 0.22em; color: rgba(237,228,211,0.4);
    cursor: pointer; text-transform: uppercase;
  }

  #imm-scroll-container {
    position: relative; z-index: 1; height: 600vh;
  }

  /* VOID */
  #imm-void { height: 5vh; display: flex; align-items: flex-end; justify-content: center; padding-bottom: 28px; }
  #imm-scroll-hint { display: flex; flex-direction: column; align-items: center; gap: 8px; opacity: 0; animation: imm-breathe 3s ease-in-out 1.5s infinite; }
  #imm-scroll-hint span { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 0.75rem; letter-spacing: 0.3em; color: rgba(196,163,90,0.45); }
  #imm-scroll-line { width: 1px; height: 0; background: linear-gradient(to bottom, rgba(196,163,90,0.45), transparent); animation: imm-linegrow 2s ease-out 2s forwards; }
  @keyframes imm-breathe { 0%,100% { opacity: 0.3 } 50% { opacity: 0.75 } }
  @keyframes imm-linegrow { from { height: 0 } to { height: 44px } }

  /* NAME */
  #imm-name { height: 95vh; display: flex; align-items: center; justify-content: center; }
  #imm-name-inner { text-align: center; opacity: 0; }
  #imm-name-subtitle {
    font-family: 'Cormorant Garamond', serif; font-size: 1rem;
    letter-spacing: 0.5em; color: rgba(196,163,90,0.7);
    text-transform: uppercase; margin-bottom: 14px;
    opacity: 0; transform: translateY(20px);
  }
  #imm-name-tagline {
    font-family: 'Cormorant Garamond', serif; font-style: italic;
    font-size: 1.2rem; letter-spacing: 0.22em;
    color: rgba(237,228,211,0.45);
    opacity: 0; transform: translateY(20px);
  }

  /* PHILOSOPHY */
  #imm-philo-outer { height: 180vh; position: relative; }
  #imm-philo-inner {
    position: sticky; top: 0; height: 100vh;
    display: flex; align-items: center; justify-content: center; overflow: hidden;
  }
  .imm-quote { position: absolute; text-align: center; max-width: 900px; padding: 0 40px; opacity: 0; }
  .imm-qnum {
    position: absolute; top: 44px; right: 44px;
    font-family: 'Space Mono', monospace; font-size: 0.62rem;
    letter-spacing: 0.3em; color: rgba(196,163,90,0.25);
  }
  .imm-qmain {
    font-family: 'Anton', sans-serif;
    font-size: clamp(2.5rem, 7vw, 7rem);
    line-height: 1; color: #EDE4D3;
    text-shadow: 0 0 40px rgba(196,163,90,0.07);
    margin-bottom: 28px;
  }
  .imm-word { display: inline-block; opacity: 0; transform: translateY(40px) scale(0.97); margin-right: 0.22em; }
  .imm-qsub {
    font-family: 'Cormorant Garamond', serif; font-style: italic;
    font-size: 1.1rem; letter-spacing: 0.1em; color: #C4A35A;
    opacity: 0; transform: translateY(16px);
  }

  /* STORY */
  #imm-story { padding: 120px 0 80px; max-width: 680px; margin: 0 auto; text-align: center; }
  #imm-story-line { width: 0; height: 1px; background: linear-gradient(to right, transparent, #C4A35A, transparent); margin: 0 auto 64px; transition: width 1.5s ease; }
  #imm-story-label {
    font-family: 'Space Mono', monospace; font-size: 0.6rem;
    letter-spacing: 0.4em; color: #C4A35A; text-transform: uppercase;
    margin-bottom: 44px; opacity: 0; transform: translateY(20px);
  }
  #imm-story-h {
    font-family: 'Anton', sans-serif; font-size: clamp(2.5rem, 6vw, 5.5rem);
    line-height: 1; color: #EDE4D3; margin-bottom: 64px;
    opacity: 0; transform: translateY(30px);
  }
  .imm-para {
    font-family: 'Cormorant Garamond', serif; font-size: 1.25rem;
    line-height: 2; color: rgba(237,228,211,0.72);
    margin-bottom: 44px; opacity: 0; transform: translateY(30px);
    padding: 0 40px;
  }
  #imm-stats { display: flex; justify-content: center; gap: 80px; margin-top: 88px; flex-wrap: wrap; padding: 0 20px; }
  .imm-stat { text-align: center; opacity: 0; transform: translateY(30px); }
  .imm-stat-num {
    font-family: 'Anton', sans-serif; font-size: clamp(3rem, 7vw, 7rem);
    color: #C4A35A; line-height: 1; display: block;
  }
  .imm-stat-lbl {
    font-family: 'Space Mono', monospace; font-size: 0.6rem;
    letter-spacing: 0.25em; color: rgba(237,228,211,0.35);
    text-transform: uppercase; margin-top: 8px; display: block;
  }
  .imm-inf { animation: imm-glow 2s ease-in-out infinite; }
  @keyframes imm-glow {
    0%,100% { text-shadow: 0 0 20px rgba(196,163,90,0.6), 0 0 40px rgba(196,163,90,0.3) }
    50%      { text-shadow: 0 0 30px rgba(196,163,90,0.9), 0 0 60px rgba(196,163,90,0.5) }
  }

  /* GYM */
  #imm-gym-outer { height: 100vh; position: relative; }
  #imm-gym-inner {
    position: sticky; top: 0; height: 100vh;
    display: flex; align-items: center; justify-content: center; overflow: hidden;
  }
  #imm-gym-content { text-align: center; max-width: 580px; padding: 0 40px; }
  #imm-gym-lbl {
    font-family: 'Space Mono', monospace; font-size: 0.6rem;
    letter-spacing: 0.4em; color: #C4A35A; text-transform: uppercase;
    margin-bottom: 32px; opacity: 0;
  }
  #imm-gym-h {
    font-family: 'Anton', sans-serif; font-size: clamp(2.5rem, 8vw, 7rem);
    line-height: 1; color: #EDE4D3; margin-bottom: 12px;
    opacity: 0; transform: translateY(40px);
  }
  #imm-gym-name {
    font-family: 'Cormorant Garamond', serif; font-size: 1.1rem;
    letter-spacing: 0.3em; color: rgba(196,163,90,0.55);
    margin-bottom: 56px; opacity: 0;
  }
  #imm-gym-details { opacity: 0; transform: translateY(20px); }
  .imm-gym-loc {
    font-family: 'Cormorant Garamond', serif; font-style: italic;
    font-size: 1.2rem; color: rgba(237,228,211,0.55);
    margin-bottom: 32px; letter-spacing: 0.05em;
  }
  .imm-sched { display: flex; flex-direction: column; gap: 8px; margin-bottom: 32px; }
  .imm-sched-line {
    font-family: 'Space Mono', monospace; font-size: 0.78rem;
    letter-spacing: 0.15em; color: #C4A35A;
    opacity: 0; transform: translateX(-20px);
  }
  .imm-membership {
    font-family: 'Cormorant Garamond', serif; font-style: italic;
    font-size: 0.95rem; color: rgba(237,228,211,0.3); margin-bottom: 48px;
  }
  #imm-map-wrap {
    opacity: 0; transform: translateY(20px);
    border: 1px solid rgba(196,163,90,0.15); border-radius: 4px;
    overflow: hidden; max-width: 480px; margin: 0 auto;
  }
  #imm-map-wrap iframe {
    display: block; width: 100%; height: 220px; border: 0;
    filter: grayscale(1) invert(1) contrast(0.8) brightness(0.55) sepia(0.35);
  }

  /* CALL */
  #imm-call {
    height: 70vh; display: flex; flex-direction: column;
    align-items: center; justify-content: center;
    text-align: center; padding: 0 40px;
  }
  #imm-call-h {
    font-family: 'Anton', sans-serif;
    font-size: clamp(3.5rem, 14vw, 14rem);
    line-height: 0.9; color: #EDE4D3;
    text-shadow: 0 0 80px rgba(196,163,90,0.04);
    opacity: 0; transform: translateY(60px);
  }
  #imm-call-sub {
    font-family: 'Cormorant Garamond', serif; font-style: italic;
    font-size: 1.15rem; color: #C4A35A; max-width: 460px;
    line-height: 1.85; margin: 32px auto 48px;
    opacity: 0; transform: translateY(20px);
  }
  .imm-cta {
    display: inline-block; font-family: 'Space Mono', monospace;
    font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase;
    color: #C4A35A; border: 1px solid #C4A35A;
    padding: 18px 52px; text-decoration: none;
    transition: background 0.4s, color 0.4s;
    opacity: 0; transform: translateY(20px);
  }
  .imm-cta:hover { background: #C4A35A; color: #000; }
  #imm-call-links { display: flex; gap: 40px; margin-top: 28px; opacity: 0; }
  #imm-call-links a {
    font-family: 'Space Mono', monospace; font-size: 0.6rem;
    letter-spacing: 0.2em; color: rgba(237,228,211,0.3);
    text-decoration: none; text-transform: uppercase;
    border-bottom: 1px solid transparent; transition: color 0.3s, border-color 0.3s;
  }
  #imm-call-links a:hover { color: #C4A35A; border-color: rgba(196,163,90,0.4); }

  /* FOOTER */
  #imm-footer {
    padding: 100px 40px 80px; display: flex;
    flex-direction: column; align-items: center; text-align: center; gap: 32px;
  }
  #imm-footer-logo { width: 58px; height: 58px; object-fit: contain; opacity: 0.65; filter: drop-shadow(0 0 12px rgba(196,163,90,0.3)); }
  .imm-divider { width: 110px; height: 1px; background: linear-gradient(to right, transparent, rgba(196,163,90,0.3), transparent); }
  .imm-foot-contact { display: flex; flex-direction: column; gap: 10px; }
  .imm-foot-contact a, .imm-foot-contact span {
    font-family: 'Space Mono', monospace; font-size: 0.62rem;
    letter-spacing: 0.2em; color: rgba(237,228,211,0.28);
    text-decoration: none; text-transform: uppercase; transition: color 0.3s;
  }
  .imm-foot-contact a:hover { color: #C4A35A; }
  .imm-foot-sched { font-family: 'Cormorant Garamond', serif; font-size: 0.95rem; letter-spacing: 0.2em; color: rgba(237,228,211,0.22); }
  .imm-foot-copy { font-family: 'Space Mono', monospace; font-size: 0.52rem; letter-spacing: 0.2em; color: rgba(237,228,211,0.18); text-transform: uppercase; }
  .imm-foot-final { font-family: 'Cormorant Garamond', serif; font-style: italic; font-size: 0.85rem; color: rgba(237,228,211,0.12); letter-spacing: 0.1em; }

  /* MOBILE */
  @media (max-width: 768px) {
    #imm-nav { padding: 20px 24px; }
    #imm-nav.imm-scrolled { padding: 14px 24px; }
    #imm-nav-links { display: none; }
    #imm-hamburger { display: flex; }
    #immersive-cursor, #immersive-cursor-ring { display: none; }
    body { cursor: auto; }
    #imm-stats { gap: 40px; }
    #imm-call { height: auto; min-height: 60vh; padding: 80px 24px; }
    .imm-para { padding: 0 24px; font-size: 1.1rem; }
    #imm-footer { padding: 80px 24px 60px; }
    #imm-gym-inner { align-items: flex-start; padding-top: 88px; overflow-y: auto; }
  }
  @media (prefers-reduced-motion: reduce) {
    #immersive-grain { display: none; }
    * { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
  }
`;

export default function ImmersivePage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let disposed = false;
    let rafId: number;
    let scrollListenerAdded = false;

    async function init() {
      const THREE = await import('three');
      const gsapMod = await import('gsap');
      const stMod = await import('gsap/ScrollTrigger');
      const gsap = gsapMod.gsap;
      const ScrollTrigger = stMod.ScrollTrigger;
      gsap.registerPlugin(ScrollTrigger);

      if (disposed || !canvasRef.current) return;

      // ── HELPERS ─────────────────────────────────────────────────────────────
      const isMobile = window.innerWidth < 769 || /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
      const PARTICLE_COUNT = isMobile ? 800 : 2200;
      const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      // ── THREE.JS ─────────────────────────────────────────────────────────────
      const renderer = new THREE.WebGLRenderer({ canvas: canvasRef.current!, antialias: false, alpha: false });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setClearColor(0x000000, 1);

      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000000, 0.012);

      const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 200);
      camera.position.set(0, 2, 50);

      // ── LORE TARGET POSITIONS ────────────────────────────────────────────────
      function getLoreTargets(count: number) {
        const oc = document.createElement('canvas');
        oc.width = 512; oc.height = 128;
        const ctx = oc.getContext('2d')!;
        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 88px Arial Black, Arial, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('LORE', 256, 64);
        const data = ctx.getImageData(0, 0, 512, 128).data;
        const pts: {x:number;y:number;z:number}[] = [];
        for (let y = 0; y < 128; y += 2) {
          for (let x = 0; x < 512; x += 2) {
            const i = (y * 512 + x) * 4;
            if (data[i+3] > 120) {
              pts.push({ x: (x-256)*0.056, y: -(y-64)*0.056, z: 0 });
            }
          }
        }
        const result: {x:number;y:number;z:number}[] = [];
        const step = Math.max(1, Math.floor(pts.length / count));
        for (let i = 0; i < pts.length && result.length < count; i += step) {
          result.push(pts[i]);
        }
        while (result.length < count) result.push({ x:0, y:0, z:0 });
        return result;
      }
      const loreTargets = getLoreTargets(PARTICLE_COUNT);

      // ── PARTICLE GEOMETRY ────────────────────────────────────────────────────
      const geo = new THREE.BufferGeometry();
      const pos = new Float32Array(PARTICLE_COUNT * 3);
      const cols = new Float32Array(PARTICLE_COUNT * 3);
      const szs = new Float32Array(PARTICLE_COUNT);
      const nat: {x:number;y:number;z:number}[] = [];
      const vel: {x:number;y:number;z:number}[] = [];
      const off: {px:number;py:number;spd:number;amp:number}[] = [];
      const goldPalette = [
        new THREE.Color(0xC4A35A), new THREE.Color(0xB8963E),
        new THREE.Color(0xD4C5A0), new THREE.Color(0xE2D4A8),
        new THREE.Color(0x9A7D32),
      ];
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        const x = (Math.random()-.5)*80, y = (Math.random()-.5)*40, z = (Math.random()-.5)*120;
        pos[i*3]=x; pos[i*3+1]=y; pos[i*3+2]=z;
        nat.push({x,y,z});
        vel.push({x:0,y:0,z:0});
        off.push({ px: Math.random()*Math.PI*2, py: Math.random()*Math.PI*2, spd: 0.2+Math.random()*0.4, amp: 0.5+Math.random()*1.5 });
        const c = goldPalette[Math.floor(Math.random()*goldPalette.length)];
        cols[i*3]=c.r; cols[i*3+1]=c.g; cols[i*3+2]=c.b;
        szs[i] = 1.5 + Math.random()*1.5;
      }
      geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(cols, 3));
      geo.setAttribute('size', new THREE.BufferAttribute(szs, 1));

      const mat = new THREE.ShaderMaterial({
        uniforms: { uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) } },
        vertexShader: `
          attribute float size;
          attribute vec3 color;
          varying vec3 vColor;
          uniform float uPixelRatio;
          void main() {
            vColor = color;
            vec4 mvp = modelViewMatrix * vec4(position,1.0);
            gl_PointSize = clamp(size * uPixelRatio * (200.0 / -mvp.z), 0.5, 8.0);
            gl_Position = projectionMatrix * mvp;
          }
        `,
        fragmentShader: `
          varying vec3 vColor;
          void main() {
            float d = length(gl_PointCoord - vec2(0.5));
            if (d > 0.5) discard;
            float a = 1.0 - smoothstep(0.2, 0.5, d);
            gl_FragColor = vec4(vColor, a * 0.88);
          }
        `,
        transparent: true, depthWrite: false,
        vertexColors: true, blending: THREE.AdditiveBlending,
      });

      const particles = new THREE.Points(geo, mat);
      scene.add(particles);

      // ── CURSOR LIGHT ─────────────────────────────────────────────────────────
      let cursorLight: THREE.PointLight | null = null;
      if (!isMobile) {
        cursorLight = new THREE.PointLight(0xC4A35A, 0.9, 18);
        cursorLight.position.set(0, 0, 12);
        scene.add(cursorLight);
      }

      // ── STATE ────────────────────────────────────────────────────────────────
      let mouseX = 0, mouseY = 0, tMouseX = 0, tMouseY = 0;
      let curX3D = 0, curY3D = 0;
      let camTX = 0, camTY = 2, camTZ = 50;
      let camAX = 0, camAY = 2, camAZ = 50;
      let loreP = 0, dispP = 0;
      let breathScale = 1;
      let touchRippleX = 0, touchRippleY = 0, touchRippleOn = false, touchRippleAge = 0;

      // ── CURSOR & TOUCH ───────────────────────────────────────────────────────
      const onMouseMove = (e: MouseEvent) => {
        tMouseX = (e.clientX/window.innerWidth)*2 - 1;
        tMouseY = -((e.clientY/window.innerHeight)*2 - 1);
        curX3D = tMouseX * 14;
        curY3D = tMouseY * 8;
        const cur = document.getElementById('immersive-cursor');
        const ring = document.getElementById('immersive-cursor-ring');
        if (cur) { cur.style.left = e.clientX+'px'; cur.style.top = e.clientY+'px'; }
        if (ring) { ring.style.left = e.clientX+'px'; ring.style.top = e.clientY+'px'; }
      };
      const onTouch = (e: TouchEvent) => {
        const t = e.touches[0];
        touchRippleX = ((t.clientX/window.innerWidth)*2-1)*14;
        touchRippleY = -(((t.clientY/window.innerHeight)*2-1))*8;
        touchRippleOn = true; touchRippleAge = 0;
      };
      if (!isMobile) window.addEventListener('mousemove', onMouseMove);
      else window.addEventListener('touchstart', onTouch, {passive:true});

      // ── SCROLL ───────────────────────────────────────────────────────────────
      let rawScroll = 0;
      const onScroll = () => {
        rawScroll = window.scrollY;
        const vh = window.innerHeight;
        const maxS = document.documentElement.scrollHeight - vh;
        const scrollP = maxS > 0 ? rawScroll/maxS : 0;

        loreP  = clamp((rawScroll - 5*vh)  / (33*vh), 0, 1);
        dispP  = clamp((rawScroll - 68*vh) / (27*vh), 0, 1);
        camTZ  = 50 - scrollP * 100;
        camTY  = 2  - scrollP * 4;

        const philoS = 100*vh, philoE = 280*vh;
        breathScale = (rawScroll > philoS && rawScroll < philoE)
          ? 1 + 0.04*Math.sin((rawScroll-philoS)/(philoE-philoS)*Math.PI*6)
          : 1;

        const nav = document.getElementById('imm-nav');
        if (nav) {
          if (rawScroll > 80) nav.classList.add('imm-scrolled');
          else nav.classList.remove('imm-scrolled');
        }
      };
      window.addEventListener('scroll', onScroll, {passive:true});
      scrollListenerAdded = true;

      // ── RESIZE ───────────────────────────────────────────────────────────────
      const onResize = () => {
        camera.aspect = window.innerWidth/window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
      };
      window.addEventListener('resize', onResize);

      // ── HELPERS ──────────────────────────────────────────────────────────────
      const clamp = (v:number,mn:number,mx:number) => Math.min(Math.max(v,mn),mx);
      const lerp  = (a:number,b:number,t:number) => a+(b-a)*t;
      const easeIO = (t:number) => t<.5 ? 2*t*t : -1+(4-2*t)*t;
      const easeO  = (t:number) => 1-Math.pow(1-t,3);

      // ── RENDER LOOP ──────────────────────────────────────────────────────────
      let lastT = 0;
      const animate = (time: number) => {
        if (disposed) return;
        rafId = requestAnimationFrame(animate);
        if (prefersReduced) { renderer.render(scene, camera); return; }
        const dt = Math.min((time-lastT)/1000, 0.05);
        lastT = time;
        const t = time*0.001;

        mouseX = lerp(mouseX, tMouseX, 0.08);
        mouseY = lerp(mouseY, tMouseY, 0.08);
        camTX  = mouseX * 0.5;
        camAX  = lerp(camAX, camTX, 0.05);
        camAY  = lerp(camAY, camTY, 0.04);
        camAZ  = lerp(camAZ, camTZ, 0.04);
        camera.position.set(camAX, camAY, camAZ);
        camera.lookAt(camAX*0.1, camAY*0.1, 0);

        if (cursorLight) {
          cursorLight.position.x = lerp(cursorLight.position.x, curX3D, 0.15);
          cursorLight.position.y = lerp(cursorLight.position.y, curY3D, 0.15);
        }

        if (touchRippleOn) { touchRippleAge += dt; if (touchRippleAge > 1.2) touchRippleOn = false; }

        const positions = geo.attributes.position.array as Float32Array;
        const repR = 3.5, repStr = 0.5, spring = 0.03, damp = 0.88;

        for (let i = 0; i < PARTICLE_COUNT; i++) {
          const ix=i*3, iy=ix+1, iz=ix+2;
          const o = off[i], n = nat[i];
          const hx = n.x + Math.sin(t*o.spd+o.px)*o.amp;
          const hy = n.y + Math.cos(t*o.spd*0.7+o.py)*o.amp*0.5;
          let tx:number, ty:number, tz:number;

          if (loreP > 0 && loreP < 1 && dispP === 0) {
            const lt = loreTargets[i];
            const e = easeIO(loreP);
            tx = lerp(hx, lt.x, e); ty = lerp(hy, lt.y, e); tz = lerp(n.z, 0, e);
          } else if (loreP >= 1 && dispP < 1 && dispP === 0) {
            const lt = loreTargets[i]; tx = lt.x; ty = lt.y; tz = 0;
          } else if (dispP > 0) {
            const lt = loreTargets[i]; const e = easeO(dispP);
            tx = lerp(lt.x, hx, e); ty = lerp(lt.y, hy, e); tz = lerp(0, n.z, e);
          } else {
            tx = hx; ty = hy; tz = n.z;
          }

          tx *= breathScale; ty *= breathScale;

          vel[i].x = vel[i].x*damp + (tx-positions[ix])*spring;
          vel[i].y = vel[i].y*damp + (ty-positions[iy])*spring;
          vel[i].z = vel[i].z*damp + (tz-positions[iz])*spring;

          if (!isMobile && cursorLight) {
            const dx=curX3D-positions[ix], dy=curY3D-positions[iy], dz=12-positions[iz];
            const dist=Math.sqrt(dx*dx+dy*dy+dz*dz);
            if (dist < repR && dist > 0.01) {
              const f=((repR-dist)/repR)*repStr;
              vel[i].x -= (dx/dist)*f; vel[i].y -= (dy/dist)*f; vel[i].z -= (dz/dist)*f;
            }
          }
          if (isMobile && touchRippleOn) {
            const rx=touchRippleX-positions[ix], ry=touchRippleY-positions[iy];
            const dist=Math.sqrt(rx*rx+ry*ry);
            if (dist < 5 && dist > 0.01) {
              const f=((5-dist)/5)*1.5*(1-touchRippleAge/1.2);
              vel[i].x -= (rx/dist)*f; vel[i].y -= (ry/dist)*f;
            }
          }

          positions[ix] += vel[i].x; positions[iy] += vel[i].y; positions[iz] += vel[i].z;
        }
        geo.attributes.position.needsUpdate = true;
        renderer.render(scene, camera);
      };
      rafId = requestAnimationFrame(animate);

      // ── GSAP SCROLL TRIGGERS ─────────────────────────────────────────────────
      function buildWords(id: string, text: string) {
        const el = document.getElementById(id);
        if (!el) return;
        el.innerHTML = text.split(' ').map(w => `<span class="imm-word">${w}</span>`).join('');
        gsap.set(`#${id} .imm-word`, { opacity:0, y:40, scale:0.97 });
      }
      buildWords('imm-q1-text', 'The mat does not care about your past.');
      buildWords('imm-q2-text', 'Technique outlasts strength.');
      buildWords('imm-q3-text', 'Show up. Every time.');
      gsap.set('.imm-qsub', { opacity:0, y:16 });

      // Name reveal
      ScrollTrigger.create({
        trigger: '#imm-name', start: 'top 65%',
        onEnter: () => {
          gsap.to('#imm-name-inner', { opacity:1, duration:0.3 });
          gsap.to('#imm-name-subtitle', { opacity:1, y:0, duration:1.1, ease:'power3.out', delay:0.2 });
          gsap.to('#imm-name-tagline', { opacity:1, y:0, duration:1.1, ease:'power3.out', delay:0.6 });
        }
      });

      // Philosophy: q1 entrance
      ScrollTrigger.create({
        trigger: '#imm-philo-outer', start: 'top 80%',
        onEnter: () => {
          gsap.to('#imm-quote-1', { opacity:1, duration:0.3 });
          gsap.to('#imm-q1-text .imm-word', { opacity:1, y:0, scale:1, duration:0.55, stagger:0.1, ease:'power3.out', delay:0.1 });
          gsap.to('#imm-quote-1 .imm-qsub', { opacity:1, y:0, duration:0.7, ease:'power2.out', delay:0.7 });
        }
      });

      // Philosophy scrub: quotes 2 and 3
      ScrollTrigger.create({
        trigger: '#imm-philo-outer', start: 'top top', end: 'bottom bottom',
        scrub: true,
        onUpdate(self) {
          const p = self.progress;
          const q1 = document.getElementById('imm-quote-1')!;
          const q2 = document.getElementById('imm-quote-2')!;
          const q3 = document.getElementById('imm-quote-3')!;
          if (!q1||!q2||!q3) return;

          const q1o = 1 - clamp((p-0.28)/0.10, 0, 1);
          q1.style.opacity = String(q1o);
          q1.style.transform = `translateY(${(1-q1o)*-28}px)`;

          const q2in  = clamp((p-0.33)/0.13, 0, 1);
          const q2out = clamp((p-0.60)/0.10, 0, 1);
          const q2o   = Math.min(q2in, 1-q2out);
          q2.style.opacity = String(Math.max(0,q2o));
          q2.style.transform = `translateY(${(1-q2in)*28}px)`;
          if (q2in > 0.02) {
            const w2 = q2.querySelectorAll('.imm-word');
            w2.forEach((w,i) => {
              const wp = clamp(q2in*1.6-i*0.13, 0, 1);
              (w as HTMLElement).style.opacity = String(wp*(1-q2out));
              (w as HTMLElement).style.transform = `translateY(${(1-wp)*38}px)`;
            });
            const s2 = q2.querySelector('.imm-qsub') as HTMLElement;
            if (s2) s2.style.opacity = String(clamp(q2in*2-1,0,1)*(1-q2out));
          }

          const q3in = clamp((p-0.66)/0.14, 0, 1);
          q3.style.opacity = String(q3in);
          q3.style.transform = `translateY(${(1-q3in)*28}px)`;
          if (q3in > 0.02) {
            const w3 = q3.querySelectorAll('.imm-word');
            w3.forEach((w,i) => {
              const wp = clamp(q3in*1.8-i*0.14, 0, 1);
              (w as HTMLElement).style.opacity = String(wp);
              (w as HTMLElement).style.transform = `translateY(${(1-wp)*38}px)`;
            });
            const s3 = q3.querySelector('.imm-qsub') as HTMLElement;
            if (s3) s3.style.opacity = String(clamp(q3in*2-1,0,1));
          }
        }
      });

      // Story
      ScrollTrigger.create({
        trigger: '#imm-story', start: 'top 75%',
        onEnter: () => {
          gsap.to('#imm-story-line', { width:'80%', duration:1.8, ease:'power2.out' });
          gsap.to('#imm-story-label', { opacity:1, y:0, duration:0.8, ease:'power2.out', delay:0.3 });
          gsap.to('#imm-story-h', { opacity:1, y:0, duration:1.0, ease:'power3.out', delay:0.5 });
        }
      });
      ['#imm-sp1','#imm-sp2','#imm-sp3'].forEach((sel,i) => {
        ScrollTrigger.create({ trigger: sel, start: 'top 82%',
          onEnter: () => gsap.to(sel, { opacity:1, y:0, duration:0.9, ease:'power3.out', delay:i*0.08 }) });
      });

      function countUp(el: HTMLElement) {
        const target = parseInt(el.dataset.target || '0');
        const suffix = el.dataset.suffix || '';
        const dur = 1200;
        const start = performance.now();
        const tick = (now: number) => {
          const p = Math.min((now-start)/dur, 1);
          const e = 1-Math.pow(1-p,3);
          el.textContent = Math.floor(e*target) + (p>=1?suffix:'');
          if (p<1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      }
      ScrollTrigger.create({
        trigger: '#imm-stats', start: 'top 82%',
        onEnter: () => {
          ['#imm-stat1','#imm-stat2','#imm-stat3'].forEach((sel,i) => {
            gsap.to(sel, { opacity:1, y:0, duration:0.8, ease:'power3.out', delay:i*0.15 });
          });
          document.querySelectorAll<HTMLElement>('#imm-stats .imm-stat-num[data-target]').forEach(el => {
            setTimeout(() => countUp(el), 200);
          });
        }
      });

      // Gym
      ScrollTrigger.create({
        trigger: '#imm-gym-outer', start: 'top 80%',
        onEnter: () => {
          gsap.to('#imm-gym-lbl',     { opacity:1, duration:0.6, delay:0 });
          gsap.to('#imm-gym-h',       { opacity:1, y:0, duration:1.0, ease:'power3.out', delay:0.2 });
          gsap.to('#imm-gym-name',    { opacity:1, duration:0.8, delay:0.5 });
          gsap.to('#imm-gym-details', { opacity:1, y:0, duration:0.8, delay:0.7 });
          ['.imm-sl1','.imm-sl2','.imm-sl3'].forEach((sel,i) => {
            gsap.to(sel, { opacity:1, x:0, duration:0.7, ease:'power3.out', delay:0.9+i*0.15 });
          });
          gsap.to('#imm-map-wrap', { opacity:1, y:0, duration:0.8, delay:1.4 });
        }
      });

      // Call
      ScrollTrigger.create({
        trigger: '#imm-call', start: 'top 76%',
        onEnter: () => {
          gsap.to('#imm-call-h',     { opacity:1, y:0, duration:1.2, ease:'back.out(1.7)', delay:0 });
          gsap.to('#imm-call-sub',   { opacity:1, y:0, duration:0.9, ease:'power2.out', delay:0.5 });
          gsap.to('#imm-cta-btn',    { opacity:1, y:0, duration:0.8, ease:'power2.out', delay:0.9 });
          gsap.to('#imm-call-links', { opacity:1, duration:0.8, delay:1.2 });
        }
      });

      // Initial scroll hint fade-in
      gsap.to('#imm-scroll-hint', { opacity:1, duration:1.5, delay:1.0 });

      // ── CLEANUP RETURN ───────────────────────────────────────────────────────
      return () => {
        disposed = true;
        cancelAnimationFrame(rafId);
        ScrollTrigger.getAll().forEach(st => st.kill());
        renderer.dispose();
        geo.dispose();
        mat.dispose();
        if (!isMobile) window.removeEventListener('mousemove', onMouseMove);
        else window.removeEventListener('touchstart', onTouch);
        window.removeEventListener('scroll', onScroll);
        window.removeEventListener('resize', onResize);
      };
    }

    let cleanupFn: (() => void) | undefined;
    init().then(fn => { if (fn) cleanupFn = fn; });

    return () => {
      disposed = true;
      if (rafId) cancelAnimationFrame(rafId);
      cleanupFn?.();
    };
  }, []);

  // ── JSX ─────────────────────────────────────────────────────────────────────
  return (
    <>
      <style>{styles}</style>

      {/* Cursor */}
      <div id="immersive-cursor" />
      <div id="immersive-cursor-ring" />

      {/* Grain */}
      <div id="immersive-grain" />

      {/* Three.js canvas */}
      <canvas id="imm-canvas" ref={canvasRef} />

      {/* Navigation */}
      <nav id="imm-nav">
        <a href="#" id="imm-nav-logo">LORE</a>
        <ul id="imm-nav-links">
          <li><a href="#imm-philo-outer">Philosophy</a></li>
          <li><a href="#imm-gym-outer">The Gym</a></li>
          <li><a href="#imm-call">Join</a></li>
        </ul>
        <div id="imm-hamburger"
          onClick={() => document.getElementById('imm-mobile-menu')?.classList.add('open')}
        >
          <span/><span/><span/>
        </div>
      </nav>

      {/* Mobile menu */}
      <div id="imm-mobile-menu">
        <span id="imm-mobile-close"
          onClick={() => document.getElementById('imm-mobile-menu')?.classList.remove('open')}
        >CLOSE</span>
        <a href="#imm-philo-outer" onClick={() => document.getElementById('imm-mobile-menu')?.classList.remove('open')}>Philosophy</a>
        <a href="#imm-gym-outer"   onClick={() => document.getElementById('imm-mobile-menu')?.classList.remove('open')}>The Gym</a>
        <a href="#imm-call"        onClick={() => document.getElementById('imm-mobile-menu')?.classList.remove('open')}>Join</a>
      </div>

      {/* ── SCROLL CONTAINER ── */}
      <div id="imm-scroll-container">

        {/* VOID */}
        <section id="imm-void">
          <div id="imm-scroll-hint">
            <span>scroll</span>
            <div id="imm-scroll-line" />
          </div>
        </section>

        {/* NAME */}
        <section id="imm-name">
          <div id="imm-name-inner">
            <div id="imm-name-subtitle">Martial Arts · Antalya</div>
            <div id="imm-name-tagline">Train · Grow · Belong</div>
          </div>
        </section>

        {/* PHILOSOPHY */}
        <section id="imm-philo-outer">
          <div id="imm-philo-inner">
            <div className="imm-quote" id="imm-quote-1">
              <div className="imm-qnum">01</div>
              <div className="imm-qmain" id="imm-q1-text" />
              <div className="imm-qsub">Everyone starts at zero.</div>
            </div>
            <div className="imm-quote" id="imm-quote-2">
              <div className="imm-qnum">02</div>
              <div className="imm-qmain" id="imm-q2-text" />
              <div className="imm-qsub">It is the weapon of the patient.</div>
            </div>
            <div className="imm-quote" id="imm-quote-3">
              <div className="imm-qnum">03</div>
              <div className="imm-qmain" id="imm-q3-text" />
              <div className="imm-qsub">The belt is earned on the floor.</div>
            </div>
          </div>
        </section>

        {/* STORY */}
        <section id="imm-story">
          <div id="imm-story-label">Our Story</div>
          <div id="imm-story-line" />
          <h2 id="imm-story-h">Built from the<br/>ground up.</h2>
          <p className="imm-para" id="imm-sp1">What started in early 2025 as an idea became a home. LORE Martial Arts is Antalya&apos;s dedicated Brazilian Jiu-Jitsu gym.</p>
          <p className="imm-para" id="imm-sp2">We built this from nothing — no franchise, no backing, just belief in the art and the community around it.</p>
          <p className="imm-para" id="imm-sp3">Over a year later, we&apos;re still growing. Every class, every roll, every new face through the door proves this was worth building.</p>
          <div id="imm-stats">
            <div className="imm-stat" id="imm-stat1">
              <span className="imm-stat-num" data-target="1" data-suffix="+">0</span>
              <span className="imm-stat-lbl">Year Strong</span>
            </div>
            <div className="imm-stat" id="imm-stat2">
              <span className="imm-stat-num" data-target="3">0</span>
              <span className="imm-stat-lbl">Days a Week</span>
            </div>
            <div className="imm-stat" id="imm-stat3">
              <span className="imm-stat-num imm-inf">&#8734;</span>
              <span className="imm-stat-lbl">Potential</span>
            </div>
          </div>
        </section>

        {/* GYM */}
        <section id="imm-gym-outer">
          <div id="imm-gym-inner">
            <div id="imm-gym-content">
              <div id="imm-gym-lbl">The Gym</div>
              <h2 id="imm-gym-h">Your new<br/>home mat.</h2>
              <div id="imm-gym-name">LORE Martial Arts</div>
              <div id="imm-gym-details">
                <div className="imm-gym-loc">Lara, Antalya</div>
                <div className="imm-sched">
                  <div className="imm-sched-line imm-sl1">Monday — 20:30</div>
                  <div className="imm-sched-line imm-sl2">Wednesday — 20:30</div>
                  <div className="imm-sched-line imm-sl3">Friday — 20:30</div>
                </div>
                <div className="imm-membership">Monthly membership · Message us for details</div>
                <div id="imm-map-wrap">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3192.566579779895!2d30.752719710375196!3d36.85285497211635!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14c39bf22fcc6ee3%3A0xbe8f56c9580354f0!2sLara%20Judo%20Academy!5e0!3m2!1str!2str!4v1772750789697!5m2!1str!2str"
                    allowFullScreen loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                    title="LORE Martial Arts Location"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CALL */}
        <section id="imm-call">
          <div id="imm-call-h">Ready<br/>to roll?</div>
          <p id="imm-call-sub">Step onto the mat. The first class is the hardest — after that, you belong.</p>
          <a href="https://wa.me/905069770077" className="imm-cta" id="imm-cta-btn" target="_blank" rel="noopener noreferrer">
            Message on WhatsApp
          </a>
          <div id="imm-call-links">
            <a href="https://www.instagram.com/loremartialarts/" target="_blank" rel="noopener noreferrer">@loremartialarts</a>
            <a href="mailto:contact@lorebjj.com">contact@lorebjj.com</a>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="imm-footer">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://fmkglpsfszlkubobcmhg.supabase.co/storage/v1/object/public/site-assets/logo.png" alt="LORE" id="imm-footer-logo" />
          <div className="imm-divider" />
          <div className="imm-foot-contact">
            <a href="tel:+905069770077">0506 977 00 77</a>
            <a href="mailto:contact@lorebjj.com">contact@lorebjj.com</a>
            <a href="https://www.instagram.com/loremartialarts/" target="_blank" rel="noopener noreferrer">@loremartialarts</a>
          </div>
          <div className="imm-foot-sched">Monday · Wednesday · Friday — 20:30</div>
          <span style={{ fontFamily:'Cormorant Garamond,serif', fontSize:'0.9rem', letterSpacing:'0.15em', color:'rgba(237,228,211,0.22)' }}>Lara, Antalya</span>
          <div className="imm-divider" />
          <div className="imm-foot-copy">© 2026 LORE Martial Arts · Antalya, Turkey</div>
          <div className="imm-foot-final">The art lives on the mat.</div>
        </footer>

      </div>
    </>
  );
}
