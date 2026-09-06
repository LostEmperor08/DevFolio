"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import {
  getSiteData,
  saveSiteData,
  type ProfileData,
  type BlogPostData,
} from "@/lib/content";

const ADMIN_PASSCODE = process.env.ADMIN_PASSCODE || "admin123";

export async function loginAdmin(passcode: string) {
  if (passcode.trim() === ADMIN_PASSCODE) {
    const cookieStore = await cookies();
    cookieStore.set("admin_session", "authenticated", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });
    return { success: true };
  }

  return { success: false, error: "Invalid passcode. (Default: admin123)" };
}

export async function logoutAdmin() {
  const cookieStore = await cookies();
  cookieStore.delete("admin_session");
  redirect("/admin/login");
}

export async function checkIsAdmin(): Promise<boolean> {
  const cookieStore = await cookies();
  return cookieStore.get("admin_session")?.value === "authenticated";
}

export async function updateProfileContent(profile: ProfileData) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const data = await getSiteData();
    data.profile = profile;
    await saveSiteData(data);
    revalidatePath("/");
    revalidatePath("/contact");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to update profile" };
  }
}

export async function savePostContent(post: BlogPostData, originalSlug?: string) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const data = await getSiteData();
    const cleanSlug = post.slug.trim().toLowerCase().replace(/\s+/g, "-");
    const updatedPost: BlogPostData = {
      ...post,
      slug: cleanSlug,
    };

    if (originalSlug && originalSlug !== cleanSlug) {
      data.posts = data.posts.filter((p) => p.slug !== originalSlug);
    }

    const existingIndex = data.posts.findIndex((p) => p.slug === cleanSlug);
    if (existingIndex >= 0) {
      data.posts[existingIndex] = updatedPost;
    } else {
      data.posts.unshift(updatedPost);
    }

    await saveSiteData(data);
    revalidatePath("/");
    revalidatePath(`/posts/${cleanSlug}`);
    if (originalSlug) {
      revalidatePath(`/posts/${originalSlug}`);
    }
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to save post" };
  }
}

export async function deletePostContent(slug: string) {
  const isAdmin = await checkIsAdmin();
  if (!isAdmin) {
    return { success: false, error: "Unauthorized" };
  }

  try {
    const data = await getSiteData();
    data.posts = data.posts.filter((p) => p.slug !== slug);
    await saveSiteData(data);
    revalidatePath("/");
    return { success: true };
  } catch (err: any) {
    return { success: false, error: err?.message || "Failed to delete post" };
  }
}
