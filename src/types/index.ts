/**
 * Global Type Definitions
 */

import { ForwardRefExoticComponent, RefAttributes } from "react";
import { LucideProps } from "lucide-react";

export interface ProjectMetric {
  label: string;
  value: string;
}

export interface CaseStudy {
  overview: string;
  problem: string;
  goals: string[];
  research: string;
  architecture: string;
  developmentProcess: string;
  technicalChallenges: string;
  keyDecisions: string;
  results: string;
  lessonsLearned: string;
  futureImprovements: string;
}

export interface Project {
  slug: string;
  title: string;
  category: "Frontend" | "Backend" | "Full Stack" | "Cybersecurity" | "AI" | "Experiments";
  description: string;
  techStack: string[];
  status: "Completed" | "Active" | "In Development";
  role: string;
  timeline: string;
  githubUrl?: string;
  liveUrl?: string;
  previewImage: string;
  featured: boolean;
  metrics: ProjectMetric[];
  caseStudy: CaseStudy;
  relatedProjects: string[]; // slugs
}

export interface Skill {
  id: string;
  title: string;
  icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;
  skills: string[];
  description: string;
  colSpan?: string;
}

export interface Experience {
  id: number;
  title: string;
  organization: string;
  duration: string;
  description: string;
  technologies: string[];
}

export type ContentBlockType =
  | "paragraph"
  | "heading"
  | "image"
  | "quote"
  | "callout"
  | "table"
  | "list"
  | "divider"
  | "timeline"
  | "embed"
  | "code"
  | "markdown";

export interface ContentBlock {
  id: string;
  type: ContentBlockType;
  // Payload fields (optional depending on block type)
  text?: string; // For paragraph, heading, quote, list item, etc.
  level?: 1 | 2 | 3 | 4; // For headings
  url?: string; // For images, embeds
  caption?: string; // For images
  language?: string; // For code blocks
  code?: string; // For code blocks
  items?: string[]; // For lists
  style?: "ordered" | "unordered"; // For lists
  variant?: "info" | "warning" | "success" | "danger"; // For callouts
  title?: string; // For callouts, timeline items
  date?: string; // For timeline items
  author?: string; // For quotes
  // For tables, we can define a simple row/col structure if needed, or just use HTML/Markdown in a text field
  rows?: string[][];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  publishedDate: string;
  updatedDate?: string;
  readingTime: string;
  author: {
    name: string;
    avatar: string;
    role: string;
  };
  category: string;
  tags: string[];
  coverImage: string;
  featured: boolean;
  draft: boolean;
  // Advanced Metadata
  series?: string;
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  lastReviewed?: string;
  estimatedPrerequisites?: string[];

  // SEO & Navigation
  tableOfContents: { id: string; title: string; level: number }[];
  relatedPosts: string[]; // slugs

  // Headless CMS Engine
  content: ContentBlock[];
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
}
