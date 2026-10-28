"use client";

const TAGLINES = [
  "Trust in Every Deal. Value in Every Connection.",
  "Better Deals. Stronger Bonds. Lasting Growth.",
  "Real Connections. Fairer Trade. Growth That Lasts.",
];

export default function TaglineTicker() {
  // Two identical halves so the -50% loop is seamless
  const items = [...TAGLINES, ...TAGLINES, ...TAGLINES, ...TAGLINES];

  return (
    <section
      aria-label={TAGLINES.join(" ")}
      className="marquee overflow-hidden bg-crimson py-5.5"
    >
      <div
        aria-hidden
        className="marquee-track flex w-max animate-marquee motion-reduce:animate-none"
      >
        {items.map((line, i) => (
          <span
            key={i}
            className="flex items-center gap-8 pr-8 font-serif text-ticker whitespace-nowrap text-white after:size-2 after:rotate-45 after:bg-navy after:content-[''] even:italic"
          >
            {line}
          </span>
        ))}
      </div>
    </section>
  );
}
