const VARIANTS = {
  primary:
    "bg-[#2563EB] text-white hover:bg-[#1E40AF] shadow-sm shadow-[#2563EB]/20 disabled:bg-slate-300 disabled:text-white disabled:shadow-none",
  secondary:
    "bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-slate-50 disabled:opacity-60",
  ghost:
    "bg-transparent text-[#475569] hover:bg-slate-100 hover:text-[#0F172A]",
  danger:
    "bg-white text-[#0F172A] border border-[#E2E8F0] hover:bg-slate-50 hover:text-[#B91C1C]",
};

const SIZES = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-sm",
  lg: "h-12 px-6 text-base",
};

export default function Button({
  variant = "primary",
  size = "md",
  type = "button",
  fullWidth = false,
  className = "",
  children,
  ...props
}) {
  return (
    <button
      type={type}
      className={[
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium",
        "transition-all duration-200 ease-out",
        "hover:-translate-y-px active:translate-y-0 active:scale-[0.99]",
        "disabled:cursor-not-allowed disabled:hover:translate-y-0",
        VARIANTS[variant],
        SIZES[size],
        fullWidth ? "w-full" : "",
        className,
      ].join(" ")}
      {...props}
    >
      {children}
    </button>
  );
}
