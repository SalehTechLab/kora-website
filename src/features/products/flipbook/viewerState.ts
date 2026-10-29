import { useSyncExternalStore } from "react";

/*
 * Whether a catalogue viewer is open. The page underneath is hidden by the
 * overlay, so its looping animations are paused to save CPU/battery: JS ones
 * read this hook, CSS ones key off `html[data-viewer-open]` (see globals.css).
 */
let open = false;
const listeners = new Set<() => void>();

export function setViewerOpen(value: boolean) {
  open = value;
  if (value) document.documentElement.dataset.viewerOpen = "";
  else delete document.documentElement.dataset.viewerOpen;
  listeners.forEach((l) => l());
}

export function useViewerOpen() {
  return useSyncExternalStore(
    (cb) => {
      listeners.add(cb);
      return () => listeners.delete(cb);
    },
    () => open,
    () => false,
  );
}
