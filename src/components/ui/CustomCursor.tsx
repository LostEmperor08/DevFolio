"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isTouch, setIsTouch] = useState(true); // Default true to prevent SSR flicker / unwanted hiding on mobile
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // High-performance MotionValues (zero React re-renders on mousemove)
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // Extremely responsive spring for buttery 60fps tracking without lag or jitter
  const springConfig = { stiffness: 1000, damping: 50, mass: 0.1 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);

  useEffect(() => {
    // 1. Detect coarse pointers / touch devices (Android, iPhone, iPad, tablets)
    if (typeof window !== "undefined") {
      const isCoarse = window.matchMedia("(pointer: coarse)").matches;
      const timer = setTimeout(() => setIsTouch(isCoarse), 0);
      if (isCoarse) {
        return () => clearTimeout(timer);
      }
    }

    // 2. Hide default OS cursor only on desktop fine-pointer devices
    document.body.style.cursor = "none";

    let rafId: number;
    let latestX = -100;
    let latestY = -100;

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      latestX = e.clientX;
      latestY = e.clientY;

      // Use requestAnimationFrame for 60fps GPU sync without event flooding
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        cursorX.set(latestX);
        cursorY.set(latestY);
      });
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;
      const isInteractive =
        target.tagName.toLowerCase() === "button" ||
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "input" ||
        target.tagName.toLowerCase() === "textarea" ||
        target.closest("button") !== null ||
        target.closest("a") !== null ||
        target.closest("[role='button']") !== null ||
        target.classList.contains("magnetic-element");

      setIsHovering(isInteractive);
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mouseover", onMouseOver, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);

    return () => {
      document.body.style.cursor = "auto";
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      document.removeEventListener("mouseleave", onMouseLeave);
    };
  }, [isVisible, cursorX, cursorY]);

  // Completely disable rendering on touch/coarse devices
  if (isTouch || !isVisible) return null;

  return (
    <motion.div
      style={{
        x: smoothX,
        y: smoothY,
        translateX: "-50%",
        translateY: "-50%",
      }}
      className="pointer-events-none fixed top-0 left-0 z-[9999] hidden transform-gpu items-center justify-center rounded-full border border-white/40 bg-white/10 backdrop-blur-[2px] will-change-transform md:flex"
      animate={{
        width: isHovering ? 36 : 20,
        height: isHovering ? 36 : 20,
        borderColor: isHovering ? "rgba(6, 182, 212, 0.8)" : "rgba(255, 255, 255, 0.3)",
        backgroundColor: isHovering ? "rgba(6, 182, 212, 0.15)" : "rgba(255, 255, 255, 0.05)",
      }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      <motion.div
        className="rounded-full bg-white"
        animate={{
          width: isHovering ? 4 : 5,
          height: isHovering ? 4 : 5,
          opacity: isHovering ? 0.6 : 1,
        }}
        transition={{ duration: 0.15 }}
      />
    </motion.div>
  );
}
