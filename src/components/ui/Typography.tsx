import { cn } from "@/lib/cn";

type Tone = "default" | "muted" | "light" | "accent";

const tones: Record<Tone, string> = {
  default: "",
  muted: "text-steel-text",
  light: "text-snow/80",
  accent: "text-crimson",
};

/** Small uppercase label above a heading. `light` for dark bands, `rule` adds the crimson lead-in line. */
export function Eyebrow({
  light,
  rule,
  className,
  ...props
}: React.ComponentProps<"span"> & { light?: boolean; rule?: boolean }) {
  return (
    <span
      className={cn(
        "mb-4 block text-eyebrow font-semibold tracking-eyebrow uppercase",
        light ? "text-snow/80" : "text-crimson",
        rule &&
          "mb-5 inline-flex items-center gap-3 before:h-0.5 before:w-7 before:bg-crimson before:content-['']",
        className,
      )}
      {...props}
    />
  );
}

const headingSizes = {
  display: "font-serif text-display",
  headline: "font-serif text-headline",
  title: "font-serif text-title",
  sm: "text-lg font-semibold",
} as const;

type HeadingProps = React.ComponentProps<"h2"> & {
  as?: "h1" | "h2" | "h3" | "h4";
  size?: keyof typeof headingSizes;
  light?: boolean;
};

/** Semantic heading decoupled from visual size: <Heading as="h2" size="headline">. */
export function Heading({ as: Tag = "h2", size = "headline", light, className, ...props }: HeadingProps) {
  return (
    <Tag
      className={cn(headingSizes[size], light && "text-snow", className)}
      {...props}
    />
  );
}

const textSizes = {
  sm: "text-sm leading-relaxed",
  md: "text-base leading-relaxed",
  lg: "text-lg leading-relaxed md:text-xl",
} as const;

/** Body copy. */
export function Text({
  size = "md",
  tone = "default",
  as: Tag = "p",
  className,
  ...props
}: React.ComponentProps<"p"> & {
  size?: keyof typeof textSizes;
  tone?: Tone;
  as?: "p" | "span" | "div";
}) {
  return <Tag className={cn(textSizes[size], tones[tone], className)} {...props} />;
}
