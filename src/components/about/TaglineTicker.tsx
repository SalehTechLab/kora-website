"use client";

import styled, { keyframes } from "styled-components";
import { colors } from "@/theme/themeConfig";
import { SERIF } from "./shared";

const TAGLINES = [
  "Trust in Every Deal. Value in Every Connection.",
  "Better Deals. Stronger Bonds. Lasting Growth.",
  "Real Connections. Fairer Trade. Growth That Lasts.",
];

const scroll = keyframes`
  to { transform: translateX(-50%); }
`;

const Band = styled.section`
  overflow: hidden;
  padding: 36px 0;
  background: ${colors.burgundy};
`;

const Track = styled.div`
  display: flex;
  width: max-content;
  animation: ${scroll} 70s linear infinite;

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
  font-size: clamp(1.5rem, 3.4vw, 2.75rem);
  line-height: 1.1;
  white-space: nowrap;
  color: ${colors.white};

  &:nth-child(even) {
    font-style: italic;
    color: rgba(255, 255, 255, 0.62);
  }

  &::after {
    content: "";
    width: 12px;
    height: 12px;
    transform: rotate(45deg);
    background: ${colors.navy};
  }
`;

export default function TaglineTicker() {
  // Two identical halves so the -50% loop is seamless
  const items = [...TAGLINES, ...TAGLINES, ...TAGLINES, ...TAGLINES];

  return (
    <Band aria-label={TAGLINES.join(" ")}>
      <Track aria-hidden>
        {items.map((line, i) => (
          <Item key={i}>{line}</Item>
        ))}
      </Track>
    </Band>
  );
}
