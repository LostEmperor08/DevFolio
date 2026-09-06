"use client";

import { motion } from "framer-motion";
import { Cpu, Globe, Terminal, Sparkles } from "lucide-react";

const PILLARS = [
  {
    icon: Cpu,
    title: "CS & Systems Foundations",
    subtitle: "Data Structures & Algorithms",
    description:
      "Deep in core Computer Science fundamentals — algorithmic problem solving in C++, memory management, and computational complexity analysis.",
    tag: "Coursework & DSA",
  },
  {
    icon: Globe,
    title: "Modern Web Engineering",
    subtitle: "Next.js & TypeScript",
    description:
      "Crafting responsive, high-performance web applications with Next.js App Router, React 19, and Tailwind CSS. Prioritizing speed and clean code.",
    tag: "Frontend & Fullstack",
  },
  {
    icon: Terminal,
    title: "Scripting & Automation",
    subtitle: "Python & Linux CLI",
    description:
      "Building asynchronous Telegram bots, system monitoring scripts, and developer utilities using Python and standard Linux tooling.",
    tag: "Python & Tools",
  },
  {
    icon: Sparkles,
    title: "Minimalist Philosophy",
    subtitle: "Less noise, more signal",
    description:
      "I believe the best software is simple, thoughtful, and unbloated. Focused on writing readable code and shipping tangible projects.",
    tag: "Mindset",
  },
];

export function About() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-4xl px-6 py-20 sm:py-28" id="about">
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            01 / Journey & Focus
          </span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Engineering with intention.
        </h2>
        <p className="mt-2 text-sm text-zinc-400 max-w-xl">
          What I'm actively studying, building, and exploring in Information Science & Engineering.
        </p>
      </div>

      {/* 2x2 Minimal Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {PILLARS.map((pillar, i) => {
          const Icon = pillar.icon;
          return (
            <motion.div
              key={pillar.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="group relative flex flex-col justify-between rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition-all duration-300 hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-zinc-300 transition-colors group-hover:border-white/20 group-hover:text-white">
                    <Icon className="h-4 w-4" />
                  </div>
                  <span className="font-mono text-[10px] text-zinc-400 border border-white/5 rounded-full px-2.5 py-0.5 bg-white/[0.02]">
                    {pillar.tag}
                  </span>
                </div>
                <h3 className="text-base font-medium text-white tracking-tight">
                  {pillar.title}
                </h3>
                <p className="text-xs text-zinc-400 mb-2 font-mono">
                  {pillar.subtitle}
                </p>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
