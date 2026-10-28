import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

// Custom tokens from @theme must be declared here, otherwise tailwind-merge
// reads e.g. `text-headline` as a colour and drops it next to `text-snow`.
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        { text: ["hero", "hero-sm", "display", "headline", "title", "ticker", "lead", "lead-sm", "body-lg", "ui", "caption", "micro", "eyebrow"] },
      ],
      tracking: [{ tracking: ["eyebrow", "caps", "heading", "display"] }],
      leading: [{ leading: ["body"] }],
      shadow: [{ shadow: ["card", "lift"] }],
      rounded: [{ rounded: ["pill"] }],
    },
  },
});

/** Join class names and resolve Tailwind conflicts (last one wins). */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
