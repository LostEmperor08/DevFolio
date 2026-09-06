export default function AdminLoading() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="flex items-center gap-2 font-mono text-xs text-zinc-500">
        <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
        <span>Loading workspace...</span>
      </div>
    </div>
  );
}
