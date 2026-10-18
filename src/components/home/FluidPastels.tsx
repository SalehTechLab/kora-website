"use client";

import { useEffect, useRef } from "react";
import styled from "styled-components";

const Canvas = styled.canvas`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
`;

const SCALE = 4; // canvas renders at 1/4 size; soft gradients hide the upscale
const FPS = 30;

// Brand palette only: Cool Blue-Gray #D0D7E2, tints of it, and white,
// all on the Off-White #F7F9FC section background
const PALETTE: [number, number, number][] = [
  [208, 215, 226], // blue-gray
  [255, 255, 255], // white
  [224, 229, 237], // light blue-gray
  [255, 255, 255],
  [208, 215, 226],
];

type Blob = {
  hx: number; // home position, 0..1
  hy: number;
  r: number; // radius as fraction of the shorter side
  sx: number; // drift speed
  sy: number;
  ox: number; // drift phase
  oy: number;
  color: [number, number, number];
  x: number; // current position, 0..1
  y: number;
};

const makeBlobs = (): Blob[] =>
  PALETTE.map((color, i) => {
    const hx = (i + 0.5) / PALETTE.length;
    const hy = i % 2 ? 0.7 : 0.3;
    return {
      hx,
      hy,
      r: 0.45 + Math.random() * 0.2,
      sx: 0.06 + Math.random() * 0.06,
      sy: 0.05 + Math.random() * 0.06,
      ox: Math.random() * Math.PI * 2,
      oy: Math.random() * Math.PI * 2,
      color,
      x: hx,
      y: hy,
    };
  });

export default function FluidPastels() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const blobs = makeBlobs();
    // Pointer in 0..1 canvas space; `active` fades the cursor glow in and out
    const pointer = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5, active: 0, target: 0 };
    let raf = 0;
    let last = 0;
    let visible = false;

    const resize = () => {
      canvas.width = Math.max(1, Math.round(canvas.clientWidth / SCALE));
      canvas.height = Math.max(1, Math.round(canvas.clientHeight / SCALE));
    };

    const glow = (
      x: number,
      y: number,
      radius: number,
      [r, g, b]: [number, number, number],
      alpha: number,
    ) => {
      const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
      grad.addColorStop(0, `rgba(${r},${g},${b},${alpha})`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grad;
      ctx.fillRect(x - radius, y - radius, radius * 2, radius * 2);
    };

    const draw = (t: number) => {
      const time = t / 1000;
      const { width: w, height: h } = canvas;
      const base = Math.min(w, h);

      // Ease the cursor and its glow so movement feels fluid, not snappy
      pointer.x += (pointer.tx - pointer.x) * 0.08;
      pointer.y += (pointer.ty - pointer.y) * 0.08;
      pointer.active += (pointer.target - pointer.active) * 0.06;

      ctx.clearRect(0, 0, w, h);

      for (const b of blobs) {
        const dx = b.hx + Math.sin(time * b.sx * Math.PI * 2 + b.ox) * 0.18;
        const dy = b.hy + Math.cos(time * b.sy * Math.PI * 2 + b.oy) * 0.22;
        // Blobs lean gently toward the cursor
        const pull = 0.18 * pointer.active;
        b.x += (dx + (pointer.x - dx) * pull - b.x) * 0.05;
        b.y += (dy + (pointer.y - dy) * pull - b.y) * 0.05;
        glow(b.x * w, b.y * h, b.r * base * 1.3, b.color, 0.75);
      }

      if (pointer.active > 0.01) {
        const c = PALETTE[Math.floor(time / 4) % PALETTE.length];
        glow(pointer.x * w, pointer.y * h, base * 0.35, c, 0.9 * pointer.active);
      }
    };

    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (now - last < 1000 / FPS) return;
      last = now;
      draw(now);
    };

    const start = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    // The canvas ignores pointer events, so listen on the window
    const onMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const inside = x >= 0 && x <= 1 && y >= 0 && y <= 1;
      pointer.target = inside ? 1 : 0;
      if (inside) {
        pointer.tx = x;
        pointer.ty = y;
      }
    };
    const onLeave = () => {
      pointer.target = 0;
    };

    resize();
    const ro = new ResizeObserver(() => {
      resize();
      if (reduceMotion) draw(0);
    });
    ro.observe(canvas);

    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (reduceMotion) return;
      if (visible) start();
      else stop();
    });
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener("visibilitychange", onVisibility);

    if (reduceMotion) {
      draw(0);
    } else {
      window.addEventListener("pointermove", onMove, { passive: true });
      document.documentElement.addEventListener("pointerleave", onLeave);
    }

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return <Canvas ref={ref} aria-hidden />;
}
