"use client";

import GoogleButton from "../ui/GoogleButton";
import StatusBadge from "../ui/StatusBadge";
import { startGoogleOAuth } from "@/lib/auth";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-radial-soft">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-24 sm:pt-28 sm:pb-32">
        <div className="max-w-3xl mx-auto text-center animate-fade-in-up">
          <div className="flex justify-center mb-6">
            <StatusBadge tone="info" dot={false}>
              <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Secure Google OAuth Connection
            </StatusBadge>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-semibold tracking-tight text-[#0F172A] leading-[1.1]">
            Send Personalized Job Emails In Minutes
          </h1>

          <p className="mt-5 text-base sm:text-lg text-[#475569] leading-relaxed max-w-2xl mx-auto">
            Connect your Google account, upload your resume, and reach out to companies with tailored emails — without leaving your browser.
          </p>

          <div className="mt-9 flex flex-col items-center gap-3">
            <div className="w-full max-w-xs">
              <GoogleButton label="Connect Google" onClick={startGoogleOAuth} />
            </div>
            <p className="text-xs text-[#475569]">
              Free To Use. No Credit Card Required.
            </p>
          </div>

          <div className="mt-14 grid grid-cols-3 gap-4 max-w-md mx-auto">
            {[
              { label: "Daily Limit", value: "20" },
              { label: "Setup Time", value: "1 Min" },
              { label: "Cost", value: "Free" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-xl sm:text-2xl font-semibold text-[#0F172A]">{s.value}</div>
                <div className="mt-0.5 text-xs text-[#475569]">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
