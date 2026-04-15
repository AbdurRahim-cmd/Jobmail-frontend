'use client';

import SimpleForm from './form';
import MainNavbar from '../components/MainNavbar';
import MainFooter from '../components/MainFooter';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDF8E1] text-[#1E1E1E] font-sans">
      <MainNavbar />

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
              </div>
              <div className="p-2">
                <SimpleForm />
              </div>
            </div>
          </div>
        </section>
      </main>

      <MainFooter />
    </div>
  );
}
