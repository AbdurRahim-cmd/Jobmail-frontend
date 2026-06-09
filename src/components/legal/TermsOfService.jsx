"use client";

import LegalPageShell from "./LegalPageShell";

const LAST_UPDATED = "June 9, 2026";
const CONTACT_EMAIL = "ar878822@gmail.com";

const SECTIONS = [
  {
    id: "agreement",
    title: "Agreement to Terms",
    content: (
      <>
        <p>
          These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use of{" "}
          <strong>JobMailer</strong> (the &ldquo;Service&rdquo;), operated by the JobMailer team
          (&ldquo;JobMailer,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). By
          creating an account, connecting your Google Account, or otherwise using the Service, you
          agree to be bound by these Terms and by our{" "}
          <a href="/privacy">Privacy Policy</a>. If you do not agree, do not use the Service.
        </p>
      </>
    ),
  },
  {
    id: "description",
    title: "Description of the Service",
    content: (
      <>
        <p>
          JobMailer is a software-as-a-service application that helps job seekers manage
          job-related email. With your authorization, the Service:
        </p>
        <ul>
          <li>Reads your Gmail messages to identify job opportunities and recruiter outreach.</li>
          <li>Removes duplicate job alerts and categorizes opportunities.</li>
          <li>Displays organized opportunities in a personal dashboard.</li>
          <li>
            Sends job-application emails to recruiters from your Gmail account <strong>only when
            you initiate the action</strong>.
          </li>
        </ul>
        <p>
          We may add, modify, or remove features over time to improve the Service.
        </p>
      </>
    ),
  },
  {
    id: "eligibility",
    title: "Eligibility",
    content: (
      <p>
        To use JobMailer, you must be at least 16 years old, of legal working age in your
        jurisdiction, and able to form a binding contract. By using the Service, you represent and
        warrant that you meet these requirements and that the Google Account you connect belongs to
        you and is used in compliance with Google&rsquo;s terms.
      </p>
    ),
  },
  {
    id: "accounts",
    title: "Accounts & Google Sign-In",
    content: (
      <>
        <p>
          JobMailer uses <strong>Google OAuth</strong> for sign-in. You are responsible for
          maintaining the security of your Google Account and for all activity that occurs under
          your JobMailer account. You agree to:
        </p>
        <ul>
          <li>Provide accurate information and keep it up to date.</li>
          <li>Protect your credentials and notify us promptly of any unauthorized use.</li>
          <li>
            Use only a Google Account that you are authorized to connect to the Service.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "gmail-authorization",
    title: "Gmail Access & Authorization",
    content: (
      <>
        <p>
          The Service accesses your Gmail data only after you grant consent through Google&rsquo;s
          OAuth screen, using the <code>gmail.readonly</code>, <code>gmail.send</code>, and{" "}
          <code>userinfo.email</code> scopes. By authorizing JobMailer, you permit us to access
          your Gmail data solely to provide the features described in these Terms and our{" "}
          <a href="/privacy">Privacy Policy</a>.
        </p>
        <p>
          You may <strong>revoke this access at any time</strong> through your{" "}
          <a
            href="https://myaccount.google.com/permissions"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Account permissions
          </a>{" "}
          or from within JobMailer. Revoking access will disable features that depend on Gmail. Our
          handling of Gmail data complies with the{" "}
          <a
            href="https://developers.google.com/terms/api-services-user-data-policy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google API Services User Data Policy
          </a>
          , including its Limited Use requirements.
        </p>
      </>
    ),
  },
  {
    id: "email-sending",
    title: "Email Sending Functionality",
    content: (
      <>
        <p>
          JobMailer can send application emails to recruiters from your Gmail account. You
          acknowledge and agree that:
        </p>
        <ul>
          <li>
            Emails are sent <strong>only after you review and explicitly initiate</strong> the
            action. The Service never sends email automatically or without your direct instruction.
          </li>
          <li>
            <strong>You are solely responsible</strong> for the content, accuracy, recipients, and
            consequences of any email you send through the Service.
          </li>
          <li>
            You will use the email feature in compliance with applicable anti-spam and
            communications laws (such as the CAN-SPAM Act, GDPR, and similar regulations) and will
            not send unsolicited bulk, deceptive, or harassing messages.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "user-responsibilities",
    title: "User Responsibilities",
    content: (
      <>
        <p>When using JobMailer, you agree to:</p>
        <ul>
          <li>Use the Service only for lawful, legitimate job-seeking purposes.</li>
          <li>Provide truthful information in the emails you send.</li>
          <li>Respect the rights, privacy, and inboxes of the recruiters you contact.</li>
          <li>
            Maintain the security of your account and the devices you use to access the Service.
          </li>
          <li>Comply with these Terms, our Privacy Policy, and all applicable laws.</li>
        </ul>
      </>
    ),
  },
  {
    id: "acceptable-use",
    title: "Acceptable Use Policy",
    content: (
      <>
        <p>You must not, and must not attempt to:</p>
        <ul>
          <li>Send spam, unsolicited bulk email, or deceptive, fraudulent, or harassing messages.</li>
          <li>
            Use the Service to violate any law, regulation, or third-party right, including
            intellectual-property and privacy rights.
          </li>
          <li>
            Reverse engineer, decompile, scrape, or attempt to extract source code or data from the
            Service, except as permitted by law.
          </li>
          <li>
            Interfere with, disrupt, overload, or gain unauthorized access to the Service or its
            infrastructure.
          </li>
          <li>
            Use the Service to access, store, or transmit malware or any harmful or malicious code.
          </li>
          <li>
            Circumvent any usage limits, security measures, or access controls, or use the Service
            in violation of Google&rsquo;s policies.
          </li>
        </ul>
        <p>
          We may suspend or terminate access for any violation of this Acceptable Use Policy.
        </p>
      </>
    ),
  },
  {
    id: "intellectual-property",
    title: "Intellectual Property",
    content: (
      <p>
        The Service, including its software, design, branding, and content (excluding your data and
        the emails you create), is owned by JobMailer and protected by intellectual-property laws.
        We grant you a limited, non-exclusive, non-transferable, revocable license to use the
        Service for its intended purpose. You retain all rights to your own data and the content of
        the emails you compose and send.
      </p>
    ),
  },
  {
    id: "third-party-services",
    title: "Third-Party Services",
    content: (
      <>
        <p>
          JobMailer depends on third-party services to operate, including <strong>Google</strong>{" "}
          (OAuth and Gmail API), <strong>Vercel</strong> (frontend hosting),{" "}
          <strong>Railway</strong> (backend hosting), and <strong>MongoDB</strong> (database). Your
          use of Google services is also subject to Google&rsquo;s applicable terms and policies.
          We are not responsible for the availability, performance, or actions of these third-party
          providers, and their services are governed by their own terms.
        </p>
      </>
    ),
  },
  {
    id: "disclaimers",
    title: "Disclaimers",
    content: (
      <p>
        The Service is provided <strong>&ldquo;as is&rdquo;</strong> and{" "}
        <strong>&ldquo;as available,&rdquo;</strong> without warranties of any kind, whether
        express or implied, including warranties of merchantability, fitness for a particular
        purpose, non-infringement, accuracy, or uninterrupted operation. JobMailer does not
        guarantee that opportunities identified, emails delivered, or results obtained through the
        Service will meet your expectations, lead to employment, or be error-free.
      </p>
    ),
  },
  {
    id: "limitation-of-liability",
    title: "Limitation of Liability",
    content: (
      <p>
        To the maximum extent permitted by law, JobMailer and its operators, affiliates, and
        service providers will not be liable for any indirect, incidental, special, consequential,
        or punitive damages, or for any loss of profits, data, goodwill, opportunities, or other
        intangible losses, arising out of or related to your use of (or inability to use) the
        Service — including any email sent or not sent through the Service. To the extent liability
        cannot be excluded, our total aggregate liability for any claim relating to the Service is
        limited to the greater of the amount you paid us for the Service in the twelve months
        before the claim, or USD&nbsp;100.
      </p>
    ),
  },
  {
    id: "indemnification",
    title: "Indemnification",
    content: (
      <p>
        You agree to indemnify and hold harmless JobMailer and its operators and service providers
        from and against any claims, damages, liabilities, losses, and expenses (including
        reasonable legal fees) arising out of or related to your use of the Service, the emails you
        send, your violation of these Terms, or your violation of any law or third-party right.
      </p>
    ),
  },
  {
    id: "termination",
    title: "Account Termination",
    content: (
      <>
        <p>
          You may stop using JobMailer at any time by revoking Google access and deleting your
          account. Upon deletion, we will cease accessing your Gmail and delete your associated
          Gmail-derived data as described in our <a href="/privacy">Privacy Policy</a>.
        </p>
        <p>
          We may suspend or terminate your access, with or without notice, if you violate these
          Terms, misuse the Service, create risk or legal exposure for us, or if we discontinue the
          Service. Provisions that by their nature should survive termination — including
          intellectual property, disclaimers, limitation of liability, and indemnification — will
          continue to apply.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    title: "Changes to the Service & Terms",
    content: (
      <p>
        We may modify the Service or these Terms from time to time. When we make material changes
        to these Terms, we will update the &ldquo;Last updated&rdquo; date above and, where
        appropriate, provide notice within the app or by email. Your continued use of the Service
        after changes take effect constitutes acceptance of the revised Terms.
      </p>
    ),
  },
  {
    id: "governing-law",
    title: "Governing Law",
    content: (
      <p>
        These Terms are governed by and construed in accordance with the laws of India, without
        regard to its conflict-of-laws principles. Any disputes arising out of or relating to these
        Terms or the Service will be subject to the exclusive jurisdiction of the competent courts
        located in India, unless otherwise required by applicable mandatory law in your place of
        residence.
      </p>
    ),
  },
  {
    id: "contact",
    title: "Contact Information",
    content: (
      <>
        <p>If you have any questions about these Terms, please contact us:</p>
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

export default function TermsOfService() {
  return (
    <LegalPageShell
      kicker="Legal"
      title="Terms of Service"
      intro="These Terms set out the rules for using JobMailer, your responsibilities when sending recruiter emails, and the limits of our liability. Please read them carefully."
      lastUpdated={LAST_UPDATED}
      summary={[
        "JobMailer helps you find, organize, and respond to job emails from your Gmail inbox.",
        "Gmail is accessed only with your consent; you can revoke it anytime.",
        "You are responsible for the recruiter emails you choose to send.",
        "The Service is provided 'as is', with limited liability as described below.",
      ]}
      sections={SECTIONS}
    />
  );
}
