"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createExperience } from "@/app/actions/experience.actions";
import { AdminInput, AdminTextarea } from "@/components/admin/ui/AdminInput";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { useRouter } from "next/navigation";

const schema = z.object({
  title: z.string().min(1),
  organization: z.string().min(1),
  duration: z.string().min(1),
  description: z.string().min(1),
  technologies: z.string().min(1),
});

export function ExperienceForm() {
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: { title: "", organization: "", duration: "", description: "", technologies: "" },
  });

  const onSubmit = async (data: any) => {
    setError(null);
    try {
      await createExperience(data);
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
        <AdminInput label="Job Title" {...register("title")} error={errors.title?.message} />
        <AdminInput
          label="Organization"
          {...register("organization")}
          error={errors.organization?.message}
        />
      </div>
      <AdminInput
        label="Duration (e.g. 2022 - Present)"
        {...register("duration")}
        error={errors.duration?.message}
      />
      <AdminInput
        label="Technologies (comma separated)"
        {...register("technologies")}
        error={errors.technologies?.message}
      />
      <AdminTextarea
        label="Description"
        {...register("description")}
        error={errors.description?.message}
        className="min-h-[80px]"
      />

      <div className="flex justify-end">
        <AdminButton type="submit" isLoading={isSubmitting}>
          Add Experience
        </AdminButton>
      </div>
    </form>
  );
}
