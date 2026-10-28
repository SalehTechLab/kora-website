const ITEMS = [
  "Global Sourcing",
  "International Logistics",
  "Verified Suppliers",
  "On-Time Delivery",
  "Stress Free Business",
  "Competitive Pricing",
  "Full Visibility",
  "Air. Sea. Rail. Road",
  "Transparency",
  "Compliance",
  "End-to-End Coordination",
  "Multilingual Support",
];

export default function Ticker() {
  return (
    <section
      className="marquee relative w-full overflow-hidden bg-crimson py-5.5"
      aria-label="What KORA offers"
      tabIndex={0}
    >
      <div className="marquee-track flex w-max animate-marquee motion-reduce:animate-none">
        {/* Rendered twice so the -50% translate loops seamlessly */}
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 list-none"
            aria-hidden={copy === 1 ? true : undefined}
          >
            {ITEMS.map((item) => (
              <li
                key={item}
                className="flex items-center gap-8 pr-8 font-serif text-ticker whitespace-nowrap text-white even:italic after:size-2 after:rotate-45 after:bg-navy after:content-['']"
              >
                {item}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </section>
  );
}
