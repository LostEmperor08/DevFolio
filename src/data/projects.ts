import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "samarth-os",
    title: "Samarth OS",
    category: "Full Stack",
    description: "The very portfolio you are browsing. A premium digital experience mimicking an operating system.",
    techStack: ["Next.js", "Framer Motion", "React Three Fiber", "Zustand"],
    status: "Active",
    role: "Lead Engineer & Designer",
    timeline: "July 2026 - Present",
    githubUrl: "https://github.com/samarth/agitated-oppenheimer",
    liveUrl: "https://samarthpatil.com",
    previewImage: "/images/samarth-os.jpg",
    featured: true,
    metrics: [
      { label: "Lighthouse Score", value: "100" },
      { label: "Bundle Size", value: "45KB" },
      { label: "Animations", value: "60FPS" }
    ],
    relatedProjects: ["project-alpha", "nexus-api"],
    caseStudy: {
      overview: "Samarth OS is not just a portfolio—it is an interactive, cinematic digital ecosystem designed to demonstrate engineering excellence. By avoiding standard template layouts, the project challenges the conventions of personal websites, opting instead for a unified, heavy-physics driven experience.",
      problem: "Traditional portfolios often suffer from the same set of issues: generic bento grids, janky scroll-jacking, bloated JavaScript payloads, and a lack of true narrative structure. The challenge was to build an unforgettable experience that felt like a native application without sacrificing web performance and SEO.",
      goals: ["Achieve a perfect 100 Lighthouse score.", "Implement 60 FPS physics-based interactions.", "Create a highly modular, decoupled foundation architecture.", "Design a timeless, dark-mode-first aesthetic."],
      research: "I analyzed top-tier SaaS landing pages (Linear, Vercel, Stripe) and native OS UI paradigms. I identified that the feeling of 'premium' comes from predictable physics (mass and damping), high-contrast typography, and uncompromising performance.",
      architecture: "The application is built on Next.js 14 App Router. It strictly separates concerns into a constants layer, services layer, utilities, and presentation UI. The entire animation system is driven by a centralized `motionPresets` configuration running on Framer Motion.",
      developmentProcess: "Development began by establishing the strict Design Tokens (`lib/design.ts`). Once the atomic primitives (MagneticButton, ProjectCard) were built, I orchestrated the higher-level layout using a custom CSS Grid and dynamic imports to ensure optimal chunking.",
      technicalChallenges: "The most significant challenge was synchronizing complex Framer Motion layout animations across server and client boundaries in Next.js 14. Additionally, simulating a 3D holographic sphere using only CSS transforms required deep knowledge of perspective and hardware acceleration.",
      keyDecisions: "I decided to forgo Three.js/WebGL for the main centerpiece in favor of raw CSS transforms and Framer Motion. This decision shaved over 300KB off the initial payload while maintaining the intended visual fidelity.",
      results: "The project achieved a perfect 100/100/100/100 Lighthouse score. The custom physics engine provides an incredibly tactile feel, and the modular architecture allows for new sections to be added seamlessly.",
      lessonsLearned: "I learned the immense value of front-loading architectural decisions. By building the strict typed interfaces and constants layer first, assembling the actual UI became a declarative, bug-free process.",
      futureImprovements: "Future iterations will include an integrated markdown CMS for the blog, WebGL experiments within dedicated project pages, and an edge-computed analytics dashboard.",
    }
  },
  {
    slug: "project-alpha",
    title: "Project Alpha",
    category: "Frontend",
    description: "High-performance financial dashboard utilizing real-time WebSockets and WebGL rendering.",
    techStack: ["React", "TypeScript", "Three.js", "Tailwind CSS"],
    status: "Completed",
    role: "Senior Frontend Engineer",
    timeline: "Jan 2025 - Dec 2025",
    githubUrl: "https://github.com/samarth/project-alpha",
    liveUrl: "https://alpha.example.com",
    previewImage: "/images/project-alpha.jpg",
    featured: true,
    metrics: [
      { label: "Data Latency", value: "<50ms" },
      { label: "Concurrent Users", value: "10k+" }
    ],
    relatedProjects: ["nexus-api", "samarth-os"],
    caseStudy: {
      overview: "A specialized dashboard for high-frequency trading analysts.",
      problem: "Analysts were experiencing UI freezes when receiving massive real-time data payloads.",
      goals: ["Zero UI blocking.", "Sub-50ms data rendering."],
      research: "Investigated WebWorkers and OffscreenCanvas for moving rendering off the main thread.",
      architecture: "React frontend communicating via strictly typed WebSockets to a Rust backend.",
      developmentProcess: "Built iteratively, starting with the data pipeline before moving to the WebGL visualization layer.",
      technicalChallenges: "Handling garbage collection pauses when processing thousands of updates per second.",
      keyDecisions: "Utilized flat arrays and ArrayBuffers instead of deeply nested JSON to minimize GC overhead.",
      results: "Achieved sustained 60FPS even during peak market volatility.",
      lessonsLearned: "Memory management is critical in JavaScript when dealing with high-frequency data.",
      futureImprovements: "Migrate to WebGPU for the charting engine.",
    }
  },
  {
    slug: "nexus-api",
    title: "Nexus API",
    category: "Backend",
    description: "A highly concurrent microservice architecture handling millions of requests with Rust and gRPC.",
    techStack: ["Rust", "gRPC", "PostgreSQL", "Docker"],
    status: "In Development",
    role: "Backend Architect",
    timeline: "Mar 2026 - Present",
    githubUrl: "https://github.com/samarth/nexus-api",
    liveUrl: "#",
    previewImage: "/images/nexus.jpg",
    featured: false,
    metrics: [
      { label: "Throughput", value: "50k RPS" },
      { label: "Latency", value: "2ms" }
    ],
    relatedProjects: ["samarth-os", "project-alpha"],
    caseStudy: {
      overview: "Nexus API serves as the backbone for a suite of distributed enterprise applications.",
      problem: "The previous Node.js monolith could not scale efficiently under heavy load.",
      goals: ["Handle 50k RPS per node.", "Achieve 99.99% uptime."],
      research: "Benchmarked Go, Rust, and C++ for the rewrite. Chose Rust for its fearless concurrency.",
      architecture: "Microservices communicating over gRPC, orchestrated by Kubernetes.",
      developmentProcess: "Rebuilt the core routing logic first, gradually shifting traffic from the monolith.",
      technicalChallenges: "Designing a lock-free cache architecture to prevent thread contention.",
      keyDecisions: "Adopted Tokio for asynchronous runtime and Tonic for gRPC.",
      results: "Reduced infrastructure costs by 60% while increasing throughput tenfold.",
      lessonsLearned: "Rust's strict compiler significantly reduces runtime errors in highly concurrent systems.",
      futureImprovements: "Implement globally distributed database reads.",
    }
  }
];
