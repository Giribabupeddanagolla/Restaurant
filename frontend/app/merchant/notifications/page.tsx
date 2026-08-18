'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Bell, ArrowLeft, CheckCircle2, Check, Store, Trash2, BellOff } from 'lucide-react';

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
    createdAt: new Date().toISOString(),
  },
];

export default function MerchantNotificationsPage() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);

  // Utility to deduplicate notifications by title and message content
  const deduplicate = (items: NotificationItem[]): NotificationItem[] => {
    const seen = new Set<string>();
    return items.filter((item) => {
      const key = `${item.title.trim()}_${item.message.trim()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  };

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem('giri_merchant_notifications') || '[]');
      if (Array.isArray(stored) && stored.length > 0) {
        const clean = deduplicate(stored);
        setNotifications(clean);
        localStorage.setItem('giri_merchant_notifications', JSON.stringify(clean));
      } else {
        setNotifications(INITIAL_NOTIFICATIONS);
        localStorage.setItem('giri_merchant_notifications', JSON.stringify(INITIAL_NOTIFICATIONS));
      }
    } catch (e) {
      setNotifications(INITIAL_NOTIFICATIONS);
    }
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

  const deleteNotification = (id: string) => {
    const updated = notifications.filter((n) => n.id !== id);
    setNotifications(updated);
    localStorage.setItem('giri_merchant_notifications', JSON.stringify(updated));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    localStorage.setItem('giri_merchant_notifications', JSON.stringify([]));
  };

  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      if (isNaN(date.getTime())) return dateString;
      return new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 pb-16">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-[#8B0000]/10 pb-4 gap-4">
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

        {notifications.length > 0 && (
          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={markAllRead}
              className="text-xs font-bold text-[#8B0000] hover:underline cursor-pointer flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" /> Mark All Read
            </button>
            <button
              onClick={clearAllNotifications}
              className="text-xs font-bold text-red-600 hover:text-red-800 hover:underline cursor-pointer flex items-center gap-1 bg-red-50 hover:bg-red-100 px-2.5 py-1 rounded-lg border border-red-200 transition-all"
            >
              <Trash2 className="w-3.5 h-3.5" /> Clear All
            </button>
          </div>
        )}
      </div>

      {notifications.length === 0 ? (
        <div className="glass-card rounded-2xl p-12 text-center bg-[#FDFAF7] border border-[#8B0000]/10 space-y-4">
          <div className="w-14 h-14 rounded-2xl bg-amber-100/60 border border-amber-200 text-amber-800 flex items-center justify-center mx-auto">
            <BellOff className="w-7 h-7 text-amber-700" />
          </div>
          <h3 className="text-base font-extrabold text-[#1a1008]">No Notifications Right Now</h3>
          <p className="text-xs text-[#6b5840] max-w-sm mx-auto">
            You're all caught up! New merchant approvals, system announcements, and order updates will appear here.
          </p>
          <div className="pt-2">
            <Link
              href="/merchant/dashboard"
              className="btn-crimson py-2 px-5 rounded-xl text-xs font-bold inline-flex items-center gap-2"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      ) : (
        <div className="space-y-3">
          {notifications.map((notif) => (
            <div
              key={notif.id}
              className={`glass-card rounded-2xl p-5 border transition-all space-y-3 relative group ${
                notif.isRead
                  ? 'bg-white border-[#8B0000]/10 opacity-90'
                  : 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-500/10'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 flex-1">
                  <div className="w-10 h-10 rounded-xl bg-emerald-100 border border-emerald-300 text-emerald-800 flex items-center justify-center shrink-0 mt-0.5">
                    <CheckCircle2 className="w-6 h-6 text-emerald-600" />
                  </div>
                  <div className="pr-4">
                    <h3 className="font-extrabold text-sm text-[#1a1008]">{notif.title}</h3>
                    <p className="text-xs text-[#6b5840] mt-1 leading-relaxed">{notif.message}</p>
                    <span className="text-[10px] text-[#a09070] font-semibold mt-2 block">
                      {formatDate(notif.createdAt)}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {!notif.isRead && (
                    <button
                      onClick={() => markAsRead(notif.id)}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-[10px] font-extrabold cursor-pointer transition-all"
                    >
                      Mark Read
                    </button>
                  )}
                  <button
                    onClick={() => deleteNotification(notif.id)}
                    title="Delete Notification"
                    className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 border border-transparent hover:border-red-200 transition-all cursor-pointer"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
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
      )}
    </div>
  );
}
