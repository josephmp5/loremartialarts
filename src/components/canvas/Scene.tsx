'use client';

import { Canvas } from '@react-three/fiber';
import { Suspense } from 'react';
import ParticleField from './ParticleField';
import CursorLight from './CursorLight';
import ScrollCamera from './ScrollCamera';

// Skip WebGL entirely on touch/mobile — saves ~500kb bundle + GPU work
const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

export default function Scene() {
  if (isTouch) return null;
  return (
    <Canvas
      camera={{ position: [0, 2, 50], fov: 60 }}
      dpr={[1, 1.5]}
      gl={{ antialias: false, alpha: false }}
      style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100vh', zIndex: 0, pointerEvents: 'none' }}
    >
      <color attach="background" args={['#000000']} />
      <fog attach="fog" args={['#000000', 35, 90]} />
      <Suspense fallback={null}>
        <ParticleField />
        <CursorLight />
        <ScrollCamera />
      </Suspense>
    </Canvas>
  );
}
