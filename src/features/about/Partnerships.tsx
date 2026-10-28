"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";
import { useReveal } from "@/lib/motion";

const PATHS = [
  {
    title: "Supply with us",
    description:
      "Manufacturers and exporters with quality products and a market to reach.",
  },
  {
    title: "Buy with us",
    description:
      "Importers and distributors who want dependable suppliers at competitive prices.",
  },
  {
    title: "Move with us",
    description:
      "Freight and logistics providers who keep every shipment moving.",
  },
  {
    title: "Venture with us",
    description:
      "Joint ventures (JVs) with businesses ready to build something larger together.",
  },
];

const spotlight = (e: React.MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
};

export default function Partnerships() {
  const reveal = useReveal();

  return (
    <Section
      id="partnerships"
      aria-labelledby="partnerships-heading"
      tone="navy"
      space="none"
      className="isolate bg-[radial-gradient(ellipse_60%_80%_at_100%_0%,color-mix(in_srgb,var(--color-crimson)_25%,transparent)_0%,transparent_60%)] py-20 md:py-30"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-15 -left-22.5 -z-10 w-95 -rotate-14 opacity-6 brightness-0 invert"
      >
        <Image
          src="/images/logo/kora-logo-mark.svg"
          alt=""
          width={640}
          height={714}
          className="h-auto w-full"
        />
      </div>
      <Container>
        <motion.div className="max-w-190" {...reveal()}>
          <Eyebrow light>Partnerships &amp; Joint Ventures</Eyebrow>
          <Heading as="h2" id="partnerships-heading" light className="font-semibold">
            If you want to partner with us, let&rsquo;s talk.
          </Heading>
          <p className="mt-5 text-body-lg leading-body text-snow/85">
            Trustworthy connections are rare, so we treat every partnership
            as a long-term commitment. Whether you supply, buy, ship or want
            to build a joint venture, there is a place for you at Kora.
          </p>
        </motion.div>

        <div className="mt-10 grid grid-cols-1 gap-5 sm:mt-14 sm:grid-cols-2 xl:grid-cols-4">
          {PATHS.map((path, i) => (
            <motion.article
              key={path.title}
              onMouseMove={spotlight}
              className="relative h-full overflow-hidden rounded-xl border border-snow/15 bg-snow/4 px-7 pt-8 pb-9 transition-[translate,border-color] duration-500 ease-expo before:pointer-events-none before:absolute before:inset-0 before:bg-[radial-gradient(320px_circle_at_var(--x,50%)_var(--y,0%),color-mix(in_srgb,var(--color-crimson)_22%,transparent),transparent_70%)] before:opacity-0 before:transition-opacity before:duration-400 before:content-[''] hover:-translate-y-1.5 hover:border-crimson/55 hover:before:opacity-100"
              {...reveal(i * 0.1)}
            >
              <h3 className="mb-3 text-[22px] leading-[1.35] font-semibold text-snow">
                {path.title}
              </h3>
              <p className="text-base leading-body text-snow/70">{path.description}</p>
            </motion.article>
          ))}
        </div>

        <div className="mt-14 flex flex-wrap gap-4">
          <Button href="/contact-us" size="lg">
            Become a Partner
          </Button>
          <Button href="/contact-us" size="lg" variant="outline-light">
            Discuss a Joint Venture
          </Button>
        </div>
      </Container>
    </Section>
  );
}
