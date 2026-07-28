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
  Box,
  CheckCircle2,
  Cpu,
  Shield,
  Cloud,
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

// Simulated Contribution Squares for Vercel/Linear GitHub activity preview
const contributionSquares = [
  "bg-emerald-500",
  "bg-emerald-600",
  "bg-white/5",
  "bg-emerald-500/80",
  "bg-emerald-400",
  "bg-white/10",
  "bg-emerald-500",
  "bg-emerald-600",
  "bg-white/5",
  "bg-emerald-500",
  "bg-emerald-400",
  "bg-emerald-500/60",
  "bg-white/5",
  "bg-emerald-500",
  "bg-emerald-600",
  "bg-emerald-400",
  "bg-emerald-500/40",
  "bg-emerald-500",
  "bg-white/10",
  "bg-emerald-500",
  "bg-emerald-600",
  "bg-emerald-400",
  "bg-emerald-500",
  "bg-white/5",
  "bg-emerald-500",
  "bg-emerald-400",
  "bg-emerald-600",
  "bg-white/5",
  "bg-emerald-500/80",
  "bg-emerald-500",
  "bg-emerald-400",
  "bg-emerald-600",
];

const renderCardHeader = (id: string) => {
  switch (id) {
    case "who-i-am":
      return (
        <div className="w-full space-y-4">
          {/* Top Profile Badge & Location */}
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-black/60 p-4 shadow-inner">
            <div className="flex items-center gap-3.5">
              <div className="relative flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cyan-500/40 bg-gradient-to-br from-cyan-500/20 to-indigo-500/10 font-mono text-lg font-bold tracking-tighter text-cyan-300 shadow-[0_0_20px_rgba(6,182,212,0.2)]">
                SP
                <span className="absolute right-0 bottom-0 h-3 w-3 rounded-full border-2 border-black bg-emerald-400 shadow-[0_0_8px_#34d399]" />
              </div>
              <div className="space-y-0.5 font-mono text-xs">
                <div className="flex items-center gap-2 font-bold text-white">
                  <span>Samarth Patil</span>
                  <span className="rounded-full border border-cyan-500/30 bg-cyan-500/15 px-2 py-0.5 text-[10px] font-semibold text-cyan-300">
                    CS Student
                  </span>
                </div>
                <div className="text-muted-foreground flex items-center gap-1.5 text-[11px]">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-cyan-400" /> Aspiring
                  Security & Backend Engineer
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2 rounded-lg border border-white/5 bg-white/5 px-2.5 py-1 font-mono text-[10px] text-zinc-400">
              <span>loc: India</span>
              <span className="text-zinc-600">|</span>
              <span className="font-semibold text-emerald-400">ONLINE</span>
            </div>
          </div>

          {/* Interactive macOS Terminal Snippet */}
          <div className="w-full rounded-2xl border border-white/10 bg-slate-950/90 p-4 font-mono text-xs shadow-2xl transition-colors group-hover/bento:border-white/20">
            <div className="mb-3 flex items-center justify-between border-b border-white/10 pb-3 text-[10px] text-zinc-400">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
                <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-semibold text-zinc-400">bash - samarth@linux:~</span>
              </div>
              <span className="font-semibold tracking-wider text-cyan-400">100% SECURE</span>
            </div>
            <div className="space-y-2 text-zinc-300">
              <div className="flex items-center gap-2">
                <span className="font-bold text-emerald-400">$</span>
                <span className="text-white">whoami</span>
              </div>
              <div className="pl-4 font-semibold text-cyan-300">
                &gt; Samarth Patil • 18yo CS Student • India
              </div>
              <div className="flex items-center gap-2 pt-1">
                <span className="font-bold text-emerald-400">$</span>
                <span className="text-white">cat focus.json</span>
              </div>
              <div className="pl-4 leading-relaxed break-words text-zinc-300">
                {"{"} <span className="text-purple-400">"backend"</span>:{" "}
                <span className="text-emerald-300">"Scalable APIs"</span>,{" "}
                <span className="text-purple-400">"security"</span>:{" "}
                <span className="text-emerald-300">"Ethical Hacking"</span>,{" "}
                <span className="text-purple-400">"cloud"</span>:{" "}
                <span className="text-emerald-300">"Linux & Distributed Systems"</span> {"}"}
              </div>
            </div>
          </div>
        </div>
      );
    case "current-stack":
      return (
        <div className="w-full space-y-4 rounded-2xl border border-white/10 bg-black/60 p-4 shadow-inner transition-colors group-hover/bento:border-white/20">
          <div className="space-y-2">
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-widest text-cyan-400 uppercase">
              <Cpu className="h-3 w-3" /> {"// CORE BACKEND & DEV"}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Python", "TypeScript", "Next.js 16", "PostgreSQL", "Git"].map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-cyan-500/25 bg-cyan-500/10 px-2.5 py-1 font-mono text-xs font-medium text-cyan-200 transition-colors hover:border-cyan-500/50 hover:bg-cyan-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="space-y-2 border-t border-white/10 pt-2">
            <div className="flex items-center gap-1.5 font-mono text-[10px] font-bold tracking-widest text-purple-400 uppercase">
              <Cloud className="h-3 w-3" /> {"// CLOUD & INFRASTRUCTURE"}
            </div>
            <div className="flex flex-wrap gap-1.5">
              {["Linux", "Docker", "GitHub", "Vercel", "Tailwind CSS"].map((tech) => (
                <span
                  key={tech}
                  className="rounded-lg border border-purple-500/25 bg-purple-500/10 px-2.5 py-1 font-mono text-xs font-medium text-purple-200 transition-colors hover:border-purple-500/50 hover:bg-purple-500/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
          <div className="mt-3 flex flex-wrap items-center justify-between gap-2 border-t border-white/10 pt-3 font-mono text-xs">
            <span className="flex items-center gap-1.5 text-zinc-400">
              <span className="h-2 w-2 animate-pulse rounded-full bg-amber-400" /> Exploring:
            </span>
            <span className="rounded-lg border border-amber-500/40 bg-amber-500/15 px-2.5 py-0.5 font-bold text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.2)]">
              Rust & Cloud Sec
            </span>
          </div>
        </div>
      );
    case "favorite-tools":
      return (
        <div className="grid w-full grid-cols-2 gap-2.5 rounded-2xl border border-white/10 bg-black/60 p-3.5 shadow-inner transition-colors group-hover/bento:border-white/20 sm:grid-cols-4">
          {[
            { name: "VS Code", icon: <Code2 className="h-4 w-4 text-blue-400" /> },
            { name: "GitHub", icon: <GitBranch className="h-4 w-4 text-white" /> },
            { name: "Linux", icon: <Terminal className="h-4 w-4 text-amber-400" /> },
            { name: "Postman", icon: <Send className="h-4 w-4 text-orange-400" /> },
            { name: "Neon DB", icon: <Database className="h-4 w-4 text-emerald-400" /> },
            { name: "Vercel", icon: <Triangle className="h-4 w-4 fill-white text-white" /> },
            { name: "Docker", icon: <Box className="h-4 w-4 text-cyan-400" /> },
            { name: "Figma", icon: <FigmaIcon className="h-4 w-4 text-purple-400" /> },
          ].map((tool) => (
            <div
              key={tool.name}
              className="group/tool flex flex-col items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] p-3 text-zinc-300 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-500/40 hover:bg-white/10 hover:text-white hover:shadow-[0_4px_15px_rgba(6,182,212,0.15)]"
            >
              {tool.icon}
              <span className="mt-1.5 text-center font-mono text-[10px] font-medium tracking-tight">
                {tool.name}
              </span>
            </div>
          ))}
        </div>
      );
    case "what-drives-me":
      return (
        <div className="w-full space-y-5 rounded-2xl border border-white/10 bg-black/60 p-5 shadow-inner transition-colors group-hover/bento:border-white/20">
          {/* Visual Roadmap Timeline */}
          <div className="relative flex flex-wrap items-center justify-between gap-y-4 border-b border-white/10 pb-4">
            <div className="absolute top-1/2 right-4 left-4 hidden h-0.5 -translate-y-1/2 bg-gradient-to-r from-cyan-500/30 via-purple-500/30 to-emerald-500/30 md:block" />
            {[
              {
                step: "01",
                label: "Python",
                color: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10",
              },
              {
                step: "02",
                label: "Automation",
                color: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10",
              },
              {
                step: "03",
                label: "Telegram Bots",
                color: "text-blue-300 border-blue-500/30 bg-blue-500/10",
              },
              {
                step: "04",
                label: "Backend Dev",
                color: "text-indigo-300 border-indigo-500/30 bg-indigo-500/10",
              },
              {
                step: "05",
                label: "Cybersecurity",
                color: "text-purple-300 border-purple-500/30 bg-purple-500/10",
              },
              {
                step: "06",
                label: "Cloud Infra",
                color:
                  "text-emerald-300 border-emerald-500/40 bg-emerald-500/15 font-bold shadow-[0_0_15px_rgba(52,211,153,0.25)]",
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

          {/* GitHub Contribution Activity Preview */}
          <div className="space-y-2">
            <div className="flex items-center justify-between font-mono text-[10px] text-zinc-400">
              <span className="flex items-center gap-1.5 font-semibold tracking-wider text-emerald-400 uppercase">
                <CheckCircle2 className="h-3 w-3" /> {"// 2026 CONTINUOUS LEARNING ACTIVITY"}
              </span>
              <span className="text-zinc-400">350+ Contributions Simulated</span>
            </div>
            <div className="grid grid-cols-16 gap-1 overflow-hidden rounded-xl border border-white/5 bg-slate-950/80 p-3 sm:gap-1.5">
              {contributionSquares.map((color, i) => (
                <div
                  key={i}
                  className={`h-2.5 w-full rounded-[3px] sm:h-3.5 ${color} transition-transform duration-300 hover:z-10 hover:scale-125`}
                  title={`Activity square ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      );
    default:
      return null;
  }
};

export function About() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-[1400px] px-6 py-32 md:py-48" id="about">
      {/* Top Header Section */}
      <motion.div
        variants={motionPresets.slideReveal}
        initial="initial"
        whileInView="whileInView"
        viewport={{ once: true, margin: "-100px" }}
        className="mx-auto mb-24 max-w-4xl space-y-8 text-center"
      >
        <SectionHeading
          title="Building My Future"
          subtitle={aboutContent.heading}
          kicker="01 // ORIGIN"
          centered
        />
        <p className="text-muted-foreground mx-auto max-w-3xl text-base leading-relaxed font-light md:text-lg">
          {aboutContent.story}
        </p>
        <div className="mx-auto my-12 h-px w-24 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent" />
        <p className="text-foreground/90 border-accent-blue/50 mx-auto max-w-2xl border-l-2 pl-6 text-left font-serif text-lg leading-relaxed italic md:text-xl">
          "{aboutContent.mission}"
        </p>
      </motion.div>

      {/* Interactive Bento Grid: 2x2 on Desktop, Stacked on Mobile */}
      <motion.div
        variants={motionPresets.staggerChildren(0.1)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, margin: "-50px" }}
        className="w-full"
      >
        <BentoGrid className="md:grid-cols-2 lg:grid-cols-4 lg:gap-8">
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
    </section>
  );
}
