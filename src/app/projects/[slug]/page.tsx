import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { CaseStudyHero } from "@/components/sections/casestudy/CaseStudyHero";
import { CaseStudyContent } from "@/components/sections/casestudy/CaseStudyContent";
import { FinalCTA } from "@/components/sections/FinalCTA";

// Generate static params for all project slugs
export async function generateStaticParams() {
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const project = projects.find((p) => p.slug === resolvedParams.slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="flex min-h-screen flex-col items-center pb-0 relative overflow-x-hidden pt-20">
      <CaseStudyHero project={project} />
      <CaseStudyContent project={project} />
      <FinalCTA />
    </main>
  );
}
