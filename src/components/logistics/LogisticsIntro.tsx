"use client";

import Image from "next/image";
import styled from "styled-components";
import { Typography } from "antd";
import { motion, useReducedMotion } from "framer-motion";
import { colors } from "@/theme/themeConfig";

const { Paragraph, Text } = Typography;

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: 120px 24px;
  background: ${colors.offWhite};

  @media (max-width: 767px) {
    padding: 80px 20px;
  }
`;

const Content = styled(motion.div)`
  position: relative;
  max-width: 880px;
  margin: 0 auto;
  text-align: center;
`;

// Kora mark bleeding off each edge as quiet brand texture
const Symbol = styled.div<{ $side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ $side }) => ($side === "left" ? "left: -70px;" : "right: -70px;")}
  width: 220px;
  opacity: 0.1;
  pointer-events: none;
  transform: translateY(-50%)
    rotate(${({ $side }) => ($side === "left" ? "-14deg" : "14deg")});

  img {
    width: 100%;
    height: auto;
  }

  @media (max-width: 767px) {
    width: 120px;
    ${({ $side }) => ($side === "left" ? "left: -48px;" : "right: -48px;")}
  }
`;

export default function LogisticsIntro() {
  const reduceMotion = useReducedMotion();

  return (
    <Section id="logistics-intro" aria-label="Introduction">
      {(["left", "right"] as const).map((side) => (
        <Symbol key={side} $side={side} aria-hidden>
          <Image
            src="/images/logo/kora-logo-mark.svg"
            alt=""
            width={640}
            height={714}
          />
        </Symbol>
      ))}

      <Content
        {...(reduceMotion
          ? {}
          : {
              initial: { opacity: 0, y: 28 },
              whileInView: { opacity: 1, y: 0 },
              viewport: { once: true, amount: 0.3 },
              transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
            })}
      >
        <Paragraph
          style={{
            margin: 0,
            fontSize: "clamp(1.05rem, 0.7rem + 1.6vw, 1.75rem)",
            fontWeight: 600,
            lineHeight: 1.6,
            letterSpacing: "-0.01em",
          }}
        >
          <Text style={{ color: colors.navy, font: "inherit" }}>
            At Kora Traders, our commitment goes beyond sourcing and
            procurement—we keep global trade moving. Through reliable freight
            transportation by sea, air, and road, we streamline the journey of
            your goods{" "}
          </Text>
          <Text type="secondary" style={{ font: "inherit" }}>
            with strategic planning, trusted logistics partners, and seamless
            coordination. From origin to destination, we bring every step
            together to ensure your shipments move efficiently, securely, and
            with confidence across international markets.
          </Text>
        </Paragraph>
      </Content>
    </Section>
  );
}
