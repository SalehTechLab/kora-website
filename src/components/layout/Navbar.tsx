"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Menu, X } from "lucide-react";
import { Button } from "@/components/ui";
import { cn } from "@/lib/cn";
import LocaleSwitcher from "./LocaleSwitcher";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about-us" },
  { label: "Services", href: "/services" },
  { label: "Products", href: "/products" },
  { label: "Logistics", href: "/logistics" },
  { label: "Contact Us", href: "/contact-us" },
];

const BOOKING_MEETING_URL = "https://calendly.com/kora-traders-sales";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

function BookingCta({ block, onClick }: { block?: boolean; onClick?: () => void }) {
  return (
    <Button
      href={BOOKING_MEETING_URL}
      target="_blank"
      rel="noopener noreferrer"
      block={block}
      onClick={onClick}
    >
      Book a Consultation
      <ArrowRight className="size-4" aria-hidden />
    </Button>
  );
}

/** Accessible slide-in mobile menu: dialog semantics, Esc, focus trap, scroll lock. */
function MobileMenu({
  open,
  onClose,
  isActive,
}: {
  open: boolean;
  onClose: () => void;
  isActive: (href: string) => boolean;
}) {
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const reduceMotion = useReducedMotion();
  const duration = reduceMotion ? 0 : 0.3;

  useEffect(() => {
    if (!open) return;
    const previousFocus = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-200">
          <motion.div
            aria-hidden
            className="absolute inset-0 bg-ink/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration }}
            onClick={onClose}
          />
          <motion.aside
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 right-0 flex w-75 max-w-full flex-col gap-6 overflow-y-auto bg-white p-6 shadow-lift"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration, ease: "easeOut" }}
          >
            <div className="flex justify-end">
              <button
                ref={closeRef}
                type="button"
                aria-label="Close menu"
                onClick={onClose}
                className="inline-flex size-10 cursor-pointer items-center justify-center rounded-sm border border-steel bg-white text-navy"
              >
                <X className="size-5" aria-hidden />
              </button>
            </div>
            <nav aria-label="Mobile" className="flex flex-col gap-6">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={onClose}
                  className={cn(
                    "block text-body-lg font-semibold text-navy hover:text-crimson",
                    isActive(link.href) && "text-crimson",
                  )}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <LocaleSwitcher block />
            <BookingCta block onClick={onClose} />
          </motion.aside>
        </div>
      )}
    </AnimatePresence>
  );
}

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const closeMenu = useCallback(() => setMenuOpen(false), []);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="sticky top-0 z-100 w-full border-b border-steel bg-white"
      >
        <div className="mx-auto flex h-nav max-w-wide items-center justify-between gap-6 px-6">
          <Link href="/" aria-label="Kora Traders home" className="inline-flex shrink-0 items-center">
            <Image
              src="/images/logo/kora-logo-1.svg"
              alt="Kora Traders"
              width={547}
              height={244}
              sizes="(max-width: 767px) 81px, 90px"
              className="h-9 w-auto md:h-10"
              priority
            />
          </Link>

          <nav
            className="hidden flex-1 items-center justify-center gap-2 lg:flex"
            aria-label="Primary"
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                aria-current={isActive(link.href) ? "page" : undefined}
                className={cn(
                  "relative mx-2.5 inline-block px-1 py-2 text-ui font-medium whitespace-nowrap text-navy after:absolute after:inset-x-1 after:bottom-1 after:h-0.5 after:origin-left after:scale-x-0 after:rounded-xs after:bg-crimson after:transition-transform after:duration-250 after:content-[''] hover:text-crimson hover:after:scale-x-100",
                  isActive(link.href) && "text-crimson after:scale-x-100",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-3.5">
            <span className="hidden lg:inline-flex">
              <LocaleSwitcher />
            </span>
            <span className="hidden lg:inline-flex">
              <BookingCta />
            </span>
            <button
              type="button"
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen(true)}
              className="inline-flex size-10 cursor-pointer items-center justify-center rounded-sm border border-steel bg-white text-navy lg:hidden"
            >
              <Menu className="size-5" aria-hidden />
            </button>
          </div>
        </div>
      </motion.header>

      <MobileMenu open={menuOpen} onClose={closeMenu} isActive={isActive} />
    </>
  );
}
