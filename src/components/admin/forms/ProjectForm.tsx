"use client";

import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createProject, updateProject, deleteProject } from "@/app/actions/project.actions";
import { AdminInput, AdminTextarea } from "@/components/admin/ui/AdminInput";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AlertCircle, Trash2, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { AdminModal } from "../ui/AdminModal";

const projectSchema = z.object({
  title: z.string().min(1, "Required"),
  slug: z.string().min(1, "Required"),
  category: z.string().min(1, "Required"),
  description: z.string().min(1, "Required"),
  techStack: z.string().min(1, "Required"),
  status: z.string().min(1, "Required"),
  role: z.string().min(1, "Required"),
  timeline: z.string().min(1, "Required"),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  previewImage: z.string().min(1, "Required"),
  featured: z.boolean(),
});

type FormValues = z.infer<typeof projectSchema>;

export function ProjectForm({ initialData }: { initialData?: any }) {
  const router = useRouter();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const defaultValues = initialData
    ? {
        ...initialData,
        techStack: initialData.techStack?.join(", ") || "",
        githubUrl: initialData.githubUrl || "",
        liveUrl: initialData.liveUrl || "",
      }
    : {
        title: "",
        slug: "",
        category: "Engineering",
        description: "",
        techStack: "",
        status: "Completed",
        role: "Lead Engineer",
        timeline: "2024",
        githubUrl: "",
        liveUrl: "",
        previewImage: "",
        featured: false,
      };

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(projectSchema),
    defaultValues,
  });

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

  const onSubmit = async (data: FormValues) => {
    try {
      if (initialData?.id) {
        await updateProject(initialData.id, data);
        toast.success("Project updated successfully!");
      } else {
        await createProject(data);
        toast.success("Project created successfully!");
        router.push("/admin/projects");
      }
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    try {
      await deleteProject(initialData.id);
      toast.success("Project deleted successfully!");
      router.push("/admin/projects");
    } catch (err: any) {
      toast.error("Failed to delete project");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="relative space-y-8">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AdminInput label="Project Title" {...register("title")} error={errors.title?.message} />
          <AdminInput
            label="URL Slug"
            {...register("slug")}
            error={errors.slug?.message}
            description="e.g. developer-folio"
          />
        </div>

        <AdminTextarea
          label="Short Description"
          {...register("description")}
          error={errors.description?.message}
        />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AdminInput label="Category" {...register("category")} error={errors.category?.message} />
          <AdminInput
            label="Tech Stack (comma separated)"
            {...register("techStack")}
            error={errors.techStack?.message}
          />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <AdminInput label="Status" {...register("status")} error={errors.status?.message} />
          <AdminInput label="Role" {...register("role")} error={errors.role?.message} />
          <AdminInput label="Timeline" {...register("timeline")} error={errors.timeline?.message} />
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <AdminInput
            label="GitHub URL (Optional)"
            {...register("githubUrl")}
            error={errors.githubUrl?.message}
          />
          <AdminInput
            label="Live URL (Optional)"
            {...register("liveUrl")}
            error={errors.liveUrl?.message}
          />
        </div>

        <div className="grid grid-cols-1 gap-6">
          <AdminInput
            label="Preview Image URL"
            {...register("previewImage")}
            error={errors.previewImage?.message}
            description="Use the Media Library to upload an image and paste the URL here."
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="featured"
            {...register("featured")}
            className="accent-accent-blue h-5 w-5 rounded border-white/20 bg-white/5"
          />
          <label htmlFor="featured" className="font-medium text-white">
            Feature this project on the homepage
          </label>
        </div>

        <div className="flex justify-between border-t border-white/10 pt-8">
          {initialData?.id ? (
            <AdminButton type="button" variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4" /> Delete Project
            </AdminButton>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-4">
            <span className="text-muted-foreground hidden text-xs md:block">Press ⌘S to save</span>
            <AdminButton type="submit" isLoading={isSubmitting}>
              {initialData?.id ? "Save Changes" : "Create Project"}
            </AdminButton>
          </div>
        </div>
      </form>

      <AdminModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        onConfirm={handleDelete}
        title="Delete Project"
        description="Are you sure you want to permanently delete this project? This action cannot be undone."
        confirmText="Delete"
        isDestructive
      />
    </>
  );
}
