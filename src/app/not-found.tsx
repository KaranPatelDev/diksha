"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory px-6">
      <div className="text-center max-w-md">
        <h1
          className="text-8xl text-gold/20 mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          404
        </h1>
        <h2
          className="text-3xl text-midnight mb-4"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Page Not Found
        </h2>
        <p className="text-sm text-warm-gray mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link href="/" className="btn-primary">
            <span>Back to Home</span>
          </Link>
          <Link href="/gallery" className="btn-outline">
            View Gallery
          </Link>
        </div>
      </div>
    </div>
  );
}
