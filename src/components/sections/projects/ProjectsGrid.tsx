"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Project } from "@/types";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { ExpandedProject } from "@/components/ui/ExpandedProject";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { motionPresets } from "@/lib/motion";
import { cn } from "@/lib/utils";

interface ProjectsGridProps {
  projects: Project[];
  title?: string;
  subtitle?: string;
  kicker?: string;
  className?: string;
}

export function ProjectsGrid({ projects, title, subtitle, kicker, className }: ProjectsGridProps) {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  if (!projects || projects.length === 0) return null;

  return (
    <section className={cn("relative z-10 mx-auto w-full max-w-[1250px] px-6 py-20", className)}>
      {title ? (
        <SectionHeading title={title} subtitle={subtitle} kicker={kicker} />
      ) : (
        <motion.div
          variants={motionPresets.fadeUp}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="mb-12 flex items-center gap-4"
        >
          <span className="bg-accent-blue/50 h-px w-12" />
          <span className="text-accent-blue font-mono text-sm font-semibold tracking-[0.3em] uppercase">
            {kicker || "02 // THE ARCHIVE"}
          </span>
        </motion.div>
      )}

      {/* Responsive Grid: Mobile 1 col, Tablet 2 col, Desktop 2 or 3 col with equal card heights */}
      <div className="mt-12 grid auto-rows-fr grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
        {projects.map((project) => (
          <div key={project.slug} className="col-span-1 h-full w-full">
            <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
          </div>
        ))}
      </div>

      {/* Expandable Card Modal Overlay */}
      <AnimatePresence>
        {selectedProject && (
          <ExpandedProject project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
