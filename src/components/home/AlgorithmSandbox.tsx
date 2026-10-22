"use client";

import React, { useEffect, useRef, useState } from "react";
import { Play, RotateCcw, Cpu, Sparkles } from "lucide-react";
import { sfx } from "@/lib/audio";

interface Node {
  x: number;
  y: number;
  state: "empty" | "obstacle" | "visited" | "path" | "start" | "end";
}

export function AlgorithmSandbox() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [stats, setStats] = useState({ visited: 0, latency: "0.0ms", status: "Idle" });

  const rows = 9;
  const cols = 15;
  const gridRef = useRef<Node[][]>([]);

  // Initialize graph
  const initGrid = () => {
    const grid: Node[][] = [];
    for (let r = 0; r < rows; r++) {
      const row: Node[] = [];
      for (let c = 0; c < cols; c++) {
        const isStart = r === 4 && c === 1;
        const isEnd = r === 4 && c === 13;
        // Random obstacles
        const isObstacle =
          !isStart &&
          !isEnd &&
          Math.random() < 0.22 &&
          (c > 3 && c < 12);
        row.push({
          x: c,
          y: r,
          state: isStart ? "start" : isEnd ? "end" : isObstacle ? "obstacle" : "empty",
        });
      }
      grid.push(row);
    }
    gridRef.current = grid;
    setStats({ visited: 0, latency: "0.0ms", status: "Ready" });
    draw();
  };

  const draw = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    ctx.clearRect(0, 0, width, height);

    const cellW = width / cols;
    const cellH = height / rows;

    const grid = gridRef.current;

    // Draw background connections
    ctx.strokeStyle = "rgba(255, 255, 255, 0.04)";
    ctx.lineWidth = 1;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (c < cols - 1) {
          ctx.beginPath();
          ctx.moveTo(c * cellW + cellW / 2, r * cellH + cellH / 2);
          ctx.lineTo((c + 1) * cellW + cellW / 2, r * cellH + cellH / 2);
          ctx.stroke();
        }
        if (r < rows - 1) {
          ctx.beginPath();
          ctx.moveTo(c * cellW + cellW / 2, r * cellH + cellH / 2);
          ctx.lineTo(c * cellW + cellW / 2, (r + 1) * cellH + cellH / 2);
          ctx.stroke();
        }
      }
    }

    // Draw nodes
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        const node = grid[r]?.[c];
        if (!node) continue;

        const cx = c * cellW + cellW / 2;
        const cy = r * cellH + cellH / 2;
        const radius = Math.min(cellW, cellH) * 0.32;

        ctx.save();
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);

        if (node.state === "start") {
          ctx.fillStyle = "#ffffff";
          ctx.shadowColor = "#ffffff";
          ctx.shadowBlur = 12;
          ctx.fill();
        } else if (node.state === "end") {
          ctx.fillStyle = "#ef4444";
          ctx.shadowColor = "#ef4444";
          ctx.shadowBlur = 14;
          ctx.fill();
        } else if (node.state === "obstacle") {
          ctx.fillStyle = "#18181b";
          ctx.strokeStyle = "#27272a";
          ctx.lineWidth = 1;
          ctx.fill();
          ctx.stroke();
        } else if (node.state === "path") {
          ctx.fillStyle = "#f87171";
          ctx.shadowColor = "#ef4444";
          ctx.shadowBlur = 10;
          ctx.fill();
        } else if (node.state === "visited") {
          ctx.fillStyle = "rgba(239, 68, 68, 0.45)";
          ctx.fill();
        } else {
          ctx.fillStyle = "#09090b";
          ctx.strokeStyle = "rgba(255, 255, 255, 0.12)";
          ctx.lineWidth = 1;
          ctx.fill();
          ctx.stroke();
        }
        ctx.restore();
      }
    }
  };

  useEffect(() => {
    initGrid();
  }, []);

  const runPathfinding = async () => {
    if (isRunning) return;
    setIsRunning(true);
    sfx.playMechanicalSwitch();
    setStats({ visited: 0, latency: "Calculating...", status: "Tracing" });

    // Breadth-First / A* simulation
    const grid = gridRef.current;
    const start = { r: 4, c: 1 };
    const end = { r: 4, c: 13 };

    // Clear previous visited/path
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        if (grid[r][c].state === "visited" || grid[r][c].state === "path") {
          grid[r][c].state = "empty";
        }
      }
    }

    const queue: { r: number; c: number; parent?: { r: number; c: number } }[] = [start];
    const visitedSet = new Set<string>();
    visitedSet.add(`${start.r},${start.c}`);
    const parentMap = new Map<string, { r: number; c: number }>();

    let found = false;
    let visitCount = 0;

    const startTime = performance.now();

    while (queue.length > 0) {
      const curr = queue.shift()!;
      visitCount++;

      if (curr.r === end.r && curr.c === end.c) {
        found = true;
        break;
      }

      if (!(curr.r === start.r && curr.c === start.c)) {
        grid[curr.r][curr.c].state = "visited";
      }

      // Draw frame
      draw();
      await new Promise((res) => setTimeout(res, 22));

      // Neighbors
      const dirs = [
        { dr: 0, dc: 1 },
        { dr: 1, dc: 0 },
        { dr: 0, dc: -1 },
        { dr: -1, dc: 0 },
      ];

      for (const d of dirs) {
        const nr = curr.r + d.dr;
        const nc = curr.c + d.dc;
        const key = `${nr},${nc}`;

        if (
          nr >= 0 &&
          nr < rows &&
          nc >= 0 &&
          nc < cols &&
          !visitedSet.has(key) &&
          grid[nr][nc].state !== "obstacle"
        ) {
          visitedSet.add(key);
          parentMap.set(key, { r: curr.r, c: curr.c });
          queue.push({ r: nr, c: nc });
        }
      }
    }

    // Reconstruct optimal path
    if (found) {
      let curr = end;
      while (curr && !(curr.r === start.r && curr.c === start.c)) {
        if (!(curr.r === end.r && curr.c === end.c)) {
          grid[curr.r][curr.c].state = "path";
          draw();
          await new Promise((res) => setTimeout(res, 35));
        }
        curr = parentMap.get(`${curr.r},${curr.c}`)!;
      }
      sfx.playDispatchSuccess();
      const elapsed = (performance.now() - startTime).toFixed(1);
      setStats({
        visited: visitCount,
        latency: `${elapsed}ms`,
        status: "Routed ✓",
      });
    } else {
      setStats({
        visited: visitCount,
        latency: "Blocked",
        status: "No Route",
      });
    }

    setIsRunning(false);
  };

  return (
    <div className="flex flex-col justify-between h-full rounded-2xl border border-zinc-800/80 bg-zinc-950/60 backdrop-blur-xl p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] hover:border-red-500/40 transition-all duration-300 group">
      <div>
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-red-400 group-hover:scale-105 transition-transform">
              <Cpu className="w-4 h-4" />
            </span>
            <span className="text-xs font-mono font-medium text-white">
              Live Algorithm Sandbox
            </span>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-950/40 border border-red-800/40 text-red-400">
            {stats.status}
          </span>
        </div>

        <p className="text-zinc-400 text-xs mb-3 font-mono">
          Interactive low-latency Dijkstra pathfinding engine. Watch crimson routing waves discover optimal pathways.
        </p>

        {/* Canvas viewport */}
        <div className="relative w-full aspect-[15/9] rounded-xl border border-zinc-800/90 bg-black/80 overflow-hidden shadow-inner">
          <canvas
            ref={canvasRef}
            width={360}
            height={216}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Telemetry output */}
        <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mt-3 pt-2.5 border-t border-zinc-800/60">
          <span>Visited: <strong className="text-white">{stats.visited}</strong></span>
          <span>•</span>
          <span>Compute: <strong className="text-red-400">{stats.latency}</strong></span>
        </div>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-2 mt-4 pt-2">
        <button
          onClick={runPathfinding}
          disabled={isRunning}
          onMouseEnter={() => sfx.playSynthHum()}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-xs font-mono font-semibold text-white bg-zinc-900 hover:bg-zinc-800 border border-red-500/40 hover:border-red-500 disabled:opacity-50 transition-all shadow-sm"
        >
          <Play className="w-3.5 h-3.5 text-red-400 fill-red-400" />
          <span>{isRunning ? "Computing..." : "Run Algorithm"}</span>
        </button>

        <button
          onClick={() => {
            sfx.playMechanicalSwitch();
            initGrid();
          }}
          disabled={isRunning}
          title="Reset grid & regenerate random obstacles"
          className="p-2 rounded-lg border border-zinc-800 hover:border-zinc-700 bg-zinc-900/60 hover:bg-zinc-900 text-zinc-400 hover:text-white transition-colors disabled:opacity-50"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
