"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { loginAdmin } from "@/app/actions/admin.actions";
import { Loader2 } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!passcode.trim()) return;

    setLoading(true);
    setError("");

    try {
      const res = await loginAdmin(passcode);
      if (res.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(res.error || "Invalid passcode");
      }
    } catch {
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="px-4 md:px-0 py-12 max-w-sm mx-auto">
      <div className="mb-8">
        <Link
          href="/"
          className="text-xs font-mono text-zinc-500 hover:text-red-400 transition-colors"
        >
          ← Back to site
        </Link>
      </div>

      <header className="pb-6 border-b border-zinc-800 mb-8">
        <h1 className="font-semibold tracking-tight text-3xl text-white">
          Admin
        </h1>
        <p className="text-zinc-500 text-sm font-mono mt-1">
          Enter passcode to edit content and manage writings.
        </p>
      </header>

      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="text-xs font-mono text-red-400 border border-red-900/50 bg-red-950/20 p-3 rounded">
            {error}
          </div>
        )}

        <div>
          <label className="block font-mono text-xs text-zinc-400 mb-2">
            Passcode
          </label>
          <input
            type="password"
            value={passcode}
            onChange={(e) => setPasscode(e.target.value)}
            placeholder="Default: admin123"
            required
            autoFocus
            className="w-full rounded border border-zinc-800 bg-zinc-950 px-3.5 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:border-red-500 focus:outline-none transition-colors"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="group bg-zinc-900 hover:bg-zinc-800 border border-red-500/40 hover:border-red-500 transition-colors inline-flex items-center gap-2 font-mono text-xs font-semibold rounded-full px-6 py-2.5 text-white disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="h-3 w-3 animate-spin text-red-400" />
              <span>Verifying...</span>
            </>
          ) : (
            <>
              <span>Authenticate</span>
              <span className="text-red-400 group-hover:translate-x-1 transition-transform">
                →
              </span>
            </>
          )}
        </button>
      </form>
    </main>
  );
}
