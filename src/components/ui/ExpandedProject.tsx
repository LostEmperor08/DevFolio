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
  Layers,
} from "lucide-react";
import { useEffect } from "react";
import Image from "next/image";
import { Project } from "@/types";

interface ExpandedProjectProps {
  project: Project;
  onClose: () => void;
}

const sharedTransition = {
  type: "spring" as const,
  stiffness: 400,
  damping: 35,
  mass: 0.8,
};

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
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 md:p-10">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, ease: "easeInOut" }}
        onClick={onClose}
        className="fixed inset-0 bg-black/85 backdrop-blur-md"
      />

      {/* Expanded Shared Layout Card Window */}
      <motion.div
        layoutId={`card-container-${project.slug}`}
        transition={sharedTransition}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 max-h-[90vh] w-full max-w-3xl transform-gpu overflow-y-auto rounded-3xl border border-white/20 bg-slate-950/95 p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.9)] will-change-transform focus:outline-none md:p-8"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Top Header Bar: Category, Status, Close Button */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-3">
            <motion.div layoutId={`card-category-${project.slug}`} transition={sharedTransition}>
              <span className="rounded-full border border-cyan-500/30 bg-cyan-500/15 px-3 py-1 font-mono text-xs font-bold tracking-widest text-cyan-300 uppercase shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                {project.category || "Web App"}
              </span>
            </motion.div>
            <motion.div layoutId={`card-status-${project.slug}`} transition={sharedTransition}>
              <span className="flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/15 px-3 py-1 font-mono text-xs font-semibold text-emerald-300 shadow-sm">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                {project.status || "Completed"}
              </span>
            </motion.div>
          </div>
          <button
            onClick={onClose}
            className="rounded-full p-2 text-zinc-400 transition-all duration-200 hover:rotate-90 hover:bg-white/10 hover:text-white"
            aria-label="Close modal"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Title & Metadata */}
        <div className="mt-6">
          <motion.h2
            id="modal-title"
            layoutId={`card-title-${project.slug}`}
            transition={sharedTransition}
            className="text-2xl leading-tight font-bold tracking-tight text-white md:text-3xl lg:text-4xl"
          >
            {project.title}
          </motion.h2>
          <div className="text-muted-foreground mt-3 flex flex-wrap items-center gap-5 font-mono text-xs">
            {project.role && (
              <span className="flex items-center gap-1.5 text-zinc-300">
                <User className="h-3.5 w-3.5 text-cyan-400" /> {project.role}
              </span>
            )}
            {project.timeline && (
              <span className="flex items-center gap-1.5 text-zinc-300">
                <Calendar className="h-3.5 w-3.5 text-purple-400" /> {project.timeline}
              </span>
            )}
          </div>
        </div>

        {/* Shared Layout 16:9 Cover Image Thumbnail */}
        <motion.div
          layoutId={`card-image-wrapper-${project.slug}`}
          transition={sharedTransition}
          className="relative mt-6 aspect-video w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-950 shadow-2xl"
        >
          <Image
            src={project.previewImage || "/images/samarth_os_preview.jpg"}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 800px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
        </motion.div>

        {/* Animated Modal Body Contents (Fade in after expansion) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.3, ease: "easeOut" }}
          className="mt-8 space-y-8"
        >
          {/* Project Overview */}
          <div className="space-y-3">
            <h3 className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-cyan-400 uppercase">
              <Layers className="h-3.5 w-3.5" /> {"// ARCHITECTURAL OVERVIEW"}
            </h3>
            <p className="rounded-xl border border-white/5 bg-white/[0.02] p-4.5 text-sm leading-relaxed font-light text-zinc-200 md:text-base">
              {project.overview || project.caseStudy?.overview || project.description}
            </p>
          </div>

          {/* Key Features */}
          {((project.features && project.features.length > 0) ||
            (project.caseStudy?.goals && project.caseStudy.goals.length > 0)) && (
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-emerald-400 uppercase">
                <CheckCircle2 className="h-3.5 w-3.5" /> {"// KEY CAPABILITIES & FEATURES"}
              </h3>
              <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                {(project.features || project.caseStudy?.goals || []).map(
                  (feature: string, idx: number) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] p-3.5 text-xs text-zinc-200 transition-colors hover:border-white/20 md:text-sm"
                    >
                      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400" />
                      <span className="leading-relaxed font-light">{feature}</span>
                    </div>
                  )
                )}
              </div>
            </div>
          )}

          {/* Challenges Solved */}
          {(project.challenges || project.caseStudy?.technicalChallenges) && (
            <div className="space-y-3">
              <h3 className="flex items-center gap-2 font-mono text-xs font-bold tracking-widest text-purple-400 uppercase">
                <ShieldAlert className="h-3.5 w-3.5" /> {"// ENGINEERING CHALLENGES SOLVED"}
              </h3>
              <div className="flex items-start gap-3.5 rounded-xl border border-purple-500/25 bg-gradient-to-r from-purple-500/10 to-transparent p-4.5 text-xs leading-relaxed font-light text-zinc-200 md:text-sm">
                <ShieldAlert className="mt-0.5 h-5 w-5 shrink-0 text-purple-400" />
                <div>{project.challenges || project.caseStudy?.technicalChallenges}</div>
              </div>
            </div>
          )}

          {/* Tech Stack Badges */}
          <motion.div
            layoutId={`card-tech-${project.slug}`}
            transition={sharedTransition}
            className="space-y-3"
          >
            <h3 className="font-mono text-xs font-bold tracking-widest text-zinc-400 uppercase">
              {"// TECH STACK & PRIMITIVES"}
            </h3>
            <div className="flex flex-wrap gap-2">
              {project.techStack.map((tech: string) => (
                <span
                  key={tech}
                  className="rounded-lg border border-white/15 bg-white/5 px-3 py-1.5 font-mono text-xs font-medium text-zinc-200 shadow-sm transition-all hover:scale-105 hover:border-cyan-500/50 hover:bg-cyan-500/15 hover:text-cyan-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Footer Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
            <div className="flex w-full flex-wrap items-center gap-3 sm:w-auto">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3 font-mono text-xs font-semibold text-white shadow-sm transition-all hover:border-white/40 hover:bg-white/15 sm:flex-initial"
                >
                  <GitBranch className="h-4 w-4" /> Source Code
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 px-6 py-3 font-mono text-xs font-semibold text-white shadow-[0_0_25px_rgba(6,182,212,0.35)] transition-all hover:scale-[1.02] hover:from-cyan-400 hover:to-blue-500 hover:shadow-[0_0_35px_rgba(6,182,212,0.6)] sm:flex-initial"
                >
                  <ExternalLink className="h-4 w-4" /> Live Demo
                </a>
              )}
            </div>
            {project.timeline && (
              <span className="text-muted-foreground/70 w-full text-center font-mono text-xs sm:w-auto sm:text-right">
                Status: {project.status} {"//"} {project.timeline}
              </span>
            )}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
