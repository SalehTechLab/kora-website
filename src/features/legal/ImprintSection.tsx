"use client";

import LegalDocument, {
  type LegalSectionData,
} from "@/features/legal/LegalDocument";

const SECTIONS: LegalSectionData[] = [
  {
    heading: "Company",
    content: (
      <address className="not-italic">
        Kora Traders
        <br />
        Franz-Wolter-Straße
        <br />
        81925 Munich
        <br />
        Germany
      </address>
    ),
  },
  { heading: "Commercial Register", content: "HRA 207145" },
  {
    heading: "Register Court",
    content: "Local Court of Munich (Amtsgericht München)",
  },
  { heading: "VAT ID No.", content: "DE282283433" },
  { heading: "Represented by", content: "Amna Sehar" },
  {
    heading: "Contact",
    content: (
      <>
        Telephone:{" "}
        <a href="tel:+4915214181175" className="font-semibold">
          +49 1521 4181175
        </a>
        <br />
        Email:{" "}
        <a href="mailto:info@koratraders.com" className="font-semibold">
          info@koratraders.com
        </a>
      </>
    ),
  },
];

export default function ImprintSection() {
  return <LegalDocument label="Imprint details" sections={SECTIONS} />;
}
