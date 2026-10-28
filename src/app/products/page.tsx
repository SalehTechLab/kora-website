import type { Metadata } from "next";
import JsonLd from "@/components/seo/JsonLd";
import RelatedLinks from "@/components/layout/RelatedLinks";
import { breadcrumbJsonLd, pageMetadata, webPageJsonLd } from "@/lib/seo";
import ProductsHero from "@/features/products/ProductsHero";
import ProductCatalogue from "@/features/products/ProductCatalogue";
import ShopCTA from "@/features/products/ShopCTA";

const TITLE = "Products & Commodities We Source";
const DESCRIPTION =
  "Himalayan salt, surgical instruments, tyres, industrial commodities, rice, textiles and BOPP rolls. Not listed? Tell us and we will source it.";

export const metadata: Metadata = pageMetadata({
  title: TITLE,
  description: DESCRIPTION,
  path: "/products",
});

export default function ProductsPage() {
  return (
    <>
      <JsonLd
        data={[
          webPageJsonLd("CollectionPage", TITLE, DESCRIPTION, "/products"),
          breadcrumbJsonLd("Products", "/products"),
        ]}
      />
      <ProductsHero />
      <ProductCatalogue />
      <ShopCTA />
      <RelatedLinks items={["services", "logistics", "about"]} />
    </>
  );
}
