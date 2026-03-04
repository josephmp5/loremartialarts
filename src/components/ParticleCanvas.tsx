'use client';
import { useRef, useEffect } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  tx: number;
  ty: number;
  size: number;
  alpha: number;
  delay: number;
}

const GOLD = '196, 146, 42';

function buildFigurePoints(w: number, h: number): Array<{ x: number; y: number }> {
  const off = document.createElement('canvas');
  off.width = w;
  off.height = h;
  const ctx = off.getContext('2d');
  if (!ctx) return [];

  const cx = w / 2;
  const figH = h * 0.70;
  const figTop = h * 0.10;

  ctx.fillStyle = '#fff';

  // Head
  ctx.beginPath();
  ctx.arc(cx, figTop + figH * 0.062, figH * 0.055, 0, Math.PI * 2);
  ctx.fill();

  // Neck
  ctx.fillRect(cx - figH * 0.026, figTop + figH * 0.115, figH * 0.052, figH * 0.058);

  // Gi torso
  ctx.beginPath();
  ctx.moveTo(cx - figH * 0.185, figTop + figH * 0.175);
  ctx.lineTo(cx + figH * 0.185, figTop + figH * 0.175);
  ctx.lineTo(cx + figH * 0.145, figTop + figH * 0.500);
  ctx.lineTo(cx - figH * 0.145, figTop + figH * 0.500);
  ctx.closePath();
  ctx.fill();

  // V-collar cutout (black)
  ctx.fillStyle = '#000';
  ctx.beginPath();
  ctx.moveTo(cx, figTop + figH * 0.215);
  ctx.lineTo(cx - figH * 0.072, figTop + figH * 0.175);
  ctx.lineTo(cx + figH * 0.072, figTop + figH * 0.175);
  ctx.closePath();
  ctx.fill();

  // Belt
  ctx.fillStyle = '#fff';
  ctx.fillRect(cx - figH * 0.150, figTop + figH * 0.478, figH * 0.300, figH * 0.040);

  // Belt knot
  ctx.beginPath();
  ctx.arc(cx, figTop + figH * 0.498, figH * 0.026, 0, Math.PI * 2);
  ctx.fill();

  // Left arm
  ctx.beginPath();
  ctx.moveTo(cx - figH * 0.185, figTop + figH * 0.175);
  ctx.lineTo(cx - figH * 0.275, figTop + figH * 0.235);
  ctx.lineTo(cx - figH * 0.215, figTop + figH * 0.455);
  ctx.lineTo(cx - figH * 0.130, figTop + figH * 0.455);
  ctx.lineTo(cx - figH * 0.142, figTop + figH * 0.218);
  ctx.closePath();
  ctx.fill();

  // Right arm
  ctx.beginPath();
  ctx.moveTo(cx + figH * 0.185, figTop + figH * 0.175);
  ctx.lineTo(cx + figH * 0.275, figTop + figH * 0.235);
  ctx.lineTo(cx + figH * 0.215, figTop + figH * 0.455);
  ctx.lineTo(cx + figH * 0.130, figTop + figH * 0.455);
  ctx.lineTo(cx + figH * 0.142, figTop + figH * 0.218);
  ctx.closePath();
  ctx.fill();

  // Left leg
  ctx.beginPath();
  ctx.moveTo(cx - figH * 0.150, figTop + figH * 0.518);
  ctx.lineTo(cx - figH * 0.018, figTop + figH * 0.518);
  ctx.lineTo(cx - figH * 0.038, figTop + figH * 0.875);
  ctx.lineTo(cx - figH * 0.168, figTop + figH * 0.875);
  ctx.closePath();
  ctx.fill();

  // Right leg
  ctx.beginPath();
  ctx.moveTo(cx + figH * 0.018, figTop + figH * 0.518);
  ctx.lineTo(cx + figH * 0.150, figTop + figH * 0.518);
  ctx.lineTo(cx + figH * 0.168, figTop + figH * 0.875);
  ctx.lineTo(cx + figH * 0.038, figTop + figH * 0.875);
  ctx.closePath();
  ctx.fill();

  // Sample points from the silhouette
  const imgData = ctx.getImageData(0, 0, w, h);
  const pts: Array<{ x: number; y: number }> = [];
  const step = Math.max(3, Math.floor(w / 400)); // adaptive step for perf
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      if (imgData.data[(y * w + x) * 4] > 128) {
        pts.push({ x, y });
      }
    }
  }
  return pts;
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let startTime = 0;
    let particles: Particle[] = [];
    const COUNT = window.innerWidth < 768 ? 900 : 1600;

    const init = () => {
      canvas.width = canvas.offsetWidth || window.innerWidth;
      canvas.height = canvas.offsetHeight || window.innerHeight;

      const pts = buildFigurePoints(canvas.width, canvas.height);
      if (!pts.length) return;

      particles = Array.from({ length: COUNT }, () => {
        const t = pts[Math.floor(Math.random() * pts.length)];
        return {
          x: (Math.random() - 0.5) * canvas.width * 2 + canvas.width / 2,
          y: Math.random() * canvas.height * 0.4 - canvas.height * 0.5,
          vx: (Math.random() - 0.5) * 1.5,
          vy: Math.random() * 1.2 + 0.3,
          tx: t.x,
          ty: t.y,
          size: Math.random() * 1.3 + 0.3,
          alpha: Math.random() * 0.45 + 0.55,
          delay: Math.random() * 2.8,
        };
      });
      startTime = 0;
    };

    const draw = (now: number) => {
      if (!startTime) startTime = now;
      const elapsed = (now - startTime) / 1000;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        const t = Math.max(0, elapsed - p.delay);
        const strength = Math.min(1, t * 0.5);
        const assembled = Math.min(1, Math.max(0, t - 1.2));
        const breathe =
          Math.sin(elapsed * 0.65 + p.tx * 0.009) *
          2.8 *
          assembled *
          (p.ty / canvas.height); // lower body breathes more

        const xtarget =
          p.tx + Math.sin(elapsed * 0.38 + p.ty * 0.011) * breathe * 0.35;
        const ytarget = p.ty + breathe;

        p.vx += (xtarget - p.x) * 0.055 * strength;
        p.vy += (ytarget - p.y) * 0.055 * strength;
        p.vx *= 0.87;
        p.vy *= 0.87;
        p.x += p.vx;
        p.y += p.vy;

        const a = p.alpha * Math.min(1, t * 0.65);
        if (a < 0.01) continue;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${GOLD},${a.toFixed(2)})`;
        ctx.fill();
      }

      animId = requestAnimationFrame(draw);
    };

    init();
    animId = requestAnimationFrame(draw);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(init, 320);
    };
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(resizeTimer);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
    />
  );
}
