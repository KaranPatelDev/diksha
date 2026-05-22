"use client";

import { use } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Heart,
  ShoppingBag,
  Share2,
  ZoomIn,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import Link from "next/link";
import { getArtworks, getArtworkBySlug } from "@/lib/data";
import { formatPrice } from "@/lib/utils";
import { useStore } from "@/lib/store";
import ArtworkCard from "@/components/ArtworkCard";
import SectionHeading from "@/components/SectionHeading";
import { useState, useEffect } from "react";
import { Artwork } from "@/lib/types";

export default function ArtworkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { addToCart, isInCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore();
  const [zoomed, setZoomed] = useState(false);
  const [artwork, setArtwork] = useState<Artwork | null | undefined>(undefined);
  const [relatedArtworks, setRelatedArtworks] = useState<Artwork[]>([]);

  useEffect(() => {
    const found = getArtworkBySlug(slug);
    setArtwork(found || null);
    if (found) {
      const related = getArtworks()
        .filter((a) => a.id !== found.id && a.category === found.category)
        .slice(0, 3);
      setRelatedArtworks(related);
    }
  }, [slug]);

  if (artwork === undefined) {
    return (
      <div className="pt-32 pb-20 text-center surface-primary">
        <div className="skeleton w-48 h-8 mx-auto mb-4" />
        <div className="skeleton w-64 h-4 mx-auto" />
      </div>
    );
  }

  if (!artwork) {
    return (
      <div className="pt-32 pb-20 text-center surface-primary px-4">
        <h1 className="text-3xl sm:text-4xl text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>
          Artwork Not Found
        </h1>
        <p className="text-muted mb-8">The artwork you&apos;re looking for doesn&apos;t exist.</p>
        <Link href="/gallery" className="btn-primary"><span>Back to Gallery</span></Link>
      </div>
    );
  }

  const inCart = isInCart(artwork.id);
  const inWishlist = isInWishlist(artwork.id);

  return (
    <div className="pt-20 sm:pt-24 pb-16 sm:pb-20 surface-primary">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 mb-6 sm:mb-8">
        <div className="flex items-center gap-2 text-xs text-muted overflow-x-auto whitespace-nowrap">
          <Link href="/" className="hover:text-primary transition-colors">Home</Link>
          <span>/</span>
          <Link href="/gallery" className="hover:text-primary transition-colors">Gallery</Link>
          <span>/</span>
          <span className="text-primary truncate">{artwork.title}</span>
        </div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20">
          {/* Image */}
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }}>
            <div
              className={`relative overflow-hidden cursor-zoom-in ${
                zoomed ? "fixed inset-0 z-50 bg-midnight/95 cursor-zoom-out flex items-center justify-center p-4 sm:p-8" : "aspect-[3/4] surface-secondary"
              }`}
              onClick={() => setZoomed(!zoomed)}
            >
              {artwork.image ? (
                <img
                  src={artwork.image}
                  alt={artwork.title}
                  className={zoomed ? "max-w-full max-h-full object-contain" : "absolute inset-0 w-full h-full object-cover"}
                />
              ) : (
                <div className={`flex items-center justify-center bg-gradient-to-br from-sand/60 to-taupe/30 ${zoomed ? "w-full h-full" : "absolute inset-0"}`}>
                  <span className={`text-warm-gray/30 ${zoomed ? "text-9xl" : "text-8xl"}`} style={{ fontFamily: "var(--font-display)" }}>
                    {artwork.title.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                  </span>
                </div>
              )}
              {!zoomed && (
                <button className="absolute bottom-4 right-4 p-2 bg-ivory/80 text-charcoal hover:bg-ivory transition-colors" onClick={(e) => { e.stopPropagation(); setZoomed(true); }}>
                  <ZoomIn size={18} />
                </button>
              )}
            </div>
          </motion.div>

          {/* Details */}
          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="flex flex-col">
            <Link href="/gallery" className="flex items-center gap-2 text-xs text-muted hover:text-primary uppercase tracking-wider mb-4 sm:mb-6 transition-colors">
              <ArrowLeft size={14} /> Back to Gallery
            </Link>

            <span className="text-xs tracking-[0.2em] uppercase text-gold mb-3">
              {artwork.category.replace("-", " ")}
            </span>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl text-primary mb-3 sm:mb-4" style={{ fontFamily: "var(--font-display)" }}>
              {artwork.title}
            </h1>

            <div className="flex flex-wrap gap-x-3 gap-y-1 text-sm text-muted mb-3 sm:mb-4">
              <span>{artwork.medium}</span><span>·</span>
              <span>{artwork.dimensions}</span><span>·</span>
              <span>{artwork.year}</span>
            </div>

            <div className="flex items-center gap-4 mb-4 sm:mb-6">
              <span className="text-2xl sm:text-3xl text-primary" style={{ fontFamily: "var(--font-display)" }}>
                {formatPrice(artwork.price)}
              </span>
              {artwork.originalPrice && (
                <span className="text-lg text-muted line-through">{formatPrice(artwork.originalPrice)}</span>
              )}
            </div>

            <div className="mb-6 sm:mb-8 flex flex-wrap items-center gap-2">
              {artwork.available ? <span className="badge-available">● Available</span> : <span className="badge-sold">Sold</span>}
              {artwork.artworkOfTheWeek && <span className="badge-gold">✦ Featured</span>}
            </div>

            {artwork.description && (
              <p className="text-secondary text-sm leading-relaxed mb-4 sm:mb-6">{artwork.description}</p>
            )}

            {artwork.story && (
              <>
                <div className="divider mb-4 sm:mb-6" />
                <div className="mb-6 sm:mb-8">
                  <h3 className="text-lg text-primary mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    The Story
                  </h3>
                  <p className="text-secondary text-sm leading-relaxed">{artwork.story}</p>
                </div>
              </>
            )}

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-3 mb-6 sm:mb-8">
              {artwork.available && (
                <button onClick={() => !inCart && addToCart(artwork)} disabled={inCart} className={`flex-1 ${inCart ? "btn-gold" : "btn-primary"}`}>
                  <span className="flex items-center justify-center gap-2">
                    <ShoppingBag size={16} />{inCart ? "In Cart" : "Add to Cart"}
                  </span>
                </button>
              )}
              <button onClick={() => inWishlist ? removeFromWishlist(artwork.id) : addToWishlist(artwork)} className="btn-outline">
                <Heart size={16} fill={inWishlist ? "currentColor" : "none"} />
                {inWishlist ? "Saved" : "Save"}
              </button>
              <button onClick={() => navigator.clipboard?.writeText(window.location.href)} className="btn-outline px-4">
                <Share2 size={16} />
              </button>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
              {[
                { icon: Truck, title: "Free Shipping", desc: "Worldwide" },
                { icon: Shield, title: "Authenticity", desc: "Certificate" },
                { icon: RotateCcw, title: "14-Day Returns", desc: "Hassle-free" },
              ].map(({ icon: Icon, title, desc }) => (
                <div key={title} className="flex flex-col items-center gap-1 sm:gap-2 p-3 sm:p-4 surface-card rounded">
                  <Icon size={16} className="text-gold" />
                  <span className="text-[0.6rem] sm:text-xs text-primary font-medium uppercase tracking-wider">{title}</span>
                  <span className="text-[0.55rem] sm:text-[0.65rem] text-muted hidden sm:block">{desc}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Related */}
        {relatedArtworks.length > 0 && (
          <section className="mt-16 sm:mt-24">
            <SectionHeading label="You Might Also Like" title="Related Artworks" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {relatedArtworks.map((art, i) => (
                <ArtworkCard key={art.id} artwork={art} index={i} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
