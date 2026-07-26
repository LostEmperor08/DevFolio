import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { CaseStudyHero } from "@/components/sections/casestudy/CaseStudyHero";
import { CaseStudyContent } from "@/components/sections/casestudy/CaseStudyContent";
import { FinalCTA } from "@/components/sections/FinalCTA";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await prisma.project.findUnique({ where: { slug: resolvedParams.slug } });
  const settings = await prisma.siteSettings.findFirst();
  const baseUrl = settings?.url || "https://samarth.dev";

  if (!project) return {};

  return {
    title: project.title,
    description: project.description,
    openGraph: {
      title: project.title,
      description: project.description,
      type: "article",
      url: `${baseUrl}/projects/${project.slug}`,
      images: [{ url: project.previewImage, width: 1200, height: 630, alt: project.title }],
      authors: ["Samarth Patil"],
      publishedTime: new Date(project.createdAt).toISOString(),
    },
    twitter: {
      card: "summary_large_image",
      title: project.title,
      description: project.description,
      images: [project.previewImage],
    },
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;

  const project = await prisma.project.findUnique({
    where: { slug: resolvedParams.slug },
    include: {
      metrics: true,
      caseStudy: true,
    },
  });

  if (!project) {
    notFound();
  }

  const baseUrl = "https://samarth.dev"; // env config

  return (
    <main className="relative flex min-h-screen flex-col items-center overflow-x-hidden pt-20 pb-0">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: project.title,
            image: project.previewImage,
            datePublished: new Date(project.createdAt).toISOString(),
            dateModified: new Date(project.updatedAt).toISOString(),
            author: [
              {
                "@type": "Person",
                name: "Samarth Patil",
                url: baseUrl,
              },
            ],
          }),
        }}
      />
      <CaseStudyHero project={project as any} />
      <CaseStudyContent project={project as any} />
      <FinalCTA />
    </main>
  );
}
