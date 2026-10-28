"use client";

import { useReducedMotion } from "framer-motion";
import { ease } from "@/theme/colors";

export { ease };

/** Fade-up on scroll; resolves to no props under reduced motion. */
export function useReveal() {
  const reduceMotion = useReducedMotion();
  return (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.8, delay, ease },
        };
}
