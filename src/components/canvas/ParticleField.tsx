'use client';

import { useRef, useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useImmersiveStore } from '@/store/immersive';

const PARTICLE_COUNT = typeof window !== 'undefined'
  ? (window.matchMedia('(pointer: coarse)').matches ? 800 : 2200)
  : 1200;

const VERTEX_SHADER = `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  uniform float uPixelRatio;
  void main() {
    vColor = aColor;
    vec4 mvp = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = clamp(aSize * uPixelRatio * (200.0 / -mvp.z), 0.5, 8.0);
    gl_Position = projectionMatrix * mvp;
  }
`;

const FRAGMENT_SHADER = `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float a = 1.0 - smoothstep(0.2, 0.5, d);
    gl_FragColor = vec4(vColor, a * 0.88);
  }
`;

const LOGO_URL = 'https://fmkglpsfszlkubobcmhg.supabase.co/storage/v1/object/public/site-assets/logo.png';

const GOLD = [
  new THREE.Color(0xC4A35A), new THREE.Color(0xB8963E),
  new THREE.Color(0xD4C5A0), new THREE.Color(0xE2D4A8),
  new THREE.Color(0x9A7D32),
];

export default function ParticleField() {
  const N = PARTICLE_COUNT;
  const posAttrRef = useRef<THREE.BufferAttribute>(null);
  const logoTargetsRef = useRef<Float32Array>(new Float32Array(N * 3));

  // Load logo and sample its pixels for particle targets
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const maxDim = 220;
      const scale = maxDim / Math.max(img.width, img.height);
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const oc = document.createElement('canvas');
      oc.width = w; oc.height = h;
      const ctx = oc.getContext('2d')!;
      ctx.drawImage(img, 0, 0, w, h);
      let data: Uint8ClampedArray;
      try {
        data = ctx.getImageData(0, 0, w, h).data;
      } catch {
        // CORS blocked — leave targets at zero (particles float freely)
        return;
      }
      const pts: [number, number][] = [];
      for (let y = 0; y < h; y += 2) {
        for (let x = 0; x < w; x += 2) {
          const i = (y * w + x) * 4;
          const a = data[i + 3];
          const r = data[i], g = data[i + 1], b = data[i + 2];
          // Sample dark (logo ink) or bright pixels depending on logo style
          if (a > 80 && (r < 180 || g < 180 || b < 180)) {
            pts.push([x, y]);
          }
        }
      }
      // Fallback: sample any non-transparent pixel
      if (pts.length < 50) {
        for (let y = 0; y < h; y += 2) {
          for (let x = 0; x < w; x += 2) {
            const i = (y * w + x) * 4;
            if (data[i + 3] > 80) pts.push([x, y]);
          }
        }
      }
      if (pts.length === 0) return;
      const targets = new Float32Array(N * 3);
      const step = Math.max(1, Math.floor(pts.length / N));
      const aspectRatio = h / w;
      for (let i = 0; i < N; i++) {
        const [px, py] = pts[(i * step) % pts.length];
        targets[i * 3]     = (px - w / 2) / w * 13;
        targets[i * 3 + 1] = -(py - h / 2) / w * 13;  // use w for both to preserve aspect
        targets[i * 3 + 2] = 0;
      }
      logoTargetsRef.current = targets;
    };
    img.onerror = () => {
      // CORS or network failure — use text fallback
      const oc = document.createElement('canvas');
      oc.width = 512; oc.height = 128;
      const ctx = oc.getContext('2d')!;
      ctx.fillStyle = '#fff';
      ctx.font = 'bold 90px Arial Black, Arial, sans-serif';
      ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
      ctx.fillText('LORE', 256, 64);
      const data = ctx.getImageData(0, 0, 512, 128).data;
      const pts: [number, number][] = [];
      for (let y = 0; y < 128; y += 2)
        for (let x = 0; x < 512; x += 2)
          if (data[(y * 512 + x) * 4 + 3] > 120) pts.push([x, y]);
      const targets = new Float32Array(N * 3);
      const step = Math.max(1, Math.floor(pts.length / N));
      for (let i = 0; i < N; i++) {
        const [px, py] = pts[(i * step) % pts.length] ?? [256, 64];
        targets[i * 3]     = (px - 256) * 0.056;
        targets[i * 3 + 1] = -(py - 64) * 0.056;
        targets[i * 3 + 2] = 0;
      }
      logoTargetsRef.current = targets;
    };
    img.src = LOGO_URL;
  }, [N]);

  const naturalPos  = useMemo(() => new Float32Array(N * 3), [N]);
  const velocities  = useMemo(() => new Float32Array(N * 3), [N]);
  const phases      = useMemo(() => new Float32Array(N * 4), [N]);

  const { positions, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(N * 3);
    const colors    = new Float32Array(N * 3);
    const sizes     = new Float32Array(N);
    for (let i = 0; i < N; i++) {
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 120;
      positions[i*3]=x; positions[i*3+1]=y; positions[i*3+2]=z;
      naturalPos[i*3]=x; naturalPos[i*3+1]=y; naturalPos[i*3+2]=z;
      const c = GOLD[Math.floor(Math.random() * GOLD.length)];
      colors[i*3]=c.r; colors[i*3+1]=c.g; colors[i*3+2]=c.b;
      sizes[i] = 1.5 + Math.random() * 1.5;
      phases[i*4]   = Math.random() * Math.PI * 2;
      phases[i*4+1] = Math.random() * Math.PI * 2;
      phases[i*4+2] = 0.2 + Math.random() * 0.4;
      phases[i*4+3] = 0.5 + Math.random() * 1.5;
    }
    return { positions, colors, sizes };
  }, [N, naturalPos, phases]);

  const uniforms = useMemo(() => ({
    uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 }
  }), []);

  useFrame(({ clock }) => {
    const pa = posAttrRef.current;
    if (!pa) return;
    const pos = pa.array as Float32Array;
    const t   = clock.getElapsedTime();
    const { convergenceProgress, heroPhase, cursor, particleMode, scrollProgress } = useImmersiveStore.getState();
    const loreTargets = logoTargetsRef.current;

    const hasPointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
    const cx3D = cursor.x * 14, cy3D = cursor.y * 8;
    const repR = 3.5, repStr = 0.5, spring = 0.028, damp = 0.88;

    const philoProgress = Math.max(0, Math.min(1, (scrollProgress - 1/6) / (1.8/6)));
    const breathe = 1 + 0.04 * Math.sin(philoProgress * Math.PI * 6 + t * 0.5);
    const condenseFactor = particleMode === 'condensing' ? 0.22 : 1;

    for (let i = 0; i < N; i++) {
      const ix = i*3, iy = ix+1, iz = ix+2;
      const px = phases[i*4], py = phases[i*4+1], spd = phases[i*4+2], amp = phases[i*4+3];

      const hx = naturalPos[ix]   + Math.sin(t * spd + px) * amp * condenseFactor;
      const hy = naturalPos[iy]   + Math.cos(t * spd * 0.7 + py) * amp * 0.5 * condenseFactor;
      const hz = naturalPos[iz];

      let tx: number, ty: number, tz: number;

      if (heroPhase === 'converging' || heroPhase === 'holding') {
        const cp = Math.min(convergenceProgress, 1);
        const e  = cp < 0.5 ? 2*cp*cp : -1+(4-2*cp)*cp;
        tx = hx + (loreTargets[ix] - hx) * e;
        ty = hy + (loreTargets[iy] - hy) * e;
        tz = hz + (loreTargets[iz] - hz) * e;
      } else if (heroPhase === 'dispersing') {
        const dp = Math.min(convergenceProgress, 1);
        const e  = 1 - Math.pow(1 - dp, 3);
        tx = loreTargets[ix] + (hx - loreTargets[ix]) * e;
        ty = loreTargets[iy] + (hy - loreTargets[iy]) * e;
        tz = loreTargets[iz] + (hz - loreTargets[iz]) * e;
      } else {
        tx = hx; ty = hy; tz = hz;
      }

      tx *= breathe; ty *= breathe;

      velocities[ix] = velocities[ix]*damp + (tx - pos[ix])*spring;
      velocities[iy] = velocities[iy]*damp + (ty - pos[iy])*spring;
      velocities[iz] = velocities[iz]*damp + (tz - pos[iz])*spring;

      if (hasPointer) {
        const dx=cx3D-pos[ix], dy=cy3D-pos[iy], dz=12-pos[iz];
        const dist = Math.sqrt(dx*dx+dy*dy+dz*dz);
        if (dist < repR && dist > 0.01) {
          const f = ((repR-dist)/repR)*repStr;
          velocities[ix] -= (dx/dist)*f;
          velocities[iy] -= (dy/dist)*f;
          velocities[iz] -= (dz/dist)*f;
        }
      }

      pos[ix] += velocities[ix]; pos[iy] += velocities[iy]; pos[iz] += velocities[iz];
    }
    pa.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute ref={posAttrRef} attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aColor" args={[colors, 3]} />
        <bufferAttribute attach="attributes-aSize"  args={[sizes,  1]} />
      </bufferGeometry>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={VERTEX_SHADER}
        fragmentShader={FRAGMENT_SHADER}
        transparent depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
