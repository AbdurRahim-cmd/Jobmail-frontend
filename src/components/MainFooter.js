import Link from 'next/link';

export default function MainFooter() {
  return (
    <footer className="bg-[#1E1E1E] text-white py-12 px-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="flex items-center gap-2">
          <div className="bg-[#FF7F11] p-1.5 rounded-lg text-white">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
          <span className="text-xl font-black">Jobmail</span>
        </div>
        <div className="flex items-center gap-6 text-sm text-gray-400">
          <Link href="/guide" className="hover:text-[#FF7F11] transition-colors">
            Documentation
          </Link>
          <a href="#" className="hover:text-[#FF7F11] transition-colors">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-[#FF7F11] transition-colors">
            Terms of Service
          </a>
        </div>
        <p className="text-xs text-gray-500">© 2026 Jobmail Space. All rights reserved.</p>
      </div>
    </footer>
  );
}
