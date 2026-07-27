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

        {/* Right Side Centerpiece: Interactive 3D Quantum Atom & Energy Matrix */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-0 flex h-[480px] w-full items-center justify-center lg:h-[620px]"
          style={{ perspective: 1400 }}
        >
          {/* Deep Quantum Ambient Glow - Optimized for mobile GPU */}
          <div className="absolute h-[280px] w-[280px] animate-pulse rounded-full bg-gradient-to-tr from-cyan-500/25 via-blue-600/25 to-purple-600/20 blur-[60px] lg:h-[420px] lg:w-[420px] lg:blur-[120px]" />

          {/* Main Floating & Tilting Atom Container */}
          <motion.div
            animate={{ y: [-15, 15, -15] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="relative flex h-[340px] w-[340px] transform-gpu items-center justify-center will-change-transform lg:h-[440px] lg:w-[440px]"
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Outer Energy Field Halo */}
            <motion.div
              animate={{ rotate: 360, scale: [1, 1.05, 1] }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 transform-gpu rounded-full border border-dashed border-cyan-500/20 shadow-[0_0_40px_rgba(6,182,212,0.15)]"
            />

            {/* Orbital Ring 1 (Alpha Valence) */}
            <motion.div
              animate={{ rotateZ: 360 }}
              transition={{ duration: 24, repeat: Infinity, ease: "linear" }}
              className="absolute h-[300px] w-[300px] transform-gpu rounded-full border-2 border-dashed border-cyan-400/40 shadow-[0_0_25px_rgba(6,182,212,0.2)] will-change-transform lg:h-[400px] lg:w-[400px]"
              style={{ transform: "rotateX(65deg) rotateY(25deg)", transformStyle: "preserve-3d" }}
            >
              {/* Orbiting Electron Node 1 */}
              <div className="absolute -top-3 left-1/2 flex -translate-x-1/2 items-center justify-center">
                <span className="absolute h-6 w-6 animate-ping rounded-full bg-cyan-400 opacity-75 blur-sm" />
                <span className="relative h-4 w-4 rounded-full bg-cyan-300 shadow-[0_0_20px_#22d3ee]" />
              </div>
            </motion.div>

            {/* Orbital Ring 2 (Beta Valence) */}
            <motion.div
              animate={{ rotateZ: -360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
              className="absolute h-[300px] w-[300px] transform-gpu rounded-full border border-purple-500/50 shadow-[0_0_25px_rgba(168,85,247,0.2)] will-change-transform lg:h-[400px] lg:w-[400px]"
              style={{ transform: "rotateX(65deg) rotateY(-40deg)", transformStyle: "preserve-3d" }}
            >
              {/* Orbiting Electron Node 2 */}
              <div className="absolute -bottom-3 left-1/2 flex -translate-x-1/2 items-center justify-center">
                <span className="absolute h-6 w-6 animate-ping rounded-full bg-purple-400 opacity-75 blur-sm" />
                <span className="relative h-4 w-4 rounded-full bg-purple-400 shadow-[0_0_20px_#c084fc]" />
              </div>
            </motion.div>

            {/* Orbital Ring 3 (Gamma Valence) */}
            <motion.div
              animate={{ rotateZ: 360 }}
              transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
              className="absolute h-[300px] w-[300px] transform-gpu rounded-full border-2 border-dotted border-blue-400/40 shadow-[0_0_25px_rgba(59,130,246,0.2)] will-change-transform lg:h-[400px] lg:w-[400px]"
              style={{ transform: "rotateX(75deg) rotateY(80deg)", transformStyle: "preserve-3d" }}
            >
              {/* Orbiting Electron Node 3 */}
              <div className="absolute top-1/2 -right-3 flex -translate-y-1/2 items-center justify-center">
                <span className="absolute h-6 w-6 animate-ping rounded-full bg-blue-400 opacity-75 blur-sm" />
                <span className="relative h-4 w-4 rounded-full bg-blue-400 shadow-[0_0_20px_#60a5fa]" />
              </div>
            </motion.div>

            {/* Orbital Ring 4 (Equatorial Ring) */}
            <motion.div
              animate={{ rotateZ: -360 }}
              transition={{ duration: 36, repeat: Infinity, ease: "linear" }}
              className="absolute h-[280px] w-[280px] transform-gpu rounded-full border border-emerald-400/30 shadow-[0_0_20px_rgba(52,211,153,0.15)] will-change-transform lg:h-[380px] lg:w-[380px]"
              style={{ transform: "rotateX(20deg) rotateY(0deg)", transformStyle: "preserve-3d" }}
            >
              {/* Orbiting Electron Node 4 */}
              <div className="absolute top-1/2 -left-3 flex -translate-y-1/2 items-center justify-center">
                <span className="absolute h-5 w-5 animate-ping rounded-full bg-emerald-400 opacity-75 blur-sm" />
                <span className="relative h-3.5 w-3.5 rounded-full bg-emerald-300 shadow-[0_0_15px_#34d399]" />
              </div>
            </motion.div>

            {/* Central Quantum Nucleus Orb */}
            <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-gradient-to-tr from-cyan-500 via-blue-600 to-purple-600 p-1 shadow-[0_0_100px_rgba(6,182,212,0.8)]">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-slate-950 backdrop-blur-2xl">
                {/* Nucleus Energy Core Pulsing Glow */}
                <div className="absolute h-24 w-24 animate-pulse rounded-full bg-gradient-to-br from-cyan-400 via-indigo-500 to-purple-600 opacity-80 blur-md" />

                {/* Inner Rotating Energy Ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-2 rounded-full border border-dashed border-cyan-300/40"
                />

                {/* Nucleus Center Emblem */}
                <div className="relative flex flex-col items-center justify-center text-center font-mono">
                  <span className="text-3xl drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] filter">
                    ⚛️
                  </span>
                  <span className="mt-1 text-xs font-bold tracking-tight text-white shadow-sm">
                    QUANTUM
                  </span>
                  <span className="text-[9px] font-semibold tracking-widest text-cyan-400">
                    OS v2.0
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Floating Orbiting Clean Minimal Badges */}
          <motion.div
            animate={{ y: [-6, 6, -6] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-4 left-2 z-30 flex items-center gap-2.5 rounded-full border border-cyan-500/40 bg-slate-950/90 px-4 py-2 font-mono text-xs font-bold text-cyan-300 shadow-[0_0_25px_rgba(6,182,212,0.3)] backdrop-blur-md lg:top-8 lg:left-6"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]" />
            <span>Quantum Architecture</span>
          </motion.div>

          <motion.div
            animate={{ y: [6, -6, 6] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-2 bottom-4 z-30 flex items-center gap-2.5 rounded-full border border-purple-500/40 bg-slate-950/90 px-4 py-2 font-mono text-xs font-bold text-purple-300 shadow-[0_0_25px_rgba(168,85,247,0.3)] backdrop-blur-md lg:right-6 lg:bottom-8"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400 shadow-[0_0_8px_#c084fc]" />
            <span>0ms Edge Latency</span>
          </motion.div>

          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-1/2 right-0 z-30 flex -translate-y-1/2 items-center gap-2.5 rounded-full border border-emerald-500/40 bg-slate-950/90 px-4 py-2 font-mono text-xs font-bold text-emerald-300 shadow-[0_0_25px_rgba(52,211,153,0.3)] backdrop-blur-md lg:-right-4"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span>Next.js 16 Active</span>
          </motion.div>

          <motion.div
            animate={{ y: [8, -8, 8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute bottom-10 left-4 z-30 flex items-center gap-2.5 rounded-full border border-blue-500/40 bg-slate-950/90 px-4 py-2 font-mono text-xs font-bold text-blue-300 shadow-[0_0_25px_rgba(59,130,246,0.3)] backdrop-blur-md lg:bottom-12 lg:left-8"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400 shadow-[0_0_8px_#60a5fa]" />
            <span>Zero-Trust Security</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
