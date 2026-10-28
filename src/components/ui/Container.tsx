import { cn } from "@/lib/cn";

type Props = React.ComponentProps<"div"> & { wide?: boolean };

/** Page-width column with the site's responsive gutters. */
export function Container({ wide, className, ...props }: Props) {
  return (
    <div
      className={cn(
        "relative mx-auto w-full px-5 md:px-8",
        wide ? "max-w-wide" : "max-w-page",
        className,
      )}
      {...props}
    />
  );
}
