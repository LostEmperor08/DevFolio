"use server";

import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { auth } from "@/auth";
import { AuditService } from "@/services/audit.service";

const blogSchema = z.object({
  title: z.string().min(1),
  slug: z.string().min(1),
  description: z.string().min(1),
  category: z.string().min(1),
  readingTime: z.string().min(1),
  publishedDate: z.string().min(1),
  authorName: z.string().min(1),
  authorAvatar: z.string().min(1),
  authorRole: z.string().min(1),
  tags: z.string().min(1),
  coverImage: z.string().min(1),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false),
  contentRaw: z.string().min(1, "Content cannot be empty"), // The markdown string
});

export async function createBlog(data: any) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const validated = blogSchema.parse(data);
  const tagsArray = validated.tags.split(",").map((s) => s.trim());
  const { contentRaw, ...baseData } = validated;

  await prisma.blogPost.create({
    data: {
      ...baseData,
      tags: tagsArray,
      content: {
        create: [{ type: "markdown", text: contentRaw, orderIndex: 0 }],
      },
    },
  });

  await AuditService.log("CREATE", "Blog", validated.title);
  revalidatePath("/");
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true };
}

export async function updateBlog(id: string, data: any) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  const validated = blogSchema.parse(data);
  const tagsArray = validated.tags.split(",").map((s) => s.trim());
  const { contentRaw, ...baseData } = validated;

  await prisma.$transaction(async (tx) => {
    await tx.blogPost.update({
      where: { id },
      data: {
        ...baseData,
        tags: tagsArray,
      },
    });

    // Replace all existing blocks with the new markdown block
    await tx.contentBlock.deleteMany({ where: { blogId: id } });
    await tx.contentBlock.create({
      data: {
        blogId: id,
        type: "markdown",
        text: contentRaw,
        orderIndex: 0,
      },
    });
  });

  await AuditService.log("UPDATE", "Blog", validated.title);
  revalidatePath("/");
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${validated.slug}`);
  return { success: true };
}

export async function deleteBlog(id: string) {
  const session = await auth();
  if (!session?.user) throw new Error("Unauthorized");

  await prisma.blogPost.delete({ where: { id } });

  await AuditService.log("DELETE", "Blog", id);
  revalidatePath("/");
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { success: true };
}
