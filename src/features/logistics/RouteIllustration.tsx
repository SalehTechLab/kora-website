"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";

// Animated SVG parts: keyframes live in @theme (globals.css); reduced motion turns them off
const BOX = "[transform-box:fill-box] origin-center motion-reduce:animate-none";
const FLOAT = `animate-float-sm ${BOX}`;
const FLOAT_B = `${FLOAT} [animation-duration:6.2s] [animation-delay:-2s]`;
const ROUTE = "animate-route-march [stroke-dasharray:3_11] motion-reduce:animate-none";
const PING = `animate-ping-soft ${BOX}`;
const BAR = "animate-bar-fill [transform-box:fill-box] origin-left motion-reduce:animate-none";
const SHIP = "animate-ship-bob [transform-box:fill-box] origin-[50%_100%] motion-reduce:animate-none";

// Three legs of one shipment: origin -> air hub, origin -> port, port -> hub by road
const SEA = "M118 312 Q 250 410 396 322";
const AIR = "M118 312 Q 168 96 410 138";
const RAIL = "M118 312 Q 320 290 410 138";
const ROAD = "M396 322 Q 470 252 410 138";

const NODES = [
  { x: 118, y: 312, label: "ORIGIN", dx: -14, anchor: "end" as const, cls: "" },
  { x: 410, y: 138, label: "DESTINATION", dx: 16, anchor: "start" as const, cls: "[animation-delay:-0.9s]" },
  { x: 396, y: 322, label: "PORT", dx: 16, anchor: "start" as const, cls: "[animation-delay:-1.7s]" },
];

export default function RouteIllustration() {
  const reduceMotion = useReducedMotion();
  const pop = (delay: number, y = 18) => ({
    initial: reduceMotion ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    // Staggered but quick, so the whole scene is in place within about a second
    transition: { duration: 0.5, delay: delay * 0.3, ease },
  });
  const travel = (dur: string, begin: string, rotate: "auto" | "0", path: string) =>
    reduceMotion ? null : (
      <animateMotion
        dur={dur}
        begin={begin}
        repeatCount="indefinite"
        rotate={rotate}
        path={path}
      />
    );

  return (
    <div
      className="relative ml-auto aspect-540/460 w-full max-w-135 max-md:mx-auto"
      role="img"
      aria-label="A shipment moving from origin to destination by sea, air, rail and road"
    >
      <svg className="absolute inset-0 size-full overflow-visible" viewBox="0 0 540 460" aria-hidden="true">
        {/* globe backdrop */}
        <motion.g
          initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <circle cx="270" cy="230" r="204"  opacity="0.07" className="fill-snow"/>
          <circle
            cx="270"
            cy="230"
            r="204"
            fill="none"
            
            strokeOpacity="0.3"
            strokeDasharray="2 8"
            strokeLinecap="round" className="stroke-steel"/>
          <g fill="none"  strokeOpacity="0.22" strokeWidth="1.2" className="stroke-steel">
            <ellipse cx="270" cy="230" rx="204" ry="70" />
            <ellipse cx="270" cy="230" rx="204" ry="140" />
            <ellipse cx="270" cy="230" rx="70" ry="204" />
            <ellipse cx="270" cy="230" rx="140" ry="204" />
            <line x1="270" y1="26" x2="270" y2="434" />
            <line x1="66" y1="230" x2="474" y2="230" />
          </g>
        </motion.g>

        {/* confetti marks */}
        <g fill="none"  strokeOpacity="0.55" strokeWidth="1.6" className="stroke-steel">
          <circle cx="30" cy="150" r="4" />
          <circle cx="508" cy="250" r="4" />
          <circle cx="250" cy="446" r="3.5" />
          <path d="M486 360v12M480 366h12" />
          <path d="M24 250v12M18 256h12" />
          <path d="M330 30v12M324 36h12" />
        </g>

        {/* routes */}
        <motion.g
          initial={reduceMotion ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease }}
          fill="none"
          strokeLinecap="round"
        >
          <path className={`${ROUTE} stroke-snow`} d={SEA}  strokeOpacity="0.85" strokeWidth="3" />
          <path className={`${ROUTE} stroke-crimson`} d={AIR}  strokeWidth="3" />
          <path className={`${ROUTE} stroke-steel`} d={ROAD}  strokeWidth="3" />
          {/* rail: solid line with sleepers */}
          <path d={RAIL}  strokeWidth="9" strokeDasharray="2 6" strokeOpacity="0.7" strokeLinecap="butt" className="stroke-steel"/>
          <path d={RAIL}  strokeWidth="1.6" strokeOpacity="0.9" className="stroke-snow"/>
        </motion.g>

        {/* nodes */}
        {NODES.map(({ x, y, label, dx, anchor, cls }, i) => (
          <motion.g key={label} {...pop(0.7 + i * 0.12, 8)}>
            <circle className={`fill-crimson ${PING} ${cls}`} cx={x} cy={y} r="9" />
            <circle cx={x} cy={y} r="9"   strokeWidth="3" className="fill-navy stroke-white"/>
            <circle cx={x} cy={y} r="3.2" className="fill-crimson"/>
            <text
              x={x + dx}
              y={y + 4}
              textAnchor={anchor}
              fontSize="9"
              fontWeight="600"
              letterSpacing="1.6"
              
              opacity="0.8" className="fill-snow">
              {label}
            </text>
          </motion.g>
        ))}

        {/* ship, sailing the sea leg */}
        <motion.g {...pop(1.1, 0)}>
          <g>
            <g className={SHIP}>
              <path d="M-20 -2 L20 -2 L14 9 L-14 9 Z" className="fill-crimson"/>
              <rect x="-13" y="-10" width="26" height="8" rx="1.5" className="fill-snow"/>
              <rect x="-8" y="-17" width="10" height="7" rx="1.5" className="fill-steel"/>
              <rect x="3" y="-15" width="7" height="5" rx="1" className="fill-white"/>
            </g>
            {travel("9s", "0s", "0", SEA)}
          </g>
        </motion.g>

        {/* plane, flying the air leg */}
        <motion.g {...pop(1.2, 0)}>
          <g>
            <g transform="rotate(90) scale(0.95) translate(-12 -12)">
              <path
                d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5l8 2.5z" className="fill-white"/>
            </g>
            {travel("7s", "0s", "auto", AIR)}
          </g>
        </motion.g>

        {/* truck, driving the road leg */}
        <motion.g {...pop(1.3, 0)}>
          <g>
            <g transform="translate(-14 -10)">
              <rect width="18" height="14" rx="2" className="fill-snow"/>
              <path d="M18 4 h6 l4 5 v5 h-10 Z" className="fill-steel"/>
              <circle cx="7" cy="15" r="3.2"   strokeWidth="1.4" className="fill-ink stroke-white"/>
              <circle cx="23" cy="15" r="3.2"   strokeWidth="1.4" className="fill-ink stroke-white"/>
            </g>
            {travel("6s", "-2s", "0", ROAD)}
          </g>
        </motion.g>

        {/* train, running the rail leg */}
        <motion.g {...pop(1.25, 0)}>
          <g>
            <g transform="translate(-30 -8)">
              <rect x="0" y="2" width="12" height="10" rx="1.5" className="fill-steel"/>
              <rect x="14" y="2" width="12" height="10" rx="1.5" className="fill-snow"/>
              <path d="M28 4 h10 q4 0 5 4 v4 h-15 Z" className="fill-crimson"/>
              <rect x="33" y="6" width="5" height="3" rx="0.8" className="fill-white"/>
              <rect x="-1" y="12" width="45" height="2.5" rx="1" className="fill-ink"/>
              <g className="fill-white">
                <circle cx="6" cy="16" r="2" />
                <circle cx="20" cy="16" r="2" />
                <circle cx="32" cy="16" r="2" />
                <circle cx="39" cy="16" r="2" />
              </g>
            </g>
            {travel("8s", "-3s", "auto", RAIL)}
          </g>
        </motion.g>

        {/* tracking card */}
        <motion.g {...pop(0.9)}>
          <g className={FLOAT}>
            <g transform="translate(34 40)">
              <rect width="170" height="86" rx="14" className="fill-crimson"/>
              <path d="M30 84 L22 114 L58 84 Z" className="fill-crimson"/>
              <text x="20" y="28" fontSize="8" fontWeight="600" letterSpacing="1.8"  opacity="0.8" className="fill-snow">
                SHIPMENT STATUS
              </text>
              <text x="20" y="52" fontSize="19" fontWeight="700" className="fill-white font-serif">
                In transit
              </text>
              <rect x="20" y="64" width="130" height="6" rx="3"  opacity="0.3" className="fill-snow"/>
              <rect className={`${BAR} fill-white`} x="20" y="64" width="130" height="6" rx="3"  />
            </g>
          </g>
        </motion.g>
        {/* on-time notification */}
        <motion.g {...pop(1.2)}>
          <g className={FLOAT_B}>
            <g transform="translate(300 22)">
              <rect width="196" height="60" rx="14" className="fill-white"/>
              <circle cx="32" cy="30" r="16" className="fill-crimson"/>
              <path d="M24 30 l6 6 l11 -12" fill="none"  strokeWidth="3.4" strokeLinecap="round" strokeLinejoin="round" className="stroke-white"/>
              <text x="58" y="28" fontSize="17" fontWeight="700" className="fill-navy font-serif">
                On time
              </text>
              <text x="58" y="44" fontSize="8.5" fontWeight="600" letterSpacing="1.2" className="fill-steel">
                DELIVERY CONFIRMED
              </text>
            </g>
          </g>
        </motion.g>

        {/* best price tag */}
        <motion.g {...pop(1)}>
          <g className={FLOAT}>
            <g transform="translate(34 372)">
              <rect width="186" height="60" rx="14" className="fill-white"/>
              <circle cx="32" cy="30" r="16" className="fill-navy"/>
              <g transform="translate(20 18) scale(1)" fill="none"  strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" className="stroke-white">
                <path d="M12 2 H20 V10 L11 19 L3 11 Z" transform="translate(-1 3) scale(0.9)" />
                <circle cx="14.5" cy="9.5" r="1.4"  stroke="none" className="fill-white"/>
              </g>
              <text x="58" y="28" fontSize="17" fontWeight="700" className="fill-navy font-serif">
                Best price
              </text>
              <text x="58" y="44" fontSize="8.5" fontWeight="600" letterSpacing="1.2" className="fill-steel">
                COMPETITIVE RATES
              </text>
            </g>
          </g>
        </motion.g>
      </svg>
    </div>
  );
}
