import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { ProjectForm } from "@/components/admin/forms/ProjectForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditProjectPage({ params }: { params: { id: string } }) {
  const project = await prisma.project.findUnique({
    where: { id: params.id },
    include: { caseStudy: true, metrics: true },
  });

  if (!project) notFound();

  return (
    <div className="max-w-4xl">
      <AdminPageHeader title={`Edit: ${project.title}`} backHref="/admin/projects" />
      <div className="glass-panel rounded-3xl border border-white/5 p-6 md:p-8">
        <ProjectForm initialData={project} />
      </div>
    </div>
  );
}
