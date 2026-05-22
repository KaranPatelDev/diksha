"use client";

import { motion } from "framer-motion";
import { Mail, Phone, MapPin, MessageCircle, Send, Instagram, ExternalLink } from "lucide-react";
import { getSettings } from "@/lib/data";
import { useState, useEffect } from "react";
import { SiteSettings } from "@/lib/types";
import SectionHeading from "@/components/SectionHeading";

// Formspree form endpoint - replace with your own after signing up at formspree.io
const FORMSPREE_ENDPOINT = "https://formspree.io/f/xpwzgvrz";

export default function ContactPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch(FORMSPREE_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        }),
      });
      
      if (response.ok) {
        setSubmitted(true);
        setForm({ name: "", email: "", subject: "", message: "" });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fallback to WhatsApp ifFormspree fails
  const sendViaWhatsApp = () => {
    const text = `Hi! I'm ${form.name}%0AEmail: ${form.email}%0ASubject: ${form.subject || 'General Inquiry'}%0AMessage: ${form.message}`;
    window.open(`https://wa.me/919016278391?text=${text}`, "_blank");
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 surface-primary">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeading
          label="Get in Touch"
          title="Contact"
          description="Have a question about an artwork, interested in a commission, or just want to say hello?"
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12 lg:gap-20 max-w-6xl mx-auto">
          {/* Contact Info */}
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-2 space-y-4 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              {settings && (
                <>
                  <a href={`mailto:${settings.email}`} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 surface-card border border-subtle rounded hover:border-gold/30 transition-colors group">
                    <Mail size={18} className="text-gold mt-0.5" />
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider mb-1">Email</p>
                      <p className="text-sm text-primary group-hover:text-gold transition-colors">{settings.email}</p>
                    </div>
                  </a>

                  <a href={`tel:${settings.phone.replace(/\s/g, "")}`} className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 surface-card border border-subtle rounded hover:border-gold/30 transition-colors group">
                    <Phone size={18} className="text-gold mt-0.5" />
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider mb-1">Phone</p>
                      <p className="text-sm text-primary group-hover:text-gold transition-colors">{settings.phone}</p>
                    </div>
                  </a>

                  <a href="https://wa.me/919016278391" target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 surface-card border border-subtle rounded hover:border-rose/30 transition-colors group">
                    <MessageCircle size={18} className="text-rose mt-0.5" />
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider mb-1">WhatsApp</p>
                      <p className="text-sm text-primary group-hover:text-rose transition-colors">Message on WhatsApp</p>
                    </div>
                  </a>

                  {settings.instagram && (
                    <a href={settings.instagram} target="_blank" rel="noopener noreferrer" className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 surface-card border border-subtle rounded hover:border-gold/30 transition-colors group">
                      <Instagram size={18} className="text-gold mt-0.5" />
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wider mb-1">Instagram</p>
                        <p className="text-sm text-primary group-hover:text-gold transition-colors">Follow on Instagram</p>
                      </div>
                    </a>
                  )}

                  <div className="flex items-start gap-3 sm:gap-4 p-4 sm:p-5 surface-card border border-subtle rounded">
                    <MapPin size={18} className="text-gold mt-0.5" />
                    <div>
                      <p className="text-xs text-muted uppercase tracking-wider mb-1">Studio</p>
                      <p className="text-sm text-secondary leading-relaxed">{settings.studioAddress}</p>
                      <p className="text-xs text-muted mt-2">{settings.studioHours}</p>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="lg:col-span-3">
            {submitted ? (
              <div className="surface-card border border-subtle rounded p-8 sm:p-12 text-center">
                <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-6">
                  <Send size={24} className="text-success" />
                </div>
                <h3 className="text-2xl text-primary mb-3" style={{ fontFamily: "var(--font-display)" }}>
                  Message Sent!
                </h3>
                <p className="text-sm text-muted">Thank you for reaching out. I&apos;ll get back to you soon.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="surface-card border border-subtle rounded p-5 sm:p-8 space-y-4 sm:space-y-5">
                <h3 className="text-xl sm:text-2xl text-primary mb-2" style={{ fontFamily: "var(--font-display)" }}>
                  Send a Message
                </h3>
                <p className="text-sm text-muted mb-4 sm:mb-6">
                  I&apos;d love to hear from you. Fill out the form below.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted mb-2 block">Name *</label>
                    <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" className="input-field" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted mb-2 block">Email *</label>
                    <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className="input-field" />
                  </div>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-muted mb-2 block">Subject</label>
                  <select value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="input-field">
                    <option value="">Select a topic</option>
                    <option value="inquiry">Artwork Inquiry</option>
                    <option value="commission">Commission Request</option>
                    <option value="exhibition">Exhibition / Collaboration</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs uppercase tracking-wider text-muted mb-2 block">Message *</label>
                  <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Your message..." className="input-field" rows={5} />
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <button type="submit" disabled={loading} className="btn-sweet-primary flex-1">
                    <span className="flex items-center justify-center gap-2">
                      <Send size={14} /> {loading ? "Sending..." : "Send Message"}
                    </span>
                  </button>
                  <button type="button" onClick={sendViaWhatsApp} className="btn-sweet-outline flex-1">
                    <span className="flex items-center justify-center gap-2">
                      <MessageCircle size={14} /> WhatsApp
                    </span>
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
