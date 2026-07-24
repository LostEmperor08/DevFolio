"use client";

import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from "framer-motion";
import { ExternalLink, GitBranch, ArrowRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { Project } from "@/types";

export function ProjectCard({ project, featured = false }: { project: Project, featured?: boolean }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseY, [-0.5, 0.5], ["7deg", "-7deg"]);
  const rotateY = useTransform(mouseX, [-0.5, 0.5], ["-7deg", "7deg"]);

  const mouseXPct = useTransform(mouseX, [-0.5, 0.5], ["0%", "100%"]);
  const mouseYPct = useTransform(mouseY, [-0.5, 0.5], ["0%", "100%"]);
  
  const background = useMotionTemplate`radial-gradient(circle at ${mouseXPct} ${mouseYPct}, rgba(255,255,255,0.08) 0%, transparent 60%)`;

  const [isHovered, setIsHovered] = useState(false);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseXPos = event.clientX - rect.left;
    const mouseYPos = event.clientY - rect.top;
    const xPct = mouseXPos / width - 0.5;
    const yPct = mouseYPos / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  }

  return (
    <Link href={`/projects/${project.slug}`} className={`col-span-1 block ${featured ? "md:col-span-2" : ""}`}>
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={handleMouseLeave}
        className={`relative group rounded-2xl glass-panel border border-white/5 hover:border-white/20 transition-colors duration-500 overflow-hidden flex flex-col shadow-2xl h-full ${featured ? "md:flex-row min-h-[450px]" : "min-h-[450px]"}`}
      >
      {/* Background Spotlight effect */}
      <motion.div 
        className="absolute inset-0 pointer-events-none z-0"
        style={{ background, opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      />
      
      {/* Image Section */}
      <div className={`relative overflow-hidden w-full ${featured ? "md:w-1/2 min-h-[250px]" : "h-1/2 min-h-[200px]"}`}>
         <div className="absolute inset-0 bg-white/5 transition-transform duration-700 group-hover:scale-105" />
         <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground font-mono text-xs z-10 opacity-30 gap-2">
            [PREVIEW ASSET: {project.slug}]
            <span className="opacity-0 group-hover:opacity-100 transition-opacity">Click to view case study</span>
         </div>
         <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent z-10" />
      </div>

      {/* Content Section */}
      <div className={`flex flex-col flex-1 p-8 relative z-20 bg-gradient-to-t from-black/80 to-transparent ${featured ? "md:w-1/2 justify-center bg-none" : "justify-between"}`}>
        <div style={{ transform: isHovered ? "translateZ(30px)" : "none", transition: "transform 0.3s ease" }}>
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs font-mono text-accent-blue px-2.5 py-1 rounded-full bg-accent-blue/10 border border-accent-blue/20">
              {project.status}
            </span>
          </div>
          
          <h3 className="text-2xl font-bold tracking-tight mb-3 group-hover:text-accent-blue transition-colors text-foreground">
            {project.title}
          </h3>
          
          <p className="text-muted-foreground text-sm leading-relaxed mb-6">
            {project.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {project.techStack.map((tech: string) => (
              <span key={tech} className="text-xs text-muted-foreground bg-white/5 px-2.5 py-1 rounded-md border border-white/5">
                {tech}
              </span>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between mt-auto" style={{ transform: isHovered ? "translateZ(40px)" : "none", transition: "transform 0.3s ease" }}>
           <div className="flex items-center gap-6">
             <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors z-30 relative" onClick={(e) => e.stopPropagation()}>
                <ExternalLink className="w-4 h-4" /> Live Demo
             </a>
             <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-white transition-colors z-30 relative" onClick={(e) => e.stopPropagation()}>
                <GitBranch className="w-4 h-4" /> Source
             </a>
           </div>
           <div className="text-sm font-mono text-accent-blue flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
             Case Study <ArrowRight className="w-4 h-4" />
           </div>
        </div>
      </div>
      </motion.div>
    </Link>
  );
}
