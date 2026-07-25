import { ProjectsHero } from "@/components/sections/projects/ProjectsHero";
import { ProjectsGrid } from "@/components/sections/projects/ProjectsGrid";
import { OpenSource } from "@/components/sections/projects/OpenSource";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { ProjectService } from "@/services/project.service";

export default async function ProjectsPage() {
  const projects = await ProjectService.getAllProjects();

  const featuredProject = projects.find((p) => p.featured) || projects[0];
  const otherProjects = projects.filter((p) => p.slug !== featuredProject?.slug);

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-x-hidden pt-32 pb-0">
      <ProjectsHero project={featuredProject as any} />
      <ProjectsGrid projects={otherProjects as any} />
      <OpenSource />
      <FinalCTA />
    </main>
  );
}
