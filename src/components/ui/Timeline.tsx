"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";

export function Timeline({ items }: { items: any[] }) {
  return (
    <div className="relative w-full max-w-4xl mx-auto py-10 mt-16">
      {/* Center Line */}
      <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-white/10 transform md:-translate-x-1/2" />

      {items.map((item, index) => {
        const isEven = index % 2 === 0;
        return (
          <motion.div 
            key={item.id}
            variants={motionPresets.slideReveal}
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, margin: "-100px" }}
            className={`relative flex items-center justify-between md:justify-normal w-full mb-16 ${isEven ? "md:flex-row-reverse" : ""}`}
          >
            {/* Timeline Dot */}
            <div className="absolute left-6 md:left-1/2 w-4 h-4 rounded-full bg-accent-blue border-4 border-background transform -translate-x-1/2 z-10 shadow-[0_0_15px_rgba(59,130,246,0.8)]" />

            {/* Empty space for alternating layout */}
            <div className="hidden md:block w-5/12" />

            {/* Content Card */}
            <div className={`w-full md:w-5/12 pl-16 md:pl-0 ${isEven ? "md:pr-12 text-left md:text-right" : "md:pl-12 text-left"}`}>
              <div className="p-8 rounded-2xl glass-panel border border-white/5 hover:border-white/20 transition-all duration-300 shadow-xl hover:shadow-2xl group">
                <span className="text-xs font-mono text-accent-blue mb-3 block tracking-widest">{item.duration}</span>
                <h3 className="text-2xl font-bold text-foreground mb-1 group-hover:text-accent-blue transition-colors">{item.title}</h3>
                <h4 className="text-sm font-medium text-muted-foreground/80 mb-5">{item.organization}</h4>
                <p className="text-base text-muted-foreground leading-relaxed mb-6">{item.description}</p>
                <div className={`flex flex-wrap gap-2 ${isEven ? "md:justify-end" : "justify-start"}`}>
                  {item.technologies.map((tech: string) => (
                    <span key={tech} className="text-[11px] font-mono text-muted-foreground bg-white/5 px-2 py-1 rounded border border-white/10">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
