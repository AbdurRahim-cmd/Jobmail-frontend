'use client';

import SimpleForm from './form';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDF8E1] text-[#1E1E1E] font-sans">
      {/* Navbar */}
      <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-[#F6EFD4] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center gap-2">
              <div className="bg-[#FF7F11] p-2 rounded-lg text-white">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-2xl font-black text-[#1E1E1E]">Jobmail</span>
            </div>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/" className="text-sm font-semibold hover:text-[#FF7F11] transition-colors">Home</Link>
              <Link href="/guide" className="text-sm font-semibold hover:text-[#FF7F11] transition-colors">Guide</Link>
              <button className="bg-[#1E1E1E] text-white px-5 py-2 rounded-full text-sm font-bold hover:bg-[#FF7F11] transition-all transform hover:scale-105 active:scale-95 shadow-lg shadow-black/10">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main>
        {/* Hero Section */}
        <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF7F11]/10 border border-[#FF7F11]/20 text-[#FF7F11] text-xs font-bold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF7F11] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF7F11]"></span>
              </span>
              Powering Tomorrow's Job Search
            </div>
            <h1 className="text-5xl md:text-7xl font-black text-[#1E1E1E] mb-6 leading-tight">
              Automate Your <span className="text-[#FF7F11]">Job Emails</span> <br className="hidden md:block" /> with Precision.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-10">
              Jobmail helps you send personalized outreach to companies in bulk, while maintaining that direct, human touch. Secure, fast, and built for builders.
            </p>
          </div>
        </section>

        {/* Form Section */}
        <section id="waitlist" className="pb-32 px-4 sm:px-6 lg:px-8 relative">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-[500px] bg-gradient-to-b from-[#FF7F11]/5 to-transparent rounded-[3rem] blur-3xl -z-10"></div>
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-black/5 border border-[#F6EFD4] overflow-hidden">
              <div className="bg-[#1E1E1E] px-8 py-4 flex items-center justify-between">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-amber-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-emerald-500/50"></div>
                </div>
                <span className="text-white/40 text-xs font-mono uppercase">Jobmail Cloud Messenger</span>
              </div>
              <div className="p-2">
                <SimpleForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-[#1E1E1E] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-2">
            <div className="bg-[#FF7F11] p-1.5 rounded-lg text-white">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <span className="text-xl font-black">Jobmail</span>
          </div>
          <div className="flex items-center gap-6 text-sm text-gray-400">
            <Link href="/guide" className="hover:text-[#FF7F11] transition-colors">Documentation</Link>
            <a href="#" className="hover:text-[#FF7F11] transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-[#FF7F11] transition-colors">Terms of Service</a>
          </div>
          <p className="text-xs text-gray-500">
            © 2026 Jobmail Space. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
