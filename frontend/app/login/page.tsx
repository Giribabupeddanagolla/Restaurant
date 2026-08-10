'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Eye, EyeOff, Mail, Lock, UserCheck, ShieldCheck, Sparkles, LogIn } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { UserRole } from '@/types';

const ROLE_DEMOS: { role: UserRole; title: string; email: string; icon: string; redirect: string; color: string }[] = [
  { role: 'Admin',       title: 'System Admin',     email: 'admin@girirestaurant.com',    icon: '👑', redirect: '/admin/dashboard', color: 'bg-red-50 text-red-700 border-red-200 hover:bg-red-600 hover:text-white' },
  { role: 'Manager',     title: 'Restaurant Mgr',   email: 'manager@girirestaurant.com',  icon: '👔', redirect: '/admin/dashboard', color: 'bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-600 hover:text-white' },
  { role: 'Chef',        title: 'Head Chef (KDS)',  email: 'chef@girirestaurant.com',     icon: '👨‍🍳', redirect: '/admin/kitchen',   color: 'bg-orange-50 text-orange-800 border-orange-200 hover:bg-orange-600 hover:text-white' },
  { role: 'Waiter',      title: 'Waitstaff Floor',  email: 'waiter@girirestaurant.com',   icon: '🍽️', redirect: '/admin/tables',    color: 'bg-[#FFF8F0] text-[#8B0000] border-[#8B0000]/20 hover:bg-[#8B0000] hover:text-white' },
  { role: 'Cashier',     title: 'Billing Terminal', email: 'cashier@girirestaurant.com',  icon: '💳', redirect: '/admin/orders',    color: 'bg-emerald-50 text-emerald-800 border-emerald-200 hover:bg-emerald-600 hover:text-white' },
  { role: 'Delivery Boy',title: 'Delivery Agent',   email: 'delivery@girirestaurant.com', icon: '🛵', redirect: '/track',           color: 'bg-blue-50 text-blue-800 border-blue-200 hover:bg-blue-600 hover:text-white' },
  { role: 'Customer',    title: 'Public Diner',     email: 'customer@girirestaurant.com', icon: '👤', redirect: '/',                color: 'bg-purple-50 text-purple-800 border-purple-200 hover:bg-purple-600 hover:text-white' },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [selectedRole, setSelectedRole] = useState<UserRole>('Customer');
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setSubmitting(true);

    try {
      const loggedUser = await login({ email, password, role: selectedRole });
      redirectByRole(loggedUser.role);
    } catch (err: any) {
      setErrorMsg(err.message || 'Invalid credentials. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleQuickDemoLogin = async (demo: typeof ROLE_DEMOS[0]) => {
    setEmail(demo.email);
    setPassword('password123');
    setSelectedRole(demo.role);
    setSubmitting(true);

    try {
      const loggedUser = await login({ email: demo.email, password: 'password123', role: demo.role });
      redirectByRole(loggedUser.role);
    } catch (err) {
      setErrorMsg('Failed quick demo login.');
    } finally {
      setSubmitting(false);
    }
  };

  const redirectByRole = (role: UserRole) => {
    switch (role) {
      case 'Admin':
      case 'Manager':
        router.push('/admin/dashboard');
        break;
      case 'Chef':
        router.push('/admin/kitchen');
        break;
      case 'Waiter':
        router.push('/admin/tables');
        break;
      case 'Cashier':
        router.push('/admin/orders');
        break;
      case 'Delivery Boy':
        router.push('/track');
        break;
      default:
        router.push('/');
        break;
    }
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[#FFF8F0] to-white">
      <div className="w-full max-w-xl space-y-6">

        {/* Logo & Header */}
        <div className="flex flex-col items-center text-center">
          <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center ring-4 ring-[#C8A055]/30 mb-3">
            <Image src="/giri-logo.svg" alt="Giri Restaurant" width={72} height={72} className="rounded-full" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a1008]">Role-Based Access Login</h1>
          <p className="text-xs sm:text-sm text-[#6b5840] mt-1">
            Sign in with your role account or click any 1-click role preset below.
          </p>
        </div>

        {/* 1-Click Quick Demo Login Badges */}
        <div className="glass-card p-4 rounded-2xl bg-white border border-[#8B0000]/15 shadow-sm space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-extrabold text-[#1a1008] flex items-center gap-1.5 uppercase tracking-wider">
              <Sparkles className="w-4 h-4 text-[#C8A055]" /> 1-Click Role Login Demos:
            </span>
            <span className="text-[10px] font-bold text-[#8B0000]">Click any role to test</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {ROLE_DEMOS.map((demo) => (
              <button
                key={demo.role}
                type="button"
                onClick={() => handleQuickDemoLogin(demo)}
                className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all ${demo.color} shadow-xs hover:shadow-md cursor-pointer`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-base">{demo.icon}</span>
                  <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-black/10">
                    {demo.role}
                  </span>
                </div>
                <span className="font-extrabold text-xs leading-tight">{demo.title}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Login Form Card */}
        <div className="glass-card rounded-3xl p-6 sm:p-8 shadow-lg bg-white border border-[#8B0000]/10 space-y-5">
          {errorMsg && (
            <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs font-bold">
              {errorMsg}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4">

            {/* Role Selection Dropdown */}
            <div>
              <label className="block text-xs font-bold text-[#1a1008] mb-1.5 flex items-center gap-1">
                <ShieldCheck className="w-4 h-4 text-[#8B0000]" /> Select Account Role
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value as UserRole)}
                className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl px-3.5 py-2.5 text-xs font-extrabold outline-none focus:ring-2 focus:ring-[#8B0000]"
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
                  placeholder="name@girirestaurant.com"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl pl-10 pr-3.5 py-2.5 text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
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
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 text-[#1a1008] rounded-xl pl-10 pr-10 py-2.5 text-xs font-medium outline-none focus:ring-2 focus:ring-[#8B0000]"
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

            {/* Submit Button */}
            <button
              type="submit"
              disabled={submitting}
              className="btn-crimson py-3 rounded-xl font-extrabold text-xs sm:text-sm w-full mt-2 shadow-md flex items-center justify-center gap-2"
            >
              <LogIn className="w-4 h-4" /> Sign In as {selectedRole}
            </button>
          </form>
        </div>

        {/* Register prompt */}
        <p className="text-center text-xs sm:text-sm text-[#6b5840]">
          Don't have an account?{' '}
          <Link href="/register" className="text-[#8B0000] font-bold hover:underline">
            Create new role account
          </Link>
        </p>
      </div>
    </div>
  );
}
