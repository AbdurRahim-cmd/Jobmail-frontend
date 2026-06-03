"use client";

import { useEffect, useRef, useState } from "react";
import Button from "../ui/Button";
import { SAMPLE_JD } from "@/lib/promptBuilder";

const MIN_HEIGHT = 220;
const MAX_HEIGHT = 520;

function autoResize(el) {
  if (!el) return;
  el.style.height = "auto";
  el.style.height = `${Math.max(MIN_HEIGHT, Math.min(el.scrollHeight, MAX_HEIGHT))}px`;
}

export default function JdInputCard({ value, onChange }) {
  const ref = useRef(null);
  const [flash, setFlash] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  useEffect(() => {
    autoResize(ref.current);
  }, [value]);

  const handlePaste = () => {
    setFlash(true);
    setTimeout(() => setFlash(false), 900);
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    setDragOver(false);
    const text = e.dataTransfer.getData("text");
    if (text) {
      onChange(text);
      handlePaste();
      return;
    }
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith("text")) {
      const reader = new FileReader();
      reader.onload = () => {
        onChange(String(reader.result || ""));
        handlePaste();
      };
      reader.readAsText(file);
    }
  };

  const chars = value.length;
  const words = value.trim() ? value.trim().split(/\s+/).length : 0;

  return (
    <div
      className={[
        "group relative rounded-3xl border bg-white/80 backdrop-blur-sm transition-all",
        dragOver
          ? "border-[#2563EB] ring-4 ring-[#2563EB]/15"
          : "border-[#E2E8F0] hover:border-slate-300",
        "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_18px_40px_-30px_rgba(15,23,42,0.18)]",
      ].join(" ")}
      onDragOver={(e) => {
        e.preventDefault();
        setDragOver(true);
      }}
      onDragLeave={() => setDragOver(false)}
      onDrop={handleDrop}
    >
      <div className="flex items-center justify-between gap-3 border-b border-[#E2E8F0] px-5 py-3">
        <div className="flex items-center gap-2">
          <div className="grid size-7 place-items-center rounded-lg bg-[#2563EB]/10 text-[#2563EB]">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13h6M9 17h6"/></svg>
          </div>
          <div>
            <h2 className="text-sm font-semibold text-[#0F172A]">Job description</h2>
            <p className="text-[11px] text-[#475569]">Paste, drop, or type — any format works.</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => onChange(SAMPLE_JD)}
            className="rounded-md px-2.5 py-1 text-xs font-medium text-[#475569] hover:bg-slate-100 hover:text-[#0F172A] transition-colors"
          >
            Try sample JD
          </button>
          {value && (
            <button
              type="button"
              onClick={() => onChange("")}
              className="rounded-md px-2.5 py-1 text-xs font-medium text-[#475569] hover:bg-slate-100 hover:text-[#B91C1C] transition-colors"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      <div className={["relative", flash && "animate-paste-flash"].filter(Boolean).join(" ")}>
        <textarea
          ref={ref}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onPaste={handlePaste}
          placeholder={`Paste the full job description here…\n\nExample:\nSenior Full-Stack Engineer at a Series B fintech. React + Node + PostgreSQL. Remote, US/EU timezones…`}
          className="block w-full resize-none bg-transparent px-5 py-4 text-sm leading-relaxed text-[#0F172A] placeholder:text-slate-400 focus:outline-none"
          style={{ minHeight: MIN_HEIGHT }}
        />
        {dragOver && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-b-3xl bg-[#2563EB]/5 text-sm font-medium text-[#2563EB]">
            Drop your JD here
          </div>
        )}
      </div>

      <div className="flex items-center justify-between gap-3 border-t border-[#E2E8F0] px-5 py-2.5 text-[11px] text-[#475569]">
        <span>
          <span className="font-medium text-[#0F172A] tabular-nums">{words}</span> words ·{" "}
          <span className="font-medium text-[#0F172A] tabular-nums">{chars}</span> chars
        </span>
        <span className="hidden sm:inline">⌘V to paste · drag & drop supported</span>
      </div>
    </div>
  );
}
