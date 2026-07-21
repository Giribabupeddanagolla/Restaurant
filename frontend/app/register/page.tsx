'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Mail, Lock, User, Phone } from 'lucide-react';

export default function RegisterPage() {
  const [showPassword,  setShowPassword]  = useState(false);
  const [showConfirm,   setShowConfirm]   = useState(false);
  const [name,     setName]     = useState('');
  const [email,    setEmail]    = useState('');
  const [phone,    setPhone]    = useState('');
  const [password, setPassword] = useState('');
  const [confirm,  setConfirm]  = useState('');
  const [agreed,   setAgreed]   = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      alert('Passwords do not match.');
      return;
    }
    if (!agreed) {
      alert('Please accept the terms and conditions.');
      return;
    }
    alert(`Account created for ${name}! Welcome to Giri Restaurant.`);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[#FFF8F0] to-white">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center ring-4 ring-[#C8A055]/30 mb-4">
            <Image src="/giri-logo.svg" alt="Giri Restaurant" width={72} height={72} className="rounded-full" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#1a1008]">Create Your Account</h1>
          <p className="text-sm text-[#6b5840] mt-1">Join Giri Restaurant — Good Food, Great Experience</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-3xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

            {/* Full name */}
            <div>
              <label className="block text-xs font-bold text-[#4a3820] mb-2">Full Name</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000]" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="input-light pl-10"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-bold text-[#4a3820] mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="input-light pl-10"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-xs font-bold text-[#4a3820] mb-2">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000]" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+1 (555) 000-0000"
                  className="input-light pl-10"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-bold text-[#4a3820] mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className="input-light pl-10 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a09070] hover:text-[#8B0000] transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm password */}
            <div>
              <label className="block text-xs font-bold text-[#4a3820] mb-2">Confirm Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000]" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re-enter your password"
                  className={`input-light pl-10 pr-10 ${
                    confirm && password !== confirm ? 'border-red-400' : ''
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a09070] hover:text-[#8B0000] transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {confirm && password !== confirm && (
                <p className="text-[11px] text-red-500 mt-1 font-medium">Passwords do not match.</p>
              )}
            </div>

            {/* Terms */}
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 accent-[#8B0000] rounded mt-0.5 shrink-0"
              />
              <span className="text-xs text-[#6b5840] leading-relaxed">
                I agree to the{' '}
                <Link href="/terms"   className="text-[#8B0000] font-bold hover:underline">Terms of Service</Link>
                {' '}and{' '}
                <Link href="/privacy" className="text-[#8B0000] font-bold hover:underline">Privacy Policy</Link>
              </span>
            </label>

            {/* Submit */}
            <button type="submit" className="btn-crimson py-3 rounded-xl font-extrabold text-sm w-full mt-1">
              Create Account
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <hr className="flex-1 border-[#C8A055]/20" />
              <span className="text-xs text-[#a09070]">or sign up with</span>
              <hr className="flex-1 border-[#C8A055]/20" />
            </div>

            {/* Social buttons */}
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F8F5F0] border border-[#8B0000]/10 rounded-xl text-xs font-bold text-[#4a3820] hover:bg-[#FFF0F0] hover:border-[#8B0000]/20 transition-all"
              >
                <span className="text-base">G</span> Google
              </button>
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-2.5 bg-[#F8F5F0] border border-[#8B0000]/10 rounded-xl text-xs font-bold text-[#4a3820] hover:bg-[#FFF0F0] hover:border-[#8B0000]/20 transition-all"
              >
                <span className="text-base">f</span> Facebook
              </button>
            </div>

          </form>
        </div>

        {/* Login link */}
        <p className="text-center text-sm text-[#6b5840] mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-[#8B0000] font-bold hover:underline">
            Sign in here
          </Link>
        </p>

      </div>
    </div>
  );
}
