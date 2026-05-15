import { forwardRef } from "react";

const baseField =
  "block w-full rounded-lg border border-[#E2E8F0] bg-white px-3.5 py-2.5 text-sm text-[#0F172A] placeholder:text-slate-400 transition-all focus:border-[#2563EB] focus:outline-none focus:ring-4 focus:ring-[#2563EB]/10 disabled:bg-slate-50 disabled:text-slate-500";

function FieldShell({ id, label, hint, error, children }) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label
          htmlFor={id}
          className="text-sm font-medium text-[#0F172A]"
        >
          {label}
        </label>
      )}
      {children}
      {hint && !error && (
        <p className="text-xs text-[#475569]">{hint}</p>
      )}
      {error && (
        <p className="text-xs font-medium text-[#B91C1C]">{error}</p>
      )}
    </div>
  );
}

export const Input = forwardRef(function Input(
  { label, hint, error, id, className = "", ...props },
  ref
) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <input
        id={id}
        ref={ref}
        className={`${baseField} ${className}`}
        {...props}
      />
    </FieldShell>
  );
});

export const Textarea = forwardRef(function Textarea(
  { label, hint, error, id, rows = 4, className = "", ...props },
  ref
) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <textarea
        id={id}
        ref={ref}
        rows={rows}
        className={`${baseField} resize-y leading-relaxed ${className}`}
        {...props}
      />
    </FieldShell>
  );
});

export const FileInput = forwardRef(function FileInput(
  { label, hint, error, id, className = "", ...props },
  ref
) {
  return (
    <FieldShell id={id} label={label} hint={hint} error={error}>
      <input
        id={id}
        ref={ref}
        type="file"
        className={`block w-full text-sm text-[#475569] file:mr-4 file:rounded-md file:border-0 file:bg-[#2563EB] file:px-4 file:py-2 file:text-sm file:font-medium file:text-white hover:file:bg-[#1E40AF] file:cursor-pointer rounded-lg border border-dashed border-[#E2E8F0] bg-slate-50 px-3 py-2.5 transition-colors focus:border-[#2563EB] focus:outline-none ${className}`}
        {...props}
      />
    </FieldShell>
  );
});
