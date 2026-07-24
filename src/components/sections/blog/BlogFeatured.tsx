"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { BlogPost } from "@/types";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function BlogFeatured({ post }: { post: BlogPost }) {
  if (!post) return null;

  return (
    <section className="w-full max-w-[1200px] px-6 py-12 relative z-10 mx-auto">
      <Link href={`/blog/${post.slug}`} className="group block">
        <motion.div 
          variants={motionPresets.scaleIn}
          initial="initial"
          animate="animate"
          className="relative w-full rounded-3xl overflow-hidden glass-panel border border-white/10 flex flex-col lg:flex-row min-h-[500px]"
        >
          {/* Image Section */}
          <div className="relative w-full lg:w-3/5 h-64 lg:h-auto overflow-hidden">
             <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-black/80 lg:from-black/90 to-transparent z-10" />
             <div className="absolute inset-0 bg-white/5 transition-transform duration-[2s] ease-out group-hover:scale-105 flex items-center justify-center">
                <span className="font-mono text-muted-foreground opacity-30">[ASSET: {post.coverImage}]</span>
             </div>
          </div>
          
          {/* Content Section */}
          <div className="relative z-20 w-full lg:w-2/5 p-8 md:p-12 flex flex-col justify-center bg-black/60 lg:bg-transparent backdrop-blur-md lg:backdrop-blur-none lg:-ml-32">
             <div className="flex items-center gap-3 mb-6 text-xs font-mono">
               <span className="text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-full border border-accent-blue/20">Featured</span>
               <span className="text-muted-foreground">{post.publishedDate}</span>
               <span className="text-muted-foreground/50">•</span>
               <span className="text-muted-foreground">{post.readingTime}</span>
             </div>
             
             <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white mb-6 group-hover:text-accent-blue transition-colors leading-[1.1]">
               {post.title}
             </h2>
             
             <p className="text-lg text-muted-foreground leading-relaxed mb-8">
               {post.description}
             </p>
             
             <div className="flex items-center gap-2 font-bold text-white group-hover:text-accent-blue transition-colors mt-auto">
                Read Article <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
             </div>
          </div>
        </motion.div>
      </Link>
    </section>
  );
}
