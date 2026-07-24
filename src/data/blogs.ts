import { BlogPost } from "@/types";

export const blogs: BlogPost[] = [
  {
    slug: "rebuilding-the-physics-engine",
    title: "Rebuilding the Physics Engine for the Modern Web",
    description: "A deep dive into mass, damping, and why spring physics make digital ecosystems feel premium.",
    publishedDate: "2026-07-20",
    readingTime: "8 min read",
    author: {
      name: "Samarth Patil",
      avatar: "/images/avatar.jpg",
      role: "Lead Engineer"
    },
    category: "Engineering",
    tags: ["React", "Framer Motion", "Physics"],
    coverImage: "/images/blog-physics.jpg",
    featured: true,
    draft: false,
    series: "Building Samarth OS",
    difficulty: "Advanced",
    tableOfContents: [
      { id: "the-problem-with-css", title: "The Problem with CSS Transitions", level: 2 },
      { id: "enter-springs", title: "Enter Spring Physics", level: 2 },
      { id: "mass-and-damping", title: "Tuning Mass and Damping", level: 3 }
    ],
    relatedPosts: ["security-first-development"],
    content: [
      {
        id: "block-1",
        type: "paragraph",
        text: "The difference between an interface that feels like a webpage and one that feels like a native application is almost entirely defined by physics."
      },
      {
        id: "block-2",
        type: "heading",
        level: 2,
        text: "The Problem with CSS Transitions"
      },
      {
        id: "block-3",
        type: "paragraph",
        text: "Traditional CSS transitions rely on Bezier curves. While `ease-out` looks fine, it lacks physical grounding. If a user interrupts an animation midway, CSS struggles to preserve momentum seamlessly."
      },
      {
        id: "block-4",
        type: "code",
        language: "typescript",
        code: "export const spring = {\n  type: 'spring',\n  stiffness: 300,\n  damping: 40,\n  mass: 1.2\n};"
      },
      {
        id: "block-5",
        type: "callout",
        variant: "info",
        title: "Pro Tip",
        text: "Increasing mass creates a feeling of luxury and weight. Apple extensively uses heavy mass values in iOS to make elements feel physical."
      }
    ]
  },
  {
    slug: "security-first-development",
    title: "Security-First Development in React",
    description: "Common vulnerabilities in modern frontend applications and how to mitigate them.",
    publishedDate: "2026-06-15",
    readingTime: "6 min read",
    author: {
      name: "Samarth Patil",
      avatar: "/images/avatar.jpg",
      role: "Lead Engineer"
    },
    category: "Cybersecurity",
    tags: ["React", "Security", "XSS"],
    coverImage: "/images/blog-security.jpg",
    featured: false,
    draft: false,
    difficulty: "Intermediate",
    tableOfContents: [],
    relatedPosts: ["rebuilding-the-physics-engine"],
    content: [
      {
        id: "block-s1",
        type: "paragraph",
        text: "React handles escaping by default, but dangerouslySetInnerHTML opens massive XSS vectors if data isn't properly sanitized."
      }
    ]
  }
];
