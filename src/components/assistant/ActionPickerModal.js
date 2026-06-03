"use client";

import Modal from "../ui/Modal";
import { ACTIONS } from "@/lib/promptBuilder";

const ACCENTS = {
  indigo: "from-indigo-500/15 to-indigo-500/0 text-indigo-600 group-hover:ring-indigo-300/50",
  cyan: "from-cyan-500/15 to-cyan-500/0 text-cyan-600 group-hover:ring-cyan-300/50",
  violet: "from-violet-500/15 to-violet-500/0 text-violet-600 group-hover:ring-violet-300/50",
  emerald: "from-emerald-500/15 to-emerald-500/0 text-emerald-600 group-hover:ring-emerald-300/50",
  fuchsia: "from-fuchsia-500/15 to-fuchsia-500/0 text-fuchsia-600 group-hover:ring-fuchsia-300/50",
};

const ICONS = {
  email: <path d="M4 4h16v16H4z M4 4l8 8 8-8" />,
  hr: <><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 11h-6M19 8v6"/></>,
  contacts: <><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92z"/></>,
};

export default function ActionPickerModal({ open, onClose, onPick }) {
  return (
    <Modal
      open={open}
      onClose={onClose}
      size="lg"
      title="Pick a response style"
      subtitle="We'll build a recruiter-grade prompt and prepare it for ChatGPT."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {ACTIONS.map((a) => (
          <button
            key={a.id}
            type="button"
            onClick={() => onPick(a)}
            className="group relative flex w-full items-start gap-3 rounded-2xl border border-[#E2E8F0] bg-white p-4 text-left transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-slate-300 ring-1 ring-transparent hover:ring-2"
          >
            <div className={`grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br ${ACCENTS[a.accent] || ACCENTS.indigo}`}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {ICONS[a.id]}
              </svg>
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#0F172A]">{a.label}</p>
              <p className="mt-0.5 text-xs text-[#475569] leading-relaxed">{a.description}</p>
            </div>
            <svg className="size-4 shrink-0 text-slate-300 transition-all group-hover:translate-x-0.5 group-hover:text-[#2563EB]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M7 7h10v10"/>
            </svg>
          </button>
        ))}
      </div>
    </Modal>
  );
}
