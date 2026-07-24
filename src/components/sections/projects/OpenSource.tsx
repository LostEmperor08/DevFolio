"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { Code2, Star, GitBranch, Activity } from "lucide-react";
import { BentoItem } from "@/components/ui/BentoItem";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { profile } from "@/config/profile";

export function OpenSource() {
  return (
    <section className="w-full max-w-[1200px] px-6 py-32 relative z-10 mx-auto border-t border-white/5 mt-16">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
        
        {/* Left: Editorial */}
        <motion.div 
          variants={motionPresets.slideReveal}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-100px" }}
          className="lg:col-span-5 sticky top-32"
        >
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-px bg-accent-blue/50" />
            <span className="font-mono text-sm text-accent-blue uppercase tracking-[0.3em] font-semibold">
              03 // OPEN SOURCE
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-transparent bg-clip-text bg-gradient-to-br from-foreground to-foreground/50 pb-2">
            Building in the open.
          </h2>
          
          <p className="text-muted-foreground text-lg leading-relaxed mb-8">
            I believe that the best software is built collaboratively. I actively maintain several open-source libraries and contribute to the ecosystems that power the modern web.
          </p>
          
          <a href={profile.social.github.url} target="_blank" rel="noopener noreferrer">
             <MagneticButton className="px-8 py-4 flex items-center gap-2 rounded-full border-white/20 hover:bg-white/5">
                <Code2 className="w-5 h-5" /> View GitHub Profile
             </MagneticButton>
          </a>
        </motion.div>

        {/* Right: GitHub Stats Grid */}
        <motion.div 
          variants={motionPresets.staggerChildren(0.1)}
          initial="initial"
          whileInView="whileInView"
          viewport={{ once: true, margin: "-50px" }}
          className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          <BentoItem
            title="Total Stars"
            description="Across 15+ public repositories"
            icon={<Star className="w-5 h-5 text-yellow-500" />}
            header={<div className="text-5xl font-bold tracking-tighter mt-4 text-white group-hover/bento:text-yellow-400 transition-colors">1.2k</div>}
          />
          <BentoItem
            title="Contributions"
            description="In the last year alone"
            icon={<Activity className="w-5 h-5 text-emerald-500" />}
            header={<div className="text-5xl font-bold tracking-tighter mt-4 text-white group-hover/bento:text-emerald-400 transition-colors">842</div>}
          />
          <div className="sm:col-span-2">
             <BentoItem
               title="Latest Open Source Project"
               description="A highly concurrent microservice boilerplate built with Rust and gRPC."
               icon={<GitBranch className="w-5 h-5 text-accent-blue" />}
               header={
                 <div className="w-full h-24 rounded-lg bg-gradient-to-br from-white/5 to-white/0 border border-white/5 mb-4 overflow-hidden relative flex items-center justify-center">
                    <span className="font-mono text-muted-foreground text-sm">samarth/nexus-boilerplate</span>
                 </div>
               }
             />
          </div>
        </motion.div>
        
      </div>
    </section>
  );
}
