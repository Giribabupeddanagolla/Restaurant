'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, User, Phone, ShieldCheck, UserPlus } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState<UserRole>('Customer');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirm) {
      setErrorMsg('Passwords do not match.');
      return;
    }
    if (!agreed) {
      setErrorMsg('Please accept the terms and conditions.');
      return;
    }

    setErrorMsg('');
    setSubmitting(true);

    try {
      const newUser = await register({ name, email, phone, role, password });
      if (newUser.role === 'Admin' || newUser.role === 'Manager') {
        router.push('/admin/dashboard');
      } else if (newUser.role === 'Chef') {
        router.push('/admin/kitchen');
      } else if (newUser.role === 'Waiter') {
        router.push('/admin/tables');
      } else if (newUser.role === 'Cashier') {
        router.push('/admin/orders');
      } else if (newUser.role === 'Delivery Boy') {
        router.push('/track');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setErrorMsg(err.message || 'Failed to create account.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[#FFF8F0] to-white">
      <div className="w-full max-w-md space-y-6">

        {/* Logo Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center ring-4 ring-[#C8A055]/30 mb-3">
            <Image src="/giri-logo.svg" alt="Giri Restaurant" width={72} height={72} className="rounded-full" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a1008]">Create Your Account</h1>
          <p className="text-xs sm:text-sm text-[#6b5840] mt-1">Join Giri Restaurant — Good Food, Great Experience</p>
        </div>

        {/* Form Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-lg bg-white border border-[#8B0000]/10 space-y-4">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">

            {/* Account Role Dropdown */}
            <div>
              <label className="block text-xs font-bold text-[#1a1008] mb-1.5 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#8B0000]" /> Select Account Role
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 font-extrabold outline-none focus:ring-2 focus:ring-[#8B0000]"
              >
                <option value="Customer">👤 Customer (Diner)</option>
                <option value="Admin">👑 Admin (Full ERP Access)</option>
                <option value="Manager">👔 Manager (Operations & Reports)</option>
                <option value="Chef">👨‍🍳 Chef (Kitchen Display KDS)</option>
                <option value="Waiter">🍽️ Waiter (Floor & Table Management)</option>
                <option value="Cashier">💳 Cashier (POS & Billing)</option>
                <option value="Delivery Boy">🛵 Delivery Boy (Order Tracking)</option>
              </select>
            </div>

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
                  placeholder="+1 (555) 000-0000"
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
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a09070] hover:text-[#8B0000]"
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
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a09070] hover:text-[#8B0000]"
                >
                  {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Terms checkbox */}
            <label className="flex items-start gap-2 cursor-pointer pt-1">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="w-4 h-4 accent-[#8B0000] rounded mt-0.5 shrink-0"
              />
              <span className="text-xs text-[#6b5840] leading-relaxed">
                I agree to the Terms of Service & Privacy Policy
              </span>
            </label>

            {/* Submit */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-crimson py-3 rounded-xl font-extrabold text-xs sm:text-sm w-full mt-2 shadow-md flex items-center justify-center gap-2"
            >
              <UserPlus className="w-4 h-4" /> Create {role} Account
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
