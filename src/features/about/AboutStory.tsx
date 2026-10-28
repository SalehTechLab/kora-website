"use client";

import { useRef } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Container, Eyebrow, Section } from "@/components/ui";
import { useReveal } from "@/lib/motion";

const OPENING =
  "Every business is searching for something: a reliable supplier, a fairer price, a market that’s ready to buy. Too often, the right people never meet. Or they meet, and the deal falls apart in the details.";

const BELIEF =
  "Kora Traders started in Munich, Germany with a simple belief: opportunities are everywhere, but trustworthy connections are rare.";

const CLOSING =
  "We bring businesses together with our top tier partners, premium products and the lasting opportunities they’d otherwise miss. And we don’t step back after the introduction. We stay until the job is done.";

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.68, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

// Words light up one by one as the paragraph scrolls through the viewport
function ScrollText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });
  const words = text.split(" ");

  return (
    <p
      ref={ref}
      className="m-0 text-[clamp(1.15rem,0.9rem+1vw,1.65rem)] leading-[1.55] font-medium tracking-heading text-navy"
    >
      {reduceMotion
        ? text
        : words.map((word, i) => (
            <Word
              key={i}
              word={word}
              progress={scrollYProgress}
              range={[i / words.length, Math.min(1, (i + 1) / words.length)]}
            />
          ))}
    </p>
  );
}

export default function AboutStory() {
  const reveal = useReveal();

  return (
    <Section
      id="our-story"
      aria-labelledby="about-story-heading"
      tone="white"
      space="none"
      className="overflow-visible py-20 md:py-30"
    >
      <Container>
        <div className="grid gap-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <Eyebrow>Our Story</Eyebrow>
            <h2
              id="about-story-heading"
              className="font-serif text-hero-sm leading-[1.06] font-semibold tracking-display"
            >
              <span className="block whitespace-nowrap">Built on</span>
              <span className="block whitespace-nowrap">one belief.</span>
            </h2>
          </div>

          <div className="flex flex-col gap-8">
            <ScrollText text={OPENING} />
            <ScrollText text={BELIEF} />
            <motion.blockquote
              className="relative my-4 border-l-3 border-crimson pl-5 font-serif text-[clamp(1.75rem,3.4vw,2.75rem)] leading-[1.2] tracking-heading text-navy md:my-6 md:pl-8"
              {...reveal()}
            >
              Here, reliability isn&rsquo;t a slogan, it&rsquo;s{" "}
              <em className="text-crimson">a habit</em>, and we built Kora on it.
            </motion.blockquote>
            <ScrollText text={CLOSING} />
          </div>
        </div>
      </Container>
    </Section>
  );
}
