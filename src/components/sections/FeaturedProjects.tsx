"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { Project } from "@/types";

const GithubIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section className="relative z-10 mx-auto w-full max-w-4xl px-6 py-20 sm:py-28" id="projects">
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            02 / Selected Builds
          </span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Things I've built & explored.
        </h2>
        <p className="mt-2 text-sm text-zinc-400 max-w-xl">
          Selected software projects spanning web engineering, automation bots, and core algorithms.
        </p>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <motion.div
            key={project.slug}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.4, delay: i * 0.1 }}
            className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
          >
            <div>
              {/* Card Image / Preview */}
              <div className="relative mb-4 aspect-[16/10] w-full overflow-hidden rounded-xl border border-white/10 bg-zinc-950">
                <Image
                  src={project.previewImage || "/images/samarth_os_preview.jpg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute top-2.5 right-2.5 rounded-full border border-white/10 bg-black/60 px-2 py-0.5 font-mono text-[10px] text-zinc-300 backdrop-blur-md">
                  {project.category}
                </span>
              </div>

              {/* Title & Description */}
              <h3 className="text-base font-semibold tracking-tight text-white transition-colors group-hover:text-zinc-200">
                {project.title}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-zinc-400">
                {project.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-white/[0.06]">
              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="rounded-md border border-white/5 bg-white/[0.03] px-2 py-0.5 font-mono text-[10px] text-zinc-400"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* Links */}
              <div className="flex items-center gap-3">
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400 transition-colors hover:text-white"
                  >
                    <GithubIcon className="h-3.5 w-3.5" />
                    <span>Source</span>
                    <ArrowUpRight className="h-3 w-3 opacity-60" />
                  </a>
                )}
                {project.liveUrl && project.liveUrl !== "#" && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs font-medium text-zinc-400 transition-colors hover:text-white ml-auto"
                  >
                    <span>Visit</span>
                    <ArrowUpRight className="h-3 w-3 opacity-60" />
                  </a>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
