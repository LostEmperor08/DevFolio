"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onClick?: () => void;
  featured?: boolean; // Kept for backwards compatibility if needed
}

export function ProjectCard({ project, onClick }: ProjectCardProps) {
  if (!project) return null;

  return (
    <motion.div
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick?.();
        }
      }}
      className="group relative flex h-full w-full transform-gpu cursor-pointer flex-col justify-between overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/90 via-indigo-950/30 to-slate-950/90 p-0 shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:shadow-[0_8px_32px_rgba(6,182,212,0.15)] focus:ring-2 focus:ring-cyan-400 focus:outline-none"
    >
      {/* Thumbnail Cover Image (16:9 Aspect Ratio) */}
      <div className="relative aspect-video w-full overflow-hidden bg-slate-950">
        <Image
          src={project.previewImage || "/images/samarth_os_preview.jpg"}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10 flex items-center gap-2">
          <span className="rounded-full border border-white/20 bg-black/70 px-2.5 py-0.5 font-mono text-[10px] font-bold tracking-wider text-cyan-400 uppercase shadow-md backdrop-blur-md">
            {project.category || "Web App"}
          </span>
        </div>

        {/* Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-2.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-400 backdrop-blur-md">
            {project.status || "Completed"}
          </span>
        </div>
      </div>

      {/* Body Content Section */}
      <div className="flex flex-1 flex-col justify-between p-6">
        <div>
          <h3 className="text-lg font-bold tracking-tight text-white transition-colors group-hover:text-cyan-300 md:text-xl">
            {project.title}
          </h3>
          <p className="text-muted-foreground mt-2 line-clamp-2 text-xs leading-relaxed font-light md:text-sm">
            {project.description}
          </p>
        </div>

        {/* Technology Badges & Expand Indicator */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-1.5 border-t border-white/5 pt-4">
          <div className="flex flex-wrap gap-1.5">
            {project.techStack.slice(0, 4).map((tech) => (
              <span
                key={tech}
                className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] font-medium text-zinc-300 transition-colors group-hover:border-white/20"
              >
                {tech}
              </span>
            ))}
            {project.techStack.length > 4 && (
              <span className="rounded border border-white/10 bg-white/5 px-2 py-0.5 font-mono text-[10px] font-medium text-zinc-400">
                +{project.techStack.length - 4}
              </span>
            )}
          </div>
          <span className="flex shrink-0 items-center gap-1 font-mono text-[11px] font-semibold text-cyan-400 opacity-0 transition-opacity group-hover:opacity-100">
            Expand <ArrowRight className="h-3 w-3" />
          </span>
        </div>
      </div>
    </motion.div>
  );
}
