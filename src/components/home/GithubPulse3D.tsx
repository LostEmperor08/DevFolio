"use client";

import React, { useState, useRef } from "react";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { ArrowUpRight, Flame } from "lucide-react";
import { sfx } from "@/lib/audio";

// Simulated recent commit matrix (14 weeks x 7 days)
const WEEKS = 12;
const DAYS = 7;

interface CommitCell {
  count: number;
  date: string;
  focus: string;
}

export function GithubPulse3D() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tilt, setTilt] = useState({ rx: 12, ry: -14 });
  const [activeCell, setActiveCell] = useState<CommitCell | null>(null);

  // Generate deterministic commit distribution
  const grid: CommitCell[][] = [];
  const focusList = [
    "C++ Engine optimization",
    "TON decentralized bridge",
    "SIMD bit-packing routines",
    "Python ingestion pipelines",
    "Framer layout morphing",
    "Algorithmic graph routing",
  ];

  for (let w = 0; w < WEEKS; w++) {
    const week: CommitCell[] = [];
    for (let d = 0; d < DAYS; d++) {
      const seed = Math.sin(w * 7 + d * 13) * 10000;
      const rand = seed - Math.floor(seed);
      const count = rand > 0.7 ? Math.floor(rand * 15) : rand > 0.4 ? Math.floor(rand * 6) : 0;
      week.push({
        count,
        date: `Week ${w + 1}, Day ${d + 1}`,
        focus: focusList[(w + d) % focusList.length],
      });
    }
    grid.push(week);
  }

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    const rx = -(y / (rect.height / 2)) * 18 + 10;
    const ry = (x / (rect.width / 2)) * 22 - 12;
    setTilt({ rx, ry });
  };

  const handleMouseLeave = () => {
    setTilt({ rx: 12, ry: -14 });
    setActiveCell(null);
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="flex flex-col justify-between h-full rounded-2xl border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-red-500/40 transition-all duration-300 group overflow-hidden"
    >
      <div>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-red-400 group-hover:scale-105 transition-transform">
              <GithubIcon className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-medium text-white">
              3D GitHub Pulse
            </span>
          </div>
          <span className="flex items-center gap-1 text-[10px] font-mono text-emerald-400 bg-emerald-950/40 border border-emerald-800/40 px-2 py-0.5 rounded-full">
            <Flame className="w-3 h-3 text-emerald-400" />
            Active Streak
          </span>
        </div>

        <p className="text-zinc-400 text-xs mb-4 font-mono">
          Isometric activity matrix. Tilt your cursor to inspect commit density and system architecture work.
        </p>

        {/* 3D Isometric Viewport */}
        <div className="relative w-full h-40 flex items-center justify-center [perspective:900px] overflow-hidden rounded-xl bg-black/60 border border-zinc-800/80">
          <div
            className="flex gap-1.5 p-4 transition-transform duration-150 ease-out select-none"
            style={{
              transformStyle: "preserve-3d",
              transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg) rotateZ(3deg)`,
            }}
          >
            {grid.map((week, wIdx) => (
              <div key={wIdx} className="flex flex-col gap-1.5" style={{ transformStyle: "preserve-3d" }}>
                {week.map((cell, dIdx) => {
                  const height = Math.max(4, cell.count * 2.8);
                  const isHigh = cell.count >= 8;
                  const isMedium = cell.count >= 3 && cell.count < 8;

                  return (
                    <div
                      key={dIdx}
                      onMouseEnter={() => {
                        setActiveCell(cell);
                        sfx.playSynthHum();
                      }}
                      className="w-3.5 h-3.5 rounded-sm transition-all duration-200 cursor-pointer"
                      style={{
                        transform: `translateZ(${height}px)`,
                        backgroundColor: isHigh
                          ? "#ef4444"
                          : isMedium
                          ? "rgba(239, 68, 68, 0.45)"
                          : cell.count > 0
                          ? "rgba(255, 255, 255, 0.15)"
                          : "rgba(255, 255, 255, 0.04)",
                        boxShadow: isHigh
                          ? "0 0 10px rgba(239, 68, 68, 0.6), 0 4px 6px rgba(0,0,0,0.8)"
                          : isMedium
                          ? "0 0 6px rgba(239, 68, 68, 0.3)"
                          : "none",
                      }}
                    />
                  );
                })}
              </div>
            ))}
          </div>

          {/* Active Hover Tooltip */}
          {activeCell && (
            <div className="absolute bottom-2 left-3 right-3 bg-zinc-900/90 backdrop-blur-md border border-zinc-700/60 rounded-lg px-2.5 py-1.5 text-[11px] font-mono text-zinc-300 flex items-center justify-between shadow-lg pointer-events-none">
              <span>
                <strong className="text-white">{activeCell.count} commits</strong> • {activeCell.focus}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Footer details */}
      <div className="flex items-center justify-between mt-4 pt-3 border-t border-zinc-800/60">
        <div className="text-[11px] font-mono text-zinc-400">
          <span>Total: <strong className="text-white">482 commits</strong></span>
        </div>
        <a
          href="https://github.com/LostEmperor08"
          target="_blank"
          rel="noopener noreferrer"
          onMouseEnter={() => sfx.playSynthHum()}
          onClick={() => sfx.playMechanicalSwitch()}
          className="inline-flex items-center gap-1 text-xs font-mono text-zinc-400 hover:text-red-400 transition-colors group/link"
        >
          <span>git/LostEmperor08</span>
          <ArrowUpRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
        </a>
      </div>
    </div>
  );
}
