"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { BlogPost } from "@/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BlogFeatured({ post }: { post: BlogPost }) {
  if (!post) return null;

  return (
    <section className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-12">
      <Link href={`/blog/${post.slug}`} className="group block">
        <motion.div
          variants={motionPresets.scaleIn}
          initial="initial"
          animate="animate"
          className="glass-panel relative flex min-h-[500px] w-full flex-col overflow-hidden rounded-3xl border border-white/10 lg:flex-row"
        >
          {/* Image Section */}
          <div className="relative h-64 w-full overflow-hidden bg-white/5 lg:h-auto lg:w-3/5">
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 to-transparent lg:bg-gradient-to-r lg:from-black/90" />
            {post.coverImage ? (
              <img
                src={post.coverImage}
                alt={post.title}
                className="h-full w-full object-cover opacity-80 transition-transform duration-[2s] ease-out group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center bg-white/5 transition-transform duration-[2s] ease-out group-hover:scale-105">
                <span className="text-muted-foreground font-mono opacity-30">
                  [ASSET: {post.coverImage}]
                </span>
              </div>
            )}
          </div>

          {/* Content Section */}
          <div className="relative z-20 flex w-full flex-col justify-center bg-black/60 p-8 backdrop-blur-md md:p-12 lg:-ml-32 lg:w-2/5 lg:bg-transparent lg:backdrop-blur-none">
            <div className="mb-6 flex items-center gap-3 font-mono text-xs">
              <span className="text-accent-blue bg-accent-blue/10 border-accent-blue/20 rounded-full border px-3 py-1">
                Featured
              </span>
              <span className="text-muted-foreground">{post.publishedDate}</span>
              <span className="text-muted-foreground/50">•</span>
              <span className="text-muted-foreground">{post.readingTime}</span>
            </div>

            <h2 className="group-hover:text-accent-blue mb-6 text-3xl leading-[1.1] font-bold tracking-tight text-white transition-colors md:text-5xl">
              {post.title}
            </h2>

            <p className="text-muted-foreground mb-8 text-lg leading-relaxed">{post.description}</p>

            <div className="group-hover:text-accent-blue mt-auto flex items-center gap-2 font-bold text-white transition-colors">
              Read Article{" "}
              <ArrowRight className="h-5 w-5 transform transition-transform group-hover:translate-x-2" />
            </div>
          </div>
        </motion.div>
      </Link>
    </section>
  );
}
