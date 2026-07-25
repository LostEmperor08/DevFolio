"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";

const experienceSchema = z.object({
  title: z.string().min(1),
  organization: z.string().min(1),
  duration: z.string().min(1),
  description: z.string().min(1),
  technologies: z.string().min(1),
});

export async function createExperience(data: any) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const validated = experienceSchema.parse(data);
  const techArray = validated.technologies.split(",").map((s) => s.trim());

  await prisma.experience.create({
    data: { ...validated, technologies: techArray },
  });

  revalidatePath("/");
  return { success: true };
}

export async function deleteExperience(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.experience.delete({ where: { id } });
  revalidatePath("/");
  return { success: true };
}
