"use client";

import { ProjectsHero } from "@/components/sections/projects/ProjectsHero";
import { ProjectsGrid } from "@/components/sections/projects/ProjectsGrid";
import { OpenSource } from "@/components/sections/projects/OpenSource";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { projects } from "@/data/projects";

export default function ProjectsPage() {
  const featuredProject = projects.find(p => p.featured) || projects[0];
  const otherProjects = projects.filter(p => p.slug !== featuredProject.slug);

  return (
    <main className="flex min-h-screen flex-col items-center pb-0 relative overflow-x-hidden pt-32">
      <ProjectsHero project={featuredProject} />
      <ProjectsGrid projects={otherProjects} />
      <OpenSource />
      <FinalCTA />
    </main>
  );
}
