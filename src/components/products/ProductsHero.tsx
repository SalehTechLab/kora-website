"use client";

import styled from "styled-components";
import { Button, ConfigProvider, Flex, Typography, type ThemeConfig } from "antd";
import { ArrowRightOutlined, DownOutlined } from "@ant-design/icons";
import { motion, useReducedMotion } from "framer-motion";
import { colors } from "@/theme/themeConfig";
import { SERIF, ease } from "@/components/about/shared";
import CatalogueCover from "./CatalogueCover";
import { PRODUCTS } from "./productData";

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
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 0.9fr);
  align-items: center;
  gap: 48px;
  max-width: 1240px;
  margin: 0 auto;
  padding: 96px 32px 88px;

  @media (max-width: 959px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 32px;
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

const Headline = styled.h1`
  margin: 0 0 24px;
  font-family: ${SERIF};
  font-size: clamp(2.3rem, 4.8vw, 4rem);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -0.03em;
  color: ${colors.softWhite};
`;

// Each word sits in an overflow mask so it can rise into place
const Line = styled.span`
  display: block;
`;

const Mask = styled.span`
  display: inline-block;
  overflow: hidden;
  padding: 0.06em 0.12em 0.14em 0;
  margin-right: -0.04em;
  vertical-align: bottom;
`;

const Accent = styled(motion.span)`
  display: inline-block;
  font-style: italic;
  background: linear-gradient(${colors.crimson}, ${colors.crimson}) no-repeat 0 92% /
    100% 0.07em;
`;

const Stats = styled.dl`
  display: flex;
  flex-wrap: wrap;
  gap: 16px 32px;
  margin-top: 40px;
  padding-top: 24px;
  border-top: 1px solid rgba(244, 246, 249, 0.16);

  dt {
    font-family: ${SERIF};
    font-size: clamp(1.75rem, 3vw, 2.4rem);
    font-weight: 700;
    line-height: 1;
    color: ${colors.softWhite};
  }

  dd {
    margin-top: 6px;
    font-size: 12px;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: rgba(244, 246, 249, 0.62);
  }
`;

/* ---------- catalogue fan ---------- */

const Fan = styled.div`
  position: relative;
  width: min(100%, 480px);
  aspect-ratio: 1 / 1.05;
  margin-left: auto;

  @media (max-width: 959px) {
    width: min(100%, 420px);
    margin-inline: auto;
  }
`;

const FanCard = styled(motion.a)`
  position: absolute;
  left: 25%;
  bottom: 4%;
  width: 50%;
  display: block;
  transform-origin: 50% 130%;
  border-radius: 8px;
  box-shadow: 0 18px 40px -12px rgba(0, 0, 0, 0.55);
  cursor: pointer;
  outline-offset: 4px;
`;

const FanHint = styled.span`
  position: absolute;
  left: 50%;
  bottom: -4px;
  transform: translateX(-50%);
  font-size: 11px;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: rgba(244, 246, 249, 0.5);
  white-space: nowrap;
`;

const WORDS: { text: string; accent?: boolean }[][] = [
  [{ text: "Every" }, { text: "commodity." }],
  [{ text: "Sourced,", accent: true }, { text: "procured," }],
  [{ text: "delivered." }],
];

const FAN_CENTER = (PRODUCTS.length - 1) / 2;

export default function ProductsHero() {
  const reduceMotion = useReducedMotion();

  let wordIndex = 0;

  return (
    <ConfigProvider theme={heroTheme}>
      <Banner aria-labelledby="products-heading">
        <Inner>
          <div>
            <motion.div
              initial={reduceMotion ? false : { opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
            >
              <Eyebrow>Products &amp; Sourcing</Eyebrow>
            </motion.div>

            <Headline id="products-heading">
              {WORDS.map((line, li) => (
                <Line key={li}>
                  {line.map(({ text, accent }) => {
                    const delay = 0.15 + wordIndex++ * 0.09;
                    const Word = accent ? Accent : motion.span;
                    return (
                      <Mask key={text + delay}>
                        <Word
                          style={{ display: "inline-block" }}
                          initial={reduceMotion ? false : { y: "110%" }}
                          animate={{ y: 0 }}
                          transition={{ duration: 0.9, delay, ease }}
                        >
                          {text}
                          {" "}
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
                Seven core catalogues, from Himalayan salt to surgical steel.
                And if what you need isn&rsquo;t on the list, name it: we will
                find it, procure it and deliver it.
              </Paragraph>

              <Flex gap={12} wrap>
                <Button type="primary" size="large" href="#salt">
                  Browse the catalogues
                  <DownOutlined />
                </Button>
                <Button size="large" href="#anything">
                  Request a product
                  <ArrowRightOutlined />
                </Button>
              </Flex>

              <Stats>
                <div>
                  <dt>0{PRODUCTS.length}</dt>
                  <dd>Core catalogues</dd>
                </div>
                <div>
                  <dt>&infin;</dt>
                  <dd>Products on request</dd>
                </div>
                <div>
                  <dt>1</dt>
                  <dd>Partner, end to end</dd>
                </div>
              </Stats>
            </motion.div>
          </div>

          <Fan role="group" aria-label="Product catalogue covers">
            {PRODUCTS.map((product, i) => {
              const t = i - FAN_CENTER;
              return (
                <FanCard
                  key={product.id}
                  href={`#${product.id}`}
                  aria-label={`Jump to ${product.name}`}
                  style={{ zIndex: 20 - Math.round(Math.abs(t) * 2) }}
                  initial={
                    reduceMotion
                      ? false
                      : { opacity: 0, y: 80, rotate: 0, x: "0%" }
                  }
                  animate={{ opacity: 1, y: 0, rotate: t * 7.5, x: `${t * 17}%` }}
                  whileHover={
                    reduceMotion
                      ? undefined
                      : { y: -34, scale: 1.06, zIndex: 40, transition: { duration: 0.3 } }
                  }
                  transition={{
                    duration: 1.1,
                    delay: 0.35 + i * 0.07,
                    ease,
                  }}
                >
                  <CatalogueCover product={product} index={i} flat />
                </FanCard>
              );
            })}
            <FanHint>Hover &amp; pick a catalogue</FanHint>
          </Fan>
        </Inner>

      </Banner>
    </ConfigProvider>
  );
}
