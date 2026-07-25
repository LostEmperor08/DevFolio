import { AdminPageHeader } from "@/components/admin/ui/AdminPageHeader";
import { BlogForm } from "@/components/admin/forms/BlogForm";

export default function NewBlogPage() {
  return (
    <div className="w-full">
      <AdminPageHeader title="Write New Article" backHref="/admin/blog" />
      <div className="mt-6">
        <BlogForm />
      </div>
    </div>
  );
}
