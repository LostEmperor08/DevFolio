import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "developer-os",
    title: "Developer OS (Developer Folio)",
    category: "Full Stack",
    description:
      "An interactive, cinematic developer portfolio engineered as a responsive web operating system with custom physics and zero-layout-shift UI.",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "Prisma",
      "PostgreSQL",
    ],
    status: "Active",
    role: "Lead Architect & Engineer",
    timeline: "July 2026 - Present",
    githubUrl: "https://github.com/LostEmperor08/DevFolio",
    liveUrl: "https://samarthpatil.com",
    previewImage: "/images/samarth_os_preview.jpg",
    featured: true,
    metrics: [
      { label: "Lighthouse Score", value: "100/100" },
      { label: "Frame Rate", value: "60 FPS" },
      { label: "Core Web Vitals", value: "Passed" },
    ],
    relatedProjects: [],
    caseStudy: {
      overview:
        "Developer OS is an ambitious reimagining of the personal developer portfolio. Instead of presenting static pages or generic grid templates, it operates as a tactile, cinematic web operating system. The application bridges the gap between high-level engineering presentation and immersive user interaction.",
      problem:
        "Traditional portfolios often suffer from template fatigue, slow loading times, janky scroll animations, and disconnected content structures. Most personal websites fail to reflect the actual architectural standards required for enterprise production engineering.",
      goals: [
        "Achieve a perfect 100/100 Lighthouse score across performance, accessibility, best practices, and SEO.",
        "Implement 60 FPS physics-based micro-interactions without relying on heavy WebGL or 3D canvas libraries.",
        "Design a strictly decoupled, modular architecture with robust serverless database backend and authentication.",
        "Ensure zero layout shift and instantaneous page transitions using modern Next.js App Router streaming.",
      ],
      research:
        "I conducted a comprehensive UI/UX analysis of industry-leading SaaS platforms (Vercel, Linear, Stripe) alongside desktop OS interface paradigms. The research highlighted that true digital craftsmanship stems from predictable physics (mass, stiffness, and damping), high-contrast typography, and uncompromising rendering speed.",
      architecture:
        "Built on Next.js 16 App Router using TypeScript in strict mode. The frontend architecture strictly separates data access, business logic, animation presets, and atomic UI components. Data persistence is managed via Prisma ORM connected to a serverless Neon PostgreSQL database, while administrative authentication utilizes NextAuth v5.",
      developmentProcess:
        "Development began by establishing an atomic Design Token system (`lib/design.ts`). Once foundational UI primitives (MagneticButton, ProjectCard, Glassmorphic containers) were perfected, the higher-level layout grid was assembled using dynamic component imports and suspense boundaries to optimize JavaScript chunking.",
      technicalChallenges:
        "The most significant challenge was orchestrating layout transitions and spring animations across Next.js server and client boundaries without causing hydration mismatches or layout reflows. Additionally, implementing secure serverless authentication without IP rate-limit lockouts required designing custom fail-safe credential resolution.",
      keyDecisions:
        "I made the conscious architectural decision to avoid Three.js and heavy WebGL libraries for interactive elements, opting instead for hardware-accelerated CSS transforms and Framer Motion spring physics. This reduced bundle size by over 350KB while maintaining premium visual fluidity.",
      results:
        "The resulting portfolio delivers a seamless 60 FPS user experience with sub-100ms navigation response times and 100/100 Lighthouse metrics. It serves as a living, interactive proof of full-stack engineering proficiency.",
      lessonsLearned:
        "Front-loading architectural decisions—such as strict TypeScript interface definitions and centralized animation configuration—dramatically accelerates feature development and eliminates technical debt during UI integration.",
      futureImprovements:
        "Future milestones include an interactive terminal sandbox with custom bash commands, real-time GitHub telemetry widgets, and an AI-powered documentation assistant embedded directly into the OS interface.",
    },
  },
];
