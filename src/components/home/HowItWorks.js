const STEPS = [
  { step: "01", title: "Connect Google", body: "Sign in once with Google OAuth — no app password needed." },
  { step: "02", title: "Add Companies", body: "Enter recipient emails, subject lines, and your message." },
  { step: "03", title: "Send Mail", body: "Attach your resume and send the whole batch in one click." },
];

export default function HowItWorks() {
  return (
    <section className="py-20 sm:py-24 bg-white border-t border-[#E2E8F0]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#0F172A]">
            Three Simple Steps
          </h2>
          <p className="mt-3 text-[#475569]">
            From sign-in to sent — under two minutes.
          </p>
        </div>

        <ol className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {STEPS.map((step) => (
            <li
              key={step.step}
              className="relative rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] p-6"
            >
              <div className="text-xs font-semibold text-[#2563EB] tracking-widest">
                STEP {step.step}
              </div>
              <h3 className="mt-2 text-lg font-semibold text-[#0F172A]">{step.title}</h3>
              <p className="mt-2 text-sm text-[#475569] leading-relaxed">{step.body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
