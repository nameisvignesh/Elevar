'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CalendarDays, Clock3, Download, Mail, Phone, Send, Sparkles, UserRound } from 'lucide-react';

const timeSlots = [
  '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00',
  '17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00', '20:30', '21:00'
];

type BeforeInstallPromptEvent = Event & {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
};

export default function BookCall() {
  const [submitted, setSubmitted] = useState(false);
  const [installPrompt, setInstallPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    website: '',
    brandGoal: '',
    frustration: '',
    role: '',
    revenue: '',
    date: '',
    time: ''
  });

  useEffect(() => {
    const handlePrompt = (event: Event) => {
      event.preventDefault();
      setInstallPrompt(event as BeforeInstallPromptEvent);
    };
    window.addEventListener('beforeinstallprompt', handlePrompt);
    return () => window.removeEventListener('beforeinstallprompt', handlePrompt);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const installApp = async () => {
    if (!installPrompt) return;
    await installPrompt.prompt();
    await installPrompt.userChoice;
    setInstallPrompt(null);
  };

  return (
    <main className="booking-hero">
      <section className="container">
        <div className="grid-2">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="booking-panel">
            <span className="eyebrow">Google Booking-ready</span>
            <h1>Book a fast strategy call.</h1>
            <p>
              Pick an Indian time window, share the brand context, and your request is queued instantly. This page is structured to mirror the information you need inside Google Bookings.
            </p>
            <div className="booking-meta">
              <div><CalendarDays size={18} /> <span>Preferred calendar date with rapid local confirmation</span></div>
              <div><Clock3 size={18} /> <span>IST slots: 6:00 AM-9:00 AM and 5:00 PM-9:00 PM</span></div>
              <div><Sparkles size={18} /> <span>Traffic queue message appears immediately after submit</span></div>
            </div>
            {installPrompt && (
              <button className="btn btn-secondary" onClick={installApp} type="button">
                <Download size={16} /> Install Elevar Web
              </button>
            )}
          </motion.div>

          <motion.form initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }} className="call-form form-grid" onSubmit={handleSubmit}>
            <div className="form-row">
              <div className="field">
                <label htmlFor="name">Name</label>
                <input id="name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" />
              </div>
              <div className="field">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="you@company.com" />
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="phone">Phone number</label>
                <input id="phone" required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 99999 99999" />
              </div>
              <div className="field">
                <label htmlFor="website">Website URL or LinkedIn profile</label>
                <input id="website" value={form.website} onChange={(e) => setForm({ ...form, website: e.target.value })} placeholder="https://..." />
              </div>
            </div>
            <div className="field">
              <label htmlFor="goal">If we could fix one thing about your personal brand in the next 90 days, what would make the biggest difference?</label>
              <textarea id="goal" value={form.brandGoal} onChange={(e) => setForm({ ...form, brandGoal: e.target.value })} rows={3} />
            </div>
            <div className="field">
              <label htmlFor="frustration">What is your #1 frustration with your personal brand or content right now?</label>
              <textarea id="frustration" value={form.frustration} onChange={(e) => setForm({ ...form, frustration: e.target.value })} rows={3} />
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="role">What best describes you?</label>
                <select id="role" value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                  <option value="">Select</option>
                  <option value="Founder">Founder</option>
                  <option value="Creator">Creator</option>
                  <option value="Consultant">Consultant</option>
                  <option value="Agency owner">Agency owner</option>
                </select>
              </div>
              <div className="field">
                <label htmlFor="revenue">Current monthly business revenue</label>
                <select id="revenue" value={form.revenue} onChange={(e) => setForm({ ...form, revenue: e.target.value })}>
                  <option value="">Select</option>
                  <option value="Pre-revenue">Pre-revenue</option>
                  <option value="Under 1L">Under 1L INR</option>
                  <option value="1L-5L">1L-5L INR</option>
                  <option value="5L+">5L+ INR</option>
                </select>
              </div>
            </div>
            <div className="form-row">
              <div className="field">
                <label htmlFor="date">Preferred date</label>
                <input id="date" type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} />
              </div>
              <div className="field">
                <label htmlFor="time">Preferred time</label>
                <select id="time" required value={form.time} onChange={(e) => setForm({ ...form, time: e.target.value })}>
                  <option value="">Select IST slot</option>
                  {timeSlots.map((slot) => <option key={slot} value={slot}>{slot} IST</option>)}
                </select>
              </div>
            </div>
            <button className="btn btn-primary" type="submit"><UserRound size={16} /> Submit booking request <Send size={16} /></button>
            {submitted && <p className="queue-note"><Mail size={16} /> Your call request is queued. Elevar will confirm the Google Booking slot shortly.</p>}
          </motion.form>
        </div>
      </section>
    </main>
  );
}
