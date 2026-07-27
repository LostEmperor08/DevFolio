"use client";

import { memo } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import Image from "next/image";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
  isSelected?: boolean;
}

const sharedTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 35,
  mass: 0.8,
};

export const ProjectCard = memo(function ProjectCard({
  project,
  onClick,
  isSelected,
}: ProjectCardProps) {
  if (!project) return null;

  return (
    <motion.div
      layoutId={`card-container-${project.slug}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      transition={sharedTransition}
      className={`group relative flex h-full w-full transform-gpu cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-indigo-950/25 to-slate-950/95 p-0 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_12px_40px_rgba(6,182,212,0.15)] focus:ring-2 focus:ring-cyan-400 focus:outline-none ${
        isSelected ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      {/* Top Thumbnail Section (16:9 Aspect Ratio) */}
      <motion.div
        layoutId={`card-image-wrapper-${project.slug}`}
        transition={sharedTransition}
        className="relative aspect-video w-full shrink-0 overflow-hidden bg-slate-950"
      >
        <Image
          src={project.previewImage || "/images/samarth_os_preview.jpg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 transition-opacity group-hover:opacity-60" />

        {/* Floating Category Badge */}
        <motion.div
          layoutId={`card-category-${project.slug}`}
          transition={sharedTransition}
          className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2"
        >
          <span className="rounded-full border border-white/20 bg-black/75 px-3 py-1 font-mono text-[10px] font-bold tracking-wider text-cyan-400 uppercase shadow-md backdrop-blur-md">
            {project.category || "Web App"}
          </span>
        </motion.div>

        {/* Floating Status Badge */}
        <motion.div
          layoutId={`card-status-${project.slug}`}
          transition={sharedTransition}
          className="absolute top-3.5 right-3.5 z-10"
        >
          <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 font-mono text-[10px] font-semibold text-emerald-300 shadow-md backdrop-blur-md">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
            {project.status || "Completed"}
          </span>
        </motion.div>
      </motion.div>

      {/* Balanced Body Content Section (No Large Empty Spaces) */}
      <div className="flex flex-1 flex-col justify-between bg-gradient-to-b from-white/[0.02] to-transparent p-6">
        <div>
          <motion.h3
            layoutId={`card-title-${project.slug}`}
            transition={sharedTransition}
            className="text-lg leading-snug font-bold tracking-tight text-white transition-colors group-hover:text-cyan-300 md:text-xl"
          >
            {project.title}
          </motion.h3>
          <motion.p
            layoutId={`card-desc-${project.slug}`}
            transition={sharedTransition}
            className="mt-2.5 line-clamp-2 text-xs leading-relaxed font-light text-zinc-400 md:text-sm"
          >
            {project.description}
          </motion.p>
        </div>

        {/* Technology Pills & Action Trigger */}
        <motion.div
          layoutId={`card-tech-${project.slug}`}
          transition={sharedTransition}
          className="mt-6 flex flex-wrap items-center justify-between gap-1.5 border-t border-white/10 pt-4"
        >
          <div className="flex flex-wrap items-center gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[10px] font-medium text-zinc-300 transition-colors group-hover:border-white/20 group-hover:bg-white/10"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="rounded-md border border-white/10 bg-white/5 px-2 py-1 font-mono text-[10px] font-semibold text-cyan-400">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
          <span className="flex shrink-0 items-center gap-1 font-mono text-xs font-semibold text-cyan-400 opacity-80 transition-all group-hover:translate-x-0.5 group-hover:opacity-100">
            Explore <ArrowUpRight className="h-3.5 w-3.5" />
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
});
