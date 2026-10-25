"use client";

import styled from "styled-components";
import { ConfigProvider, Typography, type ThemeConfig } from "antd";
import { colors } from "@/theme/themeConfig";

const { Title, Paragraph, Text } = Typography;

// Light-on-dark text for the navy banner
const heroTheme: ThemeConfig = {
  token: {
    colorTextHeading: colors.softWhite,
    colorText: "rgba(244, 246, 249, 0.82)",
  },
  components: {
    Typography: { titleMarginTop: 0, titleMarginBottom: 24 },
  },
};

const Banner = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background:
    radial-gradient(
      ellipse 60% 90% at 78% 55%,
      rgba(181, 30, 50, 0.22) 0%,
      transparent 62%
    ),
    ${colors.deepNavy};

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: url("/images/patterns/logistics-doodle.svg") center / 440px repeat;
    opacity: 0.06;
  }
`;

const Inner = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 96px 32px 88px;

  & > div {
    max-width: 640px;
  }

  @media (max-width: 959px) {
    padding: 64px 20px 56px;
  }
`;

const Eyebrow = styled(Text)`
  && {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 20px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: rgba(244, 246, 249, 0.72);

    &::before {
      content: "";
      width: 28px;
      height: 2px;
      background: ${colors.crimson};
    }
  }
`;

const Headline = styled(Title).attrs({ level: 1 })`
  && {
    font-family: var(--font-serif), Georgia, serif;
    font-size: clamp(2.3rem, 4.8vw, 4rem);
    font-weight: 700;
    line-height: 1.04;
    letter-spacing: -0.03em;
  }
`;

type PageHeroProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHero({
  id,
  eyebrow,
  title,
  description,
}: PageHeroProps) {
  return (
    <ConfigProvider theme={heroTheme}>
      <Banner aria-labelledby={id}>
        <Inner>
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <Headline id={id}>{title}</Headline>
            <Paragraph
              style={{
                maxWidth: 520,
                fontSize: "clamp(1rem, 0.9rem + 0.4vw, 1.125rem)",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {description}
            </Paragraph>
          </div>
        </Inner>
      </Banner>
    </ConfigProvider>
  );
}
