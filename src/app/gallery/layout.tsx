import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery — Browse Original Artworks",
  description:
    "Explore the complete collection of original paintings by Diksha Kapoor. Abstract, landscape, portrait, and contemporary artworks available for purchase.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
