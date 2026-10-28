"use client";

import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/cn";
import type { Product } from "./productData";

type Tone = "navy" | "paper" | "slate";

const TONES: Record<
  Tone,
  { face: string; sub: string; window: string; rule: string; back: string }
> = {
  navy: {
    face: "bg-navy text-snow",
    back: "bg-navy",
    sub: "text-snow/60",
    window: "bg-snow",
    rule: "border-snow/20",
  },
  paper: {
    face: "bg-snow text-navy",
    back: "bg-snow",
    sub: "text-ink/65",
    window: "bg-white",
    rule: "border-navy/20",
  },
  slate: {
    face: "bg-ink text-snow",
    back: "bg-ink",
    sub: "text-snow/60",
    window: "bg-mist",
    rule: "border-snow/20",
  },
};

const TONE_CYCLE: Tone[] = ["navy", "paper", "slate"];

/* Everything inside the cover is sized in cqw so one component serves the
   hero thumbnails and the full-size spreads. */

type CatalogueCoverProps = {
  product: Product;
  /** Zero-based position; drives the cover colourway and the number */
  index: number;
  /** Skip the pointer tilt and the 3D edge (hero thumbnails) */
  flat?: boolean;
};

export default function CatalogueCover({
  product,
  index,
  flat = false,
}: CatalogueCoverProps) {
  const reduceMotion = useReducedMotion();
  const interactive = !flat && !reduceMotion;
  const stageRef = useRef<HTMLDivElement>(null);

  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 110, damping: 16 });
  const sy = useSpring(py, { stiffness: 110, damping: 16 });
  const rotateY = useTransform(sx, [-0.5, 0.5], [-28, -2]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [9, -9]);
  const sheenX = useTransform(sx, [-0.5, 0.5], [0, 100]);
  const sheenY = useTransform(sy, [-0.5, 0.5], [0, 100]);
  const sheen = useMotionTemplate`radial-gradient(circle at ${sheenX}% ${sheenY}%, color-mix(in srgb, var(--color-white) 55%, transparent), transparent 55%)`;

  const onMove = (e: React.PointerEvent) => {
    if (!interactive || !stageRef.current) return;
    const r = stageRef.current.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const tone = TONES[TONE_CYCLE[index % TONE_CYCLE.length]];

  // Resting pose is slightly turned so the page edge reads as a real book
  const restRotateY = flat ? 0 : -15;

  return (
    <div
      ref={stageRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="w-full [container-type:inline-size] [perspective:1500px]"
    >
      <motion.div
        className="relative aspect-[3/4] w-full [transform-style:preserve-3d]"
        style={interactive ? { rotateX, rotateY } : { rotateY: restRotateY }}
      >
        {!flat && (
          <div
            className={cn(
              "absolute inset-0 rounded-[1cqw_3cqw_3cqw_1cqw] shadow-[0_5cqw_9cqw_-2cqw] shadow-navy/45 [transform:translateZ(-3.4cqw)]",
              tone.back,
            )}
          />
        )}
        {!flat && (
          <div className="absolute top-[0.8cqw] right-0 bottom-[0.8cqw] w-[3.4cqw] origin-right [transform:rotateY(-90deg)] bg-[repeating-linear-gradient(180deg,var(--color-white)_0_0.35cqw,var(--color-steel)_0.35cqw_0.5cqw)]" />
        )}
        <div
          className={cn(
            "absolute inset-0 flex flex-col overflow-hidden rounded-[1cqw_3cqw_3cqw_1cqw] pt-[7cqw] pr-[7cqw] pb-[6.5cqw] pl-[11.5cqw] [backface-visibility:hidden] [transform-style:preserve-3d]",
            tone.face,
          )}
        >
          {product.cover ? (
            <Image
              src={product.cover}
              alt={`${product.name} catalogue cover`}
              fill
              sizes="(max-width: 767px) 80vw, 440px"
              className="object-cover"
            />
          ) : (
            <>
              {/* Hinge + crimson binding band down the left edge */}
              <div className="absolute inset-y-0 left-0 w-[7cqw] bg-crimson bg-[linear-gradient(90deg,color-mix(in_srgb,var(--color-ink)_30%,transparent),color-mix(in_srgb,var(--color-white)_10%,transparent)_70%,color-mix(in_srgb,var(--color-ink)_18%,transparent))]" />
              <div
                className={cn(
                  "flex justify-between border-b pb-[3cqw] text-[2.5cqw] font-semibold tracking-eyebrow uppercase",
                  tone.sub,
                  tone.rule,
                )}
              >
                <span>Kora Traders</span>
                <span>Catalogue 2026</span>
              </div>
              <div
                className={cn(
                  "relative mt-[4.5cqw] mb-[5cqw] aspect-[1.12/1] flex-none overflow-hidden rounded-[1.6cqw] shadow-[0_3cqw_5cqw_-2cqw] shadow-ink/35 [transform:translateZ(4.5cqw)]",
                  "before:absolute before:top-[52%] before:left-1/2 before:aspect-square before:w-[78%] before:-translate-1/2 before:rounded-full before:bg-[radial-gradient(circle,color-mix(in_srgb,var(--color-crimson)_16%,transparent),transparent_68%)] before:content-['']",
                  "[&>svg]:absolute [&>svg]:inset-[4%] [&>svg]:size-[92%]",
                  tone.window,
                )}
              >
                {product.art}
              </div>
              <span className="block font-serif text-[7.6cqw] leading-[1.04] font-bold tracking-heading">
                {product.name}
              </span>
              <div
                className={cn(
                  "mt-auto flex items-end justify-between border-t pt-[3cqw] text-[2.6cqw] font-semibold tracking-caps uppercase",
                  tone.sub,
                  tone.rule,
                )}
              >
                <span>Source · Procure · Deliver</span>
              </div>
            </>
          )}
          {interactive && (
            <motion.div
              className="pointer-events-none absolute inset-0 mix-blend-soft-light"
              style={{ background: sheen }}
            />
          )}
        </div>
      </motion.div>
    </div>
  );
}
