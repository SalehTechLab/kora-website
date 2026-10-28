"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container, Eyebrow, Heading } from "@/components/ui";
import { ease } from "@/lib/motion";

const MODELS = [
  {
    tag: "Spot buy",
    title: "One order, start to finish.",
    body: "Need something once? We find the supplier, agree the price, check the goods and ship them. Sample orders, mixed pallets or a full container.",
    chips: ["Sample orders", "Mixed pallets", "Container loads"],
  },
  {
    tag: "Repeat supply",
    title: "Set it up once. Restock on repeat.",
    body: "For products you reorder, we lock in vetted suppliers and a consistent specification, so the next order matches the last and you stop re-briefing from scratch.",
    chips: ["Fleet supply", "Spec-driven sourcing", "Standing suppliers"],
  },
  {
    tag: "Build together",
    title: "Your brand. Or a venture of ours.",
    body: "Launch a private-label line with a manufacturer we trust, or explore a joint venture with us when the opportunity is bigger than a single shipment.",
    chips: ["Private label", "OEM", "Joint ventures"],
  },
];

export default function EngagementModels() {
  return (
    <section className="bg-snow py-20 lg:py-30" aria-labelledby="models-heading">
      <Container wide className="lg:px-12">
        <motion.div
          className="mb-12 max-w-190 lg:mb-16"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          <Eyebrow>Ways to work with us</Eyebrow>
          <Heading id="models-heading" size="headline" className="font-semibold">
            Start with one shipment.{" "}
            <em className="block font-medium text-crimson">Grow into a supply chain.</em>
          </Heading>
        </motion.div>

        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
          {MODELS.map((m, i) => (
            <motion.article
              key={m.tag}
              className="group relative flex flex-col overflow-hidden rounded-xl border border-steel/50 bg-white px-7 pt-8 pb-7 transition-[transform,background-color,border-color] duration-500 ease-expo focus-within:border-navy focus-within:bg-navy hover:border-navy hover:bg-navy lg:px-9 lg:pt-10 lg:pb-9 [@media(hover:hover)]:hover:-translate-y-2"
              initial={{ opacity: 0, y: 48 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.8, delay: i * 0.12, ease }}
            >
              {/* Oversized outlined numeral, brightens on hover */}
              <span
                className="absolute top-2 right-5.5 font-serif text-[6rem] leading-none font-semibold text-transparent italic transition-[-webkit-text-stroke-color] duration-400 [-webkit-text-stroke:1px_color-mix(in_srgb,var(--color-steel)_70%,transparent)] group-focus-within:[-webkit-text-stroke-color:color-mix(in_srgb,var(--color-snow)_50%,transparent)] group-hover:[-webkit-text-stroke-color:color-mix(in_srgb,var(--color-snow)_50%,transparent)]"
                aria-hidden="true"
              >
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="mb-14 text-xs font-semibold tracking-eyebrow text-crimson uppercase transition-colors duration-400 group-focus-within:text-steel group-hover:text-steel">
                {m.tag}
              </p>
              <h3 className="font-serif text-[1.7rem] leading-[1.15] font-semibold tracking-heading text-navy transition-colors duration-400 group-focus-within:text-white group-hover:text-white">
                {m.title}
              </h3>
              <p className="mt-4 text-[0.96875rem] leading-body text-ink transition-colors duration-400 group-focus-within:text-snow/80 group-hover:text-snow/80">
                {m.body}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {m.chips.map((c) => (
                  <li
                    key={c}
                    className="rounded-pill border border-steel/70 px-3.5 py-1.5 text-[0.8125rem] font-medium text-navy transition-colors duration-400 group-focus-within:border-steel/60 group-focus-within:text-snow group-hover:border-steel/60 group-hover:text-snow"
                  >
                    {c}
                  </li>
                ))}
              </ul>
              <a
                href="/contact-us"
                className="mt-auto inline-flex gap-2.5 self-start pt-8 text-ui font-semibold text-navy transition-[color,gap] duration-400 items-center group-focus-within:gap-4 group-focus-within:text-white group-hover:gap-4 group-hover:text-white"
              >
                Talk to us about this
                <ArrowRight className="size-[1em]" aria-hidden="true" />
              </a>
            </motion.article>
          ))}
        </div>
      </Container>
    </section>
  );
}
