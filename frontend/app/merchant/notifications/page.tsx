'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, ArrowLeft, CheckCircle2, Check, Store } from 'lucide-react';

interface NotificationItem {
  id: string;
  title: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'n-1',
    title: '🎉 Merchant Approval Successful!',
    message: 'Your merchant registration has been approved by Admin. You can now access your Merchant Dashboard and add your shop details, food categories, dishes, prices, images, and availability.',
    isRead: false,
    createdAt: new Date().toLocaleString(),
  },
];

export default function MerchantNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('giri_merchant_notifications') || '[]');
      if (Array.isArray(stored) && stored.length > 0) {
        setNotifications(stored);
      }
    } catch (e) {}
  }, []);

  const markAsRead = (id: string) => {
    const updated = notifications.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    setNotifications(updated);
    localStorage.setItem('giri_merchant_notifications', JSON.stringify(updated));
  };

  const markAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, isRead: true }));
    setNotifications(updated);
    localStorage.setItem('giri_merchant_notifications', JSON.stringify(updated));
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 pb-16">
      <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/merchant/dashboard"
            className="p-2 rounded-xl bg-white border border-[#8B0000]/15 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1a1008]">Merchant Notifications</h1>
            <p className="text-xs text-[#6b5840]">System alerts, Admin approvals, and store order updates</p>
          </div>
        </div>

        <button
          onClick={markAllRead}
          className="text-xs font-bold text-[#8B0000] hover:underline cursor-pointer flex items-center gap-1"
        >
          <Check className="w-3.5 h-3.5" /> Mark All as Read
        </button>
      </div>

      <div className="space-y-3">
        {notifications.map((notif) => (
          <div
            key={notif.id}
            className={`glass-card rounded-2xl p-5 border transition-all space-y-3 ${
              notif.isRead
                ? 'bg-white border-[#8B0000]/10'
                : 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-500/10'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                  <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                </div>
                <div>
                  <h3 className="font-extrabold text-sm text-[#1a1008]">{notif.title}</h3>
                  <p className="text-xs text-[#6b5840] mt-1 leading-relaxed">{notif.message}</p>
                  <span className="text-[10px] text-[#a09070] font-mono mt-2 block">{notif.createdAt}</span>
                </div>
              </div>

              {!notif.isRead && (
                <button
                  onClick={() => markAsRead(notif.id)}
                  className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold shrink-0 cursor-pointer"
                >
                  Mark Read
                </button>
              )}
            </div>

            <div className="pt-2 border-t border-[#8B0000]/10 flex justify-end">
              <Link
                href="/merchant/shop-profile"
                className="btn-crimson py-1.5 px-4 rounded-xl text-xs font-extrabold flex items-center gap-1.5"
              >
                <Store className="w-3.5 h-3.5" /> Go to Shop Setup
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
