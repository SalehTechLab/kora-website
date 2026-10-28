"use client";

import { useEffect, useState } from "react";
import { animate, AnimatePresence, motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/cn";

const MIN_DURATION_MS = 1000;
const EASE = [0.76, 0, 0.24, 1] as const;

function Curve({ className }: { className: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 10"
      preserveAspectRatio="none"
      className={cn("absolute top-full left-0 block h-[10vh] w-full", className)}
    >
      <path d="M0 0H100V0Q50 10 0 0Z" />
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
          className={cn("fixed inset-0 z-10000", leaving ? "pointer-events-none" : "pointer-events-auto")}
        >
          {/* Back curtain (accent) */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: leaving ? "-100%" : 0 }}
            transition={{ duration: 0.9, ease: EASE, delay: leaving ? 0.12 : 0 }}
            className="absolute inset-0 bg-crimson"
          >
            <Curve className="fill-crimson" />
          </motion.div>

          {/* Front curtain with content */}
          <motion.div
            initial={{ y: 0 }}
            animate={{ y: leaving ? "-100%" : 0 }}
            transition={{ duration: 0.9, ease: EASE }}
            onAnimationComplete={() => {
              if (leaving) setVisible(false);
            }}
            className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-snow"
          >
            <motion.div
              animate={leaving ? { opacity: 0, y: -40 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="flex flex-col items-center gap-8"
            >
              <div className="overflow-hidden p-1">
                <motion.img
                  src="/images/logo/kora-logo-1.svg"
                  alt="Kora Traders"
                  initial={{ y: "110%", opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.9, ease: EASE, delay: 0.1 }}
                  className="block h-auto w-[min(260px,60vw)]"
                />
              </div>

              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
                className="h-0.5 w-[min(260px,60vw)] origin-left overflow-hidden bg-steel"
              >
                <motion.div className="h-full origin-left bg-crimson" style={{ scaleX: barScale }} />
              </motion.div>
            </motion.div>

            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: leaving ? 0 : 1 }}
              transition={{ duration: 0.4, delay: leaving ? 0 : 0.5 }}
              className="absolute end-8 bottom-6 font-serif text-[clamp(48px,9vw,120px)] leading-none font-bold text-navy tabular-nums"
            >
              <motion.span>{counter}</motion.span>
            </motion.span>

            <Curve className="fill-snow" />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
