// 'use client';

import SimpleForm from '../form';
import MainNavbar from '../../components/MainNavbar';
import MainFooter from '../../components/MainFooter';

export default function FormPage() {
  return (
    <div className="min-h-screen bg-[#FDF8E1] text-[#1E1E1E] font-sans">
      <MainNavbar />

      <main>
        {/* Form Section */}
        <section id="form" className="py-32 px-4 sm:px-6 lg:px-8 relative">
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
