import { Input, Textarea } from "../ui/Input";

export default function CompanyCard({ index, register, errors, onRemove, canRemove }) {
  const e = errors?.companies?.[index];
  return (
    <div className="rounded-xl border border-[#E2E8F0] bg-white p-5 space-y-4">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-[#0F172A]">Company {index + 1}</p>
        {canRemove && (
          <button
            type="button"
            onClick={onRemove}
            className="text-xs font-medium text-[#475569] hover:text-[#B91C1C] transition-colors"
          >
            Remove
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          id={`company-email-${index}`}
          label="Recipient Email"
          type="email"
          placeholder="hiring@company.com"
          error={e?.email?.message}
          {...register(`companies.${index}.email`, {
            required: "Email Is Required",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Please Enter A Valid Email Address",
            },
          })}
        />
        <Input
          id={`company-subject-${index}`}
          label="Subject"
          type="text"
          placeholder="Application For [Job Title]"
          error={e?.subject?.message}
          {...register(`companies.${index}.subject`, {
            required: "Subject Is Required",
          })}
        />
      </div>

      <Textarea
        id={`company-message-${index}`}
        label="Message"
        rows={5}
        placeholder="Hi, I am writing to express my interest in the [Job Title] position at your company..."
        error={e?.message?.message}
        {...register(`companies.${index}.message`, {
          required: "Message Is Required",
        })}
      />
    </div>
  );
}
