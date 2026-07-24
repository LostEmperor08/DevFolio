"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { SectionHeading } from "../ui/SectionHeading";
import { blogs } from "@/data/blogs";
import { ArrowRight } from "lucide-react";
import { MagneticButton } from "../ui/MagneticButton";
import Link from "next/link";

export function BlogPreview() {
  return (
    <section className="w-full max-w-[1200px] px-6 py-32 md:py-48 relative z-10 mx-auto" id="blog">
      <SectionHeading 
        title="Editorial" 
        subtitle="Thoughts on engineering, design, and the future of the web."
      />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
        {blogs.map((blog, index) => (
          <Link key={blog.slug} href={`/blog/${blog.slug}`} className="block h-full">
            <motion.article 
              variants={motionPresets.fadeUp}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group cursor-pointer flex flex-col p-4 rounded-3xl glass-panel border border-transparent hover:border-white/10 transition-colors duration-500 h-full"
            >
              <div className="w-full aspect-[4/3] rounded-2xl bg-white/5 border border-white/5 mb-6 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue/10 to-transparent transition-transform duration-700 group-hover:scale-105" />
                {/* Fallback image style since images don't exist yet */}
                <div className="absolute inset-0 flex items-center justify-center text-muted-foreground font-mono text-xs opacity-30">
                  [COVER: {blog.slug}]
                </div>
              </div>
              
              <div className="px-2 flex flex-col flex-1">
                <div className="flex items-center gap-3 mb-4 text-xs font-mono">
                  <span className="text-accent-purple bg-accent-purple/10 px-2 py-1 rounded-md">{blog.category}</span>
                  <span className="text-muted-foreground/50">•</span>
                  <span className="text-muted-foreground">{blog.readingTime}</span>
                </div>
                
                <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-accent-blue transition-colors text-foreground">
                  {blog.title}
                </h3>
                
                <p className="text-muted-foreground text-sm leading-relaxed mb-8 flex-1">
                  {blog.description}
                </p>
                
                <div className="flex items-center gap-2 text-sm font-medium text-foreground group-hover:text-accent-blue transition-colors mt-auto">
                  Read Article <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
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
        className="flex justify-center mt-20"
      >
        <MagneticButton variant="ghost" className="px-8 py-4 rounded-full border-white/20 hover:bg-white/5">
          View All Editorials
        </MagneticButton>
      </motion.div>
    </section>
  );
}
