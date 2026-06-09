"use client";

import LegalPageShell, { ScopeTable } from "./LegalPageShell";

const LAST_UPDATED = "June 9, 2026";
const CONTACT_EMAIL = "ar878822@gmail.com";

const SCOPES = [
  {
    scope: "userinfo.email",
    allows: "Reading the email address associated with your Google Account.",
    why: "To create and identify your JobMailer account and to know which mailbox you have connected.",
  },
  {
    scope: "gmail.readonly",
    allows: "Read-only access to your Gmail messages and metadata.",
    why: "To scan incoming mail, identify job opportunities, remove duplicate job alerts, and categorize roles in your dashboard. We never modify or delete your messages.",
  },
  {
    scope: "gmail.send",
    allows: "Sending email on your behalf through your Gmail account.",
    why: "To deliver job-application emails to recruiters that you compose and explicitly choose to send. We never send mail automatically.",
  },
];

const SECTIONS = [
  {
    id: "introduction",
    title: "Introduction",
    content: (
      <>
        <p>
          This Privacy Policy explains how <strong>JobMailer</strong> (&ldquo;JobMailer,&rdquo;
          &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) collects, uses, stores, and
          protects your information when you use our web application and related services (the
          &ldquo;Service&rdquo;). JobMailer is a productivity tool that helps job seekers manage
          job-related email by identifying opportunities in their inbox, removing duplicate job
          alerts, categorizing roles, and sending application emails to recruiters when the user
          chooses to do so.
        </p>
        <p>
          We have designed JobMailer around a simple principle: your mailbox belongs to you. We
          access your Google and Gmail data only with your explicit consent, use it solely to
          provide the features you request, and never sell it or use it for advertising. By
          creating an account or using the Service, you agree to the practices described in this
          Privacy Policy.
        </p>
      </>
    ),
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    content: (
      <>
        <p>We collect only the information needed to operate the Service:</p>
        <h3>Account information</h3>
        <ul>
          <li>
            <strong>Google profile basics</strong> — your email address (via the{" "}
            <code>userinfo.email</code> scope) and your Google Account identifier, used to create
            and authenticate your JobMailer account.
          </li>
        </ul>
        <h3>Gmail data</h3>
        <ul>
          <li>
            <strong>Message content and metadata</strong> accessed through the{" "}
            <code>gmail.readonly</code> scope — such as sender, subject, date, and body — which we
            process to detect job opportunities, de-duplicate job alerts, and categorize roles.
          </li>
          <li>
            <strong>Emails you send</strong> through the <code>gmail.send</code> scope — the
            recruiter recipient, subject, and body of application emails that you compose and
            explicitly choose to send.
          </li>
        </ul>
        <h3>Usage and technical data</h3>
        <ul>
          <li>
            Limited operational data such as log timestamps, error reports, and basic device or
            browser information, used to keep the Service secure and reliable. We do not use this
            data to build advertising profiles.
          </li>
        </ul>
        <p>
          We do <strong>not</strong> intentionally collect special categories of personal data,
          and we ask that you do not store such information in JobMailer.
        </p>
      </>
    ),
  },
  {
    id: "oauth-and-gmail-access",
    title: "Google OAuth Permissions & Gmail Data Access",
    content: (
      <>
        <p>
          JobMailer uses <strong>Google OAuth 2.0</strong> for authentication and authorization.
          When you connect your account, Google presents a consent screen that lists exactly which
          permissions JobMailer requests. <strong>The Service accesses your Gmail data only after
          you grant that consent</strong>, and you can review or withdraw it at any time (see{" "}
          <a href="#your-rights">Your Rights &amp; Choices</a>).
        </p>
        <p>We request the following OAuth scopes:</p>
        <ScopeTable rows={SCOPES} />
        <p>
          We request the minimum scopes necessary to deliver JobMailer&rsquo;s features. We do not
          request access to attachments, contacts, or other Google services beyond what is listed
          above.
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-information",
    title: "How We Use Your Information",
    content: (
      <>
        <p>We use the information we collect strictly to provide and improve the Service:</p>
        <ul>
          <li>To authenticate you and maintain your account.</li>
          <li>To scan your inbox and identify job opportunities and recruiter outreach.</li>
          <li>To detect and remove duplicate job alerts so your dashboard stays clean.</li>
          <li>To categorize and organize opportunities for display in your dashboard.</li>
          <li>
            To send job-application emails to recruiters <strong>only when you initiate the
            action</strong>.
          </li>
          <li>To maintain the security, integrity, and reliability of the Service.</li>
          <li>To respond to your support requests and communicate important Service notices.</li>
        </ul>
        <p>
          We do <strong>not</strong> use your Gmail content to train generalized artificial
          intelligence or machine-learning models, and we do <strong>not</strong> use it for
          advertising or marketing.
        </p>
      </>
    ),
  },
  {
    id: "limited-use",
    title: "Limited Use & Google API Services Policy Compliance",
    content: (
      <>
        <p>
          JobMailer&rsquo;s use and transfer of information received from Google APIs to any other
          app will adhere to the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google API Services User Data Policy
          </a>
          , including the <strong>Limited Use</strong> requirements. In particular, data obtained
          through Gmail APIs is handled as follows:
        </p>
        <ul>
          <li>
            We use Gmail data <strong>only</strong> to provide and improve user-facing features
            that are visible within JobMailer (opportunity detection, de-duplication,
            categorization, dashboard display, and user-initiated email sending).
          </li>
          <li>
            We do <strong>not</strong> transfer or sell Gmail data to third parties for serving
            advertisements, market research, or any unrelated purpose.
          </li>
          <li>
            We do <strong>not</strong> allow humans to read your Gmail data unless (a) you have
            given explicit consent for specific messages, (b) it is necessary for security
            purposes such as investigating abuse, (c) it is required to comply with applicable law,
            or (d) the data is aggregated and anonymized for internal operations.
          </li>
          <li>
            We do <strong>not</strong> use Gmail data to develop, improve, or train generalized AI
            or ML models.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "email-sending",
    title: "Email Sending Functionality",
    content: (
      <>
        <p>
          JobMailer can send job-application emails to recruiters from your Gmail account using the{" "}
          <code>gmail.send</code> scope. This feature is <strong>entirely user-initiated</strong>:
        </p>
        <ul>
          <li>
            Emails are sent <strong>only</strong> after you review the content and explicitly
            choose to send it through an action in the app.
          </li>
          <li>
            JobMailer <strong>never</strong> sends emails automatically, on a schedule, or in bulk
            without your direct, per-action initiation.
          </li>
          <li>
            Sent emails appear in your own Gmail &ldquo;Sent&rdquo; folder, exactly as if you had
            sent them yourself, giving you a complete record.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "third-party-services",
    title: "Data Sharing & Third-Party Services",
    content: (
      <>
        <p>
          <strong>We do not sell your personal data</strong>, and we do not share it for
          advertising. We share data only with the infrastructure providers needed to run
          JobMailer, each acting as a service provider under appropriate data-protection terms:
        </p>
        <ul>
          <li>
            <strong>Google LLC</strong> — provides OAuth authentication and the Gmail API. Your use
            of Google services is also governed by the{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              Google Privacy Policy
            </a>
            .
          </li>
          <li>
            <strong>Vercel Inc.</strong> — hosts the JobMailer frontend application.
          </li>
          <li>
            <strong>Railway</strong> — hosts the JobMailer backend (Node.js + Express) application.
          </li>
          <li>
            <strong>MongoDB</strong> — stores account records and processed job data in our
            database.
          </li>
        </ul>
        <p>
          We may also disclose information if required to do so by law, to enforce our{" "}
          <a href="/terms">Terms of Service</a>, or to protect the rights, safety, and security of
          our users and the Service.
        </p>
      </>
    ),
  },
  {
    id: "data-retention",
    title: "Data Retention",
    content: (
      <>
        <p>
          We retain your information only for as long as necessary to provide the Service and for
          legitimate operational or legal purposes:
        </p>
        <ul>
          <li>
            <strong>Account data</strong> is retained while your account is active.
          </li>
          <li>
            <strong>Processed Gmail data</strong> (such as categorized opportunities) is retained
            to power your dashboard and is removed when no longer needed or when you delete it.
          </li>
          <li>
            When you <strong>revoke Google access</strong> or <strong>delete your account</strong>,
            we stop accessing your Gmail and delete the associated Gmail-derived data from our
            active systems within <strong>30 days</strong>, except where retention is required by
            law. Routine backups are purged on a rolling cycle.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "data-security",
    title: "Data Security",
    content: (
      <>
        <p>
          We apply industry-standard safeguards to protect your information, including:
        </p>
        <ul>
          <li>Encryption of data in transit using TLS/HTTPS.</li>
          <li>Encryption of OAuth tokens and sensitive data at rest.</li>
          <li>Access controls that limit data access to authorized systems and personnel.</li>
          <li>Secure handling of OAuth tokens, which are never exposed to client-side code.</li>
          <li>Ongoing monitoring, logging, and regular review of our security practices.</li>
        </ul>
        <p>
          No method of transmission or storage is completely secure. While we work hard to protect
          your data, we cannot guarantee absolute security, and you use the Service at your own
          risk.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    title: "Your Rights & Choices",
    content: (
      <>
        <p>You remain in control of your data at all times. You can:</p>
        <ul>
          <li>
            <strong>Revoke Google access</strong> at any time from your Google Account&rsquo;s{" "}
            <a
              href="https://myaccount.google.com/permissions"
              target="_blank"
              rel="noopener noreferrer"
            >
              Security &amp; Permissions
            </a>{" "}
            page or from within JobMailer. Revoking access immediately stops further Gmail access.
          </li>
          <li>
            <strong>Access and review</strong> the data JobMailer holds about you.
          </li>
          <li>
            <strong>Delete your account</strong> and request deletion of your associated data.
          </li>
          <li>
            <strong>Correct or update</strong> your account information.
          </li>
          <li>
            <strong>Object to or restrict</strong> certain processing, where applicable law (such
            as the GDPR or CCPA) provides those rights.
          </li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. We will respond within a
          reasonable timeframe and in accordance with applicable law.
        </p>
      </>
    ),
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    content: (
      <p>
        JobMailer is intended for users who are at least 16 years old and of legal working age in
        their jurisdiction. We do not knowingly collect personal information from children. If you
        believe a child has provided us with personal data, please contact us so we can remove it.
      </p>
    ),
  },
  {
    id: "international-transfers",
    title: "International Data Transfers",
    content: (
      <p>
        JobMailer relies on cloud infrastructure (Google, Vercel, Railway, and MongoDB) that may
        process and store data in countries other than your own. Where data is transferred across
        borders, we rely on appropriate safeguards and the providers&rsquo; own data-protection
        commitments to ensure your information remains protected consistent with this Privacy
        Policy.
      </p>
    ),
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time to reflect changes in the Service or in
        legal requirements. When we make material changes, we will update the &ldquo;Last
        updated&rdquo; date above and, where appropriate, notify you within the app or by email.
        Your continued use of JobMailer after changes take effect constitutes acceptance of the
        revised policy.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact Us",
    content: (
      <>
        <p>
          If you have questions, concerns, or requests regarding this Privacy Policy or your data,
          please contact us:
        </p>
        <ul>
          <li>
            <strong>Email:</strong>{" "}
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </li>
          <li>
            <strong>Service:</strong> JobMailer
          </li>
        </ul>
      </>
    ),
  },
];

export default function PrivacyPolicy() {
  return (
    <LegalPageShell
      kicker="Legal"
      title="Privacy Policy"
      intro="This policy describes how JobMailer collects, uses, and protects your information — including the Google and Gmail data you choose to connect — and the choices you have over it."
      lastUpdated={LAST_UPDATED}
      summary={[
        "We access your Gmail data only with your explicit consent.",
        "We never sell your data or share it for advertising.",
        "Recruiter emails are sent only after you initiate the action — never automatically.",
        "You can revoke Google access or delete your data at any time.",
      ]}
      sections={SECTIONS}
    />
  );
}
