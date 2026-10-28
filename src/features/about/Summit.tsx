"use client";

import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import { ease, useReveal } from "@/lib/motion";
import { colors } from "@/theme/colors";

const OUTCOMES = [
  {
    title: "Supply you can plan around",
    description:
      "Vetted partners and premium products, so the next order is never a gamble.",
  },
  {
    title: "Prices that hold up",
    description:
      "Data-driven sourcing and transparent terms, with no surprises in the details.",
  },
  {
    title: "Delivery that lands on time",
    description:
      "We stay on every shipment until the job is done, not just until the intro.",
  },
];

const CLOUD =
  "M0 44 C0 34 10 28 20 31 C24 16 44 10 58 22 C66 12 86 16 88 30 C102 28 112 38 104 46 L8 46 C3 46 0 45 0 44 Z";

function Illustration() {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      className="block size-full [--case-shade:color-mix(in_srgb,var(--color-steel)_60%,var(--color-navy))] [--crown:color-mix(in_srgb,var(--color-crimson)_70%,var(--color-ink))] [--right-face:color-mix(in_srgb,var(--color-steel)_30%,var(--color-navy))] [--skin:color-mix(in_srgb,var(--color-steel)_58%,var(--color-white))]"
      viewBox="0 0 600 612"
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-label="A business owner standing on a summit, holding a trophy above the clouds"
    >
      {/* Distant cloud banks */}
      <path className="fill-steel"
        d="M0 470 C50 430 120 436 170 466 C220 440 290 446 330 476 C380 440 450 442 490 470 C530 452 570 458 600 478 L600 612 L0 612 Z"
        opacity={0.14}
      />
      <path className="fill-steel"
        d="M0 520 C60 488 130 496 180 520 C240 500 300 506 350 530 C410 502 480 508 530 528 C560 520 585 524 600 532 L600 612 L0 612 Z"
        opacity={0.22}
      />

      {/* Drifting clouds */}
      <g className="animate-drift motion-reduce:animate-none">
        <path className="fill-steel" d={CLOUD} opacity={0.22} transform="translate(70 96) scale(1.5)" />
      </g>
      <g className="animate-[drift_12s_ease-in-out_infinite_alternate-reverse] motion-reduce:animate-none">
        <path className="fill-steel" d={CLOUD} opacity={0.18} transform="translate(430 250) scale(1.15)" />
      </g>
      <g className="animate-[drift_15s_ease-in-out_infinite_alternate] motion-reduce:animate-none">
        <path className="fill-steel" d={CLOUD} opacity={0.16} transform="translate(40 330) scale(0.9)" />
      </g>

      <g transform="translate(0 40)">
        {/* Summit */}
        <path className="fill-ink" d="M255 400 L205 468 L120 494 L70 560 L215 560 L262 480 Z" />
        <path className="fill-navy" d="M255 400 L345 400 L352 462 L378 560 L215 560 L262 480 Z" />
        <path className="fill-(--right-face)" d="M345 400 L410 458 L495 484 L545 560 L378 560 L352 462 Z" />
        <path className="stroke-ink"
          d="M262 480 L305 492 L352 462 M305 492 L330 560"
          fill="none"
          strokeOpacity={0.55}
          strokeWidth={2}
          strokeLinejoin="round"
        />

        <motion.g
          initial={reduceMotion ? false : { y: 36, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.2, ease }}
        >
          {/* Legs and shoes */}
          <path className="fill-navy" d="M274 262 L328 258 L338 394 L314 394 L302 316 L288 394 L262 394 Z" />
          <path className="stroke-ink" d="M283 300 L276 392 M322 300 L326 392" fill="none" strokeOpacity={0.35} strokeWidth={2} />
          <rect className="fill-ink" x={254} y={392} width={38} height={9} rx={4.5} />
          <rect className="fill-ink" x={310} y={392} width={38} height={9} rx={4.5} />

          {/* Briefcase arm: rounded sleeve from the shoulder down to the hand */}
          <path className="stroke-navy"
            d="M272 184 C263 208 258 232 258 254"
            fill="none"
            strokeWidth={15}
            strokeLinecap="round"
          />
          <path className="stroke-ink"
            d="M268 192 C262 210 260 230 260 246"
            fill="none"
            strokeOpacity={0.35}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <circle className="fill-(--skin)" cx={257} cy={265} r={8.5} />
          <path className="stroke-navy" d="M250 272 V261 H272 V272" fill="none" strokeWidth={3} strokeLinejoin="round" />
          <rect className="fill-steel" x={232} y={270} width={56} height={44} rx={5} />
          <path className="fill-(--case-shade)" d="M232 294 H288 V309 a5 5 0 0 1 -5 5 H237 a5 5 0 0 1 -5 -5 Z" />

          {/* Raised arm: sleeve bends at the elbow and ends in a fist around the trophy */}
          <path className="stroke-navy"
            d="M334 180 C358 174 372 150 378 104"
            fill="none"
            strokeWidth={15}
            strokeLinecap="round"
          />
          <path className="stroke-ink"
            d="M340 172 C358 166 368 146 374 112"
            fill="none"
            strokeOpacity={0.35}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <circle className="fill-(--skin)" cx={380} cy={91} r={9.5} />

          {/* Shoulder caps close the gap where each sleeve meets the jacket */}
          <circle className="fill-navy" cx={337} cy={182} r={11} />
          <path className="fill-navy" d="M326 164 L352 160 L364 140 L346 150 Z" />
          <circle className="fill-navy" cx={346} cy={168} r={11} />
          <circle className="fill-navy" cx={332} cy={166} r={10} />
          <circle className="fill-navy" cx={271} cy={184} r={11} />

          {/* Torso: rounded shoulders, white shirt, lapels */}
          <path className="fill-navy"
            d="M262 186 C262 166 280 158 296 158 L312 158 C330 158 346 166 346 186 L350 262 Q308 276 264 266 Z"
          />
          {/* Suit front: white shirt, crimson tie, notch lapels, button and pocket square */}
          <path className="fill-white" d="M288 160 L318 160 L304 240 Z" />
          <path className="stroke-ink" d="M283 164 L304 240 L296 270 M325 164 L304 240 L312 270" fill="none" strokeOpacity={0.55} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          <path className="fill-ink" d="M276 184 L298 236 L284 244 Z M332 184 L310 236 L324 244 Z" opacity={0.28} />
          <path className="fill-white stroke-steel" d="M291 157 L304 176 L287 184 Z" strokeOpacity={0.55} strokeWidth={1.3} strokeLinejoin="round" />
          <path className="fill-white stroke-steel" d="M317 157 L304 176 L321 184 Z" strokeOpacity={0.55} strokeWidth={1.3} strokeLinejoin="round" />
          <path className="fill-crimson" d="M298 174 L310 174 L308 186 L300 186 Z" />
          <path className="fill-crimson" d="M300 186 L308 186 L312 232 L304 244 L296 232 Z" />
          <path className="stroke-ink" d="M304 190 L304 238" strokeOpacity={0.25} strokeWidth={1.4} />
          <circle className="fill-steel" cx={304} cy={254} r={2.8} />
          <path className="fill-white" d="M268 222 L280 219 L281 226 L269 229 Z" />
          <path className="stroke-ink" d="M264 266 Q308 277 350 262" fill="none" strokeOpacity={0.45} strokeWidth={2} strokeLinecap="round" />
          <rect className="fill-(--skin)" x={291} y={138} width={22} height={26} rx={6} />

          {/* Head */}
          <ellipse className="fill-(--skin)" cx={302} cy={122} rx={19} ry={23} />
          <path className="fill-ink"
            d="M282 120 C281 98 296 90 309 95 C320 91 327 102 321 112 C314 105 300 106 291 115 L287 128 Z"
          />

          {/* Raised arm and trophy */}
          <path className="fill-navy" d="M334 166 L354 162 L388 98 L368 88 Z" />
          <circle className="fill-(--skin)" cx={382} cy={84} r={9} />

          <g transform="translate(0 9)">
          <g className="animate-bob-sm motion-reduce:animate-none">
            <rect className="fill-ink" x={374} y={68} width={16} height={7} rx={1.5} />
            <rect className="fill-(--crown)" x={380} y={54} width={4} height={15} />
            <path className="fill-crimson" d="M362 22 H402 C402 46 394 55 382 55 C370 55 362 46 362 22 Z" />
            <path className="stroke-crimson"
              d="M362 27 C348 27 348 45 366 47 M402 27 C416 27 416 45 398 47"
              fill="none"
              strokeWidth={4}
              strokeLinecap="round"
            />
            <ellipse className="fill-white" cx={374} cy={34} rx={3} ry={5} opacity={0.55} />
          </g>
          </g>

          {/* Glints */}
          <g className="stroke-crimson"
            strokeWidth={4}
            strokeLinecap="round"
            fill="none"
          >
            <path className="animate-flash motion-reduce:animate-none" d="M342 16 L354 22" />
            <path className="animate-[flash_1.8s_ease-in-out_0.3s_infinite] motion-reduce:animate-none" d="M354 -2 L362 8" />
            <path className="animate-[flash_1.8s_ease-in-out_0.6s_infinite] motion-reduce:animate-none" d="M384 -10 L383 2" />
            <path className="animate-[flash_1.8s_ease-in-out_0.3s_infinite] motion-reduce:animate-none" d="M424 16 L412 22" />
            <path className="animate-flash motion-reduce:animate-none" d="M412 -2 L404 8" />
          </g>
        </motion.g>
      </g>
    </svg>
  );
}

export default function Summit() {
  const reveal = useReveal();
  const reduceMotion = useReducedMotion();
  const trailRef = useRef<HTMLOListElement>(null);

  // The rail draws as the list passes through the viewport
  const { scrollYProgress } = useScroll({
    target: trailRef,
    offset: ["start 70%", "end 65%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <Section
      aria-labelledby="summit-heading"
      tone="white"
      space="none"
      className="py-20 md:py-30"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-18">
          <div>
            <motion.div {...reveal()}>
              <Eyebrow>The Outcome</Eyebrow>
              <Heading as="h2" id="summit-heading" className="font-semibold">
                What a thriving business looks like.
              </Heading>
              <p className="mt-6 max-w-130 text-lg leading-body">
                When the right partners meet and the details hold, businesses
                stop reacting and start growing. That is the result we work
                toward on every deal.
              </p>
            </motion.div>

            <motion.div {...reveal(0.1)}>
              <ol ref={trailRef} aria-label="What you can expect" className="relative mt-10 list-none">
                {/* Track and progress share one rail, running through the centre of every node */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute top-2.5 bottom-2.5 left-1.25 w-0.5 rounded-xs bg-steel/30 mask-[linear-gradient(to_bottom,black_calc(100%-64px),transparent)]"
                >
                  <motion.span
                    className="block size-full origin-top rounded-xs bg-crimson"
                    style={{ scaleY: reduceMotion ? 1 : fill }}
                  />
                </span>
                {OUTCOMES.map((item) => (
                  <li key={item.title} className="relative pb-9 pl-10 last:pb-0">
                    <motion.span
                      aria-hidden
                      className={cn(
                        "absolute top-1.5 left-0 size-3 rounded-full border-2 shadow-[0_0_0_5px_var(--color-white)]",
                        reduceMotion ? "border-crimson bg-crimson" : "border-steel bg-white",
                      )}
                      {...(reduceMotion
                        ? {}
                        : {
                            initial: false,
                            whileInView: {
                              background: colors.crimson,
                              borderColor: colors.crimson,
                              scale: [1, 1.5, 1],
                            },
                            viewport: { once: true, margin: "0px 0px -40% 0px" },
                            transition: { duration: 0.6, ease },
                          })}
                    />
                    <h3 className="text-lg leading-[1.4] font-semibold">{item.title}</h3>
                    <p className="mt-1.5 text-sm leading-body text-steel-text">
                      {item.description}
                    </p>
                  </li>
                ))}
              </ol>

              <Button href="/contact-us" size="lg" className="mt-10">
                Start your climb
                <ArrowRight aria-hidden className="size-4" />
              </Button>
            </motion.div>
          </div>

          <motion.div
            className="relative isolate aspect-[1/1.02] overflow-hidden rounded-xl border border-steel/35 bg-linear-to-b from-white to-snow md:rounded-[28px]"
            {...reveal(0.1)}
          >
            <Illustration />
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
