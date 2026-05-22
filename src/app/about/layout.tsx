import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — The Artist Behind the Canvas",
  description:
    "Learn about Diksha Patel, a contemporary visual artist based in Pune, India. Discover her story, artistic philosophy, achievements, and studio.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
