"use client";

import Image from "next/image";
import styled from "styled-components";
import { Button, ConfigProvider, Flex, Typography, type ThemeConfig } from "antd";
import { motion } from "framer-motion";
import { colors } from "@/theme/themeConfig";
import { Container, Eyebrow, Headline, useReveal } from "./shared";

const { Title, Paragraph } = Typography;

const PATHS = [
  {
    title: "Supply with us",
    description:
      "Manufacturers and exporters with quality products and a market to reach.",
  },
  {
    title: "Buy with us",
    description:
      "Importers and distributors who want dependable suppliers at competitive prices.",
  },
  {
    title: "Move with us",
    description:
      "Freight and logistics providers who keep every shipment moving.",
  },
  {
    title: "Venture with us",
    description:
      "Joint ventures (JVs) with businesses ready to build something larger together.",
  },
];

// Light-on-dark text for the navy section
const theme: ThemeConfig = {
  token: {
    colorTextHeading: colors.white,
    colorText: "rgba(255, 255, 255, 0.85)",
    colorTextDescription: "rgba(255, 255, 255, 0.7)",
  },
  components: { Typography: { titleMarginTop: 0, titleMarginBottom: 0 } },
};

const Section = styled.section`
  position: relative;
  overflow: hidden;
  isolation: isolate;
  padding: 120px 0;
  background:
    radial-gradient(
      ellipse 60% 80% at 100% 0%,
      rgba(181, 30, 50, 0.25) 0%,
      transparent 60%
    ),
    linear-gradient(90deg, #0b1d38 0%, ${colors.navy} 100%);

  @media (max-width: 767px) {
    padding: 80px 0;
  }
`;

const Watermark = styled.div`
  position: absolute;
  left: -90px;
  bottom: -60px;
  z-index: -1;
  width: 380px;
  opacity: 0.06;
  pointer-events: none;
  transform: rotate(-14deg);
  filter: brightness(0) invert(1);

  img {
    width: 100%;
    height: auto;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
  margin-top: 56px;

  @media (max-width: 1099px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  @media (max-width: 599px) {
    grid-template-columns: 1fr;
    margin-top: 40px;
  }
`;

const Card = styled(motion.article)`
  position: relative;
  overflow: hidden;
  height: 100%;
  padding: 32px 28px 36px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.04);
  transition:
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    border-color 0.4s ease;

  /* Cursor-following spotlight; --x/--y are set in onMouseMove */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      320px circle at var(--x, 50%) var(--y, 0%),
      rgba(240, 138, 152, 0.22),
      transparent 70%
    );
    opacity: 0;
    transition: opacity 0.4s ease;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-6px);
    border-color: rgba(240, 138, 152, 0.55);

    &::before {
      opacity: 1;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    &::before {
      transition-duration: 0.01ms;
    }
  }
`;

const spotlight = (e: React.MouseEvent<HTMLElement>) => {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - r.top}px`);
};

export default function Partnerships() {
  const reveal = useReveal();

  return (
    <ConfigProvider theme={theme}>
      <Section id="partnerships" aria-labelledby="partnerships-heading">
        <Watermark aria-hidden>
          <Image src="/images/logo/kora-logo-mark.svg" alt="" width={640} height={714} />
        </Watermark>
        <Container>
          <motion.div style={{ maxWidth: 760 }} {...reveal()}>
            <Eyebrow $light>Partnerships &amp; Joint Ventures</Eyebrow>
            <Headline level={2} id="partnerships-heading">
              If you want to partner with us, let&rsquo;s talk.
            </Headline>
            <Paragraph
              style={{ margin: "20px 0 0", fontSize: 17, lineHeight: 1.7 }}
            >
              Trustworthy connections are rare, so we treat every partnership
              as a long-term commitment. Whether you supply, buy, ship or want
              to build a joint venture, there is a place for you at Kora.
            </Paragraph>
          </motion.div>

          <Grid>
            {PATHS.map((path, i) => (
              <Card key={path.title} onMouseMove={spotlight} {...reveal(i * 0.1)}>
                <Title level={3} style={{ fontSize: 22, marginBottom: 12 }}>
                  {path.title}
                </Title>
                <Paragraph
                  type="secondary"
                  style={{ margin: 0, fontSize: 16, lineHeight: 1.65 }}
                >
                  {path.description}
                </Paragraph>
              </Card>
            ))}
          </Grid>

          <Flex gap={16} wrap style={{ marginTop: 56 }}>
            <Button type="primary" size="large" href="/contact">
              Become a Partner
            </Button>
            <Button size="large" ghost href="/contact">
              Discuss a Joint Venture
            </Button>
          </Flex>
        </Container>
      </Section>
    </ConfigProvider>
  );
}
