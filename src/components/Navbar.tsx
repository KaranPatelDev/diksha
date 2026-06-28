"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Menu, X, Sun, Moon, Lock } from "lucide-react";
import { useStore } from "@/lib/store";
import { useTheme } from "@/lib/theme";
import { useRouter } from "next/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/gallery", label: "Gallery" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { openCart, wishlist } = useStore();
  const { theme, toggleTheme } = useTheme();
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminUser, setAdminUser] = useState("");
  const [adminPass, setAdminPass] = useState("");
  const [adminError, setAdminError] = useState("");

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const isAdminPage = pathname.startsWith("/admin");
  if (isAdminPage) return null;

  const handleAdminLogin = () => {
    setAdminError("");
    if (adminUser === "dixa" && adminPass === "Dix@._P@te\\._3016") {
      localStorage.setItem("dixa_admin", "true");
      setShowAdminLogin(false);
      router.push("/admin");
    } else {
      setAdminError("Invalid credentials");
    }
  };

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 glass-effect border-b border-rose/20 shadow-subtle">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="flex items-center justify-between h-16 sm:h-20">
            {/* Logo */}
            <Link href="/" className="flex flex-col">
              <span
                className="text-lg sm:text-xl tracking-[0.15em] uppercase font-medium"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Dixa
              </span>
              <span className="text-[0.55rem] sm:text-[0.6rem] tracking-[0.25em] uppercase -mt-1 opacity-60">
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
                      ? "opacity-100 font-medium"
                      : "opacity-60 hover:opacity-100"
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
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 transition-colors opacity-60 hover:opacity-100"
                aria-label="Toggle theme"
              >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
              </button>

              {/* Wishlist */}
              <Link
                href="/gallery"
                className="p-2 relative transition-colors opacity-60 hover:opacity-100"
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
                className="p-2 relative transition-colors opacity-60 hover:opacity-100"
              >
                <ShoppingBag size={18} />
              </button>

              {/* Admin Login */}
              <button
                onClick={() => setShowAdminLogin(true)}
                className="p-2 transition-colors opacity-40 hover:opacity-100"
                aria-label="Admin Login"
              >
                <Lock size={16} />
              </button>

              {/* Mobile Menu */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className="md:hidden p-2 transition-colors opacity-60 hover:opacity-100"
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
                      ? "opacity-100 font-medium"
                      : "opacity-60 hover:opacity-100"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Admin Login Modal */}
      <AnimatePresence>
        {showAdminLogin && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          >
            <div
              className="absolute inset-0 bg-black/50"
              onClick={() => setShowAdminLogin(false)}
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative w-full max-w-sm surface-primary rounded-lg shadow-elevated p-6"
            >
              <button
                onClick={() => setShowAdminLogin(false)}
                className="absolute top-3 right-3 p-1 opacity-50 hover:opacity-100"
              >
                <X size={18} />
              </button>
              <div className="text-center mb-6">
                <div className="w-12 h-12 mx-auto mb-3 bg-rose/10 rounded-full flex items-center justify-center">
                  <Lock size={20} className="text-rose" />
                </div>
                <h3 className="text-lg text-primary" style={{ fontFamily: "var(--font-display)" }}>
                  Admin Login
                </h3>
              </div>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Username"
                  value={adminUser}
                  onChange={(e) => setAdminUser(e.target.value)}
                  className="input-field text-sm"
                />
                <input
                  type="password"
                  placeholder="Password"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  className="input-field text-sm"
                  onKeyDown={(e) => e.key === "Enter" && handleAdminLogin()}
                />
                {adminError && (
                  <p className="text-error text-xs text-center">{adminError}</p>
                )}
                <button
                  onClick={handleAdminLogin}
                  className="btn-sweet-primary w-full text-xs"
                >
                  Login
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
