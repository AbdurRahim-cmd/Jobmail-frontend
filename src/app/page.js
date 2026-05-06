import Link from 'next/link';
import MainNavbar from '../components/MainNavbar';
import MainFooter from '../components/MainFooter';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#FDF8E1] text-[#1E1E1E] font-sans">
      <MainNavbar />

      <main>
        {/* Hero Section */}
        <section className="pt-20 pb-32 px-4 sm:px-6 lg:px-8">
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
            <Link
              href="/form"
              className="inline-flex items-center justify-center gap-2 bg-[#FF7F11] text-white px-8 py-4 rounded-2xl text-sm font-black hover:bg-[#1E1E1E] transition-all active:scale-95 shadow-lg shadow-[#FF7F11]/20 uppercase tracking-widest"
            >
              Start Now
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </section>
      </main>

      <MainFooter />
    </div>
  );
}
