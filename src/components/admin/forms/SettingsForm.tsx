"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateSettings } from "@/app/actions/settings.actions";
import { AdminInput, AdminTextarea } from "@/components/admin/ui/AdminInput";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const schema = z.object({
  url: z.string().url("Must be a valid URL"),
  title: z.string().min(1),
  description: z.string().min(1),
  seoKeywords: z.string().min(1),
  enableAnalytics: z.boolean(),
});

export function SettingsForm({ initialData }: { initialData: any }) {
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: initialData
      ? {
          ...initialData,
          seoKeywords: initialData.seoKeywords?.join(", ") || "",
        }
      : {
          url: "https://samarth.dev",
          title: "Samarth OS",
          description: "Portfolio",
          seoKeywords: "developer, portfolio",
        },
  });

  const onSubmit = async (data: any) => {
    setSuccess(false);
    const res = await updateSettings(data);
    if (res.success) {
      setSuccess(true);
      router.refresh();
      setTimeout(() => setSuccess(false), 3000);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {success && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400">
          <ShieldCheck className="h-4 w-4" /> SEO Settings updated successfully!
        </div>
      )}

      <AdminInput label="Site URL" {...register("url")} error={errors.url?.message} />
      <AdminInput label="Site Title" {...register("title")} error={errors.title?.message} />
      <AdminTextarea
        label="Site Description"
        {...register("description")}
        error={errors.description?.message}
      />
      <AdminInput
        label="SEO Keywords (comma separated)"
        {...register("seoKeywords")}
        error={errors.seoKeywords?.message}
      />

      <div className="mt-6 flex items-center gap-3 rounded-xl border border-white/5 bg-white/5 p-4">
        <input
          type="checkbox"
          id="enableAnalytics"
          {...register("enableAnalytics")}
          className="text-accent-blue focus:ring-accent-blue/50 h-5 w-5 rounded border-white/10 bg-black/50"
        />
        <div>
          <label htmlFor="enableAnalytics" className="text-sm font-medium text-white">
            Enable Native Analytics
          </label>
          <p className="text-muted-foreground mt-0.5 text-xs">
            Track pageviews and visitors internally using Prisma (disable if using Vercel/Google
            Analytics).
          </p>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <AdminButton type="submit" isLoading={isSubmitting}>
          Save Settings
        </AdminButton>
      </div>
    </form>
  );
}
