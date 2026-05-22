import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Panel",
  description: "Manage your artworks, testimonials, and site settings.",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
