"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import axios from "axios";
import Link from "next/link";

export default function SimpleForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

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

  const onSubmit = async (data) => {
    setStatusMessage(null);
    setIsSubmitting(true);

    try {
      const commonResumeFile =
        data.commonResume && data.commonResume[0] ? data.commonResume[0] : null;

      // 🔥 Prepare companies (NO file here)
      const companies = data.companies.map((company) => ({
        email: company.email,
        subject: company.subject,
        message: company.message,
      }));

      // 🔥 Create FormData
      const formData = new FormData();

      formData.append("senderEmail", data.senderEmail);
      formData.append("senderPassword", data.senderPassword);

      // file
      if (commonResumeFile) {
        formData.append("resume", commonResumeFile);
      }

      // IMPORTANT: stringify companies
      formData.append("companies", JSON.stringify(companies));

      // 🔥 API call
      const response = await axios.post(
        "http://localhost:5000/send-email",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );

      console.log("Success:", response.data);

      setStatusMessage({
        type: "success",
        text: "Emails sent successfully!",
      });

      reset();
    } catch (error) {
      console.error("Error submitting form:", error);

      setStatusMessage({
        type: "error",
        text: "Failed to send emails",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
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
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Field 1: Email */}
          <div className="space-y-2">
            <label
              htmlFor="Email"
              className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1"
            >
              Sender Email
            </label>
            <input
              id="Email"
              type="email"
              placeholder="your.email@gmail.com"
              {...register("senderEmail", { required: "Email is required" })}
              className="block w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium transition-all focus:border-[#FF7F11] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF7F11]/10"
            />
            {errors.senderEmail && (
              <p className="text-[10px] font-bold text-red-500 ml-1">
                {errors.senderEmail.message}
              </p>
            )}
          </div>

          {/* Field 2: Password */}
          <div className="space-y-2">
            <div className="flex justify-between items-center ml-1">
              <label
                htmlFor="Password"
                className="text-xs font-bold uppercase tracking-wider text-gray-400"
              >
                App Password
              </label>
              <Link
                href="/guide"
                target="_blank"
                className="text-[10px] font-black text-[#FF7F11] uppercase tracking-tighter hover:underline"
              >
                How to get this ?
              </Link>
            </div>
            <input
              id="Password"
              type="password"
              placeholder="•••• •••• •••• ••••"
              {...register("senderPassword", {
                required: "Password is required",
              })}
              className="block w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium transition-all focus:border-[#FF7F11] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF7F11]/10"
            />
            {errors.senderPassword && (
              <p className="text-[10px] font-bold text-red-500 ml-1">
                {errors.senderPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Common Resume (applied to all companies by default) */}
        <div className="space-y-2">
          <label
            htmlFor="commonResume"
            className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1"
          >
            Common Resume
          </label>
          <input
            id="commonResume"
            type="file"
            accept=".pdf,.doc,.docx"
            {...register("commonResume")}
            className="block w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-4 py-2 text-xs font-medium transition-all focus:border-[#FF7F11] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF7F11]/10 file:mr-4 file:py-1.5 file:px-3 file:rounded-full file:border-0 file:text-xs file:font-bold file:bg-[#1E1E1E] file:text-white file:hover:bg-[#FF7F11]"
          />
          <p className="text-[10px] text-gray-500 ml-1 font-medium">
            This resume will be used for all companies by default. You can
            override it with a specific resume inside each company container.
          </p>
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

          <div className="flex justify-end pt-2">
            <button
              type="button"
              onClick={() =>
                appendCompany({ email: "", subject: "", message: "" })
              }
              className="text-[10px] font-black text-[#FF7F11] uppercase tracking-tighter hover:underline"
            >
              + Add Company
            </button>
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
          disabled={isSubmitting}
          className={`w-full rounded-2xl px-6 py-4 text-sm font-black text-white transition-all transform active:scale-[0.98] mt-4 uppercase tracking-widest shadow-xl shadow-[#FF7F11]/20 hover:shadow-black/20 ${
            isSubmitting
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-[#FF7F11] hover:bg-[#1E1E1E]"
          }`}
        >
          {isSubmitting ? "Sending…" : "Send Mails"}
        </button>
      </form>

      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
          <div className="bg-white rounded-3xl px-8 py-6 shadow-2xl border border-[#F6EFD4] max-w-xs w-full text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="relative w-12 h-12">
                <div className="absolute inset-0 rounded-full border-4 border-[#FF7F11]/30"></div>
                <div className="absolute inset-0 rounded-full border-4 border-t-[#FF7F11] border-transparent animate-spin"></div>
              </div>
            </div>
            <p className="text-sm font-black text-[#1E1E1E] mb-1">
              Scheduling your emails…
            </p>
            <p className="text-xs text-gray-500 leading-relaxed">
              This may take a few moments. You can relax while we carefully
              prepare and queue your messages.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
