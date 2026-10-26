"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import styled from "styled-components";
import {
  Button,
  ConfigProvider,
  Flex,
  Input,
  Segmented,
  Typography,
  type ThemeConfig,
} from "antd";
import {
  ArrowRightOutlined,
  CarOutlined,
  CheckOutlined,
  DollarOutlined,
  MessageOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { colors } from "@/theme/themeConfig";
import { Container, Eyebrow, SERIF, useReveal } from "@/components/about/shared";

const { Title, Paragraph, Text } = Typography;

const deskTheme: ThemeConfig = {
  token: {
    colorTextHeading: colors.softWhite,
    colorText: "rgba(244, 246, 249, 0.82)",
    colorTextDescription: "rgba(244, 246, 249, 0.62)",
  },
  components: {
    Typography: { titleMarginTop: 0, titleMarginBottom: 0 },
    Segmented: {
      trackBg: "rgba(244, 246, 249, 0.1)",
      itemColor: "rgba(244, 246, 249, 0.75)",
      itemHoverColor: colors.softWhite,
      itemHoverBg: "rgba(244, 246, 249, 0.08)",
      itemSelectedBg: colors.softWhite,
      itemSelectedColor: colors.deepNavy,
    },
    Button: {
      defaultColor: colors.softWhite,
      defaultBg: "rgba(244, 246, 249, 0.08)",
      defaultBorderColor: "rgba(244, 246, 249, 0.18)",
      defaultHoverColor: colors.softWhite,
      defaultHoverBg: colors.crimson,
      defaultHoverBorderColor: colors.crimson,
      defaultActiveColor: colors.softWhite,
      defaultActiveBg: colors.crimson,
      defaultActiveBorderColor: colors.crimson,
      defaultShadow: "none",
      primaryShadow: "none",
    },
    Input: { controlHeight: 52, borderRadius: 999, paddingInline: 22 },
  },
};

const STEPS = [
  {
    key: "brief",
    icon: <MessageOutlined />,
    title: "You tell us what you need",
    text: "Product, specification, quantity and destination. A rough brief is enough to start.",
    optional: false,
  },
  {
    key: "source",
    icon: <SearchOutlined />,
    title: "We source it",
    text: "We search the market and our supplier network, then shortlist verified options.",
    optional: true,
  },
  {
    key: "procure",
    icon: <DollarOutlined />,
    title: "We procure it",
    text: "We negotiate on your behalf to land a competitive price, and handle orders and paperwork.",
    optional: true,
  },
  {
    key: "deliver",
    icon: <CarOutlined />,
    title: "We deliver it",
    text: "Air, sea, rail or road. We coordinate shipping and track it to your door.",
    optional: true,
  },
] as const;

const EXAMPLES = [
  "Solar panels",
  "Construction steel",
  "Packaging machinery",
  "Medical consumables",
  "Furniture",
  "Spices & pulses",
];

const Section = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  scroll-margin-top: 128px;
  padding: 120px 0;
  background:
    radial-gradient(
      ellipse 50% 70% at 12% 20%,
      rgba(181, 30, 50, 0.2) 0%,
      transparent 60%
    ),
    ${colors.deepNavy};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: url("/images/patterns/logistics-doodle.svg") center / 440px repeat;
    opacity: 0.05;
  }

  @media (max-width: 767px) {
    padding: 72px 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
  gap: 72px;
  align-items: start;

  @media (max-width: 959px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 56px;
  }
`;

const Left = styled.div`
  position: sticky;
  top: 160px;

  @media (max-width: 959px) {
    position: static;
  }
`;

const Big = styled(Title)`
  && {
    font-family: ${SERIF};
    font-size: clamp(2.25rem, 5vw, 4rem);
    line-height: 1.05;
    letter-spacing: -0.03em;
  }
`;

const Em = styled.em`
  font-style: italic;
  background: linear-gradient(${colors.crimson}, ${colors.crimson}) no-repeat 0 92% /
    100% 0.07em;
`;

const Timeline = styled.ol`
  position: relative;
  margin: 28px 0 0;
  padding: 0;
  list-style: none;
`;

const Rail = styled.div`
  position: absolute;
  top: 28px;
  bottom: 28px;
  left: 27px;
  width: 2px;
  background: rgba(244, 246, 249, 0.14);
`;

const RailFill = styled(motion.div)`
  width: 100%;
  height: 100%;
  background: ${colors.crimson};
  transform-origin: top;
`;

const StepRow = styled.li<{ $on: boolean; $pick: boolean }>`
  position: relative;
  display: flex;
  gap: 20px;
  padding: 14px 0;
  opacity: ${({ $on }) => ($on ? 1 : 0.42)};
  transition: opacity 0.3s;

  button {
    all: unset;
    display: flex;
    gap: 20px;
    width: 100%;
    cursor: ${({ $pick }) => ($pick ? "pointer" : "default")};
    border-radius: 12px;
  }

  button:focus-visible {
    outline: 2px solid ${colors.softWhite};
    outline-offset: 4px;
  }
`;

const Badge = styled.span<{ $on: boolean }>`
  position: relative;
  z-index: 1;
  flex: none;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  font-size: 20px;
  color: ${({ $on }) => ($on ? colors.softWhite : "rgba(244, 246, 249, 0.6)")};
  background: ${({ $on }) => ($on ? colors.crimson : colors.deepNavy)};
  border: 2px solid
    ${({ $on }) => ($on ? colors.crimson : "rgba(244, 246, 249, 0.24)")};
  transition:
    background 0.3s,
    border-color 0.3s,
    color 0.3s;
`;

const Summary = styled.div`
  margin-top: 28px;
  padding: 18px 22px;
  border: 1px solid rgba(244, 246, 249, 0.16);
  border-left: 3px solid ${colors.crimson};
  border-radius: 4px;
  background: rgba(244, 246, 249, 0.05);
  font-size: 14.5px;
  line-height: 1.55;
  color: rgba(244, 246, 249, 0.86);
`;

type Mode = "end" | "custom";

export default function SourcingDesk() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const reveal = useReveal();
  const timelineRef = useRef<HTMLOListElement>(null);
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<Mode>("end");
  const [picked, setPicked] = useState<Set<string>>(
    new Set(["source", "procure"]),
  );

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  const isOn = (key: string, optional: boolean) =>
    mode === "end" || !optional || picked.has(key);

  const toggle = (key: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const submit = () => {
    const product = query.trim();
    router.push(
      product ? `/contact-us?product=${encodeURIComponent(product)}` : "/contact-us",
    );
  };

  const chosen = STEPS.filter((s) => s.optional && picked.has(s.key)).map((s) =>
    s.key === "source" ? "sourcing" : s.key === "procure" ? "procurement" : "delivery",
  );

  return (
    <ConfigProvider theme={deskTheme}>
      <Section id="anything" aria-labelledby="anything-heading">
        <Container>
          <Grid>
            <Left>
              <motion.div {...reveal(0)}>
                <Eyebrow $light style={{ color: "rgba(244, 246, 249, 0.72)" }}>
                  Not on the list?
                </Eyebrow>
                <Big level={2} id="anything-heading">
                  Name it. <Em>We&rsquo;ll source it.</Em>
                </Big>
                <Paragraph
                  style={{
                    maxWidth: 480,
                    margin: "24px 0 32px",
                    fontSize: "clamp(1rem, 0.9rem + 0.4vw, 1.125rem)",
                    lineHeight: 1.65,
                  }}
                >
                  Our catalogues are only the start. Tell us the product you
                  need and we will search the market, tap our network and get
                  it to you at a competitive price, with end-to-end service
                  or just the parts you want.
                </Paragraph>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    submit();
                  }}
                >
                  <Flex gap={10} wrap>
                    <Input
                      size="large"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="e.g. 40ft container of floor tiles"
                      aria-label="Product you need"
                      maxLength={200}
                      style={{ flex: "1 1 260px", width: "auto" }}
                      prefix={<SearchOutlined />}
                    />
                    <Button
                      type="primary"
                      htmlType="submit"
                      size="large"
                      style={{ height: 52, paddingInline: 28 }}
                    >
                      Find it for me
                      <ArrowRightOutlined />
                    </Button>
                  </Flex>
                </form>

                <Flex gap={8} wrap align="center" style={{ marginTop: 20 }}>
                  <Text type="secondary" style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                    Try
                  </Text>
                  {EXAMPLES.map((example) => (
                    <Button
                      key={example}
                      size="small"
                      shape="round"
                      onClick={() => setQuery(example)}
                    >
                      {example}
                    </Button>
                  ))}
                </Flex>
              </motion.div>
            </Left>

            <motion.div {...reveal(0.15)}>
              <Segmented<Mode>
                block
                size="large"
                value={mode}
                onChange={setMode}
                options={[
                  { label: "End-to-end service", value: "end" },
                  { label: "Customised service", value: "custom" },
                ]}
              />

              <Timeline ref={timelineRef}>
                <Rail aria-hidden="true">
                  <RailFill style={{ scaleY: reduceMotion ? 1 : fill }} />
                </Rail>
                {STEPS.map((step, i) => {
                  const on = isOn(step.key, step.optional);
                  const pickable = mode === "custom" && step.optional;
                  const body = (
                    <>
                      <Badge $on={on}>
                        {pickable && on ? <CheckOutlined /> : step.icon}
                      </Badge>
                      <div>
                        <Text
                          style={{
                            display: "block",
                            fontSize: 11,
                            fontWeight: 600,
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            color: "rgba(244, 246, 249, 0.55)",
                          }}
                        >
                          Step 0{i + 1}
                          {pickable && (on ? " · included" : " · tap to add")}
                        </Text>
                        <Text
                          style={{
                            display: "block",
                            margin: "4px 0 6px",
                            fontFamily: SERIF,
                            fontSize: 22,
                            fontWeight: 700,
                            color: colors.softWhite,
                          }}
                        >
                          {step.title}
                        </Text>
                        <Text style={{ lineHeight: 1.55 }}>{step.text}</Text>
                      </div>
                    </>
                  );
                  return (
                    <StepRow key={step.key} $on={on} $pick={pickable}>
                      {pickable ? (
                        <button
                          type="button"
                          aria-pressed={on}
                          onClick={() => toggle(step.key)}
                        >
                          {body}
                        </button>
                      ) : (
                        body
                      )}
                    </StepRow>
                  );
                })}
              </Timeline>

              <Summary aria-live="polite">
                {mode === "end"
                  ? "One partner from the first enquiry to your door: sourcing, procurement and delivery, all coordinated by Kora."
                  : chosen.length
                    ? `You run the rest, we handle ${chosen.join(" & ")}. Build the service around how your business already works.`
                    : "Pick the steps you want help with. We will tailor the service to fit."}
              </Summary>
            </motion.div>
          </Grid>
        </Container>
      </Section>
    </ConfigProvider>
  );
}
