"use client";

import styled from "styled-components";
import { Typography } from "antd";
import { useReducedMotion } from "framer-motion";
import { colors } from "@/theme/themeConfig";

export const ease = [0.22, 1, 0.36, 1] as const;

export const SERIF = 'var(--font-serif), Georgia, "Times New Roman", serif';

// Fade-up on scroll; resolves to no props under reduced motion
export function useReveal() {
  const reduceMotion = useReducedMotion();
  return (delay = 0) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 28 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, amount: 0.3 },
          transition: { duration: 0.8, delay, ease },
        };
}

export const Container = styled.div`
  position: relative;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;

  @media (max-width: 767px) {
    padding: 0 20px;
  }
`;

export const Eyebrow = styled(Typography.Text)<{ $light?: boolean }>`
  && {
    display: block;
    margin-bottom: 16px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${({ $light }) => ($light ? "#E8798A" : colors.burgundy)};
  }
`;

export const Headline = styled(Typography.Title)`
  && {
    margin-bottom: 0;
    font-family: ${SERIF};
    font-size: clamp(2rem, 4.2vw, 3.25rem);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
`;
