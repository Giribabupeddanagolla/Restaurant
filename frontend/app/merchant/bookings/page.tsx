'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Calendar, Plus, ArrowLeft, CheckCircle2, XCircle, Clock, Search, X, Users, Phone } from 'lucide-react';

interface BookingItem {
  id: string;
  bookingNumber: string;
  customerName: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  tableNumber: string;
  source: 'ONLINE' | 'OFFLINE';
  status: 'PENDING' | 'CONFIRMED' | 'REJECTED' | 'CANCELLED' | 'COMPLETED';
  specialRequest?: string;
}

const INITIAL_BOOKINGS: BookingItem[] = [
  {
    id: 'b-101',
    bookingNumber: 'BK-1024',
    customerName: 'Ravi Kumar',
    phone: '+91 98765 43210',
    date: '2026-08-17',
    time: '08:00 PM',
    guests: 4,
    tableNumber: 'Table 05',
    source: 'OFFLINE',
    status: 'CONFIRMED',
    specialRequest: 'Window seat preference',
  },
  {
    id: 'b-102',
    bookingNumber: 'BK-1025',
    customerName: 'Sneha Reddy',
    phone: '+91 98765 67890',
    date: '2026-08-17',
    time: '08:30 PM',
    guests: 2,
    tableNumber: 'Table 01',
    source: 'ONLINE',
    status: 'PENDING',
    specialRequest: 'Anniversary celebration candle dinner',
  },
  {
    id: 'b-103',
    bookingNumber: 'BK-1026',
    customerName: 'Karthik Raja',
    phone: '+91 98765 11223',
    date: '2026-08-18',
    time: '01:30 PM',
    guests: 6,
    tableNumber: 'Table 03',
    source: 'ONLINE',
    status: 'CONFIRMED',
  },
];

export default function MerchantBookingsPage() {
  const [bookings, setBookings] = useState<BookingItem[]>(INITIAL_BOOKINGS);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  // Offline Booking Form
  const [custName, setCustName] = useState('');
  const [custPhone, setCustPhone] = useState('');
  const [bkDate, setBkDate] = useState('2026-08-17');
  const [bkTime, setBkTime] = useState('08:00 PM');
  const [bkGuests, setBkGuests] = useState(4);
  const [bkTable, setBkTable] = useState('Table 02');
  const [specialReq, setSpecialReq] = useState('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(null), 3500);
  };

  const handleCreateOfflineBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!custName) return;

    const created: BookingItem = {
      id: `bk-${Date.now()}`,
      bookingNumber: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      customerName: custName,
      phone: custPhone || '+91 90000 00000',
      date: bkDate,
      time: bkTime,
      guests: bkGuests,
      tableNumber: bkTable,
      source: 'OFFLINE',
      status: 'CONFIRMED',
      specialRequest: specialReq,
    };

    setBookings([created, ...bookings]);
    setShowAddModal(false);
    setCustName('');
    setCustPhone('');
    showToast(`Offline booking ${created.bookingNumber} created successfully.`);
  };

  const updateBookingStatus = (id: string, nextStatus: BookingItem['status']) => {
    setBookings(bookings.map((b) => (b.id === id ? { ...b, status: nextStatus } : b)));
    showToast(`Booking status updated to ${nextStatus}.`);
  };

  const filteredBookings = bookings.filter((b) => {
    const matchesSearch =
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.bookingNumber.toLowerCase().includes(search.toLowerCase()) ||
      b.phone.includes(search);
    const matchesStatus = statusFilter === 'All' || b.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="max-w-6xl mx-auto p-4 sm:p-6 space-y-6 pb-16">
      {toastMsg && (
        <div className="bg-emerald-900 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-3 animate-in fade-in">
          <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
          <span className="text-xs font-bold">{toastMsg}</span>
        </div>
      )}

      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#8B0000]/10 pb-4">
        <div className="flex items-center gap-3">
          <Link
            href="/merchant/dashboard"
            className="p-2 rounded-xl bg-white border border-[#8B0000]/15 text-[#8B0000] hover:bg-[#8B0000] hover:text-white transition-all"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-2xl font-extrabold text-[#1a1008]">Table Reservation Bookings</h1>
            <p className="text-xs text-[#6b5840]">Manage Online & Offline customer dining table reservations</p>
          </div>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="btn-crimson py-2.5 px-4 rounded-xl text-xs font-extrabold flex items-center gap-2 shadow-sm shrink-0 cursor-pointer"
        >
          <Plus className="w-4 h-4" /> + Offline Booking
        </button>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {['All', 'PENDING', 'CONFIRMED', 'REJECTED', 'CANCELLED', 'COMPLETED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-extrabold transition-all cursor-pointer whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-[#8B0000] text-white shadow-xs'
                  : 'bg-white text-[#4a3820] border border-[#8B0000]/15 hover:bg-[#FFF8F0]'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#a09070]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search name, phone, ID..."
            className="w-full bg-white border border-[#8B0000]/20 rounded-xl pl-9 pr-3 py-1.5 text-xs outline-none"
          />
        </div>
      </div>

      {/* Bookings List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredBookings.map((b) => (
          <div key={b.id} className="glass-card rounded-2xl p-5 bg-white border border-[#8B0000]/15 shadow-xs space-y-3">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
              <div>
                <span className="font-extrabold text-sm text-[#1a1008]">{b.bookingNumber}</span>
                <span className="ml-2 px-2 py-0.5 rounded text-[10px] font-extrabold bg-[#8B0000]/10 text-[#8B0000]">
                  {b.source}
                </span>
              </div>
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
              <div className="font-extrabold text-[#1a1008]">{b.customerName} ({b.phone})</div>
              <div className="text-[11px] text-[#6b5840]">
                {b.date} • {b.time} • <strong className="text-[#8B0000]">{b.tableNumber}</strong> ({b.guests} Guests)
              </div>
              {b.specialRequest && (
                <div className="p-2 bg-[#F8F5F0] rounded-lg text-[11px] text-[#4a3820] italic mt-1">
                  Note: {b.specialRequest}
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[#8B0000]/10 text-xs font-bold">
              {b.status === 'PENDING' && (
                <>
                  <button
                    onClick={() => updateBookingStatus(b.id, 'CONFIRMED')}
                    className="btn-crimson py-1 px-3 rounded-lg text-xs"
                  >
                    Confirm Booking
                  </button>
                  <button
                    onClick={() => updateBookingStatus(b.id, 'REJECTED')}
                    className="px-2.5 py-1 rounded-lg border border-red-300 text-red-700 hover:bg-red-50 text-xs"
                  >
                    Reject
                  </button>
                </>
              )}

              {b.status === 'CONFIRMED' && (
                <button
                  onClick={() => updateBookingStatus(b.id, 'COMPLETED')}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white py-1 px-3 rounded-lg text-xs"
                >
                  Mark Completed
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Add Offline Booking Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 z-50">
          <div className="glass-card rounded-3xl bg-white border border-[#8B0000]/15 max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-[#8B0000]/10 pb-3">
              <h2 className="text-base font-extrabold text-[#1a1008]">+ Create Offline Table Booking</h2>
              <button onClick={() => setShowAddModal(false)}><X className="w-5 h-5 text-gray-500" /></button>
            </div>

            <form onSubmit={handleCreateOfflineBooking} className="space-y-3 text-xs">
              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Customer Name *</label>
                <input
                  type="text"
                  required
                  value={custName}
                  onChange={(e) => setCustName(e.target.value)}
                  placeholder="e.g. Ravi Kumar"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold"
                />
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Phone Number</label>
                <input
                  type="text"
                  value={custPhone}
                  onChange={(e) => setCustPhone(e.target.value)}
                  placeholder="+91 98765 43210"
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Date</label>
                  <input
                    type="date"
                    value={bkDate}
                    onChange={(e) => setBkDate(e.target.value)}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Time</label>
                  <input
                    type="text"
                    value={bkTime}
                    onChange={(e) => setBkTime(e.target.value)}
                    placeholder="08:00 PM"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Guests</label>
                  <input
                    type="number"
                    min="1"
                    value={bkGuests}
                    onChange={(e) => setBkGuests(Number(e.target.value))}
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-[#1a1008] mb-1">Assigned Table</label>
                  <input
                    type="text"
                    value={bkTable}
                    onChange={(e) => setBkTable(e.target.value)}
                    placeholder="Table 02"
                    className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl px-3 py-2 outline-none font-bold"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-[#1a1008] mb-1">Special Request</label>
                <textarea
                  rows={2}
                  value={specialReq}
                  onChange={(e) => setSpecialReq(e.target.value)}
                  placeholder="Window seat / anniversary notes..."
                  className="w-full bg-[#F8F5F0] border border-[#8B0000]/20 rounded-xl p-2.5 outline-none"
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t">
                <button type="button" onClick={() => setShowAddModal(false)} className="px-4 py-2 rounded-xl text-xs font-extrabold border">Cancel</button>
                <button type="submit" className="btn-crimson px-5 py-2 rounded-xl text-xs font-extrabold cursor-pointer">Save Offline Booking</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
