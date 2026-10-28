import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import RelatedLinks from "@/components/layout/RelatedLinks";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import LogisticsHero from "@/features/logistics/LogisticsHero";
import LogisticsIntro from "@/features/logistics/LogisticsIntro";
import LogisticsServices from "@/features/logistics/LogisticsServices";
import KoraAdvantage from "@/features/logistics/KoraAdvantage";
import LogisticsCTA from "@/features/logistics/LogisticsCTA";

const TITLE = "International Freight & Logistics";
const DESCRIPTION =
  "From sourcing to delivery, Kora Traders coordinates international road, rail, sea and air freight through trusted logistics partners.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/logistics",
});

export default function LogisticsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd("WebPage", TITLE, DESCRIPTION, "/logistics"),
          breadcrumbJsonLd("Logistics", "/logistics"),
        ]}
      />
      <LogisticsHero />
      <LogisticsIntro />
      <LogisticsServices />
      <KoraAdvantage />
      <LogisticsCTA />
      <RelatedLinks items={["services", "products", "about"]} />
    </>
  );
}
