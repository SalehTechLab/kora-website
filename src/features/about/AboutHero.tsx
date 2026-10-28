"use client";

import Image from "next/image";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { Container, Section, Eyebrow } from "@/components/ui";
import { ease } from "@/lib/motion";

// Words rise one by one; the last line is the accent
const LINES: { words: string[]; accent?: boolean }[] = [
  { words: ["Opportunities"] },
  { words: ["are", "everywhere."] },
  { words: ["Trust is rare."], accent: true },
];

// All seven brand traits share the outer ring, evenly spaced and turning
// together, so labels can never cross. The inner rings carry only planets.
// `inset` is the ring's gap to the stage edge (%), `start` its starting
// rotation, `seconds` one full revolution.
const TRAITS = [
  "Opportunity focused",
  "Reliable",
  "Connected",
  "Innovative",
  "Approachable",
  "Transparent",
  "Diverse",
];

const RINGS = [
  { inset: 5, start: 0, seconds: 90, traits: TRAITS },
  { inset: 17, start: 200, seconds: 38, planet: true },
  { inset: 27, start: 60, seconds: 26, planet: true },
];

export default function AboutHero() {
  const reduceMotion = useReducedMotion();
  let wordIndex = 0;

  // Pointer parallax: the mark drifts with the cursor, the rings counter-drift
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 90, damping: 18 });
  const sy = useSpring(py, { stiffness: 90, damping: 18 });
  const markX = useTransform(sx, (v) => v * 18);
  const markY = useTransform(sy, (v) => v * 18);
  const ringX = useTransform(sx, (v) => v * -10);
  const ringY = useTransform(sy, (v) => v * -10);

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const r = e.currentTarget.getBoundingClientRect();
    px.set(((e.clientX - r.left) / r.width - 0.5) * 2);
    py.set(((e.clientY - r.top) / r.height - 0.5) * 2);
  };

  const fade = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, delay, ease },
        };

  return (
    <Section
      tone="navy"
      space="none"
      aria-labelledby="about-heading"
      onPointerMove={onPointerMove}
      onPointerLeave={() => {
        px.set(0);
        py.set(0);
      }}
      className="isolate flex items-center bg-[radial-gradient(ellipse_60%_90%_at_88%_45%,color-mix(in_srgb,var(--color-crimson)_22%,transparent)_0%,transparent_62%)] pt-18 pb-24 before:absolute before:inset-0 before:-z-10 before:bg-[url('/images/patterns/logistics-doodle.svg')] before:bg-size-[440px] before:bg-center before:opacity-6 before:content-[''] md:min-h-[min(720px,calc(100svh-var(--spacing-nav)))] md:pt-24 md:pb-28"
    >
      <Container>
        <div className="grid items-center gap-12 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div>
            <motion.div {...fade(0.1)}>
              <Eyebrow light rule className="text-snow/70">
                About Us
              </Eyebrow>
            </motion.div>
            <h1
              id="about-heading"
              className="mb-6 font-serif text-hero font-bold tracking-display text-snow"
            >
              {LINES.map(({ words, accent }) => (
                <span key={words[0]} className="block">
                  {words.map((text) => {
                    const delay = 0.15 + wordIndex++ * 0.09;
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
            <motion.div {...fade(0.75)}>
              <p className="max-w-130 text-lead leading-body text-snow/80">
                Kora Traders started in Munich, Germany with a simple belief:
                the right people should meet, and the deal should hold
                together in the details.
              </p>
            </motion.div>
          </div>

          <div
            aria-hidden
            className="@container relative mx-auto hidden aspect-square w-[82%] max-w-107.5 xl:block"
          >
            <motion.div className="absolute inset-0" style={{ x: ringX, y: ringY }}>
              {RINGS.map((ring) => (
                <div
                  key={ring.inset}
                  className="absolute animate-orbit rounded-full border border-dashed border-snow/25 transform-[rotate(var(--a))] motion-reduce:animate-none"
                  style={
                    {
                      inset: `${ring.inset}%`,
                      "--a": `${ring.start}deg`,
                      "--s": `${ring.seconds}s`,
                    } as React.CSSProperties
                  }
                >
                  {ring.traits?.map((trait, i, all) => {
                    const slot = (360 / all.length) * i;
                    return (
                      <span
                        key={trait}
                        className="absolute inset-0 transform-[rotate(var(--b))]"
                        style={{ "--b": `${slot}deg` } as React.CSSProperties}
                      >
                        <span
                          className="absolute top-0 left-1/2 animate-counter-orbit rounded-pill border border-snow/30 bg-navy/90 px-[3.6cqw] py-[1.8cqw] text-[3cqw] font-semibold tracking-caps whitespace-nowrap text-snow uppercase backdrop-blur-sm transform-[translate(-50%,-50%)_rotate(calc(var(--a)*-1))] motion-reduce:animate-none"
                          style={
                            {
                              "--a": `${ring.start + slot}deg`,
                              "--s": `${ring.seconds}s`,
                            } as React.CSSProperties
                          }
                        >
                          {trait}
                        </span>
                      </span>
                    );
                  })}
                  {ring.planet && (
                    <span className="absolute inset-0 transform-[rotate(0deg)]">
                      <i className="absolute top-0 left-1/2 size-[2.3cqw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-crimson shadow-[0_0_0_0.9cqw_color-mix(in_srgb,var(--color-snow)_12%,transparent)]" />
                    </span>
                  )}
                </div>
              ))}
            </motion.div>

            <motion.div className="absolute inset-0" style={{ x: markX, y: markY }}>
              <div className="absolute inset-[33%] grid place-items-center rounded-full bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-crimson)_28%,transparent)_0%,transparent_70%)]">
                <Image
                  src="/images/logo/kora-logo-mark.svg"
                  alt=""
                  width={640}
                  height={714}
                  priority
                  className="h-auto w-[70%] brightness-0 invert"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </Container>

      <motion.div
        aria-hidden
        className="absolute bottom-7 left-1/2 z-1 hidden -translate-x-1/2 flex-col items-center gap-2.5 text-micro font-semibold tracking-[0.2em] text-snow/60 uppercase md:flex"
        {...fade(1.1)}
      >
        <span>Scroll</span>
        <span className="relative h-13 w-0.75 overflow-hidden rounded-xs bg-snow">
          <motion.i
            className="absolute inset-0 bg-crimson"
            animate={reduceMotion ? undefined : { y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
          />
        </span>
      </motion.div>
    </Section>
  );
}
