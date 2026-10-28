"use client";

import { useMemo, useSyncExternalStore } from "react";

const subscribe = (onChange: () => void) => {
  const id = setInterval(onChange, 10_000);
  return () => clearInterval(id);
};

// null on the server and during hydration, so markup never mismatches
export function useLocalTime(timeZone: string) {
  const format = useMemo(
    () =>
      new Intl.DateTimeFormat("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
        timeZone,
      }),
    [timeZone],
  );
  return useSyncExternalStore(
    subscribe,
    () => format.format(new Date()),
    () => null,
  );
}

export default function LiveTime({ timeZone }: { timeZone: string }) {
  const time = useLocalTime(timeZone);
  return (
    <time aria-label={time ? `Local time ${time}` : undefined}>
      {time ?? "--:--"}
    </time>
  );
}
