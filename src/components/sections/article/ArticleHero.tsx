"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { BlogPost } from "@/types";
import { motionPresets } from "@/lib/motion";
import { Clock, Calendar, User } from "lucide-react";

export function ArticleHero({ post }: { post: BlogPost }) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <>
      {/* Reading Progress Bar */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-accent-blue origin-left z-50"
        style={{ scaleX }}
      />
      
      <section className="w-full max-w-[1000px] px-6 py-20 relative z-10 mx-auto">
        <motion.div 
          variants={motionPresets.fadeUp}
          initial="initial"
          animate="animate"
          className="flex flex-wrap items-center gap-4 mb-8 text-xs font-mono"
        >
          <span className="text-accent-blue bg-accent-blue/10 px-3 py-1 rounded-full border border-accent-blue/20 uppercase">
            {post.category}
          </span>
          {post.difficulty && (
            <span className="text-accent-purple bg-accent-purple/10 px-3 py-1 rounded-full border border-accent-purple/20 uppercase">
              {post.difficulty}
            </span>
          )}
        </motion.div>

        <motion.h1 
          variants={motionPresets.fadeUp}
          initial="initial"
          animate="animate"
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white mb-8 leading-[1.05]"
        >
          {post.title}
        </motion.h1>

        <motion.p 
          variants={motionPresets.fadeUp}
          initial="initial"
          animate="animate"
          className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-12 max-w-3xl"
        >
          {post.description}
        </motion.p>

        {/* Author & Meta Bar */}
        <motion.div 
          variants={motionPresets.fadeUp}
          initial="initial"
          animate="animate"
          className="flex flex-wrap items-center justify-between gap-6 py-8 border-y border-white/10"
        >
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center overflow-hidden">
                <User className="w-6 h-6 text-muted-foreground" />
             </div>
             <div className="flex flex-col">
                <span className="text-white font-medium">{post.author.name}</span>
                <span className="text-xs text-muted-foreground">{post.author.role}</span>
             </div>
          </div>
          
          <div className="flex flex-wrap gap-8">
             <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
               <Calendar className="w-4 h-4" />
               {post.publishedDate}
             </div>
             <div className="flex items-center gap-2 text-sm text-muted-foreground font-mono">
               <Clock className="w-4 h-4" />
               {post.readingTime}
             </div>
          </div>
        </motion.div>
      </section>
    </>
  );
}
