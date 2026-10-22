"use client";

import { useRef } from "react";
import styled from "styled-components";
import { Typography } from "antd";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { colors } from "@/theme/themeConfig";
import { Container, Eyebrow, Headline, SERIF, useReveal } from "./shared";

const { Paragraph } = Typography;

const OPENING =
  "Every business is searching for something: a reliable supplier, a fairer price, a market that’s ready to buy. Too often, the right people never meet. Or they meet, and the deal falls apart in the details.";

const BELIEF =
  "Kora Traders started in Munich, Germany with a simple belief: opportunities are everywhere, but trustworthy connections are rare.";

const CLOSING =
  "We bring businesses together with our top tier partners, premium products and the lasting opportunities they’d otherwise miss. And we don’t step back after the introduction. We stay until the job is done.";

const Section = styled.section`
  position: relative;
  padding: 120px 0;
  background: ${colors.offWhite};

  @media (max-width: 767px) {
    padding: 80px 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 4fr) minmax(0, 8fr);
  gap: 64px;

  @media (max-width: 991px) {
    grid-template-columns: 1fr;
    gap: 32px;
  }
`;

const Sticky = styled.div`
  position: sticky;
  top: 112px;
  align-self: start;

  @media (max-width: 991px) {
    position: static;
  }
`;

const Origin = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  margin-top: 28px;
  padding: 8px 16px;
  border: 1px solid ${colors.blueGray};
  border-radius: 999px;
  background: ${colors.white};
  font-size: 13px;
  font-weight: 600;
  color: ${colors.navy};

  &::before {
    content: "";
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: ${colors.burgundy};
    box-shadow: 0 0 0 4px rgba(181, 30, 50, 0.16);
  }
`;

const Flow = styled.div`
  display: flex;
  flex-direction: column;
  gap: 32px;
`;

const Pull = styled(motion.blockquote)`
  position: relative;
  margin: 24px 0;
  padding-left: 32px;
  border-left: 3px solid ${colors.burgundy};
  font-family: ${SERIF};
  font-size: clamp(1.75rem, 3.4vw, 2.75rem);
  line-height: 1.2;
  letter-spacing: -0.02em;
  color: ${colors.navy};

  em {
    color: ${colors.burgundy};
  }

  @media (max-width: 767px) {
    margin: 16px 0;
    padding-left: 20px;
  }
`;

const proseStyle = {
  margin: 0,
  fontSize: "clamp(1.15rem, 0.9rem + 1vw, 1.65rem)",
  fontWeight: 500,
  lineHeight: 1.55,
  letterSpacing: "-0.01em",
} as const;

function Word({
  word,
  progress,
  range,
}: {
  word: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return <motion.span style={{ opacity }}>{word} </motion.span>;
}

// Words light up one by one as the paragraph scrolls through the viewport
function ScrollText({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 85%", "end 55%"],
  });
  const words = text.split(" ");

  return (
    <Paragraph ref={ref} style={{ ...proseStyle, color: colors.navy }}>
      {reduceMotion
        ? text
        : words.map((word, i) => (
            <Word
              key={i}
              word={word}
              progress={scrollYProgress}
              range={[i / words.length, Math.min(1, (i + 1) / words.length)]}
            />
          ))}
    </Paragraph>
  );
}

export default function AboutStory() {
  const reveal = useReveal();

  return (
    <Section id="our-story" aria-labelledby="about-story-heading">
      <Container>
        <Grid>
          <Sticky>
            <Eyebrow>Our Story</Eyebrow>
            <Headline level={2} id="about-story-heading">
              Built on one belief.
            </Headline>
            <Origin>Munich, Germany</Origin>
          </Sticky>

          <Flow>
            <ScrollText text={OPENING} />
            <ScrollText text={BELIEF} />
            <Pull {...reveal()}>
              Here, reliability isn&rsquo;t a slogan, it&rsquo;s{" "}
              <em>a habit</em>, and we built Kora on it.
            </Pull>
            <ScrollText text={CLOSING} />
          </Flow>
        </Grid>
      </Container>
    </Section>
  );
}
