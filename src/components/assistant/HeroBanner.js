export default function HeroBanner() {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-[#E2E8F0] bg-white px-6 py-10 sm:px-10 sm:py-14">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-radial-soft"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gradient-to-br from-[#2563EB]/15 to-fuchsia-400/10 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-cyan-400/10 to-indigo-400/10 blur-3xl"
      />

      <div className="relative max-w-2xl">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#2563EB]/20 bg-[#2563EB]/5 px-2.5 py-0.5 text-[11px] font-medium text-[#2563EB]">
          <span className="size-1.5 rounded-full bg-[#2563EB] animate-glow-pulse" />
          AI Job Application Assistant
        </div>
        <h1 className="mt-4 text-3xl sm:text-4xl font-semibold tracking-tight text-[#0F172A]">
          Paste a Job Description.{" "}
          <span className="bg-gradient-to-r from-[#2563EB] via-indigo-500 to-fuchsia-500 bg-clip-text text-transparent">
            Get a recruiter-ready response instantly.
          </span>
        </h1>
        <p className="mt-3 text-sm sm:text-base text-[#475569] leading-relaxed">
          Drop in any JD, pick the response style — outreach email, HR message, ATS keywords, JD analysis —
          and we'll open ChatGPT with an optimized prompt already prepared. No copy-paste gymnastics.
        </p>
      </div>
    </section>
  );
}
