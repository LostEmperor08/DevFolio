import { prisma } from "@/lib/prisma";

export class BlogService {
  /**
   * Retrieves all published blogs.
   */
  static async getPublishedBlogs() {
    return prisma.blogPost.findMany({
      where: { draft: false },
      orderBy: { publishedDate: "desc" },
    });
  }

  /**
   * Retrieves all blogs (for admin).
   */
  static async getAllBlogs() {
    return prisma.blogPost.findMany({
      orderBy: { publishedDate: "desc" },
    });
  }

  /**
   * Retrieves a single blog by slug with its content blocks ordered correctly.
   */
  static async getBlogBySlug(slug: string) {
    return prisma.blogPost.findUnique({
      where: { slug },
      include: {
        content: {
          orderBy: { orderIndex: "asc" },
        },
      },
    });
  }
}
