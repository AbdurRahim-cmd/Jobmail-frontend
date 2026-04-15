'use client';

import Link from 'next/link';
import { useState } from 'react';
import MainNavbar from '../../components/MainNavbar';
import MainFooter from '../../components/MainFooter';

export default function GuidePage() {
    const [selectedImage, setSelectedImage] = useState(null);

    const steps = [
        {
            id: "step-1",
            title: "Step 1: Enable 2-Step Verification",
            badge: "Required",
            description: (
                <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                        Before you can set up SMTP with Gmail, you must turn on 2-Step Verification in your Google account. This is required by Google in order to generate an app password.
                    </p>
                    <div className="bg-[#FF7F11]/10 border-l-4 border-[#FF7F11] p-4 rounded-r-xl">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-[#FF7F11]" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-[#1E1E1E] font-bold">
                                    Important: Two-Step Verification must be enabled to use App Passwords.
                                </p>
                            </div>
                        </div>
                    </div>
                    <ol className="list-decimal list-inside space-y-2 text-[#1E1E1E] font-medium">
                        <li>Go to your Google Account 👉 <a href="https://myaccount.google.com/security" target="_blank" rel="noopener noreferrer" className="text-[#FF7F11] hover:underline font-bold">myaccount.google.com/security</a></li>
                        <li>In the Security tab, scroll down to the <b>“How you sign in to Google”</b> section</li>
                        <li>Click <b>2-Step Verification</b> and follow the steps to turn it on</li>
                        <li>Verify your identity and choose your verification method (phone, authenticator, etc.)</li>
                    </ol>
                </div>
            ),
            image: "/step 1.png",
            alt: "Google Account Security Settings"
        },
        {
            id: "step-2",
            title: "Step 2: Generate an App Password",
            badge: "Required",
            description: (
                <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                        An App Password is a 16-digit passcode that gives a less secure app or device permission to access your Google Account.
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-[#1E1E1E] font-medium">
                        <li>In the same <b>2-Step Verification</b> section, scroll to the bottom and click on <b>App passwords</b></li>
                        <li>Select <b>Mail</b> as the app and <b>Other (Custom name)</b> for the device</li>
                        <li>Enter a name like <b>“Jobmail”</b> and click <b>Generate</b></li>
                    </ol>
                </div>
            ),
            image: "/step 2.png",
            alt: "App Password Settings"
        },
        {
            id: "step-3",
            title: "Step 3: Name & Generate",
            badge: "",
            description: (
                <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                        Enter a descriptive name for your app so you can manage it later.
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-[#1E1E1E] font-medium">
                        <li>Type <b>Jobmail</b> in the custom name field</li>
                        <li>Click the <b>Create</b> or <b>Generate</b> button</li>
                    </ol>
                </div>
            ),
            image: "/step 3.png",
            alt: "Naming the App"
        },
        {
            id: "step-4",
            title: "Step 4: Copy Your Password",
            badge: "Recomended",
            description: (
                <div className="space-y-4">
                    <p className="text-gray-600 leading-relaxed">
                        Your app password will be displayed in a yellow box.
                    </p>
                    <ol className="list-decimal list-inside space-y-2 text-[#1E1E1E] font-medium">
                        <li><b>Copy</b> the 16-character code shown (no spaces)</li>
                        <li>Click <b>Done</b></li>
                    </ol>
                    <div className="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl">
                        <p className="text-sm text-amber-900 font-bold">
                          Note: Keep this password handy—you’ll need it for the form. This is NOT your regular Gmail password.
                        </p>
                    </div>
                </div>
            ),
            image: "/final step.png",
            alt: "Copy App Password"
        }
    ];

    return (
        <div className="min-h-screen bg-[#FDF8E1] text-[#1E1E1E] font-sans">
            <MainNavbar />

            <div className="max-w-4xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
                <header className="text-center mb-16">
                    <div className="inline-block px-4 py-1.5 rounded-full bg-[#FF7F11]/10 text-[#FF7F11] text-xs font-black uppercase mb-4">
                        Step-by-Step Instructions
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-[#1E1E1E] mb-4 leading-tight">
                        Set up SMTP for Gmail
                    </h1>
                    <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed font-medium">
                        Follow these steps to securely connect your Gmail account and Get App Password.
                    </p>
                </header>

                <div className="mb-12 bg-[#FF7F11]/5 rounded-3xl p-6 border border-[#FF7F11]/10 flex flex-col md:flex-row items-center justify-between gap-4 group transition-all shadow-sm">
                    <div className="flex items-center space-x-5">
                        <div className="bg-[#FF7F11] p-3 rounded-2xl text-white shadow-lg shadow-[#FF7F11]/20">
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
                        </div>
                        <div>
                            <h3 className="text-[#1E1E1E] font-black text-lg">Direct Shortcut</h3>
                            <p className="text-gray-500 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                                Jump to settings
                                <span className="px-2 py-0.5 rounded bg-[#FF7F11]/10 text-[10px] text-[#FF7F11]">
                                    Click Only 2FA is turned on
                                </span>
                            </p>
                        </div>
                    </div>
                    <a
                        href="https://myaccount.google.com/apppasswords"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full md:w-auto bg-[#FF7F11] text-white px-6 py-3 rounded-xl font-black text-xs hover:bg-[#1E1E1E] transition-all flex items-center justify-center uppercase tracking-widest active:scale-95"
                    >
                        Go to App Passwords
                        <svg className="w-3 h-3 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                    </a>
                </div>

                <div className="bg-white shadow-2xl shadow-black/5 rounded-[3rem] overflow-hidden border border-[#F6EFD4]">
                    <div className="p-8 sm:p-12 space-y-24">
                        {steps.map((step) => (
                            <section key={step.id} className="relative space-y-8">
                                {/* Step title and badge row */}
                                <div className="flex items-center gap-3">
                                    <h2 className="text-2xl font-black text-[#1E1E1E]">{step.title}</h2>
                                    {step.badge && (
                                        <span
                                            className={`inline-block px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                                                step.badge === 'Required'
                                                    ? 'bg-red-500 text-white'
                                                    : 'bg-[#FF7F11] text-white'
                                            }`}
                                        >
                                            {step.badge}
                                        </span>
                                    )}
                                </div>

                                {/* Centered image */}
                                <div className="flex justify-center">
                                    <div
                                        className="relative aspect-video max-w-2xl w-full rounded-[2rem] overflow-hidden bg-gray-50 border-2 border-[#F6EFD4] flex items-center justify-center group hover:border-[#FF7F11] transition-all cursor-zoom-in shadow-inner"
                                        onClick={() => setSelectedImage(step.image)}
                                    >
                                        <img
                                            src={step.image}
                                            alt={step.alt}
                                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                        />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-[#1E1E1E]/5 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                            <div className="bg-white/90 text-[#1E1E1E] px-4 py-2 rounded-xl text-[10px] font-black uppercase shadow-xl tracking-widest">
                                                Click to enlarge
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Step details */}
                                <div className="prose prose-slate max-w-none text-[#1E1E1E]">
                                    {step.description}
                                </div>
                            </section>
                        ))}
                    </div>
                </div>

                <footer className="mt-20 text-center py-12 border-t border-[#F6EFD4]">
                    <p className="text-gray-500 font-bold mb-4">Still have questions?</p>
                    <a
                        href="https://support.google.com/mail"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 bg-[#1E1E1E] text-white px-6 py-3 rounded-full text-sm font-black hover:bg-[#FF7F11] transition-all active:scale-95 shadow-lg shadow-black/10"
                    >
                        Visit Official Gmail Support
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                    </a>
                </footer>
            </div>

            {/* Image Modal */}
            {selectedImage && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-[#1E1E1E]/95 p-6 backdrop-blur-md animate-in fade-in duration-300"
                    onClick={() => setSelectedImage(null)}
                >
                    <div className="relative max-w-6xl w-full max-h-[90vh] flex items-center justify-center animate-in zoom-in-95 duration-300">
                        <button
                            className="absolute -top-16 right-0 text-white hover:text-[#FF7F11] transition-colors p-3 bg-white/5 rounded-full hover:bg-white/10"
                            onClick={(e) => {
                                e.stopPropagation();
                                setSelectedImage(null);
                            }}
                        >
                            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M6 18L18 6M6 6l12 12" /></svg>
                        </button>
                        <img
                            src={selectedImage}
                            alt="Full size guide"
                            className="max-w-full max-h-[85vh] object-contain rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-white/10"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                </div>
            )}
            <MainFooter />
        </div>
    );
}
