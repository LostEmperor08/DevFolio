"use client";

import { motion } from "framer-motion";
import {
  X,
  ExternalLink,
  GitBranch,
  CheckCircle2,
  ShieldAlert,
  Calendar,
  User,
} from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";
import { Project } from "@/types";

interface ExpandedProjectProps {
  project: Project;
  onClose: () => void;
}

export function ExpandedProject({ project, onClose }: ExpandedProjectProps) {
  // ESC key and body scroll lock
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />

      {/* Expanded Modal Window */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        onClick={(e) => e.stopPropagation()}
        className="glass-panel relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-white/20 bg-slate-950/95 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.8)] focus:outline-none md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Top Bar: Category, Status, Close Button */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2.5">
            <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3 py-1 font-mono text-xs font-bold tracking-widest text-cyan-300 uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)]">
              {project.category || "Web App"}
            </span>
            <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-400">
              {project.status || "Completed"}
            </span>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-zinc-400 transition-colors hover:bg-white/10 hover:text-white"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Title & Metadata */}
        <div className="mt-6">
          <h2 id="modal-title" className="text-2xl font-bold tracking-tight text-white md:text-3xl">
            {project.title}
          </h2>
          <div className="text-muted-foreground mt-2 flex flex-wrap items-center gap-4 font-mono text-xs">
            {project.role && (
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-cyan-400" /> {project.role}
              </span>
            )}
            {project.timeline && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-purple-400" /> {project.timeline}
              </span>
            )}
          </div>
        </div>

        {/* 16:9 Cover Image Thumbnail */}
        <div className="relative mt-6 aspect-video w-full overflow-hidden rounded-xl border border-white/10 shadow-lg">
          <Image
            src={project.previewImage || "/images/samarth_os_preview.jpg"}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </div>

        {/* Project Overview */}
        <div className="mt-8 space-y-3">
          <h3 className="font-mono text-xs font-bold tracking-widest text-cyan-400 uppercase">
            {"// PROJECT OVERVIEW"}
          </h3>
          <p className="text-sm leading-relaxed font-light text-zinc-300 md:text-base">
            {project.overview || project.caseStudy?.overview || project.description}
          </p>
        </div>

        {/* Key Features */}
        {((project.features && project.features.length > 0) ||
          (project.caseStudy?.goals && project.caseStudy.goals.length > 0)) && (
          <div className="mt-8 space-y-3">
            <h3 className="font-mono text-xs font-bold tracking-widest text-emerald-400 uppercase">
              {"// KEY FEATURES"}
            </h3>
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
              {(project.features || project.caseStudy?.goals || []).map(
                (feature: string, idx: number) => (
                  <div
                    key={idx}
                    className="flex items-start gap-2.5 rounded-lg border border-white/5 bg-white/[0.02] p-3 text-xs text-zinc-300 md:text-sm"
                  >
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                    <span className="leading-relaxed">{feature}</span>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Challenges Solved */}
        {(project.challenges || project.caseStudy?.technicalChallenges) && (
          <div className="mt-8 space-y-3">
            <h3 className="font-mono text-xs font-bold tracking-widest text-purple-400 uppercase">
              {"// CHALLENGES SOLVED"}
            </h3>
            <div className="flex items-start gap-3 rounded-xl border border-purple-500/20 bg-purple-500/5 p-4 text-xs leading-relaxed text-zinc-300 md:text-sm">
              <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-purple-400" />
              <div>{project.challenges || project.caseStudy?.technicalChallenges}</div>
            </div>
          </div>
        )}

        {/* Tech Stack Badges */}
        <div className="mt-8 space-y-3">
          <h3 className="font-mono text-xs font-bold tracking-widest text-zinc-400 uppercase">
            {"// TECHNOLOGIES USED"}
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.techStack.map((tech: string) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/5 px-3 py-1.5 font-mono text-xs font-medium text-zinc-200 shadow-sm transition-colors hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-300"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Footer Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
          <div className="flex flex-wrap items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg border border-white/15 bg-white/5 px-5 py-2.5 font-mono text-xs font-semibold text-white transition-all hover:border-white/30 hover:bg-white/10"
              >
                <GitBranch className="h-4 w-4" /> GitHub Repository
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 px-5 py-2.5 font-mono text-xs font-semibold text-white shadow-[0_0_20px_rgba(6,182,212,0.3)] transition-all hover:from-cyan-400 hover:to-blue-500 hover:shadow-[0_0_25px_rgba(6,182,212,0.5)]"
              >
                <ExternalLink className="h-4 w-4" /> Live Demo
              </a>
            )}
          </div>
          {project.timeline && (
            <span className="text-muted-foreground/60 font-mono text-xs">
              Completed: {project.timeline}
            </span>
          )}
        </div>
      </motion.div>
    </div>
  );
}
