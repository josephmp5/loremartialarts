import { create } from 'zustand';

type HeroPhase = 'idle' | 'converging' | 'holding' | 'dispersing';
type ParticleMode = 'normal' | 'condensing';

interface ImmersiveStore {
  scrollProgress: number;
  convergenceProgress: number;
  heroPhase: HeroPhase;
  particleMode: ParticleMode;
  cursor: { x: number; y: number };
  setScrollProgress: (v: number) => void;
  setConvergenceProgress: (v: number) => void;
  setHeroPhase: (v: HeroPhase) => void;
  setParticleMode: (v: ParticleMode) => void;
  setCursor: (v: { x: number; y: number }) => void;
}

export const useImmersiveStore = create<ImmersiveStore>((set) => ({
  scrollProgress: 0,
  convergenceProgress: 0,
  heroPhase: 'idle',
  particleMode: 'normal',
  cursor: { x: 0, y: 0 },
  setScrollProgress: (v) => set({ scrollProgress: v }),
  setConvergenceProgress: (v) => set({ convergenceProgress: v }),
  setHeroPhase: (v) => set({ heroPhase: v }),
  setParticleMode: (v) => set({ particleMode: v }),
  setCursor: (v) => set({ cursor: v }),
}));
