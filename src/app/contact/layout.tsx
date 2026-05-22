import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact — Get in Touch",
  description:
    "Contact Diksha Kapoor for artwork inquiries, custom commissions, studio visits, or collaborations. Available via WhatsApp, email, and Instagram.",
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
