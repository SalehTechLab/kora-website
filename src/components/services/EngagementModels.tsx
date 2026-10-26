"use client";

import { motion } from "framer-motion";
import { ArrowRightOutlined } from "@ant-design/icons";
import styles from "./EngagementModels.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

const MODELS = [
  {
    tag: "Spot buy",
    title: "One order, start to finish.",
    body: "Need something once? We find the supplier, agree the price, check the goods and ship them. Sample orders, mixed pallets or a full container.",
    chips: ["Sample orders", "Mixed pallets", "Container loads"],
  },
  {
    tag: "Repeat supply",
    title: "Set it up once. Restock on repeat.",
    body: "For products you reorder, we lock in vetted suppliers and a consistent specification, so the next order matches the last and you stop re-briefing from scratch.",
    chips: ["Fleet supply", "Spec-driven sourcing", "Standing suppliers"],
  },
  {
    tag: "Build together",
    title: "Your brand. Or a venture of ours.",
    body: "Launch a private-label line with a manufacturer we trust, or explore a joint venture with us when the opportunity is bigger than a single shipment.",
    chips: ["Private label", "OEM", "Joint ventures"],
  },
];

export default function EngagementModels() {
  return (
    <section className={styles.section} aria-labelledby="models-heading">
      <div className={styles.container}>
        <motion.div
          className={styles.head}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          <p className={styles.eyebrow}>Ways to work with us</p>
          <h2 id="models-heading" className={styles.heading}>
            Start with one shipment. <em>Grow into a supply chain.</em>
          </h2>
        </motion.div>

        <div className={styles.cards}>
          {MODELS.map((m, i) => (
            <motion.article
              key={m.tag}
              className={styles.card}
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease }}
            >
              <span className={styles.index} aria-hidden="true">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className={styles.tag}>{m.tag}</p>
              <h3 className={styles.title}>{m.title}</h3>
              <p className={styles.body}>{m.body}</p>
              <ul className={styles.chips}>
                {m.chips.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
              <a href="/contact-us" className={styles.more}>
                Talk to us about this
                <ArrowRightOutlined />
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
