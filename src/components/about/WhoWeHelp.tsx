"use client";

import styled from "styled-components";
import { ConfigProvider, Typography, type ThemeConfig } from "antd";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { colors } from "@/theme/themeConfig";
import { Container, Eyebrow, SERIF, ease } from "./shared";

const { Title, Paragraph } = Typography;

const HEADLINE = ["Built for", "businesses", "that feel", "left behind"];

const AUDIENCES = [
  "Businesses with no sourcing knowledge",
  "Well-resourced firms that still need support",
  "Small shop owners who want to expand",
  "Those without clearing agents or customs support",
  "Those who cannot find reliable suppliers",
  "Anyone told that fair pricing is a myth",
];

// Dark section: Typography tokens flip to soft white
const theme: ThemeConfig = {
  components: {
    Typography: {
      titleMarginTop: 0,
      titleMarginBottom: 0,
      colorTextHeading: colors.softWhite,
      colorText: colors.softWhite,
      colorTextDescription: colors.steelGray,
    },
  },
};

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: 120px 0;
  background: ${colors.deepNavy};
  color: ${colors.softWhite};

  @media (max-width: 767px) {
    padding: 80px 0;
  }
`;

// Oversized brand mark bleeding off the edge, filled with a soft steel tint
const Mark = styled(motion.div)`
  position: absolute;
  top: 50%;
  left: -140px;
  width: 560px;
  aspect-ratio: 640 / 714;
  margin-top: -300px;
  opacity: 0.05;
  pointer-events: none;
  background: ${colors.steelGray};
  mask: url("/images/logo/kora-logo-mark.svg") center / contain no-repeat;

  @media (max-width: 767px) {
    width: 380px;
    left: -120px;
  }
`;

const Layout = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: 72px;
  align-items: start;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 48px;
  }
`;

// Headline stays pinned while the list scrolls past on wide screens
const Intro = styled.div`
  @media (min-width: 992px) {
    position: sticky;
    top: 120px;
  }
`;

const Mask = styled(motion.span)`
  display: block;
  overflow: hidden;
  padding: 0.04em 0 0.1em;
`;

const Display = styled(Title).attrs({ level: 2 })`
  && {
    margin: 0;
    font-family: ${SERIF};
    font-size: clamp(2.2rem, 4.6vw, 3.75rem);
    line-height: 1.06;
    letter-spacing: -0.025em;
  }

  /* Last beat carries the accent */
  ${Mask}:last-child span {
    font-style: italic;
    color: ${colors.steelGray};
  }
`;

const List = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
  margin: 0;
  padding: 0;
  list-style: none;

  @media (max-width: 575px) {
    grid-template-columns: 1fr;
    gap: 14px;
  }
`;

const Item = styled(motion.li)`
  position: relative;
  display: flex;
  align-items: center;
  min-height: 104px;
  padding: 24px 28px;
  border-radius: 4px 16px 16px 4px;
  background: rgba(244, 246, 249, 0.04);
  transition:
    background 0.5s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);

  /* The crimson rule draws down on entry and thickens on hover */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    width: 3px;
    background: ${colors.crimson};
    transform: scaleY(var(--rule, 1));
    transform-origin: top;
    transition: width 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover {
    background: rgba(244, 246, 249, 0.09);
    transform: translateY(-4px);
  }

  &:hover::before {
    width: 6px;
  }

  @media (max-width: 767px) {
    min-height: 0;
  }

  @media (prefers-reduced-motion: reduce) {
    transition-duration: 0.01ms;
  }
`;

export default function WhoWeHelp() {
  const reduceMotion = useReducedMotion();

  const trigger = (amount: number) =>
    reduceMotion
      ? {}
      : {
          initial: "hidden",
          whileInView: "show",
          viewport: { once: true, amount },
        };

  const rise = (i: number): Variants => ({
    hidden: { y: "110%" },
    show: { y: 0, transition: { duration: 0.9, delay: i * 0.1, ease } },
  });

  const fade = (delay = 0): Variants => ({
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, delay, ease } },
  });

  // Cards enter in reading order, left to right, top to bottom
  const card = (i: number): Variants => ({
    hidden: { opacity: 0, y: 36, "--rule": 0 } as never,
    show: {
      opacity: 1,
      y: 0,
      "--rule": 1,
      transition: {
        opacity: { duration: 0.7, delay: i * 0.09, ease },
        y: { duration: 0.8, delay: i * 0.09, ease },
        "--rule": { duration: 0.9, delay: 0.15 + i * 0.09, ease },
      },
    } as never,
  });

  return (
    <ConfigProvider theme={theme}>
      <Section id="who-we-help" aria-labelledby="who-we-help-heading">
        <Mark
          aria-hidden
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, x: -60 },
                whileInView: { opacity: 0.05, x: 0 },
                viewport: { once: true },
                transition: { duration: 1.6, ease },
              })}
        />
        <Container>
          <Layout>
            <Intro>
              <Eyebrow $light>Who We Help</Eyebrow>
              <Display id="who-we-help-heading" aria-label={HEADLINE.join(" ")}>
                <motion.span style={{ display: "block" }} {...trigger(0.5)} aria-hidden>
                  {HEADLINE.map((line, i) => (
                    <Mask key={line}>
                      <motion.span style={{ display: "block" }} variants={rise(i)}>
                        {line}
                      </motion.span>
                    </Mask>
                  ))}
                </motion.span>
              </Display>
              <motion.div
                style={{ maxWidth: 420, marginTop: 28 }}
                variants={fade(0.35)}
                {...trigger(0.5)}
              >
                <Paragraph type="secondary" style={{ margin: 0, fontSize: 17, lineHeight: 1.65 }}>
                  If reliable sourcing has felt out of reach, Kora is the
                  partner to turn to.
                </Paragraph>
              </motion.div>
            </Intro>

            <List aria-label="Who Kora helps">
              {AUDIENCES.map((text, i) => (
                <Item key={text} variants={card(i)} {...trigger(0.35)}>
                  <Paragraph
                    style={{
                      margin: 0,
                      fontSize: 18,
                      lineHeight: 1.45,
                      fontWeight: 500,
                      textWrap: "balance",
                    }}
                  >
                    {text}
                  </Paragraph>
                </Item>
              ))}
            </List>
          </Layout>
        </Container>
      </Section>
    </ConfigProvider>
  );
}
