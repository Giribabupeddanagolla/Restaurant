'use client';

import { useState } from 'react';
import { CheckCircle, Calendar, Users, Clock } from 'lucide-react';

export default function ReservePage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="text-center mb-10">
        <span className="section-label">Online Table Booking</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1008] mt-1">Reserve Your Spot</h1>
        <p className="text-sm text-[#6b5840] mt-2">Instant confirmation delivered via SMS & email.</p>
        <hr className="divider-gold mt-6" />
      </div>

      {/* Info badges */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { icon: <Calendar className="w-5 h-5 text-[#C8A055]" />, label: 'Any Date',      bg: 'bg-[#FFF8F0]' },
          { icon: <Users    className="w-5 h-5 text-[#8B0000]" />, label: 'Up to 8+ Guests', bg: 'bg-[#FFF0F0]' },
          { icon: <Clock    className="w-5 h-5 text-[#16603A]" />, label: '6 PM – 11 PM',  bg: 'bg-[#F0FAF4]' },
        ].map((b) => (
          <div key={b.label} className={`glass-card rounded-xl p-4 flex flex-col items-center gap-2 text-center ${b.bg}`}>
            {b.icon}
            <span className="text-xs font-semibold text-[#6b5840]">{b.label}</span>
          </div>
        ))}
      </div>

      {submitted ? (
        <div className="glass-card p-10 rounded-2xl text-center flex flex-col items-center gap-4">
          <CheckCircle className="w-16 h-16 text-[#16603A]" />
          <h2 className="text-2xl font-extrabold text-[#1a1008]">Reservation Confirmed!</h2>
          <p className="text-sm text-[#6b5840] max-w-md leading-relaxed">
            We look forward to welcoming you. A confirmation SMS has been sent to your phone.
          </p>
          <button onClick={() => setSubmitted(false)} className="btn-crimson px-6 py-2.5 rounded-xl text-sm font-bold mt-4">
            Book Another Table
          </button>
        </div>
      ) : (
        <div className="glass-card p-8 rounded-2xl">
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4a3820] mb-2">Full Name</label>
                <input type="text" required placeholder="e.g. Priya Sharma" className="input-light" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#4a3820] mb-2">Phone Number</label>
                <input type="tel" required placeholder="+1 (555) 000-0000" className="input-light" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#4a3820] mb-2">Party Size</label>
                <select className="input-light">
                  <option>2 Guests — Couple</option>
                  <option>4 Guests — Family</option>
                  <option>6 Guests — Group</option>
                  <option>8+ Guests — Party</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-[#4a3820] mb-2">Date</label>
                <input type="date" required defaultValue={new Date().toISOString().split('T')[0]} className="input-light" />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#4a3820] mb-2">Time</label>
                <select className="input-light">
                  <option>6:00 PM</option>
                  <option>7:00 PM</option>
                  <option>8:00 PM</option>
                  <option>9:00 PM</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#4a3820] mb-2">Special Request / Occasion (Optional)</label>
              <textarea rows={3} placeholder="Anniversary celebration, quiet booth, dietary needs..." className="input-light" />
            </div>

            <button type="submit" className="btn-crimson py-3.5 rounded-xl font-extrabold text-sm w-full">
              📅 Confirm Reservation
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
