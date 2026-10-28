"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { ease } from "@/lib/motion";
import LostRoute from "./LostRoute";

const MAX_PATH = 42;

/** The address the visitor asked for, safe to print (React escapes it) and short enough for one line. */
function readablePath(pathname: string) {
  let path = pathname;
  try {
    path = decodeURIComponent(pathname);
  } catch {
    // malformed escape: show it as received
  }
  return path.length > MAX_PATH ? `${path.slice(0, MAX_PATH)}…` : path;
}

/** A consignment-tracker panel that reports, deadpan, that this page is not on any manifest. */
export default function TrackerCard() {
  const reduceMotion = useReducedMotion();
  const pathname = usePathname();

  const rows = [
    { label: "Requested", value: readablePath(pathname) },
    { label: "Last scan", value: "Nowhere on our network" },
    { label: "Status", value: "Not on manifest", alert: true },
    { label: "Next step", value: "Re-route below" },
  ];

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 40, rotate: 1.5 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 1.1, delay: 0.7, ease }}
      className="rounded-xl border border-white/15 bg-white/5 p-5 shadow-lift backdrop-blur-md md:p-6"
    >
      <div className="mb-3 flex items-center justify-between gap-3 border-b border-white/15 pb-4">
        <span className="text-eyebrow font-semibold tracking-eyebrow text-snow/80 uppercase">
          Consignment tracker
        </span>
        <span className="inline-flex shrink-0 items-center gap-2 rounded-pill border border-crimson/60 whitespace-nowrap px-3 py-1 text-micro font-semibold tracking-caps text-white uppercase">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping-dot rounded-pill bg-crimson motion-reduce:animate-none" />
            <span className="relative size-2 rounded-pill bg-crimson" />
          </span>
          Signal lost
        </span>
      </div>

      <LostRoute />

      <dl className="mt-2 divide-y divide-white/10 border-t border-white/15">
        {rows.map((row, i) => (
          <motion.div
            key={row.label}
            initial={reduceMotion ? false : { opacity: 0, x: -14 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 3.2 + i * 0.18, ease }}
            className="flex items-baseline justify-between gap-6 py-2.5 text-ui"
          >
            <dt className="shrink-0 text-caption tracking-caps text-snow/70 uppercase">{row.label}</dt>
            <dd className={row.alert ? "font-semibold text-white" : "min-w-0 truncate text-right text-snow"}>
              {row.alert && (
                <span aria-hidden className="mr-2 inline-block size-1.5 rounded-pill bg-crimson align-middle" />
              )}
              {row.value}
            </dd>
          </motion.div>
        ))}
      </dl>
    </motion.div>
  );
}
