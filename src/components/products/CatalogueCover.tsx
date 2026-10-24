"use client";

import { useRef } from "react";
import Image from "next/image";
import styled from "styled-components";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import { colors } from "@/theme/themeConfig";
import { SERIF } from "@/components/about/shared";
import type { Product } from "./productData";

type Tone = "navy" | "paper" | "slate";

const TONES: Record<
  Tone,
  { bg: string; ink: string; sub: string; window: string; rule: string }
> = {
  navy: {
    bg: colors.deepNavy,
    ink: colors.softWhite,
    sub: "rgba(244, 246, 249, 0.62)",
    window: colors.softWhite,
    rule: "rgba(244, 246, 249, 0.2)",
  },
  paper: {
    bg: colors.softWhite,
    ink: colors.deepNavy,
    sub: "rgba(36, 44, 56, 0.66)",
    window: colors.white,
    rule: "rgba(16, 41, 78, 0.18)",
  },
  slate: {
    bg: colors.darkSlate,
    ink: colors.softWhite,
    sub: "rgba(244, 246, 249, 0.6)",
    window: colors.mist,
    rule: "rgba(244, 246, 249, 0.2)",
  },
};

const TONE_CYCLE: Tone[] = ["navy", "paper", "slate"];

/* Everything inside the cover is sized in cqw so one component serves the
   hero thumbnails and the full-size spreads. */

const Stage = styled.div`
  width: 100%;
  container-type: inline-size;
  perspective: 1500px;
`;

const Book = styled(motion.div)`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 4;
  transform-style: preserve-3d;
`;

const THICKNESS = "3.4cqw";

const Pages = styled.div`
  position: absolute;
  top: 0.8cqw;
  right: 0;
  bottom: 0.8cqw;
  width: ${THICKNESS};
  transform-origin: right center;
  transform: rotateY(-90deg);
  background: repeating-linear-gradient(
    180deg,
    ${colors.white} 0 0.35cqw,
    ${colors.steelGray} 0.35cqw 0.5cqw
  );
`;

const Back = styled.div<{ $bg: string }>`
  position: absolute;
  inset: 0;
  transform: translateZ(-${THICKNESS});
  border-radius: 1cqw 3cqw 3cqw 1cqw;
  background: ${({ $bg }) => $bg};
  box-shadow: 0 5cqw 9cqw -2cqw rgba(16, 41, 78, 0.45);
`;

const Face = styled.div<{ $bg: string; $ink: string }>`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: 7cqw 7cqw 6.5cqw 11.5cqw;
  overflow: hidden;
  border-radius: 1cqw 3cqw 3cqw 1cqw;
  background: ${({ $bg }) => $bg};
  color: ${({ $ink }) => $ink};
  transform-style: preserve-3d;
  backface-visibility: hidden;
`;

// Hinge + crimson binding band down the left edge
const Spine = styled.div`
  position: absolute;
  inset: 0 auto 0 0;
  width: 7cqw;
  background:
    linear-gradient(
      90deg,
      rgba(0, 0, 0, 0.28),
      rgba(255, 255, 255, 0.1) 70%,
      rgba(0, 0, 0, 0.16)
    ),
    ${colors.crimson};
`;

const Top = styled.div<{ $sub: string; $rule: string }>`
  display: flex;
  justify-content: space-between;
  padding-bottom: 3cqw;
  border-bottom: 1px solid ${({ $rule }) => $rule};
  font-size: 2.5cqw;
  font-weight: 600;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${({ $sub }) => $sub};
`;

const Window = styled.div<{ $bg: string }>`
  position: relative;
  flex: none;
  margin: 4.5cqw 0 5cqw;
  aspect-ratio: 1.12 / 1;
  border-radius: 1.6cqw;
  background: ${({ $bg }) => $bg};
  transform: translateZ(4.5cqw);
  box-shadow: 0 3cqw 5cqw -2cqw rgba(0, 0, 0, 0.35);
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    left: 50%;
    top: 52%;
    width: 78%;
    aspect-ratio: 1;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    background: radial-gradient(
      circle,
      rgba(181, 30, 50, 0.16),
      rgba(181, 30, 50, 0) 68%
    );
  }

  & > svg {
    position: absolute;
    inset: 4%;
    width: 92%;
    height: 92%;
  }
`;

const Title = styled.span`
  display: block;
  margin-top: 0;
  font-family: ${SERIF};
  font-size: 7.6cqw;
  font-weight: 700;
  line-height: 1.04;
  letter-spacing: -0.02em;
`;

const Foot = styled.div<{ $sub: string; $rule: string }>`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-top: auto;
  padding-top: 3cqw;
  border-top: 1px solid ${({ $rule }) => $rule};
  font-size: 2.6cqw;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $sub }) => $sub};
`;

const Sheen = styled(motion.div)`
  position: absolute;
  inset: 0;
  pointer-events: none;
  mix-blend-mode: soft-light;
`;

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
  const sheen = useMotionTemplate`radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.55), transparent 55%)`;

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
    <Stage ref={stageRef} onPointerMove={onMove} onPointerLeave={onLeave}>
      <Book
        style={
          interactive
            ? { rotateX, rotateY }
            : { rotateY: restRotateY }
        }
      >
        {!flat && <Back $bg={tone.bg} />}
        {!flat && <Pages />}
        <Face $bg={tone.bg} $ink={tone.ink}>
          {product.cover ? (
            <Image
              src={product.cover}
              alt={`${product.name} catalogue cover`}
              fill
              sizes="(max-width: 767px) 80vw, 440px"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <>
              <Spine />
              <Top $sub={tone.sub} $rule={tone.rule}>
                <span>Kora Traders</span>
                <span>Catalogue 2026</span>
              </Top>
              <Window $bg={tone.window}>{product.art}</Window>
              <Title>{product.name}</Title>
              <Foot $sub={tone.sub} $rule={tone.rule}>
                <span>Source · Procure · Deliver</span>
              </Foot>
            </>
          )}
          {interactive && <Sheen style={{ background: sheen }} />}
        </Face>
      </Book>
    </Stage>
  );
}
