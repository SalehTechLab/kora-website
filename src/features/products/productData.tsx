import { COMMODITIES, type Commodity } from "@/features/home/commodities";

// Where "View catalogue & book" sends visitors
export const SHOP_URL = "https://shop.koratraders.com/";

type ProductCopy = {
  tagline: string;
  description: string;
  /** What we supply in this category */
  supplies: string[];
  /** Ways customers buy it */
  models: string[];
  /**
   * Optional real catalogue cover (portrait 3:4 image in /public).
   * When set it replaces the generated cover everywhere.
   */
  cover?: string;
};

export type Product = Commodity & ProductCopy;

const COPY: Record<string, ProductCopy> = {
  salt: {
    cover: "/catalogues/salt.jpg",
    tagline: "Crystal-pure, mineral-rich, hand-selected.",
    description:
      "Himalayan rock salt mined in Pakistan and graded for table, spa and décor use. We coordinate selection, packing and export so every pallet arrives uniform, clean and ready for your shelves.",
    supplies: [
      "Salt bricks & cooking slabs",
      "Edible fine & coarse salt",
      "Bath & spa salt",
      "Salt lamps & décor",
    ],
    models: ["Bulk", "Private label", "Retail-ready packs"],
  },
  surgical: {
    tagline: "Precision steel, consistent quality.",
    description:
      "Stainless-steel surgical and dental instruments sourced from established manufacturers in Pakistan. We handle supplier checks, sample approval and consolidated shipping so every batch matches the last.",
    supplies: [
      "Scissors & forceps",
      "Retractors & clamps",
      "Dental & ENT instruments",
      "Custom instrument kits",
    ],
    models: ["OEM & private label", "Custom kits", "Sample orders"],
  },
  tyres: {
    tagline: "Rolling from the factory to your fleet.",
    description:
      "Passenger, SUV and truck tyres plus wheels and automotive parts from trusted brands and distributors across Europe. Competitive container pricing, with documentation and delivery managed end to end.",
    supplies: [
      "Passenger & SUV tyres",
      "Truck & bus tyres",
      "Alloy wheels",
      "Parts & accessories",
    ],
    models: ["Container loads", "Mixed pallets", "Fleet supply"],
  },
  industrial: {
    tagline: "The components that keep industry moving.",
    description:
      "Machinery parts, components and raw materials for manufacturers and distributors. Give us the specification and we will find, vet and procure it from our network at a price that makes sense.",
    supplies: [
      "Machinery & spare parts",
      "Bearings, fasteners & fittings",
      "Metals & raw materials",
      "Tools & equipment",
    ],
    models: ["Spec-driven sourcing", "Repeat supply", "Spot buys"],
  },
  rice: {
    tagline: "Staples that travel well.",
    description:
      "Premium basmati and long-grain rice alongside staple food commodities, sourced from trusted mills and exporters. We coordinate quality checks, packing and food-grade freight so your shipment arrives fresh.",
    supplies: [
      "Basmati rice",
      "Long-grain & sella rice",
      "Pulses & grains",
      "Spices & staples",
    ],
    models: ["Bulk bags", "Private label packs", "Container loads"],
  },
  textiles: {
    tagline: "Woven to your spec.",
    description:
      "Fabrics, home textiles and ready-made garments from Pakistan's mills and manufacturers. From a single sample run to full production, we manage sourcing, paperwork and delivery.",
    supplies: [
      "Fabrics & yarn",
      "Towels & bed linen",
      "Garments & uniforms",
      "Custom cut-and-sew",
    ],
    models: ["Private label", "Sample to production", "Bulk orders"],
  },
  bopp: {
    tagline: "Film that wraps the world's products.",
    description:
      "Biaxially oriented polypropylene film in packaging, printing and lamination grades. We source from reliable producers and deliver rolls in the widths, gauges and finishes your converting line needs.",
    supplies: [
      "Transparent & metallised film",
      "Thermal lamination film",
      "Printing & packaging grades",
      "Custom widths & gauges",
    ],
    models: ["Full-roll orders", "Repeat contracts", "Custom slitting"],
  },
};

// Carries JSX (illustrations), so import this from client components only
export const PRODUCTS: Product[] = COMMODITIES.map((commodity) => ({
  ...commodity,
  ...COPY[commodity.id],
}));
