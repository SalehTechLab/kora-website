"use client";

import styled from "styled-components";
import { Button, ConfigProvider, Flex, Typography, type ThemeConfig } from "antd";
import { colors } from "@/theme/themeConfig";
import { BOOKING_MEETING_URL } from "./servicesData";

const { Title, Paragraph, Text } = Typography;

const ctaTheme: ThemeConfig = {
  components: {
    Typography: { titleMarginTop: 0, titleMarginBottom: 16 },
  },
};

const Section = styled.section`
  background: ${colors.white};
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
    color: ${colors.crimson};
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

export default function ServicesCTA() {
  return (
    <ConfigProvider theme={ctaTheme}>
      <Section aria-labelledby="services-cta-heading">
        <Content>
          <Eyebrow>Let&rsquo;s trade</Eyebrow>
          <Headline level={2} id="services-cta-heading">
            Tell us what you need. We&rsquo;ll handle the rest.
          </Headline>
          <Paragraph
            style={{
              maxWidth: 600,
              margin: "0 auto 32px",
              fontSize: "clamp(0.95rem, 0.85rem + 0.4vw, 1.0625rem)",
              lineHeight: 1.65,
            }}
          >
            Share the product, quantity and destination. You get a clear plan
            and a competitive quote back.
          </Paragraph>
          <Flex gap={16} justify="center" wrap>
            <Button type="primary" size="large" href="/contact-us">
              Get a Quote
            </Button>
            <Button
              size="large"
              href={BOOKING_MEETING_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Consultation
            </Button>
          </Flex>
        </Content>
      </Section>
    </ConfigProvider>
  );
}
