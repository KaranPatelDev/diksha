"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Award, Calendar, MapPin } from "lucide-react";
import { getSettings } from "@/lib/data";
import { useState, useEffect } from "react";
import { SiteSettings } from "@/lib/types";
import SectionHeading from "@/components/SectionHeading";

export default function AboutPage() {
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  if (!settings) return null;

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 surface-primary">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-xs tracking-[0.2em] uppercase text-gold mb-3 block">
            The Artist
          </motion.span>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-5xl lg:text-6xl text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>
            {settings.artistFullName}
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-sm sm:text-base text-muted">
            {settings.artistTitle}
          </motion.p>
        </div>

        {/* Hero Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 mb-16 sm:mb-20">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="aspect-[4/5] surface-secondary relative overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sand/60 to-taupe/30">
                <div className="text-center">
                  <span className="text-7xl sm:text-8xl text-warm-gray/20" style={{ fontFamily: "var(--font-display)" }}>
                    {settings.artistFullName.split(" ").map((w) => w[0]).join("")}
                  </span>
                  <p className="text-warm-gray/30 text-xs tracking-[0.3em] uppercase mt-2">Artist Portrait</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.8, delay: 0.2 }} className="flex flex-col justify-center">
            <h2 className="text-2xl sm:text-3xl text-primary mb-4 sm:mb-6" style={{ fontFamily: "var(--font-display)" }}>
              About the Artist
            </h2>
            {settings.bio.split("\n\n").map((para, i) => (
              <p key={i} className="text-secondary text-sm leading-relaxed mb-4">{para}</p>
            ))}
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-subtle">
              {[
                { label: "Years", value: "10+" },
                { label: "Artworks", value: "150+" },
                { label: "Collections", value: "50+" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-xl sm:text-2xl text-gold" style={{ fontFamily: "var(--font-display)" }}>{stat.value}</p>
                  <p className="text-[0.6rem] sm:text-xs text-muted uppercase tracking-wider">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Philosophy */}
        {settings.philosophy && (
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="mb-16 sm:mb-20 py-12 sm:py-16 gradient-dark text-ivory -mx-4 sm:-mx-6 lg:-mx-12 px-6 sm:px-12 lg:px-20">
            <div className="max-w-3xl mx-auto text-center">
              <span className="text-xs tracking-[0.2em] uppercase text-gold mb-4 block">Philosophy</span>
              <h2 className="text-3xl sm:text-4xl text-ivory mb-6 sm:mb-8" style={{ fontFamily: "var(--font-display)" }}>
                Artistic Vision
              </h2>
              {settings.philosophy.split("\n\n").map((para, i) => (
                <p key={i} className="text-ivory/60 text-sm leading-relaxed mb-4 italic" style={{ fontFamily: "var(--font-display)" }}>
                  {para}
                </p>
              ))}
            </div>
          </motion.section>
        )}

        {/* Achievements */}
        {settings.achievements.length > 0 && (
          <section className="mb-16 sm:mb-20">
            <SectionHeading label="Milestones" title="Achievements & Exhibitions" />
            <div className="max-w-3xl mx-auto space-y-3 sm:space-y-4">
              {settings.achievements.map((achievement, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 surface-card border border-subtle rounded hover:border-gold/30 transition-colors">
                  <Award size={16} className="text-gold mt-0.5 shrink-0" />
                  <p className="text-sm text-secondary">{achievement}</p>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* Studio */}
        <section className="mb-16 sm:mb-20">
          <SectionHeading label="Visit" title="The Studio" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-3xl mx-auto">
            <div className="surface-card p-5 sm:p-6 border border-subtle rounded">
              <MapPin size={20} className="text-gold mb-3" />
              <h4 className="text-sm text-primary font-medium mb-2 uppercase tracking-wider">Location</h4>
              <p className="text-sm text-muted leading-relaxed">{settings.studioAddress}</p>
            </div>
            <div className="surface-card p-5 sm:p-6 border border-subtle rounded">
              <Calendar size={20} className="text-gold mb-3" />
              <h4 className="text-sm text-primary font-medium mb-2 uppercase tracking-wider">Hours</h4>
              <p className="text-sm text-muted leading-relaxed">{settings.studioHours}</p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center py-12 sm:py-16">
          <h2 className="text-3xl sm:text-4xl text-primary mb-4 sm:mb-6" style={{ fontFamily: "var(--font-display)" }}>
            Interested in a Commission?
          </h2>
          <p className="text-muted text-sm mb-6 sm:mb-8 max-w-lg mx-auto">
            Get in touch to discuss custom artwork for your space.
          </p>
          <Link href="/contact" className="btn-primary">
            <span className="flex items-center gap-2">Get in Touch <ArrowRight size={14} /></span>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
