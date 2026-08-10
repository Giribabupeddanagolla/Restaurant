'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [submitted, setSubmitted] = useState(false);
  const [email, setEmail] = useState('');

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="glass-card p-8 rounded-3xl border border-[#8B0000]/10 shadow-xl space-y-6">
        <div className="text-center">
          <h1 className="text-2xl font-extrabold text-[#1a1008]">Reset Password</h1>
          <p className="text-xs text-[#6b5840] mt-1">Enter your registered email to receive reset instructions</p>
        </div>

        {submitted ? (
          <div className="bg-green-50 text-green-800 text-xs p-4 rounded-xl text-center space-y-2 border border-green-200">
            <p className="font-bold">Reset email sent!</p>
            <p>Please check {email} for instructions.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-[#4a3820] mb-1">Email Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2.5 bg-[#F8F5F0] border border-[#8B0000]/15 rounded-xl text-xs outline-none"
                placeholder="your@email.com"
              />
            </div>
            <button type="submit" className="btn-crimson w-full py-3 rounded-xl text-xs font-extrabold">
              Send Reset Link
            </button>
          </form>
        )}

        <div className="text-center text-xs">
          <Link href="/login" className="text-[#8B0000] font-bold hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
