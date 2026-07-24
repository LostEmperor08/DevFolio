"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";

export function BlogHero() {
  return (
    <section className="w-full max-w-[1200px] px-6 py-20 relative z-10 mx-auto">
      <motion.div 
        variants={motionPresets.fadeUp}
        initial="initial"
        animate="animate"
        className="flex items-center gap-4 mb-8"
      >
        <span className="w-12 h-px bg-accent-blue/50" />
        <span className="font-mono text-sm text-accent-blue uppercase tracking-[0.3em] font-semibold">
          THE JOURNAL
        </span>
      </motion.div>

      <motion.div 
        variants={motionPresets.fadeUp}
        initial="initial"
        animate="animate"
        className="max-w-4xl"
      >
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50 pb-4 leading-[0.9] mb-8">
          Writing about code, design, and architecture.
        </h1>
        <p className="text-muted-foreground text-xl font-light leading-relaxed max-w-2xl">
          Deep dives into high-performance engineering, user experience, and the philosophies of building modern software.
        </p>
      </motion.div>
    </section>
  );
}
