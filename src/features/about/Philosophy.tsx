"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { Container, Eyebrow, Section } from "@/components/ui";
import { ease, useReveal } from "@/lib/motion";

const LINES = ["One Team.", "Every Step.", "Your Business."];

const PRINCIPLES = [
  {
    number: "01",
    title: "Quality",
    description: "Products and partners checked before they ever reach you.",
  },
  {
    number: "02",
    title: "Reliability",
    description: "Consistency you can plan your own business around.",
  },
  {
    number: "03",
    title: "Competitive sourcing",
    description: "Fair prices from a supplier network that spans the globe.",
  },
];

// Three beats: solid, muted, accent
const BEATS = ["", "text-steel", "text-crimson italic"];

export default function Philosophy() {
  const reveal = useReveal();
  const reduceMotion = useReducedMotion();

  // The visible mask line triggers the reveal; its text is clipped until it rises
  const mask = reduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.6 },
      };

  const rise = (i: number): Variants => ({
    hidden: { y: "110%" },
    show: { y: 0, transition: { duration: 0.9, delay: i * 0.12, ease } },
  });

  return (
    <Section
      id="philosophy"
      aria-labelledby="philosophy-heading"
      tone="snow"
      space="none"
      className="py-16 md:py-22"
    >
      <Container>
        <div className="grid gap-5">
          <div>
            <Eyebrow>Our Philosophy</Eyebrow>
            <h2
              id="philosophy-heading"
              className="font-serif text-[clamp(2rem,4.2vw,3.5rem)] leading-[1.08] font-semibold tracking-display"
            >
              {LINES.map((line, i) => (
                <motion.span
                  key={line}
                  className="mr-[0.26em] inline-block overflow-hidden pt-[0.04em] pb-[0.1em]"
                  {...mask}
                >
                  <motion.span
                    className={`inline-block ${BEATS[i]}`}
                    variants={rise(i)}
                  >
                    {line}
                  </motion.span>
                </motion.span>
              ))}
            </h2>
          </div>
          <motion.div className="max-w-180" {...reveal(0.1)}>
            <p className="text-body-lg leading-body text-navy">
              We combine smart solutions, efficient processes and automation
              to create greater value for our partners and customers,
              delivering with precision, consistency and a long-term
              perspective.
            </p>
          </motion.div>
        </div>

        <ol
          aria-label="Driven by three principles"
          className="mt-8 grid list-none grid-cols-1 gap-x-10 md:mt-12 md:grid-cols-3"
        >
          {PRINCIPLES.map((item, i) => (
            <motion.li
              key={item.number}
              className="relative border-t border-steel pt-6 pb-5 before:absolute before:inset-x-0 before:-top-px before:h-0.5 before:origin-left before:scale-x-0 before:bg-crimson before:transition-transform before:duration-600 before:ease-expo before:content-[''] hover:before:scale-x-100 md:pb-2"
              {...reveal(i * 0.1)}
            >
              <span
                aria-hidden
                className="mb-3 block font-serif text-xl leading-none text-crimson"
              >
                {item.number}
              </span>
              <h3 className="mb-1.5 text-[22px] leading-[1.35] font-semibold">
                {item.title}
              </h3>
              <p className="text-ui leading-body text-steel-text">
                {item.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </Container>
    </Section>
  );
}
