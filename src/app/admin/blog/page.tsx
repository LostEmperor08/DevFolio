import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { Plus } from "lucide-react";
import { BlogListTable } from "@/components/admin/blog/BlogListTable";

export default async function BlogAdminPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const resolvedParams = await searchParams;
  const q = typeof resolvedParams.q === "string" ? resolvedParams.q : "";
  const sort = typeof resolvedParams.sort === "string" ? resolvedParams.sort : "publishedDate";
  const order = typeof resolvedParams.order === "string" ? resolvedParams.order : "desc";
  const page = typeof resolvedParams.page === "string" ? parseInt(resolvedParams.page) : 1;
  const limit = 10;
  const skip = (page - 1) * limit;

  const [blogs, total] = await Promise.all([
    prisma.blogPost.findMany({
      where: {
        OR: [
          { title: { contains: q, mode: "insensitive" } },
          { category: { contains: q, mode: "insensitive" } },
        ],
      },
      orderBy: { [sort]: order },
      skip,
      take: limit,
    }),
    prisma.blogPost.count({
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
        title="Editorial CMS"
        description="Write and publish technical articles."
        action={
          <Link href="/admin/blog/new">
            <AdminButton>
              <Plus className="mr-2 h-4 w-4" /> Write Article
            </AdminButton>
          </Link>
        }
      />

      <BlogListTable
        initialBlogs={blogs}
        total={total}
        currentPage={page}
        currentQuery={q}
        currentSort={sort}
      />
    </div>
  );
}
