"use client";

import { motion } from "framer-motion";
import { motionPresets } from "@/lib/motion";
import { ProjectsGrid } from "./projects/ProjectsGrid";
import { MagneticButton } from "../ui/MagneticButton";
import Link from "next/link";
import { Project } from "@/types";

export function FeaturedProjects({ projects }: { projects: Project[] }) {
  if (!projects || projects.length === 0) return null;

  return (
    <section
      className="relative z-10 mx-auto w-full max-w-[1250px] overflow-hidden px-6 py-32 md:py-48"
      id="projects"
    >
      {/* Ambient Cyber Background Glows */}
      <div className="pointer-events-none absolute top-1/3 left-1/4 -z-10 h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[120px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 -z-10 h-[450px] w-[450px] rounded-full bg-purple-600/10 blur-[120px]" />

      <ProjectsGrid
        projects={projects.slice(0, 3)}
        title="Selected Works"
        subtitle="A curated collection of my most recent engineering and design endeavors."
        kicker="02 // PORTFOLIO ARCHITECTURE"
        className="px-0 py-0"
      />

      <motion.div
        variants={motionPresets.fadeUp}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        className="mt-20 flex justify-center"
      >
        <Link href="/projects">
          <MagneticButton
            variant="ghost"
            className="rounded-full border-white/20 px-8 py-4 text-white hover:bg-white/5"
          >
            View All Projects
          </MagneticButton>
        </Link>
      </motion.div>
    </section>
  );
}
