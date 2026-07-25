"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { SectionHeading } from "../ui/SectionHeading";
import { ProjectCard } from "../ui/ProjectCard";
import { MagneticButton } from "../ui/MagneticButton";

export function FeaturedProjects({ projects }: { projects: any[] }) {
  if (!projects || projects.length === 0) return null;
  const featured = projects[0];
  const supporting = projects.slice(1, 3);

  return (
    <section
      className="relative z-10 mx-auto w-full max-w-[1200px] px-6 py-32 md:py-48"
      id="projects"
    >
      <SectionHeading
        title="Selected Works"
        subtitle="A curated collection of my most recent engineering and design endeavors."
        kicker="02 // PORTFOLIO"
      />

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2" style={{ perspective: 1200 }}>
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
        className="mt-20 flex justify-center"
      >
        <MagneticButton
          variant="ghost"
          className="rounded-full border-white/20 px-8 py-4 hover:bg-white/5"
        >
          View All Projects
        </MagneticButton>
      </motion.div>
    </section>
  );
}
