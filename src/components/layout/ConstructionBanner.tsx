const MESSAGES = [
  "Caution",
  "Site under construction",
  "Caution",
  "Site under construction",
  "Caution",
];

/** Temporary hazard-tape strip above the navbar. Scrolls away; the sticky navbar sits below it. */
export default function ConstructionBanner() {
  return (
    <div
      role="status"
      className="relative w-full bg-hazard-black text-hazard-black"
    >
      <div aria-hidden className="hazard-stripes h-1.5 w-full" />
      <div className="overflow-hidden bg-hazard">
        <p className="flex items-center justify-center gap-6 py-1.5 text-center text-xs font-extrabold tracking-[0.2em] whitespace-nowrap uppercase sm:text-sm">
          {MESSAGES.map((m, i) => (
            <span
              key={i}
              className={i === 0 ? "" : "hidden sm:inline"}
              aria-hidden={i === 0 ? undefined : true}
            >
              {m}
              {i < MESSAGES.length - 1 && (
                <span className="ml-6 opacity-60">◆</span>
              )}
            </span>
          ))}
        </p>
      </div>
      <div aria-hidden className="hazard-stripes h-1.5 w-full" />
    </div>
  );
}
