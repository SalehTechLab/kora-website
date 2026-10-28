"use client";

import { motion } from "framer-motion";
import { Container, Eyebrow, Heading } from "@/components/ui";
import { ease } from "@/lib/motion";
import { FAQS } from "./servicesData";

export default function ServicesFAQ() {
  return (
    <section className="bg-snow py-20 lg:py-30" aria-labelledby="faq-heading">
      <Container wide className="grid grid-cols-1 gap-10 lg:grid-cols-12 lg:gap-20 lg:px-12">
        <motion.div
          className="lg:sticky lg:top-30 lg:col-span-4 lg:self-start"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease }}
        >
          <Eyebrow>Straight answers</Eyebrow>
          <Heading id="faq-heading" size="headline" className="font-semibold">
            Questions we hear <em className="font-medium text-crimson">before</em> the first order.
          </Heading>
        </motion.div>

        <div className="border-t border-steel/50 lg:col-span-8">
          {FAQS.map((f, i) => (
            <details
              key={f.q}
              name="services-faq"
              open={i === 0}
              className="group/item border-b border-steel/50"
            >
              <summary className="group/head flex cursor-pointer list-none items-center justify-between gap-6 py-6.5 marker:hidden [&::-webkit-details-marker]:hidden">
                <span className="font-serif text-[clamp(1.1rem,1rem+0.5vw,1.4rem)] leading-[1.3] font-semibold tracking-heading text-navy">
                  {f.q}
                </span>
                {/* Plus drawn from two bars; the vertical bar collapses when the item opens */}
                <span
                  className="relative block size-9 shrink-0 rounded-full border border-steel transition-colors duration-300 group-open/item:border-crimson group-open/item:bg-crimson group-hover/head:border-crimson group-hover/head:bg-crimson"
                  aria-hidden="true"
                >
                  <span className="absolute top-1/2 left-1/2 -mt-[0.75px] -ml-1.5 h-[1.5px] w-3 bg-navy transition-[background-color,transform] duration-350 ease-expo group-open/item:bg-white group-hover/head:bg-white" />
                  <span className="absolute top-1/2 left-1/2 -mt-[0.75px] -ml-1.5 h-[1.5px] w-3 rotate-90 bg-navy transition-[background-color,transform] duration-350 ease-expo group-open/item:rotate-0 group-open/item:bg-white group-hover/head:bg-white" />
                </span>
              </summary>
              <p className="max-w-155 pr-12 pb-7 text-base leading-body text-ink">{f.a}</p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
