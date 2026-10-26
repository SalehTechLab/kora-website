"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRightOutlined } from "@ant-design/icons";
import { COMMODITIES } from "./commodities";
import styles from "./Hero.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

const HEADLINE = ["We Source.", "We Procure.", "We Deliver."];

// How each commodity travels on its lane
const MODE: Record<string, "sea" | "air"> = {
  salt: "sea",
  surgical: "air",
  tyres: "sea",
  industrial: "sea",
  rice: "sea",
  textiles: "air",
  bopp: "sea",
};

const MODE_ICON = {
  sea: {
    label: "By sea",
    paths: ["M3 14h18l-2.5 6h-13z", "M7 14V9h10v5", "M10.5 9V5h3v4"],
  },
  air: {
    label: "By air",
    paths: [
      "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
    ],
  },
} as const;

const byId = (id: string) => COMMODITIES.find((c) => c.id === id)!;

// Three lanes of real product photography drifting in opposite directions
const LANES = [
  { dir: "up", seconds: 54, ids: ["salt", "tyres", "textiles"] },
  { dir: "down", seconds: 62, ids: ["rice", "surgical", "bopp"] },
  { dir: "up", seconds: 70, ids: ["industrial", "textiles", "salt"] },
] as const;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [popup, setPopup] = useState<{ key: number; index: number } | null>(
    null,
  );

  // Slide an "active trade lane" message up from the bottom of the frame, hold
  // it, clear it, then show a different commodity. Client-side only, so the
  // random pick never touches server rendering.
  useEffect(() => {
    let timer: number;
    let last = -1;
    let key = 0;
    const show = () => {
      let index = last;
      while (index === last) {
        index = Math.floor(Math.random() * COMMODITIES.length);
      }
      last = index;
      setPopup({ key: key++, index });
      timer = window.setTimeout(hide, 3400);
    };
    const hide = () => {
      setPopup(null);
      timer = window.setTimeout(show, 900);
    };
    timer = window.setTimeout(show, 1800);
    return () => window.clearTimeout(timer);
  }, []);
  const current = popup ? COMMODITIES[popup.index] : null;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <MotionConfig reducedMotion="user">
      <section
        ref={heroRef}
        className={styles.hero}
        aria-labelledby="hero-heading"
      >
        <div className={styles.inner}>
          <motion.div
            className={styles.copy}
            style={{ y: copyY, opacity: copyOpacity }}
          >
            <motion.p
              className={styles.eyebrow}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease }}
            >
              <span className={styles.eyebrowRule} aria-hidden="true" />
              Global Markets. One Trusted Partner.
            </motion.p>

            <h1 id="hero-heading" className={styles.headline}>
              {HEADLINE.map((line, i) => (
                <span key={line} className={styles.mask}>
                  <motion.span
                    className={
                      i === HEADLINE.length - 1
                        ? `${styles.line} ${styles.accent}`
                        : styles.line
                    }
                    initial={{ y: "115%", rotate: 4 }}
                    animate={{ y: "0%", rotate: 0 }}
                    transition={{ duration: 1, delay: 0.25 + i * 0.14, ease }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className={styles.lead}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease }}
            >
              KORA connects businesses to global opportunities, suppliers and
              markets, with end-to-end sourcing, procurement and logistics,
              from the first order to final delivery.
            </motion.p>

            <motion.div
              className={styles.ctas}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1, ease }}
            >
              <Link
                href="/contact-us"
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Get a Quote
                <ArrowRightOutlined className={styles.btnIcon} />
              </Link>
              <Link
                href="/products"
                className={`${styles.btn} ${styles.btnOutline}`}
              >
                Explore Products
                <ArrowRightOutlined className={styles.btnIcon} />
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.frame}
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease }}
          >
            <div className={styles.wall} aria-hidden="true">
              {LANES.map((l, li) => (
                <div key={li} className={styles.lane} data-lane={li}>
                  <div
                    className={styles.track}
                    data-dir={l.dir}
                    style={{ animationDuration: `${l.seconds}s` }}
                  >
                    {[0, 1].map((copy) =>
                      l.ids.map((id) => {
                        const c = byId(id);
                        return (
                          <figure className={styles.tile} key={`${copy}-${id}`}>
                            <Image
                              src={c.image!}
                              alt=""
                              fill
                              sizes="(max-width: 991px) 30vw, 17vw"
                              fetchPriority={li === 0 && copy === 0 ? "high" : undefined}
                            />
                            <figcaption className={styles.tag}>{c.tab}</figcaption>
                          </figure>
                        );
                      }),
                    )}
                  </div>
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {popup && current && (
                <motion.aside
                  key={popup.key}
                  className={styles.chip}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.4, ease }}
                  role="status"
                >
                  <div className={styles.chipTop}>
                    <span className={styles.chipLabel}>
                      <span className={styles.pulse} aria-hidden="true" />
                      Active trade lane
                    </span>
                    <svg
                      className={styles.mode}
                      viewBox="0 0 24 24"
                      role="img"
                      aria-label={MODE_ICON[MODE[current.id]].label}
                    >
                      {MODE_ICON[MODE[current.id]].paths.map((d) => (
                        <path key={d} d={d} />
                      ))}
                    </svg>
                  </div>
                  <div className={styles.route}>
                    <span>{current.from}</span>
                    <span className={styles.routeLine} aria-hidden="true">
                      <span className={styles.routeDot} />
                    </span>
                    <span>{current.to}</span>
                  </div>
                  <p className={styles.chipName}>{current.name}</p>
                </motion.aside>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

      </section>
    </MotionConfig>
  );
}
