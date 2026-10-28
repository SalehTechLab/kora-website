export const BOOKING_MEETING_URL = "https://calendly.com/kora-traders-sales";

export type ServiceKey =
  | "sourcing"
  | "procurement"
  | "quality"
  | "private-label"
  | "logistics"
  | "customs";

export type Service = {
  key: ServiceKey;
  label: string;
  title: string;
  lead: string;
  description: string;
  points: string[];
  ask: string;
  link?: { label: string; href: string };
};

export const SERVICES: Service[] = [
  {
    key: "sourcing",
    label: "Sourcing",
    title: "Find the right supplier, wherever they are.",
    lead: "Supplier search & shortlisting",
    description:
      "Tell us what you need. We search our network of manufacturers, exporters and distributors across Pakistan, Europe and beyond, and bring back suppliers that match your specification, not just whoever answered first.",
    points: [
      "Supplier search and shortlisting",
      "Capability and background checks",
      "Sample requests",
      "Products outside our catalogue",
    ],
    ask: "Where do I even find a reliable supplier for this?",
  },
  {
    key: "procurement",
    label: "Procurement",
    title: "A fair price, agreed and in writing.",
    lead: "Negotiation & order management",
    description:
      "We negotiate on your behalf: price, quantities, payment and delivery terms. Then we consolidate orders so a small buyer can purchase like a much larger one, and confirm every term before anything moves.",
    points: [
      "Price and terms negotiation",
      "Quote comparison",
      "Order consolidation",
      "Spot buys and repeat supply",
    ],
    ask: "Is this actually a fair price?",
  },
  {
    key: "quality",
    label: "Quality",
    title: "Checked at the source, before it ships.",
    lead: "Samples, inspection & packing",
    description:
      "Samples are approved before you commit, and batches are checked before they leave. Problems caught at the factory are cheap to fix. The same problems caught at your warehouse are not.",
    points: [
      "Sample approval",
      "Pre-shipment checks",
      "Packing and labelling review",
      "Specification-to-product matching",
    ],
    ask: "Will batch ten match batch one?",
  },
  {
    key: "private-label",
    label: "Private label",
    title: "Put your own name on it.",
    lead: "OEM, private label & custom orders",
    description:
      "Build your own line. We coordinate OEM and private-label production, custom kits and retail-ready packaging with manufacturers who can deliver to your spec, then carry the order through to your door.",
    points: [
      "OEM and private label",
      "Custom packaging",
      "Custom kits and bundles",
      "Retail-ready packs",
    ],
    ask: "Can I sell this under my own brand?",
  },
  {
    key: "logistics",
    label: "Logistics",
    title: "Air, sea, rail or road. Chosen per shipment.",
    lead: "International freight coordination",
    description:
      "We are not tied to a single carrier, so each route is planned around your deadline and budget and coordinated through trusted logistics partners from pickup to delivery.",
    points: [
      "Air, sea, rail and road",
      "FCL, LCL and consolidation",
      "Door-to-door coordination",
      "Shipment updates along the way",
    ],
    ask: "How fast can it get here, and what will it cost?",
    link: { label: "Explore logistics", href: "/logistics" },
  },
  {
    key: "customs",
    label: "Customs",
    title: "Paperwork that never stops the truck.",
    lead: "Customs & documentation",
    description:
      "Import and export documents, clearance coordination and duty guidance, handled with experienced partners so your cargo clears the border instead of waiting at it.",
    points: [
      "Import and export documentation",
      "Customs clearance coordination",
      "Trade compliance support",
      "Duties and tariff guidance",
    ],
    ask: "What do I need to bring this in?",
  },
];

export const FAQS = [
  {
    q: "Do you own the ships, planes and trucks?",
    a: "No, and that is deliberate. We coordinate freight through trusted logistics partners, which lets us pick the right carrier and mode for every shipment instead of selling you whatever we happen to own.",
  },
  {
    q: "What if the product I need isn’t in your catalogue?",
    a: "Our catalogue is where we have the deepest supplier relationships, not the limit of what we can do. Send us the specification and we will search our network for it.",
  },
  {
    q: "Can I order under my own brand?",
    a: "Yes. We coordinate OEM and private-label production, custom kits and retail-ready packaging with manufacturers who can work to your specification.",
  },
  {
    q: "I have no clearing agent. Can you still help?",
    a: "That is exactly who we built the customs service for. We coordinate documentation and clearance with experienced partners and tell you upfront what your destination requires.",
  },
  {
    q: "Who will I actually be talking to?",
    a: "A real team in our Munich headquarters or our Lahore regional office, with one point of contact who stays with your order from the first brief to final delivery.",
  },
  {
    q: "How do I get started?",
    a: "Send us a quote request with what you need, the quantity and where it is going. We reply with a clear plan and a competitive quote. Prefer to talk first? Book a consultation.",
  },
];
