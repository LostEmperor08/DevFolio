import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "devfolio",
    title: "DevFolio · Minimal Portfolio",
    category: "Web Engineering",
    description:
      "A minimalist, high-performance personal portfolio crafted with Next.js 15, React 19, Tailwind CSS, and Framer Motion.",
    techStack: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
    status: "Active",
    role: "Sole Developer",
    timeline: "2026",
    githubUrl: "https://github.com/LostEmperor08/DevFolio",
    liveUrl: "https://xdsamarth.github.io",
    previewImage: "/images/samarth_os_preview.jpg",
    featured: true,
    overview:
      "DevFolio is designed with a strict focus on minimalism, speed, and aesthetic simplicity. Built with Next.js App Router and Tailwind CSS, it eliminates unnecessary bloat to present clean information effortlessly.",
    features: [
      "Streamlined architecture with 100/100 performance",
      "Sleek dark mode aesthetic with micro-interactions",
      "Responsive design tailored for all viewports",
    ],
    metrics: [
      { label: "Performance", value: "100/100" },
      { label: "Design", value: "Minimal" },
    ],
  },
  {
    slug: "telegram-bot-suite",
    title: "Telegram Bot & Automation Suite",
    category: "Python & Automation",
    description:
      "An asynchronous Python Telegram bot ecosystem built for task execution, monitoring, and workflow automation.",
    techStack: ["Python", "AsyncIO", "Telegram API", "Linux"],
    status: "Completed",
    role: "Developer",
    timeline: "2025 - 2026",
    githubUrl: "https://github.com/LostEmperor08/LostGeminiBot",
    liveUrl: "https://github.com/LostEmperor08/LostGeminiBot",
    previewImage: "/images/project_nexus.jpg",
    featured: true,
    overview:
      "An automated bot suite engineered in Python to handle notifications, remote task triggers, and conversational automation.",
    features: [
      "Asynchronous message handling with AsyncIO",
      "Command routing and session state management",
      "Lightweight Linux deployment footprint",
    ],
    metrics: [
      { label: "Runtime", value: "Python 3.12" },
      { label: "Architecture", value: "AsyncIO" },
    ],
  },
  {
    slug: "algorithms-and-systems",
    title: "Data Structures & Systems Toolkit",
    category: "Computer Science",
    description:
      "Implementations and explorations in C++ and Python covering core data structures, algorithms, and ISE coursework experiments.",
    techStack: ["C++", "Python", "Data Structures", "Algorithms"],
    status: "Ongoing",
    role: "ISE Student",
    timeline: "2026",
    githubUrl: "https://github.com/LostEmperor08",
    liveUrl: "https://github.com/LostEmperor08",
    previewImage: "/images/project_quantum.jpg",
    featured: true,
    overview:
      "A collection of algorithms, problem solving solutions, and systems experiments in Information Science & Engineering.",
    features: [
      "Optimized implementations of fundamental data structures",
      "Algorithmic complexity analysis and benchmarking",
      "Clean modular code structure and documentation",
    ],
    metrics: [
      { label: "Focus", value: "DSA & Systems" },
      { label: "Languages", value: "C++ / Python" },
    ],
  },
];
