import { notFound } from "next/navigation";

// Jobs page is disabled for now — route hidden and returns 404.
// The original implementation is preserved (commented) below for later re-enabling.
export default function JobsDashboardPage() {
  notFound();
}

/*
"use client";

import { useMemo, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Alert from "@/components/ui/Alert";
import Button from "@/components/ui/Button";
import StatsCards from "@/components/jobs/StatsCards";
import SyncStatusCard from "@/components/jobs/SyncStatusCard";
import JobFilters from "@/components/jobs/JobFilters";
import JobsList from "@/components/jobs/JobsList";
import JobSkeleton from "@/components/jobs/JobSkeleton";
import EmptyState from "@/components/jobs/EmptyState";
import Pagination from "@/components/jobs/Pagination";
import { useJobs } from "@/hooks/useJobs";
import { useSyncJobs } from "@/hooks/useSyncJobs";
import { useSyncStatus } from "@/hooks/useSyncStatus";

const LIMIT = 10;

export default function JobsDashboardPage() {
  const [search, setSearch] = useState("");
  const [portal, setPortal] = useState("");
  const [page, setPage] = useState(1);

  const { data, loading, error, refetch } = useJobs({ search, portal, page, limit: LIMIT });
  const { status, refresh: refreshStatus } = useSyncStatus();
  const { sync, syncing, error: syncError } = useSyncJobs(() => {
    refreshStatus();
    refetch();
  });

  const portalsCount = useMemo(() => {
    const set = new Set((data.items || []).map((j) => j.portalName).filter(Boolean));
    return set.size;
  }, [data.items]);

  const showEmpty = !loading && !error && data.items.length === 0;
  const isFiltering = Boolean(search || portal);

  function updateSearch(v) {
    setSearch(v);
    setPage(1);
  }
  function updatePortal(v) {
    setPortal(v);
    setPage(1);
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="space-y-1">
            <h1 className="text-2xl sm:text-3xl font-semibold text-[#0F172A]">
              Job Dashboard
            </h1>
            <p className="text-sm text-[#475569]">
              Jobs extracted automatically from your Gmail inbox.
            </p>
          </div>

          <StatsCards
            total={data.total}
            portalsCount={portalsCount}
            lastSync={status?.lastSyncedAt}
          />

          <SyncStatusCard
            status={status}
            syncing={syncing}
            onSync={sync}
            error={syncError}
          />

          <div className="space-y-3">
            <JobFilters
              search={search}
              onSearchChange={updateSearch}
              portal={portal}
              onPortalChange={updatePortal}
            />

            {error && (
              <Alert tone="error" title="Couldn't load jobs">
                {error}
              </Alert>
            )}

            {loading ? (
              <JobSkeleton count={4} />
            ) : showEmpty ? (
              <EmptyState
                title={isFiltering ? "No matching jobs" : "No jobs yet"}
                description={
                  isFiltering
                    ? "Try clearing filters or running a fresh sync."
                    : "Click Sync Jobs to extract roles from your Gmail inbox."
                }
                action={
                  isFiltering ? (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        setSearch("");
                        setPortal("");
                      }}
                    >
                      Clear filters
                    </Button>
                  ) : (
                    <Button onClick={sync} disabled={syncing}>
                      {syncing ? "Syncing…" : "Sync Jobs"}
                    </Button>
                  )
                }
              />
            ) : (
              <>
                <JobsList jobs={data.items} />
                <Pagination
                  page={data.page}
                  limit={data.limit}
                  total={data.total}
                  onPageChange={setPage}
                />
              </>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
*/
