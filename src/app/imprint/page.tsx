import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import ImprintSection from "@/features/legal/ImprintSection";

export const metadata: Metadata = {
  title: "Imprint | Kora Traders",
  description:
    "Provider identification for Kora Traders in accordance with § 5 DDG.",
};

export default function ImprintPage() {
  return (
    <>
      <PageHero
        id="imprint-heading"
        eyebrow="Legal"
        title="Imprint"
        description="Provider identification in accordance with § 5 DDG."
      />
      <ImprintSection />
    </>
  );
}
