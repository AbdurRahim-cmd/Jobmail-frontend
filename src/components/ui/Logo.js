import Link from "next/link";

export default function Logo({ href = "/", size = "md" }) {
  const sizes = {
    sm: { icon: "h-7 w-7", text: "text-base" },
    md: { icon: "h-9 w-9", text: "text-lg" },
  };
  const s = sizes[size];
  return (
    <Link href={href} className="inline-flex items-center gap-2.5 group">
      <span
        className={`${s.icon} grid place-items-center rounded-lg bg-gradient-to-br from-[#2563EB] to-[#1E40AF] text-white shadow-sm shadow-[#2563EB]/30 group-hover:shadow-md transition-shadow`}
      >
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </span>
      <span className={`${s.text} font-semibold tracking-tight text-[#0F172A]`}>
        Jobmail
      </span>
    </Link>
  );
}
