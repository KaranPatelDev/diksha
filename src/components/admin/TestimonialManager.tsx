"use client";

import { useState, useEffect } from "react";
import { Plus, Trash2, X, Star } from "lucide-react";
import { Testimonial } from "@/lib/types";
import { getTestimonials, addTestimonial, deleteTestimonial } from "@/lib/data";
import { generateId } from "@/lib/utils";

export default function TestimonialManager() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    location: "",
    text: "",
    rating: 5,
    artworkPurchased: "",
  });

  useEffect(() => {
    setTestimonials(getTestimonials());
  }, []);

  const refreshList = () => setTestimonials(getTestimonials());

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.text) {
      alert("Name and testimonial text are required.");
      return;
    }

    const testimonial: Testimonial = {
      id: generateId(),
      name: form.name,
      location: form.location,
      text: form.text,
      rating: form.rating,
      artworkPurchased: form.artworkPurchased || undefined,
    };

    addTestimonial(testimonial);
    refreshList();
    setForm({ name: "", location: "", text: "", rating: 5, artworkPurchased: "" });
    setShowForm(false);
  };

  const handleDelete = (id: string) => {
    deleteTestimonial(id);
    refreshList();
    setDeleteConfirm(null);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg text-primary font-medium">Testimonials</h3>
          <p className="text-xs text-muted mt-1">
            {testimonials.length} testimonials from collectors
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider font-medium transition-colors ${
            showForm
              ? "bg-charcoal text-ivory"
              : "bg-gold text-midnight hover:bg-gold-dark"
          }`}
        >
          {showForm ? <X size={14} /> : <Plus size={14} />}
          {showForm ? "Cancel" : "Add Testimonial"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="surface-primary border border-subtle rounded p-4 sm:p-6 space-y-4"
        >
          <h4 className="text-sm text-primary font-medium uppercase tracking-wider border-b border-subtle pb-3">
            New Testimonial
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
                Name *
              </label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                placeholder="e.g. Priya Sharma"
                className="input-field"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
                Location
              </label>
              <input
                type="text"
                value={form.location}
                onChange={(e) => setForm((prev) => ({ ...prev, location: e.target.value }))}
                placeholder="e.g. Mumbai, India"
                className="input-field"
              />
            </div>
          </div>

          <div>
            <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
              Testimonial *
            </label>
            <textarea
              required
              value={form.text}
              onChange={(e) => setForm((prev) => ({ ...prev, text: e.target.value }))}
              placeholder="What did the collector say about the artwork?"
              className="input-field"
              rows={3}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
                Rating
              </label>
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, rating: star }))}
                    className="p-1"
                  >
                    <Star
                      size={20}
                      className={star <= form.rating ? "text-gold fill-gold" : "text-muted"}
                    />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
                Artwork Purchased
              </label>
              <input
                type="text"
                value={form.artworkPurchased}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, artworkPurchased: e.target.value }))
                }
                placeholder="Optional — name of artwork"
                className="input-field"
              />
            </div>
          </div>

          <button type="submit" className="btn-primary">
            <span>Add Testimonial</span>
          </button>
        </form>
      )}

      {/* List */}
      {testimonials.length === 0 ? (
        <div className="surface-primary border border-subtle rounded p-8 sm:p-12 text-center">
          <Star size={32} className="text-muted mx-auto mb-4" />
          <h4 className="text-lg text-primary mb-2" style={{ fontFamily: "var(--font-display)" }}>
            No testimonials yet
          </h4>
          <p className="text-sm text-muted">
            Add collector testimonials to build trust with visitors.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="surface-primary border border-subtle rounded p-4 sm:p-5 group hover:border-gold/30 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-8 h-8 bg-gold/10 rounded-full flex items-center justify-center text-xs text-gold" style={{ fontFamily: "var(--font-display)" }}>
                      {testimonial.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                    <div>
                      <p className="text-sm text-primary font-medium">{testimonial.name}</p>
                      {testimonial.location && (
                        <p className="text-[0.65rem] text-muted">{testimonial.location}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex gap-0.5 mb-2">
                    {Array.from({ length: testimonial.rating }).map((_, i) => (
                      <Star key={i} size={12} className="text-gold fill-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-secondary italic leading-relaxed">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>
                  {testimonial.artworkPurchased && (
                    <p className="text-xs text-gold mt-2">
                      Collected: {testimonial.artworkPurchased}
                    </p>
                  )}
                </div>
                <div className="shrink-0">
                  {deleteConfirm === testimonial.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(testimonial.id)}
                        className="px-2 py-1 text-[0.65rem] bg-error text-white rounded uppercase tracking-wider"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-2 py-1 text-[0.65rem] text-muted"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(testimonial.id)}
                      className="p-2 text-muted hover:text-error transition-colors opacity-0 group-hover:opacity-100"
                      title="Delete"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
