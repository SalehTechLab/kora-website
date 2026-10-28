"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";

const COPY =
  "At Kora Traders, our commitment goes beyond sourcing and procurement—we keep global trade moving. Through reliable freight transportation by sea, air, and road, we streamline the journey of your goods with strategic planning, trusted logistics partners, and seamless coordination. From origin to destination, we bring every step together to ensure your shipments move efficiently, securely, and with confidence across international markets.";

const WORDS = COPY.split(" ");

function RevealWord({
  word,
  start,
  end,
  progress,
}: {
  word: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [start, end], [0.68, 1]);
  return (
    <motion.span className="mr-[0.28em] inline-block text-navy" style={{ opacity }}>
      {word}
    </motion.span>
  );
}

export default function LogisticsIntro() {
  const reduceMotion = useReducedMotion();
  const textRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Words light up one by one as the paragraph scrolls through the viewport
  const { scrollYProgress: textProgress } = useScroll({
    target: textRef,
    offset: ["start 0.85", "end 0.5"],
  });
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const markShift = useTransform(sectionProgress, [0, 1], [60, -60]);

  const inView = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.5 },
          transition: { duration: 0.8, delay, ease },
        };

  return (
    <Section
      ref={sectionRef}
      tone="white"
      space="none"
      id="logistics-intro"
      aria-label="Introduction"
      className="px-5 pt-20 pb-18 md:px-6 md:pt-30 md:pb-26"
    >
      {/* Kora mark bleeding off each edge as quiet brand texture */}
      {(["left", "right"] as const).map((side) => (
        <motion.div
          key={side}
          aria-hidden
          className={cn(
            "pointer-events-none absolute top-1/2 w-30 opacity-10 md:w-55",
            side === "left"
              ? "-left-12 -rotate-14 md:-left-17.5"
              : "-right-12 rotate-14 md:-right-17.5",
          )}
          style={reduceMotion ? undefined : { y: markShift }}
        >
          <Image
            src="/images/logo/kora-logo-mark.svg"
            alt=""
            width={640}
            height={714}
            className="h-auto w-full"
          />
        </motion.div>
      ))}

      <div className="relative mx-auto max-w-220 text-center">
        <motion.div {...inView()}>
          <span className="mb-7 inline-flex items-center gap-3 text-eyebrow font-semibold tracking-eyebrow text-crimson uppercase before:h-0.5 before:w-7 before:bg-crimson after:h-0.5 after:w-7 after:bg-crimson">
            Our commitment
          </span>
        </motion.div>

        <div ref={textRef}>
          {/* Screen readers get the full sentence once; the split words are decorative */}
          <p className="m-0 text-[clamp(1.05rem,0.7rem+1.6vw,1.75rem)] leading-body font-semibold tracking-heading">
            {reduceMotion ? (
              <span className="text-navy">{COPY}</span>
            ) : (
              <>
                <span className="sr-only">{COPY}</span>
                <span aria-hidden>
                  {WORDS.map((word, i) => (
                    <RevealWord
                      key={i}
                      word={word}
                      start={i / WORDS.length}
                      end={Math.min(1, (i + 4) / WORDS.length)}
                      progress={textProgress}
                    />
                  ))}
                </span>
              </>
            )}
          </p>
        </div>
      </div>
    </Section>
  );
}
