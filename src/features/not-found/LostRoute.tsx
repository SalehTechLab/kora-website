"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";

// Animated SVG parts: keyframes live in @theme (globals.css); reduced motion turns them off
const BOX = "[transform-box:fill-box] origin-center motion-reduce:animate-none";

// A shipment leaves Munich on a clean arc ... then drops off the radar
const ROUTE = "M64 196 C 140 56, 268 34, 336 112";
const LOST = "M336 112 C 372 152, 402 176, 436 150";

const DRAW = 2.4; // seconds for the route to draw / the marker to travel
const START = 1.0; // after the preloader has cleared
const LOST_AT = START + DRAW;

/** The route a "missing" page would have taken: it draws, the signal dies, a "?" is all that is left. */
export default function LostRoute() {
  const reduceMotion = useReducedMotion();
  const fade = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.6, delay, ease },
  });

  return (
    <div
      className="relative aspect-480/260 w-full"
      role="img"
      aria-label="A shipment route from Munich that stops mid-journey: signal lost"
    >
      <svg viewBox="0 0 480 260" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
        {/* latitude / longitude rings */}
        <g className="fill-none stroke-steel" strokeWidth="1">
          <ellipse cx="240" cy="130" rx="214" ry="96" opacity="0.18" />
          <ellipse cx="240" cy="130" rx="150" ry="96" opacity="0.14" />
          <ellipse cx="240" cy="130" rx="74" ry="96" opacity="0.12" />
          <path d="M26 130H454M240 34V226" opacity="0.14" />
        </g>

        {/* origin */}
        <motion.g {...fade(0.4)}>
          <circle cx="64" cy="196" r="6" className={`animate-ping-soft fill-white/40 ${BOX}`} />
          <circle cx="64" cy="196" r="4.5" className="fill-white" />
          <text x="64" y="220" textAnchor="middle" className="fill-snow text-micro font-semibold tracking-caps">
            MUNICH
          </text>
        </motion.g>

        {/* the route draws itself */}
        <motion.path
          d={ROUTE}
          className="fill-none stroke-white"
          strokeWidth="2.5"
          strokeLinecap="round"
          initial={reduceMotion ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: DRAW, delay: START, ease }}
        />

        {/* the cargo marker rides the route, then stops where the signal dies */}
        {reduceMotion ? (
          <circle cx="336" cy="112" r="5" className="fill-white" />
        ) : (
          <circle r="5" className="fill-white">
            <animateMotion
              dur={`${DRAW}s`}
              begin={`${START}s`}
              fill="freeze"
              path={ROUTE}
              calcMode="spline"
              keyTimes="0;1"
              keySplines="0.22 1 0.36 1"
            />
          </circle>
        )}

        {/* last known position */}
        <motion.g {...fade(LOST_AT)}>
          <circle cx="336" cy="112" r="9" className={`animate-pulse-ring fill-none stroke-crimson ${BOX}`} strokeWidth="2" />
          <circle cx="336" cy="112" r="4" className="fill-crimson" />
        </motion.g>

        {/* the continuation nobody can see: a flickering dashed trail into nothing */}
        <motion.g {...fade(LOST_AT + 0.2)}>
          <path
            d={LOST}
            className="animate-route-march fill-none stroke-steel [stroke-dasharray:3_9] motion-reduce:animate-none"
            strokeWidth="2"
            strokeLinecap="round"
          />
          <g className={`animate-flicker ${BOX}`}>
            <circle cx="436" cy="150" r="15" className="fill-crimson/20 stroke-crimson" strokeWidth="1.5" strokeDasharray="3 4" />
            <text x="436" y="162" textAnchor="middle" className="fill-white font-serif text-2xl font-bold">
              ?
            </text>
          </g>
          <text x="436" y="186" textAnchor="middle" className="fill-snow text-micro font-semibold tracking-caps">
            SIGNAL LOST
          </text>
        </motion.g>
      </svg>
    </div>
  );
}
