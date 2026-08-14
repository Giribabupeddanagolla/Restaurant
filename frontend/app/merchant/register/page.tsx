'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Building2, Mail, Phone, User, Store, ArrowRight, CheckCircle2, Clock, ShieldCheck, Tag } from 'lucide-react';
import { formatCurrency } from '@/utils/formatters';

export default function MerchantRegisterPage() {
  const router = useRouter();

  const [storeName, setStoreName] = useState('');
  const [category, setCategory] = useState('Authentic Indian');
  const [contactName, setContactName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [outletsCount, setOutletsCount] = useState(1);
  const [proposedCommission, setProposedCommission] = useState(15);
  const [description, setDescription] = useState('');

  const [submitted, setSubmitted] = useState(false);

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storeName || !email) return;

    // Save to localStorage pending requests feed
    const pendingRequest = {
      id: `req-${Date.now()}`,
      name: storeName,
      code: `MER-${storeName.slice(0, 3).toUpperCase()}`,
      category,
      contactPerson: contactName,
      email,
      phone,
      outletsCount: Number(outletsCount) || 1,
      dishesCount: 0,
      monthlySales: 0,
      commissionRate: Number(proposedCommission) || 15,
      status: 'Under Review',
      joinedDate: new Date().toISOString().split('T')[0],
      description,
    };

    const existing = JSON.parse(localStorage.getItem('giri_pending_merchant_requests') || '[]');
    localStorage.setItem('giri_pending_merchant_requests', JSON.stringify([pendingRequest, ...existing]));

    setSubmitted(true);
  };

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center px-4 py-12 bg-gradient-to-b from-[#FFF8F0] to-white text-[#1a1008]">
      <div className="w-full max-w-xl space-y-6">

        {/* Logo Header */}
        <div className="text-center space-y-2">
          <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center ring-4 ring-[#C8A055]/30 mx-auto">
            <Building2 className="w-10 h-10 text-[#8B0000]" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1a1008]">Merchant Partner Onboarding Request</h1>
          <p className="text-xs sm:text-sm text-[#6b5840]">Submit your restaurant/outlet request for Admin approval to start listing categories and dish prices.</p>
        </div>

        {submitted ? (
          <div className="glass-card rounded-3xl p-8 bg-white border border-amber-300 shadow-xl text-center space-y-4 animate-in fade-in">
            <div className="w-16 h-16 rounded-full bg-amber-100 border border-amber-300 text-amber-800 flex items-center justify-center mx-auto">
              <Clock className="w-8 h-8 text-amber-600 animate-pulse" />
            </div>
            <div>
              <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-xs font-extrabold uppercase mb-2">
                Status: Under Admin Review
              </span>
              <h2 className="text-xl font-extrabold text-[#1a1008]">Request Submitted to Admin!</h2>
              <p className="text-xs text-[#6b5840] mt-1 max-w-md mx-auto">
                Your merchant application for <strong>{storeName}</strong> has been sent to the Giri Restaurant Admin. Once the Admin approves your request, you can log in to add food categories, dishes, and set prices.
              </p>
            </div>

            <div className="p-4 bg-[#F8F5F0] rounded-2xl text-xs font-mono text-[#4a3820] space-y-1 text-left max-w-md mx-auto border border-[#8B0000]/10">
              <div><strong>Brand:</strong> {storeName}</div>
              <div><strong>Category:</strong> {category}</div>
              <div><strong>Email:</strong> {email}</div>
              <div><strong>Commission Rate:</strong> {proposedCommission}%</div>
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link
                href="/admin/merchants"
                className="btn-crimson py-2.5 px-5 rounded-xl font-extrabold text-xs flex items-center gap-2 shadow-sm"
              >
                <ShieldCheck className="w-4 h-4" /> Go to Admin Merchants Console to Approve
              </Link>
              <Link
                href="/merchant/portal"
                className="py-2.5 px-5 rounded-xl border border-[#8B0000]/30 text-[#8B0000] font-extrabold text-xs hover:bg-[#8B0000] hover:text-white transition-all"
              >
                Check Merchant Portal Status
              </Link>
            </div>
          </div>
        ) : (
          <div className="glass-card rounded-3xl p-6 sm:p-8 bg-white border border-[#8B0000]/10 shadow-lg space-y-5">
            <form onSubmit={handleSubmitRequest} className="space-y-4 text-xs">
              
              {/* Store Name */}
              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Merchant Partner / Store Name *</label>
                <div className="relative">
                  <Store className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000]" />
                  <input
                    type="text"
                    required
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                    placeholder="e.g. Giri Royal Sweets & Chaat"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl pl-10 pr-3.5 py-2.5 outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>
              </div>
              {/* Owner Name */}
              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Contact Person / Owner Name *</label>
                <div className="relative">
                  <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000]" />
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    placeholder="e.g. Ramesh Giri"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl pl-10 pr-3.5 py-2.5 outline-none focus:ring-2 focus:ring-[#8B0000]"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Business Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000]" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="merchant@girirestaurant.com"
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl pl-10 pr-3.5 py-2.5 outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                </div>
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#8B0000]" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+91 98765 43210"
                      className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl pl-10 pr-3.5 py-2.5 outline-none focus:ring-2 focus:ring-[#8B0000]"
                    />
                  </div>
                </div>
              </div>

              {/* Commission Rate */}
              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Proposed Commission Rate (%)</label>
                <input
                  type="number"
                  step="0.5"
                  value={proposedCommission}
                  onChange={(e) => setProposedCommission(Number(e.target.value))}
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2.5 outline-none focus:ring-2 focus:ring-[#8B0000]"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn-crimson py-3 rounded-xl font-extrabold text-xs sm:text-sm w-full shadow-md flex items-center justify-center gap-2 cursor-pointer mt-2"
              >
                <Building2 className="w-4 h-4" /> Send Request to Admin
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
