import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import RefundContent from "@/features/legal/RefundContent";

export const metadata: Metadata = {
  title: "Refund & Cancellation Policy | Kora Traders",
  description:
    "How cancellations, returns and refunds work for Kora Traders orders.",
  alternates: { canonical: "/refund-policy" },
};

export default function Page() {
  return (
    <>
      <PageHero
        id="refund-policy-heading"
        eyebrow="Legal"
        title="Refund & Cancellation Policy"
        description="How cancellations, returns and refunds work."
      />
      <RefundContent />
    </>
  );
}
