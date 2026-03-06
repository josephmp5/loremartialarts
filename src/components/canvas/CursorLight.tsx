'use client';

import { useRef, useEffect, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useImmersiveStore } from '@/store/immersive';

export default function CursorLight() {
  const lightRef = useRef<THREE.PointLight>(null);
  const [hasPointer, setHasPointer] = useState(false);
  useEffect(() => { setHasPointer(window.matchMedia('(pointer: fine)').matches); }, []);
  useFrame(() => {
    if (!lightRef.current || !hasPointer) return;
    const { cursor } = useImmersiveStore.getState();
    lightRef.current.position.x += (cursor.x * 14 - lightRef.current.position.x) * 0.15;
    lightRef.current.position.y += (cursor.y * 8  - lightRef.current.position.y) * 0.15;
  });
  if (!hasPointer) return null;
  return <pointLight ref={lightRef} color={0xC4A35A} intensity={0.9} distance={18} position={[0, 0, 12]} />;
}
