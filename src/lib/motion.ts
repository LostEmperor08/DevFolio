import { Variants } from "framer-motion";
/**
 * Motion Presets
 * 
 * Purpose: Standardizes all Framer Motion animations across the application.
 * Usage: Pass these variants to motion.div elements to guarantee consistent physics.
 * Dependencies: framer-motion, designTokens.
 * Expected inputs: None (static presets).
 * Expected outputs: Framer motion variant objects.
 */
import { designTokens } from "./design";

export const motionPresets = {
  fadeUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
    transition: { duration: designTokens.animation.duration.slow, ease: designTokens.animation.ease.outExpo },
  } as const,
  
  scaleIn: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
    transition: { duration: designTokens.animation.duration.normal, ease: designTokens.animation.ease.outExpo },
  } as const,

  slideReveal: {
    initial: { opacity: 0, x: -30 },
    whileInView: { opacity: 1, x: 0 },
    viewport: { once: true, margin: "-100px" },
    transition: { duration: designTokens.animation.duration.slow, ease: designTokens.animation.ease.outExpo },
  } as const,

  cardHover: {
    whileHover: { scale: 1.02, y: -4 },
    transition: designTokens.animation.spring.standard,
  } as const,

  magneticHover: (x: number, y: number) => ({
    animate: { x, y },
    transition: designTokens.animation.spring.bouncy,
  }),
  
  staggerChildren: (staggerTime = 0.1): Variants => ({
    initial: {},
    animate: {
      transition: {
        staggerChildren: staggerTime,
      },
    },
  }),

  pageTransition: {
    initial: { opacity: 0, filter: "blur(10px)" },
    animate: { opacity: 1, filter: "blur(0px)" },
    exit: { opacity: 0, filter: "blur(10px)" },
    transition: { duration: designTokens.animation.duration.slow, ease: designTokens.animation.ease.inOutExpo },
  } as const,
};
