"use client";

import { useEffect, useState, type ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { colors } from "@/theme/colors";
import type { ServiceKey } from "./servicesData";

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
        className={crimson ? "fill-crimson stroke-crimson" : "fill-snow/10 stroke-steel/50"}
      />
      <text className="font-sans fill-white"
        x={w / 2}
        y={17}
        textAnchor="middle"
        fontSize={11}
        fontWeight={600}
        letterSpacing={0.6}
       
       
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
        <circle className="fill-none stroke-steel/22" key={r} cx={240} cy={180} r={r} strokeDasharray="2 6" />
      ))}

      {play && (
        <motion.circle className="fill-none stroke-white"
          cx={240}
          cy={180}
         
         
          strokeWidth={1.5}
          initial={{ r: 12, opacity: 0.7 }}
          animate={{ r: 190, opacity: 0 }}
          transition={{ duration: 2.4, ease: "easeOut", repeat: Infinity }}
        />
      )}

      {NODES.map((n, i) => (
        <Reveal key={i} play={play} delay={0.25 + i * 0.07} y={0}>
          <circle className="fill-steel" cx={n.x} cy={n.y} r={4} />
        </Reveal>
      ))}

      {SHORTLIST.map((n, i) => (
        <g key={i}>
          <motion.line className="stroke-steel"
            x1={240}
            y1={180}
            x2={n.x}
            y2={n.y}
           
            strokeWidth={1.2}
            strokeDasharray="4 5"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: play ? 1 : 0 }}
            transition={play ? { delay: 1.1 + i * 0.2, duration: 0.7, ease } : { duration: 0.1 }}
          />
          <Reveal play={play} delay={1.3 + i * 0.2} y={0}>
            <circle className="fill-none stroke-white" cx={n.x} cy={n.y} r={9} strokeWidth={1.5} />
            <circle className="fill-white" cx={n.x} cy={n.y} r={4} />
          </Reveal>
        </g>
      ))}

      <motion.line className="stroke-crimson"
        x1={240}
        y1={180}
        x2={BEST.x}
        y2={BEST.y}
       
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: play ? 1 : 0 }}
        transition={play ? { delay: 1.8, duration: 0.8, ease } : { duration: 0.1 }}
      />
      <Reveal play={play} delay={2.2} y={0}>
        <circle className="fill-crimson/25" cx={BEST.x} cy={BEST.y} r={15} />
        <circle className="fill-crimson" cx={BEST.x} cy={BEST.y} r={8} />
      </Reveal>
      <Reveal play={play} delay={2.4}>
        <Tag x={BEST.x - 44} y={BEST.y - 50} w={88} text="Best match" tone="crimson" />
      </Reveal>
      <Reveal play={play} delay={2}>
        <Tag x={64} y={218} w={78} text="Shortlist" />
      </Reveal>

      <circle className="fill-white" cx={240} cy={180} r={11} />
      <circle className="fill-navy" cx={240} cy={180} r={4} />
      <text className="font-sans fill-snow" x={240} y={216} textAnchor="middle" fontSize={12} fontWeight={600} letterSpacing={1}>
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
      <text className="font-sans fill-steel" x={40} y={52} fontSize={12} fontWeight={600} letterSpacing={1.2}>
        FIRST OFFER → NEGOTIATED
      </text>

      {OFFERS.map((o, i) => (
        <g key={o.label}>
          <text className="font-sans fill-snow" x={40} y={o.y + 18} fontSize={13} fontWeight={500}>
            {o.label}
          </text>
          <rect className="fill-none stroke-steel/55"
            x={BAR_X}
            y={o.y}
            width={o.first}
            height={28}
            rx={6}
           
           
            strokeDasharray="4 4"
          />
          <motion.rect
            x={BAR_X}
            y={o.y}
            height={28}
            rx={6}
            className={o.best ? "fill-crimson" : "fill-snow/90"}
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
              className={o.best ? "fill-white font-sans" : "fill-steel font-sans"}
            >
              {o.best ? "Best terms" : "Countered"}
            </text>
          </Reveal>
        </g>
      ))}

      <Reveal play={play} delay={2.4}>
        <g transform="translate(40 282)">
          <rect className="fill-snow" width={236} height={40} rx={20} />
          <circle className="fill-navy" cx={22} cy={20} r={10} />
          <path className="stroke-white fill-none" d="M17 20.5 20.5 24 27 16.5" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          <text className="font-sans fill-navy" x={42} y={25} fontSize={13} fontWeight={600}>
            Terms confirmed in writing
          </text>
        </g>
      </Reveal>
    </svg>
  );
}

/* ---------- 03 Quality: a scan line sweeps the product, checks tick off ---------- */

const CORNERS = [
  "top-2 left-2 border-r-0 border-b-0",
  "top-2 right-2 border-b-0 border-l-0",
  "bottom-2 left-2 border-t-0 border-r-0",
  "right-2 bottom-2 border-t-0 border-l-0",
];
const CHECKS = ["Supplier audited", "Sample approved", "Batch inspected", "Packing verified"];

function QualityVisual({ play }: VisualProps) {
  return (
    <div className="grid w-full grid-cols-2 items-center gap-7 p-7 max-xs:gap-4 max-xs:p-4">
      <div className="relative aspect-4/5 overflow-hidden rounded-lg bg-snow before:pointer-events-none before:absolute before:inset-0 before:z-1 before:bg-linear-to-b before:from-transparent before:from-55% before:to-crimson/28 before:mix-blend-screen before:content-[''] after:pointer-events-none after:absolute after:inset-0 after:bg-navy after:opacity-55 after:mix-blend-multiply after:content-['']">
        <Image
          src="/images/commodities/surgical-photo.jpg"
          alt="Stainless-steel surgical instruments under inspection"
          fill
          sizes="(max-width: 991px) 70vw, 260px"
          className="object-cover contrast-[1.08] grayscale"
        />
        <motion.span
          className="absolute inset-x-0 z-2 h-0.5 bg-crimson shadow-[0_0_14px_3px_color-mix(in_srgb,var(--color-crimson)_70%,transparent),0_-26px_26px_color-mix(in_srgb,var(--color-crimson)_20%,transparent)]"
          aria-hidden="true"
          initial={{ top: "0%", opacity: 0 }}
          animate={play ? { top: ["0%", "100%", "0%"], opacity: [0, 1, 1, 0] } : { top: "0%", opacity: 0 }}
          transition={play ? { duration: 3.2, ease: "easeInOut", repeat: Infinity, repeatDelay: 0.6 } : { duration: 0.1 }}
        />
        {CORNERS.map((c) => (
          <span key={c} className={cn("absolute z-2 size-4.5 border-2 border-white", c)} aria-hidden="true" />
        ))}
      </div>
      <ul className="flex flex-col gap-4">
        {CHECKS.map((c, i) => (
          <motion.li
            key={c}
            className="flex items-center gap-3 text-[clamp(0.8rem,0.7rem+0.5vw,1rem)] font-medium text-snow"
            initial={{ opacity: 0, x: 16 }}
            animate={play ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
            transition={play ? { delay: 0.5 + i * 0.55, duration: 0.5, ease } : { duration: 0.1 }}
          >
            <span className="grid size-6 shrink-0 place-items-center rounded-full bg-crimson text-micro text-white">
              <Check className="size-[1em]" aria-hidden="true" />
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
      <ellipse className="fill-ink/30" cx={240} cy={316} rx={150} ry={14} />

      {/* Carton: top, left and right faces */}
      <polygon className="fill-snow" points="240,64 360,112 240,160 120,112" />
      <polygon points="120,112 240,160 240,300 120,252" className="fill-[color-mix(in_srgb,var(--color-steel)_45%,var(--color-snow))]" />
      <polygon className="fill-steel" points="240,160 360,112 360,252 240,300" />
      <polygon className="fill-steel/50" points="228,64 252,64 372,112 348,112" />

      {/* Label on the left face */}
      <g transform="translate(138 154) skewY(22)">
        <motion.rect
          width={86}
          height={62}
          rx={4}
          initial={{ fill: colors.snow }}
          animate={{ fill: play ? colors.navy : colors.snow }}
          transition={play ? { delay: 1.6, duration: 0.4 } : { duration: 0.1 }}
        />
        <motion.text className="font-sans fill-steel"
          x={43}
          y={36}
          textAnchor="middle"
          fontSize={12}
          fontWeight={700}
          letterSpacing={1}
         
         
          animate={{ opacity: play ? 0 : 1 }}
          transition={play ? { delay: 1.5, duration: 0.2 } : { duration: 0.1 }}
        >
          GENERIC
        </motion.text>
        <motion.line className="stroke-crimson"
          x1={8}
          x2={78}
          y1={32}
          y2={32}
         
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
          <text className="font-sans fill-white" x={43} y={30} textAnchor="middle" fontSize={11} fontWeight={700} letterSpacing={1.4}>
            YOUR
          </text>
          <text className="font-sans fill-white" x={43} y={46} textAnchor="middle" fontSize={11} fontWeight={700} letterSpacing={1.4}>
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
      <path className="fill-none stroke-steel/40" d={ROUTE} strokeWidth={1.5} strokeDasharray="3 7" />
      <motion.path className="fill-none stroke-snow"
        d={ROUTE}
       
       
        strokeWidth={2}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: play ? 1 : 0 }}
        transition={play ? { duration: 2.2, ease: "easeInOut" } : { duration: 0.1 }}
      />

      {play && (
        <motion.circle className="fill-crimson stroke-white"
          r={7}
         
         
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
          <circle className="fill-snow/12" cx={p.x} cy={236} r={13} />
          <circle className="fill-white" cx={p.x} cy={236} r={6} />
          <text className="font-sans fill-snow" x={p.x} y={268} textAnchor="middle" fontSize={13} fontWeight={600} letterSpacing={1}>
            {p.name.toUpperCase()}
          </text>
        </g>
      ))}

      {MODES.map((m, i) => {
        const on = i === mode;
        return (
          <g key={m} transform={`translate(${52 + i * 94} 306)`}>
            <rect width={84} height={30} rx={15} className={cn("transition-all duration-350", on ? "fill-snow stroke-snow" : "fill-transparent stroke-steel/55")} />
            <text x={42} y={20} textAnchor="middle" fontSize={11} fontWeight={600} letterSpacing={1.2} className={cn("font-sans transition-[fill] duration-350", on ? "fill-navy" : "fill-steel")}>
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
      <rect className="fill-steel/35" x={118} y={52} width={250} height={262} rx={10} transform="rotate(5 243 183)" />
      <rect className="fill-steel/60" x={118} y={52} width={250} height={262} rx={10} transform="rotate(-3 243 183)" />
      <motion.g
        initial={{ y: 0 }}
        animate={play ? { y: [0, 0, 6, 0] } : { y: 0 }}
        transition={play ? { delay: 2.5, duration: 0.45, times: [0, 0.2, 0.4, 1] } : { duration: 0.1 }}
      >
        <rect className="fill-snow" x={118} y={52} width={250} height={262} rx={10} />
        <rect className="fill-navy" x={118} y={52} width={250} height={8} rx={4} />
        <text className="font-sans fill-crimson" x={142} y={92} fontSize={11} fontWeight={600} letterSpacing={1.4}>
          SHIPMENT DOCUMENTS
        </text>
        {DOCS.map((d, i) => (
          <g key={d}>
            <line className="stroke-steel/40" x1={142} x2={344} y1={132 + i * 40} y2={132 + i * 40} />
            <Reveal play={play} delay={0.4 + i * 0.5} y={0}>
              <circle className="fill-navy" cx={152} cy={128 + i * 40 - 12} r={8} />
              <path className="stroke-white fill-none" d={`M148 ${116 + i * 40} l3 3.4 6 -6.4`} strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" />
            </Reveal>
            <text className="font-sans fill-navy" x={172} y={122 + i * 40} fontSize={14} fontWeight={500}>
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
        <rect className="fill-snow/92 stroke-crimson" x={226} y={262} width={150} height={46} rx={6} strokeWidth={4} />
        <text className="font-serif fill-crimson" x={301} y={294} textAnchor="middle" fontSize={24} fontWeight={700} letterSpacing={3}>
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
    <div className="relative grid aspect-4/3 w-full place-items-center overflow-hidden rounded-xl bg-navy bg-[radial-gradient(ellipse_70%_60%_at_50%_40%,color-mix(in_srgb,var(--color-snow)_10%,transparent),transparent_70%)] [&>svg]:size-full">
      <Visual play={play} />
    </div>
  );
}
