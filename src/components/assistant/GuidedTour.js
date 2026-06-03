"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";

const PAD = 8;
const GAP = 14;
const TOOLTIP_W = 320;

export default function GuidedTour({ steps, open, onClose }) {
  const [index, setIndex] = useState(0);
  const [rect, setRect] = useState(null);
  const [tipH, setTipH] = useState(190);
  const [viewport, setViewport] = useState({ w: 1024, h: 768 });
  const tipRef = useRef(null);

  const step = steps[index];

  const measure = useCallback(() => {
    setViewport({ w: window.innerWidth, h: window.innerHeight });
    const el = step?.ref?.current;
    if (!el) {
      setRect(null);
      return;
    }
    const r = el.getBoundingClientRect();
    setRect({ top: r.top, left: r.left, width: r.width, height: r.height });
  }, [step]);

  // Reset to the first step every time the tour is opened.
  useEffect(() => {
    if (open) setIndex(0);
  }, [open]);

  // Scroll the target into view, then measure (and keep measuring while it scrolls).
  useLayoutEffect(() => {
    if (!open) return;
    const el = step?.ref?.current;
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
    measure();
    const t = setTimeout(measure, 350);
    return () => clearTimeout(t);
  }, [open, index, measure, step]);

  // Keep the spotlight aligned on scroll / resize.
  useEffect(() => {
    if (!open) return;
    const handler = () => measure();
    window.addEventListener("resize", handler);
    window.addEventListener("scroll", handler, true);
    return () => {
      window.removeEventListener("resize", handler);
      window.removeEventListener("scroll", handler, true);
    };
  }, [open, measure]);

  // Track the tooltip's real height so we can place it above/below accurately.
  useLayoutEffect(() => {
    if (tipRef.current) setTipH(tipRef.current.offsetHeight);
  }, [index, rect, open]);

  // Keyboard navigation.
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") onClose?.();
      else if (e.key === "ArrowRight") next();
      else if (e.key === "ArrowLeft") back();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, index]);

  if (!open || !step) return null;

  const isLast = index === steps.length - 1;
  const isFirst = index === 0;

  const next = () => (isLast ? onClose?.() : setIndex((i) => i + 1));
  const back = () => !isFirst && setIndex((i) => i - 1);

  const box = rect
    ? {
        top: rect.top - PAD,
        left: rect.left - PAD,
        width: rect.width + PAD * 2,
        height: rect.height + PAD * 2,
      }
    : null;

  // Tooltip placement.
  let tipStyle;
  if (box) {
    const below = box.top + box.height + GAP;
    const placeBelow = below + tipH < viewport.h;
    const top = placeBelow ? below : box.top - GAP - tipH;
    let left = box.left + box.width / 2 - TOOLTIP_W / 2;
    left = Math.max(16, Math.min(left, viewport.w - TOOLTIP_W - 16));
    tipStyle = { top: Math.max(16, top), left, width: TOOLTIP_W };
  } else {
    // Centered (welcome / no target) step.
    tipStyle = {
      top: viewport.h / 2 - tipH / 2,
      left: viewport.w / 2 - TOOLTIP_W / 2,
      width: TOOLTIP_W,
    };
  }

  return (
    <div className="fixed inset-0 z-[100]" aria-live="polite">
      {/* Click-catcher: dims the screen when there's no spotlight box. */}
      <div
        className="absolute inset-0"
        style={{ background: box ? "transparent" : "rgba(15,23,42,0.55)" }}
        onClick={(e) => e.stopPropagation()}
      />

      {/* Spotlight box — the box-shadow spread dims everything around it. */}
      {box && (
        <div
          className="absolute rounded-2xl animate-tour-ring pointer-events-none"
          style={{
            top: box.top,
            left: box.left,
            width: box.width,
            height: box.height,
            transition: "all 300ms cubic-bezier(0.16, 1, 0.3, 1)",
          }}
        />
      )}

      {/* Tooltip */}
      <div
        ref={tipRef}
        className="absolute animate-tour-pop rounded-2xl border border-white/10 bg-white p-4 shadow-2xl"
        style={{ ...tipStyle, transition: "top 300ms cubic-bezier(0.16,1,0.3,1), left 300ms cubic-bezier(0.16,1,0.3,1)" }}
      >
        <div className="flex items-center justify-between">
          <span className="inline-flex items-center gap-1.5 rounded-full bg-[#2563EB]/10 px-2.5 py-1 text-[11px] font-semibold text-[#2563EB]">
            {step.badge || `Step ${index + 1} of ${steps.length}`}
          </span>
          <button
            type="button"
            onClick={onClose}
            className="rounded-md px-2 py-1 text-[11px] font-medium text-[#94A3B8] hover:bg-slate-100 hover:text-[#475569] transition-colors"
          >
            Skip
          </button>
        </div>

        <h3 className="mt-2.5 text-sm font-semibold text-[#0F172A]">{step.title}</h3>
        <p className="mt-1 text-xs leading-relaxed text-[#475569]">{step.body}</p>

        <div className="mt-4 flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            {steps.map((_, i) => (
              <span
                key={i}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === index ? "w-5 bg-[#2563EB]" : "w-1.5 bg-slate-300"
                }`}
              />
            ))}
          </div>
          <div className="flex items-center gap-2">
            {!isFirst && (
              <button
                type="button"
                onClick={back}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-[#475569] hover:bg-slate-100 transition-colors"
              >
                Back
              </button>
            )}
            <button
              type="button"
              onClick={next}
              className="inline-flex items-center gap-1 rounded-lg bg-[#2563EB] px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-[#1D4ED8] transition-colors"
            >
              {isLast ? "Got it" : "Next"}
              {!isLast && (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
