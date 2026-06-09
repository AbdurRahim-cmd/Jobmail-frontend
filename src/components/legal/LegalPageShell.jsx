"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";

/**
 * Shared scaffold for long-form legal documents (Privacy Policy, Terms).
 * Renders a hero, a sticky table of contents with scroll-spy, and the
 * numbered sections. Each section is `{ id, title, content }` where
 * `content` is JSX.
 */
export default function LegalPageShell({
  kicker,
  title,
  intro,
  lastUpdated,
  summary = [],
  sections = [],
}) {
  const [activeId, setActiveId] = useState(sections[0]?.id);

  useEffect(() => {
    const els = sections
      .map((s) => document.getElementById(s.id))
      .filter(Boolean);
    if (!els.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      { rootMargin: "-96px 0px -65% 0px", threshold: 0 }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const handleJump = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setActiveId(id);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-radial-soft border-b border-[#E2E8F0]">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
            <p className="text-xs font-semibold uppercase tracking-wider text-[#2563EB]">
              {kicker}
            </p>
            <h1 className="mt-2 text-3xl sm:text-4xl font-bold tracking-tight text-[#0F172A]">
              {title}
            </h1>
            {intro && (
              <p className="mt-4 max-w-3xl text-[15px] leading-7 text-[#475569]">
                {intro}
              </p>
            )}
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-medium text-[#475569]">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
              Last updated: {lastUpdated}
            </div>
          </div>
        </section>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
          <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-8 lg:gap-12">
            {/* Table of contents */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <p className="px-3 text-[11px] font-semibold uppercase tracking-wider text-[#94A3B8]">
                On this page
              </p>
              <nav className="mt-2 space-y-0.5">
                {sections.map((s, i) => (
                  <a
                    key={s.id}
                    href={`#${s.id}`}
                    onClick={(e) => handleJump(e, s.id)}
                    className={[
                      "block rounded-lg px-3 py-1.5 text-sm transition-colors",
                      activeId === s.id
                        ? "bg-[#2563EB]/10 font-semibold text-[#2563EB]"
                        : "text-[#475569] hover:bg-slate-100 hover:text-[#0F172A]",
                    ].join(" ")}
                  >
                    <span className="tabular-nums text-[#94A3B8] mr-1.5">{i + 1}.</span>
                    {s.title}
                  </a>
                ))}
              </nav>
            </aside>

            {/* Content */}
            <article className="min-w-0">
              {summary.length > 0 && (
                <div className="mb-10 rounded-2xl border border-[#2563EB]/15 bg-[#2563EB]/[0.04] p-5 sm:p-6">
                  <h2 className="text-sm font-semibold text-[#0F172A]">
                    Summary of our commitments
                  </h2>
                  <ul className="mt-3 space-y-2">
                    {summary.map((item, i) => (
                      <li key={i} className="flex items-start gap-2.5 text-sm leading-6 text-[#334155]">
                        <svg className="mt-0.5 size-4 shrink-0 text-[#2563EB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5"/></svg>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="space-y-12">
                {sections.map((s, i) => (
                  <section key={s.id} id={s.id} className="scroll-mt-24">
                    <h2 className="flex items-baseline gap-3 text-xl font-semibold tracking-tight text-[#0F172A]">
                      <span className="text-base font-bold text-[#2563EB] tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      {s.title}
                    </h2>
                    <div
                      className="mt-4 space-y-4 text-[15px] leading-7 text-[#334155]
                        [&_h3]:mt-6 [&_h3]:mb-1 [&_h3]:text-base [&_h3]:font-semibold [&_h3]:text-[#0F172A]
                        [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1.5
                        [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-1.5
                        [&_li]:marker:text-[#2563EB]
                        [&_strong]:font-semibold [&_strong]:text-[#0F172A]
                        [&_code]:rounded [&_code]:bg-slate-100 [&_code]:px-1.5 [&_code]:py-0.5 [&_code]:font-mono [&_code]:text-[13px] [&_code]:text-[#0F172A]
                        [&_a]:text-[#2563EB] [&_a]:underline [&_a]:underline-offset-2 hover:[&_a]:text-[#1D4ED8]"
                    >
                      {s.content}
                    </div>
                  </section>
                ))}
              </div>

              <div className="mt-14 rounded-2xl border border-[#E2E8F0] bg-white p-5 text-sm text-[#475569]">
                Questions about this document? Email us at{" "}
                <a href="mailto:ar878822@gmail.com" className="font-medium text-[#2563EB] underline underline-offset-2">
                  ar878822@gmail.com
                </a>
                .
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

/** Small data table used for OAuth scopes. */
export function ScopeTable({ rows }) {
  return (
    <div className="my-5 overflow-x-auto rounded-xl border border-[#E2E8F0]">
      <table className="w-full text-left text-sm">
        <thead className="bg-slate-50 text-[#475569]">
          <tr>
            <th className="px-4 py-3 font-semibold">OAuth Scope</th>
            <th className="px-4 py-3 font-semibold">What it allows</th>
            <th className="px-4 py-3 font-semibold">Why we request it</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#E2E8F0]">
          {rows.map((r) => (
            <tr key={r.scope} className="align-top">
              <td className="px-4 py-3 font-mono text-[13px] text-[#0F172A] whitespace-nowrap">
                {r.scope}
              </td>
              <td className="px-4 py-3 text-[#334155]">{r.allows}</td>
              <td className="px-4 py-3 text-[#334155]">{r.why}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
