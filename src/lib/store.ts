/**
 * Global State Store
 * 
 * Purpose: Manages global states (Command Palette, Sound settings) across all components.
 * Usage: Use the useAppStore hook inside any client component.
 * Dependencies: zustand.
 * Expected inputs: Zustand setters.
 * Expected outputs: Global state values and mutators.
 */
import { create } from 'zustand';

interface AppState {
  soundEnabled: boolean;
  toggleSound: () => void;
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  isLoaded: boolean;
  setLoaded: () => void;
}

export const useAppStore = create<AppState>((set) => ({
  soundEnabled: false, // Default to false to prevent unexpected noise
  toggleSound: () => set((state) => ({ soundEnabled: !state.soundEnabled })),
  commandPaletteOpen: false,
  setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
  isLoaded: false,
  setLoaded: () => set({ isLoaded: true }),
}));
