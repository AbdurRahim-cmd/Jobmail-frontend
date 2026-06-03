"use client";

import { useEffect, useState } from "react";
import { fetchSyncStatus } from "@/services/jobsService";

export function useSyncStatus({ pollWhileRunning = true, intervalMs = 5000 } = {}) {
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();

    fetchSyncStatus({ signal: controller.signal })
      .then((res) => {
        if (!cancelled) setStatus(res);
      })
      .catch((err) => {
        if (!cancelled && !controller.signal.aborted) {
          setError(err?.response?.data?.message || err.message || "Status unavailable");
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });

    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [tick]);

  useEffect(() => {
    if (!pollWhileRunning) return;
    if (status?.status !== "running") return;
    const id = setInterval(() => setTick((t) => t + 1), intervalMs);
    return () => clearInterval(id);
  }, [status?.status, pollWhileRunning, intervalMs]);

  const refresh = () => setTick((t) => t + 1);

  return { status, loading, error, refresh };
}
