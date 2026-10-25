"use client";

import Image from "next/image";
import styled, { keyframes } from "styled-components";
import { ConfigProvider, Typography, type ThemeConfig } from "antd";
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { colors } from "@/theme/themeConfig";
import { Container, SERIF, ease } from "./shared";

const { Paragraph, Text } = Typography;

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
  { inset: 17, start: 200, seconds: 38, planet: "#B51E32" },
  { inset: 27, start: 60, seconds: 26, planet: colors.crimson },
];

const theme: ThemeConfig = {
  token: {
    colorTextHeading: colors.softWhite,
    colorText: "rgba(244, 246, 249, 0.82)",
  },
  };

const Banner = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  display: flex;
  align-items: center;
  min-height: min(720px, calc(100svh - 72px));
  padding: 96px 0 112px;
  background:
    radial-gradient(
      ellipse 60% 90% at 88% 45%,
      rgba(181, 30, 50, 0.22) 0%,
      transparent 62%
    ),
    linear-gradient(90deg, #10294E 0%, ${colors.deepNavy} 100%);

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: url("/images/patterns/logistics-doodle.svg") center / 440px
      repeat;
    opacity: 0.06;
  }

  @media (max-width: 767px) {
    min-height: 0;
    padding: 72px 0 96px;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1.2fr) minmax(0, 0.8fr);
  align-items: center;
  gap: 48px;

  @media (max-width: 1099px) {
    grid-template-columns: 1fr;
  }
`;

const Eyebrow = styled(Text)`
  && {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(244, 246, 249, 0.72);

    &::before {
      content: "";
      width: 28px;
      height: 2px;
      background: ${colors.crimson};
    }
  }
`;

const Headline = styled.h1`
  margin: 0 0 24px;
  font-family: ${SERIF};
  font-size: clamp(2.3rem, 4.8vw, 4rem);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -0.03em;
  color: ${colors.softWhite};
`;

const Line = styled.span`
  display: block;
`;

// Each word sits in an overflow mask so it can rise into place
const Mask = styled.span`
  display: inline-block;
  overflow: hidden;
  padding: 0.06em 0.12em 0.14em 0;
  margin-right: 0.02em;
  vertical-align: bottom;
`;

const Accent = styled(motion.span)`
  display: inline-block;
  font-style: italic;
  background: linear-gradient(${colors.crimson}, ${colors.crimson}) no-repeat 0 92% /
    100% 0.07em;
`;

// Sized as a container so labels scale with the stage (cqw units)
const Stage = styled.div`
  position: relative;
  container-type: inline-size;
  width: 82%;
  max-width: 430px;
  aspect-ratio: 1;
  margin: 0 auto;

  @media (max-width: 1099px) {
    display: none;
  }
`;

const revolve = keyframes`
  from { transform: rotate(var(--a)); }
  to { transform: rotate(calc(var(--a) + 360deg)); }
`;

// Keeps the label upright while its ring turns; --a is the chip's total angle
const unrevolve = keyframes`
  from { transform: translate(-50%, -50%) rotate(calc(var(--a) * -1)); }
  to { transform: translate(-50%, -50%) rotate(calc(var(--a) * -1 - 360deg)); }
`;

const Orbit = styled.div<{ $inset: number; $seconds: number }>`
  position: absolute;
  inset: ${({ $inset }) => $inset}%;
  border: 1px dashed rgba(244, 246, 249, 0.26);
  border-radius: 50%;
  transform: rotate(var(--a));
  animation: ${revolve} ${({ $seconds }) => $seconds}s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

// Fixed offset of one body around its ring
const Slot = styled.span`
  position: absolute;
  inset: 0;
  transform: rotate(var(--b));
`;

const Chip = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  padding: 1.8cqw 3.6cqw;
  border: 1px solid rgba(244, 246, 249, 0.3);
  border-radius: 999px;
  background: rgba(16, 41, 78, 0.9);
  backdrop-filter: blur(8px);
  font-size: 3cqw;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${colors.softWhite};
  transform: translate(-50%, -50%) rotate(calc(var(--a) * -1));
  animation: ${unrevolve} var(--s) linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Planet = styled.i`
  position: absolute;
  top: 0;
  left: 50%;
  width: 2.3cqw;
  height: 2.3cqw;
  border-radius: 50%;
  background: var(--c);
  box-shadow: 0 0 0 0.9cqw rgba(244, 246, 249, 0.12);
  transform: translate(-50%, -50%);
`;

const Core = styled.div`
  position: absolute;
  inset: 33%;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(181, 30, 50, 0.28) 0%,
    rgba(181, 30, 50, 0) 70%
  );

  img {
    width: 70%;
    height: auto;
    filter: brightness(0) invert(1);
  }
`;

const CueTrack = styled.span`
  position: relative;
  width: 3px;
  height: 52px;
  overflow: hidden;
  border-radius: 3px;
  background: ${colors.softWhite};
`;

const Cue = styled(motion.div)`
  position: absolute;
  z-index: 1;
  left: 50%;
  bottom: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-size: 11px;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: rgba(244, 246, 249, 0.6);
  transform: translateX(-50%);

  @media (max-width: 767px) {
    display: none;
  }
`;

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
    <ConfigProvider theme={theme}>
      <Banner
        aria-labelledby="about-heading"
        onPointerMove={onPointerMove}
        onPointerLeave={() => {
          px.set(0);
          py.set(0);
        }}
      >
        <Container style={{ width: "100%" }}>
          <Grid>
            <div>
              <motion.div {...fade(0.1)}>
                <Eyebrow>About Us</Eyebrow>
              </motion.div>
              <Headline id="about-heading">
                {LINES.map(({ words, accent }) =>
                  (
                    <Line key={words[0]}>
                      {words.map((text) => {
                        const delay = 0.15 + wordIndex++ * 0.09;
                        const Word = accent ? Accent : motion.span;
                        return (
                          <Mask key={text}>
                            <Word
                              style={{ display: "inline-block" }}
                              initial={reduceMotion ? false : { y: "110%" }}
                              animate={{ y: 0 }}
                              transition={{ duration: 0.9, delay, ease }}
                            >
                              {text}
                            </Word>
                          </Mask>
                        );
                      })}
                    </Line>
                  ),
                )}
              </Headline>
              <motion.div {...fade(0.75)}>
                <Paragraph
                  style={{
                    maxWidth: 520,
                    margin: 0,
                    fontSize: "clamp(1rem, 0.9rem + 0.4vw, 1.125rem)",
                    lineHeight: 1.65,
                  }}
                >
                  Kora Traders started in Munich, Germany with a simple belief:
                  the right people should meet, and the deal should hold
                  together in the details.
                </Paragraph>
              </motion.div>
            </div>

            <Stage aria-hidden>
              <motion.div
                style={{ position: "absolute", inset: 0, x: ringX, y: ringY }}
              >
                {RINGS.map((ring) => (
                  <Orbit
                    key={ring.inset}
                    $inset={ring.inset}
                    $seconds={ring.seconds}
                    style={{ "--a": `${ring.start}deg` } as React.CSSProperties}
                  >
                    {ring.traits?.map((trait, i, all) => {
                      const slot = (360 / all.length) * i;
                      return (
                        <Slot
                          key={trait}
                          style={{ "--b": `${slot}deg` } as React.CSSProperties}
                        >
                          <Chip
                            style={
                              {
                                "--a": `${ring.start + slot}deg`,
                                "--s": `${ring.seconds}s`,
                              } as React.CSSProperties
                            }
                          >
                            {trait}
                          </Chip>
                        </Slot>
                      );
                    })}
                    {ring.planet && (
                      <Slot style={{ "--b": "0deg" } as React.CSSProperties}>
                        <Planet style={{ "--c": ring.planet } as React.CSSProperties} />
                      </Slot>
                    )}
                  </Orbit>
                ))}
              </motion.div>

              <motion.div
                style={{ position: "absolute", inset: 0, x: markX, y: markY }}
              >
                <Core>
                  <Image
                    src="/images/logo/kora-logo-mark.svg"
                    alt=""
                    width={640}
                    height={714}
                    priority
                  />
                </Core>
              </motion.div>
            </Stage>
          </Grid>
        </Container>

        <Cue aria-hidden {...fade(1.1)}>
          <Text style={{ color: "inherit", font: "inherit" }}>Scroll</Text>
          <CueTrack>
            <motion.i
              style={{
                position: "absolute",
                inset: 0,
                background: colors.crimson,
              }}
              animate={reduceMotion ? undefined : { y: ["-100%", "100%"] }}
              transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
            />
          </CueTrack>
        </Cue>
      </Banner>
    </ConfigProvider>
  );
}
