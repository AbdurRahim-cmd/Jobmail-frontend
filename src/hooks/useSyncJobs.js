"use client";

import { useState } from "react";
import { triggerSyncJobs } from "@/services/jobsService";

export function useSyncJobs(onSuccess) {
  const [syncing, setSyncing] = useState(false);
  const [error, setError] = useState(null);

  async function sync() {
    setSyncing(true);
    setError(null);
    try {
      const res = await triggerSyncJobs();
      onSuccess?.(res);
      return res;
    } catch (err) {
      setError(err?.response?.data?.message || err.message || "Sync failed");
    } finally {
      setSyncing(false);
    }
  }

  return { sync, syncing, error };
}
