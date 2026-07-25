"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { auth } from "@/auth";
import { AuditService } from "@/services/audit.service";

export async function clearGlobalCache() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  revalidatePath("/", "layout");
  await AuditService.log("UPDATE", "Cache", "Global Revalidation");
  return { success: true };
}

export async function getDatabaseBackup() {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  try {
    const [projects, blogs, skills, experiences, socialLinks, settings] = await Promise.all([
      prisma.project.findMany(),
      prisma.blogPost.findMany({ include: { content: true } }),
      prisma.skill.findMany(),
      prisma.experience.findMany(),
      prisma.socialLink.findMany(),
      prisma.siteSettings.findFirst(),
    ]);

    const backup = {
      timestamp: new Date().toISOString(),
      data: {
        projects,
        blogs,
        skills,
        experiences,
        socialLinks,
        settings,
      },
    };

    await AuditService.log("CREATE", "Backup", "JSON Export");
    return { success: true, backup };
  } catch (e: any) {
    return { success: false, error: e.message };
  }
}

export async function toggleMaintenanceMode(enabled: boolean) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const settings = await prisma.siteSettings.findFirst();
  if (settings) {
    await prisma.siteSettings.update({
      where: { id: settings.id },
      data: { maintenanceMode: enabled },
    });
  } else {
    await prisma.siteSettings.create({
      data: {
        url: "",
        title: "",
        description: "",
        maintenanceMode: enabled,
      },
    });
  }

  await AuditService.log("UPDATE", "Settings", `Maintenance Mode: ${enabled}`);
  revalidatePath("/", "layout");
  return { success: true };
}
