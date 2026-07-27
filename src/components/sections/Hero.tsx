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

        {/* Right Side Centerpiece: Interactive 3D Cyber Terminal & Radar Scanner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          className="relative z-0 flex h-[480px] w-full items-center justify-center lg:h-[620px]"
          style={{ perspective: 1200 }}
        >
          {/* Deep Cyberpunk Ambient Glow */}
          <div className="absolute h-[400px] w-[400px] animate-pulse rounded-full bg-gradient-to-tr from-cyan-600/20 via-blue-600/20 to-purple-600/15 blur-[110px]" />

          {/* Sweeping Cyber Security Radar Scanner */}
          <motion.div
            animate={{ y: [-10, 10, -10] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="glass-panel absolute top-2 right-2 z-10 flex h-36 w-36 items-center justify-center overflow-hidden rounded-full border border-cyan-500/30 bg-slate-950/90 p-2 shadow-[0_0_35px_rgba(6,182,212,0.2)] backdrop-blur-xl lg:-top-6 lg:right-4 lg:h-44 lg:w-44"
          >
            {/* Concentric Radar Rings & Crosshairs */}
            <div className="absolute inset-2 rounded-full border border-dashed border-cyan-500/20" />
            <div className="absolute inset-8 rounded-full border border-cyan-500/30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="h-full w-[1px] bg-cyan-500/20" />
              <div className="absolute h-[1px] w-full bg-cyan-500/20" />
            </div>

            {/* Sweeping Radar Beam */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              className="pointer-events-none absolute inset-2 overflow-hidden rounded-full"
            >
              <div className="h-1/2 w-1/2 origin-bottom-right bg-gradient-to-br from-cyan-400/40 to-transparent" />
            </motion.div>

            {/* Detected Target Nodes on Radar */}
            <span className="absolute top-8 left-10 h-2 w-2 animate-ping rounded-full bg-cyan-400" />
            <span className="absolute right-10 bottom-10 h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            <span className="absolute top-12 right-8 h-1.5 w-1.5 rounded-full bg-purple-400" />

            {/* Radar Label */}
            <div className="absolute bottom-2 rounded border border-cyan-500/30 bg-black/80 px-2 py-0.5 font-mono text-[9px] font-bold tracking-widest text-cyan-400">
              RADAR // 360°
            </div>
          </motion.div>

          {/* Main Interactive Command Terminal */}
          <motion.div
            whileHover={{ scale: 1.02, rotateX: 3, rotateY: -3 }}
            transition={{ duration: 0.3 }}
            className="relative z-20 w-full max-w-[460px] overflow-hidden rounded-3xl border border-white/15 bg-slate-950/95 shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-2xl"
          >
            {/* Terminal Window Header */}
            <div className="flex items-center justify-between border-b border-white/10 bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 px-5 py-3.5">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.5)]" />
                <span className="h-3 w-3 rounded-full bg-yellow-500/80 shadow-[0_0_8px_rgba(234,179,8,0.5)]" />
                <span className="h-3 w-3 rounded-full bg-green-500/80 shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
              </div>
              <div className="flex items-center gap-2 font-mono text-xs text-white/80">
                <span className="font-bold text-cyan-400">samarth</span>@dev-os:~
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-bold text-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" /> KERNEL
                OPTIMAL
              </div>
            </div>

            {/* Terminal Body: Live Simulated Decryption & Telemetry */}
            <div className="space-y-3.5 p-6 font-mono text-xs leading-relaxed text-white/90 md:text-sm">
              <div className="flex items-start gap-2">
                <span className="font-bold text-cyan-400 select-none">&gt;</span>
                <div>
                  <span className="font-semibold text-white">system_init</span>{" "}
                  --mode=high-performance
                  <span className="ml-2 font-bold text-emerald-400">[OK]</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="font-bold text-cyan-400 select-none">&gt;</span>
                <div>
                  <span className="text-white">crypto_shield_v2</span> --tunnel=quantum-resistant
                  <span className="ml-2 font-bold text-purple-400">[ENCRYPTED]</span>
                </div>
              </div>

              <div className="flex items-start gap-2">
                <span className="font-bold text-cyan-400 select-none">&gt;</span>
                <div>
                  <span className="text-white">edge_runtime</span> --nodes=global-mesh --latency=0ms
                  <span className="ml-2 font-bold text-cyan-400">[ONLINE]</span>
                </div>
              </div>

              {/* Simulated Live Packet Decryption Box */}
              <div className="my-3 space-y-1.5 rounded-xl border border-l-4 border-cyan-500/20 border-l-cyan-400 bg-cyan-950/20 p-3.5 font-mono text-xs">
                <div className="flex justify-between text-[11px] font-bold tracking-wider text-cyan-300 uppercase">
                  <span>LIVE SECURITY TELEMETRY</span>
                  <span className="animate-pulse text-emerald-400">● 60 FPS ACTIVE</span>
                </div>
                <div className="font-mono text-[11px] leading-tight break-all text-white/70">
                  0x7F9B... [PACKET VERIFIED] -&gt; AUTH_HASH:{" "}
                  <span className="text-purple-300">9E4C8A...</span>
                </div>
                <div className="flex items-center justify-between border-t border-white/5 pt-1 text-[11px] text-white/80">
                  <span>
                    STACK: <strong className="text-white">Next.js 16 + TS</strong>
                  </span>
                  <span>
                    LIGHTHOUSE: <strong className="text-emerald-400">100/100</strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <span className="font-bold text-cyan-400 select-none">&gt;</span>
                <span className="text-white/90">ready for incoming opportunities</span>
                <span className="ml-0.5 inline-block h-4 w-2 animate-pulse bg-cyan-400" />
              </div>
            </div>

            {/* Terminal Status Footer */}
            <div className="text-muted-foreground flex items-center justify-between border-t border-white/10 bg-slate-950 px-5 py-2.5 font-mono text-[11px]">
              <span className="flex items-center gap-1.5">
                <span className="h-2 w-2 animate-ping rounded-full bg-blue-500" />
                PORTFOLIO ARCHITECTURE v2.0
              </span>
              <span className="cursor-pointer text-cyan-400 hover:underline">[MANUAL / SPECS]</span>
            </div>
          </motion.div>

          {/* Floating Orbiting Tech Pills */}
          <motion.div
            animate={{ y: [8, -8, 8] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -bottom-2 left-4 z-30 flex items-center gap-2 rounded-full border border-purple-500/40 bg-slate-950/90 px-4 py-2 font-mono text-xs font-bold text-purple-400 shadow-[0_0_20px_rgba(139,92,246,0.3)] backdrop-blur-md lg:bottom-6 lg:left-6"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400" /> Zero-Trust
            Security
          </motion.div>

          <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-10 left-2 z-30 flex items-center gap-2 rounded-full border border-blue-500/40 bg-slate-950/90 px-4 py-2 font-mono text-xs font-bold text-blue-400 shadow-[0_0_20px_rgba(59,130,246,0.3)] backdrop-blur-md lg:top-12 lg:left-10"
          >
            <span className="h-2 w-2 animate-pulse rounded-full bg-blue-400" /> Next.js 16 Edge
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
