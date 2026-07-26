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
          <motion.div variants={motionPresets.fadeUp} className="mb-6 flex items-center gap-4">
            <div className="border-accent-blue/40 relative h-16 w-16 overflow-hidden rounded-full border-2 shadow-[0_0_20px_rgba(59,130,246,0.2)]">
              <Image
                src={profile.personal.avatar || "/images/avatar.jpg"}
                alt="Samarth Avatar"
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-tight text-white">Developer OS</span>
              <span className="text-accent-blue font-mono text-xs tracking-widest uppercase">
                v2.0 • Active System
              </span>
            </div>
          </motion.div>

          <motion.div variants={motionPresets.fadeUp} className="mb-4 flex items-center gap-2">
            <span className="bg-accent-blue h-px w-8" />
            <span className="text-muted-foreground font-mono text-sm tracking-widest uppercase">
              Hello, World
            </span>
          </motion.div>

          <motion.h1
            variants={motionPresets.fadeUp}
            className="mb-2 text-5xl leading-[1.1] font-bold tracking-tighter md:text-7xl"
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
              <MagneticButton className="bg-foreground text-background px-6 py-3 hover:bg-zinc-200">
                <span className="flex items-center gap-2">
                  View Projects <ArrowRight className="h-4 w-4" />
                </span>
              </MagneticButton>
            </Link>
            <Link href="/blog">
              <MagneticButton
                variant="ghost"
                className="border-white/10 px-6 py-3 hover:bg-white/5"
              >
                <span className="flex items-center gap-2">
                  Read Blog <ArrowRight className="h-4 w-4" />
                </span>
              </MagneticButton>
            </Link>
            <a href={profile.personal.resumeUrl} target="_blank" rel="noopener noreferrer">
              <MagneticButton
                variant="ghost"
                className="text-muted-foreground hover:text-foreground border-transparent px-6 py-3 hover:bg-white/5"
              >
                <span className="flex items-center gap-2">
                  Resume <Download className="h-4 w-4" />
                </span>
              </MagneticButton>
            </a>
          </motion.div>

          {/* Trust Badges */}
          <motion.div variants={motionPresets.fadeUp} className="flex flex-wrap gap-3">
            <div className="text-muted-foreground flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur-md">
              <Globe className="text-accent-blue h-3.5 w-3.5" /> Open to Opportunities
            </div>
            <div className="text-muted-foreground flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur-md">
              <Zap className="text-accent-purple h-3.5 w-3.5" /> Building Useful Products
            </div>
            <div className="text-muted-foreground flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium shadow-sm backdrop-blur-md">
              <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" /> Always Learning
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side Centerpiece (CSS/Framer Motion Holographic Sphere) */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative z-0 flex h-[400px] w-full items-center justify-center lg:h-[600px]"
          style={{ perspective: 1000 }}
        >
          {/* Outer glow */}
          <div className="bg-accent-blue/10 absolute h-[300px] w-[300px] rounded-full blur-[80px]" />

          {/* Interactive animated Rings */}
          <motion.div
            animate={{ rotateX: 360, rotateY: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
            className="border-accent-blue/10 absolute h-[280px] w-[280px] rounded-full border shadow-[0_0_40px_rgba(59,130,246,0.05)]"
          />
          <motion.div
            animate={{ rotateX: -360, rotateY: 180 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
            className="border-accent-purple/10 absolute h-[280px] w-[280px] rounded-full border shadow-[0_0_40px_rgba(139,92,246,0.05)]"
          />
          <motion.div
            animate={{ rotateZ: 360 }}
            transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: "preserve-3d" }}
            className="absolute h-[280px] w-[280px] rounded-full border-2 border-dashed border-white/5"
          />

          {/* Core crystal/glass sphere */}
          <div className="glass-panel absolute flex h-[120px] w-[120px] items-center justify-center rounded-full border border-white/10 shadow-[0_0_50px_rgba(255,255,255,0.05)] backdrop-blur-xl">
            <div className="from-accent-blue to-accent-purple h-1/2 w-1/2 animate-pulse rounded-full bg-gradient-to-tr opacity-40 blur-[15px]" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
