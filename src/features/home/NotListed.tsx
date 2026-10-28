"use client";

import { useEffect, useState } from "react";
import { ArrowRight, Check, Search } from "lucide-react";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import { Button, Container, Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

// Things a visitor might be hunting for, typed into the demo request
const EXAMPLES = [
  "Solar panels",
  "Construction steel",
  "Packaging machinery",
  "Medical consumables",
  "Furniture",
  "Spices & pulses",
];

type Stage = "typing" | "searching" | "found";

const C = 250; // map centre

// Abstract supplier network: angle (deg), radius, optional country label
const NODES = [
  { a: -80, r: 150, label: "Germany" },
  { a: -28, r: 205, label: "Pakistan" },
  { a: 22, r: 150, label: "India" },
  { a: 68, r: 210, label: "UAE" },
  { a: 118, r: 150, label: "Indonesia" },
  { a: 165, r: 205, label: "America" },
  { a: 212, r: 150, label: "Netherlands" },
  { a: 250, r: 215, label: "Denmark" },
  { a: -55, r: 95 },
  { a: 48, r: 90 },
  { a: 140, r: 95 },
  { a: 232, r: 92 },
  { a: -8, r: 112, label: "Austria" },
  { a: 96, r: 205, label: "Australia" },
] as const;

const point = (a: number, r: number) => ({
  x: C + r * Math.cos((a * Math.PI) / 180),
  y: C + r * Math.sin((a * Math.PI) / 180),
});

export default function NotListed() {
  const reduce = useReducedMotion();
  const [phrase, setPhrase] = useState(0);
  const [liveTyped, setTyped] = useState("");
  const [liveStage, setStage] = useState<Stage>("typing");
  const [target, setTarget] = useState(0);

  // Reduced motion holds on a finished result instead of looping
  const typed = reduce ? EXAMPLES[0] : liveTyped;
  const stage: Stage = reduce ? "found" : liveStage;

  // typing → searching → found → next phrase
  useEffect(() => {
    if (reduce) return;
    const word = EXAMPLES[phrase];
    let timer: number;
    let i = 0;

    const type = () => {
      i += 1;
      setTyped(word.slice(0, i));
      if (i < word.length) {
        timer = window.setTimeout(type, 65);
      } else {
        timer = window.setTimeout(() => {
          setStage("searching");
          timer = window.setTimeout(() => {
            setTarget(Math.floor(Math.random() * NODES.length));
            setStage("found");
            timer = window.setTimeout(() => {
              setTyped("");
              setStage("typing");
              setPhrase((p) => (p + 1) % EXAMPLES.length);
            }, 2600);
          }, 2200);
        }, 450);
      }
    };

    timer = window.setTimeout(type, 500);
    return () => window.clearTimeout(timer);
  }, [phrase, reduce]);

  const tp = point(NODES[target].a, NODES[target].r);

  return (
    <MotionConfig reducedMotion="user">
      <Section
        tone="navy"
        space="none"
        className="py-22 lg:py-32"
        aria-labelledby="not-listed-heading"
      >
        <Container className="grid max-w-wide grid-cols-1 gap-12 md:px-5 lg:grid-cols-2 lg:items-center lg:gap-18 lg:px-12">
          <div>
            <motion.p
              className="mb-4.5 text-eyebrow font-semibold tracking-eyebrow text-steel uppercase"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              Beyond the catalogue
            </motion.p>

            <motion.h2
              id="not-listed-heading"
              className="font-serif text-[length:clamp(1.6rem,2.8vw,2.25rem)] leading-[1.1] font-semibold tracking-heading text-white"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.5 }}
              transition={{ staggerChildren: 0.12 }}
            >
              {["Can’t find your product in the list above?", "Don’t worry, we’ll find it for you."].map(
                (line, i) => (
                  <span key={line} className="-mb-[0.1em] block overflow-hidden pt-[0.04em] pb-[0.14em]">
                    <motion.span
                      className={cn(
                        "block text-balance",
                        /* Crimson is too dim for display type on navy: white italic with a crimson rule */
                        i === 1 &&
                          "w-fit max-w-full font-medium italic underline decoration-crimson decoration-[0.06em] underline-offset-[0.14em]",
                      )}
                      variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
                      transition={{ duration: 0.9, ease }}
                    >
                      {line}
                    </motion.span>
                  </span>
                ),
              )}
            </motion.h2>

            <motion.p
              className="mt-6 mb-8 max-w-135 text-body-lg leading-body text-snow/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.25, ease }}
            >
              That list is only where we started. Our supplier network reaches
              far past it, so if what you need isn&rsquo;t here, it probably
              isn&rsquo;t out of reach. Tell us what you&rsquo;re after and we
              will track down suppliers, shortlist the best options and handle
              the rest, all the way to your door. Just get in touch.
            </motion.p>

            {/* Demo request: a visitor types a product, the network answers */}
            <motion.div
              className="mb-7 flex min-h-15 max-w-135 items-center gap-3.5 rounded-md border border-steel/35 bg-steel/14 py-0 pr-4 pl-4.5"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.35, ease }}
              aria-hidden="true"
            >
              <Search className="size-4 text-steel" aria-hidden="true" />
              <span className="min-w-0 flex-1 truncate text-base font-medium text-white">
                {typed}
                <span
                  className={cn(
                    "ml-0.75 inline-block h-[1.1em] w-0.5 bg-crimson align-text-bottom",
                    stage === "typing" ? "animate-caret-blink motion-reduce:animate-none" : "opacity-0",
                  )}
                />
              </span>
              <span
                className={cn(
                  "inline-flex shrink-0 items-center gap-2 rounded-sm border px-2.5 py-1.5 text-micro font-semibold tracking-caps uppercase",
                  stage === "found"
                    ? "border-crimson bg-crimson text-white"
                    : "border-steel/35 text-snow/80",
                )}
              >
                {stage === "typing" && "Your request"}
                {stage === "searching" && (
                  <>
                    <span className="size-1.75 animate-dot-beat rounded-full bg-crimson motion-reduce:animate-none" />
                    Searching our network
                  </>
                )}
                {stage === "found" && (
                  <>
                    <Check className="size-[1em]" aria-hidden="true" />
                    Supplier found
                  </>
                )}
              </span>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.45, ease }}
            >
              <Button href="/contact-us" size="lg">
                Request a Product
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1, ease }}
            aria-hidden="true"
          >
            <svg viewBox="-45 -10 590 520" className="h-auto w-full max-w-140 overflow-visible">
              {/* Orbit rings */}
              {[95, 150, 215].map((r) => (
                <circle
                  key={r}
                  cx={C}
                  cy={C}
                  r={r}
                  className="fill-none stroke-steel/28 stroke-1 [stroke-dasharray:3_7]"
                />
              ))}

              {/* Radar sweep */}
              <g className="origin-[250px_250px] animate-sweep motion-reduce:animate-none">
                <line x1={C} y1={C} x2={C} y2={C - 232} className="stroke-snow/25 stroke-1" />
              </g>

              {/* Spokes */}
              {NODES.map((n, i) => {
                const p = point(n.a, n.r);
                const hit = stage === "found" && i === target;
                return (
                  <line
                    key={i}
                    x1={C}
                    y1={C}
                    x2={p.x}
                    y2={p.y}
                    className={cn(
                      "stroke-steel/35 stroke-1 transition-[stroke,stroke-width] duration-400",
                      stage === "searching" && "animate-stroke-flash motion-reduce:animate-none",
                      stage === "found" && (hit ? "stroke-crimson stroke-[2.5]" : "stroke-steel/18"),
                    )}
                    style={{ animationDelay: `${i * 0.14}s` }}
                  />
                );
              })}

              {/* Search ping */}
              {stage === "searching" && (
                <>
                  <circle
                    cx={C}
                    cy={C}
                    r="40"
                    className="origin-[250px_250px] animate-ping-ring fill-none stroke-crimson stroke-2 motion-reduce:animate-none"
                  />
                  <circle
                    cx={C}
                    cy={C}
                    r="40"
                    className="origin-[250px_250px] animate-ping-ring fill-none stroke-crimson stroke-2 motion-reduce:animate-none"
                    style={{ animationDelay: "0.9s" }}
                  />
                </>
              )}

              {/* Nodes */}
              {NODES.map((n, i) => {
                const p = point(n.a, n.r);
                const hit = stage === "found" && i === target;
                const right = Math.cos((n.a * Math.PI) / 180) >= 0;
                return (
                  <g key={i}>
                    {hit && (
                      <circle
                        cx={p.x}
                        cy={p.y}
                        r="17"
                        className="origin-center animate-halo fill-crimson/28 [transform-box:fill-box] motion-reduce:animate-none"
                      />
                    )}
                    <circle
                      cx={p.x}
                      cy={p.y}
                      r={hit ? 8 : 5.5}
                      className={cn(
                        "transition-[fill,stroke] duration-300",
                        hit ? "fill-crimson stroke-white stroke-[2.5]" : "fill-navy stroke-steel stroke-2",
                      )}
                    />
                    {"label" in n && (
                      <text
                        x={p.x + (right ? 14 : -14)}
                        y={p.y + 4}
                        textAnchor={right ? "start" : "end"}
                        className={cn(
                          "stroke-navy stroke-4 font-sans text-micro font-semibold tracking-caps uppercase [paint-order:stroke] [stroke-linejoin:round]",
                          hit ? "fill-white" : "fill-steel",
                        )}
                      >
                        {n.label}
                      </text>
                    )}
                  </g>
                );
              })}

              {/* Match tag */}
              {stage === "found" && (
                <g
                  className="animate-fade-in"
                  transform={`translate(${Math.min(Math.max(tp.x, 70), 430)} ${
                    tp.y < C ? tp.y - 34 : tp.y + 34
                  })`}
                >
                  <rect x="-58" y="-14" width="116" height="28" rx="4" className="fill-white" />
                  <text
                    textAnchor="middle"
                    y="4"
                    className="fill-navy font-sans text-micro font-bold tracking-caps uppercase"
                  >
                    Match found
                  </text>
                </g>
              )}

              {/* Kora hub */}
              <circle cx={C} cy={C} r="40" className="fill-crimson stroke-snow/35 stroke-6" />
              <image
                href="/images/logo/kora-logo-mark.svg"
                x={C - 15}
                y={C - 17}
                width="30"
                height="34"
                className="brightness-0 invert"
              />
            </svg>
          </motion.div>
        </Container>
      </Section>
    </MotionConfig>
  );
}
