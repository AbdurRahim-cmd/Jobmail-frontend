"use client";

import { clearHistory, removeHistoryEntry } from "@/lib/jdHistory";
import { summarizeJd } from "@/lib/promptBuilder";

function relativeTime(ts) {
  const diff = Date.now() - ts;
  const m = Math.round(diff / 60000);
  if (m < 1) return "just now";
  if (m < 60) return `${m}m`;
  const h = Math.round(m / 60);
  if (h < 24) return `${h}h`;
  const d = Math.round(h / 24);
  if (d < 7) return `${d}d`;
  return new Date(ts).toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

export default function HistorySidebar({ items, onReopen }) {
  return (
    <aside className="rounded-2xl border border-[#E2E8F0] bg-white">
      <div className="flex items-center justify-between gap-3 border-b border-[#E2E8F0] px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="grid size-7 place-items-center rounded-lg bg-slate-100 text-slate-600">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
          </div>
          <h3 className="text-sm font-semibold text-[#0F172A]">Recent JDs</h3>
        </div>
        {items.length > 0 && (
          <button
            type="button"
            onClick={clearHistory}
            className="text-[11px] font-medium text-[#475569] hover:text-[#B91C1C] transition-colors"
          >
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="px-4 py-8 text-center">
          <p className="text-xs text-[#475569]">
            Your last 20 analyzed JDs land here. Stays on this device only.
          </p>
        </div>
      ) : (
        <ul className="divide-y divide-[#E2E8F0] max-h-[520px] overflow-y-auto">
          {items.map((item) => (
            <li key={item.id} className="group relative">
              <button
                type="button"
                onClick={() => onReopen(item)}
                className="block w-full px-4 py-3 text-left transition-colors hover:bg-slate-50"
              >
                <p className="text-xs font-medium text-[#0F172A] truncate pr-6">
                  {item.company || summarizeJd(item.jd)}
                </p>
                <p className="mt-0.5 flex items-center gap-2 text-[11px] text-[#475569]">
                  <span className="rounded-full bg-slate-100 px-1.5 py-0.5 text-[10px] font-medium text-[#0F172A]">
                    {item.label}
                  </span>
                  <span>{relativeTime(item.createdAt)}</span>
                </p>
              </button>
              <button
                type="button"
                onClick={() => removeHistoryEntry(item.id)}
                aria-label="Remove from history"
                className="absolute right-2 top-2.5 rounded p-1 text-slate-400 opacity-0 transition-all hover:bg-slate-200 hover:text-slate-700 group-hover:opacity-100"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            </li>
          ))}
        </ul>
      )}
    </aside>
  );
}
