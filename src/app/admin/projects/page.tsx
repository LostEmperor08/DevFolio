import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { ProjectListTable } from "@/components/admin/projects/ProjectListTable";

export default async function ProjectsAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === "string" ? resolvedParams.q : "";
  const sort = typeof resolvedParams.sort === "string" ? resolvedParams.sort : "createdAt";
  const order = typeof resolvedParams.order === "string" ? resolvedParams.order : "desc";
  const page = typeof resolvedParams.page === "string" ? parseInt(resolvedParams.page) : 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  // Manual ordering overrides sort
  const orderBy = sort === "manual" ? { orderIndex: "asc" as const } : { [sort]: order };

  const [projects, total] = await Promise.all([
    prisma.project.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { category: { contains: q, mode: "insensitive" } },
        ],
      },
      orderBy,
      skip,
      take: limit,
    }),
    prisma.project.count({
      where: {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { category: { contains: q, mode: "insensitive" } },
        ],
      },
    }),
  ]);

  return (
    <div className="max-w-6xl">
      <AdminPageHeader
        title="Projects"
        description="Manage your portfolio case studies and featured works."
        action={
          <Link href="/admin/projects/new">
            <AdminButton>
              <Plus className="mr-2 h-4 w-4" /> New Project
            </AdminButton>
          </Link>
        }
      />

      <ProjectListTable
        initialProjects={projects}
        total={total}
        currentPage={page}
        currentQuery={q}
        currentSort={sort}
      />
    </div>
  );
}
