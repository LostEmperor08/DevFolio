"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { SectionHeading } from "../ui/SectionHeading";
import { projects } from "@/data/projects";
import { ProjectCard } from "../ui/ProjectCard";
import { MagneticButton } from "../ui/MagneticButton";

export function FeaturedProjects() {
  const featured = projects[0];
  const supporting = projects.slice(1, 3);

  return (
    <section className="w-full max-w-[1200px] px-6 py-32 md:py-48 relative z-10 mx-auto" id="projects">
      <SectionHeading 
        title="Selected Works" 
        subtitle="A curated collection of my most recent engineering and design endeavors."
        kicker="02 // PORTFOLIO"
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16" style={{ perspective: 1200 }}>
         {/* Large Featured Project */}
         <ProjectCard project={featured} featured={true} />
         
         {/* Supporting Projects */}
         {supporting.map((project) => (
           <ProjectCard key={project.slug} project={project} />
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
          View All Projects
        </MagneticButton>
      </motion.div>
    </section>
  );
}
