"use client";

import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { Button, Section, Eyebrow } from "@/components/ui";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { ease } from "@/lib/motion";
import { WHATSAPP_URL } from "@/components/layout/WhatsAppFloat";
import SupportIllustration from "./SupportIllustration";

const WORDS: { text: string; accent?: boolean }[][] = [
  [{ text: "Tell" }, { text: "us" }, { text: "what" }],
  [{ text: "you" }, { text: "need" }, { text: "to" }],
  [{ text: "move.", accent: true }],
];

export default function ContactHero() {
  const reduceMotion = useReducedMotion();
  let wordIndex = 0;

  return (
    <Section
      tone="navy"
      space="none"
      aria-labelledby="contact-heading"
      className="isolate bg-[radial-gradient(ellipse_60%_90%_at_78%_55%,color-mix(in_srgb,var(--color-crimson)_22%,transparent)_0%,transparent_62%)] before:absolute before:inset-0 before:-z-10 before:bg-[url(/images/patterns/logistics-doodle.svg)] before:bg-size-[440px] before:bg-center before:opacity-6 before:content-['']"
    >
      {/* extra bottom room for the channel cards that overlap this edge */}
      <div className="mx-auto grid max-w-page grid-cols-1 items-center gap-10 px-5 pt-16 pb-28 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-12 lg:px-8 lg:pt-24 lg:pb-34">
        <div>
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
          >
            <Eyebrow light rule className="text-snow/70">
              Contact Us
            </Eyebrow>
          </motion.div>

          <h1
            id="contact-heading"
            className="mb-6 font-serif text-hero font-bold tracking-display text-snow"
          >
            {WORDS.map((line, li) => (
              <span key={li} className="block">
                {line.map(({ text, accent }) => {
                  const delay = 0.15 + wordIndex++ * 0.09;
                  // Each word sits in an overflow mask so it can rise into place
                  return (
                    <span
                      key={text}
                      className="mr-[0.02em] inline-block overflow-hidden pt-[0.06em] pr-[0.12em] pb-[0.14em] align-bottom"
                    >
                      <motion.span
                        className={
                          accent
                            ? "inline-block bg-[linear-gradient(var(--color-crimson),var(--color-crimson))] bg-size-[100%_0.07em] bg-position-[0_92%] bg-no-repeat italic"
                            : "inline-block"
                        }
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
              Sourcing a product, arranging freight, or exploring a partnership,
              we will reply with a straight answer.
            </p>

            <div className="flex flex-wrap gap-3">
              <Button href="#quote" size="lg">
                Request a quote
                <ArrowRight className="size-4" aria-hidden="true" />
              </Button>
              <Button
                variant="outline-light"
                size="lg"
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="size-4" aria-hidden="true" />
                Chat on WhatsApp
              </Button>
            </div>
          </motion.div>
        </div>

        <SupportIllustration />
      </div>
    </Section>
  );
}
