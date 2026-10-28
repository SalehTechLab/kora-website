import { cn } from "@/lib/cn";

const tones = {
  snow: "bg-snow text-ink",
  white: "bg-white text-ink",
  mist: "bg-mist text-ink",
  navy: "on-dark bg-navy text-snow",
  ink: "on-dark bg-ink text-snow",
  crimson: "on-dark bg-crimson text-white",
} as const;

const spacing = {
  none: "",
  md: "py-16 md:py-20",
  lg: "py-20 md:py-28",
  xl: "py-24 md:py-36",
} as const;

type Props = React.ComponentProps<"section"> & {
  tone?: keyof typeof tones;
  space?: keyof typeof spacing;
};

/** A full-bleed page band. `tone` sets background + text colour; dark tones flip focus rings. */
export function Section({ tone = "snow", space = "lg", className, ...props }: Props) {
  return (
    <section
      className={cn("relative overflow-hidden", tones[tone], spacing[space], className)}
      {...props}
    />
  );
}
