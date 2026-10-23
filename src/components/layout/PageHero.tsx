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
    Typography: { titleMarginTop: 0, titleMarginBottom: 16 },
  },
};

const Banner = styled.section`
  position: relative;
  isolation: isolate;
  overflow: hidden;
  background:
    radial-gradient(
      ellipse 70% 120% at 85% 50%,
      rgba(181, 30, 50, 0.16) 0%,
      transparent 60%
    ),
    linear-gradient(90deg, #10294E 0%, ${colors.deepNavy} 100%);
  padding: 104px 24px 72px;

  /* WhatsApp-style doodle tile of trade and logistics icons */
  &::before {
    content: "";
    position: absolute;
    inset: 0;
    z-index: -1;
    background: url("/images/patterns/logistics-doodle.svg") center / 440px
      repeat;
    opacity: 0.07;
  }

  @media (max-width: 767px) {
    padding: 72px 20px 56px;

    &::before {
      background-size: 340px;
    }
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
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: #B51E32;

    @media (min-width: 768px) {
      font-size: 12px;
    }
  }
`;

const Headline = styled(Title).attrs({ level: 1 })`
  && {
    font-family: var(--font-serif), Georgia, serif;
    font-size: clamp(1.75rem, 4.6vw, 3.5rem);
    line-height: 1.1;
    letter-spacing: -0.02em;
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
        <Content>
          <div>
            <Eyebrow>{eyebrow}</Eyebrow>
            <Headline id={id}>{title}</Headline>
            <Paragraph
              style={{
                fontSize: "clamp(0.9rem, 0.8rem + 0.4vw, 1rem)",
                lineHeight: 1.65,
                margin: 0,
              }}
            >
              {description}
            </Paragraph>
          </div>
        </Content>
      </Banner>
    </ConfigProvider>
  );
}
