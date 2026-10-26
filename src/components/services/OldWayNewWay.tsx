"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import styles from "./OldWayNewWay.module.css";

const ROWS = [
  { old: "Cold-emailing suppliers you can’t verify", now: "Introductions to vetted suppliers" },
  { old: "Prices that move after you say yes", now: "Terms agreed and confirmed in writing" },
  { old: "Four forwarders, four invoices", now: "One partner coordinating every leg" },
  { old: "Paperwork discovered at the border", now: "Documents prepared before departure" },
  { old: "Silence after the truck leaves", now: "Updates until it reaches your door" },
];

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
  const nowOpacity = useTransform(progress, [mid, b], [0.14, 1]);
  const nowX = useTransform(progress, [mid, b], [28, 0]);

  return (
    <li className={styles.row}>
      <motion.p className={styles.old} style={{ opacity: oldOpacity }}>
        <span className={styles.oldText}>
          {row.old}
          <motion.span className={styles.strike} style={{ scaleX: strike }} aria-hidden="true" />
        </span>
      </motion.p>
      <span className={styles.arrow} aria-hidden="true">→</span>
      <motion.p className={styles.now} style={{ opacity: nowOpacity, x: nowX }}>
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
    <section className={styles.section} aria-labelledby="oldnew-heading">
      <div className={styles.container}>
        <div className={styles.head}>
          <p className={styles.eyebrow}>Why it feels different</p>
          <h2 id="oldnew-heading" className={styles.heading}>
            The difference is who is <em>holding the file.</em>
          </h2>
        </div>

        <div className={styles.cols} aria-hidden="true">
          <span>Doing it alone</span>
          <span />
          <span>With Kora</span>
        </div>

        <ul ref={ref} className={styles.list}>
          {ROWS.map((row, i) => (
            <Row
              key={row.old}
              row={row}
              progress={scrollYProgress}
              range={[i / ROWS.length, (i + 1) / ROWS.length]}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
