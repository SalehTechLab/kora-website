"use client";

import Image from "next/image";
import styled from "styled-components";
import { ConfigProvider, Typography, type ThemeConfig } from "antd";
import { motion } from "framer-motion";
import { colors } from "@/theme/themeConfig";
import { Container, Eyebrow, Headline, SERIF, useReveal } from "./shared";

const { Paragraph, Text } = Typography;

const theme: ThemeConfig = {
  components: { Typography: { titleMarginTop: 0, titleMarginBottom: 0 } },
};

const Section = styled.section`
  padding: 120px 0;
  background: ${colors.mist};

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
  border: 1px solid ${({ $dark }) => ($dark ? colors.deepNavy : "rgba(140, 155, 176, 0.35)")};
  background: ${({ $dark }) => ($dark ? colors.deepNavy : colors.white)};
  color: ${({ $dark }) => ($dark ? colors.softWhite : colors.darkSlate)};
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

const Statement = styled(Paragraph)<{ $dark?: boolean }>`
  && {
    position: relative;
    margin: 0;
    font-family: ${SERIF};
    font-size: clamp(1.2rem, 1.9vw, 1.65rem);
    line-height: 1.35;
    letter-spacing: -0.01em;
    text-wrap: balance;
    color: ${({ $dark }) => ($dark ? colors.softWhite : colors.deepNavy)};
  }
`;

// Same placement as the mission watermark, but filled with brand burgundy via a mask
const BurgundyMark = styled.div`
  position: absolute;
  right: -24px;
  bottom: -24px;
  width: 200px;
  aspect-ratio: 640 / 714;
  opacity: 0.12;
  pointer-events: none;
  transform: rotate(-14deg);
  background: ${colors.crimson};
  mask: url("/images/logo/kora-logo-mark.svg") center / contain no-repeat;
`;

const Watermark = styled.div`
  position: absolute;
  right: -24px;
  bottom: -24px;
  width: 200px;
  opacity: 0.08;
  pointer-events: none;
  transform: rotate(-14deg);
  filter: brightness(0) invert(1);

  img {
    width: 100%;
    height: auto;
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
              <Text
                style={{
                  position: "relative",
                  marginBottom: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: "#B51E32",
                }}
              >
                Our Mission
              </Text>
              <Statement $dark>
                To connect businesses to global opportunities and make
                international trade simple, transparent and stress-free.
              </Statement>
              <Watermark aria-hidden>
                <Image src="/images/logo/kora-logo-mark.svg" alt="" width={640} height={714} />
              </Watermark>
            </Panel>

            <Panel {...reveal(0.15)}>
              <Text
                style={{
                  position: "relative",
                  marginBottom: 20,
                  fontSize: 12,
                  fontWeight: 600,
                  letterSpacing: "0.16em",
                  textTransform: "uppercase",
                  color: colors.crimson,
                }}
              >
                Our Vision
              </Text>
              <Statement>
                To be the smart hub every business can turn to: a place where
                data-driven sourcing, fair pricing and on-time delivery are no
                longer a myth, and where every business, big or small, gets the
                same energy and attention.
              </Statement>
              <BurgundyMark aria-hidden />
            </Panel>
          </Grid>
        </Container>
      </Section>
    </ConfigProvider>
  );
}
