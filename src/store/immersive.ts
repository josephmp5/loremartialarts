import { create } from 'zustand';

type ParticleMode = 'normal' | 'condensing';

interface ImmersiveStore {
  scrollProgress: number;
  particleMode: ParticleMode;
  cursor: { x: number; y: number };
  setScrollProgress: (v: number) => void;
  setParticleMode: (v: ParticleMode) => void;
  setCursor: (v: { x: number; y: number }) => void;
}

export const useImmersiveStore = create<ImmersiveStore>((set) => ({
  scrollProgress: 0,
  particleMode: 'normal',
  cursor: { x: 0, y: 0 },
  setScrollProgress: (v) => set({ scrollProgress: v }),
  setParticleMode: (v) => set({ particleMode: v }),
  setCursor: (v) => set({ cursor: v }),
}));
