"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRightOutlined } from "@ant-design/icons";
import { COMMODITIES } from "./commodities";
import styles from "./CommodityShowcase.module.css";

export default function CommodityShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  // Horizontal travel = how far the track overflows its viewport. Only on
  // screens where the section pins; below that the track scrolls natively.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 992px)");
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      // Overflow past the viewport, plus the right-hand gutter so the last card rests inside the page edge
      const gutter = parseFloat(getComputedStyle(track).paddingRight) || 0;
      setDistance(mq.matches ? track.scrollWidth + gutter - track.clientWidth : 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      style={{ "--travel": `${distance}px` } as React.CSSProperties}
      aria-labelledby="showcase-heading"
    >
      <div className={styles.pin}>
        <div className={styles.head}>
          <div>
            <p className={styles.eyebrow}>What we trade</p>
            <h2 id="showcase-heading" className={styles.heading}>
              Quality Products,
              <br />
              <em>Competitive Prices,</em> Reliable Routes.
            </h2>
          </div>
          <Link href="/products" className={styles.link}>
            Browse the catalogue
            <ArrowRightOutlined />
          </Link>
        </div>

        <div ref={trackRef} className={styles.viewport}>
          <motion.ul className={styles.track} style={{ x }}>
            {COMMODITIES.map((c) => (
              <li key={c.id} className={styles.card}>
                <Link href="/products" className={styles.cardLink}>
                  <div className={styles.media}>
                    <Image
                      src={c.image!}
                      alt={c.name}
                      fill
                      sizes="(max-width: 991px) 78vw, 30vw"
                    />
                  </div>
                  <h3 className={styles.name}>{c.name}</h3>
                  <p className={styles.items}>{c.items}</p>
                </Link>
              </li>
            ))}
          </motion.ul>
        </div>

        <div className={styles.progress} aria-hidden="true">
          <motion.span className={styles.progressFill} style={{ scaleX: barScale }} />
        </div>
      </div>
    </section>
  );
}
