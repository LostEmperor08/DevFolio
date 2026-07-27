"use client";

import { motion } from "framer-motion";
import { Typewriter } from "../ui/Typewriter";
import { MagneticButton } from "../ui/MagneticButton";
import { motionPresets } from "@/lib/motion";
import Link from "next/link";
import { profile } from "@/config/profile";
import { ArrowRight, BookOpen, Download, ShieldCheck, Zap, Globe } from "lucide-react";
import Image from "next/image";

export function Hero() {
  return (
    <section
      className="relative flex min-h-screen w-full items-center justify-center px-6 pt-20"
      id="hero"
    >
      <div className="grid w-full max-w-[1200px] grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Left Side Content */}
        <motion.div
          variants={motionPresets.staggerChildren(0.1)}
          initial="initial"
          animate="animate"
          className="z-10 flex flex-col"
        >
          <motion.div
            variants={motionPresets.fadeUp}
            className="mb-6 inline-flex w-fit items-center gap-2.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 font-mono text-xs text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.15)] backdrop-blur-md"
          >
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500"></span>
            </span>
            <span>AVAILABLE FOR NEW OPPORTUNITIES • SYSTEM V2.0 ACTIVE</span>
          </motion.div>

          <motion.div variants={motionPresets.fadeUp} className="mb-4 flex items-center gap-2">
            <span className="bg-accent-blue h-px w-8" />
            <span className="text-muted-foreground font-mono text-sm tracking-widest uppercase">
              Hello, World
            </span>
          </motion.div>

          <motion.h1
            variants={motionPresets.fadeUp}
            className="mb-2 text-5xl leading-[1.1] font-bold tracking-tighter text-white md:text-7xl"
          >
            I'm Samarth.
          </motion.h1>

          <motion.div
            variants={motionPresets.fadeUp}
            className="text-foreground/90 mb-6 text-2xl font-light md:text-3xl"
          >
            <Typewriter />
          </motion.div>

          <motion.p
            variants={motionPresets.fadeUp}
            className="text-muted-foreground mb-12 max-w-lg text-lg leading-relaxed font-light"
          >
            Engineering digital ecosystems where uncompromising aesthetics meet raw computational
            performance. Every pixel, every interaction, meticulously crafted.
          </motion.p>

          {/* Action Buttons */}
          <motion.div
            variants={motionPresets.fadeUp}
            className="mb-12 flex flex-wrap items-center gap-4"
          >
            <Link href="/projects">
              <MagneticButton className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-3.5 font-semibold text-white shadow-[0_0_20px_rgba(59,130,246,0.3)] hover:from-blue-500 hover:to-indigo-500">
                <span className="flex items-center gap-2">
                  View Projects <ArrowRight className="h-4 w-4" />
                </span>
              </MagneticButton>
            </Link>
            <Link href="/blog">
              <MagneticButton
                variant="ghost"
                className="border border-white/20 bg-white/5 px-6 py-3.5 font-medium text-white backdrop-blur-md hover:bg-white/10"
              >
                <span className="flex items-center gap-2">
                  Read Blog <ArrowRight className="h-4 w-4" />
                </span>
              </MagneticButton>
            </Link>
            <a href={profile.personal.resumeUrl} target="_blank" rel="noopener noreferrer">
              <MagneticButton
                variant="ghost"
                className="text-muted-foreground border border-transparent px-6 py-3.5 font-medium hover:bg-white/5 hover:text-white"
              >
                <span className="flex items-center gap-2">
                  Resume <Download className="h-4 w-4" />
                </span>
              </MagneticButton>
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div variants={motionPresets.fadeUp} className="flex flex-wrap gap-3">
            <div className="text-muted-foreground flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium shadow-sm backdrop-blur-md transition-colors hover:border-white/20">
              <Globe className="text-accent-blue h-3.5 w-3.5" /> Open to Opportunities
            </div>
            <div className="text-muted-foreground flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium shadow-sm backdrop-blur-md transition-colors hover:border-white/20">
              <Zap className="text-accent-purple h-3.5 w-3.5" /> Building Useful Products
            </div>
            <div className="text-muted-foreground flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3.5 py-1.5 text-xs font-medium shadow-sm backdrop-blur-md transition-colors hover:border-white/20">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Always Learning
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side Centerpiece: Cybernetic Neural Core & Tech Stack Hologram */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-0 flex h-[450px] w-full items-center justify-center lg:h-[600px]"
          style={{ perspective: 1200 }}
        >
          {/* Deep Ambient Glow */}
          <div className="absolute h-[380px] w-[380px] animate-pulse rounded-full bg-gradient-to-tr from-blue-600/25 via-purple-600/25 to-pink-600/15 blur-[100px]" />

          {/* Rotating Cyber Rings */}
          <motion.div
            animate={{ rotateZ: 360, rotateX: 20, rotateY: 20 }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="border-accent-blue/30 absolute h-[340px] w-[340px] rounded-full border-2 border-dashed shadow-[0_0_50px_rgba(59,130,246,0.1)]"
          />
          <motion.div
            animate={{ rotateZ: -360, rotateX: 60, rotateY: -30 }}
            transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
            className="border-accent-purple/30 absolute h-[270px] w-[270px] rounded-full border shadow-[0_0_50px_rgba(139,92,246,0.1)]"
          />

          {/* Floating Orbiting Tech Stack Badges */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute h-[360px] w-[360px]"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-blue-500/40 bg-slate-950/95 px-4 py-1.5 font-mono text-xs font-bold text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.4)] backdrop-blur-md">
              Next.js 16
            </div>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 rounded-full border border-purple-500/40 bg-slate-950/95 px-4 py-1.5 font-mono text-xs font-bold text-purple-400 shadow-[0_0_15px_rgba(139,92,246,0.4)] backdrop-blur-md">
              TypeScript
            </div>
            <div className="absolute top-1/2 left-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-emerald-500/40 bg-slate-950/95 px-4 py-1.5 font-mono text-xs font-bold text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.4)] backdrop-blur-md">
              60 FPS Physics
            </div>
            <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 rounded-full border border-pink-500/40 bg-slate-950/95 px-4 py-1.5 font-mono text-xs font-bold text-pink-400 shadow-[0_0_15px_rgba(236,72,153,0.4)] backdrop-blur-md">
              100/100 Lighthouse
            </div>
          </motion.div>

          {/* Central Reactor Orb */}
          <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 p-1 shadow-[0_0_80px_rgba(59,130,246,0.6)]">
            <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-slate-950 backdrop-blur-2xl">
              <div className="h-20 w-20 animate-pulse rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 opacity-75 blur-md" />
              <div className="absolute flex h-16 w-16 flex-col items-center justify-center rounded-full border border-white/30 bg-gradient-to-tr from-blue-500 to-purple-600 font-mono text-xs font-bold tracking-tighter text-white shadow-[0_0_30px_rgba(96,165,250,0.8)]">
                <span>DEV</span>
                <span className="text-[10px] text-cyan-300">OS v2</span>
              </div>
            </div>
          </div>

          {/* Floating Telemetry Glass Card */}
          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="glass-panel absolute right-6 bottom-6 z-20 w-56 rounded-2xl border border-white/20 bg-black/85 p-4 shadow-2xl backdrop-blur-xl lg:right-8 lg:bottom-12"
          >
            <div className="mb-2.5 flex items-center justify-between gap-2 border-b border-white/10 pb-2">
              <span className="text-muted-foreground font-mono text-[10px] font-semibold tracking-wider uppercase">
                SYSTEM TELEMETRY
              </span>
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-emerald-400">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> ACTIVE
              </span>
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-white/90">
                <span>LATENCY:</span> <span className="font-bold text-cyan-400">0 ms</span>
              </div>
              <div className="flex justify-between text-white/90">
                <span>RENDER:</span> <span className="font-bold text-purple-400">60 FPS</span>
              </div>
              <div className="flex justify-between text-white/90">
                <span>ENGINE:</span> <span className="font-bold text-blue-400">Next.js 16</span>
              </div>
              <div className="flex justify-between text-white/90">
                <span>SECURITY:</span> <span className="font-bold text-emerald-400">Encrypted</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
