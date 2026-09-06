"use client";

import { motion } from "framer-motion";
import { skillCategories } from "@/data/skills";

export function Skills() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-4xl px-6 py-20 sm:py-28" id="skills">
      {/* Section Header */}
      <div className="mb-12">
        <div className="flex items-center gap-2 mb-2">
          <span className="h-1.5 w-1.5 rounded-full bg-white/40" />
          <span className="font-mono text-xs uppercase tracking-widest text-zinc-400">
            03 / Tech Arsenal
          </span>
        </div>
        <h2 className="text-2xl font-semibold tracking-tight text-white sm:text-3xl">
          Tools, languages & concepts.
        </h2>
        <p className="mt-2 text-sm text-zinc-400 max-w-xl">
          The core stack and tools I use for building software, solving problems, and coursework.
        </p>
      </div>

      {/* Categorized Skills Grid */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {skillCategories.map((category, i) => {
          const Icon = category.icon;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.08 }}
              className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-5 transition-all hover:border-white/15"
            >
              <div className="flex items-center gap-2.5 mb-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-zinc-300">
                  <Icon className="h-3.5 w-3.5" />
                </div>
                <h3 className="text-sm font-medium text-white">{category.title}</h3>
              </div>
              <p className="text-xs text-zinc-400 mb-4 font-normal">
                {category.description}
              </p>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg border border-white/[0.06] bg-white/[0.03] px-2.5 py-1 font-mono text-xs text-zinc-300 transition-colors hover:border-white/20 hover:text-white"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
