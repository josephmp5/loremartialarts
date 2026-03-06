'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useImmersiveStore } from '@/store/immersive';

// Lean counts — enough for visual richness, not enough to kill frame rate
const PARTICLE_COUNT = typeof window !== 'undefined'
  ? (window.matchMedia('(pointer: coarse)').matches ? 400 : 1000)
  : 600;

const VERTEX_SHADER = `
  attribute float aSize;
  attribute vec3 aColor;
  varying vec3 vColor;
  uniform float uPixelRatio;
  void main() {
    vColor = aColor;
    vec4 mvp = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = clamp(aSize * uPixelRatio * (200.0 / -mvp.z), 0.5, 7.0);
    gl_Position = projectionMatrix * mvp;
  }
`;

const FRAGMENT_SHADER = `
  varying vec3 vColor;
  void main() {
    float d = length(gl_PointCoord - vec2(0.5));
    if (d > 0.5) discard;
    float a = 1.0 - smoothstep(0.2, 0.5, d);
    gl_FragColor = vec4(vColor, a * 0.85);
  }
`;

const GOLD = [
  new THREE.Color(0xC4A35A), new THREE.Color(0xB8963E),
  new THREE.Color(0xD4C5A0), new THREE.Color(0xE2D4A8),
  new THREE.Color(0x9A7D32),
];

export default function ParticleField() {
  const N = PARTICLE_COUNT;
  const posRef = useRef<THREE.BufferAttribute>(null);

  // All particle data pre-computed — no allocation in the hot loop
  const { positions, colors, sizes, naturalX, naturalY, naturalZ, phaseX, phaseY, speed, amp } = useMemo(() => {
    const positions = new Float32Array(N * 3);
    const colors    = new Float32Array(N * 3);
    const sizes     = new Float32Array(N);
    const naturalX  = new Float32Array(N);
    const naturalY  = new Float32Array(N);
    const naturalZ  = new Float32Array(N);
    const phaseX    = new Float32Array(N);
    const phaseY    = new Float32Array(N);
    const speed     = new Float32Array(N);
    const amp       = new Float32Array(N);

    for (let i = 0; i < N; i++) {
      const x = (Math.random() - 0.5) * 80;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 120;
      positions[i*3] = x; positions[i*3+1] = y; positions[i*3+2] = z;
      naturalX[i] = x; naturalY[i] = y; naturalZ[i] = z;
      phaseX[i] = Math.random() * Math.PI * 2;
      phaseY[i] = Math.random() * Math.PI * 2;
      speed[i]  = 0.18 + Math.random() * 0.35;
      amp[i]    = 0.4  + Math.random() * 1.2;
      const c = GOLD[Math.floor(Math.random() * GOLD.length)];
      colors[i*3] = c.r; colors[i*3+1] = c.g; colors[i*3+2] = c.b;
      sizes[i] = 1.5 + Math.random() * 1.5;
    }
    return { positions, colors, sizes, naturalX, naturalY, naturalZ, phaseX, phaseY, speed, amp };
  }, [N]);

  const uniforms = useMemo(() => ({
    uPixelRatio: { value: typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1 }
  }), []);

  // Cursor repulsion — only on desktop with a fine pointer
  const hasPointer = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches;
  const repelX = useRef(new Float32Array(N));
  const repelY = useRef(new Float32Array(N));

  useFrame(({ clock }) => {
    const pa = posRef.current;
    if (!pa) return;
    const pos = pa.array as Float32Array;
    const t   = clock.getElapsedTime();
    const { cursor, particleMode } = useImmersiveStore.getState();

    const condensed = particleMode === 'condensing';
    const cx3D = cursor.x * 12;
    const cy3D = cursor.y * 7;
    const repR  = 3.0;
    const repStr = 0.4;
    const repDecay = 0.92; // how fast repulsion displacement decays

    for (let i = 0; i < N; i++) {
      const ix = i * 3, iy = ix + 1, iz = ix + 2;

      // Direct sine drift — no spring, no velocity array, just math
      const scale = condensed ? 0.2 : 1.0;
      const nx = naturalX[i] + Math.sin(t * speed[i] + phaseX[i]) * amp[i] * scale;
      const ny = naturalY[i] + Math.cos(t * speed[i] * 0.7 + phaseY[i]) * amp[i] * 0.5 * scale;
      const nz = naturalZ[i];

      // Cursor repulsion — decay previous displacement and add new push
      if (hasPointer) {
        const dx = cx3D - (nx + repelX.current[i]);
        const dy = cy3D - (ny + repelY.current[i]);
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < repR && dist > 0.01) {
          const f = ((repR - dist) / repR) * repStr;
          repelX.current[i] -= (dx / dist) * f;
          repelY.current[i] -= (dy / dist) * f;
        }
        repelX.current[i] *= repDecay;
        repelY.current[i] *= repDecay;
      }

      pos[ix] = nx + repelX.current[i];
      pos[iy] = ny + repelY.current[i];
      pos[iz] = nz;
    }
    pa.needsUpdate = true;
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute ref={posRef} attach="attributes-position" args={[positions, 3]} />
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
