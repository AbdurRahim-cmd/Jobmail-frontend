"use client";

import { useEffect, useState } from "react";
import { fetchJobById } from "@/services/jobsService";

export function useJob(id) {
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;
    const controller = new AbortController();
    setLoading(true);
    setError(null);

    fetchJobById(id, { signal: controller.signal })
      .then((res) => setJob(res))
      .catch((err) => {
        if (controller.signal.aborted) return;
        setError(err?.response?.data?.message || err.message || "Failed to load job");
      })
      .finally(() => {
        if (!controller.signal.aborted) setLoading(false);
      });

    return () => controller.abort();
  }, [id]);

  return { job, loading, error };
}
