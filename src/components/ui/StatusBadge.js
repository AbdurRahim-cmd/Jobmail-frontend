const TONES = {
  neutral: "bg-slate-100 text-slate-700",
  success: "bg-[#16A34A]/10 text-[#15803D]",
  warning: "bg-[#FACC15]/20 text-[#854D0E]",
  info: "bg-[#2563EB]/10 text-[#1E40AF]",
};

export default function StatusBadge({ tone = "neutral", dot = true, children, className = "" }) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium",
        TONES[tone],
        className,
      ].join(" ")}
    >
      {dot && (
        <span
          className={[
            "h-1.5 w-1.5 rounded-full",
            tone === "success" && "bg-[#16A34A]",
            tone === "warning" && "bg-[#CA8A04]",
            tone === "info" && "bg-[#2563EB]",
            tone === "neutral" && "bg-slate-400",
          ].filter(Boolean).join(" ")}
        />
      )}
      {children}
    </span>
  );
}
