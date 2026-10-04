"use client";

import Image from "next/image";
import styled from "styled-components";
import { ConfigProvider, Typography, type ThemeConfig } from "antd";
import { colors } from "@/theme/themeConfig";

const { Title, Paragraph, Text } = Typography;

// Light-on-dark text for the navy banner
const heroTheme: ThemeConfig = {
  token: {
    colorTextHeading: colors.white,
    colorText: "rgba(255, 255, 255, 0.82)",
  },
  components: {
    Typography: { titleMarginTop: 0, titleMarginBottom: 16 },
  },
};

const Banner = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background: #0b1d38;
  padding: 104px 24px 72px;

  /* Navy wash over the photo so the copy stays readable */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: linear-gradient(
      90deg,
      rgba(11, 29, 56, 0.96) 0%,
      rgba(11, 29, 56, 0.92) 60%,
      rgba(11, 29, 56, 0.88) 100%
    );
  }

  @media (max-width: 767px) {
    padding: 72px 20px 56px;
  }
`;

const Content = styled.div`
  max-width: 1240px;
  margin: 0 auto;

  & > div {
    max-width: 600px;
  }
`;

const Eyebrow = styled(Text)`
  && {
    display: block;
    margin-bottom: 12px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #e8798a;
  }
`;

const Headline = styled(Title).attrs({ level: 1 })`
  && {
    font-family: var(--font-serif), Georgia, serif;
    font-size: clamp(2.25rem, 4.6vw, 3.5rem);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
`;

export default function ContactHero() {
  return (
    <ConfigProvider theme={heroTheme}>
      <Banner aria-labelledby="contact-heading">
        <Image
          src="/images/hero/hero-logistics.webp"
          alt=""
          fill
          sizes="100vw"
          preload
          style={{ objectFit: "cover", zIndex: -2 }}
        />
        <Content>
          <div>
            <Eyebrow>Contact Us</Eyebrow>
            <Headline id="contact-heading">
              Tell us what you need to move.
            </Headline>
            <Paragraph style={{ fontSize: 16, lineHeight: 1.65, margin: 0 }}>
              Sourcing a product, arranging freight, or exploring a partnership,
              we will reply with a straight answer.
            </Paragraph>
          </div>
        </Content>
      </Banner>
    </ConfigProvider>
  );
}
