"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import { PRODUCTS } from "./productData";

const ITEMS = [
  ...PRODUCTS.map((p) => ({
    id: p.id,
    label: p.tab,
  })),
  { id: "anything", label: "Anything else" },
];

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

  // Sits just under the site header
  return (
    <nav
      aria-label="Product categories"
      className="sticky top-nav z-90 border-b border-steel/35 bg-snow/90 backdrop-blur-md"
    >
      <div
        ref={scrollerRef}
        className="mx-auto flex max-w-page gap-1 overflow-x-auto px-3 [scrollbar-width:none] md:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {ITEMS.map(({ id, label }) => (
          <a
            key={id}
            href={`#${id}`}
            data-id={id}
            aria-current={active === id ? "true" : undefined}
            onClick={(e) => go(e, id)}
            className={cn(
              "relative flex flex-none items-baseline gap-2 px-3.5 py-4 text-caption font-semibold whitespace-nowrap transition-colors duration-250 hover:text-crimson",
              active === id ? "text-navy" : "text-steel-text",
            )}
          >
            {label}
            {active === id && (
              <motion.span
                layoutId="chapter-underline"
                transition={{ duration: 0.35 }}
                className="absolute inset-x-3.5 bottom-0 h-[3px] bg-crimson"
              />
            )}
          </a>
        ))}
      </div>
    </nav>
  );
}
