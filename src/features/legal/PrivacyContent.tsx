"use client";

import Link from "next/link";
import LegalDocument, { type LegalSectionData } from "./LegalDocument";
import { COMPANY, LEGAL_LAST_UPDATED, SHOP_PRIVACY_NOTE } from "@/lib/company";

const SECTIONS: LegalSectionData[] = [
  {
    heading: "1. Who is responsible",
    content: (
      <>
        <p>
          The controller for the processing of personal data on this website
          within the meaning of the EU General Data Protection Regulation
          (GDPR) is:
        </p>
        <address className="not-italic">
          {COMPANY.name}, represented by {COMPANY.representative}
          <br />
          {COMPANY.street}, {COMPANY.postalCity}, {COMPANY.country}
          <br />
          Email: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>
          <br />
          Telephone: <a href={COMPANY.phoneHref}>{COMPANY.phone}</a>
        </address>
        <p className="mt-3">
          See also our <Link href="/imprint">Imprint</Link>. We have not
          appointed a data protection officer because we are not legally
          required to. For any privacy question, write to the email address
          above.
        </p>
      </>
    ),
  },
  {
    heading: "2. The short version",
    content: (
      <ul>
        <li>We only collect what we need to answer your enquiry and run the site securely.</li>
        <li>
          We do not use analytics, advertising or tracking tools, and we do not
          sell your data.
        </li>
        <li>
          Fonts are served from our own domain. Your browser does not contact
          Google to load them.
        </li>
        <li>
          Our cookie banner is provided by Cookiebot (see section 6) and lets you
          decide about any optional cookies.
        </li>
      </ul>
    ),
  },
  {
    heading: "3. Hosting and server log files",
    content: (
      <>
        <p>
          This website is hosted by Vercel Inc., 440 N Barranca Ave #4133,
          Covina, CA 91723, USA, which acts as our processor. When you visit
          the site, the hosting infrastructure automatically processes technical
          data such as your IP address, date and time of the request, requested
          page, referrer URL, browser type and operating system. This is
          needed to deliver the site, keep it secure and fix faults.
        </p>
        <p>
          Legal basis: Art. 6(1)(f) GDPR (our legitimate interest in a secure,
          working website). Log data is kept only as long as needed for these
          purposes and is then deleted or anonymised automatically.
        </p>
      </>
    ),
  },
  {
    heading: "4. Fonts",
    content: (
      <p>
        This site uses the typefaces Inter and Source Serif 4. They are
        downloaded once when we build the website and then delivered from our
        own server. Your browser does not connect to Google or any other font
        server, so no data about your visit is sent there for this purpose.
      </p>
    ),
  },
  {
    heading: "5. Contact and quote request form",
    content: (
      <>
        <p>
          If you send us a request through the form, we process the details you
          enter: your name, business email address, message and the topic you
          select. Company name, phone number and country are optional and only
          processed if you provide them. We use them to reply to you and to
          prepare a quote or offer.
        </p>
        <p>
          Legal basis: Art. 6(1)(b) GDPR where your request relates to a
          contract or pre-contractual steps, otherwise Art. 6(1)(f) GDPR (our
          interest in answering business enquiries). The checkbox on the form
          confirms that you have read this notice; it is not a consent that
          makes the processing dependent on your agreement.
        </p>
        <p>
          The form is submitted to our server and forwarded by email through
          our email service provider Resend (Resend, Inc., San Francisco, USA),
          which acts as our processor. We do not store form submissions in a
          database on the website. They reach our business mailbox only.
        </p>
        <p>
          We delete your request once it is fully dealt with and no contract
          results from it, unless we have to keep it longer under commercial or
          tax law (for example 6 or 10 years for business correspondence and
          accounting records).
        </p>
      </>
    ),
  },
  {
    heading: "6. Cookies and the consent banner (Cookiebot)",
    content: (
      <>
        <p>
          We use the consent management service Cookiebot by Usercentrics A/S,
          Havnegade 39, 1058 Copenhagen, Denmark. It shows a banner on your
          first visit, records your choice and makes sure optional cookies and
          similar technologies are only loaded if you agree. Currently we do not
          use any optional cookies on this site.
        </p>
        <p>
          To do this, your browser connects to Cookiebot&apos;s servers when
          you open the site. Cookiebot processes your (shortened) IP address,
          date and time, browser and device information, the page URL and your
          consent decision, and stores a cookie named CookieConsent in your
          browser so that your choice is remembered. This is needed to prove
          that you gave or refused consent.
        </p>
        <p>
          Legal basis: Art. 6(1)(c) GDPR in conjunction with Art. 7(1) GDPR
          (duty to document consent) and, for access to your device,
          section 25(2) no. 2 of the German Telecommunications Digital Services
          Data Protection Act (TDDDG). Your consent record is kept for as long
          as your choice is valid, up to 12 months, and is then asked for again.
        </p>
        <p>
          You can change or withdraw your choice at any time using the
          &quot;Cookie settings&quot; link in the footer of every page. More
          details are in our{" "}
          <Link href="/cookie-policy">Cookie Policy</Link>.
        </p>
      </>
    ),
  },
  {
    heading: "7. Email, phone, WhatsApp and booking a meeting",
    content: (
      <>
        <p>
          If you contact us by email or phone, we process the details you share
          to handle your request (Art. 6(1)(b) or (f) GDPR).
        </p>
        <p>
          <strong>WhatsApp.</strong> The WhatsApp button on this site is a plain
          link. No data is sent to WhatsApp until you click it. If you do, you
          leave this website and use WhatsApp under the terms and privacy
          policy of WhatsApp Ireland Limited, Dublin, Ireland. Only use it if
          you are comfortable with that, or contact us by email instead.
        </p>
        <p>
          <strong>Booking a consultation.</strong> The &quot;Book a
          Consultation&quot; buttons link to Calendly (Calendly LLC, Atlanta,
          USA). Nothing is transferred until you click. When you book, Calendly
          processes the details you enter (name, email, chosen time, any notes)
          and passes them to us. Please see Calendly&apos;s privacy notice for
          its own processing (Art. 6(1)(b) GDPR for your booking).
        </p>
        <p>
          <strong>Social media.</strong> Links to LinkedIn, Facebook and
          Instagram are plain links without plugins. Data is only exchanged with
          those networks if you click through and then under their privacy
          policies.
        </p>
        <p>{SHOP_PRIVACY_NOTE}</p>
      </>
    ),
  },
  {
    heading: "8. Transfers to countries outside the EU/EEA",
    content: (
      <p>
        Some of the service providers named above are based in, or may process
        data in, the United States. Where this happens, we rely on an adequacy
        decision of the European Commission (EU–U.S. Data Privacy Framework)
        where the provider is certified, or on the EU Standard Contractual
        Clauses together with additional safeguards where necessary. You can
        request a copy of the relevant safeguards from us.
      </p>
    ),
  },
  {
    heading: "9. Recipients",
    content: (
      <p>
        Your data is only passed to the service providers named in this policy
        (hosting, email delivery, consent management) and, where legally
        required, to authorities or advisers bound by confidentiality. We do not
        sell personal data, we do not use it for advertising profiles and we do
        not make decisions based solely on automated processing.
      </p>
    ),
  },
  {
    heading: "10. Your rights",
    content: (
      <>
        <p>Under the GDPR you have the right to:</p>
        <ul>
          <li>access the data we hold about you (Art. 15),</li>
          <li>have inaccurate data corrected (Art. 16),</li>
          <li>have your data erased (Art. 17),</li>
          <li>restrict processing (Art. 18),</li>
          <li>receive your data in a portable format (Art. 20),</li>
          <li>
            object at any time to processing based on our legitimate interests,
            on grounds relating to your situation (Art. 21), and
          </li>
          <li>
            withdraw any consent with effect for the future (Art. 7(3)). This
            does not affect processing that took place before.
          </li>
        </ul>
        <p>
          To exercise your rights, email{" "}
          <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>. You also have
          the right to complain to a data protection authority. The authority
          responsible for us is the Bavarian State Office for Data Protection
          Supervision (Bayerisches Landesamt für Datenschutzaufsicht), Promenade
          18, 91522 Ansbach, Germany, <a href="https://www.lda.bayern.de" target="_blank" rel="noopener noreferrer">www.lda.bayern.de</a>.
        </p>
      </>
    ),
  },
  {
    heading: "11. Security",
    content: (
      <p>
        This website uses TLS encryption (HTTPS). Form data is sent over an
        encrypted connection. No method of transmission over the internet is
        completely secure, so please do not send sensitive information such as
        payment card details through the form.
      </p>
    ),
  },
  {
    heading: "12. Our audience",
    content: (
      <p>
        This website is aimed at businesses. It is not intended for children and
        we do not knowingly collect their data.
      </p>
    ),
  },
  {
    heading: "13. Changes to this policy",
    content: (
      <p>
        We update this policy when our website or the law changes. The current
        version is always available on this page, with the date shown at the
        top.
      </p>
    ),
  },
];

export default function PrivacyContent() {
  return (
    <LegalDocument
      label="Privacy policy details"
      sections={SECTIONS}
      updated={LEGAL_LAST_UPDATED}
    />
  );
}
