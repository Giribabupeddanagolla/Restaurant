'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Plus, ArrowLeft, CheckCircle2, Clock, MapPin, Users, Utensils, X } from 'lucide-react';

interface UserBooking {
  id: string;
  bookingNumber: string;
  restaurantName: string;
  date: string;
  time: string;
  guests: number;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'COMPLETED';
}

const INITIAL_USER_BOOKINGS: UserBooking[] = [
  {
    id: 'ub-1',
    bookingNumber: 'BK-1025',
    restaurantName: 'Giri Spice Garden',
    date: '2026-08-17',
    time: '08:30 PM',
    guests: 2,
    status: 'PENDING',
  },
  {
    id: 'ub-2',
    bookingNumber: 'BK-0980',
    restaurantName: 'Royal Hyderabadi House',
    date: '2026-08-10',
    time: '01:00 PM',
    guests: 4,
    status: 'COMPLETED',
  },
];

export default function UserBookingsPage() {
  const [bookings, setBookings] = useState<UserBooking[]>(INITIAL_USER_BOOKINGS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form State
  const [restaurantName, setRestaurantName] = useState('Giri Spice Garden');
  const [date, setDate] = useState('2026-08-18');
  const [time, setTime] = useState('08:00 PM');
  const [guests, setGuests] = useState(4);
  const [specialReq, setSpecialReq] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const created: UserBooking = {
      id: `ub-${Date.now()}`,
      bookingNumber: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      restaurantName,
      date,
      time,
      guests,
      status: 'PENDING',
    };

    setBookings([created, ...bookings]);
    setShowAddModal(false);
    showToast(`Table booking request ${created.bookingNumber} submitted to restaurant.`);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 space-y-6 pb-16">
      {toastMsg && (
        <div className="bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8B0000]/10 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/user/dashboard"
            className="p-2 rounded-xl bg-white border border-[#8B0000]/15 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1a1008]">My Table Reservations</h1>
            <p className="text-xs text-[#6b5840]">Book restaurant tables online & track reservation status</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-crimson py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-sm shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> + Book Table Online
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {bookings.map((b) => (
          <div key={b.id} className="glass-card rounded-3xl p-5 bg-white border border-[#8B0000]/15 shadow-sm space-y-3">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-2">
              <span className="font-extrabold text-sm text-[#1a1008]">{b.bookingNumber}</span>
              <span
                className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                  b.status === 'PENDING'
                    ? 'bg-amber-100 text-amber-900 border border-amber-300 animate-pulse'
                    : b.status === 'CONFIRMED'
                    ? 'bg-emerald-100 text-emerald-900 border border-emerald-300'
                    : b.status === 'COMPLETED'
                    ? 'bg-blue-100 text-blue-900 border border-blue-300'
                    : 'bg-red-100 text-red-900 border border-red-300'
                }`}
              >
                {b.status}
              </span>
            </div>

            <div className="text-xs space-y-1">
              <div className="font-extrabold text-[#8B0000] text-sm">{b.restaurantName}</div>
              <div className="font-bold text-[#1a1008]">{b.date} • {b.time}</div>
              <div className="text-[#6b5840]">Party Size: {b.guests} Guests</div>
            </div>
          </div>
        ))}
      </div>

      {/* Add Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/15 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
              <h2 className="text-base font-extrabold text-[#1a1008]">+ Book Table Online</h2>
              <button onClick={() => setShowAddModal(false)}><X className="w-5 h-5 text-gray-500" /></button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Select Restaurant</label>
                <select
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold text-[#8B0000]"
                >
                  <option value="Giri Spice Garden">Giri Spice Garden</option>
                  <option value="Royal Hyderabadi House">Royal Hyderabadi House</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Date</label>
                  <input
                    type="date"
                    required
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Time</label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="08:00 PM"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Number of Guests</label>
                <input
                  type="number"
                  min="1"
                  max="20"
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Special Request</label>
                <textarea
                  rows={2}
                  value={specialReq}
                  onChange={(e) => setSpecialReq(e.target.value)}
                  placeholder="Window seat / birthday decor..."
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl p-2.5 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl text-xs font-extrabold border">Cancel</button>
                <button type="submit" className="btn-crimson px-5 py-2 rounded-xl text-xs font-extrabold cursor-pointer">Submit Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
