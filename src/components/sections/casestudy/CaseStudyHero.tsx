"use client";

import { motion } from "framer-motion";
import { Project } from "@/types";
import { motionPresets } from "@/lib/motion";
import { ExternalLink, GitBranch, Calendar, User, Activity } from "lucide-react";

export function CaseStudyHero({ project }: { project: Project }) {
  if (!project) return null;

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
          CASE STUDY // {project.category}
        </span>
      </motion.div>

      <motion.div 
        variants={motionPresets.fadeUp}
        initial="initial"
        animate="animate"
        className="max-w-4xl mb-16"
      >
        <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50 pb-4 leading-[0.9] mb-8">
          {project.title}
        </h1>
        <p className="text-muted-foreground text-2xl font-light leading-relaxed">
          {project.description}
        </p>
      </motion.div>

      {/* Meta Bar */}
      <motion.div 
        variants={motionPresets.fadeUp}
        initial="initial"
        animate="animate"
        className="grid grid-cols-2 md:grid-cols-4 gap-8 py-8 border-y border-white/5 mb-16"
      >
        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono text-muted-foreground uppercase flex items-center gap-2"><User className="w-3 h-3"/> Role</span>
          <span className="text-sm font-medium">{project.role}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono text-muted-foreground uppercase flex items-center gap-2"><Calendar className="w-3 h-3"/> Timeline</span>
          <span className="text-sm font-medium">{project.timeline}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono text-muted-foreground uppercase flex items-center gap-2"><Activity className="w-3 h-3"/> Status</span>
          <span className="text-sm font-medium">{project.status}</span>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-xs font-mono text-muted-foreground uppercase">Links</span>
          <div className="flex gap-4">
             {project.liveUrl && (
               <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-accent-blue transition-colors flex items-center gap-1">
                 Live <ExternalLink className="w-3 h-3" />
               </a>
             )}
             {project.githubUrl && (
               <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-medium hover:text-accent-blue transition-colors flex items-center gap-1">
                 Source <GitBranch className="w-3 h-3" />
               </a>
             )}
          </div>
        </div>
      </motion.div>

      {/* Hero Visual */}
      <motion.div 
        variants={motionPresets.scaleIn}
        initial="initial"
        animate="animate"
        className="relative w-full h-[50vh] md:h-[70vh] rounded-3xl overflow-hidden glass-panel border border-white/10"
      >
         <div className="absolute inset-0 bg-white/5 flex items-center justify-center">
            <span className="font-mono text-muted-foreground opacity-30">[ASSET: {project.previewImage}]</span>
         </div>
      </motion.div>
    </section>
  );
}
