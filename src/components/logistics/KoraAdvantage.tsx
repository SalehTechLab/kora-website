"use client";

import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Card, ConfigProvider, Divider, Flex, Col, Row, Typography, type ThemeConfig } from "antd";
import { CheckOutlined, CloseOutlined } from "@ant-design/icons";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { colors } from "@/theme/themeConfig";

const { Title, Paragraph, Text } = Typography;

const EASE = [0.22, 1, 0.36, 1] as const;

const TRADITIONAL = [
  "Multiple supplier contacts",
  "Fragmented sourcing process",
  "Separate shipping arrangements",
  "Limited process visibility",
  "Transactional relationships",
];

const KORA = [
  "One trading partner",
  "Coordinated sourcing & procurement",
  "Integrated logistics coordination",
  "Clear communication throughout",
  "Long-term business partnerships",
];

// Fragmented rows sit slightly off-grid; the Kora rows stay aligned
const JITTER = [0, 14, -6, 10, 2];

const MUTED = "#6b7688";

const sectionTheme: ThemeConfig = {
  components: {
    Typography: { titleMarginTop: 0, titleMarginBottom: 0 },
    Card: { bodyPadding: 0, borderRadiusLG: 0 },
    Divider: { marginLG: 0 },
  },
};

const koraTheme: ThemeConfig = {
  token: {
    colorBgContainer: colors.navy,
    colorBorderSecondary: "rgba(255, 255, 255, 0.14)",
    colorTextHeading: colors.white,
    colorText: "rgba(255, 255, 255, 0.92)",
    colorTextDescription: "rgba(255, 255, 255, 0.6)",
    colorSplit: "rgba(255, 255, 255, 0.12)",
  },
};

const oldTheme: ThemeConfig = {
  token: {
    colorBgContainer: "rgba(255, 255, 255, 0.6)",
    colorBorderSecondary: "#b9c2d1",
    colorTextHeading: "#4a5568",
    colorText: MUTED,
    colorTextDescription: "#8792a5",
    colorSplit: "#d0d7e2",
  },
};

/* ---------- layout ---------- */

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: 120px 24px;
  background-color: ${colors.white};
  background-image: radial-gradient(rgba(16, 41, 78, 0.09) 1px, transparent 1px);
  background-size: 28px 28px;

  /* soften the dot grid toward the edges */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at center, transparent 35%, ${colors.white} 85%);
    pointer-events: none;
  }

  @media (max-width: 767px) {
    padding: 80px 20px;
  }
`;

const Container = styled.div`
  position: relative;
  max-width: 1200px;
  margin: 0 auto;
`;

const Head = styled(motion.div)`
  max-width: 760px;
  margin: 0 auto clamp(40px, 6vw, 72px);
  text-align: center;
`;

const Eyebrow = styled(Text)`
  && {
    display: inline-flex;
    align-items: center;
    gap: 14px;
    margin-bottom: 16px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${colors.burgundy};

    &::before,
    &::after {
      content: "";
      width: 28px;
      height: 1px;
      background: currentColor;
      opacity: 0.55;
    }
  }
`;

const Headline = styled(Title)`
  && {
    font-family: var(--font-serif), Georgia, serif;
    font-size: clamp(2rem, 5vw, 3.5rem);
    line-height: 1.08;
    letter-spacing: -0.025em;
    margin-bottom: 20px;
  }
`;

// Hand-drawn style underline that wipes in under the key word
const Highlight = styled.span`
  position: relative;
  display: inline-block;
  font-style: italic;
  color: ${colors.burgundy};
`;

const Underline = styled(motion.span)`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.02em;
  height: 0.09em;
  background: ${colors.burgundy};
  opacity: 0.35;
  transform-origin: left center;
`;

const Stage = styled.div`
  position: relative;
`;

// VS medallion straddling the two cards (desktop only)
const Medallion = styled(motion.div)`
  position: absolute;
  z-index: 3;
  top: 128px;
  left: 50%;
  width: 60px;
  height: 60px;
  margin-left: -30px;
  display: grid;
  place-items: center;
  font-family: var(--font-serif), Georgia, serif;
  font-size: 18px;
  font-weight: 700;
  font-style: italic;
  letter-spacing: 0.02em;
  color: ${colors.white};
  background: ${colors.burgundy};
  border-radius: 50%;
  box-shadow:
    0 0 0 6px ${colors.white},
    0 12px 32px -8px rgba(181, 30, 50, 0.6);

  @media (max-width: 991px) {
    display: none;
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); opacity: 0.45; }
  100% { transform: scale(2.1); opacity: 0; }
`;

const Ring = styled.span`
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.5px solid ${colors.burgundy};
  animation: ${pulse} 2.6s ease-out infinite;
  pointer-events: none;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    opacity: 0;
  }
`;

const CardShell = styled(motion.div)`
  height: 100%;

  .ant-card {
    height: 100%;
  }
`;

const KoraGlow = styled.div`
  position: relative;
  height: 100%;
  box-shadow: 0 40px 90px -40px rgba(16, 41, 78, 0.65);

  /* faint brand glow rising from the bottom */
  .ant-card {
    background-image:
      radial-gradient(ellipse 80% 50% at 50% 110%, rgba(181, 30, 50, 0.32), transparent 70%),
      linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
    background-size:
      auto,
      32px 32px,
      32px 32px;
  }
`;

const Pad = styled.div`
  padding: clamp(24px, 3.2vw, 40px);
`;

const CardTitle = styled(Title)`
  && {
    font-family: var(--font-serif), Georgia, serif;
    font-size: clamp(1.5rem, 2.4vw, 2rem);
    line-height: 1.15;
    letter-spacing: -0.02em;
  }
`;

const Kicker = styled(Text)`
  && {
    display: block;
    margin-bottom: 8px;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
  }
`;

const Row_ = styled.div<{ $hot: boolean; $kora: boolean }>`
  display: flex;
  align-items: center;
  gap: 16px;
  min-height: 68px;
  padding: 0 16px;
  margin: 0 -16px;
  transition:
    background-color 0.3s,
    color 0.3s;
  background-color: ${({ $hot, $kora }) =>
    $hot ? ($kora ? "rgba(255, 255, 255, 0.07)" : "rgba(181, 30, 50, 0.05)") : "transparent"};
  cursor: default;
`;

const Label = styled(Text)<{ $kora: boolean }>`
  && {
    font-size: clamp(0.95rem, 0.9rem + 0.3vw, 1.075rem);
    font-weight: ${({ $kora }) => ($kora ? 600 : 400)};
    line-height: 1.35;
  }
`;

const Mark = styled(motion.span)<{ $kora: boolean }>`
  flex: none;
  display: grid;
  place-items: center;
  width: 28px;
  height: 28px;
  font-size: 12px;
  border-radius: 50%;
  color: ${({ $kora }) => ($kora ? colors.white : "#8792a5")};
  background: ${({ $kora }) => ($kora ? colors.burgundy : "transparent")};
  border: ${({ $kora }) => ($kora ? "none" : "1.5px dashed #b0b9c9")};
  box-shadow: ${({ $kora }) => ($kora ? "0 0 18px rgba(181, 30, 50, 0.65)" : "none")};
`;

const Closing = styled(motion.div)`
  margin-top: clamp(40px, 6vw, 64px);
  text-align: center;
`;

/* ---------- diagram ---------- */

const flow = keyframes`
  to { stroke-dashoffset: -20; }
`;

const flicker = keyframes`
  0%, 100% { opacity: 0.25; }
  50% { opacity: 1; }
`;

const Svg = styled(motion.svg)`
  display: block;
  width: 100%;
  height: auto;
  overflow: visible;

  .flow {
    stroke-dasharray: 4 6;
    animation: ${flow} 1.4s linear infinite;
  }
  .flicker {
    animation: ${flicker} 2.2s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    .flow,
    .flicker {
      animation: none;
    }
  }
`;

const SRC_Y = [24, 67, 110, 153, 196];
const YOU = { x: 476, y: 110 };
const HUB = { x: 262, y: 110 };

// Tangled: every supplier routes to "you" along its own crossing path
const tangled = (y: number, i: number) =>
  `M44,${y} C ${150 + (i % 2) * 40},${220 - y} ${330 - (i % 2) * 60},${y + (i % 2 ? -70 : 70)} ${YOU.x},${YOU.y}`;

// Coordinated: every source funnels through one hub, then one line out
const funnel = (y: number) => `M44,${y} C 140,${y} 170,${HUB.y} ${HUB.x},${HUB.y}`;
const fullRoute = (y: number) => `${funnel(y)} L ${YOU.x},${YOU.y}`;

const drawIn: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: { duration: 1.1, delay: 0.35 + i * 0.12, ease: EASE },
  }),
};

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  show: (i: number) => ({ opacity: 1, transition: { duration: 0.8, delay: 0.3 + i * 0.12 } }),
};

const popIn: Variants = {
  hidden: { opacity: 0, scale: 0.4 },
  show: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: { type: "spring", stiffness: 260, damping: 18, delay: 0.2 + i * 0.08 },
  }),
};

function Node({ x, y, fill, stroke, i }: { x: number; y: number; fill: string; stroke: string; i: number }) {
  return (
    <motion.rect
      x={x - 7}
      y={y - 7}
      width={14}
      height={14}
      fill={fill}
      stroke={stroke}
      strokeWidth={1.5}
      variants={popIn}
      custom={i}
      style={{ transformBox: "fill-box", transformOrigin: "center" }}
    />
  );
}

function Packet({ path, delay, color, lost }: { path: string; delay: number; color: string; lost?: boolean }) {
  return (
    <circle r={3.2} fill={color} opacity={0}>
      <animateMotion dur="3.2s" begin={`${delay}s`} repeatCount="indefinite" path={path} />
      <animate
        attributeName="opacity"
        dur="3.2s"
        begin={`${delay}s`}
        repeatCount="indefinite"
        values={lost ? "0;1;1;0;0" : "0;1;1;1;0"}
        keyTimes={lost ? "0;0.1;0.45;0.55;1" : "0;0.08;0.5;0.92;1"}
      />
    </circle>
  );
}

function TraditionalDiagram({ reduce }: { reduce: boolean }) {
  return (
    <Svg viewBox="0 0 520 220" aria-hidden>
      {SRC_Y.map((y, i) => (
        <motion.path
          key={y}
          className="flow"
          d={tangled(y, i)}
          fill="none"
          stroke="#9aa5b8"
          strokeWidth={1.4}
          strokeLinecap="round"
          variants={fadeIn}
          custom={i}
        />
      ))}
      {/* breakdown points along the tangle */}
      {[
        [196, 62],
        [292, 150],
        [350, 80],
      ].map(([x, y], i) => (
        <motion.g key={x} variants={fadeIn} custom={5 + i}>
          <g className="flicker" style={{ animationDelay: `${i * 0.7}s` }}>
            <circle cx={x} cy={y} r={9} fill="#fff" stroke={colors.burgundy} strokeWidth={1.2} />
            <path
              d={`M${x - 3.5},${y - 3.5} L${x + 3.5},${y + 3.5} M${x + 3.5},${y - 3.5} L${x - 3.5},${y + 3.5}`}
              stroke={colors.burgundy}
              strokeWidth={1.5}
              strokeLinecap="round"
            />
          </g>
        </motion.g>
      ))}
      {!reduce &&
        [0, 2, 4].map((i) => (
          <Packet key={i} path={tangled(SRC_Y[i], i)} delay={i * 0.55} color="#8792a5" lost />
        ))}
      {SRC_Y.map((y, i) => (
        <Node key={y} x={44} y={y} i={i} fill="#fff" stroke="#9aa5b8" />
      ))}
      <Node x={YOU.x} y={YOU.y} i={5} fill="#fff" stroke="#6b7688" />
      <text x={YOU.x} y={YOU.y + 28} textAnchor="middle" fontSize={10} letterSpacing="0.18em" fill="#8792a5">
        YOU
      </text>
    </Svg>
  );
}

function KoraDiagram({ reduce }: { reduce: boolean }) {
  return (
    <Svg viewBox="0 0 520 220" aria-hidden>
      {SRC_Y.map((y, i) => (
        <motion.path
          key={y}
          d={funnel(y)}
          fill="none"
          stroke="rgba(255,255,255,0.4)"
          strokeWidth={1.4}
          strokeLinecap="round"
          variants={drawIn}
          custom={i}
        />
      ))}
      <motion.path
        d={`M${HUB.x},${HUB.y} L${YOU.x},${YOU.y}`}
        stroke={colors.burgundy}
        strokeWidth={3}
        strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 6px rgba(181,30,50,0.9))" }}
        variants={drawIn}
        custom={5}
      />
      {!reduce &&
        SRC_Y.map((y, i) => <Packet key={y} path={fullRoute(y)} delay={i * 0.6} color="#fff" />)}

      {/* hub */}
      <motion.g variants={popIn} custom={5} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
        {!reduce &&
          [0, 1].map((k) => (
            <motion.circle
              key={k}
              cx={HUB.x}
              cy={HUB.y}
              r={26}
              fill="none"
              stroke={colors.burgundy}
              strokeWidth={1.2}
              initial={{ scale: 1, opacity: 0.6 }}
              animate={{ scale: 1.9, opacity: 0 }}
              transition={{ duration: 2.6, repeat: Infinity, delay: k * 1.3, ease: "easeOut" }}
              style={{ transformBox: "fill-box", transformOrigin: "center" }}
            />
          ))}
        <circle cx={HUB.x} cy={HUB.y} r={26} fill={colors.burgundy} />
        <circle cx={HUB.x} cy={HUB.y} r={32} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth={1} />
        <text
          x={HUB.x}
          y={HUB.y + 3.5}
          textAnchor="middle"
          fontSize={10}
          fontWeight={700}
          letterSpacing="0.16em"
          fill="#fff"
        >
          KORA
        </text>
      </motion.g>

      {SRC_Y.map((y, i) => (
        <Node key={y} x={44} y={y} i={i} fill={colors.navy} stroke="rgba(255,255,255,0.8)" />
      ))}
      <Node x={YOU.x} y={YOU.y} i={5} fill={colors.white} stroke={colors.white} />
      <text x={YOU.x} y={YOU.y + 28} textAnchor="middle" fontSize={10} letterSpacing="0.18em" fill="#fff">
        YOU
      </text>
    </Svg>
  );
}

/* ---------- parts ---------- */

function Column({
  kora,
  kicker,
  title,
  items,
  hover,
  onHover,
  reduce,
}: {
  kora: boolean;
  kicker: string;
  title: string;
  items: string[];
  hover: number | null;
  onHover: (i: number | null) => void;
  reduce: boolean;
}) {
  const shell: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 48 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0 : 0.9, ease: EASE, delay: kora && !reduce ? 0.2 : 0 },
    },
  };
  const list: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.1, delayChildren: kora ? 0.9 : 0.7 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, x: reduce ? 0 : kora ? 28 : -28 },
    show: { opacity: 1, x: 0, transition: { duration: reduce ? 0 : 0.6, ease: EASE } },
  };

  const body = (
    <Card variant="outlined" style={kora ? undefined : { borderStyle: "dashed" }}>
      <Pad>
        <Kicker type="secondary" style={kora ? { color: "#f08a99" } : undefined}>
          {kicker}
        </Kicker>
        <CardTitle level={3}>{title}</CardTitle>
        <div style={{ margin: "clamp(20px, 3vw, 32px) 0" }}>
          {kora ? <KoraDiagram reduce={reduce} /> : <TraditionalDiagram reduce={reduce} />}
        </div>
        <motion.ul variants={list} style={{ listStyle: "none" }}>
          {items.map((text, i) => (
            <motion.li key={text} variants={item}>
              {i > 0 && <Divider dashed={!kora} style={{ margin: 0 }} />}
              <Row_
                $hot={hover === i}
                $kora={kora}
                onMouseEnter={() => onHover(i)}
                onMouseLeave={() => onHover(null)}
                style={kora || reduce ? undefined : { transform: `translateX(${JITTER[i]}px)` }}
              >
                <Mark
                  $kora={kora}
                  aria-hidden
                  variants={popIn}
                  custom={i}
                  animate={hover === i ? { scale: 1.15 } : undefined}
                >
                  {kora ? <CheckOutlined /> : <CloseOutlined />}
                </Mark>
                <Label $kora={kora}>{text}</Label>
              </Row_>
            </motion.li>
          ))}
        </motion.ul>
      </Pad>
    </Card>
  );

  return (
    <CardShell variants={shell}>
      <ConfigProvider theme={kora ? koraTheme : oldTheme}>
        {kora ? <KoraGlow>{body}</KoraGlow> : body}
      </ConfigProvider>
    </CardShell>
  );
}

export default function KoraAdvantage() {
  const reduceMotion = useReducedMotion() ?? false;
  const [hover, setHover] = useState<number | null>(null);

  const rise = {
    initial: reduceMotion ? false : { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-80px" },
    transition: { duration: reduceMotion ? 0 : 0.8, ease: EASE },
  } as const;

  return (
    <ConfigProvider theme={sectionTheme}>
      <Section id="kora-advantage" aria-labelledby="advantage-heading">
        <Container>
          <Head {...rise}>
            <Eyebrow>The Kora Advantage</Eyebrow>
            <Headline level={2} id="advantage-heading">
              A{" "}
              <Highlight>
                Smarter
                <Underline
                  aria-hidden
                  initial={reduceMotion ? false : { scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: reduceMotion ? 0 : 0.9, delay: 0.5, ease: EASE }}
                />
              </Highlight>{" "}
              Way to Trade.
            </Headline>
            <Paragraph
              type="secondary"
              style={{
                maxWidth: 640,
                margin: "0 auto",
                color: MUTED,
                fontSize: "clamp(0.95rem, 0.85rem + 0.4vw, 1.0625rem)",
                lineHeight: 1.7,
              }}
            >
              Global trading doesn&rsquo;t have to mean juggling multiple suppliers, complex
              processes, and disconnected logistics. We bring sourcing, procurement, and delivery
              coordination together for a more connected trading experience.
            </Paragraph>
          </Head>

          <Stage>
            <Medallion
              aria-hidden
              initial={reduceMotion ? false : { opacity: 0, scale: 0.3, rotate: -40 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ type: "spring", stiffness: 200, damping: 16, delay: 0.7 }}
            >
              <Ring />
              VS
            </Medallion>

            <Row gutter={[{ xs: 0, lg: 40 }, 28]} align="stretch">
              {[
                { kora: false, kicker: "Without Kora", title: "Traditional Approach", items: TRADITIONAL },
                { kora: true, kicker: "With Kora", title: "The Kora Way", items: KORA },
              ].map((c) => (
                <Col key={c.title} xs={24} lg={12}>
                  <motion.div
                    style={{ height: "100%" }}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-100px" }}
                  >
                    <Column
                      kora={c.kora}
                      kicker={c.kicker}
                      title={c.title}
                      items={c.items}
                      hover={hover}
                      onHover={setHover}
                      reduce={reduceMotion}
                    />
                  </motion.div>
                </Col>
              ))}
            </Row>
          </Stage>

          <Closing {...rise}>
            <Flex justify="center" align="center" gap={14} wrap>
              <Text style={{ color: MUTED, fontSize: "1.0625rem" }}>Many moving parts.</Text>
              <Text
                strong
                style={{
                  color: colors.navy,
                  fontFamily: "var(--font-serif), Georgia, serif",
                  fontSize: "1.375rem",
                }}
              >
                One partner.
              </Text>
            </Flex>
          </Closing>
        </Container>
      </Section>
    </ConfigProvider>
  );
}
