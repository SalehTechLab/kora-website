"use client";

import { COOKIEBOT_ID } from "./cookiebot";

/** Re-opens the Cookiebot dialog so consent can be changed or withdrawn. */
export default function CookieSettingsButton({
  children = "Change cookie settings",
}: {
  children?: string;
}) {
  if (!COOKIEBOT_ID) return null;
  return (
    <button
      type="button"
      onClick={() => window.Cookiebot?.renew()}
      className="cursor-pointer border-0 bg-transparent p-0 text-start font-[inherit] font-semibold text-inherit underline hover:decoration-2"
    >
      {children}
    </button>
  );
}
