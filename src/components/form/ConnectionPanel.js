"use client";

import GoogleButton from "../ui/GoogleButton";
import Button from "../ui/Button";
import StatusBadge from "../ui/StatusBadge";

export default function ConnectionPanel({
  connected,
  authEmail,
  onConnect,
  onDisconnect,
}) {
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-5">
      <div className="flex items-start justify-between gap-4 mb-4">
        <div>
          <p className="text-sm font-medium text-[#0F172A]">Google Connection</p>
          <p className="text-xs text-[#475569] mt-0.5">
            Required to send emails from your Gmail.
          </p>
        </div>
        {connected ? (
          <StatusBadge tone="success">Connected</StatusBadge>
        ) : (
          <StatusBadge tone="warning">Not Connected</StatusBadge>
        )}
      </div>

      {connected ? (
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 rounded-lg border border-[#E2E8F0] bg-white px-4 py-3">
          <div className="min-w-0">
            <p className="text-xs text-[#475569]">Signed In As</p>
            <p className="text-sm font-medium text-[#0F172A] truncate">
              {authEmail || "Google Account"}
            </p>
          </div>
          <Button variant="secondary" size="sm" onClick={onDisconnect}>
            Disconnect
          </Button>
        </div>
      ) : (
        <GoogleButton label="Connect Google" onClick={onConnect} />
      )}
    </div>
  );
}
