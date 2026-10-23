"use client";

import { useEffect, useState } from "react";
import { animate, AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { colors } from "@/theme/themeConfig";

const MIN_DURATION_MS = 1000;
const EASE = [0.76, 0, 0.24, 1] as const;
const CURVE_HEIGHT = "10vh";

function Curve({ fill }: { fill: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      style={{
        position: "absolute",
        top: "100%",
        left: 0,
        width: "100%",
        height: CURVE_HEIGHT,
        display: "block",
      }}
    >
      <path d="M0 0H100V0Q50 10 0 0Z" fill={fill} />
    </svg>
  );
}

function pageReady(): Promise<void> {
  const loaded =
    document.readyState === "complete"
      ? Promise.resolve()
      : new Promise<void>((resolve) => window.addEventListener("load", () => resolve(), { once: true }));
  const fonts = document.fonts?.ready ?? Promise.resolve();
  return Promise.all([loaded, fonts]).then(() => undefined);
}

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [leaving, setLeaving] = useState(false);
  const progress = useMotionValue(0);
  const barScale = useTransform(progress, [0, 100], [0, 1]);
  const counter = useTransform(progress, (v) => String(Math.round(v)).padStart(3, "0"));

  // Lock scroll while the splash is up
  useEffect(() => {
    if (!visible) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [visible]);

  // Hold for at least MIN_DURATION_MS and until the page has loaded, whichever is later
  useEffect(() => {
    let cancelled = false;
    const trickle = animate(progress, 90, { duration: MIN_DURATION_MS / 1000, ease: "easeOut" });
    const minimum = new Promise<void>((resolve) => setTimeout(resolve, MIN_DURATION_MS));

    Promise.all([minimum, pageReady()]).then(() => {
      if (cancelled) return;
      trickle.stop();
      animate(progress, 100, { duration: 0.35, ease: "easeOut" }).then(() => {
        if (!cancelled) setLeaving(true);
      });
    });

    return () => {
      cancelled = true;
      trickle.stop();
    };
  }, [progress]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          role="status"
          aria-label="Loading Kora Traders"
          style={{ position: "fixed", inset: 0, zIndex: 10000, pointerEvents: leaving ? "none" : "auto" }}
        >
          {/* Back curtain (accent) */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: leaving ? "-100%" : 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: leaving ? 0.12 : 0 }}
            style={{ position: "absolute", inset: 0, background: colors.crimson }}
          >
            <Curve fill={colors.crimson} />
          </motion.div>

          {/* Front curtain with content */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: leaving ? "-100%" : 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            onAnimationComplete={() => {
              if (leaving) setVisible(false);
            }}
            style={{
              position: "absolute",
              inset: 0,
              background: colors.softWhite,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 32,
            }}
          >
            <motion.div
              animate={leaving ? { opacity: 0, y: -40 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 32 }}
            >
              <div style={{ overflow: "hidden", padding: 4 }}>
                <motion.img
                  src="/images/logo/kora-logo-1.svg"
                  alt="Kora Traders"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                  style={{ display: "block", width: "min(260px, 60vw)", height: "auto" }}
                />
              </div>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
                style={{
                  width: "min(260px, 60vw)",
                  height: 2,
                  background: colors.steelGray,
                  transformOrigin: "left",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  style={{
                    height: "100%",
                    background: colors.crimson,
                    transformOrigin: "left",
                    scaleX: barScale,
                  }}
                />
              </motion.div>
            </motion.div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: leaving ? 0 : 1 }}
              transition={{ duration: 0.4, delay: leaving ? 0 : 0.5 }}
              style={{
                position: "absolute",
                insetInlineEnd: 32,
                insetBlockEnd: 24,
                fontFamily: "var(--font-serif), serif",
                fontWeight: 700,
                fontSize: "clamp(48px, 9vw, 120px)",
                lineHeight: 1,
                color: colors.deepNavy,
                fontVariantNumeric: "tabular-nums",
              }}
            >
              <motion.span>{counter}</motion.span>
            </motion.span>

            <Curve fill={colors.softWhite} />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
