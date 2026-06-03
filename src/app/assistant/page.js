"use client";

import { useEffect, useRef, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import HeroBanner from "@/components/assistant/HeroBanner";
import JdInputCard from "@/components/assistant/JdInputCard";
import ProfileInputCard from "@/components/assistant/ProfileInputCard";
import GuidedTour from "@/components/assistant/GuidedTour";
import HistorySidebar from "@/components/assistant/HistorySidebar";
import ActionPickerModal from "@/components/assistant/ActionPickerModal";
import PromptReviewModal from "@/components/assistant/PromptReviewModal";
import Button from "@/components/ui/Button";
import { addHistoryEntry } from "@/lib/jdHistory";
import { useJdHistory } from "@/hooks/useJdHistory";
import { guessCompany } from "@/lib/promptBuilder";
import { copyToClipboard } from "@/lib/clipboard";

const MIN_JD_LENGTH = 30;
const CHATGPT_URL = "https://chatgpt.com/";
const TOUR_KEY = "jobmailer_assistant_tour_v1";

export default function AssistantPage() {
  const [jd, setJd] = useState("");
  const [profile, setProfile] = useState({ name: "", qualification: "", experience: "" });
  const [action, setAction] = useState(null);
  const [prompt, setPrompt] = useState("");
  const [pickerOpen, setPickerOpen] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [opening, setOpening] = useState(false);
  const [openedMode, setOpenedMode] = useState(null);
  const [tourOpen, setTourOpen] = useState(false);

  const jdRef = useRef(null);
  const profileRef = useRef(null);
  const generateRef = useRef(null);

  const tourSteps = [
    {
      badge: "Welcome 👋",
      title: "Let's build your first prompt",
      body: "This assistant turns any job description into a recruiter-ready prompt for ChatGPT — in 3 quick steps.",
    },
    {
      ref: jdRef,
      title: "1. Paste the job description",
      body: "Drop in the JD you're applying to. You can paste, drag & drop a file, or try a sample.",
    },
    {
      ref: profileRef,
      title: "2. Add your profile",
      body: "Your name, qualification, and experience personalize every prompt. All three are required.",
    },
    {
      ref: generateRef,
      title: "3. Generate with AI",
      body: "Pick a response style — Pro Email, HR Outreach, or Find Contact Emails — and we'll prep an optimized prompt for ChatGPT.",
    },
  ];

  // Show the tour automatically on the first visit. Read on mount (not during
  // render) to avoid an SSR hydration mismatch.
  useEffect(() => {
    try {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      if (!localStorage.getItem(TOUR_KEY)) setTourOpen(true);
    } catch {}
  }, []);

  const closeTour = () => {
    setTourOpen(false);
    try {
      localStorage.setItem(TOUR_KEY, "1");
    } catch {}
  };

  const history = useJdHistory();
  const jdReady = jd.trim().length >= MIN_JD_LENGTH;
  const profileReady =
    profile.name.trim() && profile.qualification.trim() && profile.experience.trim();
  const ready = jdReady && profileReady;

  const handleOpenPicker = () => {
    if (!ready) return;
    setOpenedMode(null);
    setPickerOpen(true);
  };

  const handlePick = (a) => {
    const built = a.build(jd, profile);
    setAction(a);
    setPrompt(built);
    setOpenedMode(null);
    setPickerOpen(false);
    setReviewOpen(true);
  };

  const handleBack = () => {
    setReviewOpen(false);
    setOpenedMode(null);
    setPickerOpen(true);
  };

  const handleOpenChatGPT = async () => {
    if (!prompt) return;
    setOpening(true);

    const copied = await copyToClipboard(prompt);
    window.open(CHATGPT_URL, "_blank", "noopener,noreferrer");

    addHistoryEntry({
      jd,
      actionId: action?.id,
      label: action?.short || "Prompt",
      company: guessCompany(jd),
    });

    setOpening(false);
    setOpenedMode(copied ? "clipboard" : "manual");
  };

  const handleReopenFromHistory = (item) => {
    setJd(item.jd);
    setOpenedMode(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Navbar />
      <main className="flex-1 py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <HeroBanner />

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setTourOpen(true)}
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#E2E8F0] bg-white px-3 py-1.5 text-xs font-medium text-[#475569] hover:border-slate-300 hover:text-[#0F172A] transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/></svg>
              How it works
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6">
            <div className="space-y-5">
              <div ref={jdRef}>
                <JdInputCard value={jd} onChange={setJd} />
              </div>

              <div ref={profileRef}>
                <ProfileInputCard profile={profile} onChange={setProfile} />
              </div>

              <div ref={generateRef} className="rounded-2xl border border-[#E2E8F0] bg-gradient-to-br from-white to-slate-50 p-5">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-[#0F172A]">Ready to generate?</p>
                    <p className="mt-0.5 text-xs text-[#475569]">
                      {ready
                        ? "Pick a response style — we'll prep an optimized prompt for ChatGPT."
                        : !jdReady
                        ? `Paste at least ${MIN_JD_LENGTH} characters of a JD to continue.`
                        : "Fill in your name, qualification, and experience to continue."}
                    </p>
                  </div>
                  <Button
                    onClick={handleOpenPicker}
                    disabled={!ready}
                    className={ready ? "animate-glow-pulse" : ""}
                  >
                    Generate with AI
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
                  </Button>
                </div>
              </div>
            </div>

            <div className="lg:sticky lg:top-20 lg:self-start">
              <HistorySidebar items={history} onReopen={handleReopenFromHistory} />
            </div>
          </div>
        </div>
      </main>
      <Footer />

      <GuidedTour steps={tourSteps} open={tourOpen} onClose={closeTour} />

      <ActionPickerModal
        open={pickerOpen}
        onClose={() => setPickerOpen(false)}
        onPick={handlePick}
      />

      <PromptReviewModal
        open={reviewOpen}
        onClose={() => setReviewOpen(false)}
        action={action}
        jd={jd}
        prompt={prompt}
        onPromptChange={setPrompt}
        onBack={handleBack}
        onOpenChatGPT={handleOpenChatGPT}
        opening={opening}
        openedMode={openedMode}
      />
    </div>
  );
}
