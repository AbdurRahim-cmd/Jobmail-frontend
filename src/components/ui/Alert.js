const TONES = {
  info: "bg-[#2563EB]/5 text-[#1E40AF] border-[#2563EB]/15",
  success: "bg-[#16A34A]/8 text-[#15803D] border-[#16A34A]/20",
  warning: "bg-[#FACC15]/15 text-[#854D0E] border-[#FACC15]/40",
  error: "bg-rose-50 text-rose-700 border-rose-200",
};

const ICONS = {
  info: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M12 20a8 8 0 100-16 8 8 0 000 16z" />
    </svg>
  ),
  success: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
    </svg>
  ),
  warning: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v3m0 3h.01M10.29 3.86l-8.18 14.14A2 2 0 003.84 21h16.32a2 2 0 001.73-3l-8.18-14.14a2 2 0 00-3.42 0z" />
    </svg>
  ),
  error: (
    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
};

export default function Alert({ tone = "info", title, children, className = "" }) {
  return (
    <div
      role="status"
      className={[
        "flex items-start gap-3 rounded-lg border px-4 py-3 text-sm",
        TONES[tone],
        className,
      ].join(" ")}
    >
      <span className="mt-0.5 shrink-0">{ICONS[tone]}</span>
      <div className="space-y-0.5">
        {title && <p className="font-medium leading-snug">{title}</p>}
        {children && <p className="leading-relaxed opacity-90">{children}</p>}
      </div>
    </div>
  );
}
