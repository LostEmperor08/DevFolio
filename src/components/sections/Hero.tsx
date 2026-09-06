"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Sparkles, Terminal, Code2, Cpu } from "lucide-react";
import Link from "next/link";
import { profile } from "@/config/profile";

export function Hero() {
  return (
    <section
      className="relative flex min-h-[90vh] w-full items-center justify-center px-6 pt-32 pb-16"
      id="hero"
    >
      <div className="mx-auto flex w-full max-w-4xl flex-col items-center text-center">
        {/* Status Pill */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-4 py-1.5 text-xs text-zinc-300 backdrop-blur-md transition-colors hover:border-white/20"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500"></span>
          </span>
          <span className="font-mono text-zinc-400">ISE Student</span>
          <span className="text-zinc-600">|</span>
          <span className="text-zinc-300">Open for Hackathons & Projects</span>
        </motion.div>

        {/* Main Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-white leading-[1.1]"
        >
          Engineering scalable systems.
          <span className="block text-zinc-400 font-light mt-1">
            Obsessed with performance & craft.
          </span>
        </motion.h1>

        {/* Narrative Bio */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mt-6 text-base sm:text-lg text-zinc-300 max-w-2xl leading-relaxed font-light"
        >
          Hi, I'm <span className="font-medium text-white">{profile.personal.name}</span> — an Information Science & Engineering student diving into algorithms, software architecture, and modern web interfaces. Focused on writing minimal code that does big things.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3.5"
        >
          <Link
            href="/#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black transition-all hover:bg-zinc-200 active:scale-95"
          >
            <span>View Projects</span>
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>

          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-5 py-2.5 text-xs font-medium text-white backdrop-blur-sm transition-all hover:border-white/25 hover:bg-white/[0.08]"
          >
            <span>Get in Touch</span>
          </Link>

          <a
            href={profile.social.github.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.07] bg-white/[0.02] px-4 py-2.5 text-xs font-medium text-zinc-400 transition-all hover:border-white/20 hover:text-white"
          >
            <span>GitHub</span>
            <ArrowUpRight className="h-3.5 w-3.5 opacity-60" />
          </a>
        </motion.div>

        {/* Minimal Interactive Code / Identity Pill Card */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-16 w-full max-w-xl overflow-hidden rounded-2xl border border-white/[0.08] bg-black/40 text-left shadow-2xl backdrop-blur-xl"
        >
          {/* Card Window Header */}
          <div className="flex items-center justify-between border-b border-white/[0.06] px-4 py-3 bg-white/[0.02]">
            <div className="flex items-center gap-1.5">
              <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
              <div className="h-2.5 w-2.5 rounded-full bg-white/20" />
            </div>
            <div className="flex items-center gap-1.5 font-mono text-[11px] text-zinc-400">
              <Terminal className="h-3 w-3 text-zinc-500" />
              <span>samarth@ise:~$ info</span>
            </div>
            <div className="w-8" />
          </div>

          {/* Card Body */}
          <div className="p-5 font-mono text-xs leading-relaxed text-zinc-300">
            <div className="space-y-1.5">
              <p>
                <span className="text-zinc-500">const</span>{" "}
                <span className="text-purple-300">student</span> = &#123;
              </p>
              <p className="pl-4">
                <span className="text-blue-300">name</span>:{" "}
                <span className="text-emerald-300">"{profile.personal.name}"</span>,
              </p>
              <p className="pl-4">
                <span className="text-blue-300">branch</span>:{" "}
                <span className="text-emerald-300">"Information Science & Engineering"</span>,
              </p>
              <p className="pl-4">
                <span className="text-blue-300">year</span>:{" "}
                <span className="text-amber-300">1</span>,
              </p>
              <p className="pl-4">
                <span className="text-blue-300">exploring</span>: [
                <span className="text-emerald-300">"DSA"</span>,{" "}
                <span className="text-emerald-300">"Next.js"</span>,{" "}
                <span className="text-emerald-300">"Python"</span>,{" "}
                <span className="text-emerald-300">"Systems"</span>],
              </p>
              <p className="pl-4">
                <span className="text-blue-300">curiosity</span>:{" "}
                <span className="text-cyan-300">Infinity</span>
              </p>
              <p>&#125;;</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
