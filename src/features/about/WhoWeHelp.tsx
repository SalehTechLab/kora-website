"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container, Eyebrow, Section } from "@/components/ui";
import { ease } from "@/lib/motion";

const HEADLINE = ["Built for", "businesses", "that feel", "left behind"];

const AUDIENCES = [
  "Businesses with no sourcing knowledge",
  "Well-resourced firms that still need support",
  "Small shop owners who want to expand",
  "Those without clearing agents or customs support",
  "Those who cannot find reliable suppliers",
  "Anyone told that fair pricing is a myth",
];

export default function WhoWeHelp() {
  const reduceMotion = useReducedMotion();

  const trigger = (amount: number) =>
    reduceMotion
      ? {}
      : {
          initial: "hidden",
          whileInView: "show",
          viewport: { once: true, amount },
        };

  const rise = (i: number): Variants => ({
    hidden: { y: "110%" },
    show: { y: 0, transition: { duration: 0.9, delay: i * 0.1, ease } },
  });

  const fade = (delay = 0): Variants => ({
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease } },
  });

  // Cards enter in reading order, left to right, top to bottom
  const card = (i: number): Variants => ({
    hidden: { opacity: 0, y: 36, "--rule": 0 } as never,
    show: {
      opacity: 1,
      y: 0,
      "--rule": 1,
      transition: {
        opacity: { duration: 0.7, delay: i * 0.09, ease },
        y: { duration: 0.8, delay: i * 0.09, ease },
        "--rule": { duration: 0.9, delay: 0.15 + i * 0.09, ease },
      },
    } as never,
  });

  return (
    <Section
      id="who-we-help"
      aria-labelledby="who-we-help-heading"
      tone="navy"
      space="none"
      className="py-20 md:py-30"
    >
      {/* Oversized brand mark bleeding off the edge, filled with a soft steel tint */}
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-1/2 -left-30 -mt-75 aspect-[640/714] w-95 bg-steel opacity-5 mask-[url('/images/logo/kora-logo-mark.svg')] mask-contain mask-center mask-no-repeat md:-left-35 md:w-140"
        {...(reduceMotion
          ? {}
          : {
              initial: { opacity: 0, x: -60 },
              whileInView: { opacity: 0.05, x: 0 },
              viewport: { once: true },
              transition: { duration: 1.6, ease },
            })}
      />
      <Container>
        <div className="relative grid items-start gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-18">
          {/* Headline stays pinned while the list scrolls past on wide screens */}
          <div className="lg:sticky lg:top-30">
            <Eyebrow light>Who We Help</Eyebrow>
            <h2
              id="who-we-help-heading"
              aria-label={HEADLINE.join(" ")}
              className="font-serif text-hero-sm leading-[1.06] font-semibold tracking-display text-snow"
            >
              <motion.span className="block" {...trigger(0.5)} aria-hidden>
                {HEADLINE.map((line, i) => (
                  <span
                    key={line}
                    className="block overflow-hidden pt-[0.04em] pb-[0.1em]"
                  >
                    <motion.span
                      className={
                        i === HEADLINE.length - 1 ? "block text-steel italic" : "block"
                      }
                      variants={rise(i)}
                    >
                      {line}
                    </motion.span>
                  </span>
                ))}
              </motion.span>
            </h2>
            <motion.div
              className="mt-7 max-w-105"
              variants={fade(0.35)}
              {...trigger(0.5)}
            >
              <p className="text-body-lg leading-body text-steel">
                If reliable sourcing has felt out of reach, Kora is the
                partner to turn to.
              </p>
            </motion.div>
          </div>

          <ul
            aria-label="Who Kora helps"
            className="m-0 grid list-none grid-cols-1 gap-3.5 p-0 sm:grid-cols-2 sm:gap-5"
          >
            {AUDIENCES.map((text, i) => (
              <motion.li
                key={text}
                variants={card(i)}
                className="relative flex items-center rounded-[4px_16px_16px_4px] bg-snow/4 px-7 py-6 transition-[background-color,translate] duration-500 ease-expo before:absolute before:inset-y-0 before:left-0 before:w-0.75 before:origin-top before:scale-y-[var(--rule,1)] before:bg-crimson before:transition-[width] before:duration-400 before:ease-expo before:content-[''] hover:-translate-y-1 hover:bg-snow/10 hover:before:w-1.5 md:min-h-26"
                {...trigger(0.35)}
              >
                <p className="text-lg leading-[1.45] font-medium text-balance text-snow">
                  {text}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </Section>
  );
}
