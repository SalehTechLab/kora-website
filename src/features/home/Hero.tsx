"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  AnimatePresence,
  motion,
  MotionConfig,
  useScroll,
  useTransform,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button, Container, Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { COMMODITIES } from "./commodities";

const HEADLINE = ["We Source.", "We Procure.", "We Deliver."];

// How each commodity travels on its lane
const MODE: Record<string, "sea" | "air"> = {
  salt: "sea",
  surgical: "air",
  tyres: "sea",
  industrial: "sea",
  rice: "sea",
  textiles: "air",
  bopp: "sea",
};

const MODE_ICON = {
  sea: {
    label: "By sea",
    paths: ["M3 14h18l-2.5 6h-13z", "M7 14V9h10v5", "M10.5 9V5h3v4"],
  },
  air: {
    label: "By air",
    paths: [
      "M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z",
    ],
  },
} as const;

const byId = (id: string) => COMMODITIES.find((c) => c.id === id)!;

// Three lanes of real product photography drifting in opposite directions
const LANES = [
  { dir: "up", seconds: 54, ids: ["salt", "tyres", "textiles"] },
  { dir: "down", seconds: 62, ids: ["rice", "surgical", "bopp"] },
  { dir: "up", seconds: 70, ids: ["industrial", "textiles", "salt"] },
] as const;

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const [popup, setPopup] = useState<{ key: number; index: number } | null>(
    null,
  );

  // Slide an "active trade lane" message up from the bottom of the frame, hold
  // it, clear it, then show a different commodity. Client-side only, so the
  // random pick never touches server rendering.
  useEffect(() => {
    let timer: number;
    let last = -1;
    let key = 0;
    const show = () => {
      let index = last;
      while (index === last) {
        index = Math.floor(Math.random() * COMMODITIES.length);
      }
      last = index;
      setPopup({ key: key++, index });
      timer = window.setTimeout(hide, 3400);
    };
    const hide = () => {
      setPopup(null);
      timer = window.setTimeout(show, 900);
    };
    timer = window.setTimeout(show, 1800);
    return () => window.clearTimeout(timer);
  }, []);
  const current = popup ? COMMODITIES[popup.index] : null;

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const copyOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <MotionConfig reducedMotion="user">
      <Section
        ref={heroRef}
        tone="navy"
        space="none"
        className="isolate w-full lg:flex lg:min-h-[calc(100svh-73px)]"
        aria-labelledby="hero-heading"
      >
        <Container className="grid max-w-wide grid-cols-1 px-6 md:px-6 lg:w-full lg:flex-1 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-12 lg:px-12">
          <motion.div
            className="relative z-2 pt-14 pb-10 lg:py-18"
            style={{ y: copyY, opacity: copyOpacity }}
          >
            <p className="mb-7 flex animate-fade-up items-center gap-3.5 text-eyebrow font-semibold tracking-eyebrow text-steel uppercase [animation-delay:0.05s]">
              <span className="block h-0.5 w-11 bg-crimson" aria-hidden="true" />
              Global Markets. One Trusted Partner.
            </p>

            <h1
              id="hero-heading"
              className="font-serif text-[length:clamp(2.2rem,9vw,3.2rem)] leading-none font-semibold tracking-display text-white lg:text-[length:clamp(2.8rem,4.6vw,4.8rem)]"
            >
              {HEADLINE.map((line, i) => (
                /* Each line rises out of its own mask */
                <span
                  key={line}
                  className="-mb-[0.1em] block overflow-hidden pt-[0.04em] pb-[0.14em]"
                >
                  <motion.span
                    className={cn(
                      "block origin-[0_100%] will-change-transform",
                      /* Crimson is too dim for large type on navy, so the accent is white italic
                         with a crimson rule that draws in under it */
                      i === HEADLINE.length - 1 &&
                        "w-fit animate-underline-draw bg-linear-to-r from-crimson to-crimson bg-size-[0%_0.075em] bg-position-[0_92%] bg-no-repeat font-medium text-white italic",
                    )}
                    initial={{ y: "115%", rotate: 4 }}
                    animate={{ y: "0%", rotate: 0 }}
                    transition={{ duration: 0.8, delay: 0.1 + i * 0.08, ease }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* CSS entrance, not framer-motion: this paragraph is the LCP element, and a JS
                entrance keeps it at opacity 0 until the whole page has hydrated */}
            <p className="mt-8 max-w-130 animate-fade-up text-body-lg leading-body text-snow/75 [animation-delay:0.2s]">
              KORA connects businesses to global opportunities, suppliers and
              markets, with end-to-end sourcing, procurement and logistics,
              from the first order to final delivery.
            </p>

            <motion.div
              className="mt-9 flex flex-wrap gap-3.5"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease }}
            >
              <Button
                href="/contact-us"
                size="lg"
                className="group h-13.5 px-7 hover:border-white hover:bg-white hover:text-crimson"
              >
                Get a Quote
                <ArrowRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-400 ease-expo group-hover:translate-x-1"
                />
              </Button>
              <Button
                href="/products"
                variant="outline-light"
                size="lg"
                className="group h-13.5 px-7"
              >
                Explore Products
                <ArrowRight
                  aria-hidden="true"
                  className="size-3.5 transition-transform duration-400 ease-expo group-hover:translate-x-1"
                />
              </Button>
            </motion.div>
          </motion.div>

          {/* Flat navy card, a step lighter than the page so it reads as a frame */}
          <motion.div
            className="relative z-1 mb-10 aspect-square w-full rounded-lg border border-steel/30 bg-steel/14 p-3.5 lg:m-0 lg:w-[min(100%,calc(100svh-150px),660px)] lg:justify-self-end lg:p-4.5"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease }}
          >
            <div
              className="relative grid size-full grid-cols-3 gap-2.5 overflow-hidden rounded-[6px] lg:gap-3.5 lg:rounded-md"
              aria-hidden="true"
            >
              {LANES.map((l, li) => (
                <div key={li} className={cn("relative", li === 1 && "mt-10 lg:mt-16")}>
                  <div
                    className={cn(
                      "flex flex-col gap-2.5 will-change-transform motion-reduce:animate-none lg:gap-3.5",
                      l.dir === "down" ? "animate-lane-down" : "animate-lane-up",
                    )}
                    style={{ animationDuration: `${l.seconds}s` }}
                  >
                    {[0, 1].map((copy) =>
                      l.ids.map((id) => {
                        const c = byId(id);
                        return (
                          <figure
                            className="group relative aspect-3/4 shrink-0 overflow-hidden rounded-[6px] bg-ink after:absolute after:inset-0 after:bg-linear-to-t after:from-navy/55 after:to-navy/0 after:to-45% after:content-[''] lg:rounded-md"
                            key={`${copy}-${id}`}
                          >
                            <Image
                              src={c.image!}
                              alt=""
                              fill
                              sizes="(max-width: 991px) 30vw, 17vw"
                              fetchPriority={li === 0 && copy === 0 ? "high" : undefined}
                              className="object-cover transition-transform duration-800 ease-expo lg:group-hover:scale-108"
                            />
                            <figcaption className="absolute bottom-2 left-2 z-1 max-w-[calc(100%-1rem)] rounded-sm border border-snow/20 bg-navy/55 px-2 py-1 text-micro leading-tight font-semibold tracking-caps text-white uppercase backdrop-blur-[10px] sm:bottom-3 sm:left-3 sm:px-2.75 sm:py-1.5 lg:bottom-3.5 lg:left-3.5">
                              {c.tab}
                            </figcaption>
                          </figure>
                        );
                      }),
                    )}
                  </div>
                </div>
              ))}
            </div>

            <AnimatePresence mode="wait">
              {popup && current && (
                /* Docked along the bottom of the frame, above the photos */
                <motion.aside
                  key={popup.key}
                  className="pointer-events-none absolute inset-x-7 bottom-7 z-3 flex flex-wrap items-center justify-between gap-x-5 gap-y-2.5 rounded-md border border-snow/28 bg-navy px-4.5 pt-3.5 pb-4 shadow-lift lg:inset-x-9 lg:bottom-9"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 16 }}
                  transition={{ duration: 0.4, ease }}
                  role="status"
                >
                  <div className="flex basis-full items-center justify-between gap-3">
                    <span className="flex items-center gap-2 text-micro font-semibold tracking-eyebrow text-steel uppercase">
                      <span
                        className="relative size-2 rounded-full bg-crimson after:absolute after:inset-0 after:animate-ping-dot after:rounded-full after:bg-crimson after:content-[''] motion-reduce:after:animate-none"
                        aria-hidden="true"
                      />
                      Active trade lane
                    </span>
                    <svg
                      className="size-5.5 fill-none stroke-white stroke-[1.6]"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      viewBox="0 0 24 24"
                      role="img"
                      aria-label={MODE_ICON[MODE[current.id]].label}
                    >
                      {MODE_ICON[MODE[current.id]].paths.map((d) => (
                        <path key={d} d={d} />
                      ))}
                    </svg>
                  </div>
                  <div className="flex items-center gap-3 font-serif text-lg font-semibold text-white">
                    <span>{current.from}</span>
                    <span
                      className="relative h-0 min-w-9 flex-1 border-t border-dashed border-snow/55"
                      aria-hidden="true"
                    >
                      <span className="absolute -top-1 left-0 size-1.75 animate-travel rounded-full bg-crimson motion-reduce:animate-none" />
                    </span>
                    <span>{current.to}</span>
                  </div>
                  <p className="ml-auto text-right text-xs text-snow/70">{current.name}</p>
                </motion.aside>
              )}
            </AnimatePresence>
          </motion.div>
        </Container>
      </Section>
    </MotionConfig>
  );
}
