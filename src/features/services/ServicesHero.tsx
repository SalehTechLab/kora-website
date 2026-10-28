"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, MotionConfig, useReducedMotion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Button, Container, Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const STEPS = [
  "Brief received",
  "Supplier matched",
  "Price agreed",
  "Quality approved",
  "In transit",
  "Cleared & delivered",
];

// The deal file works through its stages, stamps itself, then starts over
function DealFile() {
  const reduce = useReducedMotion();
  const [liveStep, setStep] = useState(0);
  const step = reduce ? STEPS.length : liveStep;

  useEffect(() => {
    if (reduce) return;
    let timer: number;
    const tick = (s: number) => {
      setStep(s);
      const next = s >= STEPS.length ? 0 : s + 1;
      const wait = s === 0 ? 1100 : s >= STEPS.length ? 3200 : 1000;
      timer = window.setTimeout(() => tick(next), wait);
    };
    timer = window.setTimeout(() => tick(1), 1700);
    return () => window.clearTimeout(timer);
  }, [reduce]);

  const done = step >= STEPS.length;

  return (
    <motion.div
      // the physical folder cue: a second sheet peeking out behind (::before)
      className="relative mt-2 w-full max-w-115 self-center rounded-[6px_20px_20px_20px] bg-snow px-6.5 pt-7 pb-6.5 text-navy shadow-[0_40px_80px_-20px] shadow-ink/55 inset-shadow-[0_2px_0] inset-shadow-white/50 before:absolute before:top-2.5 before:-right-2.5 before:-bottom-2.5 before:left-2.5 before:-z-10 before:rounded-[6px_20px_20px_20px] before:bg-steel/45 before:content-[''] lg:mt-0 lg:justify-self-end"
      initial={{ opacity: 0, y: 48, rotate: 3 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1, delay: 0.5, ease }}
    >
      <div className="absolute -top-6.5 left-0 rounded-t-md bg-crimson px-4 pt-1.75 pb-1.5 text-micro font-semibold tracking-eyebrow text-white uppercase">
        Sample deal file
      </div>
      <div className="flex items-center justify-between gap-4 pb-5">
        <div>
          <p className="text-micro font-semibold tracking-eyebrow text-crimson uppercase">
            Basmati rice
          </p>
          <p className="mt-1 font-serif text-[1.55rem] font-semibold tracking-heading">
            Lahore → Munich
          </p>
        </div>
        <Image
          src="/images/commodities/rice-photo.jpg"
          alt=""
          width={72}
          height={72}
          className="size-14 rounded-full object-cover ring-3 ring-white"
        />
      </div>

      <div className="mb-4.5 h-0.75 overflow-hidden rounded-xs bg-mist" aria-hidden="true">
        <motion.span
          className="block h-full w-full origin-left bg-crimson"
          animate={{ scaleX: step / STEPS.length }}
          transition={{ duration: 0.7, ease }}
        />
      </div>

      <ol className="flex flex-col">
        {STEPS.map((label, i) => {
          const complete = i < step;
          const current = i === step && !done;
          return (
            <li
              key={label}
              className={cn(
                "grid grid-cols-[26px_1fr_auto] items-center gap-3.5 border-t border-steel/35 py-2.75 text-ui font-medium text-steel-text transition-colors duration-300",
                (complete || current) && "text-navy",
              )}
            >
              <motion.span
                className={cn(
                  "grid size-5.5 place-items-center rounded-full border-[1.5px] border-steel text-micro text-white transition-[background-color,border-color] duration-300",
                  complete && "border-navy bg-navy",
                  current && "border-crimson ring-4 ring-crimson/15",
                )}
                animate={{ scale: complete ? [0.6, 1.18, 1] : 1 }}
                transition={{ duration: 0.45, ease }}
              >
                {complete && <Check className="size-[1em]" aria-hidden="true" />}
              </motion.span>
              <span>{label}</span>
              <span
                className={cn(
                  "text-micro font-semibold tracking-caps text-steel-text uppercase",
                  current && "text-crimson",
                )}
              >
                {complete ? "Done" : current ? "In progress" : ""}
              </span>
            </li>
          );
        })}
      </ol>

      <motion.div
        className="pointer-events-none absolute right-5.5 bottom-9.5 rounded-md border-3 border-crimson bg-snow/90 px-4.5 pt-2 pb-1.5 font-serif text-2xl font-bold tracking-caps text-crimson uppercase"
        aria-hidden="true"
        initial={false}
        animate={
          done
            ? { opacity: 1, scale: 1, rotate: -9 }
            : { opacity: 0, scale: 2.3, rotate: -9 }
        }
        transition={{ duration: done ? 0.35 : 0.2, ease }}
      >
        Delivered
      </motion.div>
    </motion.div>
  );
}

export default function ServicesHero() {
  return (
    <MotionConfig reducedMotion="user">
      <Section tone="navy" space="none" className="isolate" aria-labelledby="services-hero-heading">
        <div
          className="absolute inset-0 -z-20 bg-[radial-gradient(ellipse_50%_70%_at_85%_40%,color-mix(in_srgb,var(--color-crimson)_28%,transparent),transparent_65%),radial-gradient(ellipse_40%_50%_at_5%_100%,color-mix(in_srgb,var(--color-steel)_14%,transparent),transparent_70%)]"
          aria-hidden="true"
        />
        {/* Engineering-paper grid, fading out toward the bottom */}
        <div
          className="absolute inset-0 -z-10 [mask-image:linear-gradient(180deg,black_0%,transparent_85%)] bg-size-[56px_56px] bg-[linear-gradient(color-mix(in_srgb,var(--color-steel)_9%,transparent)_1px,transparent_1px),linear-gradient(90deg,color-mix(in_srgb,var(--color-steel)_9%,transparent)_1px,transparent_1px)]"
          aria-hidden="true"
        />

        <Container wide className="grid grid-cols-1 gap-12 pt-14 pb-12 lg:grid-cols-[7fr_5fr] lg:gap-16 lg:px-12 lg:pt-24 lg:pb-20">
          <div>
            <motion.p
              className="mb-7 flex items-center gap-3.5 text-xs font-semibold tracking-eyebrow text-steel uppercase"
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <span className="h-0.5 w-11 bg-crimson" />
              Services
            </motion.p>

            <motion.h1
              id="services-hero-heading"
              className="font-serif text-[clamp(2.6rem,10vw,5.6rem)] leading-none font-semibold tracking-display text-white"
              initial="hidden"
              animate="show"
              transition={{ staggerChildren: 0.16, delayChildren: 0.15 }}
            >
              {["“We need it.”", "“It’s here.”"].map((line, i) => (
                <span key={line} className="-mb-[0.1em] block overflow-hidden pt-[0.04em] pb-[0.16em]">
                  <motion.span
                    // Crimson is too dim for display type on navy: white italic + crimson rule
                    className={cn(
                      "block",
                      i === 1 &&
                        "w-fit font-medium italic underline decoration-crimson decoration-[0.06em] underline-offset-[0.14em]",
                    )}
                    variants={{ hidden: { y: "112%" }, show: { y: "0%" } }}
                    transition={{ duration: 1, ease }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              className="mt-7 max-w-130 text-[clamp(1rem,0.9rem+0.4vw,1.18rem)] leading-body text-snow/80"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease }}
            >
              Everything in between is our job. Sourcing, procurement, quality
              control, logistics and customs, run as one accountable service by
              a team in Munich and Lahore.
            </motion.p>

            <motion.div
              className="mt-9 flex flex-wrap gap-3.5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.85, ease }}
            >
              <Button
                href="/contact-us"
                size="lg"
                className="h-13 gap-2.5 px-7 text-ui hover:gap-4"
              >
                Get a Quote
                <ArrowRight className="size-[1em]" aria-hidden="true" />
              </Button>
              <Button
                href="#services"
                variant="outline-light"
                size="lg"
                className="h-13 px-7 text-ui"
              >
                See the six services
              </Button>
            </motion.div>
          </div>

          <DealFile />
        </Container>
      </Section>
    </MotionConfig>
  );
}
