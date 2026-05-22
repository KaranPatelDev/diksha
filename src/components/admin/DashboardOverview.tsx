"use client";

import { useEffect, useState } from "react";
import { getArtworks, getTestimonials } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { ImagePlus, DollarSign, Package, MessageSquare, TrendingUp, Eye } from "lucide-react";
import { Artwork } from "@/lib/types";

interface Props {
  onNavigate: (tab: "artworks" | "testimonials" | "settings") => void;
}

export default function DashboardOverview({ onNavigate }: Props) {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [testimonialCount, setTestimonialCount] = useState(0);

  useEffect(() => {
    setArtworks(getArtworks());
    setTestimonialCount(getTestimonials().length);
  }, []);

  const totalArtworks = artworks.length;
  const availableArtworks = artworks.filter((a) => a.available).length;
  const soldArtworks = artworks.filter((a) => !a.available).length;
  const totalValue = artworks.reduce((sum, a) => sum + a.price, 0);
  const availableValue = artworks.filter((a) => a.available).reduce((sum, a) => sum + a.price, 0);
  const recentArtworks = [...artworks]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5);

  return (
    <div className="space-y-6 sm:space-y-8">
      {/* Welcome */}
      <div className="surface-primary p-5 sm:p-6 border border-subtle rounded">
        <h3
          className="text-xl sm:text-2xl text-primary mb-2"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Welcome back, Diksha ✦
        </h3>
        <p className="text-sm text-muted">
          Manage your artworks, testimonials, and site settings from here.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        {[
          {
            label: "Total Artworks",
            value: totalArtworks,
            icon: ImagePlus,
            color: "text-gold",
            bg: "bg-gold/10",
          },
          {
            label: "Available",
            value: availableArtworks,
            icon: Package,
            color: "text-success",
            bg: "bg-success/10",
          },
          {
            label: "Sold",
            value: soldArtworks,
            icon: TrendingUp,
            color: "text-terracotta",
            bg: "bg-terracotta/10",
          },
          {
            label: "Testimonials",
            value: testimonialCount,
            icon: MessageSquare,
            color: "text-deep-blue",
            bg: "bg-deep-blue/10",
          },
        ].map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className="surface-primary p-4 sm:p-5 border border-subtle rounded"
            >
              <div className={`w-10 h-10 ${stat.bg} flex items-center justify-center rounded mb-3`}>
                <Icon size={18} className={stat.color} />
              </div>
              <p className="text-2xl sm:text-3xl text-primary font-medium" style={{ fontFamily: "var(--font-display)" }}>
                {stat.value}
              </p>
              <p className="text-xs text-muted mt-1 uppercase tracking-wider">{stat.label}</p>
            </div>
          );
        })}
      </div>

      {/* Portfolio Value */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        <div className="surface-primary p-5 sm:p-6 border border-subtle rounded">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-gold/10 flex items-center justify-center rounded">
              <DollarSign size={18} className="text-gold" />
            </div>
            <p className="text-xs text-muted uppercase tracking-wider">Total Portfolio Value</p>
          </div>
          <p className="text-2xl sm:text-3xl text-primary" style={{ fontFamily: "var(--font-display)" }}>
            {formatPrice(totalValue)}
          </p>
        </div>
        <div className="surface-primary p-5 sm:p-6 border border-subtle rounded">
          <div className="flex items-center gap-3 mb-2">
            <div className="w-10 h-10 bg-success/10 flex items-center justify-center rounded">
              <Eye size={18} className="text-success" />
            </div>
            <p className="text-xs text-muted uppercase tracking-wider">Available Value</p>
          </div>
          <p className="text-2xl sm:text-3xl text-primary" style={{ fontFamily: "var(--font-display)" }}>
            {formatPrice(availableValue)}
          </p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <button
          onClick={() => onNavigate("artworks")}
          className="surface-primary p-5 sm:p-6 border border-subtle rounded text-left hover:border-gold transition-colors group"
        >
          <ImagePlus size={24} className="text-gold mb-3" />
          <h4 className="text-sm text-primary font-medium mb-1 group-hover:text-gold transition-colors">
            Add Artwork
          </h4>
          <p className="text-xs text-muted">Upload and list a new painting</p>
        </button>
        <button
          onClick={() => onNavigate("testimonials")}
          className="surface-primary p-5 sm:p-6 border border-subtle rounded text-left hover:border-gold transition-colors group"
        >
          <MessageSquare size={24} className="text-gold mb-3" />
          <h4 className="text-sm text-primary font-medium mb-1 group-hover:text-gold transition-colors">
            Add Testimonial
          </h4>
          <p className="text-xs text-muted">Share collector feedback</p>
        </button>
        <button
          onClick={() => onNavigate("settings")}
          className="surface-primary p-5 sm:p-6 border border-subtle rounded text-left hover:border-gold transition-colors group"
        >
          <Eye size={24} className="text-gold mb-3" />
          <h4 className="text-sm text-primary font-medium mb-1 group-hover:text-gold transition-colors">
            Site Settings
          </h4>
          <p className="text-xs text-muted">Update bio, contact, socials</p>
        </button>
      </div>

      {/* Recent Artworks */}
      {recentArtworks.length > 0 && (
        <div className="surface-primary border border-subtle rounded overflow-hidden">
          <div className="p-4 sm:p-5 border-b border-subtle">
            <h4 className="text-sm text-primary font-medium uppercase tracking-wider">
              Recent Artworks
            </h4>
          </div>
          <div className="divide-y divide-subtle">
            {recentArtworks.map((artwork) => (
              <div
                key={artwork.id}
                className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 hover:bg-gold/5 transition-colors"
              >
                <div className="w-12 h-12 sm:w-14 sm:h-14 surface-secondary flex-shrink-0 overflow-hidden rounded-sm">
                  {artwork.image ? (
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted text-xs" style={{ fontFamily: "var(--font-display)" }}>
                      {artwork.title.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-primary truncate">{artwork.title}</p>
                  <p className="text-xs text-muted">{artwork.category} · {artwork.medium}</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm text-primary">{formatPrice(artwork.price)}</p>
                  {artwork.available ? (
                    <span className="text-[0.6rem] text-success uppercase tracking-wider">
                      Available
                    </span>
                  ) : (
                    <span className="text-[0.6rem] text-error uppercase tracking-wider">
                      Sold
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
