"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { BlogPost } from "@/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BlogList({ posts }: { posts: BlogPost[] }) {
  if (!posts || posts.length === 0) return null;

  return (
    <section className="w-full max-w-[1200px] px-6 py-20 relative z-10 mx-auto">
      <div className="flex items-center gap-4 mb-16">
        <span className="w-12 h-px bg-white/20" />
        <span className="font-mono text-sm text-white/50 uppercase tracking-[0.3em] font-semibold">
          LATEST ENTRIES
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-16">
        {posts.map((post, index) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="group block">
            <motion.article 
              variants={motionPresets.fadeUp}
              initial="initial"
              whileInView="whileInView"
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1 }}
              className="flex flex-col h-full"
            >
              <div className="flex items-center gap-3 mb-4 text-xs font-mono">
                <span className="text-accent-purple bg-accent-purple/10 px-2 py-1 rounded-md">{post.category}</span>
                <span className="text-muted-foreground/50">•</span>
                <span className="text-muted-foreground">{post.publishedDate}</span>
              </div>
              
              <h3 className="text-3xl font-bold tracking-tight text-white mb-4 group-hover:text-accent-blue transition-colors">
                {post.title}
              </h3>
              
              <p className="text-muted-foreground text-lg leading-relaxed mb-8 flex-1">
                {post.description}
              </p>
              
              <div className="flex items-center gap-2 text-sm font-bold text-white group-hover:text-accent-blue transition-colors mt-auto">
                Read Article <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.article>
          </Link>
        ))}
      </div>
    </section>
  );
}
