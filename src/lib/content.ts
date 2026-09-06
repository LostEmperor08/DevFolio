import fs from "fs/promises";
import path from "path";

export interface ProfileData {
  name: string;
  handle: string;
  headline: string;
  subheadline: string;
  bio: string;
  github: string;
  email: string;
  x?: string;
  instagram?: string;
  linkedin?: string;
}

export interface BlogPostData {
  slug: string;
  title: string;
  date: string;
  category: string;
  description: string;
  content: string[];
}

export interface SiteData {
  profile: ProfileData;
  posts: BlogPostData[];
}

const CONTENT_FILE_PATH = path.join(process.cwd(), "src", "data", "site-content.json");

const fallbackData: SiteData = {
  profile: {
    name: "Samarth Patil",
    handle: "LostEmperor08",
    headline: "Hey, I’m Samarth.",
    subheadline: "ISE student building scalable software systems.",
    bio: "I engineer scalable, high-performance software and clean system architectures. Focused on algorithmic problem solving, backend scalability, C++, Python automation, and modern full-stack web applications. Driven by writing robust, intentional code with high craft.",
    github: "https://github.com/LostEmperor08",
    email: "namaste@samarthpatil.com",
    linkedin: "https://in.linkedin.com/in/samarth-raghuram-patil-835596361",
    x: "https://x.com/lostemperor_08",
    instagram: "https://instagram.com/lostemperor_08",
  },
  posts: [],
};

export async function getSiteData(): Promise<SiteData> {
  try {
    const raw = await fs.readFile(CONTENT_FILE_PATH, "utf-8");
    return JSON.parse(raw) as SiteData;
  } catch {
    return fallbackData;
  }
}

export async function saveSiteData(data: SiteData): Promise<void> {
  await fs.writeFile(CONTENT_FILE_PATH, JSON.stringify(data, null, 2), "utf-8");
}
