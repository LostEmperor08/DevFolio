"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createSkill } from "@/app/actions/skills.actions";
import { AdminInput, AdminTextarea } from "@/components/admin/ui/AdminInput";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { useRouter } from "next/navigation";

const schema = z.object({
  category: z.string().min(1),
  title: z.string().min(1),
  icon: z.string().min(1),
  skills: z.string().min(1),
  description: z.string().min(1),
  colSpan: z.string().optional(),
});

export function SkillForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      category: "Frontend",
      title: "",
      icon: "Code",
      skills: "",
      description: "",
      colSpan: "md:col-span-1",
    },
  });

  const onSubmit = async (data: any) => {
    setError(null);
    try {
      await createSkill(data);
      reset();
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {error && <div className="rounded-xl bg-red-500/10 p-3 text-sm text-red-400">{error}</div>}
      <div className="grid grid-cols-2 gap-4">
        <AdminInput label="Category" {...register("category")} error={errors.category?.message} />
        <AdminInput label="Title" {...register("title")} error={errors.title?.message} />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <AdminInput label="Icon Name (Lucide)" {...register("icon")} error={errors.icon?.message} />
        <AdminInput
          label="CSS Span (Optional)"
          {...register("colSpan")}
          error={errors.colSpan?.message}
        />
      </div>
      <AdminInput
        label="Skills (comma separated)"
        {...register("skills")}
        error={errors.skills?.message}
      />
      <AdminTextarea
        label="Description"
        {...register("description")}
        error={errors.description?.message}
        className="min-h-[80px]"
      />

      <div className="flex justify-end">
        <AdminButton type="submit" isLoading={isSubmitting}>
          Add Skill Category
        </AdminButton>
      </div>
    </form>
  );
}
