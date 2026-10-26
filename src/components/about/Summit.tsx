"use client";

import { useRef } from "react";
import styled, { keyframes } from "styled-components";
import { Button, ConfigProvider, Typography, type ThemeConfig } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { colors } from "@/theme/themeConfig";
import { Container, Eyebrow, Headline, ease, useReveal } from "./shared";

const { Title, Paragraph } = Typography;

const OUTCOMES = [
  {
    title: "Supply you can plan around",
    description:
      "Vetted partners and premium products, so the next order is never a gamble.",
  },
  {
    title: "Prices that hold up",
    description:
      "Data-driven sourcing and transparent terms, with no surprises in the details.",
  },
  {
    title: "Delivery that lands on time",
    description:
      "We stay on every shipment until the job is done, not just until the intro.",
  },
];

const theme: ThemeConfig = {
  components: { Typography: { titleMarginTop: 0, titleMarginBottom: 0 } },
};

// Palette-only tints for the illustration
const SKIN = `color-mix(in srgb, ${colors.steelGray} 58%, ${colors.white})`;
const RIGHT_FACE = `color-mix(in srgb, ${colors.steelGray} 30%, ${colors.deepNavy})`;
const CASE_SHADE = `color-mix(in srgb, ${colors.steelGray} 60%, ${colors.deepNavy})`;
const CROWN = `color-mix(in srgb, ${colors.crimson} 70%, ${colors.darkSlate})`;

const Section = styled.section`
  padding: 120px 0;
  background: ${colors.white};

  @media (max-width: 767px) {
    padding: 80px 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 0.9fr) minmax(0, 1.1fr);
  align-items: center;
  gap: 72px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

const Trail = styled.ol`
  position: relative;
  margin: 40px 0 0;
  padding: 0;
  list-style: none;
`;

// Track and progress share one rail, running through the centre of every node
const Rail = styled.span`
  position: absolute;
  top: 10px;
  bottom: 10px;
  left: 5px;
  width: 2px;
  border-radius: 1px;
  background: rgba(140, 155, 176, 0.3);
  pointer-events: none;
  mask-image: linear-gradient(to bottom, #000 calc(100% - 64px), transparent);
`;

const RailFill = styled(motion.span)`
  display: block;
  width: 100%;
  height: 100%;
  border-radius: 1px;
  background: ${colors.crimson};
  transform-origin: top;
`;

const Step = styled.li`
  position: relative;
  padding: 0 0 36px 40px;

  &:last-child {
    padding-bottom: 0;
  }
`;

const Node = styled(motion.span)`
  position: absolute;
  top: 6px;
  left: 0;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  border: 2px solid ${colors.steelGray};
  background: ${colors.white};
  box-shadow: 0 0 0 5px ${colors.white};
`;

const sway = keyframes`
  from { transform: translateX(-14px); }
  to { transform: translateX(14px); }
`;

const bob = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
`;

const flash = keyframes`
  0%, 100% { opacity: 0.25; }
  50% { opacity: 1; }
`;

const Card = styled(motion.div)`
  position: relative;
  overflow: hidden;
  isolation: isolate;
  border: 1px solid rgba(140, 155, 176, 0.35);
  border-radius: 28px;
  background: linear-gradient(180deg, ${colors.white} 0%, ${colors.softWhite} 100%);
  aspect-ratio: 1 / 1.02;

  @media (max-width: 767px) {
    border-radius: 20px;
  }

  svg {
    display: block;
    width: 100%;
    height: 100%;
  }

  .cloud {
    animation: ${sway} 9s ease-in-out infinite alternate;
  }
  .cloud-2 {
    animation-duration: 12s;
    animation-direction: alternate-reverse;
  }
  .cloud-3 {
    animation-duration: 15s;
  }
  .trophy {
    animation: ${bob} 3.2s ease-in-out infinite;
  }
  .ray {
    animation: ${flash} 1.8s ease-in-out infinite;
  }
  .ray-2 {
    animation-delay: 0.3s;
  }
  .ray-3 {
    animation-delay: 0.6s;
  }

  @media (prefers-reduced-motion: reduce) {
    .cloud,
    .trophy,
    .ray {
      animation: none;
    }
  }
`;

const CLOUD =
  "M0 44 C0 34 10 28 20 31 C24 16 44 10 58 22 C66 12 86 16 88 30 C102 28 112 38 104 46 L8 46 C3 46 0 45 0 44 Z";

function Illustration() {
  const reduceMotion = useReducedMotion();

  return (
    <svg
      viewBox="0 0 600 612"
      preserveAspectRatio="xMidYMax slice"
      role="img"
      aria-label="A business owner standing on a summit, holding a trophy above the clouds"
    >
      {/* Distant cloud banks */}
      <path
        d="M0 470 C50 430 120 436 170 466 C220 440 290 446 330 476 C380 440 450 442 490 470 C530 452 570 458 600 478 L600 612 L0 612 Z"
        fill={colors.steelGray}
        opacity={0.14}
      />
      <path
        d="M0 520 C60 488 130 496 180 520 C240 500 300 506 350 530 C410 502 480 508 530 528 C560 520 585 524 600 532 L600 612 L0 612 Z"
        fill={colors.steelGray}
        opacity={0.22}
      />

      {/* Drifting clouds */}
      <g className="cloud">
        <path d={CLOUD} fill={colors.steelGray} opacity={0.22} transform="translate(70 96) scale(1.5)" />
      </g>
      <g className="cloud cloud-2">
        <path d={CLOUD} fill={colors.steelGray} opacity={0.18} transform="translate(430 250) scale(1.15)" />
      </g>
      <g className="cloud cloud-3">
        <path d={CLOUD} fill={colors.steelGray} opacity={0.16} transform="translate(40 330) scale(0.9)" />
      </g>

      <g transform="translate(0 40)">
        {/* Summit */}
        <path d="M255 400 L205 468 L120 494 L70 560 L215 560 L262 480 Z" fill={colors.darkSlate} />
        <path d="M255 400 L345 400 L352 462 L378 560 L215 560 L262 480 Z" fill={colors.deepNavy} />
        <path d="M345 400 L410 458 L495 484 L545 560 L378 560 L352 462 Z" fill={RIGHT_FACE} />
        <path
          d="M262 480 L305 492 L352 462 M305 492 L330 560"
          fill="none"
          stroke={colors.darkSlate}
          strokeOpacity={0.55}
          strokeWidth={2}
          strokeLinejoin="round"
        />

        <motion.g
          initial={reduceMotion ? false : { y: 36, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, delay: 0.2, ease }}
        >
          {/* Legs and shoes */}
          <path d="M274 262 L328 258 L338 394 L314 394 L302 316 L288 394 L262 394 Z" fill={colors.deepNavy} />
          <path d="M283 300 L276 392 M322 300 L326 392" fill="none" stroke={colors.darkSlate} strokeOpacity={0.35} strokeWidth={2} />
          <rect x={254} y={392} width={38} height={9} rx={4.5} fill={colors.darkSlate} />
          <rect x={310} y={392} width={38} height={9} rx={4.5} fill={colors.darkSlate} />

          {/* Briefcase arm: rounded sleeve from the shoulder down to the hand */}
          <path
            d="M272 184 C263 208 258 232 258 254"
            fill="none"
            stroke={colors.deepNavy}
            strokeWidth={15}
            strokeLinecap="round"
          />
          <path
            d="M268 192 C262 210 260 230 260 246"
            fill="none"
            stroke={colors.darkSlate}
            strokeOpacity={0.35}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <circle cx={257} cy={265} r={8.5} fill={SKIN} />
          <path d="M250 272 V261 H272 V272" fill="none" stroke={colors.deepNavy} strokeWidth={3} strokeLinejoin="round" />
          <rect x={232} y={270} width={56} height={44} rx={5} fill={colors.steelGray} />
          <path d="M232 294 H288 V309 a5 5 0 0 1 -5 5 H237 a5 5 0 0 1 -5 -5 Z" fill={CASE_SHADE} />

          {/* Raised arm: sleeve bends at the elbow and ends in a fist around the trophy */}
          <path
            d="M334 180 C358 174 372 150 378 104"
            fill="none"
            stroke={colors.deepNavy}
            strokeWidth={15}
            strokeLinecap="round"
          />
          <path
            d="M340 172 C358 166 368 146 374 112"
            fill="none"
            stroke={colors.darkSlate}
            strokeOpacity={0.35}
            strokeWidth={3}
            strokeLinecap="round"
          />
          <circle cx={380} cy={91} r={9.5} fill={SKIN} />

          {/* Shoulder caps close the gap where each sleeve meets the jacket */}
          <circle cx={337} cy={182} r={11} fill={colors.deepNavy} />
          <path d="M326 164 L352 160 L364 140 L346 150 Z" fill={colors.deepNavy} />
          <circle cx={346} cy={168} r={11} fill={colors.deepNavy} />
          <circle cx={332} cy={166} r={10} fill={colors.deepNavy} />
          <circle cx={271} cy={184} r={11} fill={colors.deepNavy} />

          {/* Torso: rounded shoulders, white shirt, lapels */}
          <path
            d="M262 186 C262 166 280 158 296 158 L312 158 C330 158 346 166 346 186 L350 262 Q308 276 264 266 Z"
            fill={colors.deepNavy}
          />
          {/* Suit front: white shirt, crimson tie, notch lapels, button and pocket square */}
          <path d="M288 160 L318 160 L304 240 Z" fill={colors.white} />
          <path d="M283 164 L304 240 L296 270 M325 164 L304 240 L312 270" fill="none" stroke={colors.darkSlate} strokeOpacity={0.55} strokeWidth={2} strokeLinejoin="round" strokeLinecap="round" />
          <path d="M276 184 L298 236 L284 244 Z M332 184 L310 236 L324 244 Z" fill={colors.darkSlate} opacity={0.28} />
          <path d="M291 157 L304 176 L287 184 Z" fill={colors.white} stroke={colors.steelGray} strokeOpacity={0.55} strokeWidth={1.3} strokeLinejoin="round" />
          <path d="M317 157 L304 176 L321 184 Z" fill={colors.white} stroke={colors.steelGray} strokeOpacity={0.55} strokeWidth={1.3} strokeLinejoin="round" />
          <path d="M298 174 L310 174 L308 186 L300 186 Z" fill={colors.crimson} />
          <path d="M300 186 L308 186 L312 232 L304 244 L296 232 Z" fill={colors.crimson} />
          <path d="M304 190 L304 238" stroke={colors.darkSlate} strokeOpacity={0.25} strokeWidth={1.4} />
          <circle cx={304} cy={254} r={2.8} fill={colors.steelGray} />
          <path d="M268 222 L280 219 L281 226 L269 229 Z" fill={colors.white} />
          <path d="M264 266 Q308 277 350 262" fill="none" stroke={colors.darkSlate} strokeOpacity={0.45} strokeWidth={2} strokeLinecap="round" />
          <rect x={291} y={138} width={22} height={26} rx={6} fill={SKIN} />

          {/* Head */}
          <ellipse cx={302} cy={122} rx={19} ry={23} fill={SKIN} />
          <path
            d="M282 120 C281 98 296 90 309 95 C320 91 327 102 321 112 C314 105 300 106 291 115 L287 128 Z"
            fill={colors.darkSlate}
          />

          {/* Raised arm and trophy */}
          <path d="M334 166 L354 162 L388 98 L368 88 Z" fill={colors.deepNavy} />
          <circle cx={382} cy={84} r={9} fill={SKIN} />

          <g transform="translate(0 9)">
          <g className="trophy">
            <rect x={374} y={68} width={16} height={7} rx={1.5} fill={colors.darkSlate} />
            <rect x={380} y={54} width={4} height={15} fill={CROWN} />
            <path d="M362 22 H402 C402 46 394 55 382 55 C370 55 362 46 362 22 Z" fill={colors.crimson} />
            <path
              d="M362 27 C348 27 348 45 366 47 M402 27 C416 27 416 45 398 47"
              fill="none"
              stroke={colors.crimson}
              strokeWidth={4}
              strokeLinecap="round"
            />
            <ellipse cx={374} cy={34} rx={3} ry={5} fill={colors.white} opacity={0.55} />
          </g>
          </g>

          {/* Glints */}
          <g
            stroke={colors.crimson}
            strokeWidth={4}
            strokeLinecap="round"
            fill="none"
          >
            <path className="ray" d="M342 16 L354 22" />
            <path className="ray ray-2" d="M354 -2 L362 8" />
            <path className="ray ray-3" d="M384 -10 L383 2" />
            <path className="ray ray-2" d="M424 16 L412 22" />
            <path className="ray" d="M412 -2 L404 8" />
          </g>
        </motion.g>
      </g>
    </svg>
  );
}

export default function Summit() {
  const reveal = useReveal();
  const reduceMotion = useReducedMotion();
  const trailRef = useRef<HTMLOListElement>(null);

  // The rail draws as the list passes through the viewport
  const { scrollYProgress } = useScroll({
    target: trailRef,
    offset: ["start 70%", "end 65%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <ConfigProvider theme={theme}>
      <Section aria-labelledby="summit-heading">
        <Container>
          <Grid>
            <div>
              <motion.div {...reveal()}>
                <Eyebrow>The Outcome</Eyebrow>
                <Headline level={2} id="summit-heading">
                  What a thriving business looks like.
                </Headline>
                <Paragraph
                  style={{
                    maxWidth: 520,
                    margin: "24px 0 0",
                    fontSize: "1.125rem",
                    lineHeight: 1.7,
                  }}
                >
                  When the right partners meet and the details hold, businesses
                  stop reacting and start growing. That is the result we work
                  toward on every deal.
                </Paragraph>
              </motion.div>

              <motion.div {...reveal(0.1)}>
                <Trail ref={trailRef} aria-label="What you can expect">
                  <Rail aria-hidden>
                    <RailFill style={{ scaleY: reduceMotion ? 1 : fill }} />
                  </Rail>
                  {OUTCOMES.map((item) => (
                    <Step key={item.title}>
                      <Node
                        aria-hidden
                        {...(reduceMotion
                          ? { style: { background: colors.crimson, borderColor: colors.crimson } }
                          : {
                              initial: false,
                              whileInView: {
                                background: colors.crimson,
                                borderColor: colors.crimson,
                                scale: [1, 1.5, 1],
                              },
                              viewport: { once: true, margin: "0px 0px -40% 0px" },
                              transition: { duration: 0.6, ease },
                            })}
                      />
                      <Title level={4} style={{ fontSize: "1.125rem" }}>
                        {item.title}
                      </Title>
                      <Paragraph
                        type="secondary"
                        style={{ margin: "6px 0 0", lineHeight: 1.6 }}
                      >
                        {item.description}
                      </Paragraph>
                    </Step>
                  ))}
                </Trail>

                <Button
                  type="primary"
                  size="large"
                  href="/contact-us"
                  icon={<ArrowRightOutlined />}
                  iconPlacement="end"
                  style={{ marginTop: 40 }}
                >
                  Start your climb
                </Button>
              </motion.div>
            </div>

            <Card {...reveal(0.1)}>
              <Illustration />
            </Card>
          </Grid>
        </Container>
      </Section>
    </ConfigProvider>
  );
}
