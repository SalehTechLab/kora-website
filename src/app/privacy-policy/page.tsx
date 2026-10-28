import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import PrivacyContent from "@/features/legal/PrivacyContent";

export const metadata: Metadata = {
  title: "Privacy Policy | Kora Traders",
  description:
    "How Kora Traders collects, uses and protects personal data on this website.",
  alternates: { canonical: "/privacy-policy" },
};

export default function Page() {
  return (
    <>
      <PageHero
        id="privacy-policy-heading"
        eyebrow="Legal"
        title="Privacy Policy"
        description="How we handle your personal data."
      />
      <PrivacyContent />
    </>
  );
}
