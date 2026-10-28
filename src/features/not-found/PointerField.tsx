"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { ease } from "@/lib/motion";

const SPRING = { stiffness: 110, damping: 22, mass: 0.7 };

/**
 * Hero backdrop: a dot grid that lights up under the cursor, a soft crimson
 * glow that trails it, and an outlined "404" that drifts against it for depth.
 * Pointer-driven, so it simply rests at a fixed spot on touch / reduced motion.
 */
export default function PointerField() {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, SPRING);
  const sy = useSpring(y, SPRING);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    x.jump(rect.width * 0.7);
    y.jump(rect.height * 0.4);
    if (reduceMotion) return;

    const onMove = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      x.set(e.clientX - r.left);
      y.set(e.clientY - r.top);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduceMotion, x, y]);

  const spotlight = useMotionTemplate`radial-gradient(300px circle at ${sx}px ${sy}px, black, transparent)`;
  const glow = useMotionTemplate`radial-gradient(520px circle at ${sx}px ${sy}px, color-mix(in srgb, var(--color-crimson) 26%, transparent), transparent 70%)`;

  // The giant numerals move a few px opposite to the cursor
  const ghostX = useTransform(sx, (v) => (reduceMotion ? 0 : (v - 600) * -0.03));
  const ghostY = useTransform(sy, (v) => (reduceMotion ? 0 : (v - 300) * -0.03));

  return (
    <div ref={ref} aria-hidden className="pointer-events-none absolute inset-0 -z-10">
      <motion.div className="absolute inset-0" style={{ backgroundImage: glow }} />

      {/* resting grid */}
      <div className="absolute inset-0 bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-steel)_55%,transparent)_1px,transparent_1.6px)] bg-size-[30px_30px] opacity-20" />

      {/* the same grid, only visible inside the spotlight */}
      <motion.div
        className="absolute inset-0 bg-[radial-gradient(circle,var(--color-white)_1.2px,transparent_1.8px)] bg-size-[30px_30px] opacity-70"
        style={{ maskImage: spotlight, WebkitMaskImage: spotlight }}
      />

      <motion.div
        className="absolute inset-x-0 bottom-0 flex justify-center"
        style={{ x: ghostX, y: ghostY }}
        initial={reduceMotion ? false : { opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, delay: 0.6, ease }}
      >
        <span className="translate-y-[0.2em] font-serif text-[length:clamp(14rem,40vw,36rem)] leading-none font-bold tracking-display text-transparent opacity-15 select-none [-webkit-text-stroke:1.5px_var(--color-steel)]">
          404
        </span>
      </motion.div>
    </div>
  );
}
