import React from "react";

interface SakuraLogoProps {
  className?: string;
  size?: number;
  glow?: boolean;
}

export function SakuraLogo({ className = "w-full h-full", glow = true }: SakuraLogoProps) {
  // 5 petals rotated at 0, 72, 144, 216, 288 degrees around center (50, 50)
  const angles = [0, 72, 144, 216, 288];

  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      role="img"
      aria-label="White Sakura Emblem"
    >
      <defs>
        {/* Subtle center glow filter */}
        <filter id="sakura-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
        {/* Ambient crimson center gradient */}
        <radialGradient id="center-ruby-glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ef4444" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Optional ambient backglow */}
      {glow && (
        <circle cx="50" cy="50" r="32" fill="url(#center-ruby-glow)" />
      )}

      {/* 5 Petals */}
      <g stroke="currentColor" strokeLinejoin="round" strokeLinecap="round">
        {angles.map((deg) => (
          <g key={deg} transform={`rotate(${deg} 50 50)`}>
            {/* Outer Petal Contour */}
            <path
              d="M 50 43 
                 C 38 34, 34 22, 42 12
                 C 45 9, 48 11, 50 16
                 C 52 11, 55 9, 58 12
                 C 66 22, 62 34, 50 43 Z"
              fill="#ffffff"
              fillOpacity="0.96"
              stroke="#0a0a0c"
              strokeWidth="1.2"
            />
            {/* Inner Petal Vein Accent */}
            <path
              d="M 50 38 L 50 22"
              stroke="#0a0a0c"
              strokeWidth="1.1"
              strokeLinecap="round"
            />
            {/* Delicate inner flank contour */}
            <path
              d="M 44 26 C 44 20, 48 17, 50 19 C 52 17, 56 20, 56 26"
              stroke="#0a0a0c"
              strokeWidth="0.8"
              strokeOpacity="0.4"
            />
          </g>
        ))}
      </g>

      {/* Central Pistil */}
      <circle
        cx="50"
        cy="50"
        r="5.5"
        fill="#ffffff"
        stroke="#0a0a0c"
        strokeWidth="1.4"
      />
      <circle
        cx="50"
        cy="50"
        r="2"
        fill="#ef4444"
      />
    </svg>
  );
}
