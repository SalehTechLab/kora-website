"use client";

import LegalDocument, { type LegalSectionData } from "./LegalDocument";
import { LEGAL_LAST_UPDATED } from "@/lib/company";

const SECTIONS: LegalSectionData[] = [
  {
    heading: "Fonts",
    content: (
      <>
        <p>
          <strong>Inter</strong>, copyright © 2016 The Inter Project Authors
          (<a href="https://github.com/rsms/inter" target="_blank" rel="noopener noreferrer">github.com/rsms/inter</a>).
        </p>
        <p>
          <strong>Source Serif 4</strong>, copyright © 2014–2023 Adobe
          (<a href="https://github.com/adobe-fonts/source-serif" target="_blank" rel="noopener noreferrer">github.com/adobe-fonts/source-serif</a>),
          with Reserved Font Name &quot;Source&quot;.
        </p>
        <p>
          Both fonts are licensed under the SIL Open Font License, Version 1.1.
          The full licence text is available at{" "}
          <a href="/licenses/OFL-1.1.txt">/licenses/OFL-1.1.txt</a>. The fonts
          are served from our own domain.
        </p>
      </>
    ),
  },
  {
    heading: "Open-source software",
    content: (
      <ul>
        <li>React, Next.js, Tailwind CSS and Motion (Framer Motion), all MIT licensed.</li>
        <li>Lucide icons, ISC licensed.</li>
      </ul>
    ),
  },
  {
    heading: "Logos, photos and illustrations",
    content: (
      <p>
        The Kora Traders name and logo are our trademarks. Other brand names
        and logos shown belong to their respective owners. Photos and
        illustrations on this site are protected by copyright and may not be
        reused without permission. To request permission or report an issue,
        contact us via the{" "}
        <a href="/contact-us">contact page</a>.
      </p>
    ),
  },
];

export default function LicensesContent() {
  return (
    <LegalDocument
      label="Licences and credits details"
      sections={SECTIONS}
      updated={LEGAL_LAST_UPDATED}
    />
  );
}
