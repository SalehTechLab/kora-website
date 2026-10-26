"use client";

import styled from "styled-components";
import { Button, ConfigProvider, Flex, Typography, type ThemeConfig } from "antd";
import { ArrowRightOutlined, ShopOutlined } from "@ant-design/icons";
import { motion } from "framer-motion";
import { colors } from "@/theme/themeConfig";
import { Container, Eyebrow, Headline, useReveal } from "@/components/about/shared";
import { SHOP_URL } from "./productData";

const { Paragraph } = Typography;

const theme: ThemeConfig = {
  components: { Typography: { titleMarginTop: 0, titleMarginBottom: 16 } },
};

const Section = styled.section`
  padding: 104px 0;
  background: ${colors.white};

  @media (max-width: 767px) {
    padding: 72px 0;
  }
`;

const Inner = styled(motion.div)`
  max-width: 880px;
  margin: 0 auto;
  text-align: center;
`;

export default function ShopCTA() {
  const reveal = useReveal();

  return (
    <ConfigProvider theme={theme}>
      <Section aria-labelledby="shop-cta-heading">
        <Container>
          <Inner {...reveal(0)}>
            <Eyebrow>Ready when you are</Eyebrow>
            <Headline level={2} id="shop-cta-heading">
              Browse the shop. Book your order.
            </Headline>
            <Paragraph
              style={{
                maxWidth: 560,
                margin: "0 auto 32px",
                fontSize: "clamp(0.95rem, 0.85rem + 0.4vw, 1.0625rem)",
                lineHeight: 1.65,
              }}
            >
              Every catalogue above lives in the Kora shop, where you can view
              the range and place your booking. Prefer to talk it through
              first? Our team replies with a straight answer.
            </Paragraph>
            <Flex gap={16} justify="center" wrap>
              <Button
                type="primary"
                size="large"
                icon={<ShopOutlined />}
                href={SHOP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Visit the Kora shop
              </Button>
              <Button size="large" href="/contact-us">
                Talk to our team
                <ArrowRightOutlined />
              </Button>
            </Flex>
          </Inner>
        </Container>
      </Section>
    </ConfigProvider>
  );
}
