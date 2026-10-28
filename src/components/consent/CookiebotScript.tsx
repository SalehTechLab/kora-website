import Script from "next/script";
import { COOKIEBOT_ID } from "./cookiebot";

/**
 * Loads the Cookiebot banner. Must be the first script on the page so that
 * automatic blocking can hold back any non-essential scripts added later.
 */
export default function CookiebotScript() {
  if (!COOKIEBOT_ID) return null;
  return (
    // App Router: beforeInteractive is supported in the root layout; the lint
    // rule only knows the pages/_document.js case.
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script
      id="Cookiebot"
      src="https://consent.cookiebot.com/uc.js"
      data-cbid={COOKIEBOT_ID}
      data-blockingmode="auto"
      strategy="beforeInteractive"
    />
  );
}
