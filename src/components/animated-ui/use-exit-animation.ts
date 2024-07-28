import { create } from "zustand";

interface ExitAnimationState {
  isVisible: boolean;
  show: () => void;
  hide: () => void;
}

export const useExitAnimation = create<ExitAnimationState>((set) => ({
  isVisible: false,
  show: () => set({ isVisible: true }),
  hide: () => set({ isVisible: false }),
}));
