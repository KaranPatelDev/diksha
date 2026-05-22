"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";
import { Testimonial } from "@/lib/types";

interface TestimonialCardProps {
  testimonial: Testimonial;
  index?: number;
}

export default function TestimonialCard({
  testimonial,
  index = 0,
}: TestimonialCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15 }}
      className="surface-card border border-subtle p-5 sm:p-6 lg:p-8 relative group hover:border-gold/30 transition-colors"
    >
      <Quote
        size={28}
        className="text-gold/15 absolute top-4 right-4"
      />

      {/* Stars */}
      <div className="flex gap-0.5 mb-3 sm:mb-4">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star
            key={i}
            size={12}
            className="text-gold fill-gold"
          />
        ))}
      </div>

      {/* Quote */}
      <p
        className="text-sm text-secondary italic leading-relaxed mb-4 sm:mb-6"
        style={{ fontFamily: "var(--font-display)" }}
      >
        &ldquo;{testimonial.text}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3">
        <div
          className="w-9 h-9 bg-gold/10 rounded-full flex items-center justify-center text-xs text-gold"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {testimonial.name
            .split(" ")
            .map((n) => n[0])
            .join("")}
        </div>
        <div>
          <p className="text-sm text-primary font-medium">{testimonial.name}</p>
          {testimonial.location && (
            <p className="text-[0.65rem] text-muted">
              {testimonial.location}
            </p>
          )}
        </div>
      </div>

      {testimonial.artworkPurchased && (
        <p className="text-[0.65rem] text-gold mt-3 pt-3 border-t border-subtle">
          Collected: {testimonial.artworkPurchased}
        </p>
      )}
    </motion.div>
  );
}
