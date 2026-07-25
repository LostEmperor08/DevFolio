import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { BlogForm } from "@/components/admin/forms/BlogForm";
import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";

export default async function EditBlogPage({ params }: { params: { id: string } }) {
  const blog = await prisma.blogPost.findUnique({
    where: { id: params.id },
    include: { content: true },
  });

  if (!blog) notFound();

  return (
    <div className="w-full">
      <AdminPageHeader title={`Editing: ${blog.title}`} backHref="/admin/blog" />
      <div className="mt-6">
        <BlogForm initialData={blog} />
      </div>
    </div>
  );
}
