/**
 * Design Tokens
 * 
 * Purpose: Centralizes all visual properties (spacing, colors, easing, blurs).
 * Usage: Import designTokens anywhere instead of hardcoding Tailwind arbitrary values.
 * Dependencies: None.
 * Expected inputs: None (static object).
 * Expected outputs: Constant design values.
 */

export const designTokens = {
  colors: {
    background: "#050505",
    surface: "#0A0A0A",
    surfaceHover: "#141414",
    textPrimary: "#FAFAFA",
    textSecondary: "#A1A1AA",
    textMuted: "#71717A",
    accentPrimary: "#F8F8F8",
    accentBlue: "#3B82F6",
    accentPurple: "#8B5CF6",
    success: "#10B981",
    warning: "#F59E0B",
    danger: "#EF4444",
    borderDefault: "rgba(255, 255, 255, 0.08)",
    borderHover: "rgba(255, 255, 255, 0.15)",
    borderActive: "rgba(255, 255, 255, 0.25)",
    glassBase: "rgba(10, 10, 10, 0.4)",
  },
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    "2xl": "64px",
    "3xl": "128px",
    "4xl": "192px",
  },
  radius: {
    sm: "4px",
    md: "8px",
    lg: "16px",
    xl: "24px",
    "2xl": "32px",
    full: "9999px",
  },
  shadows: {
    sm: "0 1px 2px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)",
    md: "0 4px 12px rgba(0,0,0,0.5), inset 0 1px 1px rgba(255,255,255,0.05)",
    lg: "0 24px 48px rgba(0,0,0,0.8), 0 0 0 1px rgba(255,255,255,0.1)",
    glowHover: "0 0 20px rgba(59, 130, 246, 0.15)",
  },
  animation: {
    duration: {
      fast: 0.2,
      normal: 0.35,
      slow: 0.8,
      verySlow: 1.5,
    },
    spring: {
      standard: { type: "spring", stiffness: 300, damping: 40, mass: 1.2 },
      gentle: { type: "spring", stiffness: 100, damping: 30, mass: 1.5 },
      bouncy: { type: "spring", stiffness: 400, damping: 25, mass: 1.1 },
    },
    ease: {
      outExpo: [0.16, 1, 0.3, 1] as [number, number, number, number],
      inOutExpo: [0.87, 0, 0.13, 1] as [number, number, number, number],
    },
  },
  zIndex: {
    background: -1,
    base: 0,
    content: 10,
    overlay: 40,
    navbar: 50,
    modal: 100,
    tooltip: 200,
    cursor: 9999,
  },
};
