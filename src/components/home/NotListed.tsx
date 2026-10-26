"use client";

import { useEffect, useState } from "react";
import { Button } from "antd";
import { ArrowRightOutlined, CheckOutlined, SearchOutlined } from "@ant-design/icons";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import styles from "./NotListed.module.css";

const ease = [0.22, 1, 0.36, 1] as const;

// Things a visitor might be hunting for, typed into the demo request
const EXAMPLES = [
  "Solar panels",
  "Construction steel",
  "Packaging machinery",
  "Medical consumables",
  "Furniture",
  "Spices & pulses",
];

type Stage = "typing" | "searching" | "found";

const C = 250; // map centre

// Abstract supplier network: angle (deg), radius, optional country label
const NODES = [
  { a: -80, r: 150, label: "Germany" },
  { a: -28, r: 205, label: "Pakistan" },
  { a: 22, r: 150, label: "India" },
  { a: 68, r: 210, label: "UAE" },
  { a: 118, r: 150, label: "Indonesia" },
  { a: 165, r: 205, label: "America" },
  { a: 212, r: 150, label: "Netherlands" },
  { a: 250, r: 215, label: "Denmark" },
  { a: -55, r: 95 },
  { a: 48, r: 90 },
  { a: 140, r: 95 },
  { a: 232, r: 92 },
  { a: -8, r: 112, label: "Austria" },
  { a: 96, r: 205, label: "Australia" },
] as const;

const point = (a: number, r: number) => ({
  x: C + r * Math.cos((a * Math.PI) / 180),
  y: C + r * Math.sin((a * Math.PI) / 180),
});

export default function NotListed() {
  const reduce = useReducedMotion();
  const [phrase, setPhrase] = useState(0);
  const [liveTyped, setTyped] = useState("");
  const [liveStage, setStage] = useState<Stage>("typing");
  const [target, setTarget] = useState(0);

  // Reduced motion holds on a finished result instead of looping
  const typed = reduce ? EXAMPLES[0] : liveTyped;
  const stage: Stage = reduce ? "found" : liveStage;

  // typing → searching → found → next phrase
  useEffect(() => {
    if (reduce) return;
    const word = EXAMPLES[phrase];
    let timer: number;
    let i = 0;

    const type = () => {
      i += 1;
      setTyped(word.slice(0, i));
      if (i < word.length) {
        timer = window.setTimeout(type, 65);
      } else {
        timer = window.setTimeout(() => {
          setStage("searching");
          timer = window.setTimeout(() => {
            setTarget(Math.floor(Math.random() * NODES.length));
            setStage("found");
            timer = window.setTimeout(() => {
              setTyped("");
              setStage("typing");
              setPhrase((p) => (p + 1) % EXAMPLES.length);
            }, 2600);
          }, 2200);
        }, 450);
      }
    };

    timer = window.setTimeout(type, 500);
    return () => window.clearTimeout(timer);
  }, [phrase, reduce]);

  const tp = point(NODES[target].a, NODES[target].r);

  return (
    <MotionConfig reducedMotion="user">
      <section className={styles.section} aria-labelledby="not-listed-heading">
        <div className={styles.container}>
          <div className={styles.copy}>
            <motion.p
              className={styles.eyebrow}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              Beyond the catalogue
            </motion.p>

            <motion.h2
              id="not-listed-heading"
              className={styles.heading}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ staggerChildren: 0.12 }}
            >
              {["Can’t find your product in the list above?", "Don’t worry, we’ll find it for you."].map(
                (line, i) => (
                  <span key={line} className={styles.mask}>
                    <motion.span
                      className={i === 1 ? `${styles.line} ${styles.accent}` : styles.line}
                      variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
                      transition={{ duration: 0.9, ease }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ),
              )}
            </motion.h2>

            <motion.p
              className={styles.lead}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease }}
            >
              That list is only where we started. Our supplier network reaches
              far past it, so if what you need isn&rsquo;t here, it probably
              isn&rsquo;t out of reach. Tell us what you&rsquo;re after and we
              will track down suppliers, shortlist the best options and handle
              the rest, all the way to your door. Just get in touch.
            </motion.p>

            {/* Demo request: a visitor types a product, the network answers */}
            <motion.div
              className={styles.request}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35, ease }}
              aria-hidden="true"
            >
              <SearchOutlined className={styles.searchIcon} />
              <span className={styles.typed}>
                {typed}
                <span className={styles.caret} data-live={stage === "typing"} />
              </span>
              <span className={styles.status} data-stage={stage}>
                {stage === "typing" && "Your request"}
                {stage === "searching" && (
                  <>
                    <span className={styles.dot} />
                    Searching our network
                  </>
                )}
                {stage === "found" && (
                  <>
                    <CheckOutlined />
                    Supplier found
                  </>
                )}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.45, ease }}
            >
              <Button
                type="primary"
                size="large"
                href="/contact-us"
                icon={<ArrowRightOutlined />}
                iconPlacement="end"
              >
                Request a Product
              </Button>
            </motion.div>
          </div>

          <motion.div
            className={styles.art}
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease }}
            aria-hidden="true"
          >
            <svg viewBox="-45 -10 590 520" className={styles.map} data-stage={stage}>
              {/* Orbit rings */}
              {[95, 150, 215].map((r) => (
                <circle key={r} cx={C} cy={C} r={r} className={styles.ring} />
              ))}

              {/* Radar sweep */}
              <g className={styles.sweep}>
                <line x1={C} y1={C} x2={C} y2={C - 232} className={styles.sweepLine} />
              </g>

              {/* Spokes */}
              {NODES.map((n, i) => {
                const p = point(n.a, n.r);
                return (
                  <line
                    key={i}
                    x1={C}
                    y1={C}
                    x2={p.x}
                    y2={p.y}
                    className={styles.spoke}
                    data-hit={stage === "found" && i === target}
                    style={{ animationDelay: `${i * 0.14}s` }}
                  />
                );
              })}

              {/* Search ping */}
              {stage === "searching" && (
                <>
                  <circle cx={C} cy={C} r="40" className={styles.ping} />
                  <circle
                    cx={C}
                    cy={C}
                    r="40"
                    className={styles.ping}
                    style={{ animationDelay: "0.9s" }}
                  />
                </>
              )}

              {/* Nodes */}
              {NODES.map((n, i) => {
                const p = point(n.a, n.r);
                const hit = stage === "found" && i === target;
                const right = Math.cos((n.a * Math.PI) / 180) >= 0;
                return (
                  <g key={i} className={styles.node} data-hit={hit}>
                    {hit && <circle cx={p.x} cy={p.y} r="17" className={styles.hitHalo} />}
                    <circle cx={p.x} cy={p.y} r={hit ? 8 : 5.5} className={styles.nodeDot} />
                    {"label" in n && (
                      <text
                        x={p.x + (right ? 14 : -14)}
                        y={p.y + 4}
                        textAnchor={right ? "start" : "end"}
                        className={styles.nodeLabel}
                      >
                        {n.label}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Match tag */}
              {stage === "found" && (
                <g
                  className={styles.tagGroup}
                  transform={`translate(${Math.min(Math.max(tp.x, 70), 430)} ${
                    tp.y < C ? tp.y - 34 : tp.y + 34
                  })`}
                >
                  <rect x="-58" y="-14" width="116" height="28" rx="4" className={styles.tagBox} />
                  <text textAnchor="middle" y="4" className={styles.tagText}>
                    Match found
                  </text>
                </g>
              )}

              {/* Kora hub */}
              <circle cx={C} cy={C} r="40" className={styles.hub} />
              <image
                href="/images/logo/kora-logo-mark.svg"
                x={C - 15}
                y={C - 17}
                width="30"
                height="34"
                className={styles.hubMark}
              />
            </svg>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}
