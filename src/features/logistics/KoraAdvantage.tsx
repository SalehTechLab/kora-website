"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container, Heading, Section, Text } from "@/components/ui";
import { cn } from "@/lib/cn";
import { ease as EASE } from "@/lib/motion";

const TRADITIONAL = [
  "Multiple supplier contacts",
  "Fragmented sourcing process",
  "Separate shipping arrangements",
  "Limited process visibility",
  "Transactional relationships",
];

const KORA = [
  "One trading partner",
  "Coordinated sourcing & procurement",
  "Integrated logistics coordination",
  "Clear communication throughout",
  "Long-term business partnerships",
];

// Fragmented rows sit slightly off-grid; the Kora rows stay aligned
const JITTER = [0, 14, -6, 10, 2];

/* ---------- diagram ---------- */

const SRC_Y = [24, 67, 110, 153, 196];
const YOU = { x: 476, y: 110 };
const HUB = { x: 262, y: 110 };

// Tangled: every supplier routes to "you" along its own crossing path
const tangled = (y: number, i: number) =>
  `M44,${y} C ${150 + (i % 2) * 40},${220 - y} ${330 - (i % 2) * 60},${y + (i % 2 ? -70 : 70)} ${YOU.x},${YOU.y}`;

// Coordinated: every source funnels through one hub, then one line out
const funnel = (y: number) => `M44,${y} C 140,${y} 170,${HUB.y} ${HUB.x},${HUB.y}`;
const fullRoute = (y: number) => `${funnel(y)} L ${YOU.x},${YOU.y}`;

const drawIn: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.1, delay: 0.35 + i * 0.12, ease: EASE },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (i: number) => ({ opacity: 1, transition: { duration: 0.8, delay: 0.3 + i * 0.12 } }),
};

const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 18, delay: 0.2 + i * 0.08 },
  }),
};

const SVG_CLASS = "block h-auto w-full overflow-visible";
const BOX_ORIGIN = "[transform-box:fill-box] origin-center";

function Node({ x, y, tone, i }: { x: number; y: number; tone: string; i: number }) {
  return (
    <motion.rect
      x={x - 7}
      y={y - 7}
      width={14}
      height={14}
      strokeWidth={1.5}
      className={cn(BOX_ORIGIN, tone)}
      variants={popIn}
      custom={i}
    />
  );
}

function Packet({ path, delay, tone, lost }: { path: string; delay: number; tone: string; lost?: boolean }) {
  return (
    <circle r={3.2} className={tone} opacity={0}>
      <animateMotion dur="3.2s" begin={`${delay}s`} repeatCount="indefinite" path={path} />
      <animate
        attributeName="opacity"
        dur="3.2s"
        begin={`${delay}s`}
        repeatCount="indefinite"
        values={lost ? "0;1;1;0;0" : "0;1;1;1;0"}
        keyTimes={lost ? "0;0.1;0.45;0.55;1" : "0;0.08;0.5;0.92;1"}
      />
    </circle>
  );
}

function TraditionalDiagram({ reduce }: { reduce: boolean }) {
  return (
    <motion.svg viewBox="0 0 520 220" aria-hidden className={SVG_CLASS}>
      {SRC_Y.map((y, i) => (
        <motion.path
          key={y}
          className="animate-dash-flow stroke-steel [stroke-dasharray:4_6] motion-reduce:animate-none"
          d={tangled(y, i)}
          fill="none"
          strokeWidth={1.4}
          strokeLinecap="round"
          variants={fadeIn}
          custom={i}
        />
      ))}
      {/* breakdown points along the tangle */}
      {[
        [196, 62],
        [292, 150],
        [350, 80],
      ].map(([x, y], i) => (
        <motion.g key={x} variants={fadeIn} custom={5 + i}>
          <g
            className="animate-flicker motion-reduce:animate-none"
            style={{ animationDelay: `${i * 0.7}s` }}
          >
            <circle cx={x} cy={y} r={9} strokeWidth={1.2} className="fill-snow stroke-crimson" />
            <path
              d={`M${x - 3.5},${y - 3.5} L${x + 3.5},${y + 3.5} M${x + 3.5},${y - 3.5} L${x - 3.5},${y + 3.5}`}
              className="stroke-crimson"
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          </g>
        </motion.g>
      ))}
      {!reduce &&
        [0, 2, 4].map((i) => (
          <Packet key={i} path={tangled(SRC_Y[i], i)} delay={i * 0.55} tone="fill-steel" lost />
        ))}
      {SRC_Y.map((y, i) => (
        <Node key={y} x={44} y={y} i={i} tone="fill-snow stroke-steel" />
      ))}
      <Node x={YOU.x} y={YOU.y} i={5} tone="fill-snow stroke-ink/75" />
      <text
        x={YOU.x}
        y={YOU.y + 28}
        textAnchor="middle"
        fontSize={10}
        letterSpacing="0.18em"
        className="fill-steel"
      >
        YOU
      </text>
    </motion.svg>
  );
}

function KoraDiagram({ reduce }: { reduce: boolean }) {
  return (
    <motion.svg viewBox="0 0 520 220" aria-hidden className={SVG_CLASS}>
      {SRC_Y.map((y, i) => (
        <motion.path
          key={y}
          d={funnel(y)}
          fill="none"
          className="stroke-snow/40"
          strokeWidth={1.4}
          strokeLinecap="round"
          variants={drawIn}
          custom={i}
        />
      ))}
      <motion.path
        d={`M${HUB.x},${HUB.y} L${YOU.x},${YOU.y}`}
        className="stroke-crimson drop-shadow-[0_0_6px_color-mix(in_srgb,var(--color-crimson)_90%,transparent)]"
        strokeWidth={3}
        strokeLinecap="round"
        variants={drawIn}
        custom={5}
      />
      {!reduce &&
        SRC_Y.map((y, i) => (
          <Packet key={y} path={fullRoute(y)} delay={i * 0.6} tone="fill-snow" />
        ))}

      {/* hub */}
      <motion.g variants={popIn} custom={5} className={BOX_ORIGIN}>
        {!reduce &&
          [0, 1].map((k) => (
            <motion.circle
              key={k}
              cx={HUB.x}
              cy={HUB.y}
              r={26}
              fill="none"
              className={cn(BOX_ORIGIN, "stroke-crimson")}
              strokeWidth={1.2}
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.9, opacity: 0 }}
              transition={{ duration: 2.6, repeat: Infinity, delay: k * 1.3, ease: "easeOut" }}
            />
          ))}
        <circle cx={HUB.x} cy={HUB.y} r={26} className="fill-crimson" />
        <circle cx={HUB.x} cy={HUB.y} r={32} fill="none" className="stroke-snow/35" strokeWidth={1} />
        <text
          x={HUB.x}
          y={HUB.y + 3.5}
          textAnchor="middle"
          fontSize={10}
          fontWeight={700}
          letterSpacing="0.16em"
          className="fill-snow"
        >
          KORA
        </text>
      </motion.g>

      {SRC_Y.map((y, i) => (
        <Node key={y} x={44} y={y} i={i} tone="fill-navy stroke-snow/80" />
      ))}
      <Node x={YOU.x} y={YOU.y} i={5} tone="fill-snow stroke-snow" />
      <text
        x={YOU.x}
        y={YOU.y + 28}
        textAnchor="middle"
        fontSize={10}
        letterSpacing="0.18em"
        className="fill-snow"
      >
        YOU
      </text>
    </motion.svg>
  );
}

/* ---------- parts ---------- */

const KORA_CARD =
  "border-snow/15 bg-navy text-snow/90 bg-[radial-gradient(ellipse_80%_50%_at_50%_110%,color-mix(in_srgb,var(--color-crimson)_32%,transparent),transparent_70%),linear-gradient(color-mix(in_srgb,var(--color-snow)_4%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--color-snow)_4%,transparent)_1px,transparent_1px)] bg-size-[auto,32px_32px,32px_32px]";

function Column({
  kora,
  kicker,
  title,
  items,
  hover,
  onHover,
  reduce,
}: {
  kora: boolean;
  kicker: string;
  title: string;
  items: string[];
  hover: number | null;
  onHover: (i: number | null) => void;
  reduce: boolean;
}) {
  const shell: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 48 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.9, ease: EASE, delay: kora && !reduce ? 0.2 : 0 },
    },
  };
  const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: kora ? 0.9 : 0.7 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : kora ? 28 : -28 },
    show: { opacity: 1, x: 0, transition: { duration: reduce ? 0 : 0.6, ease: EASE } },
  };

  const body = (
    <div
      className={cn(
        "h-full border p-[clamp(1.5rem,3.2vw,2.5rem)]",
        kora ? KORA_CARD : "border-dashed border-steel bg-snow/60 text-ink/75",
      )}
    >
      <span
        className={cn(
          "mb-2 block text-micro font-semibold tracking-eyebrow uppercase",
          kora ? "text-crimson" : "text-steel-text",
        )}
      >
        {kicker}
      </span>
      <h3
        className={cn(
          "font-serif text-[clamp(1.5rem,2.4vw,2rem)] leading-[1.15] tracking-heading",
          kora ? "text-snow" : "text-ink",
        )}
      >
        {title}
      </h3>
      <div className="my-[clamp(1.25rem,3vw,2rem)]">
        {kora ? <KoraDiagram reduce={reduce} /> : <TraditionalDiagram reduce={reduce} />}
      </div>
      <motion.ul variants={list} className="list-none">
        {items.map((text, i) => (
          <motion.li
            key={text}
            variants={item}
            className={cn(
              i > 0 && "border-t",
              i > 0 && (kora ? "border-snow/12" : "border-dashed border-steel/50"),
            )}
          >
            <div
              className={cn(
                "-mx-4 flex min-h-17 cursor-default items-center gap-4 px-4 transition-colors duration-300",
                hover === i && (kora ? "bg-snow/7" : "bg-crimson/5"),
              )}
              onMouseEnter={() => onHover(i)}
              onMouseLeave={() => onHover(null)}
              style={kora || reduce ? undefined : { transform: `translateX(${JITTER[i]}px)` }}
            >
              <motion.span
                aria-hidden
                className={cn(
                  "grid size-7 flex-none place-items-center rounded-full",
                  kora
                    ? "bg-crimson text-snow shadow-[0_0_18px_color-mix(in_srgb,var(--color-crimson)_65%,transparent)]"
                    : "border-[1.5px] border-dashed border-steel text-steel",
                )}
                variants={popIn}
                custom={i}
                animate={hover === i ? { scale: 1.15 } : undefined}
              >
                {kora ? <Check className="size-3" /> : <X className="size-3" />}
              </motion.span>
              <span
                className={cn(
                  "text-[clamp(0.95rem,0.9rem+0.3vw,1.075rem)] leading-[1.35]",
                  kora ? "font-semibold" : "font-normal",
                )}
              >
                {text}
              </span>
            </div>
          </motion.li>
        ))}
      </motion.ul>
    </div>
  );

  return (
    <motion.div variants={shell} className="h-full">
      {kora ? (
        <div className="relative h-full shadow-[0_40px_90px_-40px_color-mix(in_srgb,var(--color-navy)_65%,transparent)]">
          {body}
        </div>
      ) : (
        body
      )}
    </motion.div>
  );
}

export default function KoraAdvantage() {
  const reduceMotion = useReducedMotion() ?? false;
  const [hover, setHover] = useState<number | null>(null);

  const rise = {
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: reduceMotion ? 0 : 0.8, ease: EASE },
  } as const;

  return (
    <Section
      tone="mist"
      space="none"
      id="kora-advantage"
      aria-labelledby="advantage-heading"
      className={cn(
        "py-20 md:py-30",
        "bg-[radial-gradient(color-mix(in_srgb,var(--color-navy)_9%,transparent)_1px,transparent_1px)] bg-size-[28px_28px]",
        // soften the dot grid toward the edges
        "before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(ellipse_at_center,transparent_35%,var(--color-mist)_85%)]",
      )}
    >
      <Container>
        <motion.div {...rise} className="mx-auto mb-[clamp(2.5rem,6vw,4.5rem)] max-w-190 text-center">
          <span className="mb-4 inline-flex items-center gap-3.5 text-eyebrow font-semibold tracking-eyebrow text-crimson uppercase before:h-px before:w-7 before:bg-current before:opacity-55 after:h-px after:w-7 after:bg-current after:opacity-55">
            The Kora Advantage
          </span>
          <Heading as="h2" size="headline" id="advantage-heading" className="mb-5">
            A{" "}
            <span className="relative inline-block text-crimson italic">
              Smarter
              <motion.span
                aria-hidden
                className="absolute inset-x-0 bottom-[0.02em] h-[0.09em] origin-left bg-crimson opacity-35"
                initial={reduceMotion ? false : { scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: reduceMotion ? 0 : 0.9, delay: 0.5, ease: EASE }}
              />
            </span>{" "}
            Way to Trade.
          </Heading>
          <Text className="mx-auto max-w-160 text-lead-sm leading-body text-ink/75">
            Global trading doesn&rsquo;t have to mean juggling multiple suppliers, complex
            processes, and disconnected logistics. We bring sourcing, procurement, and delivery
            coordination together for a more connected trading experience.
          </Text>
        </motion.div>

        <div className="relative">
          {/* VS medallion straddling the two cards (desktop only) */}
          <motion.div
            aria-hidden
            className="absolute top-32 left-1/2 z-3 -ml-7.5 hidden size-15 place-items-center rounded-full bg-crimson font-serif text-lg font-bold tracking-wide text-snow italic shadow-[0_0_0_6px_var(--color-snow),0_12px_32px_-8px_color-mix(in_srgb,var(--color-crimson)_60%,transparent)] lg:grid"
            initial={reduceMotion ? false : { opacity: 0, scale: 0.3, rotate: -40 }}
            whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.7 }}
          >
            <span className="pointer-events-none absolute inset-0 animate-pulse-ring rounded-full border-[1.5px] border-crimson motion-reduce:hidden" />
            VS
          </motion.div>

          <div className="grid items-stretch gap-7 lg:grid-cols-2 lg:gap-x-10">
            {[
              { kora: false, kicker: "Without Kora", title: "Traditional Approach", items: TRADITIONAL },
              { kora: true, kicker: "With Kora", title: "The Kora Way", items: KORA },
            ].map((c) => (
              <motion.div
                key={c.title}
                className="h-full"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "-100px" }}
              >
                <Column
                  kora={c.kora}
                  kicker={c.kicker}
                  title={c.title}
                  items={c.items}
                  hover={hover}
                  onHover={setHover}
                  reduce={reduceMotion}
                />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div {...rise} className="mt-[clamp(2.5rem,6vw,4rem)] text-center">
          <div className="flex flex-wrap items-center justify-center gap-3.5">
            <span className="text-body-lg text-ink/75">Many moving parts.</span>
            <span className="font-serif text-[1.375rem] font-semibold text-navy">One partner.</span>
          </div>
        </motion.div>
      </Container>
    </Section>
  );
}
