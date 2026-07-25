"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";

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

export async function updateProfile(data: z.infer<typeof profileSchema>) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const validated = profileSchema.parse(data);

    // Get first profile or create if none exists
    const existing = await prisma.profile.findFirst();

    if (existing) {
      await prisma.profile.update({
        where: { id: existing.id },
        data: validated,
      });
    } else {
      await prisma.profile.create({
        data: validated,
      });
    }

    revalidatePath("/");
    revalidatePath("/admin/profile");
    return { success: true };
  } catch (error: any) {
    console.error("Failed to update profile:", error);
    return { success: false, error: error.message };
  }
}
