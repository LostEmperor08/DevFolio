"use client";

import React, { useState, useRef } from "react";
import { ProjectData } from "@/lib/content";
import {
  ExternalLink,
  Terminal,
  Layers,
  ArrowRight,
  Play,
  RotateCcw,
  Check,
} from "lucide-react";
import { GithubIcon } from "@/components/icons/SocialIcons";
import { sfx } from "@/lib/audio";

interface ProjectXRayCardProps {
  project: ProjectData;
}

export function ProjectXRayCard({ project }: ProjectXRayCardProps) {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const isDragging = useRef(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // Micro-demo terminal state
  const [isDemoRunning, setIsDemoRunning] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);

  // Slider Dragging handler (compliant with modern-web-guidance: pointerdown, setPointerCapture, user-select)
  const handlePointerDown = (e: React.PointerEvent) => {
    isDragging.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
    sfx.playMechanicalSwitch();
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(10, Math.min(90, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDragging.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // ignored
    }
  };

  // Run the embedded micro-demo
  const runMicroDemo = async () => {
    if (isDemoRunning) return;
    setIsDemoRunning(true);
    setTerminalLogs([]);
    sfx.playMechanicalSwitch();

    const lines = [
      `$ ${project.microDemo.command}`,
      ...project.microDemo.output,
    ];

    for (let i = 0; i < lines.length; i++) {
      await new Promise((res) => setTimeout(res, 220));
      setTerminalLogs((prev) => [...prev, lines[i]]);
      sfx.playSynthHum();
    }

    sfx.playDispatchSuccess();
    setIsDemoRunning(false);
  };

  return (
    <article className="rounded-2xl border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl p-6 sm:p-8 shadow-[0_8px_32px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.06)] space-y-6 hover:border-red-500/40 transition-all duration-300 group">
      {/* 1. Header & Meta */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[11px] font-mono px-2.5 py-0.5 rounded-full bg-red-950/40 border border-red-800/40 text-red-400 font-medium">
              {project.category}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="text-xs font-mono text-zinc-400">Architecture Stage</span>
          </div>

          <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-white group-hover:text-red-400 transition-colors">
            {project.title}
          </h2>

          <p className="text-zinc-400 text-sm sm:text-base mt-1.5 max-w-2xl leading-relaxed">
            {project.tagline}
          </p>
        </div>

        {/* Action Links */}
        <div className="flex items-center gap-2 self-start sm:self-center">
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Repository"
              onClick={() => sfx.playMechanicalSwitch()}
              onMouseEnter={() => sfx.playSynthHum()}
              className="p-2.5 rounded-full border border-zinc-800 hover:border-red-500/50 bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors"
            >
              <GithubIcon className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>

      {/* 2. Key Metrics Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 p-3.5 rounded-xl border border-zinc-800/80 bg-black/60">
        {project.metrics.map((metric, idx) => (
          <div key={idx} className="flex items-center gap-2 text-xs font-mono">
            <span className="h-1.5 w-1.5 rounded-full bg-red-500" />
            <span className="text-zinc-300 font-semibold">{metric}</span>
          </div>
        ))}
      </div>

      {/* 3. The Architecture X-Ray Inspection Stage (Interactive Slider) */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span className="flex items-center gap-1.5">
            <Layers className="w-3.5 h-3.5 text-red-400" />
            <span>Interactive X-Ray: Drag slider to peel UI and reveal internal pipeline</span>
          </span>
          <span className="text-zinc-500 text-[11px] hidden sm:inline">
            Frontend UI ⟵ Split {Math.round(sliderPos)}% ⟶ Architecture Blueprint
          </span>
        </div>

        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          className="relative w-full h-72 sm:h-80 rounded-xl border border-zinc-800 bg-black overflow-hidden select-none touch-none cursor-ew-resize"
          style={{ WebkitUserSelect: "none" }}
        >
          {/* UNDERNEATH LAYER: Architecture Blueprint X-Ray */}
          <div className="absolute inset-0 bg-[#08080c] p-6 flex flex-col justify-between overflow-hidden">
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <span className="text-[11px] font-mono text-red-400 uppercase tracking-wider flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
                Under-The-Hood Pipeline Architecture
              </span>
              <span className="text-[10px] font-mono text-zinc-500">Live Dataflow</span>
            </div>

            {/* Architecture Node Conduit Graph */}
            <div className="flex items-center justify-between gap-2 my-auto overflow-x-auto py-2">
              {project.architectureNodes.map((node, nIdx) => (
                <React.Fragment key={node.name}>
                  <div className="flex-1 min-w-[100px] max-w-[140px] p-2.5 rounded-lg border border-red-900/40 bg-zinc-950/90 shadow-lg flex flex-col justify-between text-center relative group/node">
                    <span className="text-[9px] font-mono uppercase text-red-400/80 mb-1">
                      {node.type}
                    </span>
                    <span className="text-xs font-semibold text-white truncate">
                      {node.name}
                    </span>
                    <span className="text-[10px] text-zinc-400 mt-1 line-clamp-2 leading-tight">
                      {node.desc}
                    </span>
                  </div>

                  {nIdx < project.architectureNodes.length - 1 && (
                    <div className="flex items-center justify-center text-red-500/50">
                      <ArrowRight className="w-3.5 h-3.5 animate-pulse" />
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>

            <div className="text-[11px] font-mono text-zinc-500 border-t border-zinc-800/80 pt-2 flex items-center justify-between">
              <span>Stack: {project.stack.join(" • ")}</span>
              <span className="text-red-400">Deterministic Zero-Copy Path</span>
            </div>
          </div>

          {/* TOP LAYER: Clean Frontend Mockup (clipped by sliderPos) */}
          <div
            className="absolute inset-0 bg-zinc-950 p-6 flex flex-col justify-between"
            style={{
              clipPath: `inset(0 ${100 - sliderPos}% 0 0)`,
            }}
          >
            <div className="flex items-center justify-between border-b border-zinc-800/80 pb-3">
              <div className="flex items-center gap-2">
                <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-xs font-mono text-zinc-400 ml-2">Production Surface</span>
              </div>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-zinc-900 text-zinc-400 border border-zinc-800">
                Client View
              </span>
            </div>

            {/* Frontend mockup content */}
            <div className="my-auto space-y-3">
              <div className="p-4 rounded-xl border border-zinc-800/80 bg-zinc-900/40 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-mono font-medium text-white">System Status: OPERATIONAL</span>
                  <span className="text-xs font-mono text-emerald-400">99.99% Uptime</span>
                </div>
                <p className="text-zinc-400 text-xs leading-relaxed">
                  {project.frontendPreview}
                </p>
              </div>

              {/* Mock telemetry pills */}
              <div className="flex flex-wrap gap-2">
                {project.stack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 rounded-md text-[11px] font-mono bg-zinc-900 border border-zinc-800 text-zinc-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="text-[11px] font-mono text-zinc-500 pt-2 border-t border-zinc-800/80">
              Drag handle right to reveal backend architecture ➔
            </div>
          </div>

          {/* Draggable Divider Handle */}
          <div
            onPointerDown={handlePointerDown}
            className="absolute top-0 bottom-0 w-1 bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)] cursor-ew-resize flex items-center justify-center group/handle"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="h-8 w-6 rounded-full bg-zinc-900 border-2 border-red-500 shadow-xl flex items-center justify-center group-hover/handle:scale-110 transition-transform">
              <div className="flex gap-0.5">
                <span className="h-3 w-0.5 bg-red-400 rounded-full" />
                <span className="h-3 w-0.5 bg-red-400 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 4. Embedded Micro-Demo Terminal */}
      <div className="rounded-xl border border-zinc-800/80 bg-black/80 p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-300">
            <Terminal className="w-3.5 h-3.5 text-red-400" />
            <span>Interactive Micro-Demo Terminal</span>
          </div>

          <button
            onClick={runMicroDemo}
            disabled={isDemoRunning}
            onMouseEnter={() => sfx.playSynthHum()}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono font-semibold text-white bg-zinc-900 hover:bg-zinc-800 border border-red-500/40 hover:border-red-500 transition-all disabled:opacity-50"
          >
            {isDemoRunning ? (
              <>
                <RotateCcw className="w-3 h-3 animate-spin text-red-400" />
                <span>Simulating...</span>
              </>
            ) : (
              <>
                <Play className="w-3 h-3 text-red-400 fill-red-400" />
                <span>{project.microDemo.prompt}</span>
              </>
            )}
          </button>
        </div>

        {/* Terminal Output Screen */}
        <div className="min-h-[90px] max-h-36 overflow-y-auto p-3 rounded-lg bg-[#070709] border border-zinc-900 font-mono text-[11px] space-y-1.5 text-zinc-400 select-text">
          {terminalLogs.length === 0 ? (
            <p className="text-zinc-600 italic">
              Click &quot;{project.microDemo.prompt}&quot; above to watch real-time simulated telemetry output.
            </p>
          ) : (
            terminalLogs.map((log, lIdx) => (
              <p
                key={lIdx}
                className={
                  log.startsWith("$")
                    ? "text-red-400 font-semibold"
                    : log.includes("✓")
                    ? "text-emerald-400"
                    : "text-zinc-300"
                }
              >
                {log}
              </p>
            ))
          )}
        </div>
      </div>
    </article>
  );
}
