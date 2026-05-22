"use client";

import ArtworkCard from "@/components/ArtworkCard";
import SectionHeading from "@/components/SectionHeading";
import TestimonialCard from "@/components/TestimonialCard";
import { getArtworks, getSettings, getTestimonials } from "@/lib/data";
import { Artwork, SiteSettings, Testimonial } from "@/lib/types";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);

  useEffect(() => {
    setArtworks(getArtworks());
    setTestimonials(getTestimonials());
    setSettings(getSettings());
  }, []);

  const featuredArtworks = artworks.filter((a) => a.featured);
  const artworkOfTheWeek = artworks.find((a) => a.artworkOfTheWeek);
  const hasArtworks = artworks.length > 0;

  return (
    <>
      {/* =============================================
          HERO SECTION
          ============================================= */}
      <section ref={heroRef} className="relative h-screen overflow-hidden">
        <motion.div
          style={{ scale: heroScale }}
          className="absolute inset-0 bg-gradient-to-br from-rose-soft via-pink-soft to-purple-100"
        >
          <div className="absolute inset-0 opacity-30">
            <div className="absolute top-1/4 left-1/4 w-64 sm:w-96 h-64 sm:h-96 rounded-full bg-rose/20 blur-3xl" />
            <div className="absolute bottom-1/4 right-1/4 w-56 sm:w-80 h-56 sm:h-80 rounded-full bg-pink/20 blur-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] sm:w-[600px] h-[300px] sm:h-[600px] rounded-full bg-purple-300/10 blur-3xl" />
          </div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-surface-primary/50" />
        </motion.div>

        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative h-full flex items-center justify-center text-center px-4 sm:px-6"
        >
          <div className="max-w-4xl w-full">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <span className="inline-flex items-center gap-2 text-rose text-[0.65rem] sm:text-xs tracking-[0.2em] sm:tracking-[0.25em] uppercase mb-4 sm:mb-6">
                <Sparkles size={14} />
                Handmade with Love
                <Sparkles size={14} />
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl hero-heading-text leading-[0.95] mb-4 sm:mb-6"
              style={{ fontFamily: "var(--font-display)", fontWeight: 300 }}
            >
              Beautiful Paintings
              <br />
              <span className="italic text-rose">Made with Love</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-secondary text-base sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed px-4 sm:px-0"
            >
              Discover unique hand-painted artworks filled with emotion, beauty, and 
              tender creativity — each one a labor of love.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0"
            >
              <Link href="/gallery" className="btn-sweet-primary w-full sm:w-auto sm:min-w-[200px]">
                <span>Explore Gallery</span>
              </Link>
              <Link
                href="/gallery?available=true"
                className="btn-sweet-outline w-full sm:w-auto sm:min-w-[200px]"
              >
                Shop Now
              </Link>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-muted text-[0.55rem] sm:text-[0.6rem] tracking-[0.2em] uppercase">
            Scroll to explore
          </span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            <ArrowDown size={16} className="text-ivory/40" />
          </motion.div>
        </motion.div>
      </section>

      {/* =============================================
          ARTWORK OF THE WEEK
          ============================================= */}
      {artworkOfTheWeek && (
        <section className="py-16 sm:py-20 lg:py-28 surface-secondary">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <div className="aspect-[3/4] surface-card relative overflow-hidden shadow-image rounded-lg">
                  {artworkOfTheWeek.image ? (
                    <img
                      src={artworkOfTheWeek.image}
                      alt={artworkOfTheWeek.title}
                      className="absolute inset-0 w-full h-full object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-rose-soft to-pink-soft">
                      <span
                        className="text-6xl text-rose/40"
                        style={{ fontFamily: "var(--font-display)" }}
                      >
                        {artworkOfTheWeek.title.split(" ").map((w) => w[0]).join("").slice(0, 2)}
                      </span>
                    </div>
                  )}
                  <div className="absolute top-4 left-4">
                    <span className="badge-sweet">Featured Artwork</span>
                  </div>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="flex flex-col"
              >
                <span className="text-xs tracking-[0.2em] uppercase text-rose-dark mb-4">
                  Special Pick
                </span>
                <h2
                  className="text-3xl sm:text-4xl lg:text-5xl text-primary mb-3 sm:mb-4"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {artworkOfTheWeek.title}
                </h2>
                <p className="text-muted text-sm mb-2">
                  {artworkOfTheWeek.medium} · {artworkOfTheWeek.dimensions} · {artworkOfTheWeek.year}
                </p>
                <p
                  className="text-xl sm:text-2xl text-primary mb-4 sm:mb-6"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {new Intl.NumberFormat("en-IN", {
                    style: "currency",
                    currency: "INR",
                    maximumFractionDigits: 0,
                  }).format(artworkOfTheWeek.price)}
                </p>
                <p className="text-secondary text-sm leading-relaxed mb-6 sm:mb-8 max-w-lg">
                  {artworkOfTheWeek.story?.substring(0, 250)}...
                </p>
                <div className="flex items-center gap-2 mb-6 sm:mb-8">
                  {artworkOfTheWeek.available ? (
                    <span className="badge-available">● Available</span>
                  ) : (
                    <span className="badge-sold">Sold</span>
                  )}
                </div>
                <Link href={`/artwork/${artworkOfTheWeek.slug}`} className="btn-sweet-primary w-full sm:w-auto">
                  <span className="flex items-center gap-2 justify-center">
                    View Artwork <ArrowRight size={16} />
                  </span>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
      )}

      {/* =============================================
          FEATURED ARTWORKS
          ============================================= */}
      {hasArtworks ? (
        <section className="py-16 sm:py-20 lg:py-28 surface-primary">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
            <SectionHeading
              label="Paintings Gallery"
              title="Handmade with Love"
              description="Beautiful original paintings, each one crafted with creativity and heart."
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10">
              {(featuredArtworks.length > 0 ? featuredArtworks : artworks).slice(0, 6).map((artwork, i) => (
                <ArtworkCard key={artwork.id} artwork={artwork} index={i} />
              ))}
            </div>
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-center mt-10 sm:mt-14"
            >
              <Link href="/gallery" className="btn-outline">
                View Full Collection <ArrowRight size={14} />
              </Link>
            </motion.div>
          </div>
        </section>
      ) : (
        <section className="py-16 sm:py-20 lg:py-28 surface-primary">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 text-center">
            <SectionHeading
              label="The Collection"
              title="Artworks Coming Soon"
              description="The gallery is being curated. Check back soon as new artworks arrive."
            />
          </div>
        </section>
      )}

      {/* =============================================
          ARTIST HIGHLIGHT
          ============================================= */}
      <section className="py-16 sm:py-20 lg:py-28 gradient-sweet-girl">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="order-2 lg:order-1"
            >
              <span className="text-xs tracking-[0.2em] uppercase text-rose mb-4 block">
                The Artist
              </span>
              <h2
                className="text-3xl sm:text-4xl lg:text-5xl text-primary mb-4 sm:mb-6"
                style={{ fontFamily: "var(--font-display)" }}
              >
                {settings?.artistFullName || "Diksha Patel"}
              </h2>
              <p className="text-secondary text-sm leading-relaxed mb-6">
                {settings?.bio?.substring(0, 300) || "A talented young artist who paints with her heart..."}...
              </p>
              <blockquote className="border-l-2 border-rose/60 pl-4 sm:pl-6 mb-6 sm:mb-8">
                <p
                  className="text-muted text-sm italic leading-relaxed"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  &ldquo;I paint with love, and every brushstroke comes from my heart.&rdquo;
                </p>
              </blockquote>
              <Link href="/about" className="btn-sweet-primary w-full sm:w-auto">
                Read More <ArrowRight size={14} />
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="order-1 lg:order-2"
            >
              <div className="aspect-[4/5] bg-gradient-to-br from-rose-soft to-pink-soft surface-card relative overflow-hidden rounded-lg">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 mx-auto mb-4 rounded-full bg-gradient-to-br from-rose to-rose-dark flex items-center justify-center">
                      <span className="text-4xl sm:text-5xl text-white" style={{ fontFamily: "var(--font-display)" }}>
                        D
                      </span>
                    </div>
                    <p className="text-charcoal/40 text-xs tracking-[0.3em] uppercase mt-2">The Artist</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* =============================================
          TESTIMONIALS
          ============================================= */}
      {testimonials.length > 0 && (
        <section className="py-16 sm:py-20 lg:py-28 surface-primary">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
            <SectionHeading
              label="Collector Stories"
              title="What Our Collectors Say"
              description="Words from art lovers who have welcomed paintings into their homes."
            />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
              {testimonials.slice(0, 3).map((testimonial, i) => (
                <TestimonialCard key={testimonial.id} testimonial={testimonial} index={i} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* =============================================
          CTA SECTION
          ============================================= */}
      <section className="py-16 sm:py-20 lg:py-28 gradient-sweet-girl">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-2xl mx-auto"
          >
            <span className="text-xs tracking-[0.2em] uppercase text-rose-dark mb-4 block">
              Own a Piece of Heart
            </span>
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl text-charcoal mb-4 sm:mb-6"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Every Painting is Made with Love.
              <br />
              <span className="italic">Take One Home.</span>
            </h2>
            <p className="text-charcoal/60 text-sm leading-relaxed mb-8 sm:mb-10 px-4 sm:px-0">
              Each artwork is unique and made with heartfelt creativity. 
              Once it finds its home, it&apos;s gone forever.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4 sm:px-0">
              <Link href="/gallery" className="btn-sweet-primary w-full sm:w-auto sm:min-w-[200px]">
                <span>Browse Collection</span>
              </Link>
              <Link href="/contact" className="btn-sweet-outline w-full sm:w-auto sm:min-w-[200px]">
                Get in Touch
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
