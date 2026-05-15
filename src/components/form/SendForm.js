"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { useForm, useFieldArray } from "react-hook-form";
import { API_URL } from "@/config/api";
import {
  startGoogleOAuth,
  getToken,
  getAuthEmail,
  clearSession,
  consumeAuthFromUrl,
} from "@/lib/auth";

import Card from "../ui/Card";
import Button from "../ui/Button";
import Alert from "../ui/Alert";
import Spinner from "../ui/Spinner";
import { FileInput } from "../ui/Input";
import ConnectionPanel from "./ConnectionPanel";
import CompanyCard from "./CompanyCard";

const DAILY_LIMIT = 20;
const MAX_COMPANIES = 20;
const STORAGE_KEY = "jobmail-daily-usage";

const EMPTY_COMPANY = { email: "", subject: "", message: "" };

function readDailyCount() {
  if (typeof window === "undefined") return 0;
  try {
    const today = new Date().toISOString().slice(0, 10);
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: 0 }));
      return 0;
    }
    const parsed = JSON.parse(raw);
    if (parsed?.date === today && typeof parsed.count === "number") return parsed.count;
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count: 0 }));
    return 0;
  } catch {
    return 0;
  }
}

function writeDailyCount(count) {
  if (typeof window === "undefined") return;
  const today = new Date().toISOString().slice(0, 10);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ date: today, count }));
  } catch {}
}

export default function SendForm() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState(null);
  const [dailyCount, setDailyCount] = useState(0);
  const [batchSize, setBatchSize] = useState(0);
  const [authEmail, setAuthEmail] = useState("");
  const [connected, setConnected] = useState(false);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: { companies: [EMPTY_COMPANY], commonResume: null },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "companies" });

  useEffect(() => {
    setDailyCount(readDailyCount());

    const incoming = consumeAuthFromUrl();
    if (incoming) {
      setConnected(true);
      setAuthEmail(incoming.email);
      setStatus({ tone: "success", text: "Google Account Connected Successfully." });
      return;
    }
    setConnected(Boolean(getToken()));
    setAuthEmail(getAuthEmail());
  }, []);

  const handleDisconnect = useCallback(() => {
    clearSession();
    setConnected(false);
    setAuthEmail("");
    router.push("/");
  }, [router]);

  const remaining = DAILY_LIMIT - dailyCount;
  const limitReached = remaining <= 0;

  const onSubmit = async (data) => {
    setStatus(null);

    const token = getToken();
    if (!token) {
      setStatus({ tone: "error", text: "Please Connect Google First." });
      return;
    }

    const emails = (data.companies || []).map((c) => ({
      to: c.email,
      subject: c.subject,
      body: c.message,
    }));

    if (!emails.length) {
      setStatus({ tone: "error", text: "Add At Least One Company Before Sending." });
      return;
    }

    if (emails.length > remaining) {
      setStatus({
        tone: "error",
        text: limitReached
          ? `You Have Reached Today's Limit Of ${DAILY_LIMIT} Emails. Please Try Again Tomorrow.`
          : `You Can Send Only ${remaining} More Email(s) Today.`,
      });
      return;
    }

    setBatchSize(emails.length);
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      const resumeFile = data.commonResume?.[0];
      if (resumeFile) formData.append("resume", resumeFile);
      formData.append("emails", JSON.stringify(emails));

      const res = await fetch(`${API_URL}/mail/send`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });
      const body = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(body.message || "Failed To Send Emails");

      const updated = dailyCount + emails.length;
      setDailyCount(updated);
      writeDailyCount(updated);

      setStatus({ tone: "success", text: body.message || "Emails Sent Successfully." });
      reset({ companies: [EMPTY_COMPANY], commonResume: null });
    } catch (err) {
      setStatus({ tone: "error", text: err.message || "Failed To Send Emails." });
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitDisabled = isSubmitting || limitReached || !connected;
  const submitLabel = isSubmitting
    ? "Sending..."
    : !connected
    ? "Connect Google To Continue"
    : limitReached
    ? `Daily Limit Reached (${DAILY_LIMIT})`
    : "Send Mail";

  return (
    <>
      <Card padded={false} className="overflow-hidden">
        <div className="px-6 sm:px-8 py-6 border-b border-[#E2E8F0]">
          <h1 className="text-2xl font-semibold text-[#0F172A]">Send Mail</h1>
          <p className="mt-1 text-sm text-[#475569]">
            Fill in your campaign details. We will send each email individually from your Gmail.
          </p>
          <div className="mt-4">
            <Alert tone="warning" title="Daily Sending Limit">
              For account safety, please do not send more than {DAILY_LIMIT} emails per day from one Gmail address.
            </Alert>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="px-6 sm:px-8 py-6 space-y-8">
          <section className="space-y-3">
            <SectionHeading step={1} title="Connect Your Account" />
            <ConnectionPanel
              connected={connected}
              authEmail={authEmail}
              onConnect={startGoogleOAuth}
              onDisconnect={handleDisconnect}
            />
          </section>

          <section className="space-y-3">
            <SectionHeading step={2} title="Attach Your Resume" />
            <FileInput
              id="commonResume"
              accept=".pdf,.doc,.docx"
              hint="Accepted: PDF, DOC, DOCX. Attached to every email in this batch."
              error={errors.commonResume?.message}
              {...register("commonResume", { required: "Resume Is Required" })}
            />
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between">
              <SectionHeading step={3} title="Add Recipients" />
              <span className="text-xs font-medium text-[#475569]">
                {fields.length} / {MAX_COMPANIES}
              </span>
            </div>

            <div className="space-y-4">
              {fields.map((field, index) => (
                <CompanyCard
                  key={field.id}
                  index={index}
                  register={register}
                  errors={errors}
                  canRemove={fields.length > 1}
                  onRemove={() => remove(index)}
                />
              ))}
            </div>

            <Button
              variant="secondary"
              fullWidth
              disabled={fields.length >= MAX_COMPANIES}
              onClick={() => fields.length < MAX_COMPANIES && append(EMPTY_COMPANY)}
            >
              {fields.length >= MAX_COMPANIES
                ? `Recipient Limit Reached (${MAX_COMPANIES})`
                : "+ Add Another Company"}
            </Button>
          </section>

          {status && (
            <Alert tone={status.tone === "success" ? "success" : "error"}>
              {status.text}
            </Alert>
          )}

          <div className="pt-2 border-t border-[#E2E8F0] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <p className="text-xs text-[#475569]">
              {dailyCount} Of {DAILY_LIMIT} Emails Used Today.
            </p>
            <Button type="submit" size="lg" disabled={submitDisabled} className="sm:min-w-[200px]">
              {isSubmitting && <Spinner size={16} className="border-white/40 border-t-white" />}
              {submitLabel}
            </Button>
          </div>
        </form>
      </Card>

      {isSubmitting && <SendingOverlay batchSize={batchSize} />}
    </>
  );
}

function SectionHeading({ step, title }) {
  return (
    <div className="flex items-center gap-3">
      <span className="grid place-items-center h-7 w-7 rounded-full bg-[#2563EB]/10 text-[#1E40AF] text-xs font-semibold">
        {step}
      </span>
      <h2 className="text-base font-semibold text-[#0F172A]">{title}</h2>
    </div>
  );
}

function SendingOverlay({ batchSize }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-900/40 backdrop-blur-sm p-4 animate-fade-in-up">
      <div className="max-w-sm w-full rounded-2xl bg-white p-6 border border-[#E2E8F0] shadow-2xl text-center">
        <div className="flex justify-center mb-4">
          <Spinner size={36} />
        </div>
        <p className="text-base font-semibold text-[#0F172A]">Sending Your Emails...</p>
        <p className="mt-2 text-sm text-[#475569] leading-relaxed">
          Please keep this window open while we deliver your messages.
        </p>
        {batchSize > 0 && (
          <p className="mt-3 text-xs text-[#475569]">
            Estimated Time: {batchSize * 2}–{batchSize * 3} Seconds For {batchSize}{" "}
            {batchSize === 1 ? "Recipient" : "Recipients"}.
          </p>
        )}
      </div>
    </div>
  );
}
