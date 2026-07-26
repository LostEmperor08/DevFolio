import { BlogPost } from "@/types";

export const blogs: BlogPost[] = [
  {
    slug: "building-the-premium-devfolio",
    title: "How I Built This Premium Developer Folio",
    description:
      "A deep dive into the architecture, design systems, and performance optimizations behind my personal operating system.",
    publishedDate: "July 24, 2026",
    readingTime: "8 min read",
    category: "Engineering",
    tags: ["React", "Next.js", "Framer Motion", "Design"],
    coverImage: "/images/blog_building_portfolio.jpg",
    featured: true,
    draft: false,
    relatedPosts: [],
    author: {
      name: "Samarth Patil",
      avatar: "/images/avatar.jpg",
      role: "Senior Frontend Architect",
    },
    tableOfContents: [
      { id: "the-vision", title: "The Vision", level: 2 },
      { id: "architecture", title: "Architecture & Tech Stack", level: 2 },
      { id: "framer-motion", title: "Mastering Framer Motion", level: 2 },
      { id: "conclusion", title: "Final Thoughts", level: 2 },
    ],
    content: [
      {
        id: "block-1",
        type: "paragraph",
        text: "When setting out to build a new portfolio, I didn't want to just build a website. I wanted to build an experience. A digital ecosystem that felt premium, responsive, and tactile. This is the story of how Samarth OS came to life.",
      },
      {
        id: "block-2",
        type: "heading",
        text: "The Vision",
        level: 2,
      },
      {
        id: "block-3",
        type: "paragraph",
        text: "I drew inspiration from the best in the business: Apple, Linear, Vercel, and Stripe. The goal was to create a portfolio that felt like a native operating system. It needed a unified design system, micro-interactions that spark joy, and an aesthetic that screamed 'premium software'.",
      },
      {
        id: "block-4",
        type: "heading",
        text: "Architecture & Tech Stack",
        level: 2,
      },
      {
        id: "block-5",
        type: "paragraph",
        text: "Under the hood, the application is powered by Next.js App Router. I chose React for its composability and Tailwind CSS for rapid styling. To maintain structure, I implemented a strict separation of concerns:",
      },
      {
        id: "block-6",
        type: "list",
        style: "unordered",
        items: [
          "Data Layer: Centralized configuration files for profile, projects, and blogs.",
          "Presentation Layer: Reusable UI components styled with tailwind.",
          "Animation Layer: Framer motion orchestrated via shared presets.",
        ],
      },
      {
        id: "block-7",
        type: "heading",
        text: "Mastering Framer Motion",
        level: 2,
      },
      {
        id: "block-8",
        type: "paragraph",
        text: "Animations are what make this portfolio feel alive. By using Framer Motion's `useMotionValue` and `useSpring`, I was able to create physics-based interactions like the magnetic buttons and the 3D tilt effect on the project cards. The key was to keep the animations subtle and performant, never blocking the main thread.",
      },
      {
        id: "block-9",
        type: "code",
        code: `// Example of physics-based magnetic button
const x = useSpring(0, { stiffness: 300, damping: 20 });
const y = useSpring(0, { stiffness: 300, damping: 20 });

function handleMouseMove(e) {
  const rect = ref.current.getBoundingClientRect();
  x.set((e.clientX - rect.left - rect.width / 2) * 0.2);
  y.set((e.clientY - rect.top - rect.height / 2) * 0.2);
}`,
        language: "tsx",
      },
      {
        id: "block-10",
        type: "heading",
        text: "Final Thoughts",
        level: 2,
      },
      {
        id: "block-11",
        type: "paragraph",
        text: "Building this portfolio was an incredible journey. It pushed me to explore the limits of web performance and creative development. If you're looking to build something similar, my biggest advice is to start with a strong design system and never compromise on performance.",
      },
    ],
  },
  {
    slug: "scaling-websocket-microservices-in-go",
    title: "Scaling Real-Time WebSockets to 100k Concurrent Connections in Go",
    description:
      "How we optimized memory allocation, goroutine pooling, and Linux kernel epoll to handle massive real-time data ingestion.",
    publishedDate: "July 15, 2026",
    readingTime: "11 min read",
    category: "Backend & DevOps",
    tags: ["Go", "WebSockets", "Microservices", "Performance"],
    coverImage: "/images/project_hyperscale.jpg",
    featured: true,
    draft: false,
    relatedPosts: [],
    author: {
      name: "Samarth Patil",
      avatar: "/images/avatar.jpg",
      role: "Senior Frontend Architect",
    },
    tableOfContents: [
      { id: "the-challenge", title: "The C100k Challenge", level: 2 },
      { id: "goroutine-pooling", title: "Goroutine Pooling & Epoll", level: 2 },
      { id: "benchmarks", title: "Production Benchmarks", level: 2 },
    ],
    content: [
      {
        id: "b2-1",
        type: "paragraph",
        text: "Handling 10,000 WebSocket connections is easy in almost any modern language. Scaling past 100,000 concurrent, highly active connections without running out of RAM requires rethinking your architecture from the OS kernel up.",
      },
      {
        id: "b2-2",
        type: "heading",
        text: "The C100k Challenge",
        level: 2,
      },
      {
        id: "b2-3",
        type: "paragraph",
        text: "Standard HTTP server implementations allocate two goroutines per connection: one for reading and one for writing. At 100k connections, that is 200,000 goroutines simply sitting idle waiting for I/O, consuming gigabytes of stack space.",
      },
      {
        id: "b2-4",
        type: "code",
        code: `// Optimized Epoll event loop in Go
func (p *Pool) EventLoop() {
    for {
        n, err := syscall.EpollWait(p.epfd, p.events, -1)
        if err != nil {
            continue
        }
        for i := 0; i < n; i++ {
            conn := p.connections[p.events[i].Fd]
            p.workerQueue <- conn
        }
    }
}`,
        language: "go",
      },
    ],
  },
  {
    slug: "the-future-of-webgl-and-webgpu",
    title: "Why WebGPU will completely replace Three.js in 2027",
    description:
      "An architectural analysis of compute shaders, direct GPU memory access, and why next-generation web 3D will be 10x faster.",
    publishedDate: "June 28, 2026",
    readingTime: "6 min read",
    category: "Graphics & 3D",
    tags: ["WebGPU", "WebGL", "Three.js", "Graphics"],
    coverImage: "/images/project_quantum.jpg",
    featured: false,
    draft: false,
    relatedPosts: [],
    author: {
      name: "Samarth Patil",
      avatar: "/images/avatar.jpg",
      role: "Senior Frontend Architect",
    },
    tableOfContents: [{ id: "webgpu-architecture", title: "WebGPU Architecture", level: 2 }],
    content: [
      {
        id: "b3-1",
        type: "paragraph",
        text: "For over a decade, WebGL has been the undisputed king of in-browser 3D rendering. However, its reliance on an outdated OpenGL ES 2.0 state machine makes it a bottleneck for modern GPU compute workloads. Enter WebGPU.",
      },
    ],
  },
];
