"use client";

import { useEffect } from "react";

const SIZES = {
  sm: "max-w-md",
  md: "max-w-lg",
  lg: "max-w-2xl",
  xl: "max-w-3xl",
};

export default function Modal({
  open,
  onClose,
  title,
  subtitle,
  size = "md",
  children,
  footer,
  closeOnBackdrop = true,
}) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && onClose?.();
    window.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-slate-900/40 backdrop-blur-sm animate-fade-in-up"
      onClick={() => closeOnBackdrop && onClose?.()}
    >
      <div
        className={[
          "w-full rounded-3xl bg-white shadow-2xl border border-[#E2E8F0] flex flex-col max-h-[90vh]",
          SIZES[size] || SIZES.md,
        ].join(" ")}
        onClick={(e) => e.stopPropagation()}
      >
        {(title || onClose) && (
          <header className="flex items-start justify-between gap-4 px-5 sm:px-6 py-4 border-b border-[#E2E8F0]">
            <div className="min-w-0">
              {title && <h3 className="text-base font-semibold text-[#0F172A]">{title}</h3>}
              {subtitle && <p className="mt-0.5 text-xs text-[#475569]">{subtitle}</p>}
            </div>
            {onClose && (
              <button
                type="button"
                onClick={onClose}
                aria-label="Close"
                className="rounded-md p-1.5 text-[#475569] hover:bg-slate-100 hover:text-[#0F172A] transition-colors"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18M6 6l12 12"/></svg>
              </button>
            )}
          </header>
        )}
        <div className="flex-1 overflow-y-auto px-5 sm:px-6 py-5">{children}</div>
        {footer && <footer className="border-t border-[#E2E8F0] px-5 sm:px-6 py-3.5">{footer}</footer>}
      </div>
    </div>
  );
}
