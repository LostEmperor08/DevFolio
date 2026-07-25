import { prisma } from "@/lib/prisma";

export class DashboardService {
  /**
   * Retrieves high-level overview statistics for the admin dashboard.
   */
  static async getOverviewStats() {
    try {
      // Execute all count queries in parallel for maximum performance
      const [totalProjects, publishedBlogs, draftBlogs, contactMessages, lastLoginRaw] =
        await Promise.all([
          prisma.project.count(),
          prisma.blogPost.count({ where: { draft: false } }),
          prisma.blogPost.count({ where: { draft: true } }),
          prisma.contactMessage.count({ where: { isRead: false } }),
          prisma.user.findFirst({
            where: { role: "ADMIN" },
            select: { lastLogin: true },
            orderBy: { lastLogin: "desc" },
          }),
        ]);

      return {
        totalProjects,
        publishedBlogs,
        draftBlogs,
        contactMessages,
        lastLogin: lastLoginRaw?.lastLogin || null,
        dbStatus: "Connected",
      };
    } catch (error) {
      console.error("DashboardService Error:", error);
      return {
        totalProjects: 0,
        publishedBlogs: 0,
        draftBlogs: 0,
        contactMessages: 0,
        lastLogin: null,
        dbStatus: "Disconnected",
      };
    }
  }
}
