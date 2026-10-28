import type { Metadata } from "next";
import ProductsHero from "@/features/products/ProductsHero";
import ProductCatalogue from "@/features/products/ProductCatalogue";
import ShopCTA from "@/features/products/ShopCTA";

export const metadata: Metadata = {
  title: "Products | Kora Traders",
  description:
    "Himalayan salt, surgical instruments, tyres, industrial commodities, rice, textiles and BOPP rolls. Not listed? Tell us what you need and we will source, procure and deliver it.",
};

export default function ProductsPage() {
  return (
    <>
      <ProductsHero />
      <ProductCatalogue />
      <ShopCTA />
    </>
  );
}
