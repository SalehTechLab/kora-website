"use client";

import { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { motion, useReducedMotion } from "framer-motion";
import { colors } from "@/theme/themeConfig";
import { PRODUCTS } from "./productData";

const ITEMS = [
  ...PRODUCTS.map((p) => ({
    id: p.id,
    label: p.tab,
  })),
  { id: "anything", label: "Anything else" },
];

// Sits just under the 72px site header
const Bar = styled.nav`
  position: sticky;
  top: 72px;
  z-index: 90;
  background: rgba(244, 246, 249, 0.9);
  backdrop-filter: blur(14px);
  -webkit-backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(140, 155, 176, 0.35);
`;

const Scroller = styled.div`
  display: flex;
  gap: 4px;
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;
  overflow-x: auto;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 767px) {
    padding: 0 12px;
  }
`;

const Chapter = styled.a<{ $active: boolean }>`
  position: relative;
  flex: none;
  display: flex;
  align-items: baseline;
  gap: 8px;
  padding: 16px 14px;
  font-size: 13px;
  font-weight: 600;
  white-space: nowrap;
  color: ${({ $active }) =>
    $active ? colors.deepNavy : "rgba(36, 44, 56, 0.62)"};
  transition: color 0.25s;

  &:hover {
    color: ${colors.crimson};
  }

`;

const Underline = styled(motion.span)`
  position: absolute;
  inset: auto 14px 0;
  height: 3px;
  background: ${colors.crimson};
`;

export default function ProductNav() {
  const [active, setActive] = useState<string>(ITEMS[0].id);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

  // Whichever section crosses the middle of the viewport is "current"
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => e.isIntersecting && setActive(e.target.id));
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    ITEMS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  // Keep the active chapter visible in the horizontal scroller on phones
  useEffect(() => {
    const scroller = scrollerRef.current;
    const el = scroller?.querySelector<HTMLElement>(`[data-id="${active}"]`);
    if (!scroller || !el) return;
    scroller.scrollTo({
      left: el.offsetLeft - scroller.clientWidth / 2 + el.clientWidth / 2,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  }, [active, reduceMotion]);

  const go = (e: React.MouseEvent, id: string) => {
    const target = document.getElementById(id);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth" });
    history.replaceState(null, "", `#${id}`);
  };

  return (
    <Bar aria-label="Product categories">
      <Scroller ref={scrollerRef}>
        {ITEMS.map(({ id, label }) => (
          <Chapter
            key={id}
            href={`#${id}`}
            data-id={id}
            $active={active === id}
            aria-current={active === id ? "true" : undefined}
            onClick={(e) => go(e, id)}
          >
            {label}
            {active === id && (
              <Underline layoutId="chapter-underline" transition={{ duration: 0.35 }} />
            )}
          </Chapter>
        ))}
      </Scroller>
    </Bar>
  );
}
