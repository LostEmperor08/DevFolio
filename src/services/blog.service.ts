import { blogs } from "@/data/blogs";

export class BlogService {
  /**
   * Retrieves all published blogs from static data.
   */
  static async getPublishedBlogs() {
    return blogs
      .filter((b) => !b.draft)
      .map((b) => ({
        ...b,
        authorName: b.author?.name || "Samarth Patil",
        authorAvatar: b.author?.avatar || "/images/avatar.jpg",
        createdAt: new Date(b.publishedDate || Date.now()),
        updatedAt: new Date(b.publishedDate || Date.now()),
      }));
  }

  /**
   * Retrieves all blogs (for admin compatibility).
   */
  static async getAllBlogs() {
    return blogs.map((b) => ({
      ...b,
      authorName: b.author?.name || "Samarth Patil",
      authorAvatar: b.author?.avatar || "/images/avatar.jpg",
      createdAt: new Date(b.publishedDate || Date.now()),
      updatedAt: new Date(b.publishedDate || Date.now()),
    }));
  }

  /**
   * Retrieves a single blog by slug from static data.
   */
  static async getBlogBySlug(slug: string) {
    const blog = blogs.find((b) => b.slug === slug);
    if (!blog) return null;
    return {
      ...blog,
      authorName: blog.author?.name || "Samarth Patil",
      authorAvatar: blog.author?.avatar || "/images/avatar.jpg",
      createdAt: new Date(blog.publishedDate || Date.now()),
      updatedAt: new Date(blog.publishedDate || Date.now()),
    };
  }
}
