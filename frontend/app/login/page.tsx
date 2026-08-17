'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const loggedUser = await login({ email, password });
      redirectByRole(loggedUser?.role || 'Customer');
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid credentials. Please try again.');
      setSubmitting(false);
    }
  };

  const redirectByRole = (role: UserRole | string) => {
    const r = (role || '').toString().toLowerCase();

    if (r.includes('admin')) {
      window.location.href = '/admin/dashboard';
    } else if (r.includes('manager')) {
      window.location.href = '/manager/dashboard';
    } else if (r.includes('merchant') || r.includes('vendor')) {
      window.location.href = '/merchant/dashboard';
    } else if (r.includes('chef')) {
      window.location.href = '/admin/kitchen';
    } else if (r.includes('waiter')) {
      window.location.href = '/admin/tables';
    } else if (r.includes('cashier')) {
      window.location.href = '/admin/orders';
    } else if (r.includes('delivery')) {
      window.location.href = '/track';
    } else {
      window.location.href = '/customer/dashboard';
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-10 bg-gradient-to-b from-[#FFF8F0] to-white">
      <div className="w-full max-w-md space-y-5">

        {/* Logo & Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white shadow-lg flex items-center justify-center ring-4 ring-[#C8A055]/30 mb-2.5">
            <Image src="/royal-logo.svg" alt="Royal Restaurant" width={64} height={64} className="rounded-full" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a1008] tracking-tight">Account Login</h1>
          <p className="text-xs sm:text-sm text-[#6b5840] mt-1">
            Sign in with your email and password to access your account.
          </p>
        </div>

        {/* Login Form Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-7 shadow-lg bg-white border border-[#8B0000]/10 space-y-4">

          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">

            {/* Email Input */}
            <div>
              <label className="block text-xs font-bold text-[#1a1008] mb-1.5">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000] z-10 pointer-events-none" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@royalrestaurant.com"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl pl-10 pr-3.5 py-2.5 text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000] transition-all"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="text-xs font-bold text-[#1a1008]">Password</label>
                <Link href="/forgot-password" className="text-xs text-[#8B0000] font-semibold hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000] z-10 pointer-events-none" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl pl-10 pr-10 py-2.5 text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#a09070] hover:text-[#8B0000] transition-colors p-1"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-crimson py-3 rounded-xl font-extrabold text-xs sm:text-sm w-full mt-1.5 shadow-md flex items-center justify-center gap-2 cursor-pointer hover:shadow-lg transition-all"
            >
              <LogIn className="w-4 h-4" /> Sign In
            </button>
          </form>
        </div>

        {/* Register prompt */}
        <p className="text-center text-xs sm:text-sm text-[#6b5840]">
          Don't have an account?{' '}
          <Link href="/register" className="text-[#8B0000] font-bold hover:underline">
            Create new account
          </Link>
        </p>
      </div>
    </div>
  );
}
