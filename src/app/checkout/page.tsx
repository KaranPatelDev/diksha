"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Check, ShoppingBag, Truck, CreditCard, Package, MessageCircle } from "lucide-react";
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
        <Link href="/gallery" className="btn-sweet-primary"><span>Browse Gallery</span></Link>
      </div>
    );
  }

  const steps = [
    { id: "shipping" as Step, label: "Shipping", icon: Truck },
    { id: "payment" as Step, label: "Payment", icon: CreditCard },
    { id: "confirmation" as Step, label: "Confirmed", icon: Package },
  ];

  const handleWhatsAppOrder = () => {
    const itemsList = cart.map(item => `${item.artwork.title} - ₹${item.artwork.price.toLocaleString('en-IN')}`).join('\n');
    const message = `Hi! I want to order:\n\n${itemsList}\n\nTotal: ₹${getCartTotal().toLocaleString('en-IN')}\n\nShipping Details:\nName: ${shipping.name}\nEmail: ${shipping.email}\nPhone: ${shipping.phone}\nAddress: ${shipping.address}, ${shipping.city}, ${shipping.state} - ${shipping.pincode}`;
    window.open(`https://wa.me/919016278391?text=${encodeURIComponent(message)}`, "_blank");
  };

  const handlePlaceOrder = () => {
    setStep("confirmation");
    clearCart();
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 surface-primary">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-12">
        <Link href="/gallery" className="flex items-center gap-2 text-xs text-muted hover:text-primary uppercase tracking-wider mb-6 sm:mb-8 transition-colors">
          <ArrowLeft size={14} /> Continue Shopping
        </Link>

        <h1 className="text-3xl sm:text-4xl text-primary mb-8 sm:mb-10" style={{ fontFamily: "var(--font-display)" }}>
          Checkout
        </h1>

        <div className="flex items-center gap-2 sm:gap-4 mb-8 sm:mb-12 overflow-x-auto pb-2">
          {steps.map((s, i) => {
            const Icon = s.icon;
            const isActive = s.id === step;
            const isDone = steps.findIndex((st) => st.id === step) > i;
            return (
              <div key={s.id} className="flex items-center gap-2 sm:gap-3 shrink-0">
                <div className={`w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full text-xs font-medium transition-colors ${
                  isDone ? "bg-success text-white" : isActive ? "bg-rose text-white" : "surface-secondary text-muted border border-subtle"
                }`}>
                  {isDone ? <Check size={14} /> : <Icon size={14} />}
                </div>
                <span className={`text-[0.65rem] sm:text-xs uppercase tracking-wider ${isActive ? "text-primary font-medium" : "text-muted"}`}>
                  {s.label}
                </span>
                {i < steps.length - 1 && <div className="w-6 sm:w-12 h-px surface-secondary ml-1" />}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 sm:gap-12">
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
                  <button type="submit" className="btn-sweet-primary w-full mt-4">
                    <span className="flex items-center justify-center gap-2">Continue to Payment <ArrowRight size={14} /></span>
                  </button>
                </motion.form>
              )}

              {step === "payment" && (
                <motion.div key="payment" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
                  className="surface-card border border-subtle rounded p-5 sm:p-8 space-y-6"
                >
                  <h3 className="text-xl text-primary" style={{ fontFamily: "var(--font-display)" }}>Choose Payment Method</h3>
                  
                  <button
                    onClick={handleWhatsAppOrder}
                    className="block w-full p-4 sm:p-6 rounded-lg border-2 border-green-500 bg-green-50 dark:bg-green-900/20 hover:border-green-600 transition-colors text-center"
                  >
                    <MessageCircle size={32} className="text-green-600 mx-auto mb-3" />
                    <p className="text-sm font-medium text-green-700 dark:text-green-400 mb-1">Order via WhatsApp</p>
                    <p className="text-xs text-muted mb-3">Quick & easy - Payment directly on WhatsApp</p>
                    <span className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white text-sm rounded-lg">
                      <MessageCircle size={16} /> Order on WhatsApp
                    </span>
                  </button>

                  <button onClick={() => setStep("shipping")} className="btn-outline w-full">
                    <ArrowLeft size={14} /> Back to Shipping
                  </button>
                </motion.div>
              )}

              {step === "confirmation" && (
                <motion.div key="confirmation" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="surface-card border border-subtle rounded p-8 sm:p-12 text-center"
                >
                  <div className="w-16 h-16 mx-auto bg-rose/10 rounded-full flex items-center justify-center mb-6">
                    <Package size={24} className="text-rose" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl text-primary mb-3" style={{ fontFamily: "var(--font-display)" }}>
                    Thank You!
                  </h3>
                  <p className="text-sm text-muted mb-6">Your order has been received. We&apos;ll contact you shortly.</p>
                  <Link href="/gallery" className="btn-sweet-primary">
                    <span className="flex items-center justify-center gap-2">Continue Shopping <ArrowRight size={14} /></span>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Order Summary */}
          {step !== "confirmation" && (
            <div className="lg:col-span-2">
              <div className="surface-card border border-subtle rounded p-5 sm:p-6 sticky top-24">
                <h3 className="text-lg text-primary mb-4" style={{ fontFamily: "var(--font-display)" }}>Order Summary</h3>
                <div className="space-y-3 mb-4">
                  {cart.map((item) => (
                    <div key={item.artwork.id} className="flex justify-between text-sm">
                      <span className="text-secondary truncate flex-1">{item.artwork.title}</span>
                      <span className="text-primary font-medium ml-2">{formatPrice(item.artwork.price)}</span>
                    </div>
                  ))}
                </div>
                <div className="divider my-4" />
                <div className="flex justify-between text-lg">
                  <span className="text-primary">Total</span>
                  <span className="text-primary font-medium">{formatPrice(getCartTotal())}</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}