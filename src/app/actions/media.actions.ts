"use server";

import { put } from "@vercel/blob";
import { auth } from "@/auth";
import { revalidatePath } from "next/cache";
import { AuditService } from "@/services/audit.service";

export async function uploadMedia(formData: FormData) {
  try {
    const session = await auth();
    if (!session?.user) throw new Error("Unauthorized");

    const file = formData.get("file") as File;
    if (!file) throw new Error("No file provided");

    // Upload to Vercel Blob
    const blob = await put(file.name, file, {
      access: "public",
      addRandomSuffix: true,
    });

    await AuditService.log("CREATE", "Media", blob.url);
    revalidatePath("/admin/media");

    return { success: true, url: blob.url };
  } catch (error: any) {
    console.error("Upload Error:", error);
    return { success: false, error: error.message };
  }
}
