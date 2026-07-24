"use client";

import { motion } from "framer-motion";
import { Project } from "@/types";
import { motionPresets } from "@/lib/motion";
import { ArrowRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { MagneticButton } from "@/components/ui/MagneticButton";

export function ProjectsHero({ project }: { project: Project }) {
  if (!project) return null;

  return (
    <section className="w-full max-w-[1200px] px-6 py-20 relative z-10 mx-auto">
      {/* Narrative Kicker */}
      <motion.div 
        variants={motionPresets.fadeUp}
        initial="initial"
        animate="animate"
        className="flex items-center gap-4 mb-8"
      >
        <span className="w-12 h-px bg-accent-blue/50" />
        <span className="font-mono text-sm text-accent-blue uppercase tracking-[0.3em] font-semibold">
          01 // FLAGSHIP
        </span>
      </motion.div>

      {/* Massive Typography */}
      <motion.div 
        variants={motionPresets.fadeUp}
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-end mb-16"
      >
        <div className="lg:col-span-7">
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50 pb-4 leading-[0.9]">
            {project.title}
          </h1>
        </div>
        <div className="lg:col-span-5 pb-4">
          <p className="text-muted-foreground text-xl font-light leading-relaxed mb-8">
            {project.description}
          </p>
          <div className="flex gap-4">
             <Link href={`/projects/${project.slug}`}>
               <MagneticButton className="px-8 py-4 rounded-full bg-white text-black flex items-center gap-2">
                 Read Case Study <ArrowRight className="w-4 h-4" />
               </MagneticButton>
             </Link>
          </div>
        </div>
      </motion.div>

      {/* Cinematic Visual with Metrics Overlay */}
      <motion.div 
        variants={motionPresets.scaleIn}
        initial="initial"
        animate="animate"
        className="relative w-full h-[60vh] min-h-[500px] rounded-3xl overflow-hidden glass-panel border border-white/10 group"
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent z-10" />
        
        {/* Placeholder for the actual image. If real image exists, next/image would be used here. */}
        <div className="absolute inset-0 bg-white/5 group-hover:scale-105 transition-transform duration-[2s] ease-out flex items-center justify-center">
           <span className="font-mono text-muted-foreground opacity-30">[ASSET: {project.previewImage}]</span>
        </div>

        {/* Metrics Grid Overlay */}
        <div className="absolute bottom-0 left-0 w-full p-8 md:p-12 z-20 flex flex-col md:flex-row justify-between items-end gap-8">
           <div className="flex flex-wrap gap-3">
             {project.techStack.map(tech => (
               <span key={tech} className="px-4 py-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-sm font-medium text-white/90">
                 {tech}
               </span>
             ))}
           </div>
           
           <div className="flex gap-8 md:gap-16 bg-black/50 backdrop-blur-md border border-white/10 rounded-2xl p-6">
             {project.metrics?.map((metric, i) => (
               <div key={i} className="flex flex-col">
                 <span className="text-3xl md:text-4xl font-bold text-white mb-1">{metric.value}</span>
                 <span className="text-xs font-mono text-accent-blue uppercase tracking-wider">{metric.label}</span>
               </div>
             ))}
           </div>
        </div>
      </motion.div>
    </section>
  );
}
