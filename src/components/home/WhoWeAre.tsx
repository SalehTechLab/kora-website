"use client";

import Image from "next/image";
import styled from "styled-components";
import {
  Col,
  ConfigProvider,
  Divider,
  Flex,
  Row,
  Typography,
  type ThemeConfig,
} from "antd";
import { motion, useReducedMotion } from "framer-motion";
import { colors } from "@/theme/themeConfig";

const { Title, Text, Paragraph } = Typography;

const HEADING_LINES = ["One Team.", "Every Step.", "Your Business."];

const PILLARS = [
  {
    number: "01",
    title: "We Source.",
    description:
      "We identify and vet quality suppliers worldwide, so you buy with confidence.",
  },
  {
    number: "02",
    title: "We Procure.",
    description:
      "We handle negotiation, ordering and quality coordination to secure the best value.",
  },
  {
    number: "03",
    title: "We Deliver.",
    description:
      "We manage shipping, customs and delivery, keeping you informed at every step.",
  },
];

const sectionTheme: ThemeConfig = {
  components: {
    Typography: {
      titleMarginTop: 0,
      titleMarginBottom: 0,
    },
    Divider: {
      colorSplit: colors.steelGray,
      textPaddingInline: 0,
      orientationMargin: 0,
    },
  },
};

const ease = [0.22, 1, 0.36, 1] as const;

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: 120px 0;
  background: ${colors.mist};

  @media (max-width: 767px) {
    padding: 80px 0;
  }
`;

const Container = styled.div`
  position: relative;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;

  @media (max-width: 767px) {
    padding: 0 20px;
  }
`;

const Eyebrow = styled(Text)`
  && {
    display: block;
    margin-bottom: 20px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${colors.crimson};
  }
`;

const Heading = styled(Title)`
  && {
    font-family: var(--font-serif), Georgia, "Times New Roman", serif;
    margin-bottom: 28px;
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  span {
    display: inline-block;
    margin-right: 0.28em;
  }

  /* Last line carries the promise, so it gets the accent */
  span:last-child {
    font-style: italic;
    color: ${colors.crimson};
  }
`;

const Mission = styled(motion.blockquote)`
  position: relative;
  overflow: hidden;
  margin: 56px 0 0;
  padding: 40px 48px;
  border-left: 3px solid ${colors.crimson};
  border-radius: 0 16px 16px 0;
  background: ${colors.deepNavy};

  @media (max-width: 767px) {
    margin-top: 40px;
    padding: 28px 24px;
  }
`;

// Tilted Kora mark, inset from the edge, as quiet brand texture
const Watermark = styled.div`
  position: absolute;
  right: 36px;
  top: 50%;
  width: 110px;
  transform: translateY(-50%) rotate(-14deg);
  opacity: 0.08;
  pointer-events: none;
  filter: brightness(0) invert(1);

  img {
    width: 100%;
    height: auto;
  }

  /* Narrow screens: tuck it into the empty corner beside the label */
  @media (max-width: 767px) {
    top: 18px;
    right: 22px;
    width: 44px;
    transform: rotate(-14deg);
    opacity: 0.12;
  }
`;

const MissionText = styled(Paragraph)`
  && {
    position: relative;
    margin: 0;
    max-width: 880px;
    font-family: var(--font-serif), Georgia, "Times New Roman", serif;
    font-size: clamp(1.25rem, 2.2vw, 1.75rem);
    font-style: italic;
    line-height: 1.45;
    color: ${colors.softWhite};
  }
`;

const PillarNumber = styled.span`
  display: block;
  margin-bottom: 28px;
  font-family: var(--font-serif), Georgia, "Times New Roman", serif;
  font-size: 72px;
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1.5px ${colors.steelGray};
  transition:
    color 0.4s ease,
    -webkit-text-stroke-color 0.4s ease;
`;

const Pillar = styled.article`
  position: relative;
  height: 100%;
  padding: 36px 32px 40px;
  border-radius: 20px;
  background: ${colors.white};
  border: 1px solid rgba(140, 155, 176, 0.3);
  transition:
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1);

  /* Burgundy rule that draws across the top on hover */
  &::after {
    content: "";
    position: absolute;
    top: -1px;
    left: 32px;
    right: 32px;
    height: 3px;
    border-radius: 0 0 3px 3px;
    background: ${colors.crimson};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 28px 56px -32px rgba(16, 41, 78, 0.35);

    &::after {
      transform: scaleX(1);
    }

    ${PillarNumber} {
      color: ${colors.crimson};
      -webkit-text-stroke-color: ${colors.crimson};
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    &::after,
    ${PillarNumber} {
      transition-duration: 0.01ms;
    }
  }
`;

export default function WhoWeAre() {
  const reduceMotion = useReducedMotion();

  const reveal = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.8, delay, ease },
        };

  return (
    <ConfigProvider theme={sectionTheme}>
      <Section id="who-we-are" aria-labelledby="who-we-are-heading">
        <Container>
          <Eyebrow>Who We Are</Eyebrow>
          <Heading level={2} id="who-we-are-heading">
            {HEADING_LINES.map((line, i) => (
              <motion.span key={line} {...reveal(i * 0.12)}>
                {line}
              </motion.span>
            ))}
          </Heading>

          <motion.div style={{ maxWidth: 920 }} {...reveal(0.2)}>
            <Paragraph
              style={{
                fontSize: 18,
                lineHeight: 1.7,
                color: colors.deepNavy,
                marginBottom: 0,
              }}
            >
              Global trade is full of moving parts: unfamiliar suppliers,
              shifting prices, complex paperwork and tight delivery windows.
              Kora Traders exists to take that complexity off your plate. We
              are a single, dependable partner for sourcing, procurement and
              logistics. We find reliable suppliers, negotiate competitive
              terms, and manage the movement of your goods by air, sea, rail or
              road, from the first order to final delivery.
            </Paragraph>
          </motion.div>

          <Mission {...reveal(0.3)}>
            <Watermark aria-hidden>
              <Image
                src="/images/logo/kora-logo-mark.svg"
                alt=""
                width={640}
                height={714}
              />
            </Watermark>
            <Text
              style={{
                position: "relative",
                display: "block",
                marginBottom: 14,
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                color: "#B51E32",
              }}
            >
              Our Mission
            </Text>
            <MissionText>
              To connect businesses to global opportunities and make
              international trade simple, transparent and stress-free.
            </MissionText>
          </Mission>

          <Divider titlePlacement="start" style={{ margin: "80px 0 40px" }}>
            <Text
              style={{
                paddingRight: 20,
                fontSize: 13,
                fontWeight: 600,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                color: colors.deepNavy,
              }}
            >
              What Sets Us Apart
            </Text>
          </Divider>

          <Row gutter={[24, 24]}>
            {PILLARS.map((pillar, i) => (
              <Col key={pillar.number} xs={24} md={8}>
                <motion.div style={{ height: "100%" }} {...reveal(i * 0.12)}>
                  <Pillar>
                    <PillarNumber aria-hidden>{pillar.number}</PillarNumber>
                    <Flex vertical gap={12}>
                      <Title
                        level={3}
                        style={{ fontSize: 26, fontWeight: 700 }}
                      >
                        {pillar.title}
                      </Title>
                      <Paragraph
                        type="secondary"
                        style={{
                          fontSize: 16,
                          lineHeight: 1.65,
                          marginBottom: 0,
                        }}
                      >
                        {pillar.description}
                      </Paragraph>
                    </Flex>
                  </Pillar>
                </motion.div>
              </Col>
            ))}
          </Row>
        </Container>
      </Section>
    </ConfigProvider>
  );
}
