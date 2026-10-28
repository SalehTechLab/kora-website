"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { colors } from "@/theme/colors";

type IconName = "brief" | "search" | "box" | "ship" | "check";
type Tone = "navy" | "crimson";

// `accent` feeds framer-motion / SVG attributes; `tone` picks the matching classes
const STEPS: {
  title: string;
  description: string;
  icon: IconName;
  accent: string;
  tone: Tone;
}[] = [
  {
    title: "Understanding Your Needs",
    description:
      "We start with a conversation about your product, volumes, budget, and timelines, so every decision that follows is built on a clear brief.",
    icon: "brief",
    accent: colors.navy,
    tone: "navy",
  },
  {
    title: "Sourcing & Supplier Verification",
    description:
      "We identify qualified suppliers, verify their credentials and capacity, and compare offers so you only work with partners you can trust.",
    icon: "search",
    accent: colors.navy,
    tone: "navy",
  },
  {
    title: "Procurement & Order Preparation",
    description:
      "We negotiate terms, place orders, and oversee production, quality checks, packaging, and export documentation.",
    icon: "box",
    accent: colors.navy,
    tone: "navy",
  },
  {
    title: "Logistics & International Shipping",
    description:
      "We choose the right mode (road, rail, sea, or air), book capacity, handle customs, and track your cargo across every border.",
    icon: "ship",
    accent: colors.crimson,
    tone: "crimson",
  },
  {
    title: "Delivery & Continued Partnership",
    description:
      "Your goods arrive at their destination, and we stay on as your partner for repeat orders, new markets, and ongoing support.",
    icon: "check",
    accent: colors.crimson,
    tone: "crimson",
  },
];

const TEXT_TONE: Record<Tone, string> = { navy: "text-navy", crimson: "text-crimson" };
const BORDER_TONE: Record<Tone, string> = { navy: "border-navy", crimson: "border-crimson" };
const STROKE_TONE: Record<Tone, string> = { navy: "stroke-navy", crimson: "stroke-crimson" };

const ICON_PATHS: Record<IconName, string[]> = {
  brief: ["M7 4h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", "M9 3h6v3H9z", "M9 11h6", "M9 15h6", "M9 19h3"],
  search: ["M10.5 4a6.5 6.5 0 1 1 0 13a6.5 6.5 0 1 1 0-13z", "M15.5 15.5L21 21"],
  box: ["M12 3l8 4.5v9L12 21l-8-4.5v-9z", "M4 7.5l8 4.5l8-4.5", "M12 12v9"],
  ship: ["M3 14h18l-2.5 6h-13z", "M7 14V9h10v5", "M10.5 9V5h3v4"],
  check: ["M5 12.5l4.5 4.5L19 7"],
};

// Desktop canvas geometry, in SVG user units
const VB_W = 1200;
const VB_H = 460;
const LOW = 320;
const HIGH = 170;
const XS = [120, 360, 600, 840, 1080];
const nodeY = (i: number) => (i % 2 === 0 ? LOW : HIGH);

// Mirrored, congruent curves, so step i sits at exactly i / (n - 1) of the route
const ROUTE = XS.reduce((d, x, i) => {
  if (i === 0) return `M${x},${nodeY(0)}`;
  const px = XS[i - 1];
  return `${d} C${px + 120},${nodeY(i - 1)} ${x - 120},${nodeY(i)} ${x},${nodeY(i)}`;
}, "");

const LAST = STEPS.length - 1;
const AUTOPLAY_MS = 4200;

function StepIcon({ name, size = 30 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      {ICON_PATHS[name].map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease }}
        />
      ))}
    </svg>
  );
}

export default function ProcessJourney() {
  const uid = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();

  const rootRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const revealed = useInView(rootRef, { once: true, amount: 0.35 });
  const inView = useInView(rootRef, { amount: 0.35 });

  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [hovering, setHovering] = useState(false);
  const playing = autoplay && !hovering && inView && !reduceMotion;

  // Staggered entrance only applies to the first reveal
  const [intro, setIntro] = useState(true);
  useEffect(() => {
    if (!revealed) return;
    const timer = setTimeout(() => setIntro(false), 1600);
    return () => clearTimeout(timer);
  }, [revealed]);

  // Route progress (0–1) drives both the drawn trail and the travelling cargo dot
  const progress = useMotionValue(0);
  const dotX = useMotionValue(XS[0]);
  const dotY = useMotionValue(LOW);

  const placeDot = (value: number) => {
    const route = routeRef.current;
    if (!route) return;
    const point = route.getPointAtLength(value * route.getTotalLength());
    dotX.set(point.x);
    dotY.set(point.y);
  };

  useMotionValueEvent(progress, "change", placeDot);
  useLayoutEffect(() => placeDot(progress.get()));

  useEffect(() => {
    if (!revealed) return;
    const controls = animate(progress, active / LAST, {
      duration: reduceMotion ? 0 : 1.1,
      ease,
    });
    return () => controls.stop();
  }, [active, revealed, reduceMotion, progress]);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(
      () => setActive((current) => (current + 1) % STEPS.length),
      AUTOPLAY_MS,
    );
    return () => clearTimeout(timer);
  }, [playing, active]);

  const select = (index: number) => {
    setAutoplay(false);
    setActive((index + STEPS.length) % STEPS.length);
  };

  const step = STEPS[active];

  return (
    // Pausing on focus as well as hover lets keyboard users stop the auto-advance
    <div
      ref={rootRef}
      onFocusCapture={() => setHovering(true)}
      onBlurCapture={() => setHovering(false)}
    >
      <div
        className="relative mb-10 hidden aspect-[1200/460] lg:block [&>svg]:absolute [&>svg]:inset-0 [&>svg]:size-full [&>svg]:overflow-visible"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} aria-hidden>
          <defs>
            <linearGradient
              id={`${uid}-trail`}
              gradientUnits="userSpaceOnUse"
              x1={XS[0]}
              x2={XS[LAST]}
              y1={0}
              y2={0}
            >
              {STEPS.map((s, i) => (
                <stop key={s.title} offset={i / LAST} stopColor={s.accent} />
              ))}
            </linearGradient>
            <mask id={`${uid}-reveal`}>
              <motion.rect
                y={0}
                height={VB_H}
                className="fill-snow"
                initial={{ width: 0 }}
                animate={{ width: revealed ? VB_W : 0 }}
                transition={{ duration: reduceMotion ? 0 : 1.6, ease }}
              />
            </mask>
            <filter id={`${uid}-glow`} x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          <g mask={`url(#${uid}-reveal)`}>
            <path
              d={`M0,${LOW} H${XS[0]} M${XS[LAST]},${LOW} H${VB_W}`}
              className="stroke-steel"
              strokeWidth={3}
              strokeDasharray="8 10"
              strokeLinecap="round"
            />
            <path
              ref={routeRef}
              d={ROUTE}
              fill="none"
              className="stroke-steel"
              strokeWidth={3}
              strokeDasharray="2 12"
              strokeLinecap="round"
            />
          </g>

          <motion.path
            d={ROUTE}
            fill="none"
            stroke={`url(#${uid}-trail)`}
            strokeWidth={4}
            strokeLinecap="round"
            style={{ pathLength: progress }}
          />

          {/* Sea waves under the shipping step */}
          <g transform={`translate(${XS[3] - 60} ${HIGH + 88})`}>
            {[0, 1].map((row) => (
              <motion.path
                key={row}
                d="M0 0 q10 -8 20 0 t20 0 t20 0 t20 0 t20 0"
                transform={`translate(${row * 22} ${row * 12})`}
                fill="none"
                className="stroke-steel"
                strokeWidth={2.5}
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: active === 3 ? 0.9 : 0.35,
                  x: reduceMotion ? 0 : [0, row ? 10 : -10, 0],
                }}
                transition={{
                  opacity: { duration: 0.4 },
                  x: { duration: 3 + row, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            ))}
          </g>

          {/* Travelling cargo dot */}
          {revealed && (
            <g>
              <motion.circle
                cx={dotX}
                cy={dotY}
                r={14}
                className="fill-crimson"
                filter={`url(#${uid}-glow)`}
                animate={reduceMotion ? undefined : { opacity: [0.35, 0.8, 0.35] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <motion.circle
                cx={dotX}
                cy={dotY}
                r={7}
                className="fill-crimson stroke-snow"
                strokeWidth={3}
              />
            </g>
          )}
        </svg>

        {STEPS.map((s, i) => {
          const isActive = i === active;
          const reached = i <= active;
          const above = i % 2 === 1;

          return (
            <div
              key={s.title}
              className="absolute size-0"
              style={{
                left: `${(XS[i] / VB_W) * 100}%`,
                top: `${(nodeY(i) / VB_H) * 100}%`,
              }}
            >
              <motion.button
                type="button"
                className="absolute -top-11 -left-11 grid size-22 cursor-pointer place-items-center rounded-full border-[1.5px] p-0 focus-visible:outline-offset-6"
                aria-label={`Step ${i + 1}: ${s.title}`}
                aria-pressed={isActive}
                onClick={() => select(i)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: revealed ? (isActive ? 1.14 : 1) : 0,
                  opacity: revealed ? 1 : 0,
                  backgroundColor: isActive ? s.accent : reached ? colors.snow : colors.white,
                  borderColor: reached ? s.accent : colors.steel,
                  color: isActive ? colors.snow : reached ? s.accent : colors.steel,
                  boxShadow: isActive
                    ? `0 18px 40px -12px ${s.accent}`
                    : "0 0 0 0 transparent",
                }}
                whileHover={{ scale: isActive ? 1.18 : 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: intro ? 0.25 + i * 0.18 : 0,
                }}
              >
                <motion.span
                  key={isActive ? "on" : "off"}
                  className="grid"
                  animate={
                    isActive && s.icon === "ship" && !reduceMotion
                      ? { y: [0, -4, 0], rotate: [0, -3, 0, 3, 0] }
                      : undefined
                  }
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <StepIcon name={s.icon} />
                </motion.span>

                {isActive && !reduceMotion && (
                  <>
                    {[0, 1].map((n) => (
                      <motion.span
                        key={n}
                        className={cn(
                          "pointer-events-none absolute -inset-[1.5px] rounded-full border-2",
                          BORDER_TONE[s.tone],
                        )}
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.9, opacity: 0 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: n,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </>
                )}

                {/* Autoplay countdown */}
                {isActive && playing && (
                  <svg viewBox="0 0 100 100" className="absolute -inset-2.5 size-27" aria-hidden>
                    <motion.circle
                      key={active}
                      cx={50}
                      cy={50}
                      r={48}
                      fill="none"
                      className={STROKE_TONE[s.tone]}
                      strokeWidth={2}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                    />
                  </svg>
                )}

                {/* Arrival burst on the final step */}
                {isActive && i === LAST && !reduceMotion &&
                  Array.from({ length: 10 }, (_, n) => {
                    const angle = (n / 10) * Math.PI * 2;
                    return (
                      <motion.span
                        key={n}
                        className={cn(
                          "absolute size-1.75 rounded-full",
                          n % 2 ? "bg-crimson" : "bg-navy",
                        )}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{
                          x: Math.cos(angle) * 78,
                          y: Math.sin(angle) * 78,
                          opacity: 0,
                          scale: 0.3,
                        }}
                        transition={{ duration: 1.1, delay: 0.9, ease: "easeOut" }}
                      />
                    );
                  })}
              </motion.button>

              <motion.div
                className={cn(
                  "absolute -left-28.75 w-57.5 cursor-pointer text-center",
                  above ? "bottom-18.5" : "top-18.5",
                )}
                onClick={() => select(i)}
                initial={{ opacity: 0, y: above ? -12 : 12 }}
                animate={{
                  opacity: revealed ? (reached ? 1 : 0.55) : 0,
                  y: revealed ? 0 : above ? -12 : 12,
                }}
                transition={{ duration: 0.6, delay: intro ? 0.5 + i * 0.18 : 0, ease }}
              >
                <span
                  className={cn(
                    "mb-1 block text-xs font-semibold tracking-eyebrow uppercase",
                    reached ? TEXT_TONE[s.tone] : "text-steel-text",
                  )}
                >
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <p className="m-0 text-lg leading-[1.3] font-semibold">{s.title}</p>
              </motion.div>
            </div>
          );
        })}
      </div>

      <div
        className="on-dark relative isolate mx-auto hidden max-w-245 grid-cols-[auto_1fr_auto] items-center gap-12 overflow-hidden rounded-3xl bg-navy px-12 pt-10 pb-13 text-snow/80 shadow-[0_28px_64px_-28px] shadow-navy/65 lg:grid"
        aria-live="polite"
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`n-${active}`}
            className="flex flex-col items-start gap-1.5 border-r border-snow/16 pr-12"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease }}
          >
            <span className="inline-flex items-center gap-2.5 text-sm font-semibold tracking-[0.22em] text-snow/72 uppercase before:h-0.5 before:w-5.5 before:bg-crimson before:content-['']">
              Step
            </span>
            <span className="flex items-baseline gap-2 font-serif text-[88px] leading-none font-bold tracking-display text-snow">
              {String(active + 1).padStart(2, "0")}
              <span className="text-[22px] font-semibold tracking-normal text-steel">
                /{String(STEPS.length).padStart(2, "0")}
              </span>
            </span>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`t-${active}`}
            initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -24, filter: "blur(6px)" }}
            transition={{ duration: 0.4, ease }}
          >
            <h3 className="mb-2.5 font-serif text-[28px] leading-[1.3] font-semibold tracking-heading text-snow">
              {step.title}
            </h3>
            <p className="m-0 text-base leading-body">{step.description}</p>
          </motion.div>
        </AnimatePresence>

        <div className="flex gap-3">
          <Button
            variant="outline-light"
            className="size-10 px-0"
            aria-label="Previous step"
            onClick={() => select(active - 1)}
          >
            <ArrowLeft className="size-4" aria-hidden="true" />
          </Button>
          <Button
            className="size-10 px-0 hover:border-crimson/80 hover:bg-crimson/80"
            aria-label="Next step"
            onClick={() => select(active + 1)}
          >
            <ArrowRight className="size-4" aria-hidden="true" />
          </Button>
        </div>

        {/* Segmented progress along the bottom edge: one segment per step */}
        <div className="absolute right-12 bottom-5 left-12 grid grid-cols-5 gap-2">
          {STEPS.map((s, i) => {
            const state =
              i < active
                ? "done"
                : i > active
                  ? "idle"
                  : playing
                    ? "run"
                    : autoplay
                      ? "idle"
                      : "done";
            return (
              <button
                key={s.title}
                type="button"
                className={cn(
                  "relative h-4 cursor-pointer border-0 bg-transparent p-0",
                  "before:absolute before:inset-x-0 before:top-1.5 before:h-0.75 before:rounded-xs before:bg-snow/18 before:content-['']",
                  "after:absolute after:inset-x-0 after:top-1.5 after:h-0.75 after:origin-left after:rounded-xs after:bg-crimson after:content-['']",
                  state === "done" && "after:scale-x-100",
                  state === "idle" && "after:scale-x-0",
                  state === "run" && "after:animate-fill-x",
                )}
                aria-label={`Go to step ${i + 1}: ${s.title}`}
                aria-current={i === active ? "step" : undefined}
                onClick={() => select(i)}
              />
            );
          })}
        </div>
      </div>

      <ol className="relative m-0 p-0 lg:hidden">
        <span
          className="absolute top-7 bottom-7 left-6.75 w-0.5 bg-[repeating-linear-gradient(to_bottom,var(--color-steel)_0_6px,transparent_6px_12px)]"
          aria-hidden
        >
          <motion.span
            className="absolute inset-0 origin-top bg-linear-to-b from-navy to-crimson"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: revealed ? active / LAST : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, ease }}
          />
        </span>

        {STEPS.map((s, i) => {
          const isActive = i === active;
          const reached = i <= active;
          return (
            <motion.li
              key={s.title}
              className={cn("relative flex gap-5", i === LAST ? "pb-0" : "pb-9")}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: revealed ? 1 : 0, x: revealed ? 0 : -16 }}
              transition={{ duration: 0.5, delay: intro ? i * 0.1 : 0, ease }}
            >
              <motion.button
                type="button"
                className="grid size-14 flex-none cursor-pointer place-items-center rounded-full border-[1.5px] p-0"
                aria-label={`Step ${i + 1}: ${s.title}`}
                aria-pressed={isActive}
                onClick={() => select(i)}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isActive ? s.accent : reached ? colors.snow : colors.white,
                  borderColor: reached ? s.accent : colors.steel,
                  color: isActive ? colors.snow : reached ? s.accent : colors.steel,
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <StepIcon key={isActive ? "on" : "off"} name={s.icon} size={22} />
              </motion.button>
              <div className="pt-1" onClick={() => select(i)}>
                <span
                  className={cn(
                    "block text-xs font-semibold tracking-eyebrow uppercase",
                    reached ? TEXT_TONE[s.tone] : "text-steel-text",
                  )}
                >
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-1 mb-1.5 text-lg font-semibold">{s.title}</h3>
                <p className="m-0 text-ui leading-body text-steel-text">{s.description}</p>
              </div>
            </motion.li>
          );
        })}
      </ol>
    </div>
  );
}
