"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "./Manifesto.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

// Words wrapped in the accent set come through in crimson italic
const PARTS: { text: string; accent?: boolean }[] = [
  { text: "Global trade is full of" },
  { text: "moving parts.", accent: true },
  { text: "Unfamiliar suppliers, shifting prices, complex paperwork and tight windows." },
  { text: "We take the complexity off your plate:" },
  { text: "one dependable partner", accent: true },
  { text: "for sourcing, procurement and logistics, by air, sea, rail or road." },
];

const WORDS = PARTS.flatMap((part) =>
  part.text.split(" ").map((word) => ({ word, accent: !!part.accent })),
);

function Word({
  word,
  accent,
  index,
  progress,
}: {
  word: string;
  accent: boolean;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index / WORDS.length;
  const end = start + 1.5 / WORDS.length;
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  const y = useTransform(progress, [start, end], [10, 0]);

  return (
    <motion.span
      className={accent ? `${styles.word} ${styles.accent}` : styles.word}
      style={{ opacity, y }}
    >
      {word}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.55"],
  });

  return (
    <section
      id="manifesto"
      className={styles.section}
      aria-labelledby="manifesto-label"
    >
      <div className={styles.container}>
        <header className={styles.head}>
          <motion.p
            className={styles.label}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            Who We Are
          </motion.p>

          {/* Observed on the heading itself: a phrase parked outside its mask has no visible area to trigger on */}
          <motion.h2
            id="manifesto-label"
            className={styles.heading}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            transition={{ staggerChildren: 0.14 }}
          >
            {["One Team.", "Every Step.", "Your Business."].map((phrase) => (
              <span key={phrase} className={styles.mask}>
                <motion.span
                  className={styles.phrase}
                  variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
                  transition={{ duration: 0.9, ease }}
                >
                  {phrase}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          <motion.span
            className={styles.rule}
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease }}
            aria-hidden="true"
          />
        </header>

        <div className={styles.body}>
          <div ref={ref} className={styles.textCol}>
            <p className={styles.statement}>
              {/* Plain text for assistive tech; the animated copy is decorative */}
              <span className={styles.srOnly}>
                {PARTS.map((p) => p.text).join(" ")}
              </span>
              <span aria-hidden="true">
                {WORDS.map((w, i) => (
                  <Word
                    key={i}
                    word={w.word}
                    accent={w.accent}
                    index={i}
                    progress={scrollYProgress}
                  />
                ))}
              </span>
            </p>
          </div>

          <Link href="/about-us" className={styles.link}>
            More about Kora
            <ArrowRightOutlined />
          </Link>

          <motion.aside
            className={styles.mission}
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className={styles.watermark} aria-hidden="true">
              <Image
                src="/images/logo/kora-logo-mark.svg"
                alt=""
                width={640}
                height={714}
              />
            </div>
            <p className={styles.missionLabel}>Our Mission</p>
            <p className={styles.missionText}>
              To connect businesses to global opportunities and make
              international trade simple, transparent and stress-free.
            </p>
          </motion.aside>
        </div>
      </div>
    </section>
  );
}
