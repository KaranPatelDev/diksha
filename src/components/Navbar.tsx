"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openCart, wishlist } = useStore();

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isAdminPage = pathname.startsWith("/admin");
  if (isAdminPage) return null;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-rose/20 shadow-subtle">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col">
              <span
                className="text-lg sm:text-xl tracking-[0.15em] uppercase font-medium text-rose-dark"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Diksha
              </span>
              <span className="text-[0.55rem] sm:text-[0.6rem] tracking-[0.25em] uppercase -mt-1 text-rose/60">
                Art Studio
              </span>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden md:flex items-center gap-6 lg:gap-10">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-[0.7rem] lg:text-xs tracking-[0.15em] uppercase transition-colors relative py-1 ${
                    pathname === link.href
                      ? "text-rose-dark font-medium"
                      : "text-charcoal/70 hover:text-rose"
                  }`}
                >
                  {link.label}
                  {pathname === link.href && (
                    <motion.span
                      layoutId="nav-underline"
                      className="absolute bottom-0 left-0 right-0 h-px bg-rose"
                    />
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Wishlist */}
              <Link
                href="/gallery"
                className="p-2 relative transition-colors text-charcoal/70 hover:text-rose"
              >
                <Heart size={18} />
                {wishlist.length > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-rose text-white text-[0.6rem] rounded-full flex items-center justify-center font-semibold">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <button
                onClick={openCart}
                className="p-2 relative transition-colors text-charcoal/70 hover:text-rose"
              >
                <ShoppingBag size={18} />
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 text-charcoal/70 hover:text-rose"
              >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-white/80 backdrop-blur-md"
              onClick={() => setMobileOpen(false)}
            />
            <motion.nav
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="absolute right-0 top-0 bottom-0 w-72 surface-card flex flex-col pt-20 px-8"
            >
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className={`py-4 text-sm tracking-[0.1em] uppercase border-b border-subtle transition-colors ${
                    pathname === link.href
                      ? "text-rose-dark font-medium"
                      : "text-charcoal/70 hover:text-rose"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/admin"
                onClick={() => setMobileOpen(false)}
                className="py-4 text-xs tracking-[0.1em] uppercase text-charcoal/50 hover:text-rose transition-colors mt-4"
              >
                Admin Panel
              </Link>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
