"use client";

const FIELDS = [
  {
    key: "name",
    label: "Your name",
    placeholder: "e.g. Priya Sharma",
    type: "input",
  },
  {
    key: "qualification",
    label: "Qualification",
    placeholder: "e.g. B.Tech in Computer Science",
    type: "input",
  },
  {
    key: "experience",
    label: "Experience",
    placeholder: "e.g. 4 years as a full-stack engineer (React, Node.js, PostgreSQL)",
    type: "textarea",
  },
];

export default function ProfileInputCard({ profile, onChange }) {
  const update = (key, value) => onChange({ ...profile, [key]: value });

  return (
    <div className="rounded-3xl border border-[#E2E8F0] bg-white/80 backdrop-blur-sm shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_-30px_rgba(15,23,42,0.18)]">
      <div className="flex items-center gap-2 border-b border-[#E2E8F0] px-5 py-3">
        <div className="grid size-7 place-items-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </div>
        <div>
          <h2 className="text-sm font-semibold text-[#0F172A]">Your profile</h2>
          <p className="text-[11px] text-[#475569]">We tailor every prompt to your name, qualification & experience.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 px-5 py-4">
        {FIELDS.map((f) => (
          <div key={f.key} className={f.type === "textarea" ? "sm:col-span-2" : ""}>
            <label htmlFor={`profile-${f.key}`} className="mb-1 block text-xs font-medium text-[#475569]">
              {f.label} <span className="text-[#B91C1C]">*</span>
            </label>
            {f.type === "textarea" ? (
              <textarea
                id={`profile-${f.key}`}
                value={profile[f.key] || ""}
                onChange={(e) => update(f.key, e.target.value)}
                placeholder={f.placeholder}
                rows={3}
                className="block w-full resize-none rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
              />
            ) : (
              <input
                id={`profile-${f.key}`}
                type="text"
                value={profile[f.key] || ""}
                onChange={(e) => update(f.key, e.target.value)}
                placeholder={f.placeholder}
                className="block w-full rounded-xl border border-[#E2E8F0] bg-white px-3 py-2 text-sm text-[#0F172A] placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-2 focus:ring-[#2563EB]/15"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
