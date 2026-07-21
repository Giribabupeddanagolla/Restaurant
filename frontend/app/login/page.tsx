'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email,    setEmail]    = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Welcome back! Logging in as ${email}`);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[#FFF8F0] to-white">
      <div className="w-full max-w-md">

        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center ring-4 ring-[#C8A055]/30 mb-4">
            <Image src="/giri-logo.svg" alt="Giri Restaurant" width={72} height={72} className="rounded-full" />
          </div>
          <h1 className="text-2xl font-extrabold text-[#1a1008]">Welcome Back</h1>
          <p className="text-sm text-[#6b5840] mt-1">Sign in to your Giri account</p>
        </div>

        {/* Card */}
        <div className="glass-card rounded-3xl p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">

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

            {/* Password */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-bold text-[#4a3820]">Password</label>
                <Link href="#" className="text-xs text-[#8B0000] font-semibold hover:underline">
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000]" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
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

            {/* Remember me */}
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 accent-[#8B0000] rounded" />
              <span className="text-xs text-[#6b5840]">Remember me on this device</span>
            </label>

            {/* Submit */}
            <button type="submit" className="btn-crimson py-3 rounded-xl font-extrabold text-sm w-full mt-1">
              Sign In
            </button>

            {/* Divider */}
            <div className="flex items-center gap-3">
              <hr className="flex-1 border-[#C8A055]/20" />
              <span className="text-xs text-[#a09070]">or continue with</span>
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

        {/* Register link */}
        <p className="text-center text-sm text-[#6b5840] mt-6">
          Don't have an account?{' '}
          <Link href="/register" className="text-[#8B0000] font-bold hover:underline">
            Create one here
          </Link>
        </p>

      </div>
    </div>
  );
}
