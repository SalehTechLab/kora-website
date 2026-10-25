"use client";

import { useRef } from "react";
import Image from "next/image";
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
import { ease } from "@/components/about/shared";

const { Paragraph, Text } = Typography;

const COPY =
  "At Kora Traders, our commitment goes beyond sourcing and procurement—we keep global trade moving. Through reliable freight transportation by sea, air, and road, we streamline the journey of your goods with strategic planning, trusted logistics partners, and seamless coordination. From origin to destination, we bring every step together to ensure your shipments move efficiently, securely, and with confidence across international markets.";

const WORDS = COPY.split(" ");

const Section = styled.section`
  position: relative;
  overflow: hidden;
  padding: 120px 24px 104px;
  background: ${colors.white};

  @media (max-width: 767px) {
    padding: 80px 20px 72px;
  }
`;

const Content = styled.div`
  position: relative;
  max-width: 880px;
  margin: 0 auto;
  text-align: center;
`;

// Kora mark bleeding off each edge as quiet brand texture
const Symbol = styled(motion.div)<{ $side: "left" | "right" }>`
  position: absolute;
  top: 50%;
  ${({ $side }) => ($side === "left" ? "left: -70px;" : "right: -70px;")}
  width: 220px;
  opacity: 0.1;
  pointer-events: none;
  rotate: ${({ $side }) => ($side === "left" ? "-14deg" : "14deg")};

  img {
    width: 100%;
    height: auto;
  }

  @media (max-width: 767px) {
    width: 120px;
    ${({ $side }) => ($side === "left" ? "left: -48px;" : "right: -48px;")}
  }
`;

const Eyebrow = styled(Text)`
  && {
    display: inline-flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 28px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    color: ${colors.crimson};

    &::before,
    &::after {
      content: "";
      width: 28px;
      height: 2px;
      background: ${colors.crimson};
    }
  }
`;

const Word = styled(motion.span)`
  display: inline-block;
  margin-right: 0.28em;
  color: ${colors.deepNavy};
`;

function RevealWord({
  word,
  start,
  end,
  progress,
}: {
  word: string;
  start: number;
  end: number;
  progress: MotionValue<number>;
}) {
  const opacity = useTransform(progress, [start, end], [0.16, 1]);
  return <Word style={{ opacity }}>{word}</Word>;
}

export default function LogisticsIntro() {
  const reduceMotion = useReducedMotion();
  const textRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  // Words light up one by one as the paragraph scrolls through the viewport
  const { scrollYProgress: textProgress } = useScroll({
    target: textRef,
    offset: ["start 0.85", "end 0.5"],
  });
  const { scrollYProgress: sectionProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const markShift = useTransform(sectionProgress, [0, 1], [60, -60]);

  const inView = (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.5 },
          transition: { duration: 0.8, delay, ease },
        };

  return (
    <Section ref={sectionRef} id="logistics-intro" aria-label="Introduction">
      {(["left", "right"] as const).map((side) => (
        <Symbol
          key={side}
          $side={side}
          aria-hidden
          style={reduceMotion ? undefined : { y: markShift }}
        >
          <Image
            src="/images/logo/kora-logo-mark.svg"
            alt=""
            width={640}
            height={714}
          />
        </Symbol>
      ))}

      <Content>
        <motion.div {...inView()}>
          <Eyebrow>Our commitment</Eyebrow>
        </motion.div>

        <div ref={textRef}>
          {/* Screen readers get the full sentence once; the split words are decorative */}
          <Paragraph
            style={{
              margin: 0,
              fontSize: "clamp(1.05rem, 0.7rem + 1.6vw, 1.75rem)",
              fontWeight: 600,
              lineHeight: 1.6,
              letterSpacing: "-0.01em",
            }}
          >
            {reduceMotion ? (
              <Text style={{ color: colors.deepNavy, font: "inherit" }}>
                {COPY}
              </Text>
            ) : (
              <>
                <span className="sr-only" style={srOnly}>
                  {COPY}
                </span>
                <span aria-hidden>
                  {WORDS.map((word, i) => (
                    <RevealWord
                      key={i}
                      word={word}
                      start={i / WORDS.length}
                      end={Math.min(1, (i + 4) / WORDS.length)}
                      progress={textProgress}
                    />
                  ))}
                </span>
              </>
            )}
          </Paragraph>
        </div>
      </Content>
    </Section>
  );
}

const srOnly = {
  position: "absolute",
  width: 1,
  height: 1,
  overflow: "hidden",
  clip: "rect(0 0 0 0)",
  whiteSpace: "nowrap",
} as const;
