"use client";

import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Container, Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

// Words wrapped in the accent set come through in crimson italic
const PARTS: { text: string; accent?: boolean }[] = [
  { text: "Global trade is full of" },
  { text: "moving parts.", accent: true },
  { text: "Unfamiliar suppliers, shifting prices, complex paperwork and tight windows." },
  { text: "We take the complexity off your plate:" },
  { text: "one dependable partner", accent: true },
  { text: "for sourcing, procurement and logistics, by air, sea, rail or road." },
];

const WORDS = PARTS.flatMap((part) =>
  part.text.split(" ").map((word) => ({ word, accent: !!part.accent })),
);

function Word({
  word,
  accent,
  index,
  progress,
}: {
  word: string;
  accent: boolean;
  index: number;
  progress: MotionValue<number>;
}) {
  const start = index / WORDS.length;
  const end = start + 1.5 / WORDS.length;
  const opacity = useTransform(progress, [start, end], [0.68, 1]);
  const y = useTransform(progress, [start, end], [10, 0]);

  return (
    <motion.span
      className={cn(
        "mr-[0.26em] inline-block will-change-[opacity,transform]",
        accent && "text-crimson italic",
      )}
      style={{ opacity, y }}
    >
      {word}
    </motion.span>
  );
}

export default function Manifesto() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.9", "end 0.55"],
  });
  const phrases = ["One Team.", "Every Step.", "Your Business."];

  return (
    <Section
      id="manifesto"
      space="none"
      className="pt-14 pb-16 lg:pt-20 lg:pb-22"
      aria-labelledby="manifesto-label"
    >
      <Container className="max-w-wide md:px-5 lg:px-12">
        <header className="mb-8 lg:mb-10">
          <motion.p
            className="mb-4.5 text-eyebrow font-semibold tracking-eyebrow text-crimson uppercase"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
          >
            Who We Are
          </motion.p>

          {/* Observed on the heading itself: a phrase parked outside its mask has no visible area to trigger on */}
          <motion.h2
            id="manifesto-label"
            className="font-serif text-headline font-semibold"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.6 }}
            transition={{ staggerChildren: 0.14 }}
          >
            {phrases.map((phrase, i) => (
              <span
                key={phrase}
                className="mr-[0.28em] -mb-[0.1em] inline-block overflow-hidden pt-[0.04em] pb-[0.14em] align-top"
              >
                <motion.span
                  className={cn(
                    "block",
                    /* The last phrase carries the promise */
                    i === phrases.length - 1 && "font-medium text-crimson italic",
                  )}
                  variants={{ hidden: { y: "110%" }, show: { y: "0%" } }}
                  transition={{ duration: 0.9, ease }}
                >
                  {phrase}
                </motion.span>
              </span>
            ))}
          </motion.h2>

          <motion.span
            className="mt-6 block h-px w-full origin-left bg-steel/60"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.3, ease }}
            aria-hidden="true"
          />
        </header>

        <div className="flex flex-col items-start">
          <div ref={ref} className="w-full">
            <p className="font-serif text-[clamp(1.1rem,4.4vw,1.25rem)] leading-[1.4] font-medium tracking-heading text-navy lg:text-[clamp(1.2rem,1.6vw,1.5rem)] lg:leading-normal">
              {/* Plain text for assistive tech; the animated copy is decorative */}
              <span className="sr-only">
                {PARTS.map((p) => p.text).join(" ")}
              </span>
              <span aria-hidden="true">
                {WORDS.map((w, i) => (
                  <Word
                    key={i}
                    word={w.word}
                    accent={w.accent}
                    index={i}
                    progress={scrollYProgress}
                  />
                ))}
              </span>
            </p>
          </div>

          <Link
            href="/about-us"
            className="mt-8 inline-flex items-center gap-2.5 self-start border-b-2 border-crimson pb-1 text-ui font-semibold text-navy transition-[color,gap] duration-300 ease-expo hover:gap-4 hover:text-crimson"
          >
            More about Kora
            <ArrowRight aria-hidden="true" className="size-4" />
          </Link>

          {/* Navy mission card, carried over from the old layout */}
          <motion.aside
            className="relative mt-9 w-full overflow-hidden rounded-r-lg border-l-3 border-crimson bg-navy px-7 py-8 lg:px-11 lg:py-10"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease }}
          >
            <div
              className="pointer-events-none absolute -right-4.5 -bottom-6.5 w-37.5 -rotate-14 opacity-10 brightness-0 invert"
              aria-hidden="true"
            >
              <Image
                src="/images/logo/kora-logo-mark.svg"
                alt=""
                width={640}
                height={714}
                className="h-auto w-full"
              />
            </div>
            <p className="relative mb-3.5 text-eyebrow font-semibold tracking-eyebrow text-snow/80 uppercase">
              Our Mission
            </p>
            <p className="relative font-serif text-xl leading-normal text-snow italic lg:text-[1.4rem]">
              To connect businesses to global opportunities and make
              international trade simple, transparent and stress-free.
            </p>
          </motion.aside>
        </div>
      </Container>
    </Section>
  );
}
