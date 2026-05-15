import Logo from "../ui/Logo";

export default function Footer() {
  return (
    <footer className="border-t border-[#E2E8F0] bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Logo size="sm" />

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-[#475569]">
            <a href="#" className="hover:text-[#0F172A] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#0F172A] transition-colors">Terms</a>
            <a href="#" className="hover:text-[#0F172A] transition-colors">Contact</a>
          </nav>

          <p className="text-xs text-[#475569]">
            © {new Date().getFullYear()} Jobmail. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
