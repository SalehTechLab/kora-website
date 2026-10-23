"use client";

import styled from "styled-components";
import { ConfigProvider, Typography, type ThemeConfig } from "antd";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { colors } from "@/theme/themeConfig";
import { Container, Eyebrow, SERIF, ease, useReveal } from "./shared";

const { Title, Paragraph } = Typography;

const LINES = ["One Team.", "Every Step.", "Your Business."];

const PRINCIPLES = [
  {
    number: "01",
    title: "Quality",
    description: "Products and partners checked before they ever reach you.",
  },
  {
    number: "02",
    title: "Reliability",
    description: "Consistency you can plan your own business around.",
  },
  {
    number: "03",
    title: "Competitive sourcing",
    description: "Fair prices from a supplier network that spans the globe.",
  },
];

const theme: ThemeConfig = {
  components: { Typography: { titleMarginTop: 0, titleMarginBottom: 0 } },
};

const Section = styled.section`
  padding: 88px 0;
  background: ${colors.softWhite};

  @media (max-width: 767px) {
    padding: 64px 0;
  }
`;

const Top = styled.div`
  display: grid;
  gap: 20px;
`;

const Mask = styled(motion.span)`
  display: inline-block;
  overflow: hidden;
  margin-right: 0.26em;
  padding: 0.04em 0 0.1em;
`;

const Display = styled(Title).attrs({ level: 2 })`
  && {
    margin: 0;
    font-family: ${SERIF};
    font-size: clamp(2rem, 4.2vw, 3.5rem);
    line-height: 1.08;
    letter-spacing: -0.025em;
  }

  /* Three beats: solid, muted, accent */
  ${Mask}:nth-child(2) span {
    color: #8C9BB0;
  }

  ${Mask}:nth-child(3) span {
    font-style: italic;
    color: ${colors.crimson};
  }
`;

const Principles = styled.ol`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0 40px;
  margin: 48px 0 0;
  padding: 0;
  list-style: none;

  @media (max-width: 767px) {
    grid-template-columns: 1fr;
    margin-top: 32px;
  }
`;

const Item = styled(motion.li)`
  position: relative;
  padding: 24px 0 8px;
  border-top: 1px solid ${colors.steelGray};

  /* Burgundy rule draws along the top edge on hover */
  &::before {
    content: "";
    position: absolute;
    top: -1px;
    left: 0;
    right: 0;
    height: 2px;
    background: ${colors.crimson};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.6s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover::before {
    transform: scaleX(1);
  }

  @media (max-width: 767px) {
    padding-bottom: 20px;
  }

  @media (prefers-reduced-motion: reduce) {
    &::before {
      transition-duration: 0.01ms;
    }
  }
`;

const Number = styled.span`
  display: block;
  margin-bottom: 12px;
  font-family: ${SERIF};
  font-size: 20px;
  line-height: 1;
  color: ${colors.crimson};
`;

export default function Philosophy() {
  const reveal = useReveal();
  const reduceMotion = useReducedMotion();

  // The visible mask line triggers the reveal; its text is clipped until it rises
  const mask = reduceMotion
    ? {}
    : {
        initial: "hidden",
        whileInView: "show",
        viewport: { once: true, amount: 0.6 },
      };

  const rise = (i: number): Variants => ({
    hidden: { y: "110%" },
    show: { y: 0, transition: { duration: 0.9, delay: i * 0.12, ease } },
  });

  return (
    <ConfigProvider theme={theme}>
      <Section id="philosophy" aria-labelledby="philosophy-heading">
        <Container>
          <Top>
            <div>
              <Eyebrow>Our Philosophy</Eyebrow>
              <Display id="philosophy-heading">
                {LINES.map((line, i) => (
                  <Mask key={line} {...mask}>
                    <motion.span style={{ display: "inline-block" }} variants={rise(i)}>
                      {line}
                    </motion.span>
                  </Mask>
                ))}
              </Display>
            </div>
            <motion.div style={{ maxWidth: 720 }} {...reveal(0.1)}>
              <Paragraph
                style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: colors.deepNavy }}
              >
                We combine smart solutions, efficient processes and automation
                to create greater value for our partners and customers,
                delivering with precision, consistency and a long-term
                perspective.
              </Paragraph>
            </motion.div>
          </Top>

          <Principles aria-label="Driven by three principles">
            {PRINCIPLES.map((item, i) => (
              <Item key={item.number} {...reveal(i * 0.1)}>
                <Number aria-hidden>{item.number}</Number>
                <Title level={3} style={{ fontSize: 22, marginBottom: 6 }}>
                  {item.title}
                </Title>
                <Paragraph
                  type="secondary"
                  style={{ margin: 0, fontSize: 15, lineHeight: 1.6 }}
                >
                  {item.description}
                </Paragraph>
              </Item>
            ))}
          </Principles>
        </Container>
      </Section>
    </ConfigProvider>
  );
}
