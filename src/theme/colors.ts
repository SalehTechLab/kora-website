/**
 * Brand colours as CSS variable references, for the few places a class can't
 * reach (SVG attributes, framer-motion values). The values live in
 * src/app/globals.css under @theme — never write hex here.
 * Prefer Tailwind classes (bg-navy, fill-crimson, text-steel-text) everywhere else.
 */
export const colors = {
  navy: "var(--color-navy)",
  ink: "var(--color-ink)",
  crimson: "var(--color-crimson)",
  steel: "var(--color-steel)",
  snow: "var(--color-snow)",
  white: "var(--color-white)",
  steelText: "var(--color-steel-text)",
  mist: "var(--color-mist)",
} as const;

export const ease = [0.22, 1, 0.36, 1] as const;
