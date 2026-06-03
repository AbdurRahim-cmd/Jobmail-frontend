export default function JobSkeleton({ count = 4 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: count }).map((_, i) => (
        <div
          key={i}
          className="rounded-2xl border border-[#E2E8F0] bg-white p-5 animate-pulse"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 space-y-3">
              <div className="h-4 w-2/3 rounded bg-slate-200" />
              <div className="h-3 w-1/3 rounded bg-slate-200" />
              <div className="flex gap-2 pt-1">
                <div className="h-5 w-16 rounded-full bg-slate-200" />
                <div className="h-5 w-20 rounded-full bg-slate-200" />
                <div className="h-5 w-14 rounded-full bg-slate-200" />
              </div>
            </div>
            <div className="h-9 w-24 rounded-lg bg-slate-200" />
          </div>
        </div>
      ))}
    </div>
  );
}
