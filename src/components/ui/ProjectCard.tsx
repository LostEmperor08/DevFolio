"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { ExternalLink, GitBranch, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Project } from "@/types";

export function ProjectCard({
  project,
  featured = false,
}: {
  project: Project;
  featured?: boolean;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const mouseXPct = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const mouseYPct = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);

  const background = useMotionTemplate`radial-gradient(circle at ${mouseXPct} ${mouseYPct}, rgba(59,130,246,0.15) 0%, transparent 60%)`;

  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseEnter() {
    if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return;
    setIsHovered(true);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }

  if (!project) return null;

  return (
    <Link
      href={`/projects/${project.slug}`}
      className={`col-span-1 block ${featured ? "md:col-span-2" : ""}`}
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-slate-900/95 via-indigo-950/40 to-slate-950 shadow-[0_10px_30px_rgba(0,0,0,0.6)] transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_40px_rgba(59,130,246,0.2)] ${featured ? "min-h-[450px] md:flex-row" : "min-h-[450px]"}`}
      >
        {/* Background Spotlight effect */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-0"
          style={{ background, opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        {/* Image Section */}
        <div
          className={`relative w-full overflow-hidden ${featured ? "min-h-[280px] md:w-1/2" : "h-1/2 min-h-[240px]"}`}
        >
          <Image
            src={project.previewImage || "/images/samarth_os_preview.jpg"}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
          <div className="absolute inset-0 z-10 bg-gradient-to-t from-slate-950/95 via-slate-950/20 to-transparent" />
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2">
            <span className="rounded-full border border-white/20 bg-black/70 px-3 py-1 font-mono text-[10px] font-bold tracking-widest text-cyan-400 uppercase shadow-lg backdrop-blur-md">
              {project.category || "ARCHITECTURE"}
            </span>
          </div>
        </div>

        {/* Content Section */}
        <div
          className={`relative z-20 flex flex-1 flex-col p-8 ${featured ? "justify-center bg-none md:w-1/2" : "justify-between"}`}
        >
          <div
            style={{
              transform: isHovered ? "translateZ(30px)" : "none",
              transition: "transform 0.3s ease",
            }}
          >
            <div className="mb-4 flex items-center justify-between">
              <span className="rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-semibold text-emerald-400">
                {project.status || "Completed"}
              </span>
            </div>

            <h3 className="mb-3 text-2xl font-bold tracking-tight text-white transition-colors group-hover:text-cyan-400">
              {project.title}
            </h3>

            <p className="text-muted-foreground mb-6 text-sm leading-relaxed">
              {project.description}
            </p>

            <div className="mb-8 flex flex-wrap gap-2">
              {project.techStack.map((tech: string) => (
                <span
                  key={tech}
                  className="text-muted-foreground rounded-md border border-white/5 bg-white/5 px-2.5 py-1 text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div
            className="mt-auto flex items-center justify-between"
            style={{
              transform: isHovered ? "translateZ(40px)" : "none",
              transition: "transform 0.3s ease",
            }}
          >
            <div className="flex items-center gap-6">
              <object>
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground relative z-30 flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <ExternalLink className="h-4 w-4" /> Live Demo
                </a>
              </object>
              <object>
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground relative z-30 flex items-center gap-2 text-sm font-medium transition-colors hover:text-white"
                  onClick={(e) => e.stopPropagation()}
                >
                  <GitBranch className="h-4 w-4" /> Source
                </a>
              </object>
            </div>
            <div className="text-accent-blue flex translate-x-4 items-center gap-2 font-mono text-sm opacity-0 transition-opacity duration-300 group-hover:translate-x-0 group-hover:opacity-100">
              Case Study <ArrowRight className="h-4 w-4" />
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
