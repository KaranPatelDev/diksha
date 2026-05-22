"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ShoppingBag, Truck, CreditCard, Package } from "lucide-react";
import Link from "next/link";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

type Step = "shipping" | "payment" | "confirmation";

export default function CheckoutPage() {
  const { cart, getCartTotal, clearCart } = useStore();
  const [step, setStep] = useState<Step>("shipping");
  const [shipping, setShipping] = useState({ name: "", email: "", phone: "", address: "", city: "", state: "", pincode: "" });

  if (cart.length === 0 && step !== "confirmation") {
    return (
      <div className="pt-32 pb-20 text-center surface-primary px-4">
        <ShoppingBag size={48} className="text-muted mx-auto mb-4" />
        <h1 className="text-3xl text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Cart is Empty</h1>
        <p className="text-muted text-sm mb-8">Add some artworks to your cart before checking out.</p>
        <Link href="/gallery" className="btn-primary"><span>Browse Gallery</span></Link>
      </div>
    );
  }

  const steps = [
    { id: "shipping" as Step, label: "Shipping", icon: Truck },
    { id: "payment" as Step, label: "Payment", icon: CreditCard },
    { id: "confirmation" as Step, label: "Confirmed", icon: Package },
  ];

  const handlePlaceOrder = () => {
    setStep("confirmation");
    clearCart();
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 surface-primary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Breadcrumb */}
        <Link href="/gallery" className="flex items-center gap-2 text-xs text-muted hover:text-primary uppercase tracking-wider mb-6 sm:mb-8 transition-colors">
          <ArrowLeft size={14} /> Continue Shopping
        </Link>

        <h1 className="text-3xl sm:text-4xl text-primary mb-8 sm:mb-10" style={{ fontFamily: "var(--font-display)" }}>
          Checkout
        </h1>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 sm:gap-4 mb-8 sm:mb-12 overflow-x-auto pb-2">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = s.id === step;
            const isDone = steps.findIndex((st) => st.id === step) > i;
            return (
              <div key={s.id} className="flex items-center gap-2 sm:gap-3 shrink-0">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-xs font-medium transition-colors ${
                  isDone ? "bg-success text-white" : isActive ? "bg-gold text-midnight" : "surface-secondary text-muted border border-subtle"
                }`}>
                  {isDone ? <Check size={14} /> : <Icon size={14} />}
                </div>
                <span className={`text-[0.65rem] sm:text-xs uppercase tracking-wider ${isActive ? "text-primary font-medium" : "text-muted"}`}>
                  {s.label}
                </span>
                {i < steps.length - 1 && <div className="w-6 sm:w-12 h-px surface-secondary ml-1" style={{ backgroundColor: isDone ? "var(--color-success)" : "var(--color-sand)" }} />}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12">
          {/* Main */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {step === "shipping" && (
                <motion.form key="shipping" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  onSubmit={(e) => { e.preventDefault(); setStep("payment"); }}
                  className="surface-card border border-subtle rounded p-5 sm:p-8 space-y-4"
                >
                  <h3 className="text-xl text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Shipping Details</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted mb-2 block">Full Name *</label>
                      <input type="text" required value={shipping.name} onChange={(e) => setShipping({ ...shipping, name: e.target.value })} className="input-field" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted mb-2 block">Email *</label>
                      <input type="email" required value={shipping.email} onChange={(e) => setShipping({ ...shipping, email: e.target.value })} className="input-field" />
                    </div>
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted mb-2 block">Phone *</label>
                    <input type="tel" required value={shipping.phone} onChange={(e) => setShipping({ ...shipping, phone: e.target.value })} className="input-field" />
                  </div>
                  <div>
                    <label className="text-xs uppercase tracking-wider text-muted mb-2 block">Address *</label>
                    <textarea required value={shipping.address} onChange={(e) => setShipping({ ...shipping, address: e.target.value })} className="input-field" rows={2} />
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted mb-2 block">City *</label>
                      <input type="text" required value={shipping.city} onChange={(e) => setShipping({ ...shipping, city: e.target.value })} className="input-field" />
                    </div>
                    <div>
                      <label className="text-xs uppercase tracking-wider text-muted mb-2 block">State *</label>
                      <input type="text" required value={shipping.state} onChange={(e) => setShipping({ ...shipping, state: e.target.value })} className="input-field" />
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                      <label className="text-xs uppercase tracking-wider text-muted mb-2 block">Pincode *</label>
                      <input type="text" required value={shipping.pincode} onChange={(e) => setShipping({ ...shipping, pincode: e.target.value })} className="input-field" />
                    </div>
                  </div>
                  <button type="submit" className="btn-primary w-full mt-4">
                    <span className="flex items-center justify-center gap-2">Continue to Payment <ArrowRight size={14} /></span>
                  </button>
                </motion.form>
              )}

              {step === "payment" && (
                <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="surface-card border border-subtle rounded p-5 sm:p-8 space-y-6"
                >
                  <h3 className="text-xl text-primary" style={{ fontFamily: "var(--font-display)" }}>Payment</h3>
                  <div className="surface-secondary p-4 sm:p-6 rounded border border-subtle text-center">
                    <CreditCard size={32} className="text-gold mx-auto mb-3" />
                    <p className="text-sm text-primary font-medium mb-1">Payment Integration</p>
                    <p className="text-xs text-muted">Stripe/Razorpay will be integrated here for production.</p>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <button onClick={() => setStep("shipping")} className="btn-outline flex-1"><ArrowLeft size={14} /> Back</button>
                    <button onClick={handlePlaceOrder} className="btn-primary flex-1"><span className="flex items-center justify-center gap-2">Place Order <Check size={14} /></span></button>
                  </div>
                </motion.div>
              )}

              {step === "confirmation" && (
                <motion.div key="confirmation" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="surface-card border border-subtle rounded p-8 sm:p-12 text-center"
                >
                  <div className="w-16 h-16 mx-auto bg-success/10 rounded-full flex items-center justify-center mb-6">
                    <Check size={28} className="text-success" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl text-primary mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    Order Confirmed!
                  </h3>
                  <p className="text-sm text-muted mb-8 max-w-md mx-auto">Thank you for your purchase! You&apos;ll receive a confirmation email shortly.</p>
                  <Link href="/gallery" className="btn-primary"><span>Continue Exploring</span></Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          {step !== "confirmation" && (
            <div className="lg:col-span-2">
              <div className="surface-card border border-subtle rounded p-5 sm:p-6 sticky top-24">
                <h4 className="text-sm text-primary font-medium uppercase tracking-wider mb-4 pb-3 border-b border-subtle">
                  Order Summary
                </h4>
                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={item.artwork.id} className="flex items-center gap-3">
                      <div className="w-12 h-12 surface-secondary overflow-hidden rounded-sm shrink-0">
                        {item.artwork.image ? (
                          <img src={item.artwork.image} alt={item.artwork.title} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted text-[0.5rem]" style={{ fontFamily: "var(--font-display)" }}>
                            {item.artwork.title.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-primary truncate">{item.artwork.title}</p>
                        <p className="text-xs text-muted">{formatPrice(item.artwork.price)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="border-t border-subtle pt-3 space-y-2">
                  <div className="flex justify-between text-sm"><span className="text-muted">Subtotal</span><span className="text-primary">{formatPrice(getCartTotal())}</span></div>
                  <div className="flex justify-between text-sm"><span className="text-muted">Shipping</span><span className="text-success text-xs">FREE</span></div>
                  <div className="flex justify-between text-base sm:text-lg font-medium pt-2 border-t border-subtle mt-2">
                    <span className="text-primary" style={{ fontFamily: "var(--font-display)" }}>Total</span>
                    <span className="text-primary" style={{ fontFamily: "var(--font-display)" }}>{formatPrice(getCartTotal())}</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
