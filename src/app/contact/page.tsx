import type { Metadata } from "next";
import { getSiteData } from "@/lib/content";
import { PhysicsLanyard } from "@/components/contact/PhysicsLanyard";
import { HoldToDispatch } from "@/components/contact/HoldToDispatch";
import { Mail, ArrowUpRight, Radio } from "lucide-react";
import { GithubIcon, LinkedinIcon, XIcon, InstagramIcon } from "@/components/icons/SocialIcons";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact & Dispatch | Samarth Patil",
  description: "Interactive physics developer lanyard and instant transmission dispatch.",
};

export default async function ContactPage() {
  const { profile } = await getSiteData();

  const contacts = [
    {
      title: "Direct Email",
      handle: profile.email,
      href: `mailto:${profile.email}`,
      icon: Mail,
      sub: "Primary inbox for software engineering roles & partnerships",
    },
    {
      title: "LinkedIn",
      handle: "in/samarth-raghuram-patil",
      href: profile.linkedin || "https://in.linkedin.com/in/samarth-raghuram-patil-835596361",
      icon: LinkedinIcon,
      sub: "Professional network & verified credentials",
    },
    {
      title: "X (Twitter)",
      handle: "@lostemperor_08",
      href: profile.x || "https://x.com/lostemperor_08",
      icon: XIcon,
      sub: "Tech insights & architectural banter",
    },
    {
      title: "GitHub",
      handle: "git/LostEmperor08",
      href: profile.github || "https://github.com/LostEmperor08",
      icon: GithubIcon,
      sub: "Source repositories, algorithms & commits",
    },
  ];

  return (
    <main className="pb-20 space-y-10">
      <header className="border-b border-zinc-800/80 pb-6 space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-red-400">
          <Radio className="w-4 h-4 animate-pulse" />
          <span>Physics Lanyard & Instant Dispatch Stage</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight text-white">
          Initiate Contact & Transmission
        </h1>
        <p className="text-zinc-400 text-sm sm:text-base max-w-2xl leading-relaxed">
          Grab and flick the physics developer lanyard, or charge the Hold-to-Dispatch console to send your transmission directly.
        </p>
      </header>

      {/* Physics Lanyard & Hold-to-Dispatch Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Left: Physics Lanyard Pass */}
        <div className="lg:col-span-5 w-full">
          <PhysicsLanyard />
        </div>

        {/* Right: Hold to Dispatch Console */}
        <div className="lg:col-span-7 w-full">
          <HoldToDispatch
            email={profile.email}
            github={profile.github}
            linkedin={profile.linkedin}
            x={profile.x}
            instagram={profile.instagram}
          />
        </div>
      </section>

      {/* Direct Verified Connection Channels */}
      <section className="space-y-4 pt-4">
        <h2 className="text-xs font-mono uppercase tracking-wider text-zinc-400">
          Verified Direct Channels
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contacts.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.title}
                href={item.href}
                target={item.title === "Direct Email" ? undefined : "_blank"}
                rel={item.title === "Direct Email" ? undefined : "noopener noreferrer"}
                className="flex flex-col justify-between p-5 rounded-xl border border-zinc-800/80 bg-zinc-950/50 backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.04)] hover:border-red-500/40 hover:bg-zinc-900/40 transition-all duration-300 group"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <span className="p-2.5 rounded-lg bg-zinc-900 border border-zinc-800 text-red-400 group-hover:scale-110 transition-transform">
                      <Icon className="w-4 h-4" />
                    </span>
                    <div>
                      <h3 className="font-semibold text-white text-base group-hover:text-red-400 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-zinc-400 font-mono text-xs mt-0.5">
                        {item.handle}
                      </p>
                    </div>
                  </div>
                  <ArrowUpRight className="w-4 h-4 text-zinc-600 group-hover:text-red-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                </div>
                <p className="text-zinc-400 text-xs mt-4 pt-3 border-t border-zinc-800/60">
                  {item.sub}
                </p>
              </a>
            );
          })}
        </div>
      </section>
    </main>
  );
}
