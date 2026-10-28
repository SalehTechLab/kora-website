import type { Metadata } from "next";
import PageHero from "@/components/layout/PageHero";
import LicensesContent from "@/features/legal/LicensesContent";

export const metadata: Metadata = {
  title: "Licences & Credits | Kora Traders",
  description:
    "Open font licences, software credits and image rights for the Kora Traders website.",
  alternates: { canonical: "/licenses" },
};

export default function Page() {
  return (
    <>
      <PageHero
        id="licenses-heading"
        eyebrow="Legal"
        title="Licences & Credits"
        description="Fonts, software and image rights."
      />
      <LicensesContent />
    </>
  );
}
