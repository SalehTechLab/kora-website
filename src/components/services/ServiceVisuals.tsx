"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { CheckOutlined } from "@ant-design/icons";
import { colors } from "@/theme/themeConfig";
import type { ServiceKey } from "./servicesData";
import styles from "./ServiceVisuals.module.css";

const ease = [0.22, 1, 0.36, 1] as const;
const SANS = "var(--font-inter), Arial, sans-serif";
const SERIF = "var(--font-serif), Georgia, serif";

type VisualProps = { play: boolean };

// Fades and lifts in when `play` flips on; snaps back when it flips off so it can replay
function Reveal({
  play,
  delay = 0,
  children,
  y = 10,
}: {
  play: boolean;
  delay?: number;
  children: ReactNode;
  y?: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, y }}
      animate={play ? { opacity: 1, y: 0 } : { opacity: 0, y }}
      transition={play ? { delay, duration: 0.55, ease } : { duration: 0.15 }}
    >
      {children}
    </motion.g>
  );
}

function Tag({
  x,
  y,
  w,
  text,
  tone = "light",
}: {
  x: number;
  y: number;
  w: number;
  text: string;
  tone?: "light" | "crimson";
}) {
  const crimson = tone === "crimson";
  return (
    <g transform={`translate(${x} ${y})`}>
      <rect
        width={w}
        height={26}
        rx={13}
        fill={crimson ? colors.crimson : "rgba(244,246,249,0.1)"}
        stroke={crimson ? colors.crimson : "rgba(140,155,176,0.5)"}
      />
      <text
        x={w / 2}
        y={17}
        textAnchor="middle"
        fontSize={11}
        fontWeight={600}
        letterSpacing={0.6}
        fontFamily={SANS}
        fill={colors.white}
      >
        {text.toUpperCase()}
      </text>
    </g>
  );
}

/* ---------- 01 Sourcing: a brief pings the network, the best match lights up ---------- */

const NODES = [
  { x: 92, y: 84 },
  { x: 168, y: 300 },
  { x: 424, y: 40 },
  { x: 432, y: 218 },
  { x: 118, y: 196 },
  { x: 296, y: 316 },
  { x: 214, y: 70 },
  { x: 52, y: 276 },
  { x: 440, y: 300 },
];
const SHORTLIST = [
  { x: 118, y: 196 },
  { x: 296, y: 316 },
];
const BEST = { x: 352, y: 112 };

function SourcingVisual({ play }: VisualProps) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="A brief pings a network of suppliers and the best match lights up">
      {[56, 108, 160].map((r) => (
        <circle key={r} cx={240} cy={180} r={r} fill="none" stroke="rgba(140,155,176,0.22)" strokeDasharray="2 6" />
      ))}

      {play && (
        <motion.circle
          cx={240}
          cy={180}
          fill="none"
          stroke={colors.white}
          strokeWidth={1.5}
          initial={{ r: 12, opacity: 0.7 }}
          animate={{ r: 190, opacity: 0 }}
          transition={{ duration: 2.4, ease: "easeOut", repeat: Infinity }}
        />
      )}

      {NODES.map((n, i) => (
        <Reveal key={i} play={play} delay={0.25 + i * 0.07} y={0}>
          <circle cx={n.x} cy={n.y} r={4} fill={colors.steelGray} />
        </Reveal>
      ))}

      {SHORTLIST.map((n, i) => (
        <g key={i}>
          <motion.line
            x1={240}
            y1={180}
            x2={n.x}
            y2={n.y}
            stroke={colors.steelGray}
            strokeWidth={1.2}
            strokeDasharray="4 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: play ? 1 : 0 }}
            transition={play ? { delay: 1.1 + i * 0.2, duration: 0.7, ease } : { duration: 0.1 }}
          />
          <Reveal play={play} delay={1.3 + i * 0.2} y={0}>
            <circle cx={n.x} cy={n.y} r={9} fill="none" stroke={colors.white} strokeWidth={1.5} />
            <circle cx={n.x} cy={n.y} r={4} fill={colors.white} />
          </Reveal>
        </g>
      ))}

      <motion.line
        x1={240}
        y1={180}
        x2={BEST.x}
        y2={BEST.y}
        stroke={colors.crimson}
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: play ? 1 : 0 }}
        transition={play ? { delay: 1.8, duration: 0.8, ease } : { duration: 0.1 }}
      />
      <Reveal play={play} delay={2.2} y={0}>
        <circle cx={BEST.x} cy={BEST.y} r={15} fill="rgba(181,30,50,0.25)" />
        <circle cx={BEST.x} cy={BEST.y} r={8} fill={colors.crimson} />
      </Reveal>
      <Reveal play={play} delay={2.4}>
        <Tag x={BEST.x - 44} y={BEST.y - 50} w={88} text="Best match" tone="crimson" />
      </Reveal>
      <Reveal play={play} delay={2}>
        <Tag x={64} y={218} w={78} text="Shortlist" />
      </Reveal>

      <circle cx={240} cy={180} r={11} fill={colors.white} />
      <circle cx={240} cy={180} r={4} fill={colors.deepNavy} />
      <text x={240} y={216} textAnchor="middle" fontSize={12} fontWeight={600} letterSpacing={1} fontFamily={SANS} fill={colors.softWhite}>
        YOUR BRIEF
      </text>
    </svg>
  );
}

/* ---------- 02 Procurement: first offers shrink to an agreed price ---------- */

const OFFERS = [
  { label: "Supplier A", first: 300, final: 214, y: 96 },
  { label: "Supplier B", first: 262, final: 176, y: 154, best: true },
  { label: "Supplier C", first: 316, final: 226, y: 212 },
];
const BAR_X = 128;

function ProcurementVisual({ play }: VisualProps) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Three supplier offers are negotiated down to an agreed price">
      <text x={40} y={52} fontSize={12} fontWeight={600} letterSpacing={1.2} fontFamily={SANS} fill={colors.steelGray}>
        FIRST OFFER → NEGOTIATED
      </text>

      {OFFERS.map((o, i) => (
        <g key={o.label}>
          <text x={40} y={o.y + 18} fontSize={13} fontWeight={500} fontFamily={SANS} fill={colors.softWhite}>
            {o.label}
          </text>
          <rect
            x={BAR_X}
            y={o.y}
            width={o.first}
            height={28}
            rx={6}
            fill="none"
            stroke="rgba(140,155,176,0.55)"
            strokeDasharray="4 4"
          />
          <motion.rect
            x={BAR_X}
            y={o.y}
            height={28}
            rx={6}
            fill={o.best ? colors.crimson : "rgba(244,246,249,0.9)"}
            initial={{ width: o.first }}
            animate={{ width: play ? o.final : o.first }}
            transition={play ? { delay: 0.5 + i * 0.25, duration: 1.3, ease } : { duration: 0.15 }}
          />
          <Reveal play={play} delay={1.6 + i * 0.25} y={0}>
            <text
              x={BAR_X + o.final + 10}
              y={o.y + 19}
              fontSize={12}
              fontWeight={600}
              fontFamily={SANS}
              fill={o.best ? colors.white : colors.steelGray}
            >
              {o.best ? "Best terms" : "Countered"}
            </text>
          </Reveal>
        </g>
      ))}

      <Reveal play={play} delay={2.4}>
        <g transform="translate(40 282)">
          <rect width={236} height={40} rx={20} fill={colors.softWhite} />
          <circle cx={22} cy={20} r={10} fill={colors.deepNavy} />
          <path d="M17 20.5 20.5 24 27 16.5" stroke={colors.white} strokeWidth={2} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <text x={42} y={25} fontSize={13} fontWeight={600} fontFamily={SANS} fill={colors.deepNavy}>
            Terms confirmed in writing
          </text>
        </g>
      </Reveal>
    </svg>
  );
}

/* ---------- 03 Quality: a scan line sweeps the product, checks tick off ---------- */

const CHECKS = ["Supplier audited", "Sample approved", "Batch inspected", "Packing verified"];

function QualityVisual({ play }: VisualProps) {
  return (
    <div className={styles.quality}>
      <div className={styles.photo}>
        <Image
          src="/images/commodities/surgical-photo.jpg"
          alt="Stainless-steel surgical instruments under inspection"
          fill
          sizes="(max-width: 991px) 70vw, 260px"
          className={styles.photoImg}
        />
        <motion.span
          className={styles.scan}
          aria-hidden="true"
          initial={{ top: "0%", opacity: 0 }}
          animate={play ? { top: ["0%", "100%", "0%"], opacity: [0, 1, 1, 0] } : { top: "0%", opacity: 0 }}
          transition={play ? { duration: 3.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 } : { duration: 0.1 }}
        />
        {["tl", "tr", "bl", "br"].map((c) => (
          <span key={c} className={`${styles.corner} ${styles[c]}`} aria-hidden="true" />
        ))}
      </div>
      <ul className={styles.checks}>
        {CHECKS.map((c, i) => (
          <motion.li
            key={c}
            initial={{ opacity: 0, x: 16 }}
            animate={play ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
            transition={play ? { delay: 0.5 + i * 0.55, duration: 0.5, ease } : { duration: 0.1 }}
          >
            <span className={styles.checkIcon}>
              <CheckOutlined />
            </span>
            {c}
          </motion.li>
        ))}
      </ul>
    </div>
  );
}

/* ---------- 04 Private label: the carton changes hands ---------- */

function PrivateLabelVisual({ play }: VisualProps) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="A generic carton is relabelled with your own brand">
      <ellipse cx={240} cy={316} rx={150} ry={14} fill="rgba(0,0,0,0.25)" />

      {/* Carton: top, left and right faces */}
      <polygon points="240,64 360,112 240,160 120,112" fill={colors.softWhite} />
      <polygon points="120,112 240,160 240,300 120,252" fill="color-mix(in srgb, #8C9BB0 45%, #F4F6F9)" />
      <polygon points="240,160 360,112 360,252 240,300" fill={colors.steelGray} />
      <polygon points="228,64 252,64 372,112 348,112" fill="rgba(140,155,176,0.5)" />

      {/* Label on the left face */}
      <g transform="translate(138 154) skewY(22)">
        <motion.rect
          width={86}
          height={62}
          rx={4}
          initial={{ fill: colors.softWhite }}
          animate={{ fill: play ? colors.deepNavy : colors.softWhite }}
          transition={play ? { delay: 1.6, duration: 0.4 } : { duration: 0.1 }}
        />
        <motion.text
          x={43}
          y={36}
          textAnchor="middle"
          fontSize={12}
          fontWeight={700}
          letterSpacing={1}
          fontFamily={SANS}
          fill={colors.steelGray}
          animate={{ opacity: play ? 0 : 1 }}
          transition={play ? { delay: 1.5, duration: 0.2 } : { duration: 0.1 }}
        >
          GENERIC
        </motion.text>
        <motion.line
          x1={8}
          x2={78}
          y1={32}
          y2={32}
          stroke={colors.crimson}
          strokeWidth={2.5}
          initial={{ pathLength: 0, opacity: 1 }}
          animate={play ? { pathLength: 1, opacity: [1, 1, 0] } : { pathLength: 0, opacity: 1 }}
          transition={play ? { delay: 0.9, duration: 0.9, times: [0, 0.55, 1], ease } : { duration: 0.1 }}
        />
        <motion.g
          initial={{ opacity: 0 }}
          animate={{ opacity: play ? 1 : 0 }}
          transition={play ? { delay: 1.9, duration: 0.5 } : { duration: 0.1 }}
        >
          <text x={43} y={30} textAnchor="middle" fontSize={11} fontWeight={700} letterSpacing={1.4} fontFamily={SANS} fill={colors.white}>
            YOUR
          </text>
          <text x={43} y={46} textAnchor="middle" fontSize={11} fontWeight={700} letterSpacing={1.4} fontFamily={SANS} fill={colors.white}>
            BRAND
          </text>
        </motion.g>
      </g>

      <Reveal play={play} delay={2.3}>
        <Tag x={28} y={70} w={104} text="Your spec" />
      </Reveal>
      <Reveal play={play} delay={2.5}>
        <Tag x={350} y={150} w={110} text="Custom pack" tone="crimson" />
      </Reveal>
      <Reveal play={play} delay={2.7}>
        <Tag x={338} y={268} w={116} text="Retail-ready" />
      </Reveal>
    </svg>
  );
}

/* ---------- 05 Logistics: one route, four modes ---------- */

const ROUTE = "M70 236 Q240 8 410 236";
const MODES = ["Sea", "Air", "Rail", "Road"];

function LogisticsVisual({ play }: VisualProps) {
  const [mode, setMode] = useState(0);

  useEffect(() => {
    if (!play) return;
    const id = window.setInterval(() => setMode((m) => (m + 1) % MODES.length), 1400);
    return () => window.clearInterval(id);
  }, [play]);

  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="A shipment travels the route from Munich to Lahore by sea, air, rail or road">
      <path d={ROUTE} fill="none" stroke="rgba(140,155,176,0.4)" strokeWidth={1.5} strokeDasharray="3 7" />
      <motion.path
        d={ROUTE}
        fill="none"
        stroke={colors.softWhite}
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: play ? 1 : 0 }}
        transition={play ? { duration: 2.2, ease: "easeInOut" } : { duration: 0.1 }}
      />

      {play && (
        <motion.circle
          r={7}
          fill={colors.crimson}
          stroke={colors.white}
          strokeWidth={2}
          style={{ offsetPath: `path("${ROUTE}")` }}
          initial={{ offsetDistance: "0%" }}
          animate={{ offsetDistance: "100%" }}
          transition={{ duration: 4.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.8 }}
        />
      )}

      {[
        { x: 70, name: "Lahore" },
        { x: 410, name: "Munich" },
      ].map((p) => (
        <g key={p.name}>
          <circle cx={p.x} cy={236} r={13} fill="rgba(244,246,249,0.12)" />
          <circle cx={p.x} cy={236} r={6} fill={colors.white} />
          <text x={p.x} y={268} textAnchor="middle" fontSize={13} fontWeight={600} letterSpacing={1} fontFamily={SANS} fill={colors.softWhite}>
            {p.name.toUpperCase()}
          </text>
        </g>
      ))}

      {MODES.map((m, i) => {
        const on = i === mode;
        return (
          <g key={m} transform={`translate(${52 + i * 94} 306)`}>
            <rect width={84} height={30} rx={15} fill={on ? colors.softWhite : "transparent"} stroke={on ? colors.softWhite : "rgba(140,155,176,0.55)"} style={{ transition: "all .35s ease" }} />
            <text x={42} y={20} textAnchor="middle" fontSize={11} fontWeight={600} letterSpacing={1.2} fontFamily={SANS} fill={on ? colors.deepNavy : colors.steelGray} style={{ transition: "fill .35s ease" }}>
              {m.toUpperCase()}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

/* ---------- 06 Customs: documents stack up, then the stamp lands ---------- */

const DOCS = ["Commercial invoice", "Packing list", "Certificate of origin", "Bill of lading"];

function CustomsVisual({ play }: VisualProps) {
  return (
    <svg viewBox="0 0 480 360" role="img" aria-label="Shipping documents are checked and stamped cleared">
      <rect x={118} y={52} width={250} height={262} rx={10} fill="rgba(140,155,176,0.35)" transform="rotate(5 243 183)" />
      <rect x={118} y={52} width={250} height={262} rx={10} fill="rgba(140,155,176,0.6)" transform="rotate(-3 243 183)" />
      <motion.g
        initial={{ y: 0 }}
        animate={play ? { y: [0, 0, 6, 0] } : { y: 0 }}
        transition={play ? { delay: 2.5, duration: 0.45, times: [0, 0.2, 0.4, 1] } : { duration: 0.1 }}
      >
        <rect x={118} y={52} width={250} height={262} rx={10} fill={colors.softWhite} />
        <rect x={118} y={52} width={250} height={8} rx={4} fill={colors.deepNavy} />
        <text x={142} y={92} fontSize={11} fontWeight={600} letterSpacing={1.4} fontFamily={SANS} fill={colors.crimson}>
          SHIPMENT DOCUMENTS
        </text>
        {DOCS.map((d, i) => (
          <g key={d}>
            <line x1={142} x2={344} y1={132 + i * 40} y2={132 + i * 40} stroke="rgba(140,155,176,0.4)" />
            <Reveal play={play} delay={0.4 + i * 0.5} y={0}>
              <circle cx={152} cy={128 + i * 40 - 12} r={8} fill={colors.deepNavy} />
              <path d={`M148 ${116 + i * 40} l3 3.4 6 -6.4`} stroke={colors.white} strokeWidth={1.8} fill="none" strokeLinecap="round" strokeLinejoin="round" />
            </Reveal>
            <text x={172} y={122 + i * 40} fontSize={14} fontWeight={500} fontFamily={SANS} fill={colors.deepNavy}>
              {d}
            </text>
          </g>
        ))}
      </motion.g>

      <motion.g
        style={{ transformBox: "fill-box", transformOrigin: "center" }}
        initial={{ opacity: 0, scale: 2.4, rotate: -14 }}
        animate={play ? { opacity: 1, scale: 1, rotate: -14 } : { opacity: 0, scale: 2.4, rotate: -14 }}
        transition={play ? { delay: 2.4, duration: 0.3, ease: [0.5, 0, 0.9, 0.4] } : { duration: 0.1 }}
      >
        <rect x={226} y={262} width={150} height={46} rx={6} fill="rgba(244,246,249,0.92)" stroke={colors.crimson} strokeWidth={4} />
        <text x={301} y={294} textAnchor="middle" fontSize={24} fontWeight={700} letterSpacing={3} fontFamily={SERIF} fill={colors.crimson}>
          CLEARED
        </text>
      </motion.g>
    </svg>
  );
}

const VISUALS: Record<ServiceKey, (p: VisualProps) => ReactNode> = {
  sourcing: SourcingVisual,
  procurement: ProcurementVisual,
  quality: QualityVisual,
  "private-label": PrivateLabelVisual,
  logistics: LogisticsVisual,
  customs: CustomsVisual,
};

export default function ServiceVisual({ service, play }: { service: ServiceKey; play: boolean }) {
  const Visual = VISUALS[service];
  return (
    <div className={styles.frame}>
      <Visual play={play} />
    </div>
  );
}
