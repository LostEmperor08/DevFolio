"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createSocialLink, updateSocialLink, deleteSocialLink } from "@/app/actions/social.actions";
import { AdminInput } from "@/components/admin/ui/AdminInput";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { AlertCircle, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";

const socialSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  label: z.string().min(1, "Label is required"),
  url: z.string().url("Must be a valid URL"),
  icon: z.string().min(1, "Icon is required"),
});

type FormValues = z.infer<typeof socialSchema>;

export function SocialForm({ initialData }: { initialData?: any }) {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(socialSchema),
    defaultValues: initialData || { platform: "", label: "", url: "", icon: "" },
  });

  const onSubmit = async (data: FormValues) => {
    setError(null);
    try {
      if (initialData?.id) {
        await updateSocialLink(initialData.id, data);
      } else {
        await createSocialLink(data);
      }
      router.push("/admin/social");
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleDelete = async () => {
    if (!initialData?.id) return;
    if (confirm("Are you sure you want to delete this link?")) {
      await deleteSocialLink(initialData.id);
      router.push("/admin/social");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          <AlertCircle className="h-4 w-4" /> {error}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AdminInput
          label="Platform"
          {...register("platform")}
          error={errors.platform?.message}
          description="e.g. Github"
        />
        <AdminInput
          label="Label"
          {...register("label")}
          error={errors.label?.message}
          description="e.g. @samarth"
        />
      </div>

      <AdminInput label="URL" {...register("url")} error={errors.url?.message} />
      <AdminInput
        label="Icon Name (Lucide)"
        {...register("icon")}
        error={errors.icon?.message}
        description="e.g. Github, Twitter, Linkedin"
      />

      <div className="flex justify-between pt-4">
        {initialData?.id ? (
          <AdminButton type="button" variant="danger" onClick={handleDelete}>
            <Trash2 className="mr-2 h-4 w-4" /> Delete
          </AdminButton>
        ) : (
          <div />
        )}
        <AdminButton type="submit" isLoading={isSubmitting}>
          {initialData?.id ? "Save Changes" : "Create Link"}
        </AdminButton>
      </div>
    </form>
  );
}
