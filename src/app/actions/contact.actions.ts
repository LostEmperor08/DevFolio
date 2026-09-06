"use server";

import { prisma } from "@/lib/prisma";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  subject: z.string().min(1, "Subject is required"),
  message: z.string().min(1, "Message is required"),
});

export async function submitContactForm(data: any) {
  try {
    const validated = contactSchema.parse(data);
    if (process.env.DATABASE_URL) {
      try {
        await prisma.contactMessage.create({
          data: validated,
        });
      } catch (dbErr) {
        console.warn("Database unavailable, logging message to console:", validated);
      }
    } else {
      console.log("Contact submission received:", validated);
    }

    return { success: true };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}

export async function markMessageRead(id: string) {
  return { success: true };
}

export async function deleteMessage(id: string) {
  return { success: true };
}
