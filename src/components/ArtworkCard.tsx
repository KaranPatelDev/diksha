"use client";

import { useStore } from "@/lib/store";
import { Artwork } from "@/lib/types";
import { formatPrice } from "@/lib/utils";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface ArtworkCardProps {
  artwork: Artwork;
  index?: number;
}

export default function ArtworkCard({ artwork, index = 0 }: ArtworkCardProps) {
  const { addToCart, isInCart, addToWishlist, removeFromWishlist, isInWishlist } =
    useStore();

  const inCart = isInCart(artwork.id);
  const inWishlist = isInWishlist(artwork.id);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link href={`/artwork/${artwork.slug}`} className="block group">
        <div className="artwork-card surface-secondary aspect-[3/4] relative rounded-sm overflow-hidden">
          {/* Image or Placeholder */}
          {artwork.image ? (
            <Image
              src={artwork.image}
              alt={artwork.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="absolute inset-0 object-cover"
              priority={index < 2}
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sand/60 to-taupe/40">
              <span
                className="text-4xl text-warm-gray/40 select-none"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {artwork.title
                  .split(" ")
                  .map((w) => w[0])
                  .join("")
                  .slice(0, 2)}
              </span>
            </div>
          )}

          {/* Overlay */}
          <div className="artwork-overlay" />

          {/* Badges */}
          <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex flex-col gap-2 z-10">
            {artwork.artworkOfTheWeek && (
              <span className="badge-gold text-[0.6rem] sm:text-xs">✦ Featured</span>
            )}
            {!artwork.available && <span className="badge-sold text-[0.6rem] sm:text-xs">Sold</span>}
          </div>

          {/* Hover Actions */}
          <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4 z-10 flex items-center gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (artwork.available && !inCart) addToCart(artwork);
              }}
              disabled={!artwork.available || inCart}
              className={`flex-1 py-2 sm:py-2.5 text-[0.65rem] sm:text-xs uppercase tracking-wider font-medium transition-colors ${
                inCart
                  ? "bg-gold text-midnight"
                  : artwork.available
                  ? "bg-ivory text-midnight hover:bg-gold"
                  : "bg-ivory/50 text-warm-gray cursor-not-allowed"
              }`}
            >
              {inCart ? "In Cart" : artwork.available ? "Add to Cart" : "Sold"}
            </button>
            <button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                inWishlist
                  ? removeFromWishlist(artwork.id)
                  : addToWishlist(artwork);
              }}
              className={`p-2 sm:p-2.5 transition-colors ${
                inWishlist
                  ? "bg-gold text-midnight"
                  : "bg-ivory text-charcoal hover:bg-gold hover:text-midnight"
              }`}
            >
              <Heart size={14} fill={inWishlist ? "currentColor" : "none"} />
            </button>
          </div>
        </div>
      </Link>

      {/* Info */}
      <div className="mt-3 sm:mt-4 space-y-1">
        <div className="flex items-start justify-between gap-3 sm:gap-4">
          <div className="min-w-0">
            <h3
              className="text-base sm:text-lg text-primary truncate"
              style={{ fontFamily: "var(--font-display)" }}
            >
              <Link href={`/artwork/${artwork.slug}`}>{artwork.title}</Link>
            </h3>
            <p className="text-[0.65rem] sm:text-xs text-muted mt-0.5 truncate">
              {artwork.medium} · {artwork.dimensions}
            </p>
          </div>
          <div className="text-right shrink-0">
            <p
              className="text-base sm:text-lg text-primary"
              style={{ fontFamily: "var(--font-display)" }}
            >
              {formatPrice(artwork.price)}
            </p>
            {artwork.available ? (
              <span className="text-[0.55rem] sm:text-[0.65rem] text-success uppercase tracking-wider">
                Available
              </span>
            ) : (
              <span className="text-[0.55rem] sm:text-[0.65rem] text-error uppercase tracking-wider">
                Sold
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
