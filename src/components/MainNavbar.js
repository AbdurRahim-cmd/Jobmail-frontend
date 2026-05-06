import Link from 'next/link';

export default function MainNavbar() {
  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-[#F6EFD4] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center gap-3">
          <div className="flex items-center gap-2">
            <div className="bg-[#FF7F11] p-2 rounded-lg text-white">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </div>
            <span className="text-2xl font-black text-[#1E1E1E]">Jobmail</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-semibold hover:text-[#FF7F11] transition-colors">
              Home
            </Link>
            <Link href="/guide" className="text-sm font-semibold hover:text-[#FF7F11] transition-colors">
              Guide
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
