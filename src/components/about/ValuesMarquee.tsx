"use client";

import styled, { keyframes } from "styled-components";
import { colors } from "@/theme/themeConfig";
import { SERIF } from "./shared";

const WORDS = ["Reliable", "Transparent", "Fair", "On time", "Hands-on"];

const scroll = keyframes`
  to { transform: translateX(-50%); }
`;

const Band = styled.section`
  overflow: hidden;
  padding: 40px 0;
  background: ${colors.navy};
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${scroll} 40s linear infinite;

  &:hover {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    animation: none;
  }
`;

const Item = styled.span`
  display: flex;
  align-items: center;
  gap: 48px;
  padding-right: 48px;
  font-family: ${SERIF};
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  line-height: 1;
  white-space: nowrap;
  color: transparent;
  -webkit-text-stroke: 1.5px rgba(255, 255, 255, 0.55);

  &:nth-child(even) {
    color: ${colors.white};
    -webkit-text-stroke: 0;
    font-style: italic;
  }

  &::after {
    content: "";
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: ${colors.burgundy};
  }
`;

export default function ValuesMarquee() {
  // Two identical halves so the -50% loop is seamless
  const items = [...WORDS, ...WORDS, ...WORDS, ...WORDS];

  return (
    <Band aria-label="Our values: reliable, transparent, fair, on time, hands-on">
      <Track aria-hidden>
        {items.map((word, i) => (
          <Item key={i}>{word}</Item>
        ))}
      </Track>
    </Band>
  );
}
