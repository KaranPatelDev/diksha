export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ivory">
      <div className="text-center">
        <div className="inline-flex items-center gap-1 mb-4">
          <span
            className="w-2 h-2 bg-gold rounded-full animate-bounce"
            style={{ animationDelay: "0ms" }}
          />
          <span
            className="w-2 h-2 bg-gold rounded-full animate-bounce"
            style={{ animationDelay: "150ms" }}
          />
          <span
            className="w-2 h-2 bg-gold rounded-full animate-bounce"
            style={{ animationDelay: "300ms" }}
          />
        </div>
        <p
          className="text-warm-gray text-xs tracking-[0.2em] uppercase"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Loading
        </p>
      </div>
    </div>
  );
}
