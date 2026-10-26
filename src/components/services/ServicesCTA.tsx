"use client";

import { motion } from "framer-motion";
import { ArrowRightOutlined } from "@ant-design/icons";
import { BOOKING_MEETING_URL } from "./servicesData";
import styles from "./ServicesCTA.module.css";

const ease = [0.22, 1, 0.36, 1] as const;
const WORDS = ["Source", "Procure", "Inspect", "Ship", "Clear", "Deliver"];

export default function ServicesCTA() {
  return (
    <section className={styles.section} aria-labelledby="services-cta-heading">
      {/* Decorative outlined marquee behind the copy */}
      <div className={styles.marquee} aria-hidden="true">
        {[0, 1].map((copy) => (
          <div key={copy} className={styles.group}>
            {WORDS.map((w) => (
              <span key={w}>{w}</span>
            ))}
          </div>
        ))}
      </div>

      <div className={styles.inner}>
        <motion.p
          className={styles.eyebrow}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          Let&rsquo;s trade
        </motion.p>

        <motion.h2
          id="services-cta-heading"
          className={styles.heading}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
          transition={{ staggerChildren: 0.14 }}
        >
          {["Tell us what you need.", "We’ll handle the rest."].map((line, i) => (
            <span key={line} className={styles.mask}>
              <motion.span
                className={i === 1 ? styles.accent : styles.line}
                variants={{ hidden: { y: "112%" }, show: { y: "0%" } }}
                transition={{ duration: 0.9, ease }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </motion.h2>

        <motion.p
          className={styles.sub}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3, ease }}
        >
          Share the product, quantity and destination. You get a clear plan
          and a competitive quote back, from a real person in Munich or Lahore.
        </motion.p>

        <motion.div
          className={styles.actions}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.45, ease }}
        >
          <a href="/contact-us" className={styles.primary}>
            Get a Quote
            <ArrowRightOutlined />
          </a>
          <a
            href={BOOKING_MEETING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.secondary}
          >
            Book a Consultation
          </a>
        </motion.div>

        <p className={styles.mail}>
          Or write to{" "}
          <a href="mailto:info@koratraders.com">info@koratraders.com</a>
        </p>
      </div>
    </section>
  );
}
