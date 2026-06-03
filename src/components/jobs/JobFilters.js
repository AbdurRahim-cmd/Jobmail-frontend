"use client";

import { Input } from "../ui/Input";

const PORTALS = ["Naukri", "LinkedIn", "Indeed", "Glassdoor", "Cutshort", "AngelList"];

export default function JobFilters({ search, onSearchChange, portal, onPortalChange, portals = PORTALS }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[1fr_220px] gap-3">
      <Input
        id="job-search"
        placeholder="Search by role, company, or skill"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
      />
      <div className="space-y-1.5">
        <select
          value={portal}
          onChange={(e) => onPortalChange(e.target.value)}
          className="block w-full h-[42px] rounded-lg border border-[#E2E8F0] bg-white px-3 text-sm text-[#0F172A] transition-all focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10"
        >
          <option value="">All portals</option>
          {portals.map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>
    </div>
  );
}
