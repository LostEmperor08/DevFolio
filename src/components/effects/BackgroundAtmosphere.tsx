"use client";

import { useEffect, useState } from "react";
import { SakuraCanvas } from "./SakuraCanvas";
import { usePersona } from "@/context/PersonaContext";

export function BackgroundAtmosphere() {
  const { persona } = usePersona();
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({
    x: -1000,
    y: -1000,
  });
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    let targetX = -1000;
    let targetY = -1000;
    let currentX = -1000;
    let currentY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      if (!isHovered) setIsHovered(true);
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      targetX = -1000;
      targetY = -1000;
    };

    const updateSpotlight = () => {
      currentX += (targetX - currentX) * 0.15;
      currentY += (targetY - currentY) * 0.15;
      setMousePos({ x: Math.round(currentX), y: Math.round(currentY) });
      animationFrameId = requestAnimationFrame(updateSpotlight);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave);
    animationFrameId = requestAnimationFrame(updateSpotlight);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isHovered]);

  const isCrimson = persona === "crimson";

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden select-none transition-colors duration-700"
    >
      {/* 1. Deep Background Base */}
      <div className="absolute inset-0 bg-[#060608]" />

      {/* 2. Top Nebula Aurora Spotlight */}
      <div
        className="absolute -top-40 left-1/2 -translate-x-1/2 w-[1000px] h-[550px] opacity-80 blur-3xl pointer-events-none transition-all duration-700"
        style={{
          background: isCrimson
            ? "radial-gradient(ellipse 65% 55% at 50% 20%, rgba(239, 68, 68, 0.18), rgba(153, 27, 27, 0.08) 45%, transparent 75%)"
            : "radial-gradient(ellipse 65% 55% at 50% 20%, rgba(147, 197, 253, 0.18), rgba(99, 102, 241, 0.08) 45%, transparent 75%)",
        }}
      />

      {/* 3. Secondary Ambient Accent Glow */}
      <div
        className="absolute -bottom-32 -right-32 w-[650px] h-[650px] opacity-40 blur-3xl pointer-events-none transition-all duration-700"
        style={{
          background: isCrimson
            ? "radial-gradient(circle 50% at 50% 50%, rgba(185, 28, 28, 0.12), transparent 70%)"
            : "radial-gradient(circle 50% at 50% 50%, rgba(99, 102, 241, 0.12), transparent 70%)",
        }}
      />

      {/* 4. Architectural Blueprint Dot-Matrix Grid with Soft Radial Mask */}
      <div
        className="absolute inset-0 opacity-40 transition-opacity duration-700"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, rgba(0,0,0,0.4) 60%, transparent 100%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 70% at 50% 30%, black 20%, rgba(0,0,0,0.4) 60%, transparent 100%)",
        }}
      />

      {/* 5. Interactive Flashlight / Mouse Spotlight */}
      {isHovered && mousePos.x > 0 && (
        <div
          className="absolute inset-0 transition-opacity duration-300"
          style={{
            background: isCrimson
              ? `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(239, 68, 68, 0.075), transparent 60%)`
              : `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(147, 197, 253, 0.075), transparent 60%)`,
          }}
        />
      )}

      {/* 6. Subtle Noise Texture Overlay */}
      <div
        className="absolute inset-0 opacity-[0.025] mix-blend-screen pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* 7. Interactive Physics Sakura & Ember Particles */}
      <SakuraCanvas />
    </div>
  );
}
