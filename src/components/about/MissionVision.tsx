"use client";

import styled from "styled-components";
import { ConfigProvider, Typography, type ThemeConfig } from "antd";
import { ClockCircleOutlined, LineChartOutlined, TagOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { colors } from "@/theme/themeConfig";
import { Container, Eyebrow, Headline, SERIF, useReveal } from "./shared";

const { Paragraph, Text } = Typography;

const PILLARS = [
  { icon: <LineChartOutlined />, label: "Data-driven sourcing" },
  { icon: <TagOutlined />, label: "Fair pricing" },
  { icon: <ClockCircleOutlined />, label: "On-time delivery" },
];

const theme: ThemeConfig = {
  components: { Typography: { titleMarginTop: 0, titleMarginBottom: 0 } },
};

const Section = styled.section`
  padding: 120px 0;
  background: ${colors.offWhite};

  @media (max-width: 767px) {
    padding: 80px 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 24px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
  }
`;

const Panel = styled(motion.article)<{ $dark?: boolean }>`
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  padding: 56px 48px;
  border-radius: 28px;
  border: 1px solid ${({ $dark }) => ($dark ? colors.navy : "rgba(208, 215, 226, 0.7)")};
  background: ${({ $dark }) => ($dark ? colors.navy : colors.white)};
  color: ${({ $dark }) => ($dark ? colors.white : colors.charcoal)};
  transition:
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    box-shadow 0.5s cubic-bezier(0.22, 1, 0.36, 1);

  &:hover {
    transform: translateY(-6px);
    box-shadow: 0 32px 64px -36px rgba(16, 41, 78, 0.5);
  }

  @media (max-width: 767px) {
    padding: 36px 24px;
    border-radius: 20px;
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.01ms;
  }
`;

// Oversized outlined numeral as quiet texture in the corner
const Numeral = styled.span<{ $dark?: boolean }>`
  position: absolute;
  top: 16px;
  right: 28px;
  font-family: ${SERIF};
  font-size: clamp(64px, 6vw, 88px);
  line-height: 1;
  color: transparent;
  -webkit-text-stroke: 1.5px
    ${({ $dark }) => ($dark ? "rgba(255, 255, 255, 0.14)" : colors.blueGray)};
  pointer-events: none;
`;

const Statement = styled(Paragraph)<{ $dark?: boolean }>`
  && {
    position: relative;
    margin: 0;
    font-family: ${SERIF};
    font-size: clamp(1.4rem, 2.3vw, 2rem);
    line-height: 1.35;
    letter-spacing: -0.01em;
    color: ${({ $dark }) => ($dark ? colors.white : colors.navy)};
  }
`;

const Tags = styled.ul`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: auto 0 0;
  padding: 40px 0 0;
  list-style: none;

  li {
    padding: 8px 18px;
    border: 1px solid rgba(255, 255, 255, 0.28);
    border-radius: 999px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255, 255, 255, 0.9);
  }
`;

const Pillars = styled.ul`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 12px;
  margin: 32px 0 0;
  padding: 0;
  list-style: none;
`;

const Pillar = styled(motion.li)`
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 14px 18px;
  border-radius: 14px;
  background: ${colors.offWhite};
  font-weight: 600;
  color: ${colors.navy};

  .anticon {
    display: grid;
    place-items: center;
    width: 36px;
    height: 36px;
    border-radius: 50%;
    background: ${colors.burgundy};
    font-size: 16px;
    color: ${colors.white};
  }
`;

export default function MissionVision() {
  const reveal = useReveal();

  return (
    <ConfigProvider theme={theme}>
      <Section aria-labelledby="mission-vision-heading">
        <Container>
          <motion.div style={{ marginBottom: 48 }} {...reveal()}>
            <Eyebrow>Our Direction</Eyebrow>
            <Headline level={2} id="mission-vision-heading">
              Why we exist, and where we&rsquo;re headed.
            </Headline>
          </motion.div>
          <Grid>
            <Panel $dark {...reveal(0.05)}>
              <Numeral $dark aria-hidden>01</Numeral>
              <Text
                style={{
                  position: "relative",
                  marginBottom: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#F08A98",
                }}
              >
                Our Mission
              </Text>
              <Statement $dark>
                To connect businesses to global opportunities and make
                international trade simple, transparent and stress-free.
              </Statement>
              <Tags>
                {["Simple", "Transparent", "Stress-free"].map((tag) => (
                  <li key={tag}>{tag}</li>
                ))}
              </Tags>
            </Panel>

            <Panel {...reveal(0.15)}>
              <Numeral aria-hidden>02</Numeral>
              <Text
                style={{
                  position: "relative",
                  marginBottom: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: colors.burgundy,
                }}
              >
                Our Vision
              </Text>
              <Statement>
                To be the smart hub every business can turn to, where
                data-driven sourcing, fair pricing and on-time delivery are no
                longer a myth.
              </Statement>
              <Pillars>
                {PILLARS.map((pillar, i) => (
                  <Pillar key={pillar.label} {...reveal(0.3 + i * 0.1)}>
                    {pillar.icon}
                    {pillar.label}
                  </Pillar>
                ))}
              </Pillars>
              <Paragraph
                type="secondary"
                style={{ position: "relative", margin: "24px 0 0", fontSize: 16, lineHeight: 1.65 }}
              >
                And every business, big or small, gets the same energy and
                attention.
              </Paragraph>
            </Panel>
          </Grid>
        </Container>
      </Section>
    </ConfigProvider>
  );
}
