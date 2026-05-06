"use client";

import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import Link from "next/link";

export default function SimpleForm() {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [dailyCount, setDailyCount] = useState(0);
  const [submittingCompanyCount, setSubmittingCompanyCount] = useState(0);
  const [authEmail, setAuthEmail] = useState("");
  const [hasToken, setHasToken] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      companies: [
        {
          email: "",
          subject: "",
          message: "",
          name: "",
          isCompanyName: false,
          resume: null,
          jobDescription: "",
        },
      ],
      commonResume: null,
    },
  });

  const {
    fields: companyFields,
    append: appendCompany,
    remove: removeCompany,
  } = useFieldArray({
    control,
    name: "companies",
  });

  const dailyLimit = 20;
  const maxCompanies = 20;

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      const today = new Date().toISOString().slice(0, 10);
      const raw = localStorage.getItem("jobmail-daily-usage");

      if (!raw) {
        const initial = { date: today, count: 0 };
        localStorage.setItem("jobmail-daily-usage", JSON.stringify(initial));
        setDailyCount(0);
        return;
      }

      const parsed = JSON.parse(raw);

      if (parsed && parsed.date === today && typeof parsed.count === "number") {
        setDailyCount(parsed.count);
      } else {
        const reset = { date: today, count: 0 };
        localStorage.setItem("jobmail-daily-usage", JSON.stringify(reset));
        setDailyCount(0);
      }
    } catch (e) {
      console.error("Failed to read daily usage from localStorage", e);
      setDailyCount(0);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const url = new URL(window.location.href);
    const tokenFromQuery = url.searchParams.get("token");
    const emailFromQuery = url.searchParams.get("email");
    const hashParams = new URLSearchParams(url.hash.replace(/^#/, ""));
    const tokenFromHash = hashParams.get("token");
    const emailFromHash = hashParams.get("email");

    const token = tokenFromQuery || tokenFromHash;
    const email = emailFromQuery || emailFromHash;

    if (token) {
      sessionStorage.setItem("token", token);
      setHasToken(true);
      if (email) {
        sessionStorage.setItem("authEmail", email);
        setAuthEmail(email);
      }

      // Clean token/email from URL after storing.
      url.searchParams.delete("token");
      url.searchParams.delete("email");
      url.hash = "";
      window.history.replaceState({}, "", `${url.pathname}${url.search}`);

      setStatusMessage({
        type: "success",
        text: "Gmail connected successfully.",
      });
      return;
    }

    const storedToken = sessionStorage.getItem("token");
    const storedEmail = sessionStorage.getItem("authEmail");
    setHasToken(Boolean(storedToken));
    setAuthEmail(storedEmail || "");
  }, []);

  const isDailyLimitReached = dailyCount >= dailyLimit;

  const onSubmit = async (data) => {
    setStatusMessage(null);

    const token =
      typeof window !== "undefined" ? sessionStorage.getItem("token") : null;

    if (!token) {
      setStatusMessage({
        type: "error",
        text: "Please connect Gmail first.",
      });
      return;
    }

    const emailsThisBatch = Array.isArray(data.companies)
      ? data.companies.length
      : 0;
    const remainingToday = dailyLimit - dailyCount;

    if (emailsThisBatch <= 0) {
      setStatusMessage({
        type: "error",
        text: "Add at least one company before sending.",
      });
      return;
    }

    if (emailsThisBatch > remainingToday) {
      setStatusMessage({
        type: "error",
        text:
          remainingToday <= 0
            ? `You have reached today's limit of ${dailyLimit} emails. Please try again tomorrow.`
            : `You can send only ${remainingToday} more email(s) today (limit ${dailyLimit}).`,
      });
      return;
    }

    setSubmittingCompanyCount(emailsThisBatch);
    setIsSubmitting(true);

    try {
      const commonResumeFile =
        data.commonResume && data.commonResume[0] ? data.commonResume[0] : null;

      const emails = data.companies.map((company) => ({
        to: company.email,
        subject: company.subject,
        body: company.message,
      }));

      const formData = new FormData();

      if (commonResumeFile) {
        formData.append("resume", commonResumeFile);
      }

      formData.append("emails", JSON.stringify(emails));

      const response = await fetch(`${API_URL}/mail/send`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const responseData = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(responseData.message || "Failed to send emails");
      }

      // Update daily usage counter in localStorage
      const emailsSent = emailsThisBatch;
      setDailyCount((prev) => {
        const today = new Date().toISOString().slice(0, 10);
        const updated = prev + emailsSent;
        try {
          if (typeof window !== "undefined") {
            localStorage.setItem(
              "jobmail-daily-usage",
              JSON.stringify({ date: today, count: updated }),
            );
          }
        } catch (e) {
          console.error("Failed to write daily usage to localStorage", e);
        }
        return updated;
      });

      setStatusMessage({
        type: "success",
        text: responseData.message || "Emails sent successfully",
      });

      reset();
    } catch (error) {
      console.error("Error submitting form:", error);

      setStatusMessage({
        type: "error",
        text: error.message || "Failed to send emails",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleGoogleClick = async () => {
    setStatusMessage(null);
    if (typeof window === "undefined") return;

    try {
      const response = await fetch(`${API_URL}/auth/google`);
      const data = await response.json();
      if (data.redirect) {
        window.location.href = data.redirect;
      }
    } catch (error) {
      console.error("Error initiating Google authentication:", error);
      setStatusMessage({
        type: "error",
        text: "Failed to initiate Google authentication",
      });
    }
  };

  const handleDisconnect = () => {
    if (typeof window === "undefined") return;
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("authEmail");
    setHasToken(false);
    setAuthEmail("");
    setStatusMessage({
      type: "success",
      text: "Disconnected Gmail session on this browser.",
    });
  };

  return (
    <div className="w-full bg-white p-6 sm:p-10 relative">
      <div className="mb-8">
        <h2 className="text-3xl font-black text-[#1E1E1E] tracking-tight">
          Email Automation
        </h2>
        <p className="text-gray-500 text-sm mt-1 font-medium">
          Configure your outreach campaign
        </p>
        <p className="mt-3 text-sm sm:text-base font-extrabold text-red-900 bg-red-200 border-2 border-red-600 rounded-xl px-4 py-3 shadow-lg shadow-red-500/30">
          Caution: For account safety, do not send more than 20 emails per day
          from one Gmail address.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-3 rounded-2xl border-2 border-gray-100 bg-gray-50 p-4">
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Gmail Connection
            </p>
            {hasToken && (
              <button
                type="button"
                onClick={handleDisconnect}
                className="text-[10px] font-black text-red-500 uppercase tracking-tighter hover:underline"
              >
                Disconnect
              </button>
            )}
          </div>

          <button
            type="button"
            onClick={handleGoogleClick}
            aria-label="Continue with Google"
            className="inline-flex w-full items-center justify-center gap-3 rounded-2xl border-2 border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-[#1E1E1E] shadow-sm transition-all hover:border-gray-300 hover:bg-gray-50 active:scale-[0.99] focus:outline-none focus:ring-4 focus:ring-[#FF7F11]/20"
          >
            <svg className="h-5 w-5" viewBox="0 0 18 18" aria-hidden="true">
              <path fill="#4285F4" d="M17.64 9.2045c0-.6382-.0573-1.2518-.1636-1.8409H9v3.4818h4.8436a4.1402 4.1402 0 0 1-1.7972 2.7164v2.2582h2.9089c1.7026-1.5673 2.6847-3.8764 2.6847-6.6155z" />
              <path fill="#34A853" d="M9 18c2.43 0 4.4673-.8064 5.9564-2.1791l-2.9089-2.2582c-.8064.54-1.8368.8591-3.0475.8591-2.3433 0-4.3275-1.5827-5.0351-3.7109H.9573v2.332c1.481 2.9418 4.5273 4.9571 8.0427 4.9571z" />
              <path fill="#FBBC05" d="M3.9649 10.7109A5.4097 5.4097 0 0 1 3.6832 9c0-.5932.1019-1.1709.2817-1.7109v-2.332H.9573A8.9957 8.9957 0 0 0 0 9c0 1.4523.3482 2.8273.9573 4.0438l3.0076-2.3329z" />
              <path fill="#EA4335" d="M9 3.5782c1.3214 0 2.5078.4541 3.4405 1.3459l2.5805-2.5805C13.4636.8918 11.4264 0 9 0 5.4846 0 2.4382 2.0155.9573 4.9573l3.0076 2.332c.7077-2.1282 2.6918-3.7109 5.0351-3.7109z" />
            </svg>
            Continue with Google
          </button>

          <p
            className={`text-xs font-semibold rounded-xl px-3 py-2 border ${
              hasToken
                ? "text-emerald-700 bg-emerald-50 border-emerald-200"
                : "text-amber-800 bg-amber-50 border-amber-200"
            }`}
          >
            {hasToken
              ? `Connected${authEmail ? ` as ${authEmail}` : ""}`
              : "Not connected. Connect Gmail before sending."}
          </p>

          <p className="text-[11px] text-gray-500 ml-1 font-medium">
            You no longer need an app password. Authentication is handled via
            Google OAuth.
          </p>

          <div className="ml-1">
            <Link
              href="/guide"
              target="_blank"
              className="text-[10px] font-black text-[#FF7F11] uppercase tracking-tighter hover:underline"
            >
              Need help with setup?
            </Link>
          </div>
        </div>

        {/* Common Resume (now mandatory) */}
        <div className="space-y-2">
          <label
            htmlFor="commonResume"
            className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1"
          >
            Resume
          </label>
          <input
            id="commonResume"
            type="file"
            accept=".pdf,.doc,.docx"
            {...register("commonResume", { required: "Resume is required" })}
            className="block w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-4 py-2 text-xs font-medium transition-all focus:border-[#FF7F11] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF7F11]/10 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#1E1E1E] file:text-white file:hover:bg-[#FF7F11]"
          />
          {errors.commonResume && (
            <p className="text-[10px] font-bold text-red-500 ml-1">
              {errors.commonResume.message}
            </p>
          )}
        </div>

        {/* Company Containers */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
              Companies (Recipients)
            </label>
          </div>

          {companyFields.map((field, index) => (
            <div
              key={field.id}
              className="space-y-4 rounded-2xl border-2 border-gray-100 bg-gray-50 p-4 relative"
            >
              <div className="flex items-center justify-between mb-1">
                <p className="text-xs font-black uppercase tracking-wider text-gray-500">
                  Company {index + 1}
                </p>
                {companyFields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeCompany(index)}
                    className="text-[10px] font-black text-red-500 uppercase tracking-tighter hover:underline"
                  >
                    Remove
                  </button>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* It can be used when we need to send the email with dynamic value (name )          */}
                {/* <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
                                        Name (Company / HR)
                                    </label>
                                    <input
                                        type="text"
                                        placeholder="Acme Corp / John Doe"
                                        {...register(`companies.${index}.name`)}
                                        className="block w-full rounded-2xl border-2 border-gray-100 bg-white px-4 py-3 text-sm font-medium transition-all focus:border-[#FF7F11] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF7F11]/10"
                                    />
                                </div> */}

                {/* <div className="flex items-center md:items-end gap-2 mt-2 md:mt-6">
                                    <input
                                        id={`companies-${index}-isCompanyName`}
                                        type="checkbox"
                                        {...register(`companies.${index}.isCompanyName`)}
                                        className="h-4 w-4 rounded border-gray-300 text-[#FF7F11] focus:ring-[#FF7F11]"
                                    />
                                    <label
                                        htmlFor={`companies-${index}-isCompanyName`}
                                        className="text-[11px] font-bold uppercase tracking-wider text-gray-500"
                                    >
                                        Is company name?
                                    </label>
                                </div> */}
              </div>

              {/* Specific resume upload for each company, if they want to override the common resume. This is optional. */}

              {/* <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
                                    Specific Resume (optional)
                                </label>
                                <input
                                    type="file"
                                    accept=".pdf,.doc,.docx"
                                    {...register(`companies.${index}.resume`)}
                                    className="block w-full rounded-2xl border-2 border-gray-100 bg-white px-4 py-2 text-xs font-medium transition-all focus:border-[#FF7F11] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF7F11]/10 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#1E1E1E] file:text-white file:hover:bg-[#FF7F11]"
                                />
                                <p className="text-[10px] text-gray-500 ml-1 font-medium">
                                    By default this company will use the common resume. Upload a specific resume here only if you want to override it.
                                </p>
                            </div> */}

              {/* Job description field is removed for now, but can be added back in the future if needed. We can also consider adding an AI generation feature for it later on. */}
              {/* <div className="space-y-2">
                                <div className="flex items-center justify-between">
                                    <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
                                        Job Description (for this company)
                                    </label>
                                    <button
                                        type="button"
                                        className="text-[10px] font-black text-[#FF7F11] uppercase tracking-tighter hover:underline"
                                    >
                                        Generate with AI
                                    </button>
                                </div>
                                <textarea
                                    rows="4"
                                    placeholder="Paste the job description for this company here..."
                                    {...register(`companies.${index}.jobDescription`)}
                                    className="block w-full rounded-2xl border-2 border-gray-100 bg-white px-4 py-3 text-xs font-medium transition-all focus:border-[#FF7F11] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF7F11]/10 resize-none"
                                />
                            </div> */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
                    Company Email
                  </label>
                  <input
                    type="email"
                    placeholder="company@example.com"
                    {...register(`companies.${index}.email`, {
                      required: "Email is required",
                      validate: (value) =>
                        isValidEmail(value) ||
                        "Please enter a valid email address",
                    })}
                    className="block w-full rounded-2xl border-2 border-gray-100 bg-white px-4 py-3 text-sm font-medium transition-all focus:border-[#FF7F11] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF7F11]/10"
                  />
                  {errors.companies?.[index]?.email && (
                    <p className="text-[10px] font-bold text-red-500 ml-1">
                      {errors.companies[index].email.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    placeholder="Application for [Job Title]"
                    {...register(`companies.${index}.subject`, {
                      required: "Subject is required",
                    })}
                    className="block w-full rounded-2xl border-2 border-gray-100 bg-white px-4 py-3 text-sm font-medium transition-all focus:border-[#FF7F11] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF7F11]/10"
                  />
                  {errors.companies?.[index]?.subject && (
                    <p className="text-[10px] font-bold text-red-500 ml-1">
                      {errors.companies[index].subject.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
                  Message Body
                </label>
                <textarea
                  rows="4"
                  placeholder="I am writing to express my interest in the [Job Title] position at ..."
                  {...register(`companies.${index}.message`, {
                    required: "Message is required",
                  })}
                  className="block w-full rounded-2xl border-2 border-gray-100 bg-white px-4 py-3 text-sm font-medium transition-all focus:border-[#FF7F11] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF7F11]/10 resize-none"
                />
                {errors.companies?.[index]?.message && (
                  <p className="text-[10px] font-bold text-red-500 ml-1">
                    {errors.companies[index].message.message}
                  </p>
                )}
              </div>
            </div>
          ))}

          <div className="flex flex-col items-center pt-2 space-y-1">
            <button
              type="button"
              disabled={companyFields.length >= maxCompanies}
              onClick={() => {
                if (companyFields.length < maxCompanies) {
                  appendCompany({ email: "", subject: "", message: "" });
                }
              }}
              className={`flex items-center justify-center w-40 h-16 border-2 border-dashed rounded-2xl text-[11px] font-black uppercase tracking-widest transition-colors ${
                companyFields.length >= maxCompanies
                  ? "border-gray-300 text-gray-400 bg-gray-50 cursor-not-allowed"
                  : "border-[#FF7F11] text-[#FF7F11] bg-white hover:bg-[#FFF3E6]"
              }`}
            >
              {companyFields.length >= maxCompanies
                ? "Limit Reached (10)"
                : "+ Add Company"}
            </button>
            {/* <p className="text-[10px] text-gray-400 font-medium">
              You can add up to 10 companies per batch.
            </p> */}
          </div>
        </div>

        {/* Submit Button */}
        {statusMessage && (
          <p
            className={`text-xs font-bold mt-1 ml-1 ${
              statusMessage.type === "success"
                ? "text-emerald-600"
                : "text-red-500"
            }`}
          >
            {statusMessage.text}
          </p>
        )}

        <button
          type="submit"
          disabled={isSubmitting || isDailyLimitReached || !hasToken}
          className={`w-full rounded-2xl px-6 py-4 text-sm font-black text-white transition-all transform active:scale-[0.98] mt-4 uppercase tracking-widest shadow-xl shadow-[#FF7F11]/20 hover:shadow-black/20 ${
            isSubmitting || isDailyLimitReached || !hasToken
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#FF7F11] hover:bg-[#1E1E1E]"
          }`}
        >
          {isSubmitting
            ? "Sending…"
            : isDailyLimitReached
              ? `Daily limit reached (${dailyLimit})`
              : !hasToken
                ? "Connect Gmail to Continue"
              : "Send Mails"}
        </button>
      </form>

      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-red-50 rounded-3xl px-8 py-6 shadow-2xl border border-red-200 max-w-xs w-full text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-red-300/50"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-red-600 border-transparent animate-spin"></div>
              </div>
            </div>
            <p className="text-sm font-black text-red-800 mb-1">
              Scheduling your emails…
            </p>
            <p className="text-xs text-red-700 leading-relaxed">
              This may take a few moments. You can relax while we carefully
              prepare and queue your messages.
            </p>
            {submittingCompanyCount > 0 && (
              <p className="text-[11px] text-red-700 leading-relaxed mt-2">
                Estimated time: about {submittingCompanyCount * 2}–
                {submittingCompanyCount * 3} seconds for {submittingCompanyCount}{" "}
                {submittingCompanyCount === 1 ? "company" : "companies"}.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
