"use client";

import { useCallback, useState, type KeyboardEvent } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useMotionValue,
  useSpring,
  useTransform,
  type Variants,
} from "framer-motion";
import { ArrowRightOutlined } from "@ant-design/icons";
import { COMMODITIES } from "./commodities";
import styles from "./Hero.module.css";

const HEADLINE = ["Essential", "Commodities,", "Traded Globally."];
const ease = [0.22, 1, 0.36, 1] as const;

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } },
};

const pad = (n: number) => String(n).padStart(2, "0");

export default function Hero() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const current = COMMODITIES[active];

  const go = useCallback(
    (i: number) => setActive((i + COMMODITIES.length) % COMMODITIES.length),
    [],
  );

  // Pointer parallax: the illustration drifts with the cursor, the ring counter-drifts
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 18 });
  const sy = useSpring(py, { stiffness: 90, damping: 18 });
  const artX = useTransform(sx, (v) => v * 16);
  const artY = useTransform(sy, (v) => v * 16);
  const ringX = useTransform(sx, (v) => v * -10);
  const ringY = useTransform(sy, (v) => v * -10);

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };
  const onPointerLeave = () => {
    px.set(0);
    py.set(0);
    setPaused(false);
  };

  const onTabKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const dir =
      e.key === "ArrowRight" || e.key === "ArrowDown"
        ? 1
        : e.key === "ArrowLeft" || e.key === "ArrowUp"
          ? -1
          : 0;
    if (!dir) return;
    e.preventDefault();
    const next = (active + dir + COMMODITIES.length) % COMMODITIES.length;
    go(next);
    document.getElementById(`hero-tab-${COMMODITIES[next].id}`)?.focus();
  };

  return (
    <MotionConfig reducedMotion="user">
      <section className={styles.hero} aria-labelledby="hero-heading">
        {/* Organic edge shapes, in bounding-box units so they scale with the panel */}
        <svg width="0" height="0" className={styles.defs} aria-hidden="true">
          <defs>
            <clipPath id="hero-blob" clipPathUnits="objectBoundingBox">
              <path d="M0.34,0 C0.17,0.14 0.31,0.30 0.14,0.46 C-0.02,0.62 0.19,0.80 0.10,1 L1,1 L1,0 Z" />
            </clipPath>
            <clipPath id="hero-wave" clipPathUnits="objectBoundingBox">
              <path d="M0,0.06 C0.22,0.14 0.45,-0.02 0.72,0.05 C0.85,0.08 0.94,0.04 1,0.02 L1,1 L0,1 Z" />
            </clipPath>
          </defs>
        </svg>
        <div className={styles.ribbon} aria-hidden="true" />
        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease }}
          onPointerEnter={() => setPaused(true)}
          onPointerLeave={onPointerLeave}
          onPointerMove={onPointerMove}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          <div className={styles.stage}>
            <div className={styles.disc}>
              <motion.svg
                className={styles.orbit}
                viewBox="0 0 100 100"
                aria-hidden="true"
                style={{ x: ringX, y: ringY }}
              >
                <motion.g
                  style={{ originX: "50px", originY: "50px" }}
                  animate={{ rotate: 360 }}
                  transition={{ duration: 48, ease: "linear", repeat: Infinity }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="49"
                    fill="none"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="0.35"
                    strokeDasharray="1.2 2.4"
                  />
                  <circle cx="50" cy="1" r="2.1" fill="#B51E32" />
                  <circle cx="50" cy="1" r="0.8" fill="#fff" />
                </motion.g>
              </motion.svg>

              <span className={styles.index} aria-hidden="true">
                {pad(active + 1)} / {pad(COMMODITIES.length)}
              </span>

              <motion.div className={styles.parallax} style={{ x: artX, y: artY }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={current.id}
                    className={styles.art}
                    initial={{ opacity: 0, scale: 0.82, rotate: -8, y: 28 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0, y: 0 }}
                    exit={{ opacity: 0, scale: 0.92, y: -18 }}
                    transition={{ duration: 0.5, ease }}
                  >
                    <motion.div
                      className={styles.float}
                      animate={{ y: [0, -9, 0] }}
                      transition={{
                        duration: 6,
                        ease: "easeInOut",
                        repeat: Infinity,
                      }}
                    >
                      {current.image ? (
                        <Image
                          src={current.image}
                          alt=""
                          fill
                          sizes="(max-width: 991px) 70vw, 30vw"
                          style={{ objectFit: "contain" }}
                        />
                      ) : (
                        current.art
                      )}
                    </motion.div>
                  </motion.div>
                </AnimatePresence>
              </motion.div>

              <div className={styles.route} aria-hidden="true">
                <span>Pakistan</span>
                <span className={styles.routeLine} />
                <span>Germany</span>
              </div>
            </div>

            <div
              id="hero-stage"
              role="tabpanel"
              aria-labelledby={`hero-tab-${current.id}`}
              className={styles.caption}
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease }}
                >
                  <p className={styles.captionTitle}>{current.name}</p>
                  <p className={styles.captionItems}>{current.items}</p>
                </motion.div>
              </AnimatePresence>
            </div>

            <div
              className={styles.tabs}
              role="tablist"
              aria-label="Commodity categories"
              onKeyDown={onTabKeyDown}
            >
              {COMMODITIES.map((c, i) => {
                const selected = i === active;
                return (
                  <button
                    key={c.id}
                    id={`hero-tab-${c.id}`}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    aria-controls="hero-stage"
                    tabIndex={selected ? 0 : -1}
                    className={styles.tab}
                    onClick={() => go(i)}
                  >
                    {c.tab}
                    {selected && (
                      <span
                        className={styles.progress}
                        data-paused={paused}
                        onAnimationEnd={() => go(active + 1)}
                        aria-hidden="true"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </motion.div>

        <div className={styles.inner}>
          <motion.div
            className={styles.content}
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.p className={styles.eyebrow} variants={fadeUp}>
              Import · Export · Commodity Trading
            </motion.p>

            <h1 id="hero-heading" className={styles.headline}>
              {HEADLINE.map((line, i) => (
                <motion.span
                  key={line}
                  className={styles.line}
                  variants={fadeUp}
                >
                  {i === HEADLINE.length - 1 ? (
                    <span className={styles.accent}>{line}</span>
                  ) : (
                    line
                  )}
                </motion.span>
              ))}
            </h1>

            <motion.p className={styles.lead} variants={fadeUp}>
              KORA imports and exports quality goods across six commodity
              categories, from Himalayan salt to surgical instruments, with
              sourcing, procurement and freight handled end to end.
            </motion.p>

            <motion.div className={styles.ctas} variants={fadeUp}>
              <Link
                href="/contact"
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Request a Quote
                <ArrowRightOutlined className={styles.btnIcon} />
              </Link>
              <Link
                href="#who-we-are"
                className={`${styles.btn} ${styles.btnOutline}`}
              >
                Who We Are
                <ArrowRightOutlined className={styles.btnIcon} />
              </Link>
            </motion.div>

            <motion.p className={styles.proof} variants={fadeUp}>
              Based in Germany <i aria-hidden="true" /> Operations in Pakistan{" "}
              <i aria-hidden="true" /> Freight included
            </motion.p>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
