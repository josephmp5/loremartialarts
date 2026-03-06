'use client';

import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import { useImmersiveStore } from '@/store/immersive';

export default function ScrollCamera() {
  const { camera } = useThree();
  const targetRef = useRef({ x: 0, y: 2, z: 50 });

  useFrame(() => {
    const { scrollProgress, cursor } = useImmersiveStore.getState();

    // Camera moves through particle field as page scrolls
    targetRef.current.x = cursor.x * 0.5;
    targetRef.current.y = 2 - scrollProgress * 4;
    targetRef.current.z = 50 - scrollProgress * 100;

    // Smooth lerp to target
    camera.position.x += (targetRef.current.x - camera.position.x) * 0.05;
    camera.position.y += (targetRef.current.y - camera.position.y) * 0.04;
    camera.position.z += (targetRef.current.z - camera.position.z) * 0.04;
    camera.lookAt(
      camera.position.x * 0.1,
      camera.position.y * 0.1,
      0
    );
  });

  return null;
}
