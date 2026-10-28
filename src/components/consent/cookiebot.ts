/**
 * Cookiebot (Usercentrics) consent management.
 * Create a Domain Group at https://www.cookiebot.com, then set the Domain
 * Group ID as NEXT_PUBLIC_COOKIEBOT_ID. Without it no banner is loaded.
 */
export const COOKIEBOT_ID = process.env.NEXT_PUBLIC_COOKIEBOT_ID;

declare global {
  interface Window {
    Cookiebot?: { renew: () => void; show?: () => void };
  }
}
