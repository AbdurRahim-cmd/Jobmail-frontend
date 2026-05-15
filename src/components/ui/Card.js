export default function Card({ className = "", children, padded = true }) {
  return (
    <div
      className={[
        "bg-white border border-[#E2E8F0] rounded-2xl",
        "shadow-[0_1px_2px_rgba(15,23,42,0.04),0_8px_24px_-12px_rgba(15,23,42,0.08)]",
        padded ? "p-6 sm:p-8" : "",
        className,
      ].join(" ")}
    >
      {children}
    </div>
  );
}
