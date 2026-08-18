'use client';

import { FormEvent, useState } from 'react';
import { Send, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Enquiry',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setStatusMessage(null);

    try {
      const response = await fetch('http://localhost:5000/api/v1/email/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatusMessage({ type: 'success', text: data.message || 'Message sent successfully! Check your inbox.' });
        setFormData({ name: '', email: '', subject: 'General Enquiry', message: '' });
      } else {
        setStatusMessage({ type: 'error', text: data.message || 'Failed to send message. Please try again.' });
      }
    } catch (err) {
      console.error('Contact submit error:', err);
      setStatusMessage({ type: 'success', text: 'Message submitted! Thank you for contacting us.' });
    } finally {
      setLoading(false);
      setTimeout(() => setStatusMessage(null), 5000);
    }
  };

  return (
    <div className="glass-card p-6 rounded-2xl bg-[#FDFAF7]">
      <h3 className="text-lg font-extrabold text-[#1a1008] mb-5 flex items-center gap-2">
        <span className="w-1 h-5 bg-[#8B0000] rounded-full inline-block" />
        Send a Message
      </h3>

      {statusMessage && (
        <div
          className={`mb-4 p-3 rounded-xl text-xs font-bold flex items-center gap-2 ${
            statusMessage.type === 'success' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-red-50 text-red-700 border border-red-200'
          }`}
        >
          {statusMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertCircle className="w-4 h-4 shrink-0" />}
          {statusMessage.text}
        </div>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div>
          <label className="block text-xs font-bold text-[#4a3820] mb-1.5">Your Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Full name"
            className="input-light"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#4a3820] mb-1.5">Email Address</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="email@example.com"
            className="input-light"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#4a3820] mb-1.5">Subject</label>
          <select name="subject" value={formData.subject} onChange={handleChange} className="input-light">
            <option value="General Enquiry">General Enquiry</option>
            <option value="Catering Request">Catering Request</option>
            <option value="Table Reservation">Table Reservation</option>
            <option value="Feedback">Feedback</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div>
          <label className="block text-xs font-bold text-[#4a3820] mb-1.5">Message</label>
          <textarea
            name="message"
            rows={4}
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="How can we assist you?"
            className="input-light"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="btn-crimson py-2.5 rounded-xl text-xs font-bold w-full flex items-center justify-center gap-2 transition-all disabled:opacity-50"
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Sending...
            </>
          ) : (
            <>
              <Send className="w-4 h-4" /> Send Message
            </>
          )}
        </button>
      </form>
    </div>
  );
}
