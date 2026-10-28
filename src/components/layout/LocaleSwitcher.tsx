"use client";

import { useEffect, useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { UKFlagIcon, DEFlagIcon } from "@/components/icons/FlagIcons";
import { cn } from "@/lib/cn";

type LocaleCode = "en" | "de";

const LOCALES: Record<LocaleCode, { label: string; code: string; flag: ReactNode }> = {
  en: { label: "English", code: "EN", flag: <UKFlagIcon /> },
  de: { label: "Deutsch", code: "DE", flag: <DEFlagIcon /> },
};

const CODES = Object.keys(LOCALES) as LocaleCode[];

const flagClass = "inline-flex items-center overflow-hidden rounded-xs leading-none";

export default function LocaleSwitcher({ block = false }: { block?: boolean }) {
  const [locale, setLocale] = useState<LocaleCode>("en");
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuId = useId();

  // Close on outside click / Esc
  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  // Move focus to the selected option when the menu opens
  useEffect(() => {
    if (!open) return;
    rootRef.current
      ?.querySelector<HTMLElement>('[role="menuitemradio"][aria-checked="true"]')
      ?.focus();
  }, [open]);

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== "ArrowDown" && e.key !== "ArrowUp") return;
    e.preventDefault();
    const items = Array.from(
      rootRef.current?.querySelectorAll<HTMLElement>('[role="menuitemradio"]') ?? [],
    );
    const index = items.indexOf(document.activeElement as HTMLElement);
    const next = (index + (e.key === "ArrowDown" ? 1 : -1) + items.length) % items.length;
    items[next]?.focus();
  };

  return (
    <div ref={rootRef} className={cn("relative", block ? "block w-full" : "inline-block")}>
      <button
        ref={triggerRef}
        type="button"
        aria-label="Change language"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={() => setOpen((o) => !o)}
        className={cn(
          "inline-flex h-10 cursor-pointer items-center gap-2 rounded-sm border border-steel bg-snow px-3.5 text-caption font-semibold tracking-[0.02em] text-navy transition-colors duration-200 hover:border-navy",
          block && "w-full justify-center",
        )}
      >
        <span className={flagClass}>{LOCALES[locale].flag}</span>
        <span className="leading-none">{LOCALES[locale].code}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.2 }}
          className="inline-flex text-ink"
        >
          <ChevronDown className="size-3" aria-hidden />
        </motion.span>
      </button>

      {open && (
        <div
          id={menuId}
          role="menu"
          aria-label="Language"
          onKeyDown={onMenuKeyDown}
          className="absolute top-full right-0 z-10 mt-1 min-w-full rounded-md bg-white p-1 shadow-card"
        >
          {CODES.map((code) => (
            <button
              key={code}
              type="button"
              role="menuitemradio"
              aria-checked={locale === code}
              onClick={() => {
                setLocale(code);
                setOpen(false);
                triggerRef.current?.focus();
              }}
              className={cn(
                "flex w-full cursor-pointer items-center gap-2.5 rounded-sm px-3 py-2 text-start text-sm whitespace-nowrap text-ink hover:bg-snow",
                locale === code && "bg-mist font-semibold text-navy",
              )}
            >
              <span className={flagClass}>{LOCALES[code].flag}</span>
              {LOCALES[code].label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
