// Samarth OS v3.0 - Comprehensive Cyberpunk Portfolio Dataset
export const defaultData = {
  personalInfo: {
    name: "Samarth Patil",
    domain: "samarthpatil.com",
    titles: ["Full-Stack Engineer", "AI Systems Developer", "Creative Web Architect", "Open-Source Builder"],
    status: "SYSTEM ONLINE • OPEN FOR CONTRACTS & ROLES",
    location: "India (UTC+5:30)",
    email: "hello@samarthpatil.com",
    bio: "Pioneering high-performance web applications, intelligent AI tools, and immersive digital experiences with precision engineering and futuristic aesthetics.",
    resumeUrl: "#",
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=500&q=80"
  },

  githubStats: {
    username: "samarthpatil",
    totalStars: "540+",
    contributions: "1,420+",
    totalRepos: "38",
    followers: "210"
  },

  leetcodeStats: {
    solved: "340+",
    easy: "120",
    medium: "180",
    hard: "40",
    ranking: "Top 8%"
  },

  timeline: [
    {
      year: "2026",
      title: "Senior Full-Stack & AI Engineer",
      company: "Independent Consultant / samarthpatil.com",
      description: "Building production-grade web platforms, fine-tuning LLM agent workflows, and authoring technical developer guides."
    },
    {
      year: "2025",
      title: "Lead Web Developer",
      company: "Apex Digital Labs",
      description: "Architected high-throughput React/Node.js web portals, reduced initial bundle load times by 65%, and integrated WebSocket real-time analytics."
    },
    {
      year: "2024",
      title: "Software Engineering Fellow",
      company: "Tech Innovation Hub",
      description: "Engineered scalable REST APIs with Python & Node.js, optimized database indexing for PostgreSQL, and deployed Docker container clusters."
    }
  ],

  achievements: [
    { title: "Hackathon Winner 🏆", desc: "1st Place at National AI Developer Sprint for building autonomous browser agents." },
    { title: "Open Source Contributor 🌟", desc: "Over 500+ GitHub stars across personal utilities and component libraries." },
    { title: "AWS Certified ☁️", desc: "Certified Solutions Architect Associate with focus on serverless edge functions." }
  ],

  certificates: [
    { name: "AWS Certified Solutions Architect", issuer: "Amazon Web Services", date: "2025" },
    { name: "Full-Stack Web Development Mastery", issuer: "Meta", date: "2024" },
    { name: "Deep Learning & AI Specialization", issuer: "DeepLearning.AI", date: "2024" }
  ],

  skillsCategories: [
    {
      name: "Frontend Architecture",
      icon: "code",
      skills: ["React / Next.js", "TypeScript", "JavaScript (ESNext)", "HTML5 & Modern CSS3", "Tailwind CSS", "Canvas & WebGL", "Framer Motion"]
    },
    {
      name: "Backend & Systems",
      icon: "server",
      skills: ["Node.js & Express", "Python & FastAPI", "RESTful & GraphQL APIs", "PostgreSQL", "MongoDB & Redis", "Docker & CI/CD"]
    },
    {
      name: "AI & Emerging Stack",
      icon: "brain",
      skills: ["LLM Agents", "OpenAI & Claude APIs", "Vector DBs (Chroma/Pinecone)", "Prompt Engineering", "Git & Linux CLI"]
    }
  ],

  techStack: [
    { name: "JavaScript", icon: "fa-brands fa-js", color: "#f7df1e" },
    { name: "TypeScript", icon: "fa-solid fa-code", color: "#3178c6" },
    { name: "React / Next", icon: "fa-brands fa-react", color: "#61dafb" },
    { name: "Node.js", icon: "fa-brands fa-node-js", color: "#339933" },
    { name: "Python", icon: "fa-brands fa-python", color: "#3776ab" },
    { name: "Docker", icon: "fa-brands fa-docker", color: "#2496ed" },
    { name: "Git", icon: "fa-brands fa-git-alt", color: "#f05032" },
    { name: "AWS", icon: "fa-brands fa-aws", color: "#ff9900" }
  ],

  currentlyBuilding: [
    {
      title: "SamarthOS v3.0 Cyberpunk Portfolio Platform",
      status: "System Active",
      tech: ["HTML5", "CSS3 Glassmorphism", "ES Modules", "Web Audio API", "LocalStorage CMS"],
      desc: "An Awwwards-level interactive web operating system equipped with a command palette (Ctrl+K), AI widget, sound synthesizer, and dynamic blog/project admin."
    },
    {
      title: "Autonomous Developer Assistant Engine",
      status: "Prototyping",
      tech: ["Python", "FastAPI", "OpenAI API", "Vector Embeddings"],
      desc: "Building a localized coding assistant that indexes project repositories and generates automated unit tests and refactoring pull requests."
    }
  ],

  projects: [
    {
      id: "project-aura",
      title: "Aura AI — Intelligent Canvas Workspace",
      category: "ai",
      categoryLabel: "AI & Full-Stack",
      difficulty: "Advanced",
      status: "Live Production",
      stars: 284,
      popularity: 98,
      date: "2026-06",
      thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=600&q=80",
      carouselImages: [
        "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80"
      ],
      description: "An AI-powered workspace unifying multi-modal LLMs, autonomous web search agents, and interactive live code execution sandboxes.",
      fullDetails: "Aura AI enables developers to execute natural language coding workflows with real-time SSE streaming responses, syntax verification, and automated browser preview rendering. Engineered with TypeScript, FastAPI, and Redis caching.",
      tags: ["TypeScript", "React", "Python", "FastAPI", "OpenAI", "Tailwind"],
      githubUrl: "https://github.com",
      demoUrl: "https://samarthpatil.com"
    },
    {
      id: "project-hyperflow",
      title: "HyperFlow — Real-Time Telemetry Dashboard",
      category: "web",
      categoryLabel: "Web Platform",
      difficulty: "Intermediate",
      status: "Active Build",
      stars: 195,
      popularity: 89,
      date: "2026-04",
      thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80",
      carouselImages: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=800&q=80"
      ],
      description: "High-throughput data streaming visualization engine capable of processing 100,000+ metrics/sec with hardware-accelerated WebGL charts.",
      fullDetails: "HyperFlow provides DevOps and engineering teams with immediate insights into application performance metrics, latency distribution heatmaps, and automated anomaly alerts via WebSockets.",
      tags: ["JavaScript", "HTML5 Canvas", "WebGL", "Node.js", "WebSockets"],
      githubUrl: "https://github.com",
      demoUrl: "https://samarthpatil.com"
    },
    {
      id: "project-vividui",
      title: "Vivid UI — Glassmorphism Component Library",
      category: "tools",
      categoryLabel: "Developer Tools",
      difficulty: "Intermediate",
      status: "Stable v2.0",
      stars: 340,
      popularity: 95,
      date: "2025-11",
      thumbnail: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=600&q=80",
      carouselImages: [
        "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80"
      ],
      description: "Zero-dependency CSS custom variable design system featuring fluid glassmorphism, neo-brutalist accents, and WCAG AAA accessibility.",
      fullDetails: "Vivid UI helps developers build state-of-the-art web interfaces instantly without bloated CSS framework overrides. Includes native dark mode tokens, micro-animations, and full keyboard navigation controls.",
      tags: ["CSS3", "JavaScript", "Design System", "Vite", "Accessibility"],
      githubUrl: "https://github.com",
      demoUrl: "https://samarthpatil.com"
    }
  ],

  blogPosts: [
    {
      id: "building-cyberpunk-web-os",
      title: "Architecting an Awwwards-Level Cyberpunk Web Portfolio",
      date: "July 24, 2026",
      readTime: "6 min read",
      tags: ["Web Architecture", "UI/UX", "CSS3", "Performance"],
      likes: 84,
      excerpt: "How to combine Web Audio API sound synthesis, hardware-accelerated particle canvas engines, and glassmorphic CSS tokens into a memorable web experience.",
      content: `
        <h2>1. The Evolution of Portfolio Engineering</h2>
        <p>In a sea of standard template portfolios, building a bespoke digital platform on your own domain (like <code>samarthpatil.com</code>) transforms your site from a resume into an interactive experience.</p>

        <h3>Key Architectural Pillars</h3>
        <ul>
          <li><strong>Zero-Latency Audio Synthesis:</strong> Utilizing native Web Audio API oscillators for sci-fi UI feedback without external MP3 audio asset downloads.</li>
          <li><strong>Particle Matrix Engine:</strong> Layering Canvas 2D particle attraction with subtle digital rain overlays for high 60fps rendering.</li>
          <li><strong>Keyboard Command Palette:</strong> Empowering power users to navigate pages, execute commands, and search content via <code>Ctrl + K</code>.</li>
        </ul>

        <blockquote>"A great web application doesn't just display information — it creates a feeling."</blockquote>
      `
    },
    {
      id: "building-autonomous-ai-agents",
      title: "Building Autonomous AI Tooling in 2026",
      date: "July 10, 2026",
      readTime: "8 min read",
      tags: ["AI", "Python", "LLMs", "FastAPI"],
      likes: 128,
      excerpt: "A practical breakdown of structuring deterministic AI agent loops with strict JSON schema verification, tool execution safety, and fallback handling.",
      content: `
        <h2>Beyond Simple Prompt Wrappers</h2>
        <p>Autonomous AI agents combine perception, tool selection, execution, and evaluation into closed loops capable of resolving complex tasks independently.</p>

        <h3>Core Agent Cycle</h3>
        <p>1. <strong>Intent Parsing:</strong> Deconstruct user instructions into structured goals.<br>
        2. <strong>Tool Inspection:</strong> Select function definitions registered with strict OpenAPI JSON schemas.<br>
        3. <strong>Execution & Validation:</strong> Safely execute function calls and evaluate return payloads.</p>
      `
    }
  ],

  socials: [
    { name: "GitHub", icon: "fa-brands fa-github", handle: "@samarthpatil", url: "https://github.com" },
    { name: "LinkedIn", icon: "fa-brands fa-linkedin", handle: "Samarth Patil", url: "https://linkedin.com" },
    { name: "X / Twitter", icon: "fa-brands fa-x-twitter", handle: "@samarthpatil", url: "https://x.com" },
    { name: "Discord", icon: "fa-brands fa-discord", handle: "samarth#1337", copyable: "samarth#1337" },
    { name: "Instagram", icon: "fa-brands fa-instagram", handle: "@samarth.patil", url: "https://instagram.com" },
    { name: "Direct Email", icon: "fa-solid fa-envelope", handle: "hello@samarthpatil.com", copyable: "hello@samarthpatil.com" }
  ],

  donateConfig: {
    buyMeACoffeeUrl: "https://buymeacoffee.com/samarthpatil",
    progressAmount: 240,
    goalAmount: 350,
    cryptoWallets: [
      {
        name: "Ethereum / EVM (ETH / USDT / USDC)",
        symbol: "ETH",
        icon: "fa-brands fa-ethereum",
        color: "#627eea",
        address: "0x71C7656EC7ab88b098defB751B7401B5f6d8976F"
      },
      {
        name: "Bitcoin (BTC)",
        symbol: "BTC",
        icon: "fa-brands fa-bitcoin",
        color: "#f7931a",
        address: "bc1qxy2kgdygjrsqtzq2n0yrf2493p83kkfjhx0wlh"
      },
      {
        name: "Solana (SOL)",
        symbol: "SOL",
        icon: "fa-solid fa-bolt",
        color: "#14f195",
        address: "7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU"
      }
    ]
  },

  supportersList: [
    { name: "Alex Rivers", tier: "VIP Champion", amount: "$50", date: "Jul 2026" },
    { name: "Dev Community Supporter", tier: "Core Sponsor", amount: "$15", date: "Jul 2026" },
    { name: "Elena Rostova", tier: "Coffee Backer", amount: "$5", date: "Jun 2026" }
  ],

  testimonials: [
    {
      quote: "Samarth transformed our web architecture, delivering lightning-fast load times and an exceptional futuristic UI that impressed our investors.",
      author: "Marcus Vance",
      role: "CTO at Nexus Tech"
    },
    {
      quote: "Attention to detail, clean modular code, and an instinct for great user experience. One of the sharpest engineers I've worked with.",
      author: "Sarah Lin",
      role: "Product Lead at Vanguard AI"
    }
  ],

  faqs: [
    {
      q: "Why support open-source work?",
      a: "Contributions directly fund server hosting costs, domain renewals, API credits, and enable the creation of free technical tutorials and developer utilities."
    },
    {
      q: "How can I hire or collaborate with Samarth?",
      a: "You can send a direct message via the Contact page or email hello@samarthpatil.com to discuss project requirements."
    }
  ]
};

const STORAGE_KEY = 'samarth_os_cyberpunk_v3_data';

export function getSiteData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      console.error('Local data parse error:', e);
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultData));
  return defaultData;
}

export function saveSiteData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}
