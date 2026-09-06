import type { Metadata } from "next";
import { getSiteData } from "@/lib/content";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact | Samarth Patil",
  description: "Get in touch with Samarth Patil.",
};

export default async function ContactPage() {
  const { profile } = await getSiteData();

  return (
    <main className="px-4 md:px-0 pb-16">
      <header>
        <h1 className="font-semibold tracking-tight text-4xl mb-6 text-white pb-6 border-b border-zinc-800">
          Contact
        </h1>
      </header>
      <section className="pb-8">
        <p className="text-lg mb-8 text-zinc-300 leading-normal">
          If you’d like to get in touch, you can reach me using the following methods.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="flex flex-col">
            <h2 className="font-semibold text-xl tracking-tight text-white">Email</h2>
            <a
              className="text-zinc-400 hover:text-red-400 transition-colors mt-1 font-mono text-sm"
              href={`mailto:${profile.email}`}
            >
              {profile.email}
            </a>
          </div>

          <div className="flex flex-col">
            <h2 className="font-semibold text-xl tracking-tight text-white">LinkedIn</h2>
            <a
              className="text-zinc-400 hover:text-red-400 transition-colors mt-1 font-mono text-sm"
              href={profile.linkedin || "https://in.linkedin.com/in/samarth-raghuram-patil-835596361"}
              target="_blank"
              rel="noopener noreferrer"
            >
              in/samarth-raghuram-patil
            </a>
          </div>

          <div className="flex flex-col">
            <h2 className="font-semibold text-xl tracking-tight text-white">X (Twitter)</h2>
            <a
              className="text-zinc-400 hover:text-red-400 transition-colors mt-1 font-mono text-sm"
              href={profile.x || "https://x.com/lostemperor_08"}
              target="_blank"
              rel="noopener noreferrer"
            >
              @lostemperor_08
            </a>
          </div>

          <div className="flex flex-col">
            <h2 className="font-semibold text-xl tracking-tight text-white">Instagram</h2>
            <a
              className="text-zinc-400 hover:text-red-400 transition-colors mt-1 font-mono text-sm"
              href={profile.instagram || "https://instagram.com/lostemperor_08"}
              target="_blank"
              rel="noopener noreferrer"
            >
              @lostemperor_08
            </a>
          </div>

          <div className="flex flex-col">
            <h2 className="font-semibold text-xl tracking-tight text-white">GitHub</h2>
            <a
              className="text-zinc-400 hover:text-red-400 transition-colors mt-1 font-mono text-sm"
              href={profile.github || "https://github.com/LostEmperor08"}
              target="_blank"
              rel="noopener noreferrer"
            >
              git/LostEmperor08
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
