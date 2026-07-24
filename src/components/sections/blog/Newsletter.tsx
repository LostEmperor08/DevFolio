"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { Send } from "lucide-react";

export function Newsletter() {
  return (
    <section className="w-full max-w-[800px] px-6 py-32 relative z-10 mx-auto">
      <motion.div 
        variants={motionPresets.scaleIn}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true }}
        className="p-12 md:p-16 rounded-3xl glass-panel border border-white/10 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-accent-blue/10 via-transparent to-accent-purple/10 pointer-events-none" />
        
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-4 relative z-10">
          Engineering insights, delivered.
        </h2>
        <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto relative z-10">
          No spam. Just high-quality articles on architecture, performance, and modern web development once a month.
        </p>
        
        <form className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto relative z-10" onSubmit={(e) => e.preventDefault()}>
          <input 
            type="email" 
            placeholder="samarth@example.com"
            className="flex-1 bg-black/50 border border-white/10 rounded-full px-6 py-4 text-white outline-none focus:border-accent-blue/50 transition-colors"
            required
          />
          <MagneticButton className="px-8 py-4 rounded-full bg-white text-black flex items-center justify-center gap-2 hover:bg-white/90">
            Subscribe <Send className="w-4 h-4" />
          </MagneticButton>
        </form>
      </motion.div>
    </section>
  );
}
