"use client";

import { useEffect, useRef } from "react";
import { COOKIEBOT_ID } from "./cookiebot";

/** Cookiebot's auto-generated, always up-to-date list of cookies in use. */
export default function CookieDeclaration() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = ref.current;
    if (!host || !COOKIEBOT_ID) return;
    const script = document.createElement("script");
    script.id = "CookieDeclaration";
    script.src = `https://consent.cookiebot.com/${COOKIEBOT_ID}/cd.js`;
    script.async = true;
    host.appendChild(script);
    return () => {
      host.replaceChildren();
    };
  }, []);

  if (!COOKIEBOT_ID) {
    return (
      <p>
        <strong>Cookies in use:</strong> only the consent cookie described
        above. This site currently sets no analytics, advertising or tracking
        cookies.
      </p>
    );
  }
  return <div ref={ref} />;
}
