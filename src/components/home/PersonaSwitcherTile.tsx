"use client";

import React from "react";
import { usePersona } from "@/context/PersonaContext";
import { Sparkles, Moon, Zap } from "lucide-react";
import { motion } from "framer-motion";
import { sfx } from "@/lib/audio";

export function PersonaSwitcherTile() {
  const { persona, togglePersona } = usePersona();
  const isCrimson = persona === "crimson";

  return (
    <div
      className={`flex flex-col justify-between h-full rounded-2xl border transition-all duration-500 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] relative overflow-hidden group ${
        isCrimson
          ? "border-red-900/40 bg-zinc-950/60 hover:border-red-500/40"
          : "border-indigo-900/40 bg-zinc-950/60 hover:border-indigo-400/40"
      }`}
    >
      {/* Background ambient radial glow matching mode */}
      <div
        className={`absolute -top-16 -right-16 w-44 h-44 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
          isCrimson ? "bg-red-600/15" : "bg-indigo-400/15"
        }`}
      />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span
              className={`p-1.5 rounded-lg border transition-colors ${
                isCrimson
                  ? "bg-red-950/40 border-red-800/40 text-red-400"
                  : "bg-indigo-950/40 border-indigo-800/40 text-indigo-300"
              }`}
            >
              {isCrimson ? <Zap className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </span>
            <span className="text-xs font-mono font-medium text-white">
              The Persona Switcher
            </span>
          </div>

          <span
            className={`text-[10px] font-mono px-2 py-0.5 rounded-full border transition-colors ${
              isCrimson
                ? "bg-red-950/50 border-red-800/50 text-red-400"
                : "bg-indigo-950/50 border-indigo-800/50 text-indigo-300"
            }`}
          >
            {isCrimson ? "Crimson Mode" : "Moonlight Mode"}
          </span>
        </div>

        <p className="text-zinc-400 text-xs mb-4 font-mono">
          Shift folio telemetry. Toggles ambient atmosphere, lighting, and engineering highlights across the entire site.
        </p>

        {/* Tactile Switch Button */}
        <div className="my-2 p-3 rounded-xl border border-zinc-800/80 bg-black/60 flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-xs font-semibold text-white">
              {isCrimson ? "Systems & Performance" : "Writing & Craft"}
            </span>
            <span className="text-[10px] font-mono text-zinc-500">
              {isCrimson ? "C++, Distributed TON, Concurrency" : "Essays, Micro-delights, Scrollytelling"}
            </span>
          </div>

          {/* Physical Toggle Lever */}
          <button
            onClick={() => {
              togglePersona();
              sfx.playMechanicalSwitch();
            }}
            onMouseEnter={() => sfx.playSynthHum()}
            aria-label="Toggle Persona Mode"
            className={`relative w-14 h-8 rounded-full p-1 transition-colors duration-300 focus:outline-none border ${
              isCrimson
                ? "bg-red-950/80 border-red-700/60 shadow-[0_0_12px_rgba(239,68,68,0.4)]"
                : "bg-indigo-950/80 border-indigo-600/60 shadow-[0_0_12px_rgba(165,180,252,0.4)]"
            }`}
          >
            <motion.div
              layout
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] shadow-md ${
                isCrimson
                  ? "bg-red-500 text-white ml-auto"
                  : "bg-white text-zinc-900 mr-auto"
              }`}
            >
              {isCrimson ? <Zap className="w-3 h-3" /> : <Moon className="w-3 h-3" />}
            </motion.div>
          </button>
        </div>

        {/* Dynamic Focus Badges */}
        <div className="flex flex-wrap gap-1.5 mt-3">
          {(isCrimson
            ? ["C++20", "Distributed TON", "Lock-Free", "Low-Latency", "Epoll"]
            : ["Technical Writing", "Editorial Craft", "Micro-UX", "Web3 Utility", "Minimalism"]
          ).map((tag) => (
            <span
              key={tag}
              className={`px-2 py-0.5 rounded text-[10px] font-mono border transition-all duration-300 ${
                isCrimson
                  ? "bg-red-950/30 border-red-900/40 text-red-300"
                  : "bg-indigo-950/30 border-indigo-900/40 text-indigo-300"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="text-[11px] font-mono text-zinc-500 mt-4 pt-3 border-t border-zinc-800/60 flex items-center gap-1.5">
        <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
        <span>Click switch to shift ambient site radiance</span>
      </div>
    </div>
  );
}
