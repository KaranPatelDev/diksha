export interface Artwork {
  id: string;
  title: string;
  slug: string;
  price: number;
  originalPrice?: number;
  medium: string;
  dimensions: string;
  year: number;
  category: ArtworkCategory;
  description: string;
  story: string;
  image: string;
  images?: string[];
  available: boolean;
  featured: boolean;
  artworkOfTheWeek?: boolean;
  createdAt: string;
  size: ArtworkSize;
}

export type ArtworkCategory =
  | "abstract"
  | "landscape"
  | "portrait"
  | "still-life"
  | "contemporary"
  | "impressionist";

export type ArtworkSize = "small" | "medium" | "large" | "extra-large";

export interface CartItem {
  artwork: Artwork;
  quantity: number;
}

export interface WishlistItem {
  artwork: Artwork;
  addedAt: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  text: string;
  rating: number;
  artworkPurchased?: string;
  avatar?: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
  subject?: string;
}

export type SortOption = "newest" | "price-asc" | "price-desc" | "title";

export interface FilterState {
  category: ArtworkCategory | "all";
  priceRange: [number, number];
  size: ArtworkSize | "all";
  availability: "all" | "available" | "sold";
  sort: SortOption;
  search: string;
}

export interface SiteSettings {
  artistName: string;
  artistFullName: string;
  artistTitle: string;
  tagline: string;
  bio: string;
  philosophy: string;
  achievements: string[];
  email: string;
  phone: string;
  whatsapp: string;
  instagram: string;
  studioAddress: string;
  studioHours: string;
}
