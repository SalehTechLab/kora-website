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
import { Container, Eyebrow, SERIF, ease } from "./shared";

const { Title, Paragraph, Text } = Typography;

const LINES = ["Opportunities", "are everywhere.", "Trust is rare."];

// Each label rides its own ring; inset is the ring's gap to the stage edge (%),
// angle its starting position, seconds one full revolution
const ORBITS = [
  { label: "Source", inset: 20, angle: 300, seconds: 32, dot: false },
  { label: "Procure", inset: 11, angle: 60, seconds: 46, dot: true },
  { label: "Deliver", inset: 3, angle: 180, seconds: 64, dot: false },
];

const theme: ThemeConfig = {
  token: {
    colorTextHeading: colors.white,
    colorText: "rgba(255, 255, 255, 0.82)",
  },
  components: { Typography: { titleMarginTop: 0, titleMarginBottom: 0 } },
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
    linear-gradient(90deg, #0b1d38 0%, ${colors.navy} 100%);

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

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const Line = styled.span`
  display: block;
  overflow: hidden;
  padding-bottom: 0.08em;
`;

const Headline = styled(Title).attrs({ level: 1 })`
  && {
    font-family: ${SERIF};
    font-size: clamp(2.25rem, 5.6vw, 4.5rem);
    line-height: 1.04;
    letter-spacing: -0.025em;
  }

  /* Last line carries the point, so it gets the accent */
  ${Line}:last-child span {
    font-style: italic;
    color: #f08a98;
  }
`;

const Stage = styled.div`
  position: relative;
  width: 100%;
  max-width: 440px;
  aspect-ratio: 1;
  margin-left: auto;

  @media (max-width: 991px) {
    display: none;
  }
`;

const revolve = keyframes`
  from { transform: rotate(var(--a)); }
  to { transform: rotate(calc(var(--a) + 360deg)); }
`;

// Keeps the label upright while its ring turns
const unrevolve = keyframes`
  from { transform: translate(-50%, -50%) rotate(calc(var(--a) * -1)); }
  to { transform: translate(-50%, -50%) rotate(calc(var(--a) * -1 - 360deg)); }
`;

const Orbit = styled.div<{ $inset: number; $seconds: number }>`
  position: absolute;
  inset: ${({ $inset }) => $inset}%;
  border: 1px dashed rgba(255, 255, 255, 0.26);
  border-radius: 50%;
  transform: rotate(var(--a));
  animation: ${revolve} ${({ $seconds }) => $seconds}s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Chip = styled.span`
  position: absolute;
  top: 0;
  left: 50%;
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 999px;
  background: rgba(16, 41, 78, 0.85);
  backdrop-filter: blur(8px);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  white-space: nowrap;
  color: ${colors.white};
  transform: translate(-50%, -50%) rotate(calc(var(--a) * -1));
  animation: ${unrevolve} var(--s) linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

// Small planet on the far side of its ring
const Planet = styled.i`
  position: absolute;
  bottom: 0;
  left: 50%;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: ${colors.burgundy};
  box-shadow: 0 0 0 4px rgba(181, 30, 50, 0.25);
  transform: translate(-50%, 50%);
`;

const Core = styled.div`
  position: absolute;
  inset: 29%;
  display: grid;
  place-items: center;
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(240, 138, 152, 0.28) 0%,
    rgba(240, 138, 152, 0) 70%
  );

  img {
    width: 66%;
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
  background: ${colors.white};
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
  color: rgba(255, 255, 255, 0.6);
  transform: translateX(-50%);

  @media (max-width: 767px) {
    display: none;
  }
`;

export default function AboutHero() {
  const reduceMotion = useReducedMotion();

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

  const rise = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { y: "110%" },
          animate: { y: 0 },
          transition: { duration: 0.9, delay, ease },
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
                <Eyebrow $light>About Us</Eyebrow>
              </motion.div>
              <Headline id="about-heading">
                {LINES.map((line, i) => (
                  <Line key={line}>
                    <motion.span
                      style={{ display: "inline-block" }}
                      {...rise(0.2 + i * 0.14)}
                    >
                      {line}
                    </motion.span>
                  </Line>
                ))}
              </Headline>
              <motion.div {...fade(0.75)}>
                <Paragraph
                  style={{
                    maxWidth: 560,
                    margin: "28px 0 0",
                    fontSize: "clamp(1rem, 0.9rem + 0.4vw, 1.125rem)",
                    lineHeight: 1.7,
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
                {ORBITS.map((orbit) => (
                  <Orbit
                    key={orbit.label}
                    $inset={orbit.inset}
                    $seconds={orbit.seconds}
                    style={{ "--a": `${orbit.angle}deg` } as React.CSSProperties}
                  >
                    <Chip
                      style={
                        {
                          "--a": `${orbit.angle}deg`,
                          "--s": `${orbit.seconds}s`,
                        } as React.CSSProperties
                      }
                    >
                      {orbit.label}
                    </Chip>
                    {orbit.dot && <Planet />}
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
                background: colors.burgundy,
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
