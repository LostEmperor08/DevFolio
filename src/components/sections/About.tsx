"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { SectionHeading } from "../ui/SectionHeading";
import { aboutContent } from "@/data/about";
import { BentoGrid } from "../ui/BentoGrid";
import { BentoItem } from "../ui/BentoItem";
import {
  Fingerprint,
  Terminal,
  Wrench,
  Flame,
  Code2,
  GitBranch,
  Send,
  Database,
  Triangle,
} from "lucide-react";

const FigmaIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 5.5A3.5 3.5 0 0 1 8.5 2H12v7H8.5A3.5 3.5 0 0 1 5 5.5z" />
    <path d="M12 2h3.5a3.5 3.5 0 1 1 0 7H12V2z" />
    <path d="M12 12.5a3.5 3.5 0 1 1 7 0 3.5 3.5 0 1 1-7 0z" />
    <path d="M5 19.5A3.5 3.5 0 0 1 8.5 16H12v3.5a3.5 3.5 0 1 1-7 0z" />
    <path d="M5 12.5A3.5 3.5 0 0 1 8.5 9H12v7H8.5A3.5 3.5 0 0 1 5 12.5z" />
  </svg>
);

const iconMap: Record<string, React.ReactNode> = {
  "who-i-am": <Fingerprint className="h-5 w-5" />,
  "current-stack": <Terminal className="h-5 w-5" />,
  "favorite-tools": <Wrench className="h-5 w-5" />,
  "what-drives-me": <Flame className="h-5 w-5" />,
};

const renderCardHeader = (id: string) => {
  switch (id) {
    case "who-i-am":
      return (
        <div className="relative mb-4 flex h-36 w-full items-center justify-between rounded-xl border border-white/10 bg-black/60 p-5 shadow-inner transition-colors group-hover/bento:border-white/20">
          <div className="flex items-center gap-4">
            <div className="relative flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-cyan-500/40 bg-gradient-to-br from-cyan-500/20 to-indigo-500/10 font-mono text-xl font-bold tracking-tighter text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
              SP
              <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-black bg-emerald-400 shadow-[0_0_8px_#34d399]" />
            </div>
            <div className="space-y-1 font-mono text-xs">
              <div className="flex items-center gap-2 font-semibold text-white">
                <span>Samarth</span>
                <span className="rounded-full bg-white/10 px-2 py-0.5 text-[10px] text-cyan-400">
                  CS Student
                </span>
              </div>
              <div className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" /> Aspiring
                Security & Backend Engineer
              </div>
              <div className="text-muted-foreground/60 text-[10px]">
                loc: India // env: Cloud & Linux
              </div>
            </div>
          </div>
        </div>
      );
    case "current-stack":
      return (
        <div className="relative mb-4 flex h-auto min-h-[140px] w-full flex-col justify-between rounded-xl border border-white/10 bg-black/60 p-4 shadow-inner transition-colors group-hover/bento:border-white/20">
          <div className="flex flex-wrap gap-1.5">
            {[
              "Python",
              "Next.js",
              "TypeScript",
              "PostgreSQL",
              "Git",
              "GitHub",
              "Linux",
              "Tailwind CSS",
              "Vercel",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 font-mono text-[11px] font-medium text-zinc-300 transition-all duration-300 hover:border-cyan-500/40 hover:bg-cyan-500/10 hover:text-cyan-300 hover:shadow-[0_0_12px_rgba(6,182,212,0.2)]"
              >
                {tech}
              </span>
            ))}
          </div>
          <div className="mt-3.5 flex items-center justify-between border-t border-white/10 pt-2.5 font-mono text-[11px]">
            <span className="text-muted-foreground flex items-center gap-1.5">
              <span className="h-2 w-2 animate-pulse rounded-full bg-purple-400" /> Currently
              Learning:
            </span>
            <span className="rounded-md border border-purple-500/30 bg-purple-500/10 px-2.5 py-0.5 font-bold text-purple-300 shadow-[0_0_12px_rgba(168,85,247,0.2)]">
              Rust
            </span>
          </div>
        </div>
      );
    case "favorite-tools":
      return (
        <div className="relative mb-4 grid grid-cols-4 gap-2 rounded-xl border border-white/10 bg-black/60 p-3 shadow-inner transition-colors group-hover/bento:border-white/20">
          {[
            { name: "VS Code", icon: <Code2 className="h-4 w-4" /> },
            { name: "GitHub", icon: <GitBranch className="h-4 w-4" /> },
            { name: "Linux", icon: <Terminal className="h-4 w-4" /> },
            { name: "Postman", icon: <Send className="h-4 w-4" /> },
            { name: "Neon", icon: <Database className="h-4 w-4" /> },
            { name: "Vercel", icon: <Triangle className="h-4 w-4 fill-current" /> },
            { name: "Figma", icon: <FigmaIcon className="h-4 w-4" /> },
          ].map((tool) => (
            <div
              key={tool.name}
              className="group/tool flex flex-col items-center justify-center rounded-lg border border-white/5 bg-white/[0.03] p-2 text-zinc-400 transition-all duration-300 hover:-translate-y-0.5 hover:border-white/20 hover:bg-white/10 hover:text-white hover:shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              {tool.icon}
              <span className="mt-1 font-mono text-[9px] tracking-tight">{tool.name}</span>
            </div>
          ))}
        </div>
      );
    case "what-drives-me":
      return (
        <div className="relative mb-4 flex h-auto min-h-[140px] w-full flex-col justify-center rounded-xl border border-white/10 bg-black/60 p-5 shadow-inner transition-colors group-hover/bento:border-white/20">
          <div className="relative flex flex-wrap items-center justify-between gap-y-4">
            <div className="absolute top-1/2 right-4 left-4 hidden h-0.5 -translate-y-1/2 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-blue-500/30 md:block" />
            {[
              {
                step: "01",
                label: "Python",
                color: "text-cyan-400 border-cyan-500/30 bg-cyan-500/10",
              },
              {
                step: "02",
                label: "Automation",
                color: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10",
              },
              {
                step: "03",
                label: "Telegram Bots",
                color: "text-blue-400 border-blue-500/30 bg-blue-500/10",
              },
              {
                step: "04",
                label: "Backend Dev",
                color: "text-indigo-400 border-indigo-500/30 bg-indigo-500/10",
              },
              {
                step: "05",
                label: "Cybersecurity",
                color: "text-purple-400 border-purple-500/30 bg-purple-500/10",
              },
              {
                step: "06",
                label: "Cloud Computing",
                color: "text-emerald-400 border-emerald-500/30 bg-emerald-500/10",
              },
            ].map((node) => (
              <div key={node.label} className="group/node relative z-10 flex flex-col items-center">
                <div className="mb-1.5 flex h-7 w-7 items-center justify-center rounded-full border border-white/20 bg-slate-950 font-mono text-[10px] font-bold text-zinc-400 transition-all duration-300 group-hover/node:scale-110 group-hover/node:border-white group-hover/node:text-white group-hover/node:shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                  {node.step}
                </div>
                <span
                  className={`rounded-full border px-2.5 py-0.5 font-mono text-[10px] font-semibold tracking-tight transition-all duration-300 group-hover/node:scale-105 ${node.color}`}
                >
                  {node.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
};

export function About() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-32 md:py-48" id="about">
      <div className="grid grid-cols-1 items-start gap-16 lg:grid-cols-12">
        {/* Left Side: Editorial Story */}
        <motion.div
          variants={motionPresets.slideReveal}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="sticky top-32 lg:col-span-5"
        >
          <SectionHeading
            title="Building My Future"
            subtitle={aboutContent.heading}
            kicker="01 // ORIGIN"
          />

          <div className="mt-10 space-y-8">
            <p className="text-muted-foreground/90 max-w-lg text-base leading-relaxed font-light lg:text-lg">
              {aboutContent.story}
            </p>
            <div className="my-10 h-px w-12 bg-white/20" />
            <p className="text-foreground/90 border-accent-blue max-w-md border-l-2 py-3 pl-6 font-serif text-lg leading-relaxed italic lg:text-xl">
              "{aboutContent.mission}"
            </p>
          </div>
        </motion.div>

        {/* Right Side: Interactive Bento */}
        <motion.div
          variants={motionPresets.staggerChildren(0.1)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, margin: "-50px" }}
          className="lg:col-span-7"
        >
          <BentoGrid className="md:grid-cols-3">
            {aboutContent.bento.map((item) => (
              <BentoItem
                key={item.id}
                title={item.title}
                description={item.description}
                icon={iconMap[item.id]}
                className={item.colSpan}
                header={renderCardHeader(item.id)}
              />
            ))}
          </BentoGrid>
        </motion.div>
      </div>
    </section>
  );
}
