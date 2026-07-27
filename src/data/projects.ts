import { Project } from "@/types";

export const projects: Project[] = [
  {
    slug: "developer-os",
    title: "Developer OS (Developer Folio)",
    category: "Web App",
    description:
      "An interactive, cinematic developer portfolio engineered as a responsive web operating system with custom physics and zero-layout-shift UI.",
    techStack: [
      "Next.js 16",
      "TypeScript",
      "Tailwind CSS",
      "Framer Motion",
      "PostgreSQL",
      "Vercel",
    ],
    status: "In Progress",
    role: "Lead Architect & Engineer",
    timeline: "July 2026 - Present",
    githubUrl: "https://github.com/LostEmperor08/DevFolio",
    liveUrl: "https://samarthpatil.com",
    previewImage: "/images/samarth_os_preview.jpg",
    featured: true,
    overview:
      "Developer OS is an ambitious reimagining of the personal developer portfolio. Instead of presenting static pages or generic grid templates, it operates as a tactile, cinematic web operating system. The application bridges the gap between high-level engineering presentation and immersive user interaction with 60 FPS performance.",
    features: [
      "100/100 Lighthouse performance metrics across all Core Web Vitals",
      "Physics-based micro-interactions and tactile desktop OS aesthetic",
      "Serverless Neon PostgreSQL database with decoupled architecture",
      "Instantaneous Next.js 16 App Router streaming and layout transitions",
    ],
    challenges:
      "Orchestrating complex layout transitions and spring animations across Next.js server and client boundaries without causing hydration mismatches or layout reflows.",
    metrics: [
      { label: "Lighthouse Score", value: "100/100" },
      { label: "Frame Rate", value: "60 FPS" },
      { label: "Core Web Vitals", value: "Passed" },
    ],
  },
  {
    slug: "cyber-cloud-sentinel",
    title: "Cloud Sentinel & Security Monitor",
    category: "Cybersecurity",
    description:
      "An automated cloud infrastructure monitor and security auditing platform engineered to detect vulnerabilities and anomalous network traffic in real time.",
    techStack: ["Python", "Linux", "PostgreSQL", "Docker", "Tailwind CSS", "Next.js"],
    status: "Completed",
    role: "Security Engineer & Creator",
    timeline: "Early 2026",
    githubUrl: "https://github.com/LostEmperor08/DevFolio",
    liveUrl: "https://samarthpatil.com",
    previewImage: "/images/project_quantum.jpg",
    featured: false,
    overview:
      "Cloud Sentinel is an automated cloud security auditing and monitoring engine designed to inspect serverless environments and Linux servers for vulnerabilities. It continuously analyzes system logs, port configurations, and network endpoints to provide real-time threat intelligence and actionable alerts.",
    features: [
      "Automated vulnerability scanning and security posture auditing",
      "Real-time network anomaly detection and alert notifications",
      "Custom dashboard with visual traffic inspection and log analytics",
      "Secure Linux daemon architecture with zero-overhead telemetry",
    ],
    challenges:
      "Implementing low-overhead packet inspection and real-time log ingestion without degrading host server CPU performance or causing memory spikes.",
  },
  {
    slug: "telegram-bot-suite",
    title: "Automated Ops Telegram Bot Suite",
    category: "Telegram Bot",
    description:
      "A high-performance Python Telegram bot ecosystem built for server monitoring, automated task execution, and remote server management.",
    techStack: ["Python", "AsyncIO", "Telegram API", "Linux", "PostgreSQL", "Docker"],
    status: "Completed",
    role: "Backend & Automation Lead",
    timeline: "Late 2025",
    githubUrl: "https://github.com/LostEmperor08/DevFolio",
    liveUrl: "https://samarthpatil.com",
    previewImage: "/images/project_nexus.jpg",
    featured: false,
    overview:
      "The Automated Ops Suite is a robust Python Telegram bot framework developed to streamline Linux server administration and workflow automation. It allows developers to securely trigger deployment scripts, query database health, and receive instant diagnostic alerts from anywhere.",
    features: [
      "Remote Linux server command execution via encrypted chats",
      "Automated cron-job monitoring and instant failure alerts",
      "Multi-user role-based access control and command auditing",
      "Asynchronous Python architecture using standard Telegram APIs",
    ],
    challenges:
      "Designing a bulletproof authentication and webhook verification system to prevent unauthorized command execution over chat interfaces.",
  },
];
