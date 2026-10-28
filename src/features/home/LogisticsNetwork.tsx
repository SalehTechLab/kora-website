"use client";

import { useState } from "react";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { Button, Container, Eyebrow, Heading, Section } from "@/components/ui";

const MODES = [
  {
    title: "Road Freight",
    image: "/images/services/road-freight-small.webp",
    width: 1000,
    height: 920,
    href: "/logistics",
    description:
      "Flexible FTL and LTL trucking solutions for domestic and cross-border shipments, including first-mile pickup and last-mile delivery.",
  },
  {
    title: "Rail Freight",
    image: "/images/services/rail-freight-small.webp",
    width: 1000,
    height: 920,
    href: "/logistics",
    description:
      "Cost-effective rail transportation for bulk cargo and long-distance shipments across major trade corridors.",
  },
  {
    title: "Sea Freight",
    image: "/images/services/sea-freight-small.webp",
    width: 1000,
    height: 920,
    href: "/logistics",
    description:
      "Reliable FCL and LCL ocean freight solutions for international shipments, containerized cargo, and bulk goods.",
  },
  {
    title: "Air Freight",
    image: "/images/services/air-freight-small.webp",
    width: 1000,
    height: 920,
    href: "/logistics",
    description:
      "Fast and flexible air cargo solutions for urgent, high-value, and time-sensitive international shipments.",
  },
];

export default function LogisticsNetwork() {
  // Tap support for touch devices, where :hover isn't reliable
  const [active, setActive] = useState<string | null>(null);

  return (
    <Section
      tone="white"
      space="none"
      className="py-18 md:py-28"
      aria-labelledby="logistics-network-heading"
    >
      <Container className="max-w-wide md:px-5 lg:px-12">
        <Eyebrow>How we deliver</Eyebrow>
        <Heading id="logistics-network-heading" size="headline" className="mb-[0.5em] font-semibold">
          Our Logistics Network
        </Heading>
        <p className="mb-14 max-w-160 text-lg leading-body text-steel-text">
          Whichever route your cargo needs to take, we run the mode that fits
          it best, coordinated end to end so nothing gets lost between
          handoffs.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {MODES.map((mode) => (
            /* Hover, keyboard focus or a tap (data-active) flips the card to its detail face */
            <article
              key={mode.title}
              data-active={active === mode.title}
              className="group relative h-100 cursor-pointer overflow-hidden rounded-3xl bg-snow transition-colors duration-400 ease-expo hover:bg-crimson focus-within:bg-crimson data-[active=true]:bg-crimson"
              onClick={() =>
                setActive((current) => (current === mode.title ? null : mode.title))
              }
            >
              <div className="absolute inset-x-6 top-6 flex h-60 origin-top-left items-center justify-center transition-transform duration-500 ease-expo group-hover:scale-50 group-focus-within:scale-50 group-data-[active=true]:scale-50">
                <Image
                  src={mode.image}
                  alt=""
                  width={mode.width}
                  height={mode.height}
                  loading="eager"
                  sizes="(max-width: 575px) 90vw, (max-width: 991px) 45vw, 280px"
                  className="size-full object-contain"
                />
              </div>

              <h3 className="absolute inset-x-6 bottom-8 m-0 text-[22px] font-bold transition-[opacity,transform] duration-400 ease-expo group-hover:-translate-y-3 group-hover:opacity-0 group-focus-within:-translate-y-3 group-focus-within:opacity-0 group-data-[active=true]:-translate-y-3 group-data-[active=true]:opacity-0">
                {mode.title}
              </h3>

              <div className="absolute inset-x-6 bottom-7 translate-y-4 opacity-0 transition-[opacity,transform] duration-500 ease-expo group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:translate-y-0 group-focus-within:opacity-100 group-data-[active=true]:translate-y-0 group-data-[active=true]:opacity-100">
                <p className="mb-6 text-ui leading-body text-snow">{mode.description}</p>
                <Button
                  href={mode.href}
                  aria-label={`${mode.title}: more details`}
                  variant="light"
                  size="sm"
                  className="h-10 border-snow bg-snow text-ink hover:border-snow hover:bg-snow hover:text-crimson"
                  onClick={(event) => event.stopPropagation()}
                >
                  More Details
                  <ArrowRight aria-hidden="true" className="size-4" />
                </Button>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </Section>
  );
}
