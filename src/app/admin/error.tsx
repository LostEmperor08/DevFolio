"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center text-center px-4">
      <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-red-900/50 bg-red-950/20 text-red-400">
        <AlertTriangle className="h-5 w-5" />
      </div>
      <h2 className="mb-2 text-lg font-semibold text-white tracking-tight">
        Something went wrong
      </h2>
      <p className="text-zinc-400 text-xs max-w-sm mb-6 font-light">
        {error.message || "An error occurred while loading the admin workspace."}
      </p>
      <button
        onClick={() => reset()}
        className="inline-flex items-center gap-2 font-mono text-xs text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 px-4 py-2 rounded-xl transition-colors"
      >
        <RotateCcw className="h-3.5 w-3.5" />
        <span>Try again</span>
      </button>
    </div>
  );
}
