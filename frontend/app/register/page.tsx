'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Phone, UserPlus, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreed, setAgreed] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!name.trim() || !email.trim() || !password) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (password !== confirm) {
      setErrorMsg('Passwords do not match. Please re-enter your password.');
      return;
    }

    if (!agreed) {
      setErrorMsg('Please accept the Terms of Service & Privacy Policy.');
      return;
    }

    setSubmitting(true);

    try {
      const newUser = await register({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        role: 'Customer',
        password,
      });

      setSuccessMsg('Account created successfully! Redirecting to your dashboard...');
      setTimeout(() => {
        if (newUser.role === 'Admin' || newUser.role === 'Manager') {
          router.push('/admin/dashboard');
        } else {
          router.push('/customer/dashboard');
        }
      }, 800);
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to create account. Please try again.');
      setSubmitting(false);
    }
  };

  const handleQuickFill = () => {
    const randomNum = Math.floor(Math.random() * 900) + 100;
    setName('Priya Sharma');
    setEmail(`priya.guest${randomNum}@royalrestaurant.com`);
    setPhone('+91 98765 43210');
    setPassword('password123');
    setConfirm('password123');
    setAgreed(true);
    setErrorMsg('');
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-8 pb-20 bg-gradient-to-b from-[#FFF8F0] to-white">
      <div className="w-full max-w-md space-y-5">

        {/* Logo Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-lg flex items-center justify-center ring-4 ring-[#C8A055]/30 mb-2">
            <Image src="/royal-logo.svg" alt="Royal Restaurant" width={72} height={72} className="rounded-full" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#1a1008]">Create Your Account</h1>
          <p className="text-xs text-[#6b5840] mt-0.5">Join Royal Restaurant — Good Food, Great Experience</p>
        </div>

        {/* Form Card */}
        <div className="glass-card rounded-3xl p-5 sm:p-7 shadow-lg bg-white border border-[#8B0000]/10 space-y-4">
          
          {/* Quick Demo Fill Button */}
          <button
            type="button"
            onClick={handleQuickFill}
            className="w-full py-2 px-3 rounded-xl bg-[#FFF8F0] border border-[#8B0000]/20 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all text-xs font-extrabold flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#C8A055]" /> Auto-Fill Demo Registration Data
          </button>

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold animate-in fade-in">
              {errorMsg}
            </div>
          )}

          {successMsg && (
            <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              {successMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-3.5 text-xs">

            {/* Full Name */}
            <div>
              <label className="block font-bold text-[#1a1008] mb-1">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000] z-10 pointer-events-none" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Priya Sharma"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl pl-10 pr-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>
            </div>

            {/* Email Address */}
            <div>
              <label className="block font-bold text-[#1a1008] mb-1">Email Address *</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000] z-10 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="email@example.com"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl pl-10 pr-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <label className="block font-bold text-[#1a1008] mb-1">Phone Number</label>
              <div className="relative">
                <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000] z-10 pointer-events-none" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl pl-10 pr-3.5 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block font-bold text-[#1a1008] mb-1">Password *</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000] z-10 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min 8 characters"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl pl-10 pr-10 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a09070] hover:text-[#8B0000] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block font-bold text-[#1a1008] mb-1">Confirm Password *</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000] z-10 pointer-events-none" />
                <input
                  type={showConfirm ? 'text' : 'password'}
                  required
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="Re-enter your password"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl pl-10 pr-10 py-2.5 font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a09070] hover:text-[#8B0000] cursor-pointer"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2 cursor-pointer pt-0.5">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 accent-[#8B0000] rounded mt-0.5 shrink-0"
              />
              <span className="text-xs text-[#6b5840] leading-relaxed font-medium">
                I agree to the Terms of Service & Privacy Policy
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-crimson py-3 rounded-xl font-extrabold text-xs sm:text-sm w-full mt-1 shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all"
            >
              {submitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" /> Create Account
                </>
              )}
            </button>
          </form>
        </div>

        {/* Login Link */}
        <p className="text-center text-xs sm:text-sm text-[#6b5840]">
          Already have an account?{' '}
          <Link href="/login" className="text-[#8B0000] font-bold hover:underline">
            Sign in here
          </Link>
        </p>

      </div>
    </div>
  );
}
