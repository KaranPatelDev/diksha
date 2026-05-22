"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Artwork, CartItem, WishlistItem } from "./types";

const ADMIN_USERNAME = "diksha";
const ADMIN_PASSWORD = "art2024";

interface StoreState {
  // Cart
  cart: CartItem[];
  addToCart: (artwork: Artwork) => void;
  removeFromCart: (artworkId: string) => void;
  clearCart: () => void;
  isInCart: (artworkId: string) => boolean;
  getCartTotal: () => number;
  getCartCount: () => number;

  // Wishlist
  wishlist: WishlistItem[];
  addToWishlist: (artwork: Artwork) => void;
  removeFromWishlist: (artworkId: string) => void;
  isInWishlist: (artworkId: string) => boolean;

  // Cart drawer
  isCartOpen: boolean;
  openCart: () => void;
  closeCart: () => void;

  // Admin auth
  isAdmin: boolean;
  adminLogin: (username: string, password: string) => boolean;
  adminLogout: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Cart
      cart: [],
      addToCart: (artwork) => {
        if (!get().isInCart(artwork.id)) {
          set((state) => ({
            cart: [...state.cart, { artwork, quantity: 1 }],
          }));
        }
      },
      removeFromCart: (artworkId) => {
        set((state) => ({
          cart: state.cart.filter((item) => item.artwork.id !== artworkId),
        }));
      },
      clearCart: () => set({ cart: [] }),
      isInCart: (artworkId) =>
        get().cart.some((item) => item.artwork.id === artworkId),
      getCartTotal: () =>
        get().cart.reduce((total, item) => total + item.artwork.price, 0),
      getCartCount: () => get().cart.length,

      // Wishlist
      wishlist: [],
      addToWishlist: (artwork) => {
        if (!get().isInWishlist(artwork.id)) {
          set((state) => ({
            wishlist: [
              ...state.wishlist,
              { artwork, addedAt: new Date().toISOString() },
            ],
          }));
        }
      },
      removeFromWishlist: (artworkId) => {
        set((state) => ({
          wishlist: state.wishlist.filter(
            (item) => item.artwork.id !== artworkId
          ),
        }));
      },
      isInWishlist: (artworkId) =>
        get().wishlist.some((item) => item.artwork.id === artworkId),

      // Cart drawer
      isCartOpen: false,
      openCart: () => set({ isCartOpen: true }),
      closeCart: () => set({ isCartOpen: false }),

      // Admin
      isAdmin: false,
      adminLogin: (username: string, password: string) => {
        if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
          set({ isAdmin: true });
          return true;
        }
        return false;
      },
      adminLogout: () => set({ isAdmin: false }),
    }),
    {
      name: "diksha-store",
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        isAdmin: state.isAdmin,
      }),
    }
  )
);
