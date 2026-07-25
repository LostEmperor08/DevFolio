# Samarth OS v1.0 🚀

Welcome to the source code for **Samarth OS**, a premium, high-performance portfolio and CMS designed for modern Frontend Architects. It's built with Next.js 15 (App Router), PostgreSQL, and a completely custom-built operational command center.

## 🌟 Features

- **Extreme Aesthetics**: Custom glassmorphism, smooth scroll (`lenis`), custom cursors, magnetic buttons, and micro-animations via Framer Motion.
- **Full Markdown CMS**: A bespoke `/admin` dashboard that lets you manage projects, write blogs, and update your resume without touching a single line of code.
- **Operational Command Center**: Built-in system health monitoring, audit logging, JSON backups, and native visitor analytics.
- **Vercel Blob Media**: Drag-and-drop image uploads directly to Vercel Blob.
- **Security First**: Middleware protection, Bcrypt password hashing, rate limiting, and strict Content Security Policies (CSP).
- **SEO Optimized**: Dynamic `sitemap.xml`, `robots.txt`, `feed.xml` (RSS), and automatic JSON-LD structured data.

## 🏗 Architecture

```mermaid
graph TD
    Client[Web Browser] --> |HTTPS| Vercel[Vercel Edge Network]
    Vercel --> NextJS[Next.js 15 App Router]

    subgraph Frontend
    NextJS --> Pages[Public Portfolio Pages]
    NextJS --> Admin[Admin Dashboard]
    end

    subgraph Backend
    Admin --> ServerActions[Server Actions]
    Pages --> ServerActions
    end

    subgraph Data Layer
    ServerActions --> Prisma[Prisma ORM]
    ServerActions --> VercelBlob[Vercel Blob Storage]
    Prisma --> PostgreSQL[(PostgreSQL)]
    end
```

## 🛠 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS + Custom CSS (`index.css`)
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Storage**: Vercel Blob
- **Animations**: Framer Motion
- **Form Handling**: React Hook Form + Zod
- **Authentication**: NextAuth.js (Auth.js v5)

## 💻 Local Development

1. **Clone the repository:**

   ```bash
   git clone https://github.com/samarth/portfolio.git
   cd portfolio
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Copy `.env.example` to `.env` and fill in the details.

   ```bash
   DATABASE_URL="postgres://user:password@localhost:5432/portfolio"
   AUTH_SECRET="generate_a_strong_secret"
   BLOB_READ_WRITE_TOKEN="vercel_blob_token"
   ```

4. **Initialize Database:**

   ```bash
   npx prisma db push
   npx tsx prisma/seed.ts
   ```

5. **Start the development server:**
   ```bash
   npm run dev
   ```

The portfolio will be available at `http://localhost:3000`. The admin dashboard is at `http://localhost:3000/admin/login`. Default credentials are created during the seed step.

## 🚀 Deployment

See the [DEPLOYMENT.md](./DEPLOYMENT.md) guide for comprehensive instructions on deploying to Vercel and connecting a production PostgreSQL instance.

## 🔮 Future Roadmap

- Additional CMS block types (video embeds, code playgrounds).
- Native dark/light mode toggle.
- Advanced visitor analytics charts inside the dashboard.
- Contact form automatic email forwarding (Resend API).

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.
