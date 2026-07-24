"use client";

import { useEffect, useRef } from "react";
import { useAppStore } from "@/lib/store";

export function SoundEffectManager() {
  const { soundEnabled } = useAppStore();
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    if (!soundEnabled) return;

    // Initialize Audio Context on first user interaction when sound is enabled
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }

    const playHoverTick = () => {
      if (!audioCtxRef.current || !soundEnabled) return;
      if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      // High pitch short tick
      osc.type = "sine";
      osc.frequency.setValueAtTime(1200, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(600, ctx.currentTime + 0.05);

      gainNode.gain.setValueAtTime(0.02, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.05);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    };

    const playClickPop = () => {
      if (!audioCtxRef.current || !soundEnabled) return;
      if (audioCtxRef.current.state === 'suspended') {
          audioCtxRef.current.resume();
      }
      const ctx = audioCtxRef.current;
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();

      osc.type = "triangle";
      osc.frequency.setValueAtTime(300, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(100, ctx.currentTime + 0.1);

      gainNode.gain.setValueAtTime(0.05, ctx.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);

      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    }

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a") || target.closest("[role='button']") || target.closest(".glass-panel")) {
        playHoverTick();
      }
    };

    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest("button") || target.closest("a") || target.closest("[role='button']")) {
        playClickPop();
      }
    }

    // Use capture phase to catch all interactions
    document.addEventListener("mouseenter", handleHover, true);
    document.addEventListener("click", handleClick, true);
    
    return () => {
      document.removeEventListener("mouseenter", handleHover, true);
      document.removeEventListener("click", handleClick, true);
    };
  }, [soundEnabled]);

  return null;
}
