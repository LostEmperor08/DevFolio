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
  codeSnippets?: {
    step: string;
    code: string;
    highlightLines?: number[];
  }[];
}

export interface ProjectData {
  slug: string;
  title: string;
  tagline: string;
  category: string;
  metrics: string[];
  stack: string[];
  githubUrl?: string;
  liveUrl?: string;
  frontendPreview: string;
  architectureNodes: {
    name: string;
    type: "client" | "queue" | "engine" | "database" | "network";
    desc: string;
  }[];
  microDemo: {
    prompt: string;
    command: string;
    output: string[];
  };
}

export interface SiteData {
  profile: ProfileData;
  projects?: ProjectData[];
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
  projects: [],
  posts: [],
};

// GitHub Git-as-a-CMS Config
const GITHUB_REPO_OWNER = process.env.GITHUB_REPO_OWNER || "LostEmperor08";
const GITHUB_REPO_NAME = process.env.GITHUB_REPO_NAME || "DevFolio";
const GITHUB_BRANCH = process.env.GITHUB_BRANCH || "main";
const GITHUB_FILE_PATH = "src/data/site-content.json";

/**
 * Fetches the current git sha of src/data/site-content.json from the GitHub API.
 */
async function getGithubFileSha(token: string): Promise<string | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_FILE_PATH}?ref=${GITHUB_BRANCH}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "DevFolio-CMS",
        },
        cache: "no-store",
      }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.sha || null;
  } catch {
    return null;
  }
}

/**
 * Commits updated site-content.json directly to GitHub repository.
 */
async function commitContentToGithub(contentStr: string, token: string): Promise<void> {
  const sha = await getGithubFileSha(token);
  const body: Record<string, unknown> = {
    message: "chore(cms): update site-content.json via Monolith Admin [skip ci]",
    content: Buffer.from(contentStr, "utf-8").toString("base64"),
    branch: GITHUB_BRANCH,
    committer: {
      name: "Samarth Patil",
      email: "samarthrpatil008@gmail.com",
    },
    author: {
      name: "Samarth Patil",
      email: "samarthrpatil008@gmail.com",
    },
  };

  if (sha) {
    body.sha = sha;
  }

  const res = await fetch(
    `https://api.github.com/repos/${GITHUB_REPO_OWNER}/${GITHUB_REPO_NAME}/contents/${GITHUB_FILE_PATH}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/vnd.github.v3+json",
        "Content-Type": "application/json",
        "User-Agent": "DevFolio-CMS",
      },
      body: JSON.stringify(body),
    }
  );

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`GitHub CMS commit failed (${res.status}): ${errorText}`);
  }
}

export async function getSiteData(): Promise<SiteData> {
  try {
    const raw = await fs.readFile(CONTENT_FILE_PATH, "utf-8");
    return JSON.parse(raw) as SiteData;
  } catch {
    return fallbackData;
  }
}

/**
 * Saves site data.
 * Detects serverless / production vs local development environment:
 * - In production with GITHUB_TOKEN: Commits directly to GitHub repository.
 * - In local dev or fallback: Writes directly to local filesystem via fs/promises.
 */
export async function saveSiteData(data: SiteData): Promise<{ method: "github" | "local" }> {
  const contentStr = JSON.stringify(data, null, 2);
  const token = process.env.GITHUB_TOKEN;
  const isServerless = process.env.NODE_ENV === "production" || process.env.VERCEL;

  if (isServerless && token) {
    try {
      await commitContentToGithub(contentStr, token);
      return { method: "github" };
    } catch (githubErr) {
      console.warn("GitHub commit failed, attempting filesystem fallback:", githubErr);
    }
  }

  // Local filesystem write
  await fs.writeFile(CONTENT_FILE_PATH, contentStr, "utf-8");
  return { method: "local" };
}
