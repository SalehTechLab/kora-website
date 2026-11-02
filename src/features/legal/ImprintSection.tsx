"use client";

import LegalDocument, {
  type LegalSectionData,
} from "@/features/legal/LegalDocument";

const SECTIONS: LegalSectionData[] = [
  {
    heading: "Company",
    content: (
      <address className="not-italic">
        Kora Traders (Einzelunternehmen)
        <br />
        Franz-Wolter-Straße 13
        <br />
        81925 Munich
        <br />
        Germany
      </address>
    ),
  },
  { heading: "Commercial Register", content: "HRA XXXXXX" },
  {
    heading: "Register Court",
    content: "Local Court of Munich (Amtsgericht München)",
  },
  { heading: "VAT ID No.", content: "DEXXXXXXXXX" },
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
