import Card from "../ui/Card";

function Stat({ label, value, hint }) {
  return (
    <Card padded={false} className="p-5">
      <p className="text-xs font-medium uppercase tracking-wide text-[#475569]">{label}</p>
      <p className="mt-2 text-2xl font-semibold text-[#0F172A]">{value}</p>
      {hint && <p className="mt-1 text-xs text-[#475569]">{hint}</p>}
    </Card>
  );
}

export default function StatsCards({ total = 0, portalsCount = 0, lastSync }) {
  const formatted = lastSync
    ? new Date(lastSync).toLocaleString(undefined, {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : "Never";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
      <Stat label="Total jobs" value={total} hint="Extracted from Gmail" />
      <Stat label="Portals" value={portalsCount} hint="Unique sources" />
      <Stat label="Last sync" value={formatted} hint="From Gmail inbox" />
    </div>
  );
}
