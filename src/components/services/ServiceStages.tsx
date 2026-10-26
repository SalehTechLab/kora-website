"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowRightOutlined } from "@ant-design/icons";
import ServiceVisual from "./ServiceVisuals";
import { SERVICES, type Service } from "./servicesData";
import styles from "./ServiceStages.module.css";

const ease = [0.22, 1, 0.36, 1] as const;
const COUNT = SERVICES.length;
const pad = (n: number) => String(n + 1).padStart(2, "0");

function ServiceText({ service, index }: { service: Service; index: number }) {
  return (
    <>
      <p className={styles.kicker}>
        <span className={styles.num}>{pad(index)}</span>
        {service.lead}
      </p>
      <h3 className={styles.title}>{service.title}</h3>
      <p className={styles.desc}>{service.description}</p>
      <ul className={styles.points}>
        {service.points.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <p className={styles.ask}>
        <span>The question we answer</span>
        &ldquo;{service.ask}&rdquo;
      </p>
      {service.link && (
        <Link href={service.link.href} className={styles.link}>
          {service.link.label}
          <ArrowRightOutlined />
        </Link>
      )}
    </>
  );
}

// Phone and tablet: no pinning, every service gets its own block
function MobileBlock({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  return (
    <article ref={ref} className={styles.block}>
      <ServiceText service={service} index={index} />
      <div className={styles.blockVisual}>
        <ServiceVisual service={service.key} play={inView} />
      </div>
    </article>
  );
}

export default function ServiceStages() {
  const runwayRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(COUNT - 1, Math.max(0, Math.floor(v * COUNT))));
  });

  const jumpTo = (i: number) => {
    const el = runwayRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + ((i + 0.5) / COUNT) * travel,
      behavior: "smooth",
    });
  };

  const service = SERVICES[active];

  return (
    <section
      id="services"
      ref={runwayRef}
      className={styles.runway}
      aria-labelledby="stages-heading"
    >
      <div className={styles.stage}>
        <header className={styles.head}>
          <div>
            <p className={styles.eyebrow}>What we do</p>
            <h2 id="stages-heading" className={styles.heading}>
              Six services. <em>One file.</em>
            </h2>
          </div>

          {/* Desktop rail: also works as navigation through the pinned story */}
          <ol className={styles.rail} aria-label="Services">
            {SERVICES.map((s, i) => (
              <li key={s.key}>
                <button
                  type="button"
                  className={`${styles.railItem} ${i === active ? styles.railActive : ""} ${i < active ? styles.railDone : ""}`}
                  onClick={() => jumpTo(i)}
                  aria-current={i === active ? "step" : undefined}
                >
                  <span className={styles.railBar}>
                    <motion.span
                      className={styles.railFill}
                      initial={false}
                      animate={{ scaleX: i <= active ? 1 : 0 }}
                      transition={{ duration: 0.5, ease }}
                    />
                  </span>
                  <span className={styles.railNum}>{pad(i)}</span>
                  <span className={styles.railLabel}>{s.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </header>

        {/* Desktop pinned view */}
        <div className={styles.desktop}>
          <div className={styles.textCol} aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease }}
              >
                <ServiceText service={service} index={active} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className={styles.visualCol}>
            <span className={styles.bigNum} aria-hidden="true">
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5, ease }}
                >
                  {pad(active)}
                </motion.span>
              </AnimatePresence>
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={service.key}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease }}
              >
                <ServiceVisual service={service.key} play />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile stack */}
        <div className={styles.mobile}>
          {SERVICES.map((s, i) => (
            <MobileBlock key={s.key} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
