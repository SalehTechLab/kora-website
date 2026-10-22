"use client";

import { useRef } from "react";
import styled from "styled-components";
import { ConfigProvider, Typography, type ThemeConfig } from "antd";
import { motion, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { colors } from "@/theme/themeConfig";
import { Container, Eyebrow, Headline, SERIF, useReveal } from "./shared";

const { Title, Paragraph } = Typography;

const STEPS = [
  {
    number: "01",
    title: "Connect",
    description:
      "We introduce you to vetted partners and premium products, the right people at the right time.",
  },
  {
    number: "02",
    title: "Close",
    description:
      "We work through pricing, terms and the details where deals usually fall apart.",
  },
  {
    number: "03",
    title: "Stay",
    description:
      "We manage delivery and keep you informed, and we stay until the job is done.",
  },
];

const theme: ThemeConfig = {
  components: { Typography: { titleMarginTop: 0, titleMarginBottom: 0 } },
};

const Section = styled.section`
  padding: 120px 0;
  background: ${colors.white};

  @media (max-width: 767px) {
    padding: 80px 0;
  }
`;

const Track = styled.div`
  position: relative;
  margin-top: 72px;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 40px;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    gap: 48px;
    margin-top: 48px;
    padding-left: 40px;
  }
`;

// Rail runs behind the step markers: horizontal on desktop, vertical on mobile
const Rail = styled.div`
  position: absolute;
  top: 27px;
  left: 0;
  right: 0;
  height: 2px;
  background: ${colors.blueGray};

  @media (max-width: 767px) {
    top: 0;
    bottom: 0;
    left: 13px;
    right: auto;
    width: 2px;
    height: auto;
  }
`;

// Two fills share the rail: scaleX on desktop, scaleY on mobile
const Fill = styled(motion.div)<{ $axis: "x" | "y" }>`
  position: absolute;
  inset: 0;
  background: ${colors.burgundy};
  transform-origin: ${({ $axis }) => ($axis === "x" ? "left" : "top")};
  display: ${({ $axis }) => ($axis === "x" ? "block" : "none")};

  @media (max-width: 767px) {
    display: ${({ $axis }) => ($axis === "x" ? "none" : "block")};
  }
`;

const Marker = styled.span`
  position: relative;
  display: grid;
  place-items: center;
  width: 56px;
  height: 56px;
  margin-bottom: 28px;
  border: 2px solid ${colors.burgundy};
  border-radius: 50%;
  background: ${colors.white};
  font-family: ${SERIF};
  font-size: 20px;
  color: ${colors.burgundy};

  @media (max-width: 767px) {
    position: absolute;
    left: -41px;
    width: 28px;
    height: 28px;
    margin: 0;
    font-size: 11px;
  }
`;

export default function AboutPromise() {
  const reveal = useReveal();
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 60%"],
  });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 28 });

  return (
    <ConfigProvider theme={theme}>
      <Section aria-labelledby="about-promise-heading">
        <Container>
          <motion.div style={{ maxWidth: 760 }} {...reveal()}>
            <Eyebrow>Our Promise</Eyebrow>
            <Headline level={2} id="about-promise-heading">
              We don&rsquo;t step back after the introduction.
            </Headline>
          </motion.div>

          <Track ref={ref}>
            <Rail aria-hidden>
              <Fill $axis="x" style={{ scaleX: reduceMotion ? 1 : progress }} />
              <Fill $axis="y" style={{ scaleY: reduceMotion ? 1 : progress }} />
            </Rail>
            {STEPS.map((step, i) => (
              <motion.article key={step.number} style={{ position: "relative" }} {...reveal(i * 0.12)}>
                <Marker aria-hidden>{step.number}</Marker>
                <Title level={3} style={{ fontSize: 28, marginBottom: 12 }}>
                  {step.title}
                </Title>
                <Paragraph
                  type="secondary"
                  style={{ maxWidth: 340, margin: 0, fontSize: 16, lineHeight: 1.65 }}
                >
                  {step.description}
                </Paragraph>
              </motion.article>
            ))}
          </Track>
        </Container>
      </Section>
    </ConfigProvider>
  );
}
