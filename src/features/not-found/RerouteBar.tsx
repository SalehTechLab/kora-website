"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Container } from "@/components/ui";
import { ease } from "@/lib/motion";

const ROUTES = [
  { href: "/services", label: "Services", hint: "What we do" },
  { href: "/products", label: "Products", hint: "What we source" },
  { href: "/logistics", label: "Logistics", hint: "How it moves" },
  { href: "/about-us", label: "About us", hint: "Who we are" },
  { href: "/contact-us", label: "Contact", hint: "Talk to us" },
] as const;

/** Five ways back onto the network. Each cell floods crimson from the left on hover / focus. */
export default function RerouteBar() {
  const reduceMotion = useReducedMotion();

  return (
    <nav aria-label="Re-route to another page" className="border-t border-white/15">
      <Container wide>
        <ul className="grid grid-cols-2 md:grid-cols-5">
          {ROUTES.map((route, i) => (
            <motion.li
              key={route.href}
              initial={reduceMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 1.3 + i * 0.09, ease }}
              className="border-b border-l border-white/15 last:max-md:col-span-2 md:border-b-0 md:last:border-r"
            >
              <Link
                href={route.href}
                className="group relative isolate flex h-full flex-col gap-6 overflow-hidden px-5 py-5 md:px-6 md:py-7"
              >
                <span
                  aria-hidden
                  className="absolute inset-0 -z-10 origin-left scale-x-0 bg-crimson transition-transform duration-500 ease-expo group-hover:scale-x-100 group-focus-visible:scale-x-100"
                />
                <span className="flex items-center justify-between text-micro font-semibold tracking-eyebrow text-snow/70 uppercase transition-colors group-hover:text-white">
                  <span>0{i + 1}</span>
                  <ArrowUpRight
                    aria-hidden
                    className="size-5 -translate-x-1 translate-y-1 text-white opacity-60 transition duration-300 ease-expo group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100"
                  />
                </span>
                <span>
                  <span className="block font-serif text-title font-semibold text-white">{route.label}</span>
                  <span className="mt-1 block text-caption text-snow/70 transition-colors group-hover:text-white">
                    {route.hint}
                  </span>
                </span>
              </Link>
            </motion.li>
          ))}
        </ul>
      </Container>
    </nav>
  );
}
