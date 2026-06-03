"use client";

import { useEffect, useRef, useState } from "react";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import { copyToClipboard } from "@/lib/clipboard";

export default function PromptReviewModal({
  open,
  onClose,
  action,
  jd,
  prompt,
  onPromptChange,
  onBack,
  onOpenChatGPT,
  opening,
  openedMode,
}) {
  const taRef = useRef(null);
  const [copied, setCopied] = useState(false);
  const [showJd, setShowJd] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 1500);
    return () => clearTimeout(t);
  }, [copied]);

  useEffect(() => {
    const el = taRef.current;
    if (!el || !open) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 360)}px`;
  }, [prompt, open]);

  const handleCopy = async () => {
    const ok = await copyToClipboard(prompt);
    setCopied(ok);
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      size="xl"
      title={action?.label || "Prompt preview"}
      subtitle="Edit if you'd like, then send to ChatGPT."
      footer={
        <div className="flex flex-col-reverse sm:flex-row items-stretch sm:items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            {onBack && (
              <Button variant="ghost" size="sm" onClick={onBack}>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                Pick another
              </Button>
            )}
            <Button variant="secondary" size="sm" onClick={handleCopy} disabled={!prompt}>
              {copied ? "Copied!" : "Copy prompt"}
            </Button>
          </div>
          <Button size="sm" onClick={onOpenChatGPT} disabled={!prompt || opening}>
            {opening ? (<><Spinner size={14} />Preparing…</>) : (
              <>
                Open in ChatGPT
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M7 17L17 7M7 7h10v10"/></svg>
              </>
            )}
          </Button>
        </div>
      }
    >
      <div className="space-y-4">
        {openedMode && (
          <div className={[
            "flex items-start gap-2 rounded-xl border px-3.5 py-2.5 text-xs",
            openedMode === "clipboard"
              ? "border-emerald-200 bg-emerald-50 text-emerald-800"
              : "border-amber-200 bg-amber-50 text-amber-800",
          ].join(" ")}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="mt-0.5 shrink-0">
              {openedMode === "clipboard" ? <path d="M20 6 9 17l-5-5"/> : <><circle cx="12" cy="12" r="10"/><path d="M12 8v4M12 16h.01"/></>}
            </svg>
            <div className="leading-relaxed">
              {openedMode === "clipboard" ? (
                <>
                  <span className="font-semibold">Prompt copied to your clipboard.</span> Switch to the new ChatGPT tab and press{" "}
                  <kbd className="rounded border border-emerald-300 bg-white px-1 py-0.5 font-mono text-[10px] text-emerald-900">Cmd/Ctrl + V</kbd>{" "}
                  in the chat box, then hit Enter.
                </>
              ) : (
                <>
                  Couldn't copy automatically — use the <span className="font-semibold">Copy prompt</span> button below, then paste into ChatGPT.
                </>
              )}
            </div>
          </div>
        )}

        <div className="rounded-xl border border-[#E2E8F0] bg-slate-50/50">
          <button
            type="button"
            onClick={() => setShowJd((v) => !v)}
            className="flex w-full items-center justify-between gap-2 px-3.5 py-2.5 text-left"
            aria-expanded={showJd}
          >
            <span className="text-[11px] font-medium uppercase tracking-wider text-[#475569]">
              Source JD · {jd.trim().split(/\s+/).filter(Boolean).length} words
            </span>
            <svg className={`size-3.5 text-slate-400 transition-transform ${showJd ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
          </button>
          {showJd && (
            <div className="border-t border-[#E2E8F0] px-3.5 py-3 max-h-40 overflow-y-auto">
              <p className="whitespace-pre-line text-xs leading-relaxed text-[#475569]">{jd}</p>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-[11px] font-medium uppercase tracking-wider text-[#475569]">
              Prompt sent to ChatGPT
            </label>
            <span className="text-[11px] text-[#475569] tabular-nums">{prompt.length} chars</span>
          </div>
          <textarea
            ref={taRef}
            value={prompt}
            onChange={(e) => onPromptChange(e.target.value)}
            spellCheck={false}
            className="block w-full resize-none rounded-xl border border-[#E2E8F0] bg-white p-3.5 font-mono text-[12px] leading-relaxed text-[#0F172A] placeholder:text-slate-400 focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10"
            style={{ minHeight: 200 }}
          />
        </div>
      </div>
    </Modal>
  );
}
