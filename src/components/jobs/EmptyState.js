export default function EmptyState({ title, description, action }) {
  return (
    <div className="rounded-2xl border border-dashed border-[#E2E8F0] bg-white p-10 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#2563EB]/10 text-[#2563EB]">
        <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20 13V7a2 2 0 00-2-2h-3l-2-2H9L7 5H6a2 2 0 00-2 2v10a2 2 0 002 2h7"
          />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 17l2 2 4-4" />
        </svg>
      </div>
      <h3 className="text-base font-semibold text-[#0F172A]">{title}</h3>
      {description && <p className="mt-1 text-sm text-[#475569]">{description}</p>}
      {action && <div className="mt-5 flex justify-center">{action}</div>}
    </div>
  );
}
