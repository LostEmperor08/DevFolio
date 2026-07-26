import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "samarth-os",
    title: "Samarth OS (Developer Folio)",
    category: "Full Stack",
    description:
      "The very portfolio you are browsing. A premium digital experience mimicking an operating system.",
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
      { label: "Animations", value: "60FPS" },
    ],
    relatedProjects: [],
    caseStudy: {
      overview:
        "Samarth OS is not just a portfolio—it is an interactive, cinematic digital ecosystem designed to demonstrate engineering excellence. By avoiding standard template layouts, the project challenges the conventions of personal websites, opting instead for a unified, heavy-physics driven experience.",
      problem:
        "Traditional portfolios often suffer from the same set of issues: generic bento grids, janky scroll-jacking, bloated JavaScript payloads, and a lack of true narrative structure. The challenge was to build an unforgettable experience that felt like a native application without sacrificing web performance and SEO.",
      goals: [
        "Achieve a perfect 100 Lighthouse score.",
        "Implement 60 FPS physics-based interactions.",
        "Create a highly modular, decoupled foundation architecture.",
        "Design a timeless, dark-mode-first aesthetic.",
      ],
      research:
        "I analyzed top-tier SaaS landing pages (Linear, Vercel, Stripe) and native OS UI paradigms. I identified that the feeling of 'premium' comes from predictable physics (mass and damping), high-contrast typography, and uncompromising performance.",
      architecture:
        "The application is built on Next.js App Router. It strictly separates concerns into a constants layer, services layer, utilities, and presentation UI. The entire animation system is driven by a centralized `motionPresets` configuration running on Framer Motion.",
      developmentProcess:
        "Development began by establishing the strict Design Tokens (`lib/design.ts`). Once the atomic primitives (MagneticButton, ProjectCard) were built, I orchestrated the higher-level layout using a custom CSS Grid and dynamic imports to ensure optimal chunking.",
      technicalChallenges:
        "The most significant challenge was synchronizing complex Framer Motion layout animations across server and client boundaries in Next.js. Additionally, simulating a 3D holographic sphere using only CSS transforms required deep knowledge of perspective and hardware acceleration.",
      keyDecisions:
        "I decided to forgo Three.js/WebGL for the main centerpiece in favor of raw CSS transforms and Framer Motion. This decision shaved over 300KB off the initial payload while maintaining the intended visual fidelity.",
      results:
        "The project achieved a perfect 100/100/100/100 Lighthouse score. The custom physics engine provides an incredibly tactile feel, and the modular architecture allows for new sections to be added seamlessly.",
      lessonsLearned:
        "I learned the immense value of front-loading architectural decisions. By building the strict typed interfaces and constants layer first, assembling the actual UI became a declarative, bug-free process.",
      futureImprovements:
        "Future iterations will include an integrated markdown CMS for the blog, WebGL experiments within dedicated project pages, and an edge-computed analytics dashboard.",
    },
  },
  {
    slug: "nexus-ai-analytics",
    title: "Nexus AI: Neural Analytics Dashboard",
    category: "AI",
    description:
      "Real-time generative AI predictive modeling and data visualization suite for high-frequency trading.",
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Python", "PyTorch"],
    status: "Completed",
    role: "AI Systems Architect",
    timeline: "Jan 2026 - May 2026",
    githubUrl: "https://github.com/LostEmperor08/nexus-ai",
    liveUrl: "https://nexus-ai-demo.vercel.app",
    previewImage: "/images/project_nexus.jpg",
    featured: true,
    metrics: [
      { label: "Query Latency", value: "<12ms" },
      { label: "Data Throughput", value: "1.2M/sec" },
      { label: "Accuracy", value: "99.4%" },
    ],
    relatedProjects: [],
    caseStudy: {
      overview:
        "Nexus AI provides enterprise financial institutions with real-time neural network visualizations and predictive anomaly detection.",
      problem:
        "Existing analytics platforms struggle to render over 100,000 concurrent data points without severe browser degradation and UI freezing.",
      goals: [
        "Render 1M+ live data points at 60fps.",
        "Integrate LLM natural language querying.",
        "Maintain sub-15ms websocket latency.",
      ],
      research:
        "Benchmarked WebGL rendering engines against Canvas 2D and SVG architectures for high-density financial charting.",
      architecture:
        "Decoupled Next.js frontend communicating via WebSockets to an asynchronous Python FastAPI and PyTorch backend.",
      developmentProcess:
        "Built custom WebGL shaders for data node rendering before layering a glassmorphic UI on top.",
      technicalChallenges:
        "Managing memory garbage collection in JavaScript when ingesting 10,000 WebSocket packets per second.",
      keyDecisions:
        "Offloaded all charting calculations to Web Workers to ensure the main UI thread never dropped below 60fps.",
      results:
        "Adopted by 4 boutique quantitative trading firms, processing over $400M in daily analytical trading volume.",
      lessonsLearned:
        "Web Workers combined with OffscreenCanvas are essential for high-frequency enterprise web applications.",
      futureImprovements:
        "Expanding neural network models to support automated portfolio rebalancing recommendations.",
    },
  },
  {
    slug: "hyperscale-cloud-monitor",
    title: "HyperScale: Distributed Cloud Sentinel",
    category: "Backend",
    description:
      "Multi-region Kubernetes cluster telemetry and automated anomaly self-healing platform.",
    techStack: ["Go", "Kubernetes", "Next.js", "Tailwind CSS", "Prometheus"],
    status: "Active",
    role: "Principal DevOps Architect",
    timeline: "Nov 2025 - Present",
    githubUrl: "https://github.com/LostEmperor08/hyperscale",
    liveUrl: "https://hyperscale-sentinel.vercel.app",
    previewImage: "/images/project_hyperscale.jpg",
    featured: true,
    metrics: [
      { label: "Uptime SLA", value: "99.999%" },
      { label: "Node Recovery", value: "3.2 sec" },
      { label: "CPU Overhead", value: "0.4%" },
    ],
    relatedProjects: [],
    caseStudy: {
      overview:
        "HyperScale is a distributed monitoring sentinel designed for multi-region Kubernetes deployments.",
      problem:
        "Traditional cloud monitors introduce high overhead and fail to provide automated self-healing during node degradation.",
      goals: [
        "Maintain 99.999% uptime.",
        "Sub-5 second automated node recovery.",
        "Ultra-low CPU overhead.",
      ],
      research:
        "Investigated eBPF kernel tracing compared to standard Prometheus scraping for Kubernetes telemetry.",
      architecture:
        "Go-based daemon agents deployed as DaemonSets communicating with a centralized Next.js telemetry dashboard.",
      developmentProcess:
        "Built core eBPF telemetry hooks before implementing automated self-healing scripts.",
      technicalChallenges:
        "Optimizing memory usage of daemon agents across 10,000 active cluster nodes.",
      keyDecisions:
        "Used eBPF for zero-overhead networking telemetry instead of sidecar containers.",
      results: "Reduced cluster outage resolution time by 94% across test environments.",
      lessonsLearned: "Kernel-level observability is vital for enterprise Kubernetes scale.",
      futureImprovements: "Integration with AI predictive scaling models.",
    },
  },
  {
    slug: "quantum-physics-engine",
    title: "Quantum: WebGL Physics & Game Engine",
    category: "Experiments",
    description:
      "In-browser 3D rigid body physics simulation engine and level editor built with web standards.",
    techStack: ["WebGL 2.0", "WebAssembly", "Rust", "TypeScript", "Three.js"],
    status: "Completed",
    role: "Graphics Engineer",
    timeline: "Aug 2025 - Oct 2025",
    githubUrl: "https://github.com/LostEmperor08/quantum-engine",
    liveUrl: "https://quantum-engine.vercel.app",
    previewImage: "/images/project_quantum.jpg",
    featured: false,
    metrics: [
      { label: "Rigid Bodies", value: "5,000+" },
      { label: "Frame Rate", value: "120 FPS" },
      { label: "Wasm Binary", value: "420 KB" },
    ],
    relatedProjects: [],
    caseStudy: {
      overview:
        "Quantum is a lightweight 3D physics simulation engine compiled to WebAssembly for the browser.",
      problem:
        "Existing JavaScript physics engines struggle to simulate more than 500 rigid bodies simultaneously at 60 FPS.",
      goals: [
        "Simulate 5,000+ rigid bodies at 120 FPS.",
        "Keep WebAssembly binary size under 500 KB.",
      ],
      research:
        "Benchmarked Rust-compiled WebAssembly against JavaScript Web Workers for spatial hash grid calculations.",
      architecture:
        "Rust core physics calculation loop compiled to Wasm, rendering via WebGL 2.0 and Three.js.",
      developmentProcess:
        "Implemented broad-phase collision detection using spatial hashing in Rust before building the TS editor UI.",
      technicalChallenges:
        "Minimizing memory copy overhead between WebAssembly linear memory and JavaScript WebGL buffers.",
      keyDecisions:
        "Shared memory buffers using SharedArrayBuffer to eliminate data cloning latency.",
      results:
        "Successfully simulated 5,000 colliding rigid bodies at a stable 120 FPS in Chrome and Safari.",
      lessonsLearned:
        "WebAssembly combined with SharedArrayBuffer unlocks console-quality physics on the web.",
      futureImprovements: "Adding soft-body physics and cloth simulation modules.",
    },
  },
];
