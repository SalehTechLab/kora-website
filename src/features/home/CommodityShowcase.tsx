"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Eyebrow, Heading, Section } from "@/components/ui";
import { COMMODITIES } from "./commodities";

export default function CommodityShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState(0);

  // Horizontal travel = how far the track overflows its viewport. Only on
  // screens where the section pins; below that the track scrolls natively.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 992px)");
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      // Overflow past the viewport, plus the right-hand gutter so the last card rests inside the page edge
      const gutter = parseFloat(getComputedStyle(track).paddingRight) || 0;
      setDistance(mq.matches ? track.scrollWidth + gutter - track.clientWidth : 0);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    mq.addEventListener("change", measure);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      mq.removeEventListener("change", measure);
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], [0, -distance]);
  const barScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section
      ref={sectionRef}
      tone="white"
      space="none"
      /* overflow must stay visible or the sticky pin below stops sticking */
      className="overflow-visible lg:h-[calc(100svh+var(--travel,0px))]"
      style={{ "--travel": `${distance}px` } as React.CSSProperties}
      aria-labelledby="showcase-heading"
    >
      {/* --edge: content edge shared by heading and track so they line up on wide screens */}
      <div className="pt-24 pb-20 lg:sticky lg:top-[73px] lg:flex lg:h-[calc(100svh-73px)] lg:flex-col lg:justify-center lg:overflow-hidden lg:pt-10 lg:pb-14 lg:[--edge:max(48px,calc((100vw-1360px)/2+48px))]">
        <div className="mx-auto mb-10 flex max-w-wide flex-col items-start gap-6 px-5 lg:mb-9 lg:w-full lg:max-w-none lg:flex-row lg:items-end lg:justify-between lg:px-(--edge)">
          <div>
            <Eyebrow className="mb-4.5">What we trade</Eyebrow>
            <Heading id="showcase-heading" size="headline" className="font-semibold">
              Quality Products,
              <br />
              <em className="font-medium text-crimson">Competitive Prices,</em> Reliable Routes.
            </Heading>
          </div>
          <Link
            href="/products"
            className="inline-flex items-center gap-2.5 border-b-2 border-crimson pb-1 text-ui font-semibold text-navy transition-[color,gap] duration-300 ease-expo hover:gap-4 hover:text-crimson"
          >
            Browse the catalogue
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
        </div>

        {/* Mobile / tablet: native horizontal swipe with snapping; desktop: scroll drives travel */}
        <div
          ref={trackRef}
          className="snap-x snap-mandatory scroll-px-5 overflow-x-auto px-5 [scrollbar-width:none] lg:snap-none lg:scroll-p-0 lg:overflow-visible lg:px-(--edge) [&::-webkit-scrollbar]:hidden"
        >
          <motion.ul className="flex w-max list-none gap-4 lg:gap-7 lg:will-change-transform" style={{ x }}>
            {COMMODITIES.map((c) => (
              <li
                key={c.id}
                className="w-[78vw] max-w-85 shrink-0 snap-start lg:w-[clamp(260px,21vw,340px)] lg:max-w-none"
              >
                <Link href="/products" className="group block">
                  <div className="relative aspect-4/5 overflow-hidden rounded-3xl bg-ink lg:aspect-auto lg:h-[clamp(260px,46svh,480px)]">
                    <Image
                      src={c.image!}
                      alt={`Photo of ${c.name.toLowerCase()}`}
                      fill
                      sizes="(max-width: 991px) 78vw, 30vw"
                      className="object-cover transition-transform duration-1000 ease-expo group-hover:scale-107"
                    />
                  </div>
                  <h3 className="mt-5 font-serif text-2xl leading-[1.2] font-semibold tracking-heading text-navy lg:text-[22px]">
                    {c.name}
                  </h3>
                  <p className="mt-1.5 text-sm leading-normal text-ink/75">{c.items}</p>
                </Link>
              </li>
            ))}
          </motion.ul>
        </div>

        <div className="relative mt-8 hidden h-0.5 bg-steel/40 lg:mx-(--edge) lg:block" aria-hidden="true">
          <motion.span className="absolute inset-0 origin-left bg-crimson" style={{ scaleX: barScale }} />
        </div>
      </div>
    </Section>
  );
}
