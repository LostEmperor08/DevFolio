"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";

const settingsSchema = z.object({
  url: z.string().url("Must be a valid URL"),
  title: z.string().min(1),
  description: z.string().min(1),
  seoKeywords: z.string().min(1),
  enableAnalytics: z.boolean().default(false),
});

export async function updateSettings(data: any) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const validated = settingsSchema.parse(data);
  const keywordsArray = validated.seoKeywords.split(",").map((s) => s.trim());

  const existing = await prisma.siteSettings.findFirst();

  if (existing) {
    await prisma.siteSettings.update({
      where: { id: existing.id },
      data: { ...validated, seoKeywords: keywordsArray },
    });
  } else {
    await prisma.siteSettings.create({
      data: { ...validated, seoKeywords: keywordsArray },
    });
  }

  revalidatePath("/", "layout");
  return { success: true };
}
