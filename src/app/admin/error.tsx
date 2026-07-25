"use client";

import { AlertTriangle } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center">
      <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-red-500/20 bg-red-500/10 text-red-400">
        <AlertTriangle className="h-8 w-8" />
      </div>
      <h2 className="mb-2 text-2xl font-bold text-white">Something went wrong!</h2>
      <p className="text-muted-foreground mx-auto mb-8 max-w-md">
        We encountered a problem while processing your request. Please check your database
        connection or try again.
      </p>
      <button
        onClick={() => reset()}
        className="rounded-xl bg-white px-6 py-3 font-medium text-black transition-colors hover:bg-zinc-200"
      >
        Try again
      </button>
    </div>
  );
}
