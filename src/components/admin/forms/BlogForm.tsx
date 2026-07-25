"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createBlog, updateBlog, deleteBlog } from "@/app/actions/blog.actions";
import { AdminInput, AdminTextarea } from "@/components/admin/ui/AdminInput";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AlertCircle, Trash2, Clock, Save, Type } from "lucide-react";
import { useRouter } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { toast } from "sonner";
import { AdminModal } from "../ui/AdminModal";

const blogSchema = z.object({
  title: z.string().min(1, "Required"),
  slug: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  category: z.string().min(1, "Required"),
  readingTime: z.string().min(1, "Required"),
  publishedDate: z.string().min(1, "Required"),
  authorName: z.string().min(1, "Required"),
  authorAvatar: z.string().min(1, "Required"),
  authorRole: z.string().min(1, "Required"),
  tags: z.string().min(1, "Required"),
  coverImage: z.string().min(1, "Required"),
  featured: z.boolean(),
  draft: z.boolean(),
  contentRaw: z.string().min(1, "Content cannot be empty"),
});

type FormValues = z.infer<typeof blogSchema>;

export function BlogForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [lastSaved, setLastSaved] = useState<Date | null>(
    initialData?.updatedAt ? new Date(initialData.updatedAt) : null
  );
  const [isAutoSaving, setIsAutoSaving] = useState(false);

  const existingMarkdown =
    initialData?.content?.find((b: any) => b.type === "markdown")?.text || "";

  const defaultValues = initialData
    ? {
        ...initialData,
        tags: initialData.tags?.join(", ") || "",
        contentRaw: existingMarkdown,
      }
    : {
        title: "",
        slug: "",
        description: "",
        category: "Engineering",
        readingTime: "5 min",
        publishedDate: new Date().toISOString().split("T")[0],
        authorName: "Samarth",
        authorAvatar: "https://github.com/samarth.png",
        authorRole: "Software Engineer",
        tags: "",
        coverImage: "",
        featured: false,
        draft: true,
        contentRaw: "# My New Blog Post\n\nWrite your markdown here...",
      };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(blogSchema),
    defaultValues,
  });

  const watchAll = watch();
  const markdownContent = watch("contentRaw");
  const title = watch("title");

  // Auto-generate slug
  useEffect(() => {
    if (!initialData && title) {
      setValue(
        "slug",
        title
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, "-")
          .replace(/(^-|-$)/g, "")
      );
    }
  }, [title, setValue, initialData]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        handleSubmit(onSubmit)();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSubmit]);

  // Autosave (Debounced)
  useEffect(() => {
    if (!initialData) return; // Only autosave if editing existing

    const timer = setTimeout(async () => {
      try {
        setIsAutoSaving(true);
        // We do a silent update without redirecting
        await updateBlog(initialData.id, watchAll);
        setLastSaved(new Date());
      } catch (err) {
        console.error("Autosave failed", err);
      } finally {
        setIsAutoSaving(false);
      }
    }, 2500); // 2.5s debounce

    return () => clearTimeout(timer);
  }, [JSON.stringify(watchAll), initialData]);

  const onSubmit = async (data: FormValues) => {
    try {
      if (initialData?.id) {
        await updateBlog(initialData.id, data);
        toast.success("Blog updated successfully!");
      } else {
        await createBlog(data);
        toast.success("Blog created successfully!");
        router.push("/admin/blog");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    try {
      await deleteBlog(initialData.id);
      toast.success("Blog deleted successfully!");
      router.push("/admin/blog");
    } catch (err: any) {
      toast.error("Failed to delete blog: " + err.message);
    }
  };

  // Stats
  const wordCount = markdownContent.split(/\s+/).filter(Boolean).length;
  const charCount = markdownContent.length;

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Editor Layout: Dual Pane */}
        <div className="flex flex-col gap-6 lg:flex-row">
          {/* Left Pane: Metadata Form */}
          <div className="space-y-6 lg:w-1/3">
            <div className="space-y-6 rounded-3xl border border-white/5 bg-white/5 p-6">
              <h3 className="mb-4 border-b border-white/10 pb-2 text-lg font-medium text-white">
                Metadata
              </h3>
              <AdminInput label="Title" {...register("title")} error={errors.title?.message} />
              <AdminInput label="URL Slug" {...register("slug")} error={errors.slug?.message} />
              <AdminTextarea
                label="Short Description"
                {...register("description")}
                error={errors.description?.message}
                className="min-h-[80px]"
              />
              <AdminInput
                label="Category"
                {...register("category")}
                error={errors.category?.message}
              />
              <AdminInput
                label="Tags (comma separated)"
                {...register("tags")}
                error={errors.tags?.message}
              />
              <AdminInput
                label="Cover Image URL"
                {...register("coverImage")}
                error={errors.coverImage?.message}
              />

              <div className="grid grid-cols-2 gap-4">
                <AdminInput
                  label="Reading Time"
                  {...register("readingTime")}
                  error={errors.readingTime?.message}
                />
                <AdminInput
                  label="Publish Date"
                  type="date"
                  {...register("publishedDate")}
                  error={errors.publishedDate?.message}
                />
              </div>

              <div className="space-y-4 border-t border-white/10 pt-4">
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="draft"
                    {...register("draft")}
                    className="h-5 w-5 rounded border-white/20 bg-white/5 accent-amber-500"
                  />
                  <label htmlFor="draft" className="font-medium text-amber-500">
                    Keep as Draft
                  </label>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="featured"
                    {...register("featured")}
                    className="accent-accent-blue h-5 w-5 rounded border-white/20 bg-white/5"
                  />
                  <label htmlFor="featured" className="font-medium text-white">
                    Feature on Homepage
                  </label>
                </div>
              </div>

              <input type="hidden" {...register("authorName")} />
              <input type="hidden" {...register("authorAvatar")} />
              <input type="hidden" {...register("authorRole")} />
            </div>
          </div>

          {/* Right Pane: Markdown Editor */}
          <div className="flex h-[800px] flex-col gap-4 lg:w-2/3">
            {/* Editor Stats Bar */}
            <div className="text-muted-foreground flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-2 font-mono text-xs">
              <div className="flex items-center gap-4">
                <span className="flex items-center gap-1">
                  <Type className="h-3 w-3" /> {wordCount} words
                </span>
                <span>{charCount} chars</span>
              </div>
              <div className="flex items-center gap-2">
                {isAutoSaving ? (
                  <span className="flex animate-pulse items-center gap-1 text-amber-500">
                    <Save className="h-3 w-3" /> Saving...
                  </span>
                ) : (
                  lastSaved && (
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3" /> Saved {lastSaved.toLocaleTimeString()}
                    </span>
                  )
                )}
              </div>
            </div>

            <div className="grid min-h-0 flex-1 grid-cols-1 gap-6 md:grid-cols-2">
              <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]">
                <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
                  <span className="text-muted-foreground font-mono text-sm">Markdown Editor</span>
                </div>
                <textarea
                  {...register("contentRaw")}
                  className="w-full flex-1 resize-none bg-transparent p-6 font-mono text-sm text-white focus:outline-none"
                  placeholder="# Start writing..."
                />
              </div>

              <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]">
                <div className="border-b border-white/10 bg-white/5 px-4 py-3">
                  <span className="text-muted-foreground font-mono text-sm">Live Preview</span>
                </div>
                <div className="prose prose-invert prose-blue max-w-none flex-1 overflow-y-auto p-6">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {markdownContent || "*Nothing to preview yet.*"}
                  </ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-between border-t border-white/10 pt-8">
          {initialData?.id ? (
            <AdminButton type="button" variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete Blog
            </AdminButton>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground hidden text-xs md:block">Press ⌘S to save</span>
            <AdminButton type="submit" isLoading={isSubmitting}>
              {initialData?.id ? "Save Changes" : "Publish Blog"}
            </AdminButton>
          </div>
        </div>
      </form>

      <AdminModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Article"
        description="Are you sure you want to permanently delete this article? This action cannot be undone."
        confirmText="Delete"
        isDestructive
      />
    </>
  );
}
