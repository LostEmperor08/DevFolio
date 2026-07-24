"use client";

import { motion } from "framer-motion";
import { MagneticButton } from "../ui/MagneticButton";
import { motionPresets } from "@/lib/motion";
import { Send, Download } from "lucide-react";

export function FinalCTA() {
  return (
    <section className="w-full min-h-screen px-6 py-48 md:py-64 relative z-10 flex flex-col justify-center overflow-hidden" id="contact">
      {/* Dramatic ambient lighting - Curtain Call */}
      <div className="absolute inset-0 bg-background/80 pointer-events-none z-[-1]" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background to-black pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[80vw] h-[40vw] rounded-full bg-accent-blue/10 blur-[150px] pointer-events-none" />
      
      <div className="max-w-[1200px] mx-auto text-center relative z-10 flex flex-col items-center">
        <motion.div
          variants={motionPresets.scaleIn}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <div className="inline-flex items-center justify-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-8 backdrop-blur-md">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-mono text-muted-foreground uppercase tracking-widest">Available for new opportunities</span>
          </div>

          <h2 className="text-6xl md:text-8xl lg:text-[10rem] font-bold tracking-tighter mb-8 leading-[0.9] text-transparent bg-clip-text bg-gradient-to-b from-white to-white/30 pb-4">
            Let's build <br/> the future.
          </h2>
          
          <p className="text-muted-foreground text-lg md:text-2xl mb-16 max-w-2xl mx-auto font-light leading-relaxed">
            The web is our canvas. Let's engineer something that demands attention and refuses to be forgotten.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton className="px-10 py-5 text-lg rounded-full bg-white text-black hover:bg-zinc-200 w-full sm:w-auto flex items-center justify-center gap-2">
              Start a Conversation <Send className="w-4 h-4" />
            </MagneticButton>
            <MagneticButton variant="ghost" className="px-10 py-5 text-lg rounded-full border-white/20 hover:bg-white/5 w-full sm:w-auto flex items-center justify-center gap-2">
              Download Resume <Download className="w-4 h-4" />
            </MagneticButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
