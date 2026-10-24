"use client";

import { Typography } from "antd";
import LegalDocument, {
  type LegalSectionData,
} from "@/components/legal/LegalDocument";

const { Link } = Typography;

const SECTIONS: LegalSectionData[] = [
  {
    heading: "Company",
    content: (
      <address style={{ fontStyle: "normal" }}>
        Kora Trader
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
        <Link href="tel:+4915214181175" strong>
          +49 1521 4181175
        </Link>
        <br />
        Email:{" "}
        <Link href="mailto:info@koratraders.com" strong>
          info@koratraders.com
        </Link>
      </>
    ),
  },
];

export default function ImprintSection() {
  return <LegalDocument label="Imprint details" sections={SECTIONS} />;
}
