export default function AdminLoading() {
  return (
    <div className="animate-pulse space-y-6">
      <div className="mb-8 h-10 w-48 rounded-xl bg-white/5" />

      <div className="h-32 rounded-3xl border border-white/5 bg-white/5 p-6" />

      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <div className="h-32 rounded-3xl bg-white/5 p-6" />
        <div className="h-32 rounded-3xl bg-white/5 p-6" />
        <div className="h-32 rounded-3xl bg-white/5 p-6" />
        <div className="h-32 rounded-3xl bg-white/5 p-6" />
        <div className="h-32 rounded-3xl bg-white/5 p-6" />
        <div className="h-32 rounded-3xl bg-white/5 p-6" />
      </div>
    </div>
  );
}
