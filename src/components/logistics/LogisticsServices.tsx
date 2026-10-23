"use client";

import { useRef, useState, type ComponentType } from "react";
import styled from "styled-components";
import { ConfigProvider, Typography, type ThemeConfig } from "antd";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { colors } from "@/theme/themeConfig";
import {
  AirScene,
  CustomsScene,
  RailScene,
  RoadScene,
  SeaScene,
  type SceneProps,
} from "./ServiceScenes";

const { Title, Paragraph, Text } = Typography;

type Service = {
  key: string;
  label: string;
  title: string;
  description: string;
  points: string[];
  accent: string;
  Scene: ComponentType<SceneProps>;
};

const SERVICES: Service[] = [
  {
    key: "air",
    label: "Air",
    title: "Air Freight",
    description:
      "Fast and efficient air freight solutions for urgent, high-value, and time-sensitive shipments. We coordinate international air cargo through trusted logistics partners.",
    points: [
      "Express Shipping",
      "Time-Sensitive Cargo",
      "Airport-to-Airport",
      "Door-to-Door Delivery",
    ],
    accent: "#8C9BB0",
    Scene: AirScene,
  },
  {
    key: "sea",
    label: "Sea",
    title: "Sea Freight",
    description:
      "Cost-effective ocean freight solutions for bulk commodities, containerized cargo, and international shipments. We coordinate global shipping arrangements for businesses of all sizes.",
    points: [
      "Full Container Load (FCL)",
      "Less than Container Load (LCL)",
      "Port-to-Port Shipping",
      "Cargo Consolidation",
    ],
    accent: "#8C9BB0",
    Scene: SeaScene,
  },
  {
    key: "road",
    label: "Road",
    title: "Road Freight",
    description:
      "Flexible and reliable road transportation solutions supporting domestic and cross-border cargo movement across Europe and international markets.",
    points: [
      "Full Truckload (FTL)",
      "Less than Truckload (LTL)",
      "Cross-Border Transport",
      "Door-to-Door Delivery",
    ],
    accent: "#8C9BB0",
    Scene: RoadScene,
  },
  {
    key: "rail",
    label: "Rail",
    title: "Rail Freight",
    description:
      "Cost-effective and reliable rail freight solutions for bulk cargo, containerized goods, and long-distance shipments. We coordinate rail transportation through trusted logistics partners across major international trade corridors.",
    points: [
      "Bulk Cargo Transport",
      "Containerized Rail Freight",
      "Cross-Border Shipping",
      "Intermodal Transportation",
    ],
    accent: "#B51E32",
    Scene: RailScene,
  },
  {
    key: "customs",
    label: "Customs",
    title: "Customs & Documentation",
    description:
      "Streamlined customs and trade documentation support for international shipments. We work with experienced customs and logistics partners to coordinate clearance procedures and import-export requirements.",
    points: [
      "Import & Export Documentation",
      "Customs Clearance Coordination",
      "Trade Compliance Support",
      "Duties & Tariff Guidance",
    ],
    accent: "#8C9BB0",
    Scene: CustomsScene,
  },
];

const COUNT = SERVICES.length;
const NAVBAR = 72;
const EASE = [0.22, 1, 0.36, 1] as const;

const sectionTheme: ThemeConfig = {
  token: {
    colorTextHeading: colors.softWhite,
    colorText: "rgba(244, 246, 249, 0.72)",
    colorTextDescription: "rgba(244, 246, 249, 0.6)",
  },
  components: {
    Typography: { titleMarginTop: 0, titleMarginBottom: 0 },
  },
};

/* ---------- layout ---------- */

// Tall runway; the stage inside pins while scroll drives the story
const Runway = styled.section`
  position: relative;
  height: calc(100svh + ${COUNT * 90}svh);
  background: linear-gradient(180deg, #10294E 0%, ${colors.deepNavy} 100%);
`;

const Stage = styled.div`
  position: sticky;
  top: ${NAVBAR}px;
  display: flex;
  flex-direction: column;
  height: calc(100svh - ${NAVBAR}px);
  max-width: 1320px;
  margin: 0 auto;
  padding: 0 32px;
  overflow: hidden;

  @media (max-width: 991px) {
    padding: 0 20px;
  }
`;

// Holds everything above the progress rail so the column guides stop short of it
const Body = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  min-height: 0;

  /* hairline column guides, echoing the reference grid */
  &::before,
  &::after {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(244, 246, 249, 0.07);
    pointer-events: none;
  }
  &::before {
    left: 0;
  }
  &::after {
    right: 0;
  }
`;

const Heading = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(12px, 2vw, 28px);
  padding: clamp(16px, 3.2svh, 36px) 0 clamp(12px, 2.6svh, 28px);

  h2 {
    font-family: var(--font-serif), Georgia, serif !important;
    font-size: clamp(1.4rem, 3.6vw, 3rem) !important;
    line-height: 1.1 !important;
    letter-spacing: -0.02em;
    text-align: center;
  }
`;

const Grid = styled.div`
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 2.1fr) minmax(0, 1fr);
  grid-template-areas: "copy panel points";
  align-items: stretch;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    grid-template-rows: minmax(150px, 1fr) auto auto;
    grid-template-areas: "panel" "copy" "points";
    row-gap: 22px;
    padding-bottom: 4px;
  }
`;

const Cell = styled.div<{ $area: string }>`
  grid-area: ${({ $area }) => $area};
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 0;
  padding: 0 clamp(16px, 2.4vw, 36px);

  @media (max-width: 991px) {
    padding: 0;
    justify-content: flex-start;
  }
`;

const Panel = styled.div`
  grid-area: panel;
  position: relative;
  align-self: center;
  width: 100%;
  aspect-ratio: 720 / 440;
  max-height: 100%;
  overflow: hidden;
  border: 1px solid rgba(244, 246, 249, 0.12);
  background: #10294E;
  box-shadow: 0 30px 80px -30px rgba(36, 44, 56, 0.6);

  @media (max-width: 991px) {
    align-self: stretch;
    aspect-ratio: auto;
    min-height: 0;
  }
`;

const Layer = styled(motion.div)`
  position: absolute;
  inset: 0;
`;

// Viewfinder corners + live index in the panel
const Corner = styled.span<{ $pos: string }>`
  position: absolute;
  width: 14px;
  height: 14px;
  border: 0 solid rgba(244, 246, 249, 0.75);
  pointer-events: none;
  ${({ $pos }) =>
    ({
      tl: "top: 12px; left: 12px; border-top-width: 1.5px; border-left-width: 1.5px;",
      tr: "top: 12px; right: 12px; border-top-width: 1.5px; border-right-width: 1.5px;",
      bl: "bottom: 12px; left: 12px; border-bottom-width: 1.5px; border-left-width: 1.5px;",
      br: "bottom: 12px; right: 12px; border-bottom-width: 1.5px; border-right-width: 1.5px;",
    })[$pos]}
`;

const Counter = styled.div`
  position: absolute;
  top: 20px;
  left: 32px;
  display: flex;
  align-items: baseline;
  gap: 6px;
  font-variant-numeric: tabular-nums;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.14em;
  color: rgba(244, 246, 249, 0.7);
  text-shadow: 0 1px 8px rgba(36, 44, 56, 0.5);
  pointer-events: none;

  strong {
    font-size: 20px;
    color: #F4F6F9;
  }

  @media (max-width: 991px) {
    display: none;
  }
`;

const Eyebrow = styled(Text)`
  && {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #B51E32;

    @media (max-width: 991px) {
      margin-bottom: 8px;
    }

    &::after {
      content: "";
      width: 36px;
      height: 1px;
      background: currentColor;
      opacity: 0.6;
    }
  }
`;

const ServiceTitle = styled(Title)`
  && {
    font-family: var(--font-serif), Georgia, serif;
    font-size: clamp(1.7rem, 2.1vw, 2.2rem);
    line-height: 1.12;
    overflow-wrap: break-word;
    letter-spacing: -0.02em;
    margin-bottom: 12px;

    @media (max-width: 991px) {
      font-size: 1.4rem;
      margin-bottom: 8px;
    }
  }
`;

const Points = styled.ul`
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 2svh, 22px);
  list-style: none;

  li {
    display: flex;
    align-items: center;
    gap: 14px;
    font-size: clamp(0.95rem, 1.2vw, 1.1rem);
    font-weight: 500;
    color: rgba(244, 246, 249, 0.88);
  }

  @media (max-width: 991px) {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 8px 16px;

    li {
      font-size: 0.8rem;
      gap: 10px;
    }
  }
`;

const Bullet = styled.span<{ $color: string }>`
  flex: none;
  width: 8px;
  height: 8px;
  background: ${({ $color }) => $color};
  box-shadow: 0 0 14px ${({ $color }) => $color};
`;

// Big ghost numeral behind the copy
const Ghost = styled(motion.span)`
  position: absolute;
  left: clamp(8px, 1.6vw, 24px);
  bottom: 4%;
  font-family: var(--font-serif), Georgia, serif;
  font-size: clamp(6rem, 12vw, 11rem);
  font-weight: 700;
  line-height: 0.8;
  color: transparent;
  -webkit-text-stroke: 1px rgba(244, 246, 249, 0.08);
  pointer-events: none;
  user-select: none;

  @media (max-width: 991px) {
    display: none;
  }
`;

/* ---------- progress rail ---------- */

const Rail = styled.nav`
  display: grid;
  grid-template-columns: repeat(${COUNT}, 1fr);
  gap: 8px;
  padding: clamp(12px, 2.4svh, 24px) 0 clamp(14px, 3svh, 30px);

  @media (max-width: 575px) {
    padding-right: 52px; /* clear the floating WhatsApp button */
  }
`;

const RailItem = styled.button`
  all: unset;
  box-sizing: border-box;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding-top: 2px;

  &:focus-visible {
    outline: 2px solid #F4F6F9;
    outline-offset: 4px;
  }
`;

const Track = styled.span`
  position: relative;
  display: block;
  height: 2px;
  background: rgba(244, 246, 249, 0.14);
  overflow: hidden;
`;

const Fill = styled(motion.span)`
  position: absolute;
  inset: 0;
  background: ${colors.crimson};
  transform-origin: left center;
`;

const RailLabel = styled.span<{ $active: boolean }>`
  display: flex;
  gap: 8px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $active }) => ($active ? "#F4F6F9" : "rgba(244, 246, 249, 0.4)")};
  transition: color 0.3s;

  &:hover {
    color: #F4F6F9;
  }

  @media (max-width: 575px) {
    span {
      display: none;
    }
  }
`;

/* ---------- parts ---------- */

function SceneLayer({
  index,
  active,
  scroll,
  reduce,
  Scene,
}: {
  index: number;
  active: boolean;
  scroll: MotionValue<number>;
  reduce: boolean;
  Scene: ComponentType<SceneProps>;
}) {
  // 0..1 progress through this service's slice of the runway
  const local = useTransform(scroll, (v) =>
    reduce ? 0.5 : Math.min(1, Math.max(0, v * COUNT - index)),
  );

  return (
    <Layer
      initial={false}
      animate={{
        opacity: active ? 1 : 0,
        scale: active ? 1 : 1.08,
        filter: active ? "blur(0px)" : "blur(10px)",
      }}
      transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
      style={{ pointerEvents: "none" }}
    >
      <Scene progress={local} />
    </Layer>
  );
}

function RailButton({
  index,
  service,
  active,
  scroll,
  onSelect,
}: {
  index: number;
  service: Service;
  active: boolean;
  scroll: MotionValue<number>;
  onSelect: (i: number) => void;
}) {
  const fill = useTransform(scroll, (v) =>
    Math.min(1, Math.max(0, v * COUNT - index)),
  );
  return (
    <RailItem type="button" onClick={() => onSelect(index)} aria-current={active}>
      <Track>
        <Fill style={{ scaleX: fill }} />
      </Track>
      <RailLabel $active={active}>
        {String(index + 1).padStart(2, "0")}
        <span>{service.label}</span>
      </RailLabel>
    </RailItem>
  );
}

export default function LogisticsServices() {
  const runwayRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(COUNT - 1, Math.max(0, Math.floor(v * COUNT)));
    setActive((prev) => (prev === next ? prev : next));
  });

  const scrollTo = (i: number) => {
    const el = runwayRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + ((i + 0.5) / COUNT) * travel,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const current = SERVICES[active];

  const swap = {
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: reduceMotion ? { opacity: 0 } : { opacity: 0, y: -24 },
    transition: { duration: reduceMotion ? 0 : 0.45, ease: EASE },
  } as const;

  return (
    <ConfigProvider theme={sectionTheme}>
      <Runway ref={runwayRef} id="logistics-services" aria-labelledby="services-heading">
        <Stage>
          <Body>
          <Heading>
            <Title level={2} id="services-heading">
              Our Logistics Services
            </Title>
          </Heading>

          <Grid>
            <Cell $area="copy">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={current.key} {...swap}>
                  <Eyebrow>
                    {String(active + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
                  </Eyebrow>
                  <ServiceTitle level={3}>{current.title}</ServiceTitle>
                  <Paragraph
                    type="secondary"
                    style={{ margin: 0, fontSize: "clamp(0.8rem, 1.2vw + 0.45rem, 0.95rem)", lineHeight: 1.6 }}
                  >
                    {current.description}
                  </Paragraph>
                </motion.div>
              </AnimatePresence>
              <AnimatePresence mode="wait" initial={false}>
                <Ghost
                  key={current.key}
                  aria-hidden
                  initial={reduceMotion ? false : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
                >
                  {String(active + 1).padStart(2, "0")}
                </Ghost>
              </AnimatePresence>
            </Cell>

            <Panel>
              {SERVICES.map((s, i) => (
                <SceneLayer
                  key={s.key}
                  index={i}
                  active={i === active}
                  scroll={scrollYProgress}
                  reduce={reduceMotion}
                  Scene={s.Scene}
                />
              ))}
              <Corner $pos="tl" />
              <Corner $pos="tr" />
              <Corner $pos="bl" />
              <Corner $pos="br" />
              <Counter aria-hidden>
                <strong>{String(active + 1).padStart(2, "0")}</strong>
                <span>— {current.label}</span>
              </Counter>
            </Panel>

            <Cell $area="points">
              <AnimatePresence mode="wait" initial={false}>
                <Points
                  as={motion.ul}
                  key={current.key}
                  initial="hidden"
                  animate="show"
                  exit="gone"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.08, delayChildren: 0.15 } },
                    gone: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                  }}
                >
                  {current.points.map((p) => (
                    <motion.li
                      key={p}
                      variants={{
                        hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 },
                        show: { opacity: 1, x: 0, transition: { duration: reduceMotion ? 0 : 0.45, ease: EASE } },
                        gone: { opacity: 0, transition: { duration: 0.15 } },
                      }}
                    >
                      <Bullet $color={current.accent} aria-hidden />
                      {p}
                    </motion.li>
                  ))}
                </Points>
              </AnimatePresence>
            </Cell>
          </Grid>
          </Body>

          <Rail aria-label="Logistics services">
            {SERVICES.map((s, i) => (
              <RailButton
                key={s.key}
                index={i}
                service={s}
                active={i === active}
                scroll={scrollYProgress}
                onSelect={scrollTo}
              />
            ))}
          </Rail>
        </Stage>
      </Runway>
    </ConfigProvider>
  );
}
