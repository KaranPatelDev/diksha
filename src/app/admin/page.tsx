"use client";

import { useStore } from "@/lib/store";
import { useState } from "react";
import { Lock, ArrowRight, Palette, User } from "lucide-react";
import Link from "next/link";
import AdminDashboard from "@/components/admin/AdminDashboard";

export default function AdminPage() {
  const { isAdmin, adminLogin } = useStore();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (adminLogin(username, password)) {
      setUsername("");
      setPassword("");
    } else {
      setError("Invalid username or password.");
    }
  };

  if (!isAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center surface-secondary px-4">
        <div className="w-full max-w-md">
          <div className="surface-primary p-8 sm:p-10 shadow-elevated border border-subtle rounded-xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center rounded-full">
                <Palette size={28} className="text-white" />
              </div>
              <h1
                className="text-3xl text-primary mb-2"
                style={{ fontFamily: "var(--font-display)" }}
              >
                Admin Panel
              </h1>
              <p className="text-sm text-muted">
                Sign in to manage your beautiful artworks.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
                  Username
                </label>
                <div className="relative">
                  <User
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter username"
                    className="input-field pl-10"
                    autoFocus
                  />
                </div>
              </div>

              <div>
                <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
                  Password
                </label>
                <div className="relative">
                  <Lock
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
                  />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter password"
                    className="input-field pl-10"
                  />
                </div>
              </div>

              {error && (
                <p className="text-error text-sm text-center">{error}</p>
              )}

              <button type="submit" className="btn-primary w-full">
                <span className="flex items-center justify-center gap-2">
                  Sign In
                  <ArrowRight size={14} />
                </span>
              </button>
            </form>

            <p className="text-[0.65rem] text-muted text-center mt-6">
              Default credentials: <code className="text-gold">dixa</code> / <code className="text-gold">Dix@._P@te\._3016</code>
            </p>
          </div>

          <div className="text-center mt-6">
            <Link
              href="/"
              className="text-xs text-muted hover:text-gold transition-colors uppercase tracking-wider"
            >
              ← Back to Website
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return <AdminDashboard />;
}
