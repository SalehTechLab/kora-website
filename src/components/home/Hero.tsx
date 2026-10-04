"use client";

import Link from "next/link";
import Image from "next/image";
import { motion, MotionConfig, type Variants } from "framer-motion";
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "./Hero.module.css";

const HEADLINE = ["Source.", "Procure.", "Deliver."];

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.15 } },
};

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  return (
    <MotionConfig reducedMotion="user">
      <section className={styles.hero} aria-labelledby="hero-heading">
        <motion.div
          className={styles.panel}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className={styles.imageWrap}>
            <Image
              src="/images/hero/hero-logistics-hub-network-1.png"
              alt=""
              fill
              sizes="(max-width: 991px) 1px, 60vw"
              className={styles.image}
              preload
            />
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
              Global Markets. One Trusted Partner.
            </motion.p>

            <h1 id="hero-heading" className={styles.headline}>
              {HEADLINE.map((word) => (
                <motion.span
                  key={word}
                  className={styles.line}
                  variants={fadeUp}
                >
                  We <span className={styles.accent}>{word}</span>
                </motion.span>
              ))}
            </h1>

            <motion.p className={styles.lead} variants={fadeUp}>
              KORA connects businesses to global opportunities, suppliers and
              markets, providing end-to-end sourcing, procurement and logistics,
              from the first order to final delivery.
            </motion.p>

            <motion.div className={styles.ctas} variants={fadeUp}>
              <Link
                href="/contact"
                className={`${styles.btn} ${styles.btnPrimary}`}
              >
                Get a Quote
                <ArrowRightOutlined className={styles.btnIcon} />
              </Link>
              <Link
                href="/services"
                className={`${styles.btn} ${styles.btnOutline}`}
              >
                View Services
                <ArrowRightOutlined className={styles.btnIcon} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
