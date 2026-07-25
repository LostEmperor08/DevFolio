"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export async function submitContactForm(data: any) {
  try {
    const validated = contactSchema.parse(data);
    await prisma.contactMessage.create({
      data: validated,
    });

    // Notify admin dashboard
    revalidatePath("/admin/inbox");
    revalidatePath("/admin");
    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function markMessageRead(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.contactMessage.update({
    where: { id },
    data: { isRead: true },
  });

  revalidatePath("/admin/inbox");
  revalidatePath("/admin");
  return { success: true };
}

export async function deleteMessage(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.contactMessage.delete({ where: { id } });

  revalidatePath("/admin/inbox");
  revalidatePath("/admin");
  return { success: true };
}
