"use client";

import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Button, Flex, Typography } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import {
  AnimatePresence,
  animate,
  motion,
  useInView,
  useMotionValue,
  useMotionValueEvent,
  useReducedMotion,
} from "framer-motion";
import { colors } from "@/theme/themeConfig";

const { Title, Text, Paragraph } = Typography;

type IconName = "brief" | "search" | "box" | "ship" | "check";

const STEPS: {
  title: string;
  description: string;
  icon: IconName;
  accent: string;
  tint: string;
}[] = [
  {
    title: "Understanding Your Needs",
    description:
      "We start with a conversation about your product, volumes, budget, and timelines, so every decision that follows is built on a clear brief.",
    icon: "brief",
    accent: colors.deepNavy,
    tint: "#F4F6F9",
  },
  {
    title: "Sourcing & Supplier Verification",
    description:
      "We identify qualified suppliers, verify their credentials and capacity, and compare offers so you only work with partners you can trust.",
    icon: "search",
    accent: "#10294E",
    tint: "#F4F6F9",
  },
  {
    title: "Procurement & Order Preparation",
    description:
      "We negotiate terms, place orders, and oversee production, quality checks, packaging, and export documentation.",
    icon: "box",
    accent: "#10294E",
    tint: "#F4F6F9",
  },
  {
    title: "Logistics & International Shipping",
    description:
      "We choose the right mode (road, rail, sea, or air), book capacity, handle customs, and track your cargo across every border.",
    icon: "ship",
    accent: "#B51E32",
    tint: "#F4F6F9",
  },
  {
    title: "Delivery & Continued Partnership",
    description:
      "Your goods arrive at their destination, and we stay on as your partner for repeat orders, new markets, and ongoing support.",
    icon: "check",
    accent: colors.crimson,
    tint: "#F4F6F9",
  },
];

const ICON_PATHS: Record<IconName, string[]> = {
  brief: ["M7 4h10a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2z", "M9 3h6v3H9z", "M9 11h6", "M9 15h6", "M9 19h3"],
  search: ["M10.5 4a6.5 6.5 0 1 1 0 13a6.5 6.5 0 1 1 0-13z", "M15.5 15.5L21 21"],
  box: ["M12 3l8 4.5v9L12 21l-8-4.5v-9z", "M4 7.5l8 4.5l8-4.5", "M12 12v9"],
  ship: ["M3 14h18l-2.5 6h-13z", "M7 14V9h10v5", "M10.5 9V5h3v4"],
  check: ["M5 12.5l4.5 4.5L19 7"],
};

// Desktop canvas geometry, in SVG user units
const VB_W = 1200;
const VB_H = 460;
const LOW = 320;
const HIGH = 170;
const XS = [120, 360, 600, 840, 1080];
const nodeY = (i: number) => (i % 2 === 0 ? LOW : HIGH);

// Mirrored, congruent curves, so step i sits at exactly i / (n - 1) of the route
const ROUTE = XS.reduce((d, x, i) => {
  if (i === 0) return `M${x},${nodeY(0)}`;
  const px = XS[i - 1];
  return `${d} C${px + 120},${nodeY(i - 1)} ${x - 120},${nodeY(i)} ${x},${nodeY(i)}`;
}, "");

const LAST = STEPS.length - 1;
const AUTOPLAY_MS = 4200;
const ease = [0.22, 1, 0.36, 1] as const;

function StepIcon({ name, size = 30 }: { name: IconName; size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" aria-hidden>
      {ICON_PATHS[name].map((d, i) => (
        <motion.path
          key={d}
          d={d}
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.1 + i * 0.12, ease }}
        />
      ))}
    </svg>
  );
}

const Canvas = styled.div`
  position: relative;
  aspect-ratio: ${VB_W} / ${VB_H};
  margin-bottom: 40px;

  > svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
  }

  @media (max-width: 991px) {
    display: none;
  }
`;

const Anchor = styled.div`
  position: absolute;
  width: 0;
  height: 0;
`;

const NodeButton = styled(motion.button)`
  position: absolute;
  left: -44px;
  top: -44px;
  width: 88px;
  height: 88px;
  border-radius: 50%;
  display: grid;
  place-items: center;
  border: 1.5px solid;
  cursor: pointer;
  padding: 0;

  &:focus-visible {
    outline: 3px solid ${colors.crimson};
    outline-offset: 6px;
  }
`;

const Ring = styled(motion.span)`
  position: absolute;
  inset: -1.5px;
  border-radius: 50%;
  border: 2px solid;
  pointer-events: none;
`;

const Label = styled(motion.div)`
  position: absolute;
  left: -115px;
  width: 230px;
  text-align: center;
  cursor: pointer;
`;

const Panel = styled.div`
  display: grid;
  grid-template-columns: auto 1fr auto;
  align-items: center;
  gap: 48px;
  max-width: 980px;
  margin: 0 auto;
  padding: 36px 48px;
  border-radius: 24px;
  background: ${colors.white};
  box-shadow: 0 24px 60px -32px rgba(16, 41, 78, 0.35);

  @media (max-width: 991px) {
    display: none;
  }
`;

const BigNumber = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;

  .eyebrow {
    font-size: 16px;
    font-weight: 600;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: ${colors.steelGray};
  }

  .digits {
    font-family: var(--font-serif), Georgia, "Times New Roman", serif;
    font-size: 84px;
    font-weight: 700;
    line-height: 1;
  }
`;

const MobileList = styled.ol`
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;

  @media (min-width: 992px) {
    display: none;
  }
`;

const MobileTrack = styled.span`
  position: absolute;
  left: 27px;
  top: 28px;
  bottom: 28px;
  width: 2px;
  background: repeating-linear-gradient(
    to bottom,
    ${colors.steelGray} 0 6px,
    transparent 6px 12px
  );
`;

const MobileFill = styled(motion.span)`
  position: absolute;
  inset: 0;
  transform-origin: top;
  background: linear-gradient(${colors.deepNavy}, ${colors.crimson});
`;

export default function ProcessJourney() {
  const uid = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();

  const rootRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<SVGPathElement>(null);
  const revealed = useInView(rootRef, { once: true, amount: 0.35 });
  const inView = useInView(rootRef, { amount: 0.35 });

  const [active, setActive] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const [hovering, setHovering] = useState(false);
  const playing = autoplay && !hovering && inView && !reduceMotion;

  // Staggered entrance only applies to the first reveal
  const [intro, setIntro] = useState(true);
  useEffect(() => {
    if (!revealed) return;
    const timer = setTimeout(() => setIntro(false), 1600);
    return () => clearTimeout(timer);
  }, [revealed]);

  // Route progress (0–1) drives both the drawn trail and the travelling cargo dot
  const progress = useMotionValue(0);
  const dotX = useMotionValue(XS[0]);
  const dotY = useMotionValue(LOW);

  const placeDot = (value: number) => {
    const route = routeRef.current;
    if (!route) return;
    const point = route.getPointAtLength(value * route.getTotalLength());
    dotX.set(point.x);
    dotY.set(point.y);
  };

  useMotionValueEvent(progress, "change", placeDot);
  useLayoutEffect(() => placeDot(progress.get()));

  useEffect(() => {
    if (!revealed) return;
    const controls = animate(progress, active / LAST, {
      duration: reduceMotion ? 0 : 1.1,
      ease,
    });
    return () => controls.stop();
  }, [active, revealed, reduceMotion, progress]);

  useEffect(() => {
    if (!playing) return;
    const timer = setTimeout(
      () => setActive((current) => (current + 1) % STEPS.length),
      AUTOPLAY_MS,
    );
    return () => clearTimeout(timer);
  }, [playing, active]);

  const select = (index: number) => {
    setAutoplay(false);
    setActive((index + STEPS.length) % STEPS.length);
  };

  const step = STEPS[active];

  return (
    <div ref={rootRef}>
      <Canvas
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} aria-hidden>
          <defs>
            <linearGradient
              id={`${uid}-trail`}
              gradientUnits="userSpaceOnUse"
              x1={XS[0]}
              x2={XS[LAST]}
              y1={0}
              y2={0}
            >
              {STEPS.map((s, i) => (
                <stop key={s.title} offset={i / LAST} stopColor={s.accent} />
              ))}
            </linearGradient>
            <mask id={`${uid}-reveal`}>
              <motion.rect
                y={0}
                height={VB_H}
                fill="#F4F6F9"
                initial={{ width: 0 }}
                animate={{ width: revealed ? VB_W : 0 }}
                transition={{ duration: reduceMotion ? 0 : 1.6, ease }}
              />
            </mask>
            <filter id={`${uid}-glow`} x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="6" />
            </filter>
          </defs>

          <g mask={`url(#${uid}-reveal)`}>
            <path
              d={`M0,${LOW} H${XS[0]} M${XS[LAST]},${LOW} H${VB_W}`}
              stroke={colors.steelGray}
              strokeWidth={3}
              strokeDasharray="8 10"
              strokeLinecap="round"
            />
            <path
              ref={routeRef}
              d={ROUTE}
              fill="none"
              stroke={colors.steelGray}
              strokeWidth={3}
              strokeDasharray="2 12"
              strokeLinecap="round"
            />
          </g>

          <motion.path
            d={ROUTE}
            fill="none"
            stroke={`url(#${uid}-trail)`}
            strokeWidth={4}
            strokeLinecap="round"
            style={{ pathLength: progress }}
          />

          {/* Sea waves under the shipping step */}
          <g transform={`translate(${XS[3] - 60} ${HIGH + 88})`}>
            {[0, 1].map((row) => (
              <motion.path
                key={row}
                d="M0 0 q10 -8 20 0 t20 0 t20 0 t20 0 t20 0"
                transform={`translate(${row * 22} ${row * 12})`}
                fill="none"
                stroke="#8C9BB0"
                strokeWidth={2.5}
                strokeLinecap="round"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: active === 3 ? 0.9 : 0.35,
                  x: reduceMotion ? 0 : [0, row ? 10 : -10, 0],
                }}
                transition={{
                  opacity: { duration: 0.4 },
                  x: { duration: 3 + row, repeat: Infinity, ease: "easeInOut" },
                }}
              />
            ))}
          </g>

          {/* Travelling cargo dot */}
          {revealed && (
            <g>
              <motion.circle
                cx={dotX}
                cy={dotY}
                r={14}
                fill={colors.crimson}
                filter={`url(#${uid}-glow)`}
                animate={reduceMotion ? undefined : { opacity: [0.35, 0.8, 0.35] }}
                transition={{ duration: 1.6, repeat: Infinity }}
              />
              <motion.circle
                cx={dotX}
                cy={dotY}
                r={7}
                fill={colors.crimson}
                stroke={colors.softWhite}
                strokeWidth={3}
              />
            </g>
          )}
        </svg>

        {STEPS.map((s, i) => {
          const isActive = i === active;
          const reached = i <= active;
          const above = i % 2 === 1;

          return (
            <Anchor
              key={s.title}
              style={{
                left: `${(XS[i] / VB_W) * 100}%`,
                top: `${(nodeY(i) / VB_H) * 100}%`,
              }}
            >
              <NodeButton
                type="button"
                aria-label={`Step ${i + 1}: ${s.title}`}
                aria-pressed={isActive}
                onClick={() => select(i)}
                initial={{ scale: 0, opacity: 0 }}
                animate={{
                  scale: revealed ? (isActive ? 1.14 : 1) : 0,
                  opacity: revealed ? 1 : 0,
                  backgroundColor: isActive ? s.accent : reached ? s.tint : colors.white,
                  borderColor: reached ? s.accent : colors.steelGray,
                  color: isActive ? colors.softWhite : reached ? s.accent : "#8C9BB0",
                  boxShadow: isActive
                    ? `0 18px 40px -12px ${s.accent}`
                    : "0 0 0 0 rgba(36, 44, 56, 0)",
                }}
                whileHover={{ scale: isActive ? 1.18 : 1.08 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: intro ? 0.25 + i * 0.18 : 0,
                }}
              >
                <motion.span
                  key={isActive ? "on" : "off"}
                  style={{ display: "grid" }}
                  animate={
                    isActive && s.icon === "ship" && !reduceMotion
                      ? { y: [0, -4, 0], rotate: [0, -3, 0, 3, 0] }
                      : undefined
                  }
                  transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
                >
                  <StepIcon name={s.icon} />
                </motion.span>

                {isActive && !reduceMotion && (
                  <>
                    {[0, 1].map((n) => (
                      <Ring
                        key={n}
                        style={{ borderColor: s.accent }}
                        initial={{ scale: 1, opacity: 0.5 }}
                        animate={{ scale: 1.9, opacity: 0 }}
                        transition={{
                          duration: 2,
                          repeat: Infinity,
                          delay: n,
                          ease: "easeOut",
                        }}
                      />
                    ))}
                  </>
                )}

                {/* Autoplay countdown */}
                {isActive && playing && (
                  <svg
                    viewBox="0 0 100 100"
                    style={{ position: "absolute", inset: -10, width: 108, height: 108 }}
                    aria-hidden
                  >
                    <motion.circle
                      key={active}
                      cx={50}
                      cy={50}
                      r={48}
                      fill="none"
                      stroke={s.accent}
                      strokeWidth={2}
                      strokeLinecap="round"
                      transform="rotate(-90 50 50)"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: AUTOPLAY_MS / 1000, ease: "linear" }}
                    />
                  </svg>
                )}

                {/* Arrival burst on the final step */}
                {isActive && i === LAST && !reduceMotion &&
                  Array.from({ length: 10 }, (_, n) => {
                    const angle = (n / 10) * Math.PI * 2;
                    return (
                      <motion.span
                        key={n}
                        style={{
                          position: "absolute",
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: n % 2 ? colors.crimson : colors.deepNavy,
                        }}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{
                          x: Math.cos(angle) * 78,
                          y: Math.sin(angle) * 78,
                          opacity: 0,
                          scale: 0.3,
                        }}
                        transition={{ duration: 1.1, delay: 0.9, ease: "easeOut" }}
                      />
                    );
                  })}
              </NodeButton>

              <Label
                style={above ? { bottom: 74 } : { top: 74 }}
                onClick={() => select(i)}
                initial={{ opacity: 0, y: above ? -12 : 12 }}
                animate={{
                  opacity: revealed ? (reached ? 1 : 0.55) : 0,
                  y: revealed ? 0 : above ? -12 : 12,
                }}
                transition={{ duration: 0.6, delay: intro ? 0.5 + i * 0.18 : 0, ease }}
              >
                <Text
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: reached ? s.accent : undefined,
                    marginBottom: 4,
                  }}
                  type={reached ? undefined : "secondary"}
                >
                  Step {String(i + 1).padStart(2, "0")}
                </Text>
                <Title level={4} style={{ margin: 0, fontSize: 18, lineHeight: 1.3 }}>
                  {s.title}
                </Title>
              </Label>
            </Anchor>
          );
        })}
      </Canvas>

      <Panel aria-live="polite">
        <AnimatePresence mode="wait" initial={false}>
          <BigNumber
            key={`n-${active}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -24 }}
            transition={{ duration: 0.4, ease }}
          >
            <span className="eyebrow">Step</span>
            <span className="digits" style={{ color: step.accent }}>
              {String(active + 1).padStart(2, "0")}
            </span>
          </BigNumber>
        </AnimatePresence>

        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={`t-${active}`}
            initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -24, filter: "blur(6px)" }}
            transition={{ duration: 0.4, ease }}
          >
            <Title level={3} style={{ marginBottom: 8 }}>
              {step.title}
            </Title>
            <Paragraph type="secondary" style={{ margin: 0, fontSize: 16, lineHeight: 1.6 }}>
              {step.description}
            </Paragraph>
          </motion.div>
        </AnimatePresence>

        <Flex gap={12}>
          <Button
            shape="circle"
            size="large"
            icon={<ArrowLeftOutlined />}
            aria-label="Previous step"
            onClick={() => select(active - 1)}
          />
          <Button
            type="primary"
            shape="circle"
            size="large"
            icon={<ArrowRightOutlined />}
            aria-label="Next step"
            onClick={() => select(active + 1)}
          />
        </Flex>
      </Panel>

      <MobileList>
        <MobileTrack aria-hidden>
          <MobileFill
            initial={{ scaleY: 0 }}
            animate={{ scaleY: revealed ? active / LAST : 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.9, ease }}
          />
        </MobileTrack>

        {STEPS.map((s, i) => {
          const isActive = i === active;
          const reached = i <= active;
          return (
            <motion.li
              key={s.title}
              style={{ position: "relative", display: "flex", gap: 20, paddingBottom: i === LAST ? 0 : 36 }}
              initial={{ opacity: 0, x: -16 }}
              animate={{ opacity: revealed ? 1 : 0, x: revealed ? 0 : -16 }}
              transition={{ duration: 0.5, delay: intro ? i * 0.1 : 0, ease }}
            >
              <motion.button
                type="button"
                aria-label={`Step ${i + 1}: ${s.title}`}
                aria-pressed={isActive}
                onClick={() => select(i)}
                style={{
                  flex: "none",
                  width: 56,
                  height: 56,
                  borderRadius: "50%",
                  border: "1.5px solid",
                  display: "grid",
                  placeItems: "center",
                  padding: 0,
                  cursor: "pointer",
                }}
                animate={{
                  scale: isActive ? 1.1 : 1,
                  backgroundColor: isActive ? s.accent : reached ? s.tint : colors.white,
                  borderColor: reached ? s.accent : colors.steelGray,
                  color: isActive ? colors.softWhite : reached ? s.accent : "#8C9BB0",
                }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
              >
                <StepIcon key={isActive ? "on" : "off"} name={s.icon} size={22} />
              </motion.button>
              <div style={{ paddingTop: 4 }} onClick={() => select(i)}>
                <Text
                  type={reached ? undefined : "secondary"}
                  style={{
                    display: "block",
                    fontSize: 12,
                    fontWeight: 600,
                    letterSpacing: "0.14em",
                    textTransform: "uppercase",
                    color: reached ? s.accent : undefined,
                  }}
                >
                  Step {String(i + 1).padStart(2, "0")}
                </Text>
                <Title level={4} style={{ margin: "4px 0 6px", fontSize: 18 }}>
                  {s.title}
                </Title>
                <Paragraph type="secondary" style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}>
                  {s.description}
                </Paragraph>
              </div>
            </motion.li>
          );
        })}
      </MobileList>
    </div>
  );
}
