"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import { Container, Eyebrow, Heading } from "@/components/ui";

const ROWS = [
  { old: "Cold-emailing suppliers you can’t verify", now: "Introductions to vetted suppliers" },
  { old: "Prices that move after you say yes", now: "Terms agreed and confirmed in writing" },
  { old: "Four forwarders, four invoices", now: "One partner coordinating every leg" },
  { old: "Paperwork discovered at the border", now: "Documents prepared before departure" },
  { old: "Silence after the truck leaves", now: "Updates until it reaches your door" },
];

const COLS = "lg:grid-cols-[minmax(0,1fr)_80px_minmax(0,1fr)]";

function Row({
  row,
  progress,
  range,
}: {
  row: (typeof ROWS)[number];
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const [a, b] = range;
  const mid = a + (b - a) * 0.5;
  const strike = useTransform(progress, [a, mid], [0, 1]);
  const oldOpacity = useTransform(progress, [a, b], [1, 0.38]);
  const nowOpacity = useTransform(progress, [mid, b], [0.68, 1]);
  const nowX = useTransform(progress, [mid, b], [28, 0]);

  return (
    <li
      className={`grid grid-cols-1 gap-2 border-t border-steel/50 py-5.5 last:border-b lg:items-center lg:gap-0 lg:py-8.5 ${COLS}`}
    >
      <motion.p
        className="font-serif text-[clamp(1.25rem,1rem+1.2vw,2rem)] leading-[1.2] tracking-heading text-steel-text"
        style={{ opacity: oldOpacity }}
      >
        <span className="relative inline">
          {row.old}
          {/* The strike-through draws itself as the row scrolls into focus */}
          <motion.span
            className="absolute top-[54%] left-0 h-0.5 w-full origin-left bg-crimson"
            style={{ scaleX: strike }}
            aria-hidden="true"
          />
        </span>
      </motion.p>
      <span className="hidden text-center text-[1.6rem] text-crimson lg:block" aria-hidden="true">
        →
      </span>
      <motion.p
        className="font-serif text-[clamp(1.25rem,1rem+1.2vw,2rem)] leading-[1.2] font-semibold tracking-heading text-navy max-lg:before:text-crimson max-lg:before:content-['→_']"
        style={{ opacity: nowOpacity, x: nowX }}
      >
        {row.now}
      </motion.p>
    </li>
  );
}

export default function OldWayNewWay() {
  const ref = useRef<HTMLUListElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.6"],
  });

  return (
    <section className="bg-white py-20 lg:py-30" aria-labelledby="oldnew-heading">
      <Container wide className="lg:px-12">
        <div className="mb-10 max-w-205 lg:mb-14">
          <Eyebrow>Why it feels different</Eyebrow>
          <Heading id="oldnew-heading" size="headline" className="font-semibold">
            The difference is who is{" "}
            <em className="block font-medium text-crimson">holding the file.</em>
          </Heading>
        </div>

        <div
          className={`hidden pb-3.5 text-xs font-semibold tracking-eyebrow text-steel-text uppercase lg:grid ${COLS}`}
          aria-hidden="true"
        >
          <span>Doing it alone</span>
          <span />
          <span className="text-crimson">With Kora</span>
        </div>

        <ul ref={ref}>
          {ROWS.map((row, i) => (
            <Row
              key={row.old}
              row={row}
              progress={scrollYProgress}
              range={[i / ROWS.length, (i + 1) / ROWS.length]}
            />
          ))}
        </ul>
      </Container>
    </section>
  );
}
