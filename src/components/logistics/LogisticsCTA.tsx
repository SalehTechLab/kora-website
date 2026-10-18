"use client";

import styled from "styled-components";
import { Button, ConfigProvider, Flex, Typography, type ThemeConfig } from "antd";
import { colors } from "@/theme/themeConfig";

const { Title, Paragraph, Text } = Typography;

const ctaTheme: ThemeConfig = {
  components: {
    Typography: { titleMarginTop: 0, titleMarginBottom: 16 },
  },
};

const Section = styled.section`
  background: ${colors.offWhite};
  padding: 96px 24px;

  @media (max-width: 767px) {
    padding: 64px 20px;
  }
`;

const Content = styled.div`
  max-width: 760px;
  margin: 0 auto;
  text-align: center;
`;

const Eyebrow = styled(Text)`
  && {
    display: block;
    margin-bottom: 12px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${colors.burgundy};
  }
`;

const Headline = styled(Title)`
  && {
    font-family: var(--font-serif), Georgia, serif;
    font-size: clamp(1.75rem, 4vw, 3rem);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
`;

export default function LogisticsCTA() {
  return (
    <ConfigProvider theme={ctaTheme}>
      <Section aria-labelledby="logistics-cta-heading">
        <Content>
          <Eyebrow>Let&rsquo;s get moving</Eyebrow>
          <Headline level={2} id="logistics-cta-heading">
            Your Trade. Our Commitment.
          </Headline>
          <Paragraph
            style={{
              maxWidth: 600,
              margin: "0 auto 32px",
              fontSize: "clamp(0.95rem, 0.85rem + 0.4vw, 1.0625rem)",
              lineHeight: 1.65,
            }}
          >
            Looking to source products and arrange international delivery?
            Let&rsquo;s discuss your requirements and find the right solution
            for your business.
          </Paragraph>
          <Flex gap={16} justify="center" wrap>
            <Button type="primary" size="large" href="/contact">
              Get in Touch
            </Button>
            <Button size="large" href="/contact">
              Partner With Us
            </Button>
          </Flex>
        </Content>
      </Section>
    </ConfigProvider>
  );
}
