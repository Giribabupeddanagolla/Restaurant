'use client';

import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';

export default function ContactPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-8">

      {/* Header */}
      <div className="text-center mb-10">
        <span className="section-label">Get In Touch</span>
        <h1 className="text-3xl md:text-5xl font-extrabold text-[#1a1008] mt-1">Contact Us</h1>
        <p className="text-sm text-[#6b5840] mt-2">Questions, catering requests or feedback — we'd love to hear from you.</p>
        <hr className="divider-gold mt-6" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

        {/* Form */}
        <div className="glass-card p-6 rounded-2xl bg-[#FDFAF7]">
          <h3 className="text-lg font-extrabold text-[#1a1008] mb-5 flex items-center gap-2">
            <span className="w-1 h-5 bg-[#8B0000] rounded-full inline-block" />
            Send a Message
          </h3>
          <form
            onSubmit={(e) => { e.preventDefault(); alert('Message sent! We will contact you shortly.'); }}
            className="flex flex-col gap-4"
          >
            <div>
              <label className="block text-xs font-bold text-[#4a3820] mb-1.5">Your Name</label>
              <input type="text" required placeholder="Full name" className="input-light" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#4a3820] mb-1.5">Email Address</label>
              <input type="email" required placeholder="email@example.com" className="input-light" />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#4a3820] mb-1.5">Subject</label>
              <select className="input-light">
                <option>General Enquiry</option>
                <option>Catering Request</option>
                <option>Table Reservation</option>
                <option>Feedback</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-bold text-[#4a3820] mb-1.5">Message</label>
              <textarea rows={4} required placeholder="How can we assist you?" className="input-light" />
            </div>
            <button type="submit" className="btn-crimson py-2.5 rounded-xl text-xs font-bold w-full flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        </div>

        {/* Info cards */}
        <div className="flex flex-col gap-4">
          {[
            { icon: <MapPin className="text-[#8B0000] w-5 h-5" />, bg: 'bg-[#FFF0F0]',
              title: 'Our Location', lines: ['742 Culinary Boulevard, Suite 100', 'Metropolitan City, MC 10001'] },
            { icon: <Phone  className="text-[#C8A055] w-5 h-5" />, bg: 'bg-[#FFF8F0]',
              title: 'Phone Lines', lines: ['Front Desk: +1 (555) 987-6543', 'Catering Direct: +1 (555) 987-6544'] },
            { icon: <Mail   className="text-[#16603A] w-5 h-5" />, bg: 'bg-[#F0FAF4]',
              title: 'Email Us', lines: ['info@girirestaurant.com', 'catering@girirestaurant.com'] },
            { icon: <Clock  className="text-[#C8A055] w-5 h-5" />, bg: 'bg-[#FFF8F0]',
              title: 'Opening Hours', lines: ['Mon – Thu: 11:30 AM – 10:30 PM', 'Fri – Sat: 11:30 AM – 11:30 PM', 'Sunday: 12:00 PM – 10:00 PM'] },
          ].map((card) => (
            <div key={card.title} className="glass-card p-5 rounded-2xl flex gap-4 items-start hover:shadow-md transition-all">
              <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center shrink-0`}>
                {card.icon}
              </div>
              <div>
                <h4 className="font-bold text-[#1a1008] text-sm mb-1">{card.title}</h4>
                {card.lines.map((line) => (
                  <p key={line} className="text-xs text-[#6b5840] leading-relaxed">{line}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
