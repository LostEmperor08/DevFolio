import { Code2, Globe, Cpu, Wrench } from "lucide-react";
import { Skill } from "@/types";

export const skillCategories: Skill[] = [
  {
    id: "languages",
    title: "Programming Languages",
    icon: Code2,
    skills: ["C++", "Python", "TypeScript", "JavaScript", "SQL", "C"],
    description: "Core languages used for problem solving, coursework, and application development.",
    colSpan: "md:col-span-2",
  },
  {
    id: "web",
    title: "Web & Frontend",
    icon: Globe,
    skills: ["Next.js", "React", "Tailwind CSS", "HTML5", "CSS3", "Framer Motion"],
    description: "Building responsive, modern, and minimal web interfaces with high performance.",
    colSpan: "md:col-span-1",
  },
  {
    id: "cs-fundamentals",
    title: "ISE & CS Fundamentals",
    icon: Cpu,
    skills: ["Data Structures", "Algorithms", "Object-Oriented Programming", "Computer Systems", "Database Design"],
    description: "Foundational academic coursework in Information Science & Engineering.",
    colSpan: "md:col-span-1",
  },
  {
    id: "tools",
    title: "Dev Tools & Environment",
    icon: Wrench,
    skills: ["Git & GitHub", "Linux / CLI", "VS Code", "Postman", "Vercel", "Prisma"],
    description: "Modern developer workflow tools and version control systems.",
    colSpan: "md:col-span-2",
  },
];
