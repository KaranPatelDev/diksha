"use client";

import { useState, useMemo, useEffect, Suspense } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SlidersHorizontal,
  Grid3X3,
  LayoutGrid,
  Search,
  ChevronDown,
} from "lucide-react";
import { getArtworks, categories, sizeOptions } from "@/lib/data";
import { FilterState, ArtworkCategory, ArtworkSize, SortOption, Artwork } from "@/lib/types";
import ArtworkCard from "@/components/ArtworkCard";
import SectionHeading from "@/components/SectionHeading";
import { useSearchParams } from "next/navigation";

export default function GalleryPage() {
  return (
    <Suspense fallback={<GalleryLoading />}>
      <GalleryContent />
    </Suspense>
  );
}

function GalleryLoading() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="text-center mb-16">
          <div className="skeleton w-32 h-4 mx-auto mb-4" />
          <div className="skeleton w-48 h-10 mx-auto mb-4" />
          <div className="skeleton w-80 sm:w-96 h-4 mx-auto" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i}>
              <div className="skeleton aspect-[3/4] mb-4" />
              <div className="skeleton w-3/4 h-5 mb-2" />
              <div className="skeleton w-1/2 h-4" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function GalleryContent() {
  const searchParams = useSearchParams();
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [gridCols, setGridCols] = useState<2 | 3>(3);
  const [artworks, setArtworks] = useState<Artwork[]>([]);

  const [filters, setFilters] = useState<FilterState>({
    category: "all",
    priceRange: [0, 200000],
    size: "all",
    availability: "all",
    sort: "newest",
    search: "",
  });

  useEffect(() => {
    setArtworks(getArtworks());
  }, []);

  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const available = searchParams.get("available");

    if (category) {
      setFilters((prev) => ({
        ...prev,
        category: category as ArtworkCategory | "all",
      }));
    }
    if (search) {
      setFilters((prev) => ({ ...prev, search }));
    }
    if (available === "true") {
      setFilters((prev) => ({ ...prev, availability: "available" }));
    }
  }, [searchParams]);

  const filteredArtworks = useMemo(() => {
    let result = [...artworks];

    if (filters.search) {
      const query = filters.search.toLowerCase();
      result = result.filter(
        (a) =>
          a.title.toLowerCase().includes(query) ||
          a.medium.toLowerCase().includes(query) ||
          a.category.toLowerCase().includes(query) ||
          a.description.toLowerCase().includes(query)
      );
    }

    if (filters.category !== "all") {
      result = result.filter((a) => a.category === filters.category);
    }

    if (filters.size !== "all") {
      result = result.filter((a) => a.size === filters.size);
    }

    if (filters.availability === "available") {
      result = result.filter((a) => a.available);
    } else if (filters.availability === "sold") {
      result = result.filter((a) => !a.available);
    }

    result = result.filter(
      (a) => a.price >= filters.priceRange[0] && a.price <= filters.priceRange[1]
    );

    switch (filters.sort) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        break;
      case "title":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }

    return result;
  }, [filters, artworks]);

  const activeFilterCount =
    (filters.category !== "all" ? 1 : 0) +
    (filters.size !== "all" ? 1 : 0) +
    (filters.availability !== "all" ? 1 : 0) +
    (filters.search ? 1 : 0);

  const resetFilters = () => {
    setFilters({
      category: "all",
      priceRange: [0, 200000],
      size: "all",
      availability: "all",
      sort: "newest",
      search: "",
    });
  };

  return (
    <div className="pt-24 sm:pt-28 pb-16 sm:pb-20 surface-primary">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
        <SectionHeading
          label="The Collection"
          title="Gallery"
          description="Explore the complete collection of original artworks. Each piece is unique."
        />

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4 mb-8 sm:mb-10 pb-4 sm:pb-6 border-b border-subtle">
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap w-full sm:w-auto">
            <div className="relative flex-1 sm:flex-none">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
              <input
                type="text"
                placeholder="Search..."
                value={filters.search}
                onChange={(e) => setFilters((prev) => ({ ...prev, search: e.target.value }))}
                className="input-field pl-9 py-2.5 text-xs w-full sm:w-48"
              />
            </div>
            <button
              onClick={() => setFiltersOpen(!filtersOpen)}
              className={`flex items-center gap-2 px-3 sm:px-4 py-2.5 text-xs uppercase tracking-wider border transition-colors ${
                filtersOpen
                  ? "border-midnight bg-midnight text-ivory"
                  : "border-subtle text-secondary hover:border-charcoal"
              }`}
            >
              <SlidersHorizontal size={14} />
              <span className="hidden sm:inline">Filters</span>
              {activeFilterCount > 0 && (
                <span className="w-5 h-5 bg-gold text-midnight rounded-full flex items-center justify-center text-[0.6rem] font-semibold">
                  {activeFilterCount}
                </span>
              )}
            </button>
            {activeFilterCount > 0 && (
              <button onClick={resetFilters} className="text-xs text-muted hover:text-primary uppercase tracking-wider transition-colors">
                Clear
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto justify-between sm:justify-end">
            <div className="relative">
              <select
                value={filters.sort}
                onChange={(e) => setFilters((prev) => ({ ...prev, sort: e.target.value as SortOption }))}
                className="input-field py-2.5 text-xs pr-8 appearance-none cursor-pointer w-36 sm:w-40"
              >
                <option value="newest">Newest First</option>
                <option value="price-asc">Price: Low → High</option>
                <option value="price-desc">Price: High → Low</option>
                <option value="title">Title: A → Z</option>
              </select>
              <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
            </div>
            <div className="hidden lg:flex items-center border border-subtle">
              <button
                onClick={() => setGridCols(2)}
                className={`p-2.5 transition-colors ${gridCols === 2 ? "bg-midnight text-ivory" : "text-muted hover:text-primary"}`}
              >
                <LayoutGrid size={14} />
              </button>
              <button
                onClick={() => setGridCols(3)}
                className={`p-2.5 transition-colors ${gridCols === 3 ? "bg-midnight text-ivory" : "text-muted hover:text-primary"}`}
              >
                <Grid3X3 size={14} />
              </button>
            </div>
            <span className="text-xs text-muted whitespace-nowrap">
              {filteredArtworks.length} work{filteredArtworks.length !== 1 ? "s" : ""}
            </span>
          </div>
        </div>

        {/* Filters */}
        <AnimatePresence>
          {filtersOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden mb-8 sm:mb-10"
            >
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 p-4 sm:p-6 surface-card border border-subtle rounded">
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted mb-2 block">Category</label>
                  <div className="space-y-1">
                    {categories.map((cat) => (
                      <button
                        key={cat.value}
                        onClick={() => setFilters((prev) => ({ ...prev, category: cat.value as ArtworkCategory | "all" }))}
                        className={`block w-full text-left px-3 py-1.5 text-sm transition-colors rounded ${
                          filters.category === cat.value ? "text-primary font-medium surface-secondary" : "text-muted hover:text-primary"
                        }`}
                      >
                        {cat.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted mb-2 block">Size</label>
                  <div className="space-y-1">
                    {sizeOptions.map((size) => (
                      <button
                        key={size.value}
                        onClick={() => setFilters((prev) => ({ ...prev, size: size.value as ArtworkSize | "all" }))}
                        className={`block w-full text-left px-3 py-1.5 text-sm transition-colors rounded ${
                          filters.size === size.value ? "text-primary font-medium surface-secondary" : "text-muted hover:text-primary"
                        }`}
                      >
                        {size.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted mb-2 block">Availability</label>
                  <div className="space-y-1">
                    {[
                      { value: "all", label: "All" },
                      { value: "available", label: "Available" },
                      { value: "sold", label: "Sold" },
                    ].map((opt) => (
                      <button
                        key={opt.value}
                        onClick={() => setFilters((prev) => ({ ...prev, availability: opt.value as "all" | "available" | "sold" }))}
                        className={`block w-full text-left px-3 py-1.5 text-sm transition-colors rounded ${
                          filters.availability === opt.value ? "text-primary font-medium surface-secondary" : "text-muted hover:text-primary"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="text-xs uppercase tracking-wider text-muted mb-2 block">Max Price</label>
                  <div className="space-y-3 mt-4">
                    <input
                      type="range"
                      min={0}
                      max={200000}
                      step={5000}
                      value={filters.priceRange[1]}
                      onChange={(e) => setFilters((prev) => ({ ...prev, priceRange: [0, parseInt(e.target.value)] }))}
                      className="w-full accent-gold"
                    />
                    <div className="flex justify-between text-xs text-muted">
                      <span>₹0</span>
                      <span>Up to ₹{filters.priceRange[1].toLocaleString("en-IN")}</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Grid */}
        <div className={`grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 lg:gap-10 ${gridCols === 3 ? "lg:grid-cols-3" : "lg:grid-cols-2"}`}>
          {filteredArtworks.map((artwork, i) => (
            <ArtworkCard key={artwork.id} artwork={artwork} index={i} />
          ))}
        </div>

        {/* Empty State */}
        {filteredArtworks.length === 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16 sm:py-24">
            <p className="text-xl sm:text-2xl text-primary mb-2" style={{ fontFamily: "var(--font-display)" }}>
              {artworks.length === 0 ? "Gallery is empty" : "No artworks found"}
            </p>
            <p className="text-sm text-muted mb-6">
              {artworks.length === 0
                ? "Artworks will appear here once added from the admin panel."
                : "Try adjusting your filters or search query."}
            </p>
            {artworks.length > 0 && (
              <button onClick={resetFilters} className="btn-outline">
                Reset Filters
              </button>
            )}
          </motion.div>
        )}
      </div>
    </div>
  );
}
