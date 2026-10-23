"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { colors } from "@/theme/themeConfig";

export type SceneProps = { progress: MotionValue<number> };

const W = 720;
const H = 440;

/* ---------- helpers ---------- */

type LoopProps = {
  animate: Record<string, number | number[]>;
  duration: number;
  ease?: "linear" | "easeInOut";
  yoyo?: boolean;
  children: ReactNode;
};

// Endless ambient motion; collapses to a still frame under reduced motion
function Loop({
  animate,
  duration,
  ease = "linear",
  yoyo = false,
  children,
}: LoopProps) {
  const reduce = useReducedMotion();
  return (
    <motion.g
      animate={reduce ? undefined : animate}
      transition={{
        duration,
        ease,
        repeat: Infinity,
        repeatType: yoyo ? "reverse" : "loop",
      }}
    >
      {children}
    </motion.g>
  );
}

// Sine-ish ribbon, 1440 wide so a -720 shift loops seamlessly
function wavePath(y: number, amp: number, period = 120) {
  let d = `M0 ${y}`;
  for (let x = 0; x < W * 2 + period; x += period) {
    d += ` q ${period / 4} ${-amp} ${period / 2} 0 t ${period / 2} 0`;
  }
  return `${d} V${H} H0 Z`;
}

function Frame({ id, children }: { id: string; children: ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid slice"
      width="100%"
      height="100%"
      role="presentation"
      aria-hidden
      data-scene={id}
    >
      {children}
    </svg>
  );
}

const Cloud = ({ x, y, s = 1, o = 0.85 }: { x: number; y: number; s?: number; o?: number }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`} fill="#fff" opacity={o}>
    <ellipse cx="0" cy="0" rx="62" ry="15" />
    <ellipse cx="28" cy="-11" rx="36" ry="16" />
    <ellipse cx="-30" cy="-7" rx="30" ry="12" />
  </g>
);

/* ---------- 01 · AIR ---------- */

export function AirScene({ progress }: SceneProps) {
  const planeX = useTransform(progress, [0, 1], [-120, 110]);
  const planeY = useTransform(progress, [0, 1], [34, -34]);
  const planeRot = useTransform(progress, [0, 1], [3, -5]);
  const farX = useTransform(progress, [0, 1], [0, -70]);
  const trail = useTransform(progress, [0, 0.5, 1], [0.55, 1, 1]);

  return (
    <Frame id="air">
      <defs>
        <linearGradient id="air-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0c2f5e" />
          <stop offset="0.55" stopColor="#3f86c9" />
          <stop offset="1" stopColor="#bfe0f5" />
        </linearGradient>
        <radialGradient id="air-sun" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#fff" stopOpacity="0.55" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
        <linearGradient id="air-trail" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="1" stopColor="#fff" stopOpacity="0.85" />
        </linearGradient>
        <linearGradient id="air-body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#c9d4e4" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#air-sky)" />
      <circle cx="570" cy="110" r="140" fill="url(#air-sun)" />

      {/* far clouds, slow parallax */}
      <motion.g style={{ x: farX }} opacity={0.55}>
        <Loop animate={{ x: [0, -720] }} duration={46}>
          {[0, 720].map((o) => (
            <g key={o}>
              <Cloud x={o + 90} y={290} s={0.9} />
              <Cloud x={o + 380} y={340} s={1.3} />
              <Cloud x={o + 620} y={270} s={0.7} />
            </g>
          ))}
        </Loop>
      </motion.g>

      {/* flight arc */}
      <path
        d="M30 340 Q360 90 700 210"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.4"
        strokeWidth="1.5"
        strokeDasharray="3 9"
      />
      <circle cx="30" cy="340" r="4" fill="#fff" opacity="0.8" />
      <circle cx="700" cy="210" r="4" fill={colors.crimson} />

      {/* speed streaks */}
      <Loop animate={{ x: [0, -720] }} duration={5}>
        {[0, 720].map((o) => (
          <g key={o} stroke="#fff" strokeLinecap="round" strokeOpacity="0.5" strokeWidth="2">
            <line x1={o + 80} y1="150" x2={o + 160} y2="150" />
            <line x1={o + 330} y1="95" x2={o + 440} y2="95" />
            <line x1={o + 520} y1="190" x2={o + 580} y2="190" />
            <line x1={o + 220} y1="260" x2={o + 330} y2="260" />
          </g>
        ))}
      </Loop>

      {/* plane */}
      <g transform="translate(360 205)">
        <motion.g style={{ x: planeX, y: planeY, rotate: planeRot }}>
          <Loop animate={{ y: [0, -7] }} duration={2.6} ease="easeInOut" yoyo>
            <motion.rect
              x={-560}
              y={-3}
              width={400}
              height={6}
              rx={3}
              fill="url(#air-trail)"
              style={{ opacity: trail }}
            />
            {/* far wing */}
            <path d="M-6,-8 L-52,-62 L-26,-62 L44,-10 Z" fill="#9fb2cc" />
            {/* tail fin */}
            <path d="M-138,-6 L-160,-72 L-122,-72 L-64,-24 Z" fill={colors.crimson} />
            <path d="M-126,4 L-166,16 L-150,22 L-100,12 Z" fill="#9fb2cc" />
            {/* fuselage */}
            <path
              d="M-142,2 C-142,-22 -70,-32 40,-30 C104,-28 148,-12 160,2 C148,14 104,22 40,22 C-70,24 -142,18 -142,2Z"
              fill="url(#air-body)"
            />
            <path d="M-142,8 C-142,16 -70,24 40,22 C104,22 148,14 160,2 L-142,2Z" fill="#aab9d0" opacity="0.55" />
            <path d="M104,-22 C128,-20 146,-10 152,-2 L100,-2 Z" fill="#17314f" />
            <rect x={-120} y={2} width={250} height={5} fill={colors.crimson} opacity="0.9" />
            {Array.from({ length: 13 }).map((_, i) => (
              <circle key={i} cx={-84 + i * 14} cy={-12} r={3.2} fill="#17314f" />
            ))}
            {/* near wing + engine */}
            <path d="M8,6 L-62,78 L-30,78 L62,10 Z" fill="#dfe7f2" />
            <path d="M8,6 L-62,78 L-52,78 L20,8 Z" fill="#b7c5da" />
            <rect x={-26} y={44} width={44} height={17} rx={8} fill="#8fa3bf" />
            <rect x={-26} y={44} width={12} height={17} rx={6} fill="#5f7798" />
          </Loop>
        </motion.g>
      </g>
      <Loop animate={{ x: [0, -720] }} duration={22}>
        {[0, 720].map((o) => (
          <g key={o}>
            <Cloud x={o + 200} y={410} s={1.6} o={0.95} />
            <Cloud x={o + 560} y={425} s={1.9} o={0.95} />
          </g>
        ))}
      </Loop>
    </Frame>
  );
}

/* ---------- 02 · SEA ---------- */

const CONTAINER_COLORS = [colors.crimson, "#e9eef6", "#3d7cc9", "#f0b44c", "#2a9d8f"];
const STACKS = [3, 4, 4, 3, 4, 2, 3];

export function SeaScene({ progress }: SceneProps) {
  const shipX = useTransform(progress, [0, 1], [-70, 70]);
  const sunY = useTransform(progress, [0, 1], [20, -10]);
  const wakeW = useTransform(progress, [0, 1], [0.7, 1.15]);

  return (
    <Frame id="sea">
      <defs>
        <linearGradient id="sea-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a1c3a" />
          <stop offset="0.6" stopColor="#2c4f86" />
          <stop offset="1" stopColor="#f0a07a" />
        </linearGradient>
        <linearGradient id="sea-water" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#23608f" />
          <stop offset="1" stopColor="#081d3d" />
        </linearGradient>
        <radialGradient id="sea-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#ffd2a8" stopOpacity="0.8" />
          <stop offset="1" stopColor="#ffd2a8" stopOpacity="0" />
        </radialGradient>
      </defs>
      <rect width={W} height={H} fill="url(#sea-sky)" />
      <motion.g style={{ y: sunY }}>
        <circle cx="520" cy="262" r="150" fill="url(#sea-glow)" />
        <circle cx="520" cy="262" r="56" fill="#ffc79a" />
      </motion.g>
      <rect y="262" width={W} height={H - 262} fill="url(#sea-water)" />
      {/* sun glitter */}
      <Loop animate={{ opacity: [0.25, 0.8] }} duration={1.6} ease="easeInOut" yoyo>
        <g stroke="#ffd9b8" strokeLinecap="round" strokeWidth="2">
          <line x1="490" y1="280" x2="550" y2="280" />
          <line x1="470" y1="298" x2="565" y2="298" />
          <line x1="500" y1="318" x2="545" y2="318" />
          <line x1="455" y1="340" x2="580" y2="340" />
        </g>
      </Loop>

      <Loop animate={{ x: [0, -720] }} duration={26}>
        <path d={wavePath(276, 5)} fill="#2b6d9c" opacity="0.7" />
      </Loop>

      {/* ship */}
      <g transform="translate(360 312)">
        <motion.g style={{ x: shipX }}>
          <Loop animate={{ y: [0, -5], rotate: [-1.1, 1.1] }} duration={3.2} ease="easeInOut" yoyo>
            {/* containers */}
            {STACKS.map((n, i) =>
              Array.from({ length: n }).map((_, j) => (
                <g key={`${i}-${j}`}>
                  <rect
                    x={-176 + i * 36}
                    y={-10 - (j + 1) * 21}
                    width={34}
                    height={20}
                    rx={1.5}
                    fill={CONTAINER_COLORS[(i * 3 + j * 2) % 5]}
                  />
                  <path
                    d={`M${-170 + i * 36} ${-10 - (j + 1) * 21 + 4} v12 M${-162 + i * 36} ${-10 - (j + 1) * 21 + 4} v12 M${-154 + i * 36} ${-10 - (j + 1) * 21 + 4} v12`}
                    stroke="#000"
                    strokeOpacity="0.2"
                    strokeWidth="1.5"
                  />
                </g>
              )),
            )}
            {/* bridge */}
            <rect x={94} y={-72} width={64} height={62} fill="#e9eef6" />
            <rect x={90} y={-82} width={72} height={12} fill="#cdd7e6" />
            <rect x={100} y={-62} width={52} height={7} fill="#17314f" />
            <rect x={100} y={-46} width={52} height={7} fill="#17314f" />
            <rect x={118} y={-104} width={16} height={22} fill={colors.crimson} />
            {/* hull */}
            <path d="M-206,-10 L206,-10 L178,46 L-190,46 Z" fill="#161c2c" />
            <path d="M-200,6 L196,6 L190,18 L-194,18 Z" fill={colors.crimson} />
            <path d="M-206,-10 L206,-10 L202,-4 L-206,-4Z" fill="#2a3350" />
          </Loop>
        </motion.g>
      </g>

      {/* bow wake */}
      <motion.g style={{ scaleX: wakeW, originX: "50%" }}>
        <Loop animate={{ opacity: [0.5, 0.9] }} duration={1.4} ease="easeInOut" yoyo>
          <path d="M130 356 Q250 346 360 356 T600 358" fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="3" strokeLinecap="round" />
        </Loop>
      </motion.g>

      <Loop animate={{ x: [-720, 0] }} duration={13}>
        <path d={wavePath(366, 9)} fill="#0e3f6c" />
      </Loop>
      <Loop animate={{ x: [0, -720] }} duration={9}>
        <path d={wavePath(402, 12)} fill="#082a52" />
      </Loop>
    </Frame>
  );
}

/* ---------- 03 · ROAD ---------- */

function Wheel({ x, y }: { x: number; y: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <circle r="21" fill="#0b0d14" />
      <Loop animate={{ rotate: [0, 360] }} duration={0.7}>
        <circle r="12" fill="#aab4c6" />
        <path d="M-12 0H12 M0 -12V12 M-8.5 -8.5L8.5 8.5 M8.5 -8.5L-8.5 8.5" stroke="#566176" strokeWidth="2" />
        <circle r="3.5" fill="#566176" />
      </Loop>
    </g>
  );
}

export function RoadScene({ progress }: SceneProps) {
  const farX = useTransform(progress, [0, 1], [0, -80]);
  const nearX = useTransform(progress, [0, 1], [0, -190]);
  const truckX = useTransform(progress, [0, 1], [-50, 40]);

  return (
    <Frame id="road">
      <defs>
        <linearGradient id="road-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0f1c3d" />
          <stop offset="0.55" stopColor="#6b3d6e" />
          <stop offset="1" stopColor="#f58b5f" />
        </linearGradient>
        <linearGradient id="road-beam" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ffe9a8" stopOpacity="0.55" />
          <stop offset="1" stopColor="#ffe9a8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#road-sky)" />
      <circle cx="170" cy="250" r="62" fill="#ffb98a" opacity="0.95" />

      <motion.path
        style={{ x: farX }}
        d="M-60 300 L40 236 L120 280 L230 206 L330 276 L430 222 L540 284 L650 232 L760 290 L860 250 V340 H-60Z"
        fill="#3b2c5e"
      />
      <motion.path
        style={{ x: nearX }}
        d="M-60 330 Q60 262 190 318 T440 304 T700 322 T960 300 V360 H-60Z"
        fill="#1f1a3f"
      />

      {/* road */}
      <rect y="330" width={W} height={H - 330} fill="#12141d" />
      <rect y="330" width={W} height="4" fill="#2a2f40" />
      <Loop animate={{ x: [0, -120] }} duration={0.9}>
        <line x1="0" y1="392" x2="900" y2="392" stroke="#f0b44c" strokeWidth="4" strokeDasharray="60 60" />
      </Loop>
      {/* roadside poles */}
      <Loop animate={{ x: [0, -240] }} duration={2.4}>
        {Array.from({ length: 5 }).map((_, i) => (
          <g key={i} transform={`translate(${60 + i * 240} 0)`}>
            <rect x="-2" y="232" width="4" height="98" fill="#0b0d16" />
            <rect x="-14" y="236" width="28" height="3" fill="#0b0d16" />
          </g>
        ))}
        <path d="M60 238 Q180 262 300 238 T540 238 T780 238 T1020 238" fill="none" stroke="#0b0d16" strokeWidth="1.5" />
      </Loop>

      {/* truck */}
      <g transform="translate(350 348)">
        <motion.g style={{ x: truckX }}>
          <Loop animate={{ y: [0, -2] }} duration={0.22} ease="easeInOut" yoyo>
            <polygon points="170,-30 520,-6 520,18 170,-6" fill="url(#road-beam)" />
            <rect x={-212} y={-122} width={282} height={104} rx={4} fill="#e9eef6" />
            <rect x={-212} y={-40} width={282} height={12} fill={colors.crimson} />
            <image
              href="/images/logo/kora-logo-1.svg"
              x={-141}
              y={-112}
              width={140}
              height={62}
              preserveAspectRatio="xMidYMid meet"
            />
            <rect x={-218} y={-18} width={400} height={12} fill="#0b0d14" />
            <path d="M76,-18 L76,-108 L136,-108 L172,-62 L178,-18 Z" fill={colors.crimson} />
            <path d="M104,-96 L134,-96 L158,-64 L104,-64 Z" fill="#9ec6ea" />
            <rect x={170} y={-30} width={10} height={8} rx={2} fill="#ffe9a8" />
            <rect x={150} y={-130} width={6} height={26} fill="#0b0d14" />
            <Wheel x={-160} y={-2} />
            <Wheel x={-112} y={-2} />
            <Wheel x={96} y={-2} />
            <Wheel x={146} y={-2} />
          </Loop>
          {/* exhaust */}
          <Loop animate={{ y: [0, -50], x: [0, -40], opacity: [0.6, 0], scale: [0.6, 1.6] }} duration={1.6}>
            <circle cx={153} cy={-136} r={7} fill="#cfd6e4" />
          </Loop>
        </motion.g>
      </g>
    </Frame>
  );
}

/* ---------- 04 · RAIL ---------- */

export function RailScene({ progress }: SceneProps) {
  const trainX = useTransform(progress, [0, 1], [440, 530]);
  const farX = useTransform(progress, [0, 1], [0, -70]);

  return (
    <Frame id="rail">
      <defs>
        <linearGradient id="rail-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#0a1c3a" />
          <stop offset="0.6" stopColor="#3b6a9e" />
          <stop offset="1" stopColor="#f5cba0" />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill="url(#rail-sky)" />
      <motion.g style={{ x: farX }}>
        <path d="M-80 310 L40 190 L120 250 L220 150 L340 270 L430 200 L560 290 L660 180 L800 300 V340 H-80Z" fill="#2f4d7c" />
        <path d="M220 150 L194 182 L214 176 L226 190 L240 172 Z M660 180 L636 210 L654 204 L668 218 L684 200 Z M40 190 L20 214 L40 208 L54 220 Z" fill="#e9eef6" opacity="0.9" />
      </motion.g>
      <path d="M0 330 Q120 292 260 322 T520 316 T760 326 V360 H0Z" fill="#1a2b4a" />

      {/* ground + track */}
      <rect y="330" width={W} height={H - 330} fill="#161b28" />
      <Loop animate={{ x: [0, -60] }} duration={0.7}>
        {Array.from({ length: 14 }).map((_, i) => (
          <rect key={i} x={i * 60} y={368} width={30} height={9} fill="#2b3245" />
        ))}
      </Loop>
      <rect y="364" width={W} height="5" fill="#7a869d" />

      {/* overhead line */}
      <Loop animate={{ x: [0, -240] }} duration={2.6}>
        {Array.from({ length: 5 }).map((_, i) => (
          <g key={i} transform={`translate(${40 + i * 240} 0)`}>
            <rect x="-3" y="150" width="6" height="180" fill="#0b1325" />
            <rect x="-20" y="150" width="40" height="4" fill="#0b1325" />
          </g>
        ))}
      </Loop>
      <line x1="0" y1="153" x2={W} y2="153" stroke="#0b1325" strokeWidth="1.5" />

      {/* train */}
      <g transform="translate(0 364)">
        <motion.g style={{ x: trainX }}>
          <g transform="scale(0.8)">
            <Loop animate={{ y: [0, -1.2] }} duration={0.18} ease="easeInOut" yoyo>
              {/* pantograph */}
              <path d="M70 -86 L96 -150 L122 -86 M96 -150 H138" stroke="#0b1325" strokeWidth="3" fill="none" />
              {/* locomotive */}
              <path d="M0,-18 L0,-88 L150,-88 L202,-60 L202,-18 Z" fill={colors.crimson} />
              <rect x={0} y={-52} width={202} height={10} fill="#fff" opacity="0.9" />
              <path d="M138,-82 L172,-82 L194,-62 L138,-62 Z" fill="#9ec6ea" />
              <rect x={14} y={-76} width={50} height={14} rx={2} fill="#17314f" />
              <rect x={196} y={-34} width={8} height={7} fill="#ffe9a8" />
              <rect x={-4} y={-18} width={210} height={10} fill="#0b1325" />
              {/* wagons */}
              {[0, 1, 2].map((k) => {
                const x0 = -180 * (k + 1);
                return (
                  <g key={k}>
                    <rect x={x0} y={-34} width={170} height={12} fill="#0b1325" />
                    {[0, 1].map((c) => (
                      <g key={c}>
                        <rect
                          x={x0 + 4 + c * 83}
                          y={-82}
                          width={79}
                          height={48}
                          rx={2}
                          fill={CONTAINER_COLORS[(k * 2 + c * 3) % 5]}
                        />
                        <path
                          d={`M${x0 + 16 + c * 83} -76 v36 M${x0 + 30 + c * 83} -76 v36 M${x0 + 44 + c * 83} -76 v36 M${x0 + 58 + c * 83} -76 v36`}
                          stroke="#000"
                          strokeOpacity="0.18"
                          strokeWidth="2"
                        />
                      </g>
                    ))}
                    <rect x={x0 + 170} y={-30} width={10} height={4} fill="#0b1325" />
                  </g>
                );
              })}
              {/* bogies */}
              {[26, 72, 130, 176].map((cx) => (
                <RailWheel key={`l${cx}`} x={cx} />
              ))}
              {[0, 1, 2].flatMap((k) =>
                [28, 142].map((dx) => <RailWheel key={`w${k}-${dx}`} x={-180 * (k + 1) + dx} />),
              )}
            </Loop>
          </g>
        </motion.g>
      </g>
    </Frame>
  );
}

function RailWheel({ x }: { x: number }) {
  return (
    <g transform={`translate(${x} -13)`}>
      <circle r="14" fill="#0b0d14" />
      <Loop animate={{ rotate: [0, 360] }} duration={0.9}>
        <circle r="8" fill="#aab4c6" />
        <path d="M-8 0H8 M0 -8V8" stroke="#566176" strokeWidth="2" />
      </Loop>
    </g>
  );
}

/* ---------- 05 · CUSTOMS ---------- */

const CHECKS = [
  "Commercial invoice",
  "Packing list",
  "Export declaration",
  "Duties calculated",
];

function CheckRow({
  i,
  progress,
}: {
  i: number;
  progress: MotionValue<number>;
}) {
  const draw = useTransform(progress, [0.04 + i * 0.09, 0.13 + i * 0.09], [0, 1]);
  const y = 112 + i * 44;
  return (
    <g>
      <rect x={-112} y={y - 12} width={22} height={22} rx={5} fill="none" stroke="#9aa7bd" strokeWidth="2" />
      <motion.path
        d={`M${-107} ${y} l5 6 l11 -13`}
        fill="none"
        stroke={colors.crimson}
        strokeWidth={3.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ pathLength: draw }}
      />
      <text x={-76} y={y + 6} fontFamily="Inter, Arial, sans-serif" fontSize={15} fontWeight={600} fill={colors.deepNavy}>
        {CHECKS[i]}
      </text>
      <rect x={-76} y={y + 14} width={90 + (i % 2) * 40} height={4} rx={2} fill="#d0d7e2" />
    </g>
  );
}

function Chip({
  x,
  y,
  label,
  delay,
  align = "start",
}: {
  x: number;
  y: number;
  label: string;
  delay: number;
  align?: "start" | "end";
}) {
  const reduce = useReducedMotion();
  const textRef = useRef<SVGTextElement>(null);
  const [textW, setTextW] = useState(label.length * 9.6);

  // Size the pill to the real text width so padding stays even
  useLayoutEffect(() => {
    const measure = () => {
      if (textRef.current) setTextW(textRef.current.getComputedTextLength());
    };
    measure();
    document.fonts?.ready.then(measure);
  }, [label]);

  const width = 28 + textW + 14;
  return (
    <g transform={`translate(${align === "end" ? x - width : x} ${y})`}>
      <motion.g
        animate={reduce ? undefined : { y: [0, -9] }}
        transition={{ duration: 2.4, delay, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
      >
        <rect x={0} y={-15} width={width} height={30} rx={15} fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.35)" />
        <circle cx={15} cy={0} r={3.5} fill={colors.crimson} />
        <text ref={textRef} x={28} y={4.8} fontFamily="Inter, Arial, sans-serif" fontSize={13} fontWeight={600} letterSpacing={1} fill="#fff">
          {label}
        </text>
      </motion.g>
    </g>
  );
}

const MARK_STEM = "M0 0H170.67V714.67H0Z";
const MARK_SWOOSH =
  "m517.73 215.39l119.09-82.06 2.6-1.82-187.28-129.19v46.1c-59.38 5.1-114.09 26.9-159.28 60.71-45.18 33.81-80.84 79.57-102.41 132.58-9.76 23.84-16.59 49.25-19.98 75.73q-2.73 20.11-2.73 40.85c0 13.74 0.91 27.35 2.73 40.75 3.39 26.32 10.22 51.89 19.98 75.94 36.21 89.34 113.06 159.36 210.92 184.68 9.31 2.4 18.95 4.31 28.72 6.01 16.01 2.48 32.23 3.73 48.37 3.73h0.45c20.2-0.12 40.18-2.04 59.59-5.8v-177.95c-18.5 8.86-38.82 13.41-60.04 13.5-5.01 0-9.53-0.24-14.32-0.79-1.48-0.12-2.94-0.25-4.88-0.58-0.79 0-1.58-0.24-2.94-0.45-5.91-0.91-11.92-2.28-18.62-4.22-5.22-1.49-10.55-3.52-15.89-5.91-51.52-22.35-84.91-73.21-84.91-129.64 0-69.11 49.7-126.67 115.2-139.04v42.03z";

export function CustomsScene({ progress }: SceneProps) {
  const backX = useTransform(progress, [0, 1], [-24, 24]);
  const reduce = useReducedMotion();
  // reduced motion renders the finished stamp instead of a mid-slam frame
  const sp = useTransform(progress, (v) => (reduce ? 1 : v));
  const stampScale = useTransform(sp, [0.42, 0.52, 0.58], [2.6, 0.9, 1]);
  const stampOpacity = useTransform(sp, [0.42, 0.5], [0, 1]);
  const stampRot = useTransform(sp, [0.42, 0.58], [-34, -14]);
  const markScale = useTransform(sp, [0.52, 0.62, 0.68], [0, 1.12, 1]);
  const markOpacity = useTransform(sp, [0.52, 0.58], [0, 1]);
  const ringDraw = useTransform(sp, [0.5, 0.64], [0, 1]);
  const textOpacity = useTransform(sp, [0.58, 0.66], [0, 1]);
  const shockScale = useTransform(sp, [0.52, 0.7], [0.9, 1.9]);
  const shockOpacity = useTransform(sp, [0.52, 0.56, 0.7], [0, 0.55, 0]);
  const impactX = useTransform(sp, [0.5, 0.52, 0.54, 0.56, 0.58], [0, -3, 3, -1.5, 0]);
  const scan = useTransform(progress, [0, 1], [90, 330]);

  return (
    <Frame id="customs">
      <defs>
        <linearGradient id="cus-bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#0b1d38" />
          <stop offset="1" stopColor="#1b3c70" />
        </linearGradient>
        <pattern id="cus-grid" width="36" height="36" patternUnits="userSpaceOnUse">
          <path d="M36 0H0V36" fill="none" stroke="#fff" strokeOpacity="0.06" />
        </pattern>
      </defs>
      <rect width={W} height={H} fill="url(#cus-bg)" />
      <rect width={W} height={H} fill="url(#cus-grid)" />

      <motion.g style={{ x: backX }}>
        <g transform="translate(300 224) rotate(-9)">
          <rect x={-120} y={-170} width={240} height={330} rx={14} fill="#c5d0e2" opacity="0.5" />
        </g>
        <g transform="translate(420 218) rotate(8)">
          <rect x={-120} y={-170} width={240} height={330} rx={14} fill="#dfe6f1" opacity="0.65" />
        </g>
      </motion.g>

      {/* main declaration */}
      <g transform="translate(360 40)">
        <rect x={-150} y={0} width={300} height={360} rx={16} fill="#f7f9fc" />
        <rect x={-150} y={0} width={300} height={56} rx={16} fill={colors.deepNavy} />
        <rect x={-150} y={36} width={300} height={20} fill={colors.deepNavy} />
        <text x={-124} y={34} fontFamily="Inter, Arial, sans-serif" fontSize={16} fontWeight={700} letterSpacing={2} fill="#fff">
          CUSTOMS DECLARATION
        </text>
        {CHECKS.map((_, i) => (
          <CheckRow key={i} i={i} progress={progress} />
        ))}
        {/* barcode */}
        <g fill={colors.darkSlate}>
          {Array.from({ length: 34 }).map((_, i) => (
            <rect key={i} x={-124 + i * 4.4} y={300} width={i % 3 === 0 ? 3 : 1.6} height={34} />
          ))}
        </g>
        {/* scan line */}
        <motion.rect
          x={-150}
          width={300}
          height={3}
          fill={colors.crimson}
          opacity={0.55}
          style={{ y: scan }}
        />
        {/* stamp */}
        <g transform="translate(96 282)">
          {/* ink shockwave on impact */}
          <motion.circle
            r="62"
            fill="none"
            stroke={colors.crimson}
            strokeWidth="2"
            style={{ scale: shockScale, opacity: shockOpacity }}
          />
          <motion.g style={{ x: impactX }}>
            <motion.g style={{ scale: stampScale, opacity: stampOpacity, rotate: stampRot }}>
              <defs>
                <path id="stamp-top" d="M -39 0 A 39 39 0 0 1 39 0" />
                <path id="stamp-bottom" d="M -46 0 A 46 46 0 0 0 46 0" />
              </defs>
              <circle r="62" fill="rgba(247,249,252,0.82)" />
              <motion.circle
                r="60"
                fill="none"
                stroke={colors.crimson}
                strokeWidth="4"
                style={{ pathLength: ringDraw, rotate: -90 }}
              />
              <circle r="52" fill="none" stroke={colors.crimson} strokeWidth="1.5" />
              <circle r="34" fill="none" stroke={colors.crimson} strokeWidth="1.5" />

              <motion.g style={{ opacity: textOpacity }} fill={colors.crimson} fontFamily="Inter, Arial, sans-serif" fontWeight={800}>
                <text fontSize={11} letterSpacing={3.5} textAnchor="middle">
                  <textPath href="#stamp-top" startOffset="50%">
                    CLEARED
                  </textPath>
                </text>
                <text fontSize={8} letterSpacing={2.4} textAnchor="middle">
                  <textPath href="#stamp-bottom" startOffset="50%">
                    KORA TRADERS
                  </textPath>
                </text>
                <circle cx={-43} cy={0} r={1.8} />
                <circle cx={43} cy={0} r={1.8} />
              </motion.g>

              {/* Kora mark */}
              <motion.g style={{ scale: markScale, opacity: markOpacity }}>
                <g transform="translate(-16 -17.85) scale(0.05)" fill={colors.crimson}>
                  <path d={MARK_STEM} />
                  <path d={MARK_SWOOSH} />
                </g>
              </motion.g>
            </motion.g>
          </motion.g>
        </g>
      </g>

      <Chip x={32} y={104} label="HS CODE" delay={0} />
      <Chip x={W - 32} y={96} label="INCOTERMS" delay={0.6} align="end" />
      <Chip x={32} y={330} label="EORI" delay={1.1} />
      <Chip x={W - 32} y={344} label="DUTIES" delay={1.6} align="end" />
    </Frame>
  );
}
