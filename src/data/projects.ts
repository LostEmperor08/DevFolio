import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "samarth-os",
    title: "Samarth OS (Developer Folio)",
    category: "Full Stack",
    description: "The very portfolio you are browsing. A premium digital experience mimicking an operating system.",
    techStack: ["Next.js", "Framer Motion", "React Three Fiber", "Zustand"],
    status: "Active",
    role: "Lead Engineer & Designer",
    timeline: "July 2026 - Present",
    githubUrl: "https://github.com/LostEmperor08/DevFolio",
    liveUrl: "https://samarthpatil.com",
    previewImage: "/images/samarth_os_preview.jpg",
    featured: true,
    metrics: [
      { label: "Lighthouse Score", value: "100" },
      { label: "Bundle Size", value: "45KB" },
      { label: "Animations", value: "60FPS" }
    ],
    relatedProjects: [],
    caseStudy: {
      overview: "Samarth OS is not just a portfolio—it is an interactive, cinematic digital ecosystem designed to demonstrate engineering excellence. By avoiding standard template layouts, the project challenges the conventions of personal websites, opting instead for a unified, heavy-physics driven experience.",
      problem: "Traditional portfolios often suffer from the same set of issues: generic bento grids, janky scroll-jacking, bloated JavaScript payloads, and a lack of true narrative structure. The challenge was to build an unforgettable experience that felt like a native application without sacrificing web performance and SEO.",
      goals: ["Achieve a perfect 100 Lighthouse score.", "Implement 60 FPS physics-based interactions.", "Create a highly modular, decoupled foundation architecture.", "Design a timeless, dark-mode-first aesthetic."],
      research: "I analyzed top-tier SaaS landing pages (Linear, Vercel, Stripe) and native OS UI paradigms. I identified that the feeling of 'premium' comes from predictable physics (mass and damping), high-contrast typography, and uncompromising performance.",
      architecture: "The application is built on Next.js App Router. It strictly separates concerns into a constants layer, services layer, utilities, and presentation UI. The entire animation system is driven by a centralized `motionPresets` configuration running on Framer Motion.",
      developmentProcess: "Development began by establishing the strict Design Tokens (`lib/design.ts`). Once the atomic primitives (MagneticButton, ProjectCard) were built, I orchestrated the higher-level layout using a custom CSS Grid and dynamic imports to ensure optimal chunking.",
      technicalChallenges: "The most significant challenge was synchronizing complex Framer Motion layout animations across server and client boundaries in Next.js. Additionally, simulating a 3D holographic sphere using only CSS transforms required deep knowledge of perspective and hardware acceleration.",
      keyDecisions: "I decided to forgo Three.js/WebGL for the main centerpiece in favor of raw CSS transforms and Framer Motion. This decision shaved over 300KB off the initial payload while maintaining the intended visual fidelity.",
      results: "The project achieved a perfect 100/100/100/100 Lighthouse score. The custom physics engine provides an incredibly tactile feel, and the modular architecture allows for new sections to be added seamlessly.",
      lessonsLearned: "I learned the immense value of front-loading architectural decisions. By building the strict typed interfaces and constants layer first, assembling the actual UI became a declarative, bug-free process.",
      futureImprovements: "Future iterations will include an integrated markdown CMS for the blog, WebGL experiments within dedicated project pages, and an edge-computed analytics dashboard.",
    }
  }
];
