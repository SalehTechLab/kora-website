"use client";

import { motion, useReducedMotion } from "framer-motion";
import { ease } from "@/lib/motion";

const FLOAT =
  "[transform-box:fill-box] origin-center animate-float-sm motion-reduce:animate-none";
const FLOAT_B = `${FLOAT} [animation-duration:6.2s] [animation-delay:-2s]`;

export default function SupportIllustration() {
  const reduceMotion = useReducedMotion();
  const pop = (delay: number, y = 18) => ({
    initial: reduceMotion ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    // Staggered but quick, so the whole scene is in place within about a second
    transition: { duration: 0.5, delay: delay * 0.3, ease },
  });

  return (
    <div
      role="img"
      aria-label="A friendly Kora support agent with a headset, ready to help"
      className="relative mx-auto aspect-540/460 w-full max-w-135 lg:mr-0 lg:ml-auto"
    >
      <svg
        viewBox="0 0 540 460"
        aria-hidden="true"
        className="absolute inset-0 size-full overflow-visible"
      >
        {/* backdrop */}
        <motion.g
          initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, ease }}
          className="[transform-box:fill-box] origin-center"
        >
          <circle className="fill-snow" cx="270" cy="240" r="204" opacity="0.07" />
          <circle className="stroke-steel"
            cx="270"
            cy="240"
            r="204"
            fill="none"
            strokeOpacity="0.3"
            strokeDasharray="2 8"
            strokeLinecap="round"
          />
        </motion.g>

        {/* confetti marks */}
        <g className="stroke-steel" fill="none" strokeOpacity="0.55" strokeWidth="1.6">
          <circle cx="34" cy="116" r="4" />
          <circle cx="500" cy="170" r="4" />
          <circle cx="245" cy="48" r="3.5" />
          <path d="M470 330v12M464 336h12" />
          <path d="M20 170v12M14 176h12" />
          <path d="M330 30v12M324 36h12" />
        </g>

        {/* lamp glow */}
        <polygon
          className="animate-glow-pulse motion-reduce:animate-none fill-snow"
          points="424,290 468,270 536,392 372,392"
        />

        {/* desk */}
        <rect className="fill-steel" x="24" y="390" width="492" height="16" rx="8" />

        {/* agent */}
        <motion.g {...pop(0.5, 26)}>
          <g className="[transform-box:fill-box] origin-[50%_100%] animate-bob motion-reduce:animate-none">
            {/* torso */}
            <path className="fill-snow"
              d="M146 392 C146 306 200 266 270 266 C340 266 394 306 394 392 Z"
            />
            {/* rounded neckline with a collar rim */}
            <path className="stroke-steel"
              d="M232 268 Q270 312 308 268"
              fill="none"
              strokeOpacity="0.55"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path className="fill-steel" d="M244 266 Q270 296 296 266 Z" />
            {/* neck, tapering into the shoulders */}
            <path className="fill-steel"
              d="M254 214 C254 242 252 254 244 268 L296 268 C288 254 286 242 286 214 Z"
            />
            {/* soft shadow under the chin */}
            <path className="fill-ink"
              d="M254 224 Q270 246 286 224 L286 214 L254 214 Z"
              opacity="0.2"
            />
            {/* ears */}
            <circle className="fill-steel" cx="229" cy="186" r="8" />
            <circle className="fill-steel" cx="311" cy="186" r="8" />
            {/* head */}
            <ellipse className="fill-steel" cx="270" cy="182" rx="41" ry="49" />
            {/* hair */}
            <path className="fill-ink"
              d="M228 176 C222 128 250 116 274 116 C304 116 320 138 312 176 C302 152 268 146 228 176 Z"
            />
            {/* face */}
            <g className="fill-ink">
              <circle className="[transform-box:fill-box] origin-center animate-blink motion-reduce:animate-none" cx="255" cy="184" r="3.4" />
              <circle className="[transform-box:fill-box] origin-center animate-blink motion-reduce:animate-none" cx="285" cy="184" r="3.4" />
            </g>
            <path className="stroke-ink"
              d="M270 190 q-4 10 3 12"
              fill="none"
              strokeOpacity="0.4"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path className="stroke-ink"
              d="M254 208 Q270 224 286 208"
              fill="none"
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* headset */}
            <path className="stroke-crimson"
              d="M227 180 C221 108 319 108 313 180"
              fill="none"
              strokeWidth="7"
              strokeLinecap="round"
            />
            <rect className="fill-white" x="213" y="168" width="21" height="36" rx="10" />
            <rect className="fill-white" x="306" y="168" width="21" height="36" rx="10" />
            <path className="stroke-white"
              d="M316 202 C322 226 298 236 281 229"
              fill="none"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle className="fill-crimson" cx="280" cy="229" r="5" />
          </g>

          {/* open laptop, seen from behind: upright lid, hinge, base, hands on the keys */}
          <rect className="fill-ink stroke-steel" x="190" y="298" width="160" height="82" rx="7" strokeOpacity="0.55" strokeWidth="2" />
          <rect className="fill-steel" x="190" y="298" width="160" height="7" rx="3.5" opacity="0.35" />
          <polygon className="fill-steel" points="190,380 350,298 350,380" opacity="0.12" />
          <ellipse className="fill-white" cx="270" cy="342" rx="11" ry="8" />
          <rect className="fill-steel" x="176" y="378" width="188" height="6" rx="3" />
          <polygon className="fill-steel" points="164,384 376,384 386,392 154,392" opacity="0.75" />
          <ellipse className="fill-steel" cx="204" cy="378" rx="15" ry="8" />
          <ellipse className="fill-steel" cx="336" cy="378" rx="15" ry="8" />
        </motion.g>

        {/* speech bubble */}
        <motion.g {...pop(0.9)}>
          <g className={FLOAT}>
            <g transform="translate(48 34)">
              <rect className="fill-crimson" width="152" height="86" rx="14" />
              <path className="fill-crimson" d="M34 84 L24 116 L64 84 Z" />
              <rect className="[transform-box:fill-box] origin-left animate-type-line motion-reduce:animate-none [animation-delay:0.5s] fill-snow" x="20" y="18" width="112" height="6" rx="3" />
              <rect className="[transform-box:fill-box] origin-left animate-type-line motion-reduce:animate-none [animation-delay:1s] fill-snow" x="20" y="32" width="92" height="6" rx="3" />
              <rect className="[transform-box:fill-box] origin-left animate-type-line motion-reduce:animate-none [animation-delay:1.5s] fill-snow" x="20" y="46" width="104" height="6" rx="3" />
              <rect className="[transform-box:fill-box] origin-left animate-type-line motion-reduce:animate-none fill-snow" x="20" y="60" width="62" height="6" rx="3" />
            </g>
          </g>
        </motion.g>

        {/* envelopes */}
        {[
          { x: 84, y: 158, r: -7, cls: FLOAT },
          { x: 142, y: 214, r: 6, cls: FLOAT_B },
        ].map(({ x, y, r, cls }, i) => (
          <motion.g key={x} {...pop(1.1 + i * 0.15)}>
            <g className={cls}>
              <g transform={`translate(${x} ${y}) rotate(${r})`}>
                <rect className="fill-white" width="46" height="32" rx="3" />
                <path className="stroke-steel"
                  d="M2 2 L23 19 L44 2"
                  fill="none"
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          </motion.g>
        ))}

        {/* coffee */}
        <motion.g {...pop(1.1, 10)}>
          <g transform="translate(526 0) scale(-1 1)">
          <g className="stroke-white" fill="none" strokeWidth="2.8" strokeLinecap="round">
            <path className="[transform-box:fill-box] animate-steam motion-reduce:animate-none" d="M411 342 q-6 -9 0 -17 q6 -9 0 -17" />
            <path className="[transform-box:fill-box] animate-steam [animation-delay:1.1s] motion-reduce:animate-none" d="M422 346 q-6 -9 0 -17 q6 -9 0 -17" />
          </g>
          <path className="stroke-white"
            d="M403 358 Q389 359 392 372 Q395 382 405 380"
            fill="none"
            strokeWidth="4"
            strokeLinecap="round"
          />
          <ellipse className="fill-ink" cx="417" cy="392" rx="19" ry="3" opacity="0.3" />
            <path className="fill-white" d="M402 352 L432 352 L429.5 388 Q429 392 425 392 L409 392 Q405 392 404.5 388 Z" />
          <ellipse className="fill-snow" cx="417" cy="352" rx="15" ry="4" />
          <ellipse className="fill-ink" cx="417" cy="352.5" rx="12" ry="2.8" />
          </g>
        </motion.g>

        {/* lamp */}
        <motion.g {...pop(1)}>
          <rect className="fill-steel" x="436" y="384" width="66" height="9" rx="4.5" />
          <path className="fill-steel" d="M458 384 Q470 376 482 384 Z" />
          <path className="stroke-steel"
            d="M470 382 L498 304 L476 232"
            fill="none"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle className="fill-white" cx="498" cy="304" r="6" />
          {/* domed shade tilted down toward the desk */}
          <g transform="translate(461 256) rotate(30)">
            <path className="fill-crimson" d="M-12 -24 Q0 -36 12 -24 L36 18 L-36 18 Z" />
            <path className="fill-snow" d="M-6 -24 Q-1 -30 4 -26 L-8 18 L-16 18 Z" opacity="0.25" />
            <ellipse className="fill-ink" cx="0" cy="18" rx="36" ry="8" />
            <ellipse className="fill-white" cx="0" cy="19" rx="15" ry="5.5" />
            <rect className="fill-steel" x="-5" y="-31" width="10" height="9" rx="3" />
          </g>
          <circle className="fill-white" cx="476" cy="232" r="6" />
        </motion.g>

        {/* plant */}
        <motion.g {...pop(0.8)}>
          <g transform="translate(52 352)">
            <g className="[transform-box:fill-box] origin-[50%_100%] animate-sway motion-reduce:animate-none">
              <path className="stroke-steel" d="M0 0 L0 -78" strokeWidth="3" strokeLinecap="round" />
              <ellipse className="fill-steel" cx="-15" cy="-34" rx="10" ry="23" transform="rotate(-32 -15 -34)" />
              <ellipse className="fill-snow" cx="16" cy="-48" rx="10" ry="23" transform="rotate(30 16 -48)" opacity="0.55" />
              <ellipse className="fill-steel" cx="0" cy="-84" rx="12" ry="26" />
              <path className="stroke-navy" d="M0 -104 L0 -62" strokeOpacity="0.4" strokeWidth="1.6" />
            </g>
            <path className="fill-snow" d="M-26 40 L-18 0 L18 0 L26 40 Z" />
          </g>
        </motion.g>
      </svg>
    </div>
  );
}
