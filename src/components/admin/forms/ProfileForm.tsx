"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateProfile } from "@/app/actions/profile.actions";
import { AdminInput, AdminTextarea } from "@/components/admin/ui/AdminInput";
import { AdminButton } from "@/components/admin/ui/AdminButton";
import { ShieldCheck, AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

const profileSchema = z.object({
  name: z.string().min(1, "Name is required"),
  tagline: z.string().min(1, "Tagline is required"),
  email: z.string().email("Invalid email"),
  resumeUrl: z.string().url("Must be a valid URL"),
  avatar: z.string().min(1, "Avatar is required"),
  location: z.string().min(1, "Location is required"),
  timezone: z.string().min(1, "Timezone is required"),
  availability: z.string().min(1, "Availability is required"),
  responseTime: z.string().min(1, "Response time is required"),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

export function ProfileForm({ initialData }: { initialData: any }) {
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    resolver: zodResolver(profileSchema),
    defaultValues: initialData || {
      name: "",
      tagline: "",
      email: "",
      resumeUrl: "",
      avatar: "",
      location: "",
      timezone: "",
      availability: "",
      responseTime: "",
    },
  });

  const onSubmit = async (data: ProfileFormValues) => {
    setError(null);
    setSuccess(false);

    const result = await updateProfile(data);

    if (result.success) {
      setSuccess(true);
      router.refresh();
      setTimeout(() => setSuccess(false), 3000);
    } else {
      setError(result.error || "Failed to update profile");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {error && (
        <div className="flex items-center gap-2 rounded-xl border border-red-500/20 bg-red-500/10 p-4 text-sm text-red-400">
          <AlertCircle className="h-4 w-4" />
          {error}
        </div>
      )}
      {success && (
        <div className="flex items-center gap-2 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400">
          <ShieldCheck className="h-4 w-4" />
          Profile updated successfully!
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AdminInput label="Full Name" {...register("name")} error={errors.name?.message} />
        <AdminInput
          label="Email Address"
          type="email"
          {...register("email")}
          error={errors.email?.message}
        />
      </div>

      <AdminTextarea label="Tagline" {...register("tagline")} error={errors.tagline?.message} />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AdminInput
          label="Avatar URL"
          {...register("avatar")}
          error={errors.avatar?.message}
          description="Enter a URL to your profile picture"
        />
        <AdminInput
          label="Resume URL"
          {...register("resumeUrl")}
          error={errors.resumeUrl?.message}
          description="Link to your PDF resume"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AdminInput
          label="Location"
          {...register("location")}
          error={errors.location?.message}
          description="e.g. San Francisco, CA"
        />
        <AdminInput
          label="Timezone"
          {...register("timezone")}
          error={errors.timezone?.message}
          description="e.g. PST (UTC-8)"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <AdminInput
          label="Availability"
          {...register("availability")}
          error={errors.availability?.message}
          description="e.g. Open to opportunities"
        />
        <AdminInput
          label="Response Time"
          {...register("responseTime")}
          error={errors.responseTime?.message}
          description="e.g. Within 24 hours"
        />
      </div>

      <div className="flex justify-end pt-4">
        <AdminButton type="submit" isLoading={isSubmitting}>
          Save Profile
        </AdminButton>
      </div>
    </form>
  );
}
