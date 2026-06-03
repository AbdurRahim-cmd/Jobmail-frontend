"use client";

import Link from "next/link";
import { use } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Card from "@/components/ui/Card";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import StatusBadge from "@/components/ui/StatusBadge";
import JobSkeleton from "@/components/jobs/JobSkeleton";
import { useJob } from "@/hooks/useJob";

function Detail({ label, value }) {
  if (!value) return null;
  return (
    <div>
      <p className="text-xs font-medium uppercase tracking-wide text-[#475569]">{label}</p>
      <p className="mt-1 text-sm text-[#0F172A]">{value}</p>
    </div>
  );
}

export default function JobDetailsPage({ params }) {
  const { id } = use(params);
  const { job, loading, error } = useJob(id);

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      <main className="flex-1 py-10 sm:py-14">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <Link
            href="/jobs"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-[#475569] hover:text-[#0F172A] transition-colors"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
            </svg>
            Back to jobs
          </Link>

          {loading && <JobSkeleton count={1} />}

          {error && (
            <Alert tone="error" title="Couldn't load this job">
              {error}
            </Alert>
          )}

          {!loading && !error && job && (
            <Card>
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h1 className="text-xl sm:text-2xl font-semibold text-[#0F172A]">
                      {job.designation || "Untitled role"}
                    </h1>
                    {job.portalName && (
                      <StatusBadge tone="info" dot={false}>
                        {job.portalName}
                      </StatusBadge>
                    )}
                  </div>
                  <p className="text-sm text-[#475569]">
                    {job.companyName || "General notification"}
                    {job.location ? ` • ${job.location}` : ""}
                  </p>
                </div>

                {job.applyUrl && (
                  <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                    <Button>Apply</Button>
                  </a>
                )}
              </div>

              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Detail label="Salary" value={job.salary} />
                <Detail label="Experience" value={job.experience} />
                <Detail label="Location" value={job.location} />
                <Detail
                  label="Email received"
                  value={
                    job.emailDate
                      ? new Date(job.emailDate).toLocaleString()
                      : null
                  }
                />
              </div>

              {Array.isArray(job.skills) && job.skills.length > 0 && (
                <div className="mt-6">
                  <p className="text-xs font-medium uppercase tracking-wide text-[#475569] mb-2">
                    Skills
                  </p>
                  <div className="flex flex-wrap gap-1.5">
                    {job.skills.map((s) => (
                      <span
                        key={s}
                        className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-[#475569]"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </Card>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
