"use client";

import { useCallback, useEffect, useState } from "react";
import { fetchJobs } from "@/services/jobsService";

export function useJobs({ search, portal, page, limit }) {
  const [data, setData] = useState({ items: [], total: 0, page: 1, limit: 10 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  const refetch = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchJobs({ search, portal, page, limit, signal: controller.signal })
      .then((res) => {
        setData({
          items: res.items || [],
          total: res.total ?? 0,
          page: res.page ?? page,
          limit: res.limit ?? limit,
        });
      })
      .catch((err) => {
        if (controller.signal.aborted) return;
        setError(err?.response?.data?.message || err.message || "Failed to load jobs");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [search, portal, page, limit, reloadKey]);

  return { data, loading, error, refetch };
}
