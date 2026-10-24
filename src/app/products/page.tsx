import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductsHero from "@/components/products/ProductsHero";
import ProductCatalogue from "@/components/products/ProductCatalogue";
import ShopCTA from "@/components/products/ShopCTA";

export const metadata: Metadata = {
  title: "Products | Kora Traders",
  description:
    "Himalayan salt, surgical instruments, tyres, industrial commodities, rice, textiles and BOPP rolls. Not listed? Tell us what you need and we will source, procure and deliver it.",
};

export default function ProductsPage() {
  return (
    <main>
      <Navbar />
      <ProductsHero />
      <ProductCatalogue />
      <ShopCTA />
      <Footer />
    </main>
  );
}
