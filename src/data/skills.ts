import { Monitor, Server, Database, Cloud, Shield, Wrench } from "lucide-react";
import { Skill } from "@/types";

export const skillCategories: Skill[] = [
  {
    id: "frontend",
    title: "Frontend Engineering",
    icon: Monitor,
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Three.js"],
    description: "Building fluid, accessible, and high-performance user interfaces.",
    colSpan: "md:col-span-2",
  },
  {
    id: "backend",
    title: "Backend Architecture",
    icon: Server,
    skills: ["Node.js", "Python", "Rust", "gRPC", "GraphQL"],
    description: "Designing scalable, concurrent, and secure microservices.",
    colSpan: "md:col-span-1",
  },
  {
    id: "cloud",
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: ["AWS", "Vercel", "Docker", "Kubernetes", "CI/CD"],
    description: "Automating deployments and managing distributed infrastructure.",
    colSpan: "md:col-span-1",
  },
  {
    id: "security",
    title: "Cybersecurity",
    icon: Shield,
    skills: ["Network Security", "Penetration Testing", "Cryptography", "OWASP"],
    description: "Ensuring data integrity and protecting against modern vulnerabilities.",
    colSpan: "md:col-span-2",
  }
];
