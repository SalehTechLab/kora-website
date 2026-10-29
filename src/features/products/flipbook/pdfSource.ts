import type { PDFDocumentProxy } from "pdfjs-dist";

/** What the flipbook engine needs from a document: sized pages it can draw on demand. */
export type PageSource = {
  /** Total pages, always even (a branded end card pads an odd PDF) */
  count: number;
  /** Pages that come from the PDF itself (the rest is the end card) */
  realCount: number;
  /** width / height of one page */
  aspect: number;
  render(index: number, width: number): Promise<HTMLCanvasElement | null>;
  destroy(): void;
};

export type EndCard = { eyebrow: string; title: string; lines: string[] };

const cssVar = (name: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(name).trim();

/** Draws the closing page that pads an odd-length PDF to a full leaf. */
function drawEndCard(width: number, aspect: number, card: EndCard) {
  const height = Math.round(width / aspect);
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const serif = cssVar("--font-serif") || "Georgia, serif";
  const sans = cssVar("--font-sans") || "Arial, sans-serif";
  const navy = cssVar("--color-navy");
  const crimson = cssVar("--color-crimson");
  const snow = cssVar("--color-snow");
  const steel = cssVar("--color-steel");

  ctx.fillStyle = navy;
  ctx.fillRect(0, 0, width, height);

  const u = width / 100; // everything scales from page width
  const pad = 10 * u;

  ctx.fillStyle = crimson;
  ctx.fillRect(pad, height * 0.3, 8 * u, 0.6 * u);

  ctx.textBaseline = "alphabetic";
  ctx.fillStyle = steel;
  ctx.font = `600 ${2.6 * u}px ${sans}`;
  ctx.letterSpacing = `${0.35 * u}px`;
  ctx.fillText(card.eyebrow.toUpperCase(), pad, height * 0.3 - 3 * u);
  ctx.letterSpacing = "0px";

  ctx.fillStyle = snow;
  ctx.font = `700 ${8 * u}px ${serif}`;
  const words = card.title.split(" ");
  let line = "";
  let y = height * 0.3 + 12 * u;
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > width - pad * 2 && line) {
      ctx.fillText(line, pad, y);
      line = word;
      y += 9.4 * u;
    } else {
      line = test;
    }
  }
  ctx.fillText(line, pad, y);

  ctx.fillStyle = steel;
  ctx.font = `400 ${3.2 * u}px ${sans}`;
  y += 10 * u;
  for (const text of card.lines) {
    ctx.fillText(text, pad, y);
    y += 5.2 * u;
  }

  ctx.fillStyle = snow;
  ctx.font = `600 ${3 * u}px ${sans}`;
  ctx.letterSpacing = `${0.3 * u}px`;
  ctx.fillText("KORA TRADERS", pad, height - pad);
  return canvas;
}

export async function openPdf(
  url: string,
  endCard: EndCard,
  signal: AbortSignal,
  onProgress: (ratio: number) => void,
): Promise<PageSource> {
  const pdfjs = await import("pdfjs-dist");
  pdfjs.GlobalWorkerOptions.workerSrc = new URL(
    "pdfjs-dist/build/pdf.worker.min.mjs",
    import.meta.url,
  ).toString();

  const task = pdfjs.getDocument({ url });
  task.onProgress = ({ loaded, total }: { loaded: number; total: number }) => {
    if (total) onProgress(Math.min(1, loaded / total));
  };
  const abort = () => task.destroy();
  signal.addEventListener("abort", abort);

  let pdf: PDFDocumentProxy;
  try {
    pdf = await task.promise;
  } finally {
    signal.removeEventListener("abort", abort);
  }

  const first = await pdf.getPage(1);
  const base = first.getViewport({ scale: 1 });
  const aspect = base.width / base.height;
  const realCount = pdf.numPages;
  const count = realCount % 2 === 0 ? realCount : realCount + 1;

  // pdf.js queues renders itself; capping in-flight work keeps the main thread
  // responsive while the reader is turning pages
  let inFlight = 0;
  const waiting: Array<() => void> = [];
  const slot = async () => {
    if (inFlight >= 2) await new Promise<void>((resolve) => waiting.push(resolve));
    inFlight += 1;
  };
  const release = () => {
    inFlight -= 1;
    waiting.shift()?.();
  };

  return {
    count,
    realCount,
    aspect,
    async render(index, width) {
      if (index >= realCount) return drawEndCard(width, aspect, endCard);
      await slot();
      try {
        const page = await pdf.getPage(index + 1);
        const viewport = page.getViewport({ scale: width / page.getViewport({ scale: 1 }).width });
        const canvas = document.createElement("canvas");
        canvas.width = Math.floor(viewport.width);
        canvas.height = Math.floor(viewport.height);
        await page.render({ canvas, viewport }).promise;
        page.cleanup();
        return canvas;
      } catch (error) {
        console.error("[flipbook] page render failed", index, error);
        return null;
      } finally {
        release();
      }
    },
    destroy() {
      void task.destroy();
    },
  };
}
