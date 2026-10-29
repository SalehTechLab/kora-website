import Link from "next/link";
import { cn } from "@/lib/cn";

const base =
  "inline-flex cursor-pointer items-center justify-center gap-2 rounded-sm border font-semibold whitespace-nowrap transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary: "border-crimson bg-crimson text-white hover:border-navy hover:bg-navy",
  outline: "border-navy bg-transparent text-navy hover:bg-navy hover:text-white",
  ghost: "border-transparent bg-transparent text-navy hover:text-crimson",
  /** On navy / ink bands */
  light: "border-white bg-white text-navy hover:border-crimson hover:bg-crimson hover:text-white",
  "outline-light":
    "border-snow/40 bg-transparent text-white hover:border-white hover:bg-white hover:text-navy",
} as const;

const sizes = {
  sm: "h-9 px-4 text-sm",
  md: "h-11 px-6 text-ui",
  lg: "h-12 px-8 text-base",
} as const;

type Common = {
  variant?: keyof typeof variants;
  size?: keyof typeof sizes;
  block?: boolean;
};

type ButtonProps = Common & React.ComponentProps<"button"> & { href?: undefined };
type LinkProps = Common & Omit<React.ComponentProps<"a">, "href"> & { href: string };

/**
 * One button for the whole site. Renders <button> without `href`, otherwise a
 * next/link (internal) or plain <a> (external / mailto / tel / #anchor).
 */
export function Button(props: ButtonProps | LinkProps) {
  const { variant = "primary", size = "md", block, className, ...rest } = props;
  const classes = cn(base, variants[variant], sizes[size], block && "w-full", className);

  if ("href" in rest && rest.href !== undefined) {
    const { href, ...anchor } = rest as Omit<LinkProps, keyof Common>;
    // .pdf files are static assets, not routes, so skip next/link
    const external = /^(https?:|mailto:|tel:|#)|\.pdf$/.test(href);
    return external ? (
      <a href={href} className={classes} {...anchor} />
    ) : (
      <Link href={href} className={classes} {...anchor} />
    );
  }
  return <button type="button" className={classes} {...(rest as React.ComponentProps<"button">)} />;
}
