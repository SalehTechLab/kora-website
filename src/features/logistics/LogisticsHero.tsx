"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button, Container, Section, Eyebrow } from "@/components/ui";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import RouteIllustration from "./RouteIllustration";

const WORDS: { text: string; accent?: boolean }[][] = [
  [{ text: "Connecting" }, { text: "Trade." }],
  [{ text: "Delivering" }],
  [{ text: "Worldwide.", accent: true }],
];

export default function LogisticsHero() {
  const reduceMotion = useReducedMotion();
  let wordIndex = 0;

  return (
    <Section
      tone="navy"
      space="none"
      aria-labelledby="logistics-heading"
      className={cn(
        "isolate",
        "bg-[radial-gradient(ellipse_60%_90%_at_78%_55%,color-mix(in_srgb,var(--color-crimson)_22%,transparent)_0%,transparent_62%)]",
        "before:absolute before:inset-0 before:-z-10 before:bg-[url('/images/patterns/logistics-doodle.svg')] before:bg-size-[440px] before:bg-center before:opacity-6",
      )}
    >
      <Container className="grid items-center gap-8 pt-16 pb-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:pt-24 lg:pb-22">
        <div>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <Eyebrow light rule className="text-snow/70">
              Logistics
            </Eyebrow>
          </motion.div>

          <h1
            id="logistics-heading"
            className="mb-6 font-serif text-hero font-bold tracking-display text-snow"
          >
            {WORDS.map((line, li) => (
              <span key={li} className="block">
                {line.map(({ text, accent }) => {
                  const delay = 0.15 + wordIndex++ * 0.09;
                  return (
                    // Each word sits in an overflow mask so it can rise into place
                    <span
                      key={text}
                      className="mr-[0.02em] inline-block overflow-hidden pt-[0.06em] pr-[0.12em] pb-[0.14em] align-bottom"
                    >
                      <motion.span
                        className={cn(
                          "inline-block",
                          accent &&
                            "bg-linear-to-r from-crimson to-crimson bg-size-[100%_0.07em] bg-position-[0_92%] bg-no-repeat italic",
                        )}
                        initial={reduceMotion ? false : { y: "110%" }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.9, delay, ease }}
                      >
                        {text}
                      </motion.span>
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>

          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7, ease }}
          >
            <p className="mb-8 max-w-130 text-lead leading-body text-snow/80">
              From sourcing to delivery, Kora Traders coordinates
              international shipping through trusted logistics partners,
              connecting businesses across borders.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                variant="primary"
                size="lg"
                href="#logistics-services"
                className="hover:border-white hover:bg-white hover:text-navy"
              >
                Explore our services
                <ChevronDown className="size-4" aria-hidden />
              </Button>
              <Button variant="outline-light" size="lg" href="/contact-us#quote">
                Request a quote
                <ArrowRight className="size-4" aria-hidden />
              </Button>
            </div>
          </motion.div>
        </div>

        <RouteIllustration />
      </Container>
    </Section>
  );
}
