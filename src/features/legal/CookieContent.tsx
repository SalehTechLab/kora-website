"use client";

import Link from "next/link";
import LegalDocument, { type LegalSectionData } from "./LegalDocument";
import CookieDeclaration from "@/components/consent/CookieDeclaration";
import { COOKIEBOT_ID } from "@/components/consent/cookiebot";
import CookieSettingsButton from "@/components/consent/CookieSettingsButton";
import { COMPANY, LEGAL_LAST_UPDATED } from "@/lib/company";

const SECTIONS: LegalSectionData[] = [
  {
    heading: "1. What cookies are",
    content: (
      <p>
        Cookies are small text files that a website stores on your device.
        Similar technologies, such as local storage, work in the same way. In
        this policy, &quot;cookies&quot; includes them.
      </p>
    ),
  },
  {
    heading: "2. How we use them",
    content: (
      <>
        <p>
          We keep cookies to a minimum. This website does not use analytics,
          advertising, social media or other tracking cookies. The only cookie
          we currently set is the one that remembers your cookie choice. Its
          name is <strong>CookieConsent</strong>, it is set by Cookiebot and
          lasts up to 12 months.
        </p>
        <p>
          Cookies that are strictly necessary for the site to work or to store
          your consent choice do not need your consent (section 25(2) TDDDG).
          If we add optional cookies in the future, they will only be loaded
          after you agree in the cookie banner.
        </p>
      </>
    ),
  },
  {
    heading: "3. Your choices",
    content: (
      <>
        <p>
          You can change or withdraw your consent at any time using the
          &quot;Cookie settings&quot; link in the footer of every page
          {COOKIEBOT_ID ? (
            <>
              {" "}
              or here: <CookieSettingsButton />
            </>
          ) : null}
          . You can also delete or block cookies in your browser settings. Blocking the
          consent cookie means the banner will appear again on your next visit.
        </p>
      </>
    ),
  },
  {
    heading: "4. Cookie declaration",
    content: <CookieDeclaration />,
  },
  {
    heading: "5. More information",
    content: (
      <p>
        Details about the personal data processed by the consent service and by
        our hosting are in our <Link href="/privacy-policy">Privacy Policy</Link>.
        Questions? Email <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
      </p>
    ),
  },
];

export default function CookieContent() {
  return (
    <LegalDocument
      label="Cookie policy details"
      sections={SECTIONS}
      updated={LEGAL_LAST_UPDATED}
    />
  );
}
