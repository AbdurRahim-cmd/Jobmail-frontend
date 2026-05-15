export default function Spinner({ size = 20, className = "" }) {
  return (
    <span
      role="status"
      aria-label="Loading"
      className={`inline-block animate-spin rounded-full border-2 border-[#2563EB]/30 border-t-[#2563EB] ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
