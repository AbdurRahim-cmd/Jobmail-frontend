import Card from "../ui/Card";

const FEATURES = [
  {
    title: "Bulk-Yet-Personal",
    description:
      "Send tailored emails to up to 20 companies in one batch — each with its own subject and message.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
    ),
  },
  {
    title: "Resume Attached Automatically",
    description:
      "Upload your resume once and we attach it to every outgoing email in the batch — no manual work.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M9 12h6m-6 4h4m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h7l5 5v11a2 2 0 01-2 2z" />
    ),
  },
  {
    title: "Secure Google OAuth",
    description:
      "We never store your password. Emails are sent from your own Gmail through a secure Google connection.",
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.8" d="M12 11c1.657 0 3-1.343 3-3S13.657 5 12 5s-3 1.343-3 3 1.343 3 3 3zm0 0v2m-7 8a7 7 0 0114 0H5z" />
    ),
  },
];

export default function Features() {
  return (
    <section className="py-20 sm:py-24">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight text-[#0F172A]">
            Everything You Need To Reach Out
          </h2>
          <p className="mt-3 text-[#475569]">
            A simple workflow built for job seekers — no spreadsheets, no copy-paste.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {FEATURES.map((feature) => (
            <Card
              key={feature.title}
              className="transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_4px_12px_rgba(15,23,42,0.06),0_24px_48px_-24px_rgba(15,23,42,0.18)]"
            >
              <div className="h-10 w-10 grid place-items-center rounded-lg bg-[#2563EB]/10 text-[#2563EB] mb-4">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {feature.icon}
                </svg>
              </div>
              <h3 className="text-base font-semibold text-[#0F172A]">{feature.title}</h3>
              <p className="mt-2 text-sm text-[#475569] leading-relaxed">{feature.description}</p>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
