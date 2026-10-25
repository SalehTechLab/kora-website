"use client";

import styled, { keyframes } from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import { colors } from "@/theme/themeConfig";
import { SERIF, ease } from "@/components/about/shared";

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-7px); }
`;
const sway = keyframes`
  0%, 100% { transform: rotate(-2.5deg); }
  50% { transform: rotate(2.5deg); }
`;
const bob = keyframes`
  0%, 100% { transform: translateY(0) rotate(0); }
  50% { transform: translateY(3px) rotate(-1deg); }
`;
const blink = keyframes`
  0%, 94%, 100% { transform: scaleY(1); }
  97% { transform: scaleY(0.1); }
`;
const type = keyframes`
  0% { transform: scaleX(0); }
  35%, 80% { transform: scaleX(1); }
  100% { transform: scaleX(1); opacity: 0.2; }
`;
const spin = keyframes`
  to { transform: rotate(360deg); }
`;
const steam = keyframes`
  0% { opacity: 0; transform: translateY(8px); }
  35% { opacity: 0.85; }
  100% { opacity: 0; transform: translateY(-12px); }
`;
const glow = keyframes`
  0%, 100% { opacity: 0.07; }
  50% { opacity: 0.13; }
`;

const Wrap = styled.div`
  position: relative;
  width: min(100%, 540px);
  aspect-ratio: 540 / 460;
  margin-left: auto;

  @media (max-width: 959px) {
    margin-inline: auto;
  }
`;

const Svg = styled.svg`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  overflow: visible;

  .fb {
    transform-box: fill-box;
  }
  .float {
    transform-box: fill-box;
    transform-origin: center;
    animation: ${float} 5s ease-in-out infinite;
  }
  .float.b {
    animation-duration: 6.2s;
    animation-delay: -2s;
  }
  .sway {
    transform-box: fill-box;
    transform-origin: 50% 100%;
    animation: ${sway} 4.5s ease-in-out infinite;
  }
  .bob {
    transform-box: fill-box;
    transform-origin: 50% 100%;
    animation: ${bob} 3.2s ease-in-out infinite;
  }
  .blink {
    transform-box: fill-box;
    transform-origin: center;
    animation: ${blink} 5s infinite;
  }
  .line {
    transform-box: fill-box;
    transform-origin: left center;
    animation: ${type} 4.8s ease-in-out infinite;
  }
  .line:nth-of-type(2) { animation-delay: 0.5s; }
  .line:nth-of-type(3) { animation-delay: 1s; }
  .line:nth-of-type(4) { animation-delay: 1.5s; }
  .spin {
    transform-box: fill-box;
    transform-origin: center;
    animation: ${spin} 18s linear infinite;
  }
  .steam {
    transform-box: fill-box;
    animation: ${steam} 3.2s ease-in-out infinite;
  }
  .steam.s2 {
    animation-delay: 1.1s;
  }
  .glow {
    animation: ${glow} 3.6s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .float,
    .sway,
    .bob,
    .blink,
    .line,
    .spin,
    .steam,
    .glow {
      animation: none;
    }
  }
`;

export default function SupportIllustration() {
  const reduceMotion = useReducedMotion();
  const pop = (delay: number, y = 18) => ({
    initial: reduceMotion ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.9, delay, ease },
  });

  return (
    <Wrap
      role="img"
      aria-label="A friendly Kora support agent with a headset, ready to help"
    >
      <Svg viewBox="0 0 540 460" aria-hidden="true">
        {/* backdrop */}
        <motion.g
          initial={reduceMotion ? false : { opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.1, ease }}
          style={{ transformBox: "fill-box", transformOrigin: "center" }}
        >
          <circle cx="270" cy="240" r="204" fill={colors.softWhite} opacity="0.07" />
          <circle
            cx="270"
            cy="240"
            r="204"
            fill="none"
            stroke={colors.steelGray}
            strokeOpacity="0.3"
            strokeDasharray="2 8"
            strokeLinecap="round"
          />
        </motion.g>

        {/* confetti marks */}
        <g fill="none" stroke={colors.steelGray} strokeOpacity="0.55" strokeWidth="1.6">
          <circle cx="34" cy="116" r="4" />
          <circle cx="500" cy="170" r="4" />
          <circle cx="245" cy="48" r="3.5" />
          <path d="M470 330v12M464 336h12" />
          <path d="M20 170v12M14 176h12" />
          <path d="M330 30v12M324 36h12" />
        </g>

        {/* lamp glow */}
        <polygon
          className="glow"
          points="424,290 468,270 536,392 372,392"
          fill={colors.softWhite}
        />

        {/* desk */}
        <rect x="24" y="390" width="492" height="16" rx="8" fill={colors.steelGray} />

        {/* agent */}
        <motion.g {...pop(0.5, 26)}>
          <g className="bob">
            {/* torso */}
            <path
              d="M146 392 C146 306 200 266 270 266 C340 266 394 306 394 392 Z"
              fill={colors.softWhite}
            />
            {/* rounded neckline with a collar rim */}
            <path
              d="M232 268 Q270 312 308 268"
              fill="none"
              stroke={colors.steelGray}
              strokeOpacity="0.55"
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <path d="M244 266 Q270 296 296 266 Z" fill={colors.steelGray} />
            {/* neck, tapering into the shoulders */}
            <path
              d="M254 214 C254 242 252 254 244 268 L296 268 C288 254 286 242 286 214 Z"
              fill={colors.steelGray}
            />
            {/* soft shadow under the chin */}
            <path
              d="M254 224 Q270 246 286 224 L286 214 L254 214 Z"
              fill={colors.darkSlate}
              opacity="0.2"
            />
            {/* ears */}
            <circle cx="229" cy="186" r="8" fill={colors.steelGray} />
            <circle cx="311" cy="186" r="8" fill={colors.steelGray} />
            {/* head */}
            <ellipse cx="270" cy="182" rx="41" ry="49" fill={colors.steelGray} />
            {/* hair */}
            <path
              d="M228 176 C222 128 250 116 274 116 C304 116 320 138 312 176 C302 152 268 146 228 176 Z"
              fill={colors.darkSlate}
            />
            {/* face */}
            <g fill={colors.darkSlate}>
              <circle className="blink" cx="255" cy="184" r="3.4" />
              <circle className="blink" cx="285" cy="184" r="3.4" />
            </g>
            <path
              d="M270 190 q-4 10 3 12"
              fill="none"
              stroke={colors.darkSlate}
              strokeOpacity="0.4"
              strokeWidth="2.2"
              strokeLinecap="round"
            />
            <path
              d="M254 208 Q270 224 286 208"
              fill="none"
              stroke={colors.darkSlate}
              strokeWidth="3.2"
              strokeLinecap="round"
            />
            {/* headset */}
            <path
              d="M227 180 C221 108 319 108 313 180"
              fill="none"
              stroke={colors.crimson}
              strokeWidth="7"
              strokeLinecap="round"
            />
            <rect x="213" y="168" width="21" height="36" rx="10" fill={colors.white} />
            <rect x="306" y="168" width="21" height="36" rx="10" fill={colors.white} />
            <path
              d="M316 202 C322 226 298 236 281 229"
              fill="none"
              stroke={colors.white}
              strokeWidth="3.5"
              strokeLinecap="round"
            />
            <circle cx="280" cy="229" r="5" fill={colors.crimson} />
          </g>

          {/* open laptop, seen from behind: upright lid, hinge, base, hands on the keys */}
          <rect x="190" y="298" width="160" height="82" rx="7" fill={colors.darkSlate} stroke={colors.steelGray} strokeOpacity="0.55" strokeWidth="2" />
          <rect x="190" y="298" width="160" height="7" rx="3.5" fill={colors.steelGray} opacity="0.35" />
          <polygon points="190,380 350,298 350,380" fill={colors.steelGray} opacity="0.12" />
          <ellipse cx="270" cy="342" rx="11" ry="8" fill={colors.white} />
          <rect x="176" y="378" width="188" height="6" rx="3" fill={colors.steelGray} />
          <polygon points="164,384 376,384 386,392 154,392" fill={colors.steelGray} opacity="0.75" />
          <ellipse cx="204" cy="378" rx="15" ry="8" fill={colors.steelGray} />
          <ellipse cx="336" cy="378" rx="15" ry="8" fill={colors.steelGray} />
        </motion.g>

        {/* speech bubble */}
        <motion.g {...pop(0.9)}>
          <g className="float">
            <g transform="translate(48 34)">
              <rect width="152" height="86" rx="14" fill={colors.crimson} />
              <path d="M34 84 L24 116 L64 84 Z" fill={colors.crimson} />
              <rect className="line" x="20" y="18" width="112" height="6" rx="3" fill={colors.softWhite} />
              <rect className="line" x="20" y="32" width="92" height="6" rx="3" fill={colors.softWhite} />
              <rect className="line" x="20" y="46" width="104" height="6" rx="3" fill={colors.softWhite} />
              <rect className="line" x="20" y="60" width="62" height="6" rx="3" fill={colors.softWhite} />
            </g>
          </g>
        </motion.g>

        {/* envelopes */}
        {[
          { x: 84, y: 158, r: -7, cls: "float" },
          { x: 142, y: 214, r: 6, cls: "float b" },
        ].map(({ x, y, r, cls }, i) => (
          <motion.g key={x} {...pop(1.1 + i * 0.15)}>
            <g className={cls}>
              <g transform={`translate(${x} ${y}) rotate(${r})`}>
                <rect width="46" height="32" rx="3" fill={colors.white} />
                <path
                  d="M2 2 L23 19 L44 2"
                  fill="none"
                  stroke={colors.steelGray}
                  strokeWidth="2"
                  strokeLinejoin="round"
                />
              </g>
            </g>
          </motion.g>
        ))}

        {/* 24 / 7 availability */}
        <motion.g {...pop(1.2)}>
          <g className="float b">
            <g transform="translate(412 92)">
              <circle r="42" fill={colors.deepNavy} />
              <circle
                className="spin"
                r="40"
                fill="none"
                stroke={colors.softWhite}
                strokeWidth="3"
                strokeDasharray="7 6"
                strokeLinecap="round"
              />
              <circle className="spin" cx="0" cy="-40" r="5.5" fill={colors.crimson} />
              <text
                y="8"
                textAnchor="middle"
                fontFamily={SERIF}
                fontSize="25"
                fontWeight="700"
                letterSpacing="-0.5"
                fill={colors.white}
              >
                24/7
              </text>
              <text
                y="24"
                textAnchor="middle"
                fontSize="7.5"
                fontWeight="600"
                letterSpacing="1.6"
                fill={colors.steelGray}
              >
                SUPPORT
              </text>
            </g>
          </g>
        </motion.g>

        {/* coffee */}
        <motion.g {...pop(1.1, 10)}>
          <g transform="translate(526 0) scale(-1 1)">
          <g fill="none" stroke={colors.white} strokeWidth="2.8" strokeLinecap="round">
            <path className="steam" d="M411 342 q-6 -9 0 -17 q6 -9 0 -17" />
            <path className="steam s2" d="M422 346 q-6 -9 0 -17 q6 -9 0 -17" />
          </g>
          <path
            d="M403 358 Q389 359 392 372 Q395 382 405 380"
            fill="none"
            stroke={colors.white}
            strokeWidth="4"
            strokeLinecap="round"
          />
          <ellipse cx="417" cy="392" rx="19" ry="3" fill={colors.darkSlate} opacity="0.3" />
            <path d="M402 352 L432 352 L429.5 388 Q429 392 425 392 L409 392 Q405 392 404.5 388 Z" fill={colors.white} />
          <ellipse cx="417" cy="352" rx="15" ry="4" fill={colors.softWhite} />
          <ellipse cx="417" cy="352.5" rx="12" ry="2.8" fill={colors.darkSlate} />
          </g>
        </motion.g>

        {/* lamp */}
        <motion.g {...pop(1)}>
          <rect x="436" y="384" width="66" height="9" rx="4.5" fill={colors.steelGray} />
          <path d="M458 384 Q470 376 482 384 Z" fill={colors.steelGray} />
          <path
            d="M470 382 L498 304 L476 232"
            fill="none"
            stroke={colors.steelGray}
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="498" cy="304" r="6" fill={colors.white} />
          {/* domed shade tilted down toward the desk */}
          <g transform="translate(461 256) rotate(30)">
            <path d="M-12 -24 Q0 -36 12 -24 L36 18 L-36 18 Z" fill={colors.crimson} />
            <path d="M-6 -24 Q-1 -30 4 -26 L-8 18 L-16 18 Z" fill={colors.softWhite} opacity="0.25" />
            <ellipse cx="0" cy="18" rx="36" ry="8" fill={colors.darkSlate} />
            <ellipse className="glow-bulb" cx="0" cy="19" rx="15" ry="5.5" fill={colors.white} />
            <rect x="-5" y="-31" width="10" height="9" rx="3" fill={colors.steelGray} />
          </g>
          <circle cx="476" cy="232" r="6" fill={colors.white} />
        </motion.g>

        {/* plant */}
        <motion.g {...pop(0.8)}>
          <g transform="translate(52 352)">
            <g className="sway">
              <path d="M0 0 L0 -78" stroke={colors.steelGray} strokeWidth="3" strokeLinecap="round" />
              <ellipse cx="-15" cy="-34" rx="10" ry="23" transform="rotate(-32 -15 -34)" fill={colors.steelGray} />
              <ellipse cx="16" cy="-48" rx="10" ry="23" transform="rotate(30 16 -48)" fill={colors.softWhite} opacity="0.55" />
              <ellipse cx="0" cy="-84" rx="12" ry="26" fill={colors.steelGray} />
              <path d="M0 -104 L0 -62" stroke={colors.deepNavy} strokeOpacity="0.4" strokeWidth="1.6" />
            </g>
            <path d="M-26 40 L-18 0 L18 0 L26 40 Z" fill={colors.softWhite} />
          </g>
        </motion.g>
      </Svg>
    </Wrap>
  );
}
