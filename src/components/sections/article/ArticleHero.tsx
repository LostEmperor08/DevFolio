"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { BlogPost } from "@/types";
import { motionPresets } from "@/lib/motion";
import { Clock, Calendar } from "lucide-react";
import Image from "next/image";

export function ArticleHero({ post }: { post: BlogPost }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <>
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 right-0 left-0 z-50 h-1 origin-left bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"
        style={{ scaleX }}
      />

      <section className="relative z-10 mx-auto w-full max-w-[1100px] px-6 py-20">
        <motion.div
          variants={motionPresets.fadeUp}
          initial="initial"
          animate="animate"
          className="mb-8 flex flex-wrap items-center gap-3 font-mono text-xs"
        >
          <span className="rounded-full border border-cyan-500/30 bg-cyan-500/10 px-3.5 py-1.5 font-bold tracking-wider text-cyan-400 uppercase shadow-sm">
            {post.category || "ENGINEERING"}
          </span>
          <span className="rounded-full border border-purple-500/30 bg-purple-500/10 px-3.5 py-1.5 font-bold tracking-wider text-purple-400 uppercase shadow-sm">
            DEEP DIVE • 15 MIN READ
          </span>
        </motion.div>

        <motion.h1
          variants={motionPresets.fadeUp}
          initial="initial"
          animate="animate"
          className="mb-8 text-4xl leading-[1.08] font-bold tracking-tighter text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {post.title}
        </motion.h1>

        <motion.p
          variants={motionPresets.fadeUp}
          initial="initial"
          animate="animate"
          className="text-muted-foreground mb-12 max-w-3xl text-lg leading-relaxed font-light sm:text-xl md:text-2xl"
        >
          {post.description}
        </motion.p>

        {/* Author & Meta Bar */}
        <motion.div
          variants={motionPresets.fadeUp}
          initial="initial"
          animate="animate"
          className="flex flex-wrap items-center justify-between gap-6 border-y border-white/10 py-8"
        >
          <div className="flex items-center gap-4">
            <div className="border-accent-blue/40 relative h-14 w-14 shrink-0 overflow-hidden rounded-full border-2 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
              <Image
                src={post.author?.avatar || "/images/avatar.jpg"}
                alt={post.author?.name || "Samarth Patil"}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-base font-bold text-white">
                {post.author?.name || "Samarth Patil"}
              </span>
              <span className="font-mono text-xs text-cyan-400">
                {post.author?.role || "Senior Full-Stack & Cybersecurity Engineer"}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-6 sm:gap-8">
            <div className="text-muted-foreground flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1.5 font-mono text-sm">
              <Calendar className="text-accent-blue h-4 w-4" />
              {post.publishedDate || "July 2026"}
            </div>
            <div className="text-muted-foreground flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-3 py-1.5 font-mono text-sm">
              <Clock className="text-accent-purple h-4 w-4" />
              {post.readingTime || "15 min read"}
            </div>
          </div>
        </motion.div>

        {/* Cover Image Banner */}
        {post.coverImage && (
          <motion.div
            variants={motionPresets.fadeUp}
            initial="initial"
            animate="animate"
            className="group relative mt-12 h-[300px] w-full overflow-hidden rounded-3xl border border-white/15 shadow-[0_20px_50px_rgba(0,0,0,0.7)] sm:h-[420px] md:h-[520px]"
          >
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-50" />
            <div className="absolute bottom-6 left-6 z-10 flex items-center gap-2">
              <span className="rounded-full border border-white/20 bg-black/80 px-3.5 py-1.5 font-mono text-xs text-white backdrop-blur-md">
                ARCHITECTURAL CASE STUDY // PROTOTYPE TO PRODUCTION
              </span>
            </div>
          </motion.div>
        )}
      </section>
    </>
  );
}
