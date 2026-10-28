"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button, Container, Section, Eyebrow } from "@/components/ui";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import CatalogueCover from "./CatalogueCover";
import { PRODUCTS } from "./productData";

const WORDS: { text: string; accent?: boolean }[][] = [
  [{ text: "Every" }, { text: "commodity." }],
  [{ text: "Sourced,", accent: true }, { text: "procured," }],
  [{ text: "delivered." }],
];

const FAN_CENTER = (PRODUCTS.length - 1) / 2;

export default function ProductsHero() {
  const reduceMotion = useReducedMotion();

  let wordIndex = 0;

  return (
    <Section
      tone="navy"
      space="none"
      aria-labelledby="products-heading"
      className={cn(
        "isolate bg-[image:radial-gradient(ellipse_60%_90%_at_78%_55%,color-mix(in_srgb,var(--color-crimson)_22%,transparent)_0%,transparent_62%)]",
        "before:absolute before:inset-0 before:-z-1 before:bg-[url('/images/patterns/logistics-doodle.svg')] before:bg-size-[440px] before:bg-center before:opacity-6 before:content-['']",
      )}
    >
      <Container className="grid items-center gap-8 pt-16 pb-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-12 lg:pt-24 lg:pb-22">
        <div>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <Eyebrow light rule className="text-snow/70">
              Products &amp; Sourcing
            </Eyebrow>
          </motion.div>

          <h1
            id="products-heading"
            className="mb-6 font-serif text-hero leading-[1.02] font-bold tracking-display text-snow"
          >
            {WORDS.map((line, li) => (
              <span key={li} className="block">
                {line.map(({ text, accent }) => {
                  const delay = 0.15 + wordIndex++ * 0.09;
                  // Each word sits in an overflow mask so it can rise into place
                  return (
                    <span
                      key={text + delay}
                      className="-mr-[0.04em] inline-block overflow-hidden pt-[0.06em] pr-[0.12em] pb-[0.14em] align-bottom"
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
                        {text}{" "}
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
              Seven core catalogues, from Himalayan salt to surgical steel.
              And if what you need isn&rsquo;t on the list, name it: we will
              find it, procure it and deliver it.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button
                size="lg"
                href="#salt"
                className="hover:border-white hover:bg-white hover:text-navy"
              >
                Browse the catalogues
                <ChevronDown className="size-4" aria-hidden="true" />
              </Button>
              <Button variant="outline-light" size="lg" href="#anything">
                Request a product
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
            </div>
          </motion.div>
        </div>

        <div
          role="group"
          aria-label="Product catalogue covers"
          className="relative mx-auto aspect-[1/1.05] w-full max-w-85 lg:max-w-105 lg:-translate-y-[89px]"
        >
          {PRODUCTS.map((product, i) => {
            const t = i - FAN_CENTER;
            return (
              <motion.a
                key={product.id}
                href={`#${product.id}`}
                className="absolute bottom-[6%] left-[28%] block w-[44%] origin-[50%_130%] cursor-pointer rounded-md shadow-[0_18px_40px_-12px] shadow-ink/55 focus-visible:outline-offset-4"
                style={{ zIndex: 20 - Math.round(Math.abs(t) * 2) }}
                initial={
                  reduceMotion
                    ? false
                    : { opacity: 0, y: 80, rotate: 0, x: "0%" }
                }
                animate={{ opacity: 1, y: 0, rotate: t * 6, x: `${t * 12}%` }}
                whileHover={
                  reduceMotion
                    ? undefined
                    : { y: -34, scale: 1.06, zIndex: 40, transition: { duration: 0.3 } }
                }
                transition={{
                  duration: 1.1,
                  delay: 0.35 + i * 0.07,
                  ease,
                }}
              >
                <CatalogueCover product={product} index={i} flat />
              </motion.a>
            );
          })}
          <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 text-micro tracking-eyebrow whitespace-nowrap text-snow/50 uppercase">
            Hover &amp; pick a catalogue
          </span>
        </div>
      </Container>
    </Section>
  );
}
