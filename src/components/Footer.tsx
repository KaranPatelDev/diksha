"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Mail, MapPin, Phone } from "lucide-react";
import { siteConfig } from "@/lib/data";
import { getSettings } from "@/lib/data";
import { useState, useEffect } from "react";
import { SiteSettings } from "@/lib/types";

export default function Footer() {
  const pathname = usePathname();
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    setSettings(getSettings());
  }, []);

  if (pathname.startsWith("/admin")) return null;

  return (
    <footer className="gradient-dark text-ivory">
      {/* Newsletter Section */}
      <div className="border-b border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h3
                className="text-2xl sm:text-3xl text-ivory mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Stay Connected
              </h3>
              <p className="text-ivory/50 text-sm">
                Get notified about new artworks, exhibitions, and exclusive offers.
              </p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thank you for subscribing!");
              }}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                placeholder="Your email address"
                required
                className="flex-1 px-4 py-3 bg-white/5 border border-white/10 text-ivory text-sm placeholder:text-ivory/30 focus:border-gold focus:outline-none transition-colors"
              />
              <button
                type="submit"
                className="btn-gold shrink-0 text-xs"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Main Footer */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {/* Brand */}
          <div>
            <Link href="/" className="inline-block">
              <span
                className="text-xl tracking-[0.15em] uppercase font-medium text-ivory"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Diksha
              </span>
              <span className="block text-[0.6rem] tracking-[0.25em] uppercase text-ivory/40 -mt-1">
                Art Studio
              </span>
            </Link>
            <p className="text-ivory/40 text-sm mt-4 leading-relaxed max-w-xs">
              {settings?.tagline || "Original art that transforms spaces"}
            </p>
            <div className="flex items-center gap-3 mt-6">
              {settings?.instagram && (
                <a
                  href={settings.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 border border-white/15 flex items-center justify-center text-ivory/50 hover:text-gold hover:border-gold transition-colors"
                >
                  <Instagram size={16} />
                </a>
              )}
              {settings?.email && (
                <a
                  href={`mailto:${settings.email}`}
                  className="w-9 h-9 border border-white/15 flex items-center justify-center text-ivory/50 hover:text-gold hover:border-gold transition-colors"
                >
                  <Mail size={16} />
                </a>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-ivory/60 mb-4">
              Explore
            </h4>
            <ul className="space-y-3">
              {[
                { href: "/gallery", label: "Gallery" },
                { href: "/about", label: "About" },
                { href: "/contact", label: "Contact" },
                { href: "/gallery?available=true", label: "Available Works" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-ivory/40 hover:text-gold transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-ivory/60 mb-4">
              Contact
            </h4>
            {settings && (
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-ivory/40">
                  <Mail size={14} className="mt-1 flex-shrink-0" />
                  <span>{settings.email}</span>
                </li>
                <li className="flex items-start gap-2 text-sm text-ivory/40">
                  <Phone size={14} className="mt-1 flex-shrink-0" />
                  <span>{settings.phone}</span>
                </li>
              </ul>
            )}
          </div>

          {/* Studio */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-ivory/60 mb-4">
              Studio
            </h4>
            {settings && (
              <div className="flex items-start gap-2 text-sm text-ivory/40">
                <MapPin size={14} className="mt-1 flex-shrink-0" />
                <span>{settings.studioAddress}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 py-5 sm:py-6 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-ivory/30 text-xs">
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>
          <Link
            href="/admin"
            className="text-ivory/20 text-xs hover:text-ivory/40 transition-colors"
          >
            Admin
          </Link>
        </div>
      </div>
    </footer>
  );
}
