"use client";

import { useEffect } from "react";
import Link from "next/link";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="px-4 md:px-0 py-24">
      <h1 className="font-semibold tracking-tight text-4xl mb-4 text-white">
        Something went wrong
      </h1>
      <p className="text-zinc-400 text-lg leading-normal mb-8">
        An unexpected error occurred. Please try again or return to the homepage.
      </p>
      <div className="flex items-center gap-4">
        <button
          onClick={() => reset()}
          className="group bg-zinc-900 hover:bg-zinc-800 border border-red-500/40 hover:border-red-500 transition-colors inline-block font-mono text-xs font-semibold rounded-full px-8 py-3 text-white"
        >
          Try Again
        </button>
        <Link
          href="/"
          className="text-zinc-400 hover:text-white transition-colors font-mono text-xs"
        >
          ← Return Home
        </Link>
      </div>
    </main>
  );
}
