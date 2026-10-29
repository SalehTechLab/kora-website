"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChevronLeft,
  ChevronRight,
  Download,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { COMPANY } from "@/lib/company";
import { cn } from "@/lib/cn";
import { Button } from "@/components/ui";
import { FlipbookEngine, type BookState } from "./FlipbookEngine";
import { openPdf, type PageSource } from "./pdfSource";
import { PageSound } from "./pageSound";
import { setViewerOpen } from "./viewerState";

type CatalogueViewerProps = {
  /** Display name, e.g. "Himalayan Salt" */
  name: string;
  pdf: string;
  onClose: () => void;
};

const MUTE_KEY = "kora-flipbook-muted";

const readMuted = () => {
  try {
    return window.localStorage.getItem(MUTE_KEY) === "1";
  } catch {
    return false;
  }
};

const cssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

const iconButton =
  "grid size-11 flex-none cursor-pointer place-items-center rounded-pill border border-snow/25 text-snow transition-colors duration-200 hover:border-white hover:bg-white hover:text-navy disabled:cursor-not-allowed disabled:opacity-35 disabled:hover:border-snow/25 disabled:hover:bg-transparent disabled:hover:text-snow";

/** Full-screen, three.js page-turning reader for a catalogue PDF. */
export default function CatalogueViewer({ name, pdf, onClose }: CatalogueViewerProps) {
  const reduceMotion = useReducedMotion() ?? false;
  const dialogRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const engineRef = useRef<FlipbookEngine | null>(null);
  const soundRef = useRef<PageSound | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [progress, setProgress] = useState(0);
  const [book, setBook] = useState<BookState | null>(null);
  const [realCount, setRealCount] = useState(0);
  const [muted, setMuted] = useState(readMuted);

  // Load the PDF, then hand its pages to the 3D engine
  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return;
    const controller = new AbortController();
    const sound = new PageSound(readMuted());
    soundRef.current = sound;
    let source: PageSource | null = null;

    openPdf(
      pdf,
      {
        eyebrow: "Catalogue",
        title: name,
        lines: [
          "Pricing, samples and lead times",
          "on request — we reply within one working day.",
          "",
          COMPANY.email,
          COMPANY.domain,
        ],
      },
      controller.signal,
      setProgress,
    )
      .then((opened) => {
        if (controller.signal.aborted) {
          opened.destroy();
          return;
        }
        source = opened;
        setRealCount(opened.realCount);
        engineRef.current = new FlipbookEngine({
          container: stage,
          source: opened,
          reduceMotion,
          colors: {
            paper: cssVar("--color-white"),
            board: cssVar("--color-navy"),
            shadow: cssVar("--color-ink"),
          },
          onState: setBook,
          onReady: () => setStatus((current) => (current === "loading" ? "ready" : current)),
          onTurn: (duration, forward) => sound.turn(duration, forward),
        });
      })
      .catch((error) => {
        console.error("[flipbook] could not open catalogue", error);
        if (!controller.signal.aborted) setStatus("error");
      });

    return () => {
      controller.abort();
      engineRef.current?.dispose();
      engineRef.current = null;
      source?.destroy();
      sound.destroy();
      soundRef.current = null;
    };
    // The book is built once per opening; reduceMotion is read at that moment
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdf, name]);

  // Lock page scroll, hand focus to the dialog and give it back on close
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setViewerOpen(true);
    closeRef.current?.focus();
    return () => {
      setViewerOpen(false);
      document.body.style.overflow = overflow;
      previous?.focus?.();
    };
  }, []);

  const toggleMute = useCallback(() => {
    setMuted((current) => {
      const next = !current;
      if (soundRef.current) soundRef.current.muted = next;
      try {
        window.localStorage.setItem(MUTE_KEY, next ? "1" : "0");
      } catch {
        /* storage unavailable: the choice just won't persist */
      }
      return next;
    });
  }, []);

  // Keyboard: arrows turn, Home/End jump, Esc closes, Tab stays inside
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const engine = engineRef.current;
      switch (e.key) {
        case "Escape":
          onClose();
          return;
        case "ArrowRight":
        case "PageDown":
          engine?.next();
          break;
        case "ArrowLeft":
        case "PageUp":
          engine?.prev();
          break;
        case "Home":
          engine?.goTo(0);
          break;
        case "End":
          engine?.goTo(Number.MAX_SAFE_INTEGER);
          break;
        case "Tab": {
          const focusable = dialogRef.current?.querySelectorAll<HTMLElement>(
            "a[href], button:not([disabled])",
          );
          if (!focusable?.length) return;
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
          return;
        }
        default:
          return;
      }
      e.preventDefault();
      soundRef.current?.unlock();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const atStart = book ? (book.single ? book.view === 0 : book.turned === 0) : true;
  const atEnd = book
    ? book.single
      ? book.view >= book.count - 1
      : book.turned >= book.count / 2
    : true;

  const label = (() => {
    if (!book) return "";
    const pages = book.single
      ? [book.view]
      : [book.turned * 2 - 1, book.turned * 2].filter((p) => p >= 0 && p < book.count);
    const real = pages.filter((p) => p < realCount);
    if (!real.length) return "Contact";
    if (real[0] === 0) return "Cover";
    const nums = real.map((p) => p + 1);
    return `Page ${nums.join("–")} of ${realCount}`;
  })();

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-modal="true"
      aria-label={`${name} catalogue`}
      className="on-dark fixed inset-0 z-100 flex flex-col bg-ink text-snow"
    >
      <header className="flex items-center justify-between gap-4 px-4 py-3 md:px-8 md:py-5">
        <div className="min-w-0">
          <span className="block text-eyebrow tracking-eyebrow text-steel uppercase">
            Catalogue
          </span>
          <h2 className="truncate font-serif text-title text-white">{name}</h2>
        </div>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={toggleMute}
            className={iconButton}
            aria-pressed={!muted}
            aria-label={muted ? "Turn page sound on" : "Turn page sound off"}
          >
            {muted ? <VolumeX className="size-4.5" aria-hidden="true" /> : <Volume2 className="size-4.5" aria-hidden="true" />}
          </button>
          <a href={pdf} download className={iconButton} aria-label={`Download the ${name} catalogue as PDF`}>
            <Download className="size-4.5" aria-hidden="true" />
          </a>
          <button ref={closeRef} type="button" onClick={onClose} className={iconButton} aria-label="Close catalogue">
            <X className="size-5" aria-hidden="true" />
          </button>
        </div>
      </header>

      <div className="relative min-h-0 flex-1">
        <div
          ref={stageRef}
          className={cn(
            "absolute inset-0 cursor-pointer transition-opacity duration-500",
            status === "ready" ? "opacity-100" : "opacity-0",
          )}
          role="group"
          aria-roledescription="3D flipbook"
          aria-label="Click the right or left side, drag a page, or use the arrow keys to turn pages"
        />

        {status === "loading" && (
          <div className="absolute inset-0 grid place-items-center" role="status">
            <div className="w-56 text-center">
              <span className="block font-serif text-title text-white">Opening catalogue…</span>
              <div className="mt-4 h-0.5 overflow-hidden rounded-pill bg-snow/20">
                <div
                  className="h-full origin-left bg-crimson transition-transform duration-300"
                  style={{ transform: `scaleX(${Math.max(progress, 0.08)})` }}
                />
              </div>
            </div>
          </div>
        )}

        {status === "error" && (
          <div className="absolute inset-0 grid place-items-center px-6" role="alert">
            <div className="max-w-md text-center">
              <h3 className="font-serif text-title text-white">We couldn&rsquo;t open this catalogue</h3>
              <p className="mt-3 text-snow/80">
                The interactive reader needs WebGL, or the file may be unavailable right now. You can
                download the PDF or ask us to send it to you.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Button variant="light" href={pdf} download>
                  Download PDF
                </Button>
                <Button variant="outline-light" href={`/contact-us?product=${encodeURIComponent(name)}`}>
                  Request catalogue
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>

      <footer className="flex items-center justify-center gap-4 px-4 py-4 md:py-6">
        <button
          type="button"
          className={iconButton}
          onClick={() => {
            soundRef.current?.unlock();
            engineRef.current?.prev();
          }}
          disabled={status !== "ready" || atStart}
          aria-label="Previous page"
        >
          <ChevronLeft className="size-5" aria-hidden="true" />
        </button>
        <div className="min-w-40 text-center">
          <span className="block text-ui font-semibold text-white" aria-live="polite">
            {label || " "}
          </span>
          <span className="hidden text-caption text-steel md:block">
            Click or drag a page · ← → keys · Esc to close
          </span>
        </div>
        <button
          type="button"
          className={iconButton}
          onClick={() => {
            soundRef.current?.unlock();
            engineRef.current?.next();
          }}
          disabled={status !== "ready" || atEnd}
          aria-label="Next page"
        >
          <ChevronRight className="size-5" aria-hidden="true" />
        </button>
      </footer>
    </div>
  );
}
