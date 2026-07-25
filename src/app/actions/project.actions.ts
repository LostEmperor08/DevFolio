"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { AuditService } from "@/services/audit.service";

const projectSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  techStack: z.string().min(1), // We will split by comma on server
  status: z.string().min(1),
  role: z.string().min(1),
  timeline: z.string().min(1),
  githubUrl: z.string().optional(),
  liveUrl: z.string().optional(),
  previewImage: z.string().min(1),
  featured: z.boolean().default(false),
});

export async function createProject(data: any) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const validated = projectSchema.parse(data);
  const techStackArray = validated.techStack.split(",").map((s) => s.trim());

  await prisma.project.create({
    data: {
      ...validated,
      techStack: techStackArray,
      githubUrl: validated.githubUrl || null,
      liveUrl: validated.liveUrl || null,
    },
  });

  await AuditService.log("CREATE", "Project", validated.title);
  revalidatePath("/");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  return { success: true };
}

export async function updateProject(id: string, data: any) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const validated = projectSchema.parse(data);
  const techStackArray = validated.techStack.split(",").map((s) => s.trim());

  await prisma.project.update({
    where: { id },
    data: {
      ...validated,
      techStack: techStackArray,
      githubUrl: validated.githubUrl || null,
      liveUrl: validated.liveUrl || null,
    },
  });

  await AuditService.log("UPDATE", "Project", validated.title);
  revalidatePath("/");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  revalidatePath(`/projects/${validated.slug}`);
  return { success: true };
}

export async function deleteProject(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.project.delete({ where: { id } });

  await AuditService.log("DELETE", "Project", id);
  revalidatePath("/");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  return { success: true };
}

export async function reorderProjects(ids: string[]) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.$transaction(
    ids.map((id, index) =>
      prisma.project.update({
        where: { id },
        data: { orderIndex: index },
      })
    )
  );

  revalidatePath("/");
  revalidatePath("/admin/projects");
  revalidatePath("/projects");
  return { success: true };
}
