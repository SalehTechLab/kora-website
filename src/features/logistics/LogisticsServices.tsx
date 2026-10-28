"use client";

import { useRef, useState, type ComponentType } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import { cn } from "@/lib/cn";
import { ease as EASE } from "@/lib/motion";
import {
  AirScene,
  CustomsScene,
  RailScene,
  RoadScene,
  SeaScene,
  type SceneProps,
} from "./ServiceScenes";

type Service = {
  key: string;
  label: string;
  title: string;
  description: string;
  points: string[];
  accent: "steel" | "crimson";
  Scene: ComponentType<SceneProps>;
};

const SERVICES: Service[] = [
  {
    key: "air",
    label: "Air",
    title: "Air Freight",
    description:
      "Fast and efficient air freight solutions for urgent, high-value, and time-sensitive shipments. We coordinate international air cargo through trusted logistics partners.",
    points: [
      "Express Shipping",
      "Time-Sensitive Cargo",
      "Airport-to-Airport",
      "Door-to-Door Delivery",
    ],
    accent: "steel",
    Scene: AirScene,
  },
  {
    key: "sea",
    label: "Sea",
    title: "Sea Freight",
    description:
      "Cost-effective ocean freight solutions for bulk commodities, containerized cargo, and international shipments. We coordinate global shipping arrangements for businesses of all sizes.",
    points: [
      "Full Container Load (FCL)",
      "Less than Container Load (LCL)",
      "Port-to-Port Shipping",
      "Cargo Consolidation",
    ],
    accent: "steel",
    Scene: SeaScene,
  },
  {
    key: "road",
    label: "Road",
    title: "Road Freight",
    description:
      "Flexible and reliable road transportation solutions supporting domestic and cross-border cargo movement across Europe and international markets.",
    points: [
      "Full Truckload (FTL)",
      "Less than Truckload (LTL)",
      "Cross-Border Transport",
      "Door-to-Door Delivery",
    ],
    accent: "steel",
    Scene: RoadScene,
  },
  {
    key: "rail",
    label: "Rail",
    title: "Rail Freight",
    description:
      "Cost-effective and reliable rail freight solutions for bulk cargo, containerized goods, and long-distance shipments. We coordinate rail transportation through trusted logistics partners across major international trade corridors.",
    points: [
      "Bulk Cargo Transport",
      "Containerized Rail Freight",
      "Cross-Border Shipping",
      "Intermodal Transportation",
    ],
    accent: "crimson",
    Scene: RailScene,
  },
  {
    key: "customs",
    label: "Customs",
    title: "Customs & Documentation",
    description:
      "Streamlined customs and trade documentation support for international shipments. We work with experienced customs and logistics partners to coordinate clearance procedures and import-export requirements.",
    points: [
      "Import & Export Documentation",
      "Customs Clearance Coordination",
      "Trade Compliance Support",
      "Duties & Tariff Guidance",
    ],
    accent: "steel",
    Scene: CustomsScene,
  },
];

const COUNT = SERVICES.length;

const BULLET = {
  steel: "bg-steel shadow-[0_0_14px] shadow-steel",
  crimson: "bg-crimson shadow-[0_0_14px] shadow-crimson",
} as const;

const CORNER = "pointer-events-none absolute size-3.5 border-0 border-snow/75";

const CELL =
  "relative flex min-h-0 flex-col justify-center px-[clamp(1rem,2.4vw,2.25rem)] max-lg:justify-start max-lg:px-0";

/* ---------- parts ---------- */

function SceneLayer({
  index,
  active,
  scroll,
  reduce,
  Scene,
}: {
  index: number;
  active: boolean;
  scroll: MotionValue<number>;
  reduce: boolean;
  Scene: ComponentType<SceneProps>;
}) {
  // 0..1 progress through this service's slice of the runway
  const local = useTransform(scroll, (v) =>
    reduce ? 0.5 : Math.min(1, Math.max(0, v * COUNT - index)),
  );

  return (
    <motion.div
      className="pointer-events-none absolute inset-0"
      initial={false}
      animate={{
        opacity: active ? 1 : 0,
        scale: active ? 1 : 1.08,
        filter: active ? "blur(0px)" : "blur(10px)",
      }}
      transition={{ duration: reduce ? 0 : 0.7, ease: EASE }}
    >
      <Scene progress={local} />
    </motion.div>
  );
}

function RailButton({
  index,
  service,
  active,
  scroll,
  onSelect,
}: {
  index: number;
  service: Service;
  active: boolean;
  scroll: MotionValue<number>;
  onSelect: (i: number) => void;
}) {
  const fill = useTransform(scroll, (v) =>
    Math.min(1, Math.max(0, v * COUNT - index)),
  );
  return (
    <button
      type="button"
      onClick={() => onSelect(index)}
      aria-current={active}
      className="flex cursor-pointer flex-col gap-2.5 pt-0.5 text-left"
    >
      <span className="relative block h-0.5 overflow-hidden bg-snow/14">
        <motion.span className="absolute inset-0 origin-left bg-crimson" style={{ scaleX: fill }} />
      </span>
      <span
        className={cn(
          "flex gap-2 text-xs font-semibold tracking-caps uppercase transition-colors duration-300 hover:text-snow",
          active ? "text-snow" : "text-snow/40",
        )}
      >
        {String(index + 1).padStart(2, "0")}
        <span className="max-sm:hidden">{service.label}</span>
      </span>
    </button>
  );
}

export default function LogisticsServices() {
  const runwayRef = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion() ?? false;
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    target: runwayRef,
    offset: ["start start", "end end"],
  });

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(COUNT - 1, Math.max(0, Math.floor(v * COUNT)));
    setActive((prev) => (prev === next ? prev : next));
  });

  const scrollTo = (i: number) => {
    const el = runwayRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const travel = el.offsetHeight - window.innerHeight;
    window.scrollTo({
      top: top + ((i + 0.5) / COUNT) * travel,
      behavior: reduceMotion ? "auto" : "smooth",
    });
  };

  const current = SERVICES[active];

  const swap = {
    initial: reduceMotion ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: reduceMotion ? { opacity: 0 } : { opacity: 0, y: -24 },
    transition: { duration: reduceMotion ? 0 : 0.45, ease: EASE },
  } as const;

  return (
    <section
      ref={runwayRef}
      id="logistics-services"
      aria-labelledby="services-heading"
      className="on-dark relative h-[550svh] bg-navy"
    >
      <div className="sticky top-nav mx-auto flex h-[calc(100svh-var(--spacing-nav))] max-w-[1320px] flex-col overflow-hidden px-8 max-lg:px-5">
        <div className="relative flex min-h-0 flex-1 flex-col before:pointer-events-none before:absolute before:inset-y-0 before:left-0 before:w-px before:bg-snow/7 before:content-[''] after:pointer-events-none after:absolute after:inset-y-0 after:right-0 after:w-px after:bg-snow/7 after:content-['']">
          <div className="flex items-center justify-center pt-[clamp(1rem,3.2svh,2.25rem)] pb-[clamp(0.75rem,2.6svh,1.75rem)]">
            <h2
              id="services-heading"
              className="text-center font-serif text-[clamp(1.4rem,3.6vw,3rem)] leading-[1.1] font-semibold tracking-heading text-snow"
            >
              Our Logistics Services
            </h2>
          </div>

          <div className="relative grid min-h-0 flex-1 grid-cols-[minmax(0,1fr)_minmax(0,2.1fr)_minmax(0,1fr)] items-stretch max-lg:grid-cols-1 max-lg:grid-rows-[minmax(150px,1fr)_auto_auto] max-lg:gap-y-5.5 max-lg:pb-1">
            <div className={CELL + " max-lg:order-2"}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.div key={current.key} {...swap}>
                  <span className="mb-3.5 flex items-center gap-3 text-xs font-semibold tracking-eyebrow text-crimson uppercase after:block after:h-px after:w-9 after:bg-current after:opacity-60 after:content-[''] max-lg:mb-2">
                    {String(active + 1).padStart(2, "0")} / {String(COUNT).padStart(2, "0")}
                  </span>
                  <h3 className="mb-3 font-serif text-[clamp(1.7rem,2.1vw,2.2rem)] leading-[1.12] font-semibold tracking-heading wrap-break-word text-snow max-lg:mb-2 max-lg:text-[1.4rem]">
                    {current.title}
                  </h3>
                  <p className="m-0 text-[clamp(0.8rem,1.2vw+0.45rem,0.95rem)] leading-body text-snow/60">
                    {current.description}
                  </p>
                </motion.div>
              </AnimatePresence>
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={current.key}
                  aria-hidden
                  className="pointer-events-none absolute bottom-[4%] left-[clamp(0.5rem,1.6vw,1.5rem)] font-serif text-[clamp(6rem,12vw,11rem)] leading-[0.8] font-bold text-transparent select-none [-webkit-text-stroke:1px_color-mix(in_srgb,var(--color-snow)_8%,transparent)] max-lg:hidden"
                  initial={reduceMotion ? false : { opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: reduceMotion ? 0 : 0.5, ease: EASE }}
                >
                  {String(active + 1).padStart(2, "0")}
                </motion.span>
              </AnimatePresence>
            </div>

            <div className="relative aspect-720/440 max-h-full w-full self-center overflow-hidden border border-snow/12 bg-navy shadow-[0_30px_80px_-30px] shadow-ink/60 max-lg:order-1 max-lg:aspect-auto max-lg:min-h-0 max-lg:self-stretch">
              {SERVICES.map((s, i) => (
                <SceneLayer
                  key={s.key}
                  index={i}
                  active={i === active}
                  scroll={scrollYProgress}
                  reduce={reduceMotion}
                  Scene={s.Scene}
                />
              ))}
              <span className={CORNER + " top-3 left-3 border-t-[1.5px] border-l-[1.5px]"} />
              <span className={CORNER + " top-3 right-3 border-t-[1.5px] border-r-[1.5px]"} />
              <span className={CORNER + " bottom-3 left-3 border-b-[1.5px] border-l-[1.5px]"} />
              <span className={CORNER + " right-3 bottom-3 border-r-[1.5px] border-b-[1.5px]"} />
              <div
                aria-hidden
                className="pointer-events-none absolute top-5 left-8 flex items-baseline gap-1.5 text-xs font-semibold tracking-eyebrow text-snow/70 tabular-nums [text-shadow:0_1px_8px_color-mix(in_srgb,var(--color-ink)_50%,transparent)] max-lg:hidden"
              >
                <strong className="text-xl text-snow">{String(active + 1).padStart(2, "0")}</strong>
                <span>— {current.label}</span>
              </div>
            </div>

            <div className={CELL + " max-lg:order-3"}>
              <AnimatePresence mode="wait" initial={false}>
                <motion.ul
                  key={current.key}
                  className="flex list-none flex-col gap-[clamp(0.625rem,2svh,1.375rem)] max-lg:grid max-lg:grid-cols-2 max-lg:gap-x-4 max-lg:gap-y-2"
                  initial="hidden"
                  animate="show"
                  exit="gone"
                  variants={{
                    hidden: {},
                    show: { transition: { staggerChildren: reduceMotion ? 0 : 0.08, delayChildren: 0.15 } },
                    gone: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
                  }}
                >
                  {current.points.map((p) => (
                    <motion.li
                      key={p}
                      className="flex items-center gap-3.5 text-[clamp(0.95rem,1.2vw,1.1rem)] font-medium text-snow/88 max-lg:gap-2.5 max-lg:text-[0.8rem]"
                      variants={{
                        hidden: reduceMotion ? { opacity: 0 } : { opacity: 0, x: 20 },
                        show: { opacity: 1, x: 0, transition: { duration: reduceMotion ? 0 : 0.45, ease: EASE } },
                        gone: { opacity: 0, transition: { duration: 0.15 } },
                      }}
                    >
                      <span className={cn("size-2 flex-none", BULLET[current.accent])} aria-hidden />
                      {p}
                    </motion.li>
                  ))}
                </motion.ul>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <nav
          aria-label="Logistics services"
          className="grid grid-cols-5 gap-2 pt-[clamp(0.75rem,2.4svh,1.5rem)] pb-[clamp(0.875rem,3svh,1.875rem)] max-sm:pr-13"
        >
          {SERVICES.map((s, i) => (
            <RailButton
              key={s.key}
              index={i}
              service={s}
              active={i === active}
              scroll={scrollYProgress}
              onSelect={scrollTo}
            />
          ))}
        </nav>
      </div>
    </section>
  );
}
