export function formatProfile(profile) {
  if (!profile) return null;
  const { name, qualification, experience } = profile;
  const lines = [];
  if (name && name.trim()) lines.push(`- Name: ${name.trim()}`);
  if (qualification && qualification.trim()) lines.push(`- Qualification: ${qualification.trim()}`);
  if (experience && experience.trim()) lines.push(`- Experience: ${experience.trim()}`);
  return lines.length ? lines.join("\n") : null;
}

export const ACTIONS = [
  {
    id: "email",
    label: "Generate Professional Email",
    short: "Pro Email",
    description: "Recruiter-ready outreach email tailored to the JD.",
    accent: "indigo",
    build: (jd, profile) => `You are an expert career coach helping a candidate write a recruiter-ready outreach email.

Candidate profile:
${formatProfile(profile) || "(candidate did not supply a profile — infer a strong full-stack/MERN background)"}

Job description:
"""
${jd}
"""

Write a concise, professional outreach email (under 180 words) addressed to the recruiter. Requirements:
- Use the candidate's name in the sign-off
- Compelling subject line
- Personalized opening referencing one specific JD detail
- 2-3 sentences mapping the candidate's qualification and experience to the JD
- Clear call to action (offer a 15-min chat)
- Friendly, confident, no buzzwords
Return only the email — Subject line first, then body.`,
  },
  {
    id: "hr",
    label: "Generate HR Outreach",
    short: "HR Outreach",
    description: "LinkedIn / cold message style note for HR.",
    accent: "cyan",
    build: (jd, profile) => `Help me craft a short LinkedIn message (under 90 words) to send to an HR contact about this role.

My profile:
${formatProfile(profile) || "(no profile provided — assume a senior developer with React + Node experience)"}

Job description:
"""
${jd}
"""

Tone: warm, direct, low-pressure. Mention one concrete reason I'm interested in the role and one specific strength from my qualification/experience that maps to it. Sign off with my name. End with a soft ask for the right person to chat with. No emojis, no "I hope this finds you well", no buzzwords.`,
  },
  {
    id: "contacts",
    label: "Find Contact Emails",
    short: "Contact Emails",
    description: "Company, HR, and senior leadership emails to reach out to.",
    accent: "violet",
    build: (jd, profile) => `Act as a sourcing researcher. From the job description below, identify the hiring company and find the best email addresses to reach out to about this role.

Candidate profile:
${formatProfile(profile) || "(no profile provided)"}

Job description:
"""
${jd}
"""

Return a markdown table with these columns: **Type**, **Name / Role**, **Email**, **Confidence**, **Source / Pattern**.

Cover these contact types:
1. **Company / general** — the main careers or info email (e.g. careers@, jobs@, info@).
2. **HR / recruiting** — the recruiter, HR, or talent acquisition contact for this role.
3. **Senior leadership / hiring manager** — the hiring manager, team lead, or relevant senior person (e.g. Engineering Manager, CTO, Head of department).

For each: give the verified email if known, otherwise infer the most likely address from the company's email pattern (e.g. firstname.lastname@company.com) and mark Confidence as "Verified", "Likely", or "Guessed". After the table, list the company's primary email domain and the email format pattern you used.`,
  },
];

const CHATGPT_URL = "https://chatgpt.com/";
const URL_LIMIT = 1800;

export function buildChatGPTUrl(prompt) {
  const q = encodeURIComponent(prompt);
  if (q.length > URL_LIMIT) return null;
  return `${CHATGPT_URL}?q=${q}`;
}

export function summarizeJd(jd, max = 60) {
  const firstLine = (jd || "").trim().split("\n").find((l) => l.trim().length > 0) || "";
  return firstLine.length > max ? `${firstLine.slice(0, max)}…` : firstLine || "Untitled JD";
}

export function guessCompany(jd) {
  const m = (jd || "").match(/\b(?:at|@|join|with)\s+([A-Z][\w&.\- ]{2,40})/);
  return m ? m[1].trim() : null;
}

export const SAMPLE_JD = `Senior Full-Stack Engineer (Remote)

We are a Series B fintech startup looking for a senior full-stack engineer to own end-to-end features across our React + Node.js + PostgreSQL stack. You'll work directly with the founding team to ship the next iteration of our payments product.

Must have:
- 5+ years building production web apps
- Strong React (hooks, suspense) and Node.js
- Experience with PostgreSQL and event-driven architecture
- Comfortable with on-call rotation

Nice to have:
- AWS / Kubernetes
- Stripe / payments domain
- Open-source contributions

We offer competitive comp, equity, and full remote (Americas / EU timezones).`;
