"use client";

import { motion } from "framer-motion";
import { Project } from "@/types";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { motionPresets } from "@/lib/motion";

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="w-full max-w-[1200px] px-6 py-20 relative z-10 mx-auto">
      <motion.div 
        variants={motionPresets.fadeUp}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
        className="flex items-center gap-4 mb-12"
      >
        <span className="w-12 h-px bg-accent-blue/50" />
        <span className="font-mono text-sm text-accent-blue uppercase tracking-[0.3em] font-semibold">
          02 // THE ARCHIVE
        </span>
      </motion.div>

      {/* Asymmetrical Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" style={{ perspective: 1200 }}>
        {projects.map((project, index) => {
          // Create an asymmetrical layout pattern based on index
          // Every 3rd item spans 2 columns on desktop
          const isWide = index % 3 === 0;
          
          return (
            <div key={project.slug} className={`col-span-1 ${isWide ? "md:col-span-2 lg:col-span-2" : ""}`}>
              <ProjectCard project={project} featured={isWide} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
