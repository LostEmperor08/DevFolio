"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock } from "lucide-react";

export default function AdminLogin() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    try {
      const res = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (res?.error) {
        setError("Invalid email or password");
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (err) {
      setError("An unexpected error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black p-4">
      {/* Background aesthetics */}
      <div className="bg-accent-blue/10 pointer-events-none absolute top-1/2 left-1/2 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-[120px]" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-panel relative z-10 w-full max-w-md rounded-3xl border border-white/10 p-8"
      >
        <div className="mb-8 flex flex-col items-center">
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5">
            <Lock className="text-accent-blue h-5 w-5" />
          </div>
          <h1 className="mb-2 text-2xl font-bold tracking-tight text-white">Samarth OS</h1>
          <p className="text-muted-foreground text-center text-sm">
            Enter your credentials to access the secure administrative dashboard.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="rounded-lg border border-red-500/20 bg-red-500/10 p-3 text-center text-sm text-red-400">
              {error}
            </div>
          )}

          <div className="space-y-2">
            <label className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
              Email
            </label>
            <input
              name="email"
              type="email"
              required
              className="focus:ring-accent-blue/50 placeholder:text-muted-foreground/50 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all focus:ring-2 focus:outline-none"
              placeholder="admin@samarth.dev"
            />
          </div>

          <div className="space-y-2">
            <label className="text-muted-foreground font-mono text-xs tracking-wider uppercase">
              Password
            </label>
            <input
              name="password"
              type="password"
              required
              className="focus:ring-accent-blue/50 placeholder:text-muted-foreground/50 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white transition-all focus:ring-2 focus:outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-6 flex w-full items-center justify-center gap-2 rounded-xl bg-white px-4 py-3 font-medium text-black transition-colors hover:bg-zinc-200 disabled:opacity-50"
          >
            {loading ? "Authenticating..." : "Access Dashboard"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
