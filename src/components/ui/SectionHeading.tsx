"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function SectionHeading({ 
  title, 
  subtitle, 
  kicker 
}: { 
  title: string; 
  subtitle?: string;
  kicker?: string;
}) {
  return (
    <motion.div 
      variants={motionPresets.slideReveal}
      initial="initial"
      whileInView="whileInView"
      viewport={{ once: true, margin: "-100px" }}
      className="mb-20 flex flex-col items-start"
    >
      {kicker && (
        <div className="flex items-center gap-4 mb-6">
          <span className="w-12 h-px bg-accent-blue/50" />
          <span className="font-mono text-xs md:text-sm text-accent-blue uppercase tracking-[0.3em] font-semibold">
            {kicker}
          </span>
        </div>
      )}
      <h2 className="text-5xl md:text-6xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-foreground via-foreground to-foreground/50 pb-2">
        {title}
      </h2>
      {subtitle && (
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl leading-relaxed font-light">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
