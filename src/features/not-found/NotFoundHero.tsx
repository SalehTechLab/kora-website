"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Button, Container, Eyebrow, Section } from "@/components/ui";
import { ease } from "@/lib/motion";
import PointerField from "./PointerField";
import RerouteBar from "./RerouteBar";
import TrackerCard from "./TrackerCard";

const LINE = {
  hidden: { y: "115%" },
  show: { y: 0, transition: { duration: 0.95, ease } },
};

export default function NotFoundHero() {
  const reduceMotion = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduceMotion ? false : { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease },
  });

  return (
    <Section
      tone="navy"
      space="none"
      aria-labelledby="not-found-heading"
      className="isolate flex min-h-[calc(100svh-var(--spacing-nav))] flex-col"
    >
      <PointerField />

      <Container wide className="grid flex-1 items-center gap-12 py-12 lg:grid-cols-12 lg:gap-8 lg:py-10">
        <div className="lg:col-span-7">
          <motion.div {...rise(0.9)}>
            <Eyebrow light rule className="text-snow/80">
              Error 404 · Route not found
            </Eyebrow>
          </motion.div>

          <motion.h1
            id="not-found-heading"
            initial={reduceMotion ? false : "hidden"}
            animate="show"
            transition={{ staggerChildren: 0.14, delayChildren: 1 }}
            className="mb-6 font-serif text-[length:clamp(2.6rem,9vw,3.6rem)] leading-none font-semibold tracking-display text-white lg:text-[length:clamp(3rem,5vw,5rem)]"
          >
            <span className="block overflow-hidden pb-2">
              <motion.span variants={LINE} className="block">
                We deliver.
              </motion.span>
            </span>
            <span className="block overflow-hidden pb-3">
              <motion.span variants={LINE} className="block">
                {/* Crimson is too dim for big type on navy, so the accent is white italic with a crimson underline */}
                <span className="animate-underline-draw bg-linear-to-r from-crimson to-crimson bg-size-[0%_0.075em] bg-position-[0_92%] bg-no-repeat font-medium text-white italic">
                  Just not this page.
                </span>
              </motion.span>
            </span>
          </motion.h1>

          <motion.p {...rise(1.5)} className="mb-9 max-w-125 text-lead leading-body text-snow/80">
            The link may be old, or the address mistyped. Either way, the shipment never reached us.
            Pick a route below, or tell us what you were looking for and we&rsquo;ll find it.
          </motion.p>

          <motion.div {...rise(1.65)} className="flex flex-wrap gap-4">
            <Button href="/" variant="light" size="lg">
              Back to home
            </Button>
            <Button href="/contact-us" variant="outline-light" size="lg">
              Talk to our team
            </Button>
          </motion.div>
        </div>

        <div className="lg:col-span-5">
          <TrackerCard />
        </div>
      </Container>

      <RerouteBar />
    </Section>
  );
}
