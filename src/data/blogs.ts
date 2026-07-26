import { BlogPost } from "@/types";

export const blogs: BlogPost[] = [
  {
    slug: "building-developer-os-portfolio",
    title: "How I Built Developer OS: Architecture, Physics & Performance of a Next-Gen Portfolio",
    description:
      "An exhaustive technical deep-dive into engineering an interactive, cinematic web operating system with Next.js 16, Framer Motion physics, and serverless PostgreSQL.",
    publishedDate: "July 26, 2026",
    readingTime: "15 min read",
    category: "Engineering",
    tags: ["Next.js", "TypeScript", "Framer Motion", "Architecture", "Performance"],
    coverImage: "/images/blog_building_portfolio.jpg",
    featured: true,
    draft: false,
    relatedPosts: [],
    author: {
      name: "Samarth Patil",
      avatar: "/images/avatar.jpg",
      role: "Lead Architect & Engineer",
    },
    tableOfContents: [
      {
        id: "why-developer-os",
        title: "1. Why Developer OS? Rejecting Template Fatigue",
        level: 2,
      },
      {
        id: "system-architecture",
        title: "2. System Architecture & Separation of Concerns",
        level: 2,
      },
      {
        id: "physics-engine",
        title: "3. The Custom 60FPS Physics Engine (Without WebGL)",
        level: 2,
      },
      {
        id: "database-and-auth",
        title: "4. Serverless Database & NextAuth v5 Fail-Safes",
        level: 2,
      },
      {
        id: "performance-engineering",
        title: "5. Achieving 100/100 Lighthouse & Zero Layout Shift",
        level: 2,
      },
      { id: "lessons-and-roadmap", title: "6. Lessons Learned & The Road Ahead", level: 2 },
    ],
    content: [
      {
        id: "block-1",
        type: "paragraph",
        text: "When setting out to build my personal digital footprint, I faced a common engineering dilemma: standard developer portfolios have become painfully predictable. The ubiquitous 'bento grid' template, static markdown blogs, and uninspired Bootstrap or Tailwind clones fail to demonstrate actual full-stack engineering capability. I didn't want to just build a website—I wanted to build an experience. A cinematic, responsive digital operating system that feels as tactile and powerful as a native desktop application. This is the exhaustive engineering breakdown of how Developer OS was architected from scratch.",
      },
      {
        id: "block-2",
        type: "heading",
        text: "1. Why Developer OS? Rejecting Template Fatigue",
        level: 2,
      },
      {
        id: "block-3",
        type: "paragraph",
        text: "In production engineering, the distinction between a mediocre product and an exceptional one lies in the micro-interactions, layout predictability, and rendering performance. I drew inspiration from industry standards set by Apple, Vercel, Linear, and Stripe. My core architectural thesis was simple: if a personal portfolio is supposed to represent an engineer's craftsmanship, it must adhere to enterprise-grade software standards.",
      },
      {
        id: "block-4",
        type: "list",
        style: "unordered",
        items: [
          "Zero-compromise visual design with high-contrast dark-mode typography.",
          "Predictable, physics-driven UI animations running at a locked 60 FPS.",
          "Strict separation between data contracts, business logic, and presentation layers.",
          "Sub-100ms navigation transitions powered by Next.js App Router streaming.",
        ],
      },
      {
        id: "block-5",
        type: "heading",
        text: "2. System Architecture & Separation of Concerns",
        level: 2,
      },
      {
        id: "block-6",
        type: "paragraph",
        text: "Developer OS is built on Next.js 16 leveraging React 19 server components and TypeScript in strict mode. To prevent the codebase from devolving into a tangled mess of UI components and ad-hoc API calls, I designed a layered architectural hierarchy:",
      },
      {
        id: "block-7",
        type: "code",
        code: `src/
├── config/          # Static profile constants, social links & metadata
├── data/            # Strongly-typed seed repositories (projects, blogs)
├── lib/             # Core utilities, Prisma client singleton, Design Tokens
├── services/        # Decoupled data access layer (Prisma queries & caching)
├── types/           # Global TypeScript interfaces and domain contracts
├── components/      # Atomic UI primitives, layout wrappers & composite cards
└── app/             # Next.js App Router pages, layouts & API endpoints`,
        language: "text",
      },
      {
        id: "block-8",
        type: "paragraph",
        text: "By isolating data retrieval into a dedicated `services/` layer, UI components remain completely agnostic to the underlying database technology. Whether data is served statically from memory during local development or dynamically fetched from a PostgreSQL serverless instance in production, the presentation layer consumes identical TypeScript contracts.",
      },
      {
        id: "block-9",
        type: "heading",
        text: "3. The Custom 60FPS Physics Engine (Without WebGL)",
        level: 2,
      },
      {
        id: "block-10",
        type: "paragraph",
        text: "Many immersive portfolios rely heavily on Three.js, React Three Fiber, or WebGL shaders. While visually striking, these libraries routinely add 300KB to 500KB of JavaScript bundle overhead, severely impairing initial page load times on mobile devices. I made the conscious decision to achieve comparable visual depth using only hardware-accelerated CSS transforms and Framer Motion spring physics.",
      },
      {
        id: "block-11",
        type: "paragraph",
        text: "To make interactive elements feel heavy and tactile, I replaced linear easing curves with mathematical spring models governed by stiffness, damping, and mass parameters. For instance, our magnetic interactive buttons and 3D tilt cards compute pointer vectors in real time:",
      },
      {
        id: "block-12",
        type: "code",
        code: `// High-performance 3D Card Tilt Math using Framer Motion
import { useMotionValue, useSpring, useTransform } from "framer-motion";

export function useTiltPhysics() {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Apply spring physics to dampen raw mouse coordinates
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), springConfig);

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;
    
    // Normalize coordinates between -0.5 and 0.5
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  }

  return { rotateX, rotateY, handleMouseMove };
}`,
        language: "tsx",
      },
      {
        id: "block-13",
        type: "heading",
        text: "4. Serverless Database & NextAuth v5 Fail-Safes",
        level: 2,
      },
      {
        id: "block-14",
        type: "paragraph",
        text: "A true developer operating system must be dynamic. While blog posts and project case studies can be statically generated, administrative content management, contact form submissions, and real-time analytics necessitate a robust backend. We paired Prisma ORM with Neon PostgreSQL Serverless, utilizing connection pooling to handle concurrent serverless lambdas seamlessly.",
      },
      {
        id: "block-15",
        type: "paragraph",
        text: "For administrative access, we implemented NextAuth v5 (Auth.js) running on Edge Runtime middleware. During early production deployments on Vercel, we encountered a fascinating infrastructure hurdle: our IP-based login rate-limiting mechanism inadvertently triggered lockouts because Vercel's serverless functions share outgoing NAT IP addresses. To resolve this without compromising security, we engineered an architectural fail-safe in `src/auth.ts` that bypasses database IP rate-limiting specifically for verified owner credentials while maintaining strict bcrypt password verification.",
      },
      {
        id: "block-16",
        type: "code",
        code: `// Owner Fail-Safe Credential Verification
if (credentials.email === "admin@samarth.dev") {
  const adminUser = await prisma.user.findUnique({
    where: { email: "admin@samarth.dev" }
  });
  
  if (adminUser && adminUser.password) {
    const isValid = await bcrypt.compare(
      credentials.password as string, 
      adminUser.password
    );
    if (isValid) return adminUser;
  }
}`,
        language: "typescript",
      },
      {
        id: "block-17",
        type: "heading",
        text: "5. Achieving 100/100 Lighthouse & Zero Layout Shift",
        level: 2,
      },
      {
        id: "block-18",
        type: "paragraph",
        text: "Performance is not an afterthought; it is a primary design feature. To achieve a pristine 100/100 Lighthouse audit across all categories, several optimizations were integrated directly into the build pipeline:",
      },
      {
        id: "block-19",
        type: "list",
        style: "unordered",
        items: [
          "Dynamic Component Chunking: Heavy interactive components (like case study modals and code highlighting blocks) are dynamically imported with Suspense fallbacks.",
          "Font Subsetting: Google Fonts (Inter and Outfit) are self-hosted and zero-layout-shift subsetted via `@next/font`.",
          "Image Optimization: All graphical assets use Next.js `<Image>` with explicit width/height ratios and WebP/AVIF compression formats to guarantee a Cumulative Layout Shift (CLS) score of exactly 0.00.",
          "CSS Atomic Utility Caching: Tailwind CSS generates an optimized, deduplicated stylesheet under 12KB gzipped.",
        ],
      },
      {
        id: "block-20",
        type: "heading",
        text: "6. Lessons Learned & The Road Ahead",
        level: 2,
      },
      {
        id: "block-21",
        type: "paragraph",
        text: "Building Developer OS reinforced a timeless engineering lesson: architectural discipline at the beginning of a project pays compounding interest as complexity scales. By defining strict TypeScript interfaces, centralizing design tokens, and decoupling database services from UI components, iterating on the visual presentation became a seamless, bug-free endeavor.",
      },
      {
        id: "block-22",
        type: "paragraph",
        text: "The web is evolving rapidly toward richer, more interactive paradigms. Developer OS will continue to serve as my personal laboratory for frontend innovation, with upcoming milestones including an interactive terminal sandbox, WebAssembly compute experiments, and an AI-driven codebase assistant embedded directly into the interface.",
      },
    ],
  },
];
