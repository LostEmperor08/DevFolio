"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CursorGlow() {
  const [isTouch, setIsTouch] = useState(true); // Default true to avoid SSR mobile overhead
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 200, damping: 30, mass: 0.5 };
  const springX = useSpring(mouseX, springConfig);
  const springY = useSpring(mouseY, springConfig);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const timer = setTimeout(() => setIsTouch(isCoarse), 0);
      if (isCoarse) {
        return () => clearTimeout(timer);
      }
    }

    let rafId: number;
    const handleMouseMove = (e: MouseEvent) => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        // Offset by half the width/height (200px) to center the glow
        mouseX.set(e.clientX - 200);
        mouseY.set(e.clientY - 200);
      });
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  if (isTouch) return null;

  return (
    <motion.div
      className="pointer-events-none fixed top-0 left-0 z-[-1] hidden h-[400px] w-[400px] transform-gpu rounded-full opacity-25 mix-blend-screen blur-[80px] will-change-transform md:block"
      style={{
        background:
          "radial-gradient(circle, rgba(6,182,212,0.6) 0%, rgba(139,92,246,0.25) 40%, rgba(0,0,0,0) 70%)",
        x: springX,
        y: springY,
      }}
    />
  );
}
