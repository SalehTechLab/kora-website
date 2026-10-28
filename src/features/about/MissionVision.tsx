"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Container, Eyebrow, Heading, Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import { useReveal } from "@/lib/motion";

const panel =
  "relative flex flex-col overflow-hidden rounded-xl border px-6 py-9 transition-[translate,box-shadow] duration-500 ease-expo hover:-translate-y-1.5 hover:shadow-[0_32px_64px_-36px_color-mix(in_srgb,var(--color-navy)_50%,transparent)] md:rounded-[28px] md:px-12 md:py-14";

const statement =
  "relative font-serif text-[clamp(1.2rem,1.9vw,1.65rem)] leading-[1.35] tracking-heading text-balance";

export default function MissionVision() {
  const reveal = useReveal();

  return (
    <Section
      tone="mist"
      space="none"
      aria-labelledby="mission-vision-heading"
      className="py-20 md:py-30"
    >
      <Container>
        <motion.div className="mb-12" {...reveal()}>
          <Eyebrow>Our Direction</Eyebrow>
          <Heading as="h2" id="mission-vision-heading" className="font-semibold">
            Why we exist, and where we&rsquo;re headed.
          </Heading>
        </motion.div>
        <div className="grid gap-6 lg:grid-cols-2">
          <motion.article
            className={cn(panel, "border-navy bg-navy text-snow")}
            {...reveal(0.05)}
          >
            <Eyebrow light className="relative mb-5 tracking-eyebrow">
              Our Mission
            </Eyebrow>
            <p className={cn(statement, "text-snow")}>
              To connect businesses to global opportunities and make
              international trade simple, transparent and stress-free.
            </p>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -bottom-6 w-50 -rotate-14 opacity-8 brightness-0 invert"
            >
              <Image
                src="/images/logo/kora-logo-mark.svg"
                alt=""
                width={640}
                height={714}
                className="h-auto w-full"
              />
            </div>
          </motion.article>

          <motion.article
            className={cn(panel, "border-steel/35 bg-white text-ink")}
            {...reveal(0.15)}
          >
            <Eyebrow className="relative mb-5 tracking-eyebrow">Our Vision</Eyebrow>
            <p className={cn(statement, "text-navy")}>
              To be the smart hub every business can turn to: a place where
              data-driven sourcing, fair pricing and on-time delivery are no
              longer a myth, and where every business, big or small, gets the
              same energy and attention.
            </p>
            <div
              aria-hidden
              className="pointer-events-none absolute -right-6 -bottom-6 aspect-[640/714] w-50 -rotate-14 bg-crimson opacity-12 mask-[url('/images/logo/kora-logo-mark.svg')] mask-contain mask-center mask-no-repeat"
            />
          </motion.article>
        </div>
      </Container>
    </Section>
  );
}
