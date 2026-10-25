"use client";

import styled from "styled-components";
import { Button, ConfigProvider, Flex, Typography, type ThemeConfig } from "antd";
import { ArrowRightOutlined, WhatsAppOutlined } from "@ant-design/icons";
import { motion, useReducedMotion } from "framer-motion";
import { colors } from "@/theme/themeConfig";
import { SERIF, ease } from "@/components/about/shared";
import { WHATSAPP_URL } from "@/components/layout/WhatsAppFloat";
import SupportIllustration from "./SupportIllustration";

const { Paragraph, Text } = Typography;

const heroTheme: ThemeConfig = {
  token: {
    colorTextHeading: colors.softWhite,
    colorText: "rgba(244, 246, 249, 0.82)",
  },
  components: {
    Button: {
      defaultColor: colors.softWhite,
      defaultBg: "transparent",
      defaultBorderColor: "rgba(244, 246, 249, 0.36)",
      defaultHoverColor: colors.deepNavy,
      defaultHoverBg: colors.softWhite,
      defaultHoverBorderColor: colors.softWhite,
      defaultActiveColor: colors.deepNavy,
      defaultActiveBg: colors.softWhite,
      defaultActiveBorderColor: colors.softWhite,
      defaultShadow: "none",
      primaryShadow: "none",
    },
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
  display: grid;
  grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
  align-items: center;
  gap: 48px;
  max-width: 1240px;
  margin: 0 auto;
  /* extra bottom room for the channel cards that overlap this edge */
  padding: 96px 32px 136px;

  @media (max-width: 959px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 40px;
    padding: 64px 20px 112px;
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

const Headline = styled.h1`
  margin: 0 0 24px;
  font-family: ${SERIF};
  font-size: clamp(2.3rem, 4.8vw, 4rem);
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -0.03em;
  color: ${colors.softWhite};
`;

const Line = styled.span`
  display: block;
`;

// Each word sits in an overflow mask so it can rise into place
const Mask = styled.span`
  display: inline-block;
  overflow: hidden;
  padding: 0.06em 0.12em 0.14em 0;
  margin-right: 0.02em;
  vertical-align: bottom;
`;

const Accent = styled(motion.span)`
  display: inline-block;
  font-style: italic;
  background: linear-gradient(${colors.crimson}, ${colors.crimson}) no-repeat 0 92% /
    100% 0.07em;
`;

const WORDS: { text: string; accent?: boolean }[][] = [
  [{ text: "Tell" }, { text: "us" }, { text: "what" }],
  [{ text: "you" }, { text: "need" }, { text: "to" }],
  [{ text: "move.", accent: true }],
];

export default function ContactHero() {
  const reduceMotion = useReducedMotion();
  let wordIndex = 0;

  return (
    <ConfigProvider theme={heroTheme}>
      <Banner aria-labelledby="contact-heading">
        <Inner>
          <div>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <Eyebrow>Contact Us</Eyebrow>
            </motion.div>

            <Headline id="contact-heading">
              {WORDS.map((line, li) => (
                <Line key={li}>
                  {line.map(({ text, accent }) => {
                    const delay = 0.15 + wordIndex++ * 0.09;
                    const Word = accent ? Accent : motion.span;
                    return (
                      <Mask key={text}>
                        <Word
                          style={{ display: "inline-block" }}
                          initial={reduceMotion ? false : { y: "110%" }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.9, delay, ease }}
                        >
                          {text}
                        </Word>
                      </Mask>
                    );
                  })}
                </Line>
              ))}
            </Headline>

            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7, ease }}
            >
              <Paragraph
                style={{
                  maxWidth: 520,
                  marginBottom: 32,
                  fontSize: "clamp(1rem, 0.9rem + 0.4vw, 1.125rem)",
                  lineHeight: 1.65,
                }}
              >
                Sourcing a product, arranging freight, or exploring a
                partnership, we will reply with a straight answer.
              </Paragraph>

              <Flex gap={12} wrap>
                <Button type="primary" size="large" href="#quote">
                  Request a quote
                  <ArrowRightOutlined />
                </Button>
                <Button
                  size="large"
                  icon={<WhatsAppOutlined />}
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Chat on WhatsApp
                </Button>
              </Flex>
            </motion.div>
          </div>

          <SupportIllustration />
        </Inner>
      </Banner>
    </ConfigProvider>
  );
}
