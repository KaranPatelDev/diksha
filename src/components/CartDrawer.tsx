"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export default function CartDrawer() {
  const { isCartOpen, closeCart, cart, removeFromCart, getCartTotal, getCartCount } = useStore();

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-midnight/50 z-50"
            onClick={closeCart}
          />

          {/* Drawer */}
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.3 }}
            className="fixed right-0 top-0 bottom-0 z-50 w-full sm:w-96 surface-primary flex flex-col shadow-elevated"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 sm:p-6 border-b border-subtle">
              <div className="flex items-center gap-2">
                <ShoppingBag size={18} className="text-primary" />
                <h3
                  className="text-lg text-primary"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  Cart ({getCartCount()})
                </h3>
              </div>
              <button
                onClick={closeCart}
                className="p-2 text-muted hover:text-primary transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              {cart.length === 0 ? (
                <div className="text-center py-12">
                  <ShoppingBag size={32} className="text-muted mx-auto mb-4" />
                  <p className="text-sm text-muted mb-4">Your cart is empty</p>
                  <Link
                    href="/gallery"
                    onClick={closeCart}
                    className="btn-outline text-xs"
                  >
                    Browse Gallery
                  </Link>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div
                      key={item.artwork.id}
                      className="flex gap-3 sm:gap-4 pb-4 border-b border-subtle"
                    >
                      <div className="w-16 sm:w-20 aspect-[3/4] surface-secondary overflow-hidden rounded-sm flex-shrink-0">
                        {item.artwork.image ? (
                          <img
                            src={item.artwork.image}
                            alt={item.artwork.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div
                            className="w-full h-full flex items-center justify-center text-muted text-xs"
                            style={{ fontFamily: "var(--font-display)" }}
                          >
                            {item.artwork.title.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <Link
                          href={`/artwork/${item.artwork.slug}`}
                          onClick={closeCart}
                          className="text-sm text-primary hover:text-gold transition-colors truncate block"
                        >
                          {item.artwork.title}
                        </Link>
                        <p className="text-xs text-muted mt-0.5">{item.artwork.medium}</p>
                        <p
                          className="text-sm text-primary mt-2"
                          style={{ fontFamily: "var(--font-display)" }}
                        >
                          {formatPrice(item.artwork.price)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.artwork.id)}
                        className="p-1.5 text-muted hover:text-error transition-colors self-start"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cart.length > 0 && (
              <div className="border-t border-subtle p-4 sm:p-6 space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="text-primary" style={{ fontFamily: "var(--font-display)" }}>Total</span>
                  <span className="text-primary" style={{ fontFamily: "var(--font-display)" }}>
                    {formatPrice(getCartTotal())}
                  </span>
                </div>
                <Link
                  href="/checkout"
                  onClick={closeCart}
                  className="btn-primary w-full"
                >
                  <span className="flex items-center justify-center gap-2">
                    Checkout <ArrowRight size={14} />
                  </span>
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
