import Link from "next/link";
import Button from "../ui/Button";
import StatusBadge from "../ui/StatusBadge";

function formatDate(value) {
  if (!value) return "";
  try {
    return new Date(value).toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  } catch {
    return "";
  }
}

export default function JobCard({ job }) {
  const {
    _id,
    id,
    companyName,
    designation,
    location,
    salary,
    experience,
    skills = [],
    portalName,
    applyUrl,
    emailDate,
  } = job;

  const jobId = _id || id;
  const topSkills = skills.slice(0, 4);
  const extraSkills = skills.length - topSkills.length;

  return (
    <div className="rounded-2xl border border-[#E2E8F0] bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)] hover:shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)] transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-base font-semibold text-[#0F172A] truncate">
              {designation || "Untitled role"}
            </h3>
            {portalName && (
              <StatusBadge tone="info" dot={false}>
                {portalName}
              </StatusBadge>
            )}
          </div>

          <p className="mt-1 text-sm text-[#475569] truncate">
            {companyName || "General notification"}
            {location ? ` • ${location}` : ""}
          </p>

          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-[#475569]">
            {salary && <span><span className="font-medium text-[#0F172A]">Salary:</span> {salary}</span>}
            {experience && <span><span className="font-medium text-[#0F172A]">Exp:</span> {experience}</span>}
            {emailDate && <span><span className="font-medium text-[#0F172A]">Received:</span> {formatDate(emailDate)}</span>}
          </div>

          {topSkills.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-1.5">
              {topSkills.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-[#475569]"
                >
                  {s}
                </span>
              ))}
              {extraSkills > 0 && (
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-1 text-xs font-medium text-[#475569]">
                  +{extraSkills} more
                </span>
              )}
            </div>
          )}
        </div>

        <div className="flex sm:flex-col gap-2 shrink-0">
          {jobId && (
            <Link href={`/jobs/${jobId}`}>
              <Button size="sm" variant="secondary">View</Button>
            </Link>
          )}
          {applyUrl && (
            <a href={applyUrl} target="_blank" rel="noopener noreferrer">
              <Button size="sm">Apply</Button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
