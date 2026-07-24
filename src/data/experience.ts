import { Experience } from "@/types";

export const experiences: Experience[] = [
  {
    id: 1,
    title: "Senior Frontend Architect",
    organization: "Tech Innovators Inc.",
    duration: "2024 - Present",
    description: "Leading the frontend architecture for an enterprise SaaS platform. Migrated the legacy React app to Next.js 14 App Router, improving performance by 40% and setting up strict design systems.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Zustand"],
  },
  {
    id: 2,
    title: "Full Stack Developer",
    organization: "Creative Studio",
    duration: "2022 - 2024",
    description: "Built award-winning digital experiences and e-commerce platforms. Handled both frontend physics-based animations and robust backend payment integrations.",
    technologies: ["React", "Node.js", "Framer Motion", "Stripe"],
  },
  {
    id: 3,
    title: "Security Analyst Intern",
    organization: "CyberDefend",
    duration: "2021 - 2022",
    description: "Conducted vulnerability assessments and penetration testing for web applications. Automated security workflows using Python.",
    technologies: ["Python", "Kali Linux", "Burp Suite", "OWASP ZAP"],
  }
];
