"use client";

import { useRef, useState, useEffect } from "react";
import { HTMLMotionProps, motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
}

export function MagneticButton({
  children,
  className,
  variant = "primary",
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  // GPU-accelerated MotionValues (Zero React re-renders during mouse movement)
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth easing with small magnetic pull
  const springConfig = { stiffness: 200, damping: 20, mass: 0.1 };
  const smoothX = useSpring(x, springConfig);
  const smoothY = useSpring(y, springConfig);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const timer = setTimeout(() => {
        setIsTouch(window.matchMedia("(pointer: coarse)").matches);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isTouch || typeof window === "undefined") return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current!.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);

    // Small magnetic pull (0.15 instead of 0.2) for subtle Vercel/Linear feel
    x.set(middleX * 0.15);
    y.set(middleY * 0.15);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  const baseStyles =
    "relative rounded-lg px-6 py-3 font-medium transition-colors text-sm shadow-sm magnetic-element will-change-transform transform-gpu focus:outline-none focus:ring-2 focus:ring-cyan-400";
  const variants = {
    primary: "bg-foreground text-background hover:bg-zinc-200",
    ghost: "bg-transparent text-foreground border border-border-default hover:bg-white/5",
  };

  return (
    <motion.button
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      style={{ x: smoothX, y: smoothY }}
      className={cn(baseStyles, variants[variant], className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
