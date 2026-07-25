"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { SectionHeading } from "../ui/SectionHeading";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";
import Link from "next/link";
import Image from "next/image";

export function BlogPreview({ posts }: { posts: any[] }) {
  if (!posts || posts.length === 0) return null;
  const recentBlogs = posts.slice(0, 3);

  return (
    <section className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-32 md:py-48" id="blog">
      <SectionHeading
        title="Editorial"
        subtitle="Thoughts on engineering, design, and the future of the web."
      />

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
        {recentBlogs.map((blog, index) => (
          <Link key={blog.slug} href={`/blog/${blog.slug}`} className="block h-full">
            <motion.article
              variants={motionPresets.fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group glass-panel flex h-full cursor-pointer flex-col rounded-3xl border border-transparent p-4 transition-colors duration-500 hover:border-white/10"
            >
              <div className="relative mb-6 aspect-[4/3] w-full overflow-hidden rounded-2xl border border-white/5 bg-white/5">
                <div className="from-accent-blue/10 absolute inset-0 bg-gradient-to-tr to-transparent transition-transform duration-700 group-hover:scale-105" />
                {/* Fallback image style since images don't exist yet */}
                <div className="text-muted-foreground absolute inset-0 flex items-center justify-center font-mono text-xs opacity-30">
                  [COVER: {blog.slug}]
                </div>
              </div>

              <div className="flex flex-1 flex-col px-2">
                <div className="mb-4 flex items-center gap-3 font-mono text-xs">
                  <span className="text-accent-purple bg-accent-purple/10 rounded-md px-2 py-1">
                    {blog.category}
                  </span>
                  <span className="text-muted-foreground/50">•</span>
                  <span className="text-muted-foreground">{blog.readingTime}</span>
                </div>

                <h3 className="group-hover:text-accent-blue text-foreground mb-3 text-2xl font-bold tracking-tight transition-colors">
                  {blog.title}
                </h3>

                <p className="text-muted-foreground mb-8 flex-1 text-sm leading-relaxed">
                  {blog.description}
                </p>

                <div className="text-foreground group-hover:text-accent-blue mt-auto flex items-center gap-2 text-sm font-medium transition-colors">
                  Read Article{" "}
                  <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </motion.article>
          </Link>
        ))}
      </div>

      <motion.div
        variants={motionPresets.fadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="mt-20 flex justify-center"
      >
        <MagneticButton
          variant="ghost"
          className="rounded-full border-white/20 px-8 py-4 hover:bg-white/5"
        >
          View All Editorials
        </MagneticButton>
      </motion.div>
    </section>
  );
}
