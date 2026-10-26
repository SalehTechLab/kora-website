"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  MotionConfig,
  useInView,
  useReducedMotion,
} from "framer-motion";
import { ArrowRightOutlined, CheckOutlined } from "@ant-design/icons";
import styles from "./ServicesHero.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

const STEPS = [
  "Brief received",
  "Supplier matched",
  "Price agreed",
  "Quality approved",
  "In transit",
  "Cleared & delivered",
];

const STATS = [
  { value: 2, label: "Offices", detail: "Munich · Lahore" },
  { value: 7, label: "Product categories", detail: "And anything else" },
  { value: 4, label: "Transport modes", detail: "Air · Sea · Rail · Road" },
  { value: 1, label: "Point of contact", detail: "From brief to door" },
];

function CountUp({ to }: { to: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();
  const [n, setN] = useState(reduce ? to : 0);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, {
      duration: 1.4,
      ease,
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, reduce, to]);

  return <span ref={ref}>{n}</span>;
}

// The deal file works through its stages, stamps itself, then starts over
function DealFile() {
  const reduce = useReducedMotion();
  const [liveStep, setStep] = useState(0);
  const step = reduce ? STEPS.length : liveStep;

  useEffect(() => {
    if (reduce) return;
    let timer: number;
    const tick = (s: number) => {
      setStep(s);
      const next = s >= STEPS.length ? 0 : s + 1;
      const wait = s === 0 ? 1100 : s >= STEPS.length ? 3200 : 1000;
      timer = window.setTimeout(() => tick(next), wait);
    };
    timer = window.setTimeout(() => tick(1), 1700);
    return () => window.clearTimeout(timer);
  }, [reduce]);

  const done = step >= STEPS.length;

  return (
    <motion.div
      className={styles.file}
      initial={{ opacity: 0, y: 48, rotate: 3 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1, delay: 0.5, ease }}
    >
      <div className={styles.fileTab}>Sample deal file</div>
      <div className={styles.fileHead}>
        <div>
          <p className={styles.fileKicker}>Basmati rice</p>
          <p className={styles.fileRoute}>Lahore → Munich</p>
        </div>
        <Image
          src="/images/commodities/rice-photo.jpg"
          alt=""
          width={72}
          height={72}
          className={styles.fileThumb}
        />
      </div>

      <div className={styles.progress} aria-hidden="true">
        <motion.span
          className={styles.progressBar}
          animate={{ scaleX: step / STEPS.length }}
          transition={{ duration: 0.7, ease }}
        />
      </div>

      <ol className={styles.steps}>
        {STEPS.map((label, i) => {
          const complete = i < step;
          const current = i === step && !done;
          return (
            <li
              key={label}
              className={`${styles.step} ${complete ? styles.stepDone : ""} ${current ? styles.stepNow : ""}`}
            >
              <motion.span
                className={styles.tick}
                animate={{ scale: complete ? [0.6, 1.18, 1] : 1 }}
                transition={{ duration: 0.45, ease }}
              >
                {complete && <CheckOutlined />}
              </motion.span>
              <span className={styles.stepLabel}>{label}</span>
              <span className={styles.stepState}>
                {complete ? "Done" : current ? "In progress" : ""}
              </span>
            </li>
          );
        })}
      </ol>

      <motion.div
        className={styles.stamp}
        aria-hidden="true"
        initial={false}
        animate={
          done
            ? { opacity: 1, scale: 1, rotate: -9 }
            : { opacity: 0, scale: 2.3, rotate: -9 }
        }
        transition={{ duration: done ? 0.35 : 0.2, ease }}
      >
        Delivered
      </motion.div>
    </motion.div>
  );
}

export default function ServicesHero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className={styles.hero} aria-labelledby="services-hero-heading">
        <div className={styles.glow} aria-hidden="true" />
        <div className={styles.grid} aria-hidden="true" />

        <div className={styles.inner}>
          <div className={styles.copy}>
            <motion.p
              className={styles.eyebrow}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <span className={styles.eyebrowRule} />
              Services
            </motion.p>

            <motion.h1
              id="services-hero-heading"
              className={styles.headline}
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.16, delayChildren: 0.15 }}
            >
              {["“We need it.”", "“It’s here.”"].map((line, i) => (
                <span key={line} className={styles.mask}>
                  <motion.span
                    className={i === 1 ? styles.accent : styles.line}
                    variants={{ hidden: { y: "112%" }, show: { y: "0%" } }}
                    transition={{ duration: 1, ease }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              className={styles.sub}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease }}
            >
              Everything in between is our job. Sourcing, procurement, quality
              control, logistics and customs, run as one accountable service by
              a team in Munich and Lahore.
            </motion.p>

            <motion.div
              className={styles.actions}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease }}
            >
              <a href="/contact-us" className={styles.primary}>
                Get a Quote
                <ArrowRightOutlined />
              </a>
              <a href="#services" className={styles.secondary}>
                See the six services
              </a>
            </motion.div>
          </div>

          <DealFile />
        </div>

        <dl className={styles.stats}>
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              className={styles.stat}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1 + i * 0.1, ease }}
            >
              <dt className={styles.statValue}>
                <CountUp to={s.value} />
              </dt>
              <dd className={styles.statLabel}>
                {s.label}
                <span>{s.detail}</span>
              </dd>
            </motion.div>
          ))}
        </dl>
      </section>
    </MotionConfig>
  );
}
