"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";

export function ContactHero() {
  return (
    <section className="w-full max-w-[1200px] px-6 py-20 relative z-10 mx-auto text-center flex flex-col items-center">
      <motion.div 
        variants={motionPresets.fadeUp}
        initial="initial"
        animate="animate"
        className="flex items-center justify-center gap-4 mb-8"
      >
        <span className="w-8 h-px bg-accent-purple/50" />
        <span className="font-mono text-sm text-accent-purple uppercase tracking-[0.3em] font-semibold">
          INITIATE CONNECTION
        </span>
        <span className="w-8 h-px bg-accent-purple/50" />
      </motion.div>

      <motion.h1 
        variants={motionPresets.fadeUp}
        initial="initial"
        animate="animate"
        className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/60 pb-4 leading-[1.05] mb-6 max-w-4xl"
      >
        Let's build something extraordinary.
      </motion.h1>
      
      <motion.p 
        variants={motionPresets.fadeUp}
        initial="initial"
        animate="animate"
        className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed max-w-2xl"
      >
        Whether you have a specific project in mind or just want to explore possibilities, I'm always open to discussing new opportunities.
      </motion.p>
    </section>
  );
}
