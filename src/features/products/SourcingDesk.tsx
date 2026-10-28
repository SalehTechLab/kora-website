"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Car,
  Check,
  CircleDollarSign,
  MessageSquare,
  Search,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
} from "framer-motion";
import { Button, Container, Eyebrow, Section } from "@/components/ui";
import { cn } from "@/lib/cn";
import { useReveal } from "@/lib/motion";

const ICON = "size-5";

const STEPS = [
  {
    key: "brief",
    icon: <MessageSquare className={ICON} aria-hidden="true" />,
    title: "You tell us what you need",
    text: "Product, specification, quantity and destination. A rough brief is enough to start.",
    optional: false,
  },
  {
    key: "source",
    icon: <Search className={ICON} aria-hidden="true" />,
    title: "We source it",
    text: "We search the market and our supplier network, then shortlist verified options.",
    optional: true,
  },
  {
    key: "procure",
    icon: <CircleDollarSign className={ICON} aria-hidden="true" />,
    title: "We procure it",
    text: "We negotiate on your behalf to land a competitive price, and handle orders and paperwork.",
    optional: true,
  },
  {
    key: "deliver",
    icon: <Car className={ICON} aria-hidden="true" />,
    title: "We deliver it",
    text: "Air, sea, rail or road. We coordinate shipping and track it to your door.",
    optional: true,
  },
] as const;

const EXAMPLES = [
  "Solar panels",
  "Construction steel",
  "Packaging machinery",
  "Medical consumables",
  "Furniture",
  "Spices & pulses",
];

const MODES = [
  { label: "End-to-end service", value: "end" },
  { label: "Customised service", value: "custom" },
] as const;

type Mode = (typeof MODES)[number]["value"];

export default function SourcingDesk() {
  const router = useRouter();
  const reduceMotion = useReducedMotion();
  const reveal = useReveal();
  const timelineRef = useRef<HTMLOListElement>(null);
  const [query, setQuery] = useState("");
  const [mode, setMode] = useState<Mode>("end");
  const [picked, setPicked] = useState<Set<string>>(
    new Set(["source", "procure"]),
  );

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start 75%", "end 60%"],
  });
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 24 });

  const isOn = (key: string, optional: boolean) =>
    mode === "end" || !optional || picked.has(key);

  const toggle = (key: string) =>
    setPicked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  const submit = () => {
    const product = query.trim();
    router.push(
      product ? `/contact-us?product=${encodeURIComponent(product)}` : "/contact-us",
    );
  };

  const chosen = STEPS.filter((s) => s.optional && picked.has(s.key)).map((s) =>
    s.key === "source" ? "sourcing" : s.key === "procure" ? "procurement" : "delivery",
  );

  return (
    <Section
      tone="navy"
      space="none"
      id="anything"
      aria-labelledby="anything-heading"
      className={cn(
        "isolate scroll-mt-32 py-18 md:py-30",
        "bg-[image:radial-gradient(ellipse_50%_70%_at_12%_20%,color-mix(in_srgb,var(--color-crimson)_20%,transparent)_0%,transparent_60%)]",
        "before:absolute before:inset-0 before:-z-1 before:bg-[url('/images/patterns/logistics-doodle.svg')] before:bg-size-[440px] before:bg-center before:opacity-5 before:content-['']",
      )}
    >
      <Container>
        <div className="grid items-start gap-14 lg:grid-cols-2 lg:gap-18">
          <div className="min-w-0 lg:sticky lg:top-40">
            <motion.div {...reveal(0)}>
              <Eyebrow light className="text-snow/70">
                Not on the list?
              </Eyebrow>
              <h2
                id="anything-heading"
                className="font-serif text-[clamp(2.25rem,5vw,4rem)] leading-[1.05] tracking-display text-snow"
              >
                Name it.{" "}
                <em className="bg-linear-to-r from-crimson to-crimson bg-size-[100%_0.07em] bg-position-[0_92%] bg-no-repeat italic">
                  We&rsquo;ll source it.
                </em>
              </h2>
              <p className="mt-6 mb-8 max-w-120 text-lead leading-body text-snow/80">
                Our catalogues are only the start. Tell us the product you
                need and we will search the market, tap our network and get
                it to you at a competitive price, with end-to-end service
                or just the parts you want.
              </p>

              <form
                className="flex flex-wrap gap-2.5"
                onSubmit={(e) => {
                  e.preventDefault();
                  submit();
                }}
              >
                <label className="flex h-13 min-w-0 flex-[1_1_260px] items-center gap-2.5 rounded-sm bg-white px-5.5 text-ink focus-within:outline-3 focus-within:outline-offset-3 focus-within:outline-white">
                  <Search className="size-4 flex-none text-steel-text" aria-hidden="true" />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="e.g. 40ft container of floor tiles"
                    aria-label="Product you need"
                    maxLength={200}
                    className="min-w-0 flex-1 bg-transparent text-base outline-none placeholder:text-steel-text focus-visible:outline-none"
                  />
                </label>
                <Button
                  type="submit"
                  size="lg"
                  className="h-13 px-7 hover:border-white hover:bg-white hover:text-navy"
                >
                  Find it for me
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Button>
              </form>

              <div className="mt-5 flex flex-wrap items-center gap-2">
                <span className="text-xs tracking-caps text-snow/60 uppercase">Try</span>
                {EXAMPLES.map((example) => (
                  <Button
                    key={example}
                    variant="outline-light"
                    size="sm"
                    onClick={() => setQuery(example)}
                    className="h-7 border-snow/20 bg-snow/10 px-3 text-xs hover:border-crimson hover:bg-crimson hover:text-white"
                  >
                    {example}
                  </Button>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div {...reveal(0.15)} className="min-w-0">
            <div
              role="radiogroup"
              aria-label="Service type"
              className="grid grid-cols-2 gap-1 rounded-md bg-snow/10 p-1"
            >
              {MODES.map(({ label, value }) => (
                <label
                  key={value}
                  className="flex h-10 cursor-pointer items-center justify-center rounded-sm px-2 text-center text-base text-snow/75 transition-colors hover:bg-snow/8 hover:text-snow has-checked:bg-snow has-checked:font-semibold has-checked:text-navy has-focus-visible:outline-3 has-focus-visible:outline-offset-2 has-focus-visible:outline-white"
                >
                  <input
                    type="radio"
                    name="service-mode"
                    value={value}
                    checked={mode === value}
                    onChange={() => setMode(value)}
                    className="sr-only"
                  />
                  {label}
                </label>
              ))}
            </div>

            <ol ref={timelineRef} className="relative mt-7">
              <div
                aria-hidden="true"
                className="absolute top-7 bottom-7 left-[27px] w-0.5 bg-snow/15"
              >
                <motion.div
                  className="size-full origin-top bg-crimson"
                  style={{ scaleY: reduceMotion ? 1 : fill }}
                />
              </div>
              {STEPS.map((step, i) => {
                const on = isOn(step.key, step.optional);
                const pickable = mode === "custom" && step.optional;
                const body = (
                  <>
                    <span
                      className={cn(
                        "relative z-1 grid size-14 flex-none place-items-center rounded-full border-2 transition-colors duration-300",
                        on
                          ? "border-crimson bg-crimson text-snow"
                          : "border-snow/25 bg-navy text-snow/60",
                      )}
                    >
                      {pickable && on ? <Check className={ICON} aria-hidden="true" /> : step.icon}
                    </span>
                    <div>
                      <span className="block text-micro font-semibold tracking-eyebrow text-snow/55 uppercase">
                        Step 0{i + 1}
                        {pickable && (on ? " · included" : " · tap to add")}
                      </span>
                      <span className="mt-1 mb-1.5 block font-serif text-[1.375rem] font-bold text-snow">
                        {step.title}
                      </span>
                      <span className="leading-[1.55] text-snow/80">{step.text}</span>
                    </div>
                  </>
                );
                return (
                  <li
                    key={step.key}
                    className={cn(
                      "relative py-3.5 transition-opacity duration-300",
                      on ? "opacity-100" : "opacity-40",
                    )}
                  >
                    {pickable ? (
                      <button
                        type="button"
                        aria-pressed={on}
                        onClick={() => toggle(step.key)}
                        className="flex w-full cursor-pointer gap-5 rounded-lg text-left focus-visible:outline-2 focus-visible:outline-offset-4"
                      >
                        {body}
                      </button>
                    ) : (
                      <div className="flex w-full gap-5">{body}</div>
                    )}
                  </li>
                );
              })}
            </ol>

            <div
              aria-live="polite"
              className="mt-7 rounded-sm border border-l-3 border-snow/15 border-l-crimson bg-snow/5 px-5.5 py-4.5 text-ui leading-[1.55] text-snow/85"
            >
              {mode === "end"
                ? "One partner from the first enquiry to your door: sourcing, procurement and delivery, all coordinated by Kora."
                : chosen.length
                  ? `You run the rest, we handle ${chosen.join(" & ")}. Build the service around how your business already works.`
                  : "Pick the steps you want help with. We will tailor the service to fit."}
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  );
}
