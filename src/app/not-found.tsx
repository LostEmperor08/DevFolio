import Link from "next/link";

export default function NotFound() {
  return (
    <main className="px-4 md:px-0 py-24">
      <h1 className="font-semibold tracking-tight text-4xl mb-4 text-white">
        404 — Page Not Found
      </h1>
      <p className="text-zinc-400 text-lg leading-normal mb-8">
        The page you are looking for doesn’t exist or has been moved.
      </p>
      <Link
        href="/"
        className="group bg-zinc-900 hover:bg-zinc-800 border border-red-500/40 hover:border-red-500 transition-colors inline-block font-mono text-xs font-semibold rounded-full px-8 py-3 text-white"
      >
        Return Home{" "}
        <span className="inline-block group-hover:translate-x-2 transition-transform text-red-400">
          →
        </span>
      </Link>
    </main>
  );
}
