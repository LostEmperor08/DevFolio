"use client";

import { motion } from "framer-motion";
import { Typewriter } from "../ui/Typewriter";
import { MagneticButton } from "../ui/MagneticButton";
import { motionPresets } from "@/lib/motion";
import { ArrowRight, BookOpen, Download, ShieldCheck, Zap, Globe } from "lucide-react";

export function Hero() {
  return (
    <section className="w-full min-h-screen flex items-center justify-center relative px-6 pt-20" id="hero">
      <div className="max-w-[1200px] w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        
        {/* Left Side Content */}
        <motion.div 
          variants={motionPresets.staggerChildren(0.1)}
          initial="initial"
          animate="animate"
          className="flex flex-col z-10"
        >
          <motion.div variants={motionPresets.fadeUp} className="flex items-center gap-2 mb-4">
            <span className="w-8 h-px bg-accent-blue" />
            <span className="text-sm font-mono text-muted-foreground uppercase tracking-widest">Hello, World</span>
          </motion.div>
          
          <motion.h1 variants={motionPresets.fadeUp} className="text-5xl md:text-7xl font-bold tracking-tighter leading-[1.1] mb-2">
            I'm Samarth.
          </motion.h1>
          
          <motion.div variants={motionPresets.fadeUp} className="text-2xl md:text-3xl mb-6 font-light text-foreground/90">
            <Typewriter />
          </motion.div>

          <motion.p variants={motionPresets.fadeUp} className="text-lg text-muted-foreground max-w-lg mb-12 leading-relaxed font-light">
            Engineering digital ecosystems where uncompromising aesthetics meet raw computational performance. Every pixel, every interaction, meticulously crafted.
          </motion.p>
          
          {/* Action Buttons */}
          <motion.div variants={motionPresets.fadeUp} className="flex flex-wrap items-center gap-4 mb-12">
            <MagneticButton className="px-6 py-3 bg-foreground text-background hover:bg-zinc-200">
              <span className="flex items-center gap-2">View Projects <ArrowRight className="w-4 h-4" /></span>
            </MagneticButton>
            <MagneticButton variant="ghost" className="px-6 py-3 border-white/10 hover:bg-white/5">
              <span className="flex items-center gap-2">Read Blog <BookOpen className="w-4 h-4" /></span>
            </MagneticButton>
            <MagneticButton variant="ghost" className="px-6 py-3 border-transparent hover:bg-white/5 text-muted-foreground hover:text-foreground">
              <span className="flex items-center gap-2">Resume <Download className="w-4 h-4" /></span>
            </MagneticButton>
          </motion.div>

          {/* Trust Badges */}
          <motion.div variants={motionPresets.fadeUp} className="flex flex-wrap gap-3">
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground px-3 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm backdrop-blur-md">
              <Globe className="w-3.5 h-3.5 text-accent-blue" /> Open to Opportunities
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground px-3 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm backdrop-blur-md">
              <Zap className="w-3.5 h-3.5 text-accent-purple" /> Building Useful Products
            </div>
            <div className="flex items-center gap-2 text-xs font-medium text-muted-foreground px-3 py-1.5 rounded-full bg-white/5 border border-white/10 shadow-sm backdrop-blur-md">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> Always Learning
            </div>
          </motion.div>
        </motion.div>

        {/* Right Side Centerpiece (CSS/Framer Motion Holographic Sphere) */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative h-[400px] lg:h-[600px] w-full flex items-center justify-center z-0"
          style={{ perspective: 1000 }}
        >
          {/* Outer glow */}
          <div className="absolute w-[300px] h-[300px] rounded-full bg-accent-blue/10 blur-[80px]" />
          
          {/* Interactive animated Rings */}
          <motion.div
            animate={{ rotateX: 360, rotateY: 360 }}
            transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: 'preserve-3d' }}
            className="absolute w-[280px] h-[280px] rounded-full border border-accent-blue/10 shadow-[0_0_40px_rgba(59,130,246,0.05)]"
          />
          <motion.div
            animate={{ rotateX: -360, rotateY: 180 }}
            transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: 'preserve-3d' }}
            className="absolute w-[280px] h-[280px] rounded-full border border-accent-purple/10 shadow-[0_0_40px_rgba(139,92,246,0.05)]"
          />
          <motion.div
            animate={{ rotateZ: 360 }}
            transition={{ duration: 75, repeat: Infinity, ease: "linear" }}
            style={{ transformStyle: 'preserve-3d' }}
            className="absolute w-[280px] h-[280px] rounded-full border-2 border-dashed border-white/5"
          />
          
          {/* Core crystal/glass sphere */}
          <div className="absolute w-[120px] h-[120px] rounded-full glass-panel shadow-[0_0_50px_rgba(255,255,255,0.05)] border border-white/10 backdrop-blur-xl flex items-center justify-center">
            <div className="w-1/2 h-1/2 rounded-full bg-gradient-to-tr from-accent-blue to-accent-purple opacity-40 blur-[15px] animate-pulse" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
