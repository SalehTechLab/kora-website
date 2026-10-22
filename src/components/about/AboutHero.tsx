"use client";

import Image from "next/image";
import styled from "styled-components";
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

const CHIPS = [
  { label: "Source", style: { top: "8%", left: "6%" }, delay: 0 },
  { label: "Procure", style: { top: "46%", right: "-2%" }, delay: 1.2 },
  { label: "Deliver", style: { bottom: "6%", left: "14%" }, delay: 2.4 },
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

const Mark = styled.div`
  position: absolute;
  inset: 26%;
  filter: brightness(0) invert(1);
  opacity: 0.92;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const Chip = styled(motion.span)`
  position: absolute;
  padding: 8px 16px;
  border: 1px solid rgba(255, 255, 255, 0.28);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(8px);
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${colors.white};
`;

const Cue = styled(motion.div)`
  position: absolute;
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

  span {
    position: relative;
    width: 1px;
    height: 44px;
    overflow: hidden;
    background: rgba(255, 255, 255, 0.2);
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
              <motion.svg
                viewBox="0 0 100 100"
                style={{ position: "absolute", inset: 0, x: ringX, y: ringY }}
              >
                <circle
                  cx="50"
                  cy="50"
                  r="48"
                  fill="none"
                  stroke="rgba(255,255,255,0.12)"
                  strokeWidth="0.3"
                />
                <motion.g
                  style={{ originX: "50px", originY: "50px" }}
                  animate={reduceMotion ? undefined : { rotate: 360 }}
                  transition={{ duration: 48, ease: "linear", repeat: Infinity }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    fill="none"
                    stroke="rgba(255,255,255,0.35)"
                    strokeWidth="0.35"
                    strokeDasharray="1.2 2.4"
                  />
                  <circle cx="50" cy="10" r="2.1" fill={colors.burgundy} />
                  <circle cx="50" cy="10" r="0.8" fill="#fff" />
                </motion.g>
                <motion.g
                  style={{ originX: "50px", originY: "50px" }}
                  animate={reduceMotion ? undefined : { rotate: -360 }}
                  transition={{ duration: 70, ease: "linear", repeat: Infinity }}
                >
                  <circle
                    cx="50"
                    cy="50"
                    r="30"
                    fill="none"
                    stroke="rgba(255,255,255,0.2)"
                    strokeWidth="0.3"
                  />
                  <circle cx="80" cy="50" r="1.4" fill="#F08A98" />
                </motion.g>
              </motion.svg>

              <motion.div
                style={{ position: "absolute", inset: 0, x: markX, y: markY }}
              >
                <Mark>
                  <Image
                    src="/images/logo/kora-logo-mark.svg"
                    alt=""
                    width={640}
                    height={714}
                    priority
                  />
                </Mark>
              </motion.div>

              {CHIPS.map((chip) => (
                <Chip
                  key={chip.label}
                  style={chip.style}
                  animate={reduceMotion ? undefined : { y: [0, -8, 0] }}
                  transition={{
                    duration: 6,
                    ease: "easeInOut",
                    repeat: Infinity,
                    delay: chip.delay,
                  }}
                >
                  {chip.label}
                </Chip>
              ))}
            </Stage>
          </Grid>
        </Container>

        <Cue aria-hidden {...fade(1.1)}>
          <Text style={{ color: "inherit", font: "inherit" }}>Scroll</Text>
          <span>
            <motion.i
              style={{
                position: "absolute",
                inset: 0,
                background: colors.white,
              }}
              animate={reduceMotion ? undefined : { y: ["-100%", "100%"] }}
              transition={{ duration: 1.8, ease: "easeInOut", repeat: Infinity }}
            />
          </span>
        </Cue>
      </Banner>
    </ConfigProvider>
  );
}
