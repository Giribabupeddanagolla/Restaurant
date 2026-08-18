'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Calendar, Plus, ArrowLeft, CheckCircle2, Clock, MapPin, Users, Utensils, X, Building2, ChevronRight, Eye } from 'lucide-react';
import RestaurantInfo from '@/components/RestaurantInfo';

interface UserBooking {
  id: string;
  bookingNumber: string;
  restaurantName: string;
  shopId?: string;
  merchantId?: string;
  tableNumber: string;
  tableId?: string;
  date: string;
  time: string;
  guests: number;
  address?: string;
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'COMPLETED';
  specialRequests?: string;
}

const INITIAL_USER_BOOKINGS: UserBooking[] = [
  {
    id: 'ub-1',
    bookingNumber: '#BK10245',
    restaurantName: 'Giri Spice Garden',
    shopId: 'shop-giri-spice',
    merchantId: 'merchant-giri-spice',
    tableNumber: 'Table 06',
    tableId: 'tbl-06',
    date: '2026-08-18',
    time: '07:30 PM',
    guests: 4,
    address: 'Plot 42, Jubilee Hills Road No 36, Hyderabad',
    status: 'CONFIRMED',
    specialRequests: 'Window seat preferred',
  },
  {
    id: 'ub-2',
    bookingNumber: '#BK09802',
    restaurantName: 'RK Restaurant',
    shopId: 'rk-restaurant',
    merchantId: 'merchant-rk-restaurant',
    tableNumber: 'Table 03',
    tableId: 'tbl-03',
    date: '2026-08-20',
    time: '01:00 PM',
    guests: 2,
    address: 'Downtown Metro Station Plaza, Hyderabad',
    status: 'PENDING',
  },
  {
    id: 'ub-3',
    bookingNumber: '#BK08511',
    restaurantName: 'Royal Fine Dining',
    shopId: 'royal-fine-dining',
    merchantId: 'merchant-royal-fine-dining',
    tableNumber: 'Table 12 (VIP)',
    tableId: 'tbl-12',
    date: '2026-08-12',
    time: '08:00 PM',
    guests: 6,
    address: 'Gourmet Avenue, Hyderabad',
    status: 'COMPLETED',
  },
];

export default function UserBookingsPage() {
  const [bookings, setBookings] = useState<UserBooking[]>(INITIAL_USER_BOOKINGS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<UserBooking | null>(null);
  const [selectedDetails, setSelectedDetails] = useState<UserBooking | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Form State
  const [restaurantName, setRestaurantName] = useState('Giri Spice Garden');
  const [date, setDate] = useState('2026-08-18');
  const [time, setTime] = useState('07:30 PM');
  const [guests, setGuests] = useState(4);
  const [tableNumber, setTableNumber] = useState('Table 06');
  const [specialReq, setSpecialReq] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleCreateBooking = (e: React.FormEvent) => {
    e.preventDefault();

    const created: UserBooking = {
      id: `ub-${Date.now()}`,
      bookingNumber: `#BK${Math.floor(10000 + Math.random() * 90000)}`,
      restaurantName,
      shopId: restaurantName.toLowerCase().replace(/\s+/g, '-'),
      merchantId: `merchant-${restaurantName.toLowerCase().replace(/\s+/g, '-')}`,
      tableNumber,
      tableId: `tbl-${tableNumber.replace(/\D/g, '') || '01'}`,
      date,
      time,
      guests,
      address: 'Jubilee Hills Road No 36, Hyderabad',
      status: 'CONFIRMED',
      specialRequests: specialReq,
    };

    setBookings([created, ...bookings]);
    setShowAddModal(false);
    setConfirmedBooking(created);
    showToast(`Table booking ${created.bookingNumber} confirmed at ${restaurantName}!`);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 sm:p-6 space-y-6 pb-16">
      {toastMsg && (
        <div className="bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      {/* HEADER */}
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

      {/* BOOKINGS LIST GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {bookings.map((b) => (
          <div key={b.id} className="glass-card rounded-3xl p-5 bg-white border border-[#8B0000]/15 shadow-sm space-y-4 flex flex-col justify-between">
            <div className="space-y-3">
              <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-2.5">
                <span className="font-mono font-extrabold text-sm text-[#8B0000] bg-[#FFF8F0] px-2.5 py-1 rounded-lg border border-[#8B0000]/15">
                  {b.bookingNumber}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-[10px] font-extrabold uppercase ${
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

              {/* Restaurant Info Header */}
              <RestaurantInfo
                shopName={b.restaurantName}
                shopId={b.shopId}
                merchantId={b.merchantId}
                address={b.address}
                compact
                showViewButton={false}
              />

              <div className="grid grid-cols-2 gap-2 text-xs bg-[#F8F5F0] p-3 rounded-2xl border border-[#8B0000]/10">
                <div className="space-y-0.5">
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">Table & Party</span>
                  <span className="font-extrabold text-[#1a1008]">🪑 {b.tableNumber}</span>
                  <span className="text-gray-600 block">👥 {b.guests} Guests</span>
                </div>
                <div className="space-y-0.5">
                  <span className="text-[10px] text-gray-500 font-bold uppercase block">Date & Time</span>
                  <span className="font-extrabold text-[#1a1008]">📅 {b.date}</span>
                  <span className="text-gray-600 block">⏰ {b.time}</span>
                </div>
              </div>
            </div>

            {/* Card Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-[#8B0000]/10">
              <button
                onClick={() => setSelectedDetails(b)}
                className="flex-1 py-2 rounded-xl text-xs font-extrabold border border-[#8B0000]/20 text-[#4a3820] hover:bg-gray-50 transition-colors flex items-center justify-center gap-1 cursor-pointer"
              >
                <Eye className="w-3.5 h-3.5" /> View Details
              </button>
              <Link
                href={`/menu?shop=${encodeURIComponent(b.restaurantName)}&shopId=${encodeURIComponent(b.shopId || '')}`}
                className="flex-1 btn-crimson py-2 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-1 shadow-xs"
              >
                <Building2 className="w-3.5 h-3.5" /> View Restaurant
              </Link>
            </div>
          </div>
        ))}
      </div>

      {/* BOOKING CONFIRMATION MODAL */}
      {confirmedBooking && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/20 max-w-md w-full p-6 shadow-2xl space-y-4 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-3xl font-bold mx-auto animate-bounce shadow-md">
              🎉
            </div>
            <h2 className="text-xl font-black text-[#1a1008]">Booking Confirmed!</h2>
            <p className="text-xs text-[#6b5840]">Your table reservation has been accepted by the restaurant.</p>

            <div className="bg-[#FFF8F0] p-4 rounded-2xl border border-[#8B0000]/15 text-left text-xs space-y-2.5">
              <div className="flex justify-between border-b border-[#8B0000]/10 pb-1.5">
                <span className="text-gray-500 font-bold">Booking ID:</span>
                <span className="font-extrabold text-[#8B0000]">{confirmedBooking.bookingNumber}</span>
              </div>
              <div className="flex justify-between border-b border-[#8B0000]/10 pb-1.5">
                <span className="text-gray-500 font-bold">Restaurant:</span>
                <span className="font-extrabold text-[#1a1008]">🏪 {confirmedBooking.restaurantName}</span>
              </div>
              <div className="flex justify-between border-b border-[#8B0000]/10 pb-1.5">
                <span className="text-gray-500 font-bold">Table Assigned:</span>
                <span className="font-extrabold text-[#1a1008]">🪑 {confirmedBooking.tableNumber}</span>
              </div>
              <div className="flex justify-between border-b border-[#8B0000]/10 pb-1.5">
                <span className="text-gray-500 font-bold">Date & Time:</span>
                <span className="font-extrabold text-[#1a1008]">📅 {confirmedBooking.date} at {confirmedBooking.time}</span>
              </div>
              <div className="flex justify-between border-b border-[#8B0000]/10 pb-1.5">
                <span className="text-gray-500 font-bold">Guests:</span>
                <span className="font-extrabold text-[#1a1008]">👥 {confirmedBooking.guests} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Status:</span>
                <span className="font-extrabold text-emerald-700 uppercase">✓ {confirmedBooking.status}</span>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => { setSelectedDetails(confirmedBooking); setConfirmedBooking(null); }}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs font-extrabold border border-[#8B0000]/20 text-[#4a3820] hover:bg-gray-50 transition-colors cursor-pointer"
              >
                View Details
              </button>
              <Link
                href={`/menu?shop=${encodeURIComponent(confirmedBooking.restaurantName)}`}
                onClick={() => setConfirmedBooking(null)}
                className="flex-1 btn-crimson py-2.5 px-4 rounded-xl text-xs font-extrabold text-white flex items-center justify-center gap-1 shadow-md"
              >
                <Building2 className="w-3.5 h-3.5" /> View Restaurant
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* BOOKING DETAILS MODAL */}
      {selectedDetails && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50 animate-in fade-in">
          <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/20 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
              <div>
                <h3 className="font-extrabold text-base text-[#1a1008]">Reservation Details</h3>
                <span className="text-xs font-mono font-bold text-[#8B0000]">{selectedDetails.bookingNumber}</span>
              </div>
              <button onClick={() => setSelectedDetails(null)} className="p-1 text-gray-400 hover:text-gray-600"><X className="w-5 h-5" /></button>
            </div>

            <RestaurantInfo
              shopName={selectedDetails.restaurantName}
              shopId={selectedDetails.shopId}
              merchantId={selectedDetails.merchantId}
              address={selectedDetails.address}
              compact
              showViewButton
              onViewRestaurant={() => setSelectedDetails(null)}
            />

            <div className="bg-[#F8F5F0] p-4 rounded-2xl border border-[#8B0000]/10 text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Assigned Table:</span>
                <span className="font-extrabold text-[#1a1008]">🪑 {selectedDetails.tableNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Party Size:</span>
                <span className="font-extrabold text-[#1a1008]">👥 {selectedDetails.guests} Guests</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Date:</span>
                <span className="font-extrabold text-[#1a1008]">📅 {selectedDetails.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Time Slot:</span>
                <span className="font-extrabold text-[#1a1008]">⏰ {selectedDetails.time}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500 font-bold">Reservation Status:</span>
                <span className="font-extrabold text-emerald-700 uppercase">{selectedDetails.status}</span>
              </div>
              {selectedDetails.specialRequests && (
                <div className="pt-2 border-t border-[#8B0000]/10">
                  <span className="text-gray-500 font-bold block mb-0.5">Special Requests:</span>
                  <span className="text-[#4a3820] italic">{selectedDetails.specialRequests}</span>
                </div>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <Link
                href={`/menu?shop=${encodeURIComponent(selectedDetails.restaurantName)}`}
                onClick={() => setSelectedDetails(null)}
                className="w-full btn-crimson py-2.5 rounded-xl text-xs font-extrabold text-center shadow-xs flex items-center justify-center gap-1.5"
              >
                <Building2 className="w-4 h-4" /> View {selectedDetails.restaurantName} Menu
              </Link>
            </div>
          </div>
        </div>
      )}

      {/* CREATE BOOKING FORM MODAL */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/15 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
              <h2 className="text-base font-extrabold text-[#1a1008]">+ Book Table Online</h2>
              <button onClick={() => setShowAddModal(false)}><X className="w-5 h-5 text-gray-500" /></button>
            </div>

            <form onSubmit={handleCreateBooking} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Select Restaurant Outlet</label>
                <select
                  value={restaurantName}
                  onChange={(e) => setRestaurantName(e.target.value)}
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold text-[#8B0000]"
                >
                  <option value="Giri Spice Garden">🏪 Giri Spice Garden (Jubilee Hills)</option>
                  <option value="RK Restaurant">🏪 RK Restaurant (Downtown)</option>
                  <option value="Royal Fine Dining">🏪 Royal Fine Dining (Gourmet Ave)</option>
                  <option value="Madhan Restaurant">🏪 Madhan Restaurant (Central)</option>
                </select>
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Select Table</label>
                <select
                  value={tableNumber}
                  onChange={(e) => setTableNumber(e.target.value)}
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold text-[#1a1008]"
                >
                  <option value="Table 06">🪑 Table 06 (Main Dining - 4 Guests)</option>
                  <option value="Table 03">🪑 Table 03 (Window Side - 2 Guests)</option>
                  <option value="Table 12 (VIP)">🪑 Table 12 (VIP Lounge - 6 Guests)</option>
                  <option value="Table 01">🪑 Table 01 (Patio - 2 Guests)</option>
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
                  <label className="block font-bold text-[#1a1008] mb-1">Time Slot</label>
                  <input
                    type="text"
                    required
                    value={time}
                    onChange={(e) => setTime(e.target.value)}
                    placeholder="07:30 PM"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold"
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

              <div className="flex justify-end gap-2 pt-2 border-t border-[#8B0000]/10">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl text-xs font-extrabold border cursor-pointer">Cancel</button>
                <button type="submit" className="btn-crimson px-5 py-2 rounded-xl text-xs font-extrabold cursor-pointer">Confirm Table Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
