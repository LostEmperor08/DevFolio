"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";

const socialSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  label: z.string().min(1, "Label is required"),
  url: z.string().url("Must be a valid URL"),
  icon: z.string().min(1, "Icon name is required"),
});

export async function createSocialLink(data: z.infer<typeof socialSchema>) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const validated = socialSchema.parse(data);
  await prisma.socialLink.create({ data: validated });
  revalidatePath("/");
  revalidatePath("/admin/social");
  return { success: true };
}

export async function updateSocialLink(id: string, data: z.infer<typeof socialSchema>) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  const validated = socialSchema.parse(data);
  await prisma.socialLink.update({ where: { id }, data: validated });
  revalidatePath("/");
  revalidatePath("/admin/social");
  return { success: true };
}

export async function deleteSocialLink(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");
  await prisma.socialLink.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/admin/social");
  return { success: true };
}
