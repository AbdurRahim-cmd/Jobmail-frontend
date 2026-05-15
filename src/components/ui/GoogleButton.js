export default function GoogleButton({ onClick, label = "Connect Google", className = "", disabled = false }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      className={[
        "inline-flex w-full items-center justify-center gap-3 rounded-lg",
        "border border-[#E2E8F0] bg-white px-5 h-12 text-sm font-medium text-[#0F172A]",
        "shadow-sm transition-all duration-200 ease-out",
        "hover:-translate-y-px hover:shadow-md hover:border-slate-300",
        "disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0",
        className,
      ].join(" ")}
    >
      <svg className="h-5 w-5" viewBox="0 0 18 18" aria-hidden="true">
        <path fill="#4285F4" d="M17.64 9.2045c0-.6382-.0573-1.2518-.1636-1.8409H9v3.4818h4.8436a4.1402 4.1402 0 0 1-1.7972 2.7164v2.2582h2.9089c1.7026-1.5673 2.6847-3.8764 2.6847-6.6155z" />
        <path fill="#34A853" d="M9 18c2.43 0 4.4673-.8064 5.9564-2.1791l-2.9089-2.2582c-.8064.54-1.8368.8591-3.0475.8591-2.3433 0-4.3275-1.5827-5.0351-3.7109H.9573v2.332c1.481 2.9418 4.5273 4.9571 8.0427 4.9571z" />
        <path fill="#FBBC05" d="M3.9649 10.7109A5.4097 5.4097 0 0 1 3.6832 9c0-.5932.1019-1.1709.2817-1.7109v-2.332H.9573A8.9957 8.9957 0 0 0 0 9c0 1.4523.3482 2.8273.9573 4.0438l3.0076-2.3329z" />
        <path fill="#EA4335" d="M9 3.5782c1.3214 0 2.5078.4541 3.4405 1.3459l2.5805-2.5805C13.4636.8918 11.4264 0 9 0 5.4846 0 2.4382 2.0155.9573 4.9573l3.0076 2.332c.7077-2.1282 2.6918-3.7109 5.0351-3.7109z" />
      </svg>
      {label}
    </button>
  );
}
