"use client";

import { useState, useEffect, useRef } from "react";
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Star,
  Search,
  Camera,
} from "lucide-react";
import { Artwork, ArtworkCategory, ArtworkSize } from "@/lib/types";
import {
  getArtworks,
  addArtwork,
  updateArtwork,
  deleteArtwork,
  categories,
  sizeOptions,
} from "@/lib/data";
import { formatPrice, slugify, generateId, fileToBase64 } from "@/lib/utils";

const emptyForm: Omit<Artwork, "id" | "slug" | "createdAt"> = {
  title: "",
  price: 0,
  medium: "",
  dimensions: "",
  year: new Date().getFullYear(),
  category: "abstract",
  description: "",
  story: "",
  image: "",
  available: true,
  featured: false,
  artworkOfTheWeek: false,
  size: "medium",
};

export default function ArtworkManager() {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);
  const [search, setSearch] = useState("");
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    setArtworks(getArtworks());
  }, []);

  const refreshList = () => setArtworks(getArtworks());

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB");
      return;
    }
    const base64 = await fileToBase64(file);
    setForm((prev) => ({ ...prev, image: base64 }));
  };

  const handleCameraCapture = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be under 5MB");
      return;
    }
    const base64 = await fileToBase64(file);
    setForm((prev) => ({ ...prev, image: base64 }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.price) {
      alert("Title and price are required.");
      return;
    }

    if (editingId) {
      updateArtwork(editingId, { ...form, slug: slugify(form.title) });
    } else {
      const newArtwork: Artwork = {
        ...form,
        id: generateId(),
        slug: slugify(form.title),
        createdAt: new Date().toISOString(),
      };
      addArtwork(newArtwork);
    }

    refreshList();
    resetForm();
  };

  const handleEdit = (artwork: Artwork) => {
    setEditingId(artwork.id);
    setForm({
      title: artwork.title,
      price: artwork.price,
      originalPrice: artwork.originalPrice,
      medium: artwork.medium,
      dimensions: artwork.dimensions,
      year: artwork.year,
      category: artwork.category,
      description: artwork.description,
      story: artwork.story,
      image: artwork.image,
      available: artwork.available,
      featured: artwork.featured,
      artworkOfTheWeek: artwork.artworkOfTheWeek,
      size: artwork.size,
    });
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id: string) => {
    deleteArtwork(id);
    refreshList();
    setDeleteConfirm(null);
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
  };

  const filteredArtworks = artworks.filter(
    (a) =>
      a.title.toLowerCase().includes(search.toLowerCase()) ||
      a.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h3 className="text-lg text-primary font-medium">Manage Artworks</h3>
          <p className="text-xs text-muted mt-1">{artworks.length} artworks in your portfolio</p>
        </div>
        <button
          onClick={() => {
            if (showForm) resetForm();
            else setShowForm(true);
          }}
          className={`flex items-center gap-2 px-4 py-2.5 text-xs uppercase tracking-wider font-medium transition-colors ${
            showForm
              ? "bg-charcoal text-ivory hover:bg-midnight"
              : "bg-gold text-midnight hover:bg-gold-dark"
          }`}
        >
          {showForm ? <X size={14} /> : <Plus size={14} />}
          {showForm ? "Cancel" : "Add Artwork"}
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="surface-primary border border-subtle rounded p-4 sm:p-6 space-y-5"
        >
          <h4 className="text-sm text-primary font-medium uppercase tracking-wider border-b border-subtle pb-3">
            {editingId ? "Edit Artwork" : "New Artwork"}
          </h4>

          {/* Image Upload */}
          <div>
            <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
              Artwork Photo
            </label>
            <div className="flex flex-col sm:flex-row items-start gap-4">
              <div className="w-full sm:w-40 h-40 surface-secondary border border-subtle overflow-hidden flex items-center justify-center rounded-lg">
                {form.image ? (
                  <img
                    src={form.image}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="text-center text-muted p-4">
                    <Upload size={24} className="mx-auto mb-2" />
                    <span className="text-xs">No photo</span>
                  </div>
                )}
              </div>
              <div className="flex-1 w-full space-y-3">
                <div className="flex gap-2">
                  <label className="flex-1 cursor-pointer">
                    <input
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleCameraCapture}
                      className="hidden"
                      id="camera-input"
                    />
                    <label
                      htmlFor="camera-input"
                      className="flex items-center justify-center gap-2 px-4 py-3 bg-rose text-white text-xs uppercase tracking-wider rounded-lg hover:bg-rose-dark transition-colors cursor-pointer w-full"
                    >
                      <Camera size={16} />
                      Take Photo
                    </label>
                  </label>
                </div>
                <div className="relative">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="text-sm text-muted file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:bg-rose/10 file:text-rose file:uppercase file:tracking-wider file:cursor-pointer hover:file:bg-rose/20 w-full file:rounded-lg"
                  />
                </div>
                <p className="text-[0.65rem] text-muted">
                  Upload a photo or take one with your camera.
                </p>
                {form.image && (
                  <button
                    type="button"
                    onClick={() => setForm((prev) => ({ ...prev, image: "" }))}
                    className="text-xs text-error hover:underline"
                  >
                    Remove photo
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Title & Category */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
                Title *
              </label>
              <input
                type="text"
                required
                value={form.title}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, title: e.target.value }))
                }
                placeholder="e.g. Ethereal Dawn"
                className="input-field"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
                Category
              </label>
              <select
                value={form.category}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    category: e.target.value as ArtworkCategory,
                  }))
                }
                className="input-field"
              >
                {categories
                  .filter((c) => c.value !== "all")
                  .map((c) => (
                    <option key={c.value} value={c.value}>
                      {c.label}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Price & Original Price */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
                Price (₹) *
              </label>
              <input
                type="number"
                required
                value={form.price || ""}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, price: Number(e.target.value) }))
                }
                placeholder="25000"
                className="input-field"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
                Original Price (₹)
              </label>
              <input
                type="number"
                value={form.originalPrice || ""}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    originalPrice: Number(e.target.value) || undefined,
                  }))
                }
                placeholder="Optional"
                className="input-field"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
                Year
              </label>
              <input
                type="number"
                value={form.year}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, year: Number(e.target.value) }))
                }
                className="input-field"
              />
            </div>
          </div>

          {/* Medium, Dimensions, Size */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
                Medium
              </label>
              <input
                type="text"
                value={form.medium}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, medium: e.target.value }))
                }
                placeholder="e.g. Oil on Canvas"
                className="input-field"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
                Dimensions
              </label>
              <input
                type="text"
                value={form.dimensions}
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, dimensions: e.target.value }))
                }
                placeholder='e.g. 36" × 48"'
                className="input-field"
              />
            </div>
            <div>
              <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
                Size
              </label>
              <select
                value={form.size}
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    size: e.target.value as ArtworkSize,
                  }))
                }
                className="input-field"
              >
                {sizeOptions
                  .filter((s) => s.value !== "all")
                  .map((s) => (
                    <option key={s.value} value={s.value}>
                      {s.label}
                    </option>
                  ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
              Description
            </label>
            <textarea
              value={form.description}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, description: e.target.value }))
              }
              placeholder="A brief description of the artwork..."
              className="input-field"
              rows={3}
            />
          </div>

          {/* Story */}
          <div>
            <label className="text-xs uppercase tracking-wider text-muted mb-2 block">
              Story Behind the Piece
            </label>
            <textarea
              value={form.story}
              onChange={(e) =>
                setForm((prev) => ({ ...prev, story: e.target.value }))
              }
              placeholder="The inspiration and story behind this artwork..."
              className="input-field"
              rows={4}
            />
          </div>

          {/* Toggles */}
          <div className="flex flex-wrap gap-4 sm:gap-6">
            {[
              { key: "available", label: "Available for Sale" },
              { key: "featured", label: "Featured on Homepage" },
              { key: "artworkOfTheWeek", label: "Artwork of the Week" },
            ].map((toggle) => (
              <label
                key={toggle.key}
                className="flex items-center gap-2 cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={Boolean(form[toggle.key as keyof typeof form])}
                  onChange={(e) =>
                    setForm((prev) => ({
                      ...prev,
                      [toggle.key]: e.target.checked,
                    }))
                  }
                  className="w-4 h-4 accent-gold"
                />
                <span className="text-sm text-secondary">{toggle.label}</span>
              </label>
            ))}
          </div>

          {/* Submit */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button type="submit" className="btn-primary flex-1 sm:flex-none">
              <span>{editingId ? "Update Artwork" : "Add Artwork"}</span>
            </button>
            <button type="button" onClick={resetForm} className="btn-outline">
              Cancel
            </button>
          </div>
        </form>
      )}

      {/* Search */}
      <div className="relative">
        <Search
          size={14}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
        />
        <input
          type="text"
          placeholder="Search artworks..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input-field pl-9 py-2.5 text-sm"
        />
      </div>

      {/* Artwork List */}
      {filteredArtworks.length === 0 ? (
        <div className="surface-primary border border-subtle rounded p-8 sm:p-12 text-center">
          <Upload size={32} className="text-muted mx-auto mb-4" />
          <h4 className="text-lg text-primary mb-2" style={{ fontFamily: "var(--font-display)" }}>
            {search ? "No artworks match your search" : "No artworks yet"}
          </h4>
          <p className="text-sm text-muted mb-4">
            {search
              ? "Try a different search term."
              : "Click 'Add Artwork' to upload your first painting."}
          </p>
          {!search && (
            <button onClick={() => setShowForm(true)} className="btn-gold text-xs">
              <Plus size={14} /> Add Your First Artwork
            </button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredArtworks.map((artwork) => (
            <div
              key={artwork.id}
              className="surface-primary border border-subtle rounded p-3 sm:p-4 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 group hover:border-gold/30 transition-colors"
            >
              {/* Thumbnail */}
              <div className="w-full sm:w-16 h-28 sm:h-16 surface-secondary overflow-hidden rounded-sm flex-shrink-0">
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

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <h4 className="text-sm text-primary font-medium truncate">
                    {artwork.title}
                  </h4>
                  {artwork.featured && <Star size={12} className="text-gold fill-gold" />}
                  {artwork.artworkOfTheWeek && (
                    <span className="text-[0.55rem] bg-gold/10 text-gold px-1.5 py-0.5 rounded uppercase tracking-wider">
                      AOTW
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted mt-0.5">
                  {artwork.category} · {artwork.medium || "N/A"} · {artwork.dimensions || "N/A"}
                </p>
              </div>

              {/* Price & Status */}
              <div className="flex items-center gap-4 sm:gap-6 w-full sm:w-auto justify-between sm:justify-end">
                <div className="text-right">
                  <p className="text-sm text-primary font-medium">{formatPrice(artwork.price)}</p>
                  {artwork.available ? (
                    <span className="text-[0.6rem] text-success uppercase tracking-wider">Available</span>
                  ) : (
                    <span className="text-[0.6rem] text-error uppercase tracking-wider">Sold</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleEdit(artwork)}
                    className="p-2 text-muted hover:text-gold transition-colors"
                    title="Edit"
                  >
                    <Pencil size={14} />
                  </button>
                  {deleteConfirm === artwork.id ? (
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => handleDelete(artwork.id)}
                        className="px-2 py-1 text-[0.65rem] bg-error text-white rounded uppercase tracking-wider"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirm(null)}
                        className="px-2 py-1 text-[0.65rem] text-muted hover:text-primary"
                      >
                        Cancel
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setDeleteConfirm(artwork.id)}
                      className="p-2 text-muted hover:text-error transition-colors"
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
