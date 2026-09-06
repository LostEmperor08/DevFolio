"use client";

import { motion } from "framer-motion";
import { ArrowRight, Mail } from "lucide-react";
import Link from "next/link";
import { profile } from "@/config/profile";

export function FinalCTA() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-4xl px-6 py-20 sm:py-28 text-center" id="connect">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.5 }}
        className="rounded-3xl border border-white/[0.08] bg-gradient-to-b from-white/[0.03] to-transparent p-8 sm:p-14"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1 text-xs text-zinc-400 mb-6">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
          <span>Currently in Semester 1/2 · Open to Projects & Hackathons</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white max-w-lg mx-auto">
          Have an idea or want to collaborate?
        </h2>

        <p className="mt-3 text-sm text-zinc-400 max-w-md mx-auto leading-relaxed">
          I'm always excited to connect with other developers, join hackathon squads, or work on interesting open-source software.
        </p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-xs font-semibold text-black transition-all hover:bg-zinc-200 active:scale-95"
          >
            <Mail className="h-3.5 w-3.5" />
            <span>Go to Contact Page</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <a
            href={`mailto:${profile.personal.email}`}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-5 py-3 text-xs font-medium text-white transition-all hover:border-white/20 hover:bg-white/[0.06]"
          >
            <span>Direct Email</span>
          </a>
        </div>
      </motion.div>
    </section>
  );
}
