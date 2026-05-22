import { Artwork, Testimonial, SiteSettings } from "./types";

// ============================================
// Default Seed Data — used only on first load
// ============================================

const defaultSettings: SiteSettings = {
  artistName: "Diksha",
  artistFullName: "Diksha Patel",
  artistTitle: "Contemporary Visual Artist",
  tagline: "Original art that transforms spaces",
  bio: `Diksha Patel is a contemporary visual artist based in Pune, India, whose work explores the intersection of emotion, landscape, and the human experience. With a Master's degree in Fine Arts from Sir J.J. School of Art, Mumbai, she has spent over a decade developing a distinctive artistic voice that bridges traditional Indian aesthetics with contemporary expression.

Her paintings are held in private collections across India, Singapore, Dubai, and the United Kingdom. Each piece is created with an unwavering commitment to craftsmanship, using only the finest artist-grade materials to ensure lasting beauty for generations.`,
  philosophy: `"I believe that art should move you — not just aesthetically, but emotionally. Every painting I create begins with a feeling, a memory, or a question. The canvas becomes a space for dialogue between the artist and the viewer, where words are unnecessary and the language is color, form, and light.

My process is deeply intuitive. I rarely plan a painting's final form before I begin. Instead, I allow the materials to guide me, responding to each layer as it dries, each color as it settles. This approach means that every piece carries within it the energy and emotion of its creation — making each work not just unique, but alive."`,
  achievements: [
    "Solo Exhibition — 'Luminous Fragments' at Jehangir Art Gallery, Mumbai (2024)",
    "Group Show — India Art Fair, New Delhi (2023, 2024)",
    "Featured Artist — Architectural Digest India (2024)",
    "Winner — Emerging Artist Award, Bombay Art Society (2022)",
    "Artist Residency — Kanoria Centre for Arts, Ahmedabad (2021)",
    "Solo Exhibition — 'Between Worlds' at Gallery XYZ, Pune (2020)",
    "International Group Exhibition — Singapore Art Week (2023)",
  ],
  email: "hello@dikshaart.com",
  phone: "+91 90162 78391",
  whatsapp: "https://wa.me/919016278391",
  instagram: "https://instagram.com/dikshaart",
  studioAddress: "Studio 14, Art District, Koregaon Park, Pune 411001, Maharashtra, India",
  studioHours: "By appointment only — Mon–Sat, 10:00 AM – 6:00 PM",
};

const defaultTestimonials: Testimonial[] = [
  {
    id: "t1",
    name: "Priya Sharma",
    location: "Mumbai, India",
    text: "The painting now hangs in our living room, and every morning it greets us with the most incredible light. The artwork has transformed our entire space — guests always stop and stare.",
    rating: 5,
    artworkPurchased: "Ethereal Dawn",
  },
  {
    id: "t2",
    name: "Arjun Mehta",
    location: "Bengaluru, India",
    text: "I've been collecting art for over 15 years, and Diksha's work stands apart. The depth of emotion is extraordinary. It's not just a painting — it's an experience that changes every time you look at it.",
    rating: 5,
  },
  {
    id: "t3",
    name: "Sarah Chen",
    location: "Singapore",
    text: "Commissioning a piece from Diksha was one of the best decisions I've ever made. She listened to our vision, understood our space, and created something that exceeded expectations.",
    rating: 5,
  },
];

export const siteConfig = {
  name: "Diksha Art Studio",
  description:
    "Original contemporary paintings by Diksha Patel. Discover unique artwork that transforms your space.",
  url: "https://dikshaart.com",
  ogImage: "/og-image.jpg",
  keywords: [
    "original art",
    "contemporary paintings",
    "Indian artist",
    "buy original paintings",
    "abstract art",
    "landscape paintings",
    "art gallery",
    "Diksha Patel",
    "fine art",
    "oil paintings",
  ],
};

export const categories = [
  { value: "all" as const, label: "All Works" },
  { value: "abstract" as const, label: "Abstract" },
  { value: "landscape" as const, label: "Landscape" },
  { value: "portrait" as const, label: "Portrait" },
  { value: "still-life" as const, label: "Still Life" },
  { value: "contemporary" as const, label: "Contemporary" },
  { value: "impressionist" as const, label: "Impressionist" },
];

export const sizeOptions = [
  { value: "all" as const, label: "All Sizes" },
  { value: "small" as const, label: 'Small (under 20")' },
  { value: "medium" as const, label: 'Medium (20" – 30")' },
  { value: "large" as const, label: 'Large (30" – 48")' },
  { value: "extra-large" as const, label: 'Extra Large (48"+)' },
];

// ============================================
// LocalStorage-based Data Manager
// ============================================

const STORAGE_KEYS = {
  artworks: "diksha_artworks",
  testimonials: "diksha_testimonials",
  settings: "diksha_settings",
};

function isBrowser(): boolean {
  return typeof window !== "undefined";
}

// —— Artworks ——

export function getArtworks(): Artwork[] {
  if (!isBrowser()) return [];
  const raw = localStorage.getItem(STORAGE_KEYS.artworks);
  if (!raw) return [];
  try {
    return JSON.parse(raw) as Artwork[];
  } catch {
    return [];
  }
}

export function saveArtworks(artworks: Artwork[]): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.artworks, JSON.stringify(artworks));
}

export function addArtwork(artwork: Artwork): void {
  const artworks = getArtworks();
  artworks.push(artwork);
  saveArtworks(artworks);
}

export function updateArtwork(id: string, updates: Partial<Artwork>): void {
  const artworks = getArtworks();
  const idx = artworks.findIndex((a) => a.id === id);
  if (idx !== -1) {
    artworks[idx] = { ...artworks[idx], ...updates };
    saveArtworks(artworks);
  }
}

export function deleteArtwork(id: string): void {
  const artworks = getArtworks().filter((a) => a.id !== id);
  saveArtworks(artworks);
}

export function getArtworkBySlug(slug: string): Artwork | undefined {
  return getArtworks().find((a) => a.slug === slug);
}

// —— Testimonials ——

export function getTestimonials(): Testimonial[] {
  if (!isBrowser()) return [];
  const raw = localStorage.getItem(STORAGE_KEYS.testimonials);
  if (!raw) {
    // seed defaults
    saveTestimonials(defaultTestimonials);
    return defaultTestimonials;
  }
  try {
    return JSON.parse(raw) as Testimonial[];
  } catch {
    return defaultTestimonials;
  }
}

export function saveTestimonials(testimonials: Testimonial[]): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.testimonials, JSON.stringify(testimonials));
}

export function addTestimonial(testimonial: Testimonial): void {
  const list = getTestimonials();
  list.push(testimonial);
  saveTestimonials(list);
}

export function deleteTestimonial(id: string): void {
  const list = getTestimonials().filter((t) => t.id !== id);
  saveTestimonials(list);
}

// —— Settings ——

export function getSettings(): SiteSettings {
  if (!isBrowser()) return defaultSettings;
  const raw = localStorage.getItem(STORAGE_KEYS.settings);
  if (!raw) {
    saveSettings(defaultSettings);
    return defaultSettings;
  }
  try {
    return JSON.parse(raw) as SiteSettings;
  } catch {
    return defaultSettings;
  }
}

export function saveSettings(settings: SiteSettings): void {
  if (!isBrowser()) return;
  localStorage.setItem(STORAGE_KEYS.settings, JSON.stringify(settings));
}

// —— Slug helper ——

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, "")
    .replace(/ +/g, "-");
}

// —— Generate ID ——

export function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
