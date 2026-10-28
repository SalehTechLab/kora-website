"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValueEvent,
  useScroll,
} from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Eyebrow, Heading } from "@/components/ui";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import ServiceVisual from "./ServiceVisuals";
import { SERVICES, type Service } from "./servicesData";

const COUNT = SERVICES.length;
const pad = (n: number) => String(n + 1).padStart(2, "0");

function ServiceText({ service, index }: { service: Service; index: number }) {
  return (
    <>
      <p className="mb-5 flex items-center gap-3.5 text-xs font-semibold tracking-eyebrow text-ink uppercase">
        <span className="rounded-pill bg-crimson px-2.5 pt-1 pb-0.75 text-white">{pad(index)}</span>
        {service.lead}
      </p>
      <h3 className="font-serif text-[clamp(1.7rem,1.2rem+1.6vw,2.7rem)] leading-[1.1] font-semibold tracking-display text-balance text-navy">
        {service.title}
      </h3>
      <p className="mt-5 max-w-135 text-[clamp(0.98rem,0.92rem+0.3vw,1.08rem)] leading-body text-ink lg:[@media(max-height:820px)]:mt-3.5">
        {service.description}
      </p>
      <ul className="mt-7 grid max-w-135 grid-cols-2 gap-x-5 gap-y-2.5 lg:[@media(max-height:820px)]:mt-4.5 lg:[@media(max-height:820px)]:gap-y-1.5">
        {service.points.map((p) => (
          <li
            key={p}
            className="relative border-t border-steel/50 pt-2.5 pl-4.5 text-sm leading-[1.4] font-medium text-navy before:absolute before:top-4.5 before:left-0 before:size-1.75 before:rounded-full before:bg-crimson before:content-['']"
          >
            {p}
          </li>
        ))}
      </ul>
      <p className="mt-7 max-w-135 border-l-2 border-crimson pl-4.5 font-serif text-[1.15rem] leading-[1.4] text-navy italic lg:[@media(max-height:820px)]:mt-4.5">
        <span className="mb-1.5 block font-sans text-micro font-semibold tracking-eyebrow text-steel-text uppercase not-italic">
          The question we answer
        </span>
        &ldquo;{service.ask}&rdquo;
      </p>
      {service.link && (
        <Link
          href={service.link.href}
          className="mt-7 inline-flex items-center gap-2.5 border-b-2 border-crimson pb-1 text-ui font-semibold text-navy transition-[gap] duration-350 ease-expo hover:gap-4 lg:[@media(max-height:820px)]:mt-4.5"
        >
          {service.link.label}
          <ArrowRight className="size-[1em]" aria-hidden="true" />
        </Link>
      )}
    </>
  );
}

// Phone and tablet: no pinning, every service gets its own block
function MobileBlock({ service, index }: { service: Service; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  return (
    <article ref={ref} className="border-t border-steel/50 pt-10 pb-12">
      <ServiceText service={service} index={index} />
      <div className="mt-8">
        <ServiceVisual service={service.key} play={inView} />
      </div>
    </article>
  );
}

export default function ServiceStages() {
  const runwayRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.min(COUNT - 1, Math.max(0, Math.floor(v * COUNT))));
  });

  const jumpTo = (i: number) => {
    const el = runwayRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + ((i + 0.5) / COUNT) * travel,
      behavior: "smooth",
    });
  };

  const service = SERVICES[active];

  return (
    <section
      id="services"
      ref={runwayRef}
      // Tall runway on desktop; the stage pins below the navbar while scroll drives the story
      className="relative bg-snow text-ink lg:h-[calc(100svh+5*80svh)]"
      aria-labelledby="stages-heading"
    >
      <div className="mx-auto max-w-wide px-5 pt-20 pb-8 lg:sticky lg:top-[73px] lg:flex lg:h-[calc(100svh-73px)] lg:flex-col lg:overflow-hidden lg:px-12 lg:pt-10 lg:pb-9">
        <header className="mb-12 flex flex-col gap-7 lg:mb-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <Eyebrow className="lg:mb-3">What we do</Eyebrow>
            <Heading id="stages-heading" size="headline" className="font-semibold">
              Six services.{" "}
              <em className="font-medium underline decoration-crimson decoration-[0.06em] underline-offset-[0.14em]">
                One file.
              </em>
            </Heading>
          </div>

          {/* Desktop rail: also works as navigation through the pinned story */}
          <ol className="hidden max-w-180 flex-1 grid-cols-[repeat(6,minmax(76px,1fr))] gap-3.5 lg:grid" aria-label="Services">
            {SERVICES.map((s, i) => (
              <li key={s.key}>
                <button
                  type="button"
                  className={cn(
                    "flex w-full cursor-pointer flex-col gap-1.5 text-left text-steel-text transition-colors duration-300 hover:text-navy",
                    i <= active && "text-navy",
                  )}
                  onClick={() => jumpTo(i)}
                  aria-current={i === active ? "step" : undefined}
                >
                  <span className="mb-2 block h-0.5 overflow-hidden bg-steel/40">
                    <motion.span
                      className="block h-full w-full origin-left bg-crimson"
                      initial={false}
                      animate={{ scaleX: i <= active ? 1 : 0 }}
                      transition={{ duration: 0.5, ease }}
                    />
                  </span>
                  <span className="text-micro font-semibold tracking-eyebrow">{pad(i)}</span>
                  <span className="text-sm font-semibold">{s.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </header>

        {/* Desktop pinned view */}
        <div className="hidden min-h-0 flex-1 items-start gap-18 pt-[clamp(20px,6vh,64px)] lg:grid lg:grid-cols-[5fr_6fr]">
          <div aria-live="polite">
            <AnimatePresence mode="wait">
              <motion.div
                key={service.key}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.45, ease }}
              >
                <ServiceText service={service} index={active} />
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative mt-7 w-full max-w-150 justify-self-end">
            <span
              className="pointer-events-none absolute -top-[0.62em] right-2 z-2 font-serif text-[clamp(4rem,8vh,6rem)] leading-none font-medium tracking-[-0.04em] text-steel-text italic opacity-40"
              aria-hidden="true"
            >
              <AnimatePresence mode="wait">
                <motion.span
                  key={active}
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -40 }}
                  transition={{ duration: 0.5, ease }}
                >
                  {pad(active)}
                </motion.span>
              </AnimatePresence>
            </span>
            <AnimatePresence mode="wait">
              <motion.div
                key={service.key}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.5, ease }}
              >
                <ServiceVisual service={service.key} play />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Mobile stack */}
        <div className="lg:hidden">
          {SERVICES.map((s, i) => (
            <MobileBlock key={s.key} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
