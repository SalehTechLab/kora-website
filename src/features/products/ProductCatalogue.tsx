"use client";

import ProductNav from "./ProductNav";
import ProductSpread from "./ProductSpread";
import SourcingDesk from "./SourcingDesk";
import { PRODUCTS } from "./productData";

// Wraps the sticky chapter bar and every section it points at, so the bar
// releases before the page footer
export default function ProductCatalogue() {
  return (
    <div>
      <ProductNav />
      {PRODUCTS.map((product, i) => (
        <ProductSpread key={product.id} product={product} index={i} />
      ))}
      <SourcingDesk />
    </div>
  );
}
