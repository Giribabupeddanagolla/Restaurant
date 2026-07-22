'use client';

import { FormEvent, useState } from 'react';
import { Send } from 'lucide-react';

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <div className="glass-card p-6 rounded-2xl bg-[#FDFAF7]">
      <h3 className="text-lg font-extrabold text-[#1a1008] mb-5 flex items-center gap-2">
        <span className="w-1 h-5 bg-[#8B0000] rounded-full inline-block" />
        Send a Message
      </h3>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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
        <button type="submit" className="btn-crimson py-2.5 rounded-xl text-xs font-bold w-full flex items-center justify-center gap-2 transition-all">
          <Send className="w-4 h-4" /> {submitted ? 'Message Sent!' : 'Send Message'}
        </button>
      </form>
    </div>
  );
}
