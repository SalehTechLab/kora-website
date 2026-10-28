import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import TermsContent from "@/features/legal/TermsContent";

export const metadata: Metadata = {
  title: "Terms & Conditions | Kora Traders",
  description:
    "Terms and conditions for using the Kora Traders website and for our trade and sourcing services.",
  alternates: { canonical: "/terms" },
};

export default function Page() {
  return (
    <>
      <PageHero
        id="terms-heading"
        eyebrow="Legal"
        title="Terms & Conditions"
        description="The terms that apply to our website and services."
      />
      <TermsContent />
    </>
  );
}
