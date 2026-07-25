"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";

const skillSchema = z.object({
  category: z.string().min(1),
  title: z.string().min(1),
  icon: z.string().min(1),
  skills: z.string().min(1),
  description: z.string().min(1),
  colSpan: z.string().optional(),
});

export async function createSkill(data: any) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const validated = skillSchema.parse(data);
  const skillsArray = validated.skills.split(",").map((s) => s.trim());

  await prisma.skill.create({
    data: { ...validated, skills: skillsArray },
  });

  revalidatePath("/");
  return { success: true };
}

export async function deleteSkill(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.skill.delete({ where: { id } });
  revalidatePath("/");
  return { success: true };
}
