'use client';

import { useForm, Controller } from 'react-hook-form';
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function SimpleForm() {
    const { register, handleSubmit, control, formState: { errors } } = useForm();
    const [emailInput, setEmailInput] = useState('');
    const [emailError, setEmailError] = useState('');

    const onSubmit = (data) => {
        const formattedData = {
            senderEmail: data.senderEmail,
            senderPassword: data.senderPassword,
            subject: data.subject,
            companies: data.companies.map((email) => {
                const nameMatch = email.split('@')[0].match(/^[a-zA-Z]+/);
                const name = nameMatch ? nameMatch[0] : 'there';

                return {
                    subject: data.subject,
                    email: email,
                    message: `Hi ${name},\n\n${data.message}`
                };
            })
        };
        console.log('Form Data:', formattedData);
        axios.post('http://localhost:5000/send-email', formattedData)
            .then((response) => {
                console.log('Form submitted successfully:', response.data);
                alert("Emails scheduled successfully!");
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
                alert("Failed to send emails. Check console.");
            });
    };

    const isValidEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const addEmail = (email, currentEmails, onChange) => {
        const trimmedEmail = email.trim();
        if (!trimmedEmail) return;
        if (!isValidEmail(trimmedEmail)) {
            setEmailError('Please enter a valid email address');
            return;
        }
        if (currentEmails.includes(trimmedEmail)) {
            setEmailError('This email has already been added');
            return;
        }
        onChange([...currentEmails, trimmedEmail]);
        setEmailInput('');
        setEmailError('');
    };

    const removeEmail = (emailToRemove, currentEmails, onChange) => {
        onChange(currentEmails.filter(email => email !== emailToRemove));
    };

    const handleKeyDown = (e, currentEmails, onChange) => {
        if (e.key === 'Enter' || e.key === ',' || e.key === ' ') {
            e.preventDefault();
            addEmail(emailInput, currentEmails, onChange);
        } else if (e.key === 'Backspace' && !emailInput && currentEmails.length > 0) {
            onChange(currentEmails.slice(0, -1));
            setEmailError('');
        }
    };

    const handlePaste = (e, currentEmails, onChange) => {
        e.preventDefault();
        const pastedText = e.clipboardData.getData('text');
        const emails = pastedText.split(/[\s,;]+/).filter(email => email.trim());
        emails.forEach(email => addEmail(email, currentEmails, onChange));
    };

    const handleInputChange = (e) => {
        setEmailInput(e.target.value);
        if (emailError) setEmailError('');
    };

    return (
        <div className="w-full bg-white p-6 sm:p-10">
            <div className="mb-8">
                <h2 className="text-3xl font-black text-[#1E1E1E] tracking-tight">Email Automation</h2>
                <p className="text-gray-500 text-sm mt-1 font-medium">Configure your outreach campaign</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Field 1: Email */}
                    <div className="space-y-2">
                        <label htmlFor="Email" className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
                            Sender Email
                        </label>
                        <input
                            id="Email"
                            type="email"
                            placeholder="your.email@gmail.com"
                            {...register('senderEmail', { required: 'Email is required' })}
                            className="block w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium transition-all focus:border-[#FF7F11] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF7F11]/10"
                        />
                        {errors.senderEmail && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.senderEmail.message}</p>}
                    </div>

                    {/* Field 2: Password */}
                    <div className="space-y-2">
                        <div className="flex justify-between items-center ml-1">
                            <label htmlFor="Password" className="text-xs font-bold uppercase tracking-wider text-gray-400">
                                App Password
                            </label>
                            <Link href="/guide" target="_blank" className="text-[10px] font-black text-[#FF7F11] uppercase tracking-tighter hover:underline">
                                How to get this ?
                            </Link>
                        </div>
                        <input
                            id="Password"
                            type="password"
                            placeholder="•••• •••• •••• ••••"
                            {...register('senderPassword', { required: 'Password is required' })}
                            className="block w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium transition-all focus:border-[#FF7F11] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF7F11]/10"
                        />
                        {errors.senderPassword && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.senderPassword.message}</p>}
                    </div>
                </div>

                {/* Field 3: Subject */}
                <div className="space-y-2">
                    <label htmlFor="subject" className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
                        Subject
                    </label>
                    <input
                        id="subject"
                        type="text"
                        placeholder="Application for [Job Title]"
                        {...register('subject', { required: 'Subject is required' })}
                        className="block w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium transition-all focus:border-[#FF7F11] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF7F11]/10"
                    />
                    {errors.subject && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.subject.message}</p>}
                </div>

                {/* Field 4: Message */}
                <div className="space-y-2">
                    <label htmlFor="message" className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
                        Message Body
                    </label>
                    <textarea
                        id="message"
                        rows="4"
                        placeholder=" I am writing to express my interest in the [Job Title] position at ..."
                        {...register('message', { required: 'Message is required' })}
                        className="block w-full rounded-2xl border-2 border-gray-100 bg-gray-50 px-4 py-3 text-sm font-medium transition-all focus:border-[#FF7F11] focus:bg-white focus:outline-none focus:ring-4 focus:ring-[#FF7F11]/10 resize-none"
                    />
                    {errors.message && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.message.message}</p>}
                </div>

                {/* Field 5: Company Emails */}
                <Controller
                    name="companies"
                    control={control}
                    defaultValue={[]}
                    rules={{
                        validate: (value) => value.length > 0 || 'Please add at least one recipient'
                    }}
                    render={({ field: { onChange, value } }) => (
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-400 ml-1">
                                Recipient List (Companies)
                            </label>
                            <div className={`min-h-[100px] flex flex-wrap gap-2 rounded-2xl border-2 p-4 transition-all bg-gray-50 ${emailError || errors.companies
                                ? 'border-red-500 ring-4 ring-red-500/10'
                                : 'border-gray-100 focus-within:border-[#FF7F11] focus-within:bg-white focus-within:ring-4 focus-within:ring-[#FF7F11]/10'
                                }`}>
                                {value.map((email, index) => (
                                    <div
                                        key={index}
                                        className="flex items-center gap-2 rounded-xl bg-[#1E1E1E] px-3 py-1.5 text-xs font-bold text-white group"
                                    >
                                        <span>{email}</span>
                                        <button
                                            type="button"
                                            onClick={() => removeEmail(email, value, onChange)}
                                            className="text-[#FF7F11] hover:text-white transition-colors"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                                <input
                                    type="text"
                                    value={emailInput}
                                    onChange={handleInputChange}
                                    onKeyDown={(e) => handleKeyDown(e, value, onChange)}
                                    onPaste={(e) => handlePaste(e, value, onChange)}
                                    placeholder={value.length === 0 ? "Enter company emails here..." : "Add more..."}
                                    className="flex-1 min-w-[200px] border-none outline-none bg-transparent text-sm font-medium placeholder:text-gray-300"
                                />
                            </div>
                            {emailError && <p className="text-[10px] font-bold text-red-500 ml-1">{emailError}</p>}
                            {errors.companies && <p className="text-[10px] font-bold text-red-500 ml-1">{errors.companies.message}</p>}
                        </div>
                    )}
                />

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full rounded-2xl bg-[#FF7F11] px-6 py-4 text-sm font-black text-white hover:bg-[#1E1E1E] transition-all transform active:scale-[0.98] shadow-xl shadow-[#FF7F11]/20 hover:shadow-black/20 mt-4 uppercase tracking-widest"
                >
                    Send Mails
                </button>
            </form>
        </div>
    );
}
