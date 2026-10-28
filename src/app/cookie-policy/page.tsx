import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import CookieContent from "@/features/legal/CookieContent";

export const metadata: Metadata = {
  title: "Cookie Policy | Kora Traders",
  description:
    "Which cookies Kora Traders uses and how to manage your cookie consent.",
  alternates: { canonical: "/cookie-policy" },
};

export default function Page() {
  return (
    <>
      <PageHero
        id="cookie-policy-heading"
        eyebrow="Legal"
        title="Cookie Policy"
        description="Which cookies we use and how to manage them."
      />
      <CookieContent />
    </>
  );
}
