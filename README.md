# Samarth Patil — Portfolio ⚡

A high-performance, minimalist developer portfolio and micro-CMS built with Next.js 16, TypeScript, and Tailwind CSS v4.

## 🌟 Overview

- **Design Philosophy**: Minimalist dark editorial aesthetic with deep black backgrounds (`#050505`), clean typography, crimson accents, and custom monochrome sakura insignia.
- **Micro-CMS**: Lightweight single-file JSON content layer (`src/data/site-content.json`) with an integrated admin management interface at `/admin`.
- **Fast & Static**: Zero heavy database or ORM overhead. Ultra-fast page generation and edge deployment on Vercel.
- **Clean SEO & Standards**: Dynamic metadata, OpenGraph, JSON-LD structured data, RSS feed (`/feed.xml`), `sitemap.xml`, and `robots.txt`.

## 🛠 Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + `@tailwindcss/postcss`
- **Icons**: Lucide React
- **Notifications**: Sonner

## 💻 Local Development

1. **Clone the repository:**
   ```bash
   git clone https://github.com/LostEmperor08/DevFolio.git
   cd DevFolio
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Run the local development server:**
   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view your portfolio.

## 📂 Project Structure

```text
├── public/                 # Static assets, sakura insignia, and icons
├── src/
│   ├── app/                # Next.js App Router (pages, metadata, feeds)
│   ├── components/         # Shared minimalist UI & layout components
│   ├── config/             # Profile configuration & social links
│   ├── data/               # Unified content store (site-content.json)
│   └── lib/                # Utility helpers & JSON content management
└── README.md
```

## 📄 License

MIT License — see LICENSE for details.

