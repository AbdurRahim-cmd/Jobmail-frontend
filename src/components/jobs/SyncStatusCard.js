"use client";

import Card from "../ui/Card";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import StatusBadge from "../ui/StatusBadge";

const TONE_BY_STATUS = {
  idle: "neutral",
  running: "info",
  success: "success",
  error: "warning",
};

const LABEL_BY_STATUS = {
  idle: "Idle",
  running: "Syncing",
  success: "Up to date",
  error: "Failed",
};

export default function SyncStatusCard({ status, syncing, onSync, error }) {
  const state = syncing ? "running" : status?.status || "idle";
  const tone = TONE_BY_STATUS[state] || "neutral";
  const label = LABEL_BY_STATUS[state] || "Idle";

  const lastSyncedAt = status?.lastSyncedAt
    ? new Date(status.lastSyncedAt).toLocaleString()
    : "Never";

  return (
    <Card padded={false} className="p-5">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <h3 className="text-base font-semibold text-[#0F172A]">Gmail sync</h3>
            <StatusBadge tone={tone}>{label}</StatusBadge>
          </div>
          <p className="text-sm text-[#475569]">
            Last synced: <span className="text-[#0F172A] font-medium">{lastSyncedAt}</span>
            {typeof status?.count === "number" && (
              <> • {status.count} jobs extracted</>
            )}
          </p>
          {error && <p className="text-xs font-medium text-[#B91C1C]">{error}</p>}
        </div>

        <Button onClick={onSync} disabled={syncing}>
          {syncing ? (
            <>
              <Spinner size={16} />
              Syncing…
            </>
          ) : (
            "Sync Jobs"
          )}
        </Button>
      </div>
    </Card>
  );
}
