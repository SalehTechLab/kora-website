"use client";

import Link from "next/link";
import LegalDocument, { type LegalSectionData } from "./LegalDocument";
import { COMPANY, LEGAL_LAST_UPDATED, SHOP_PRIVACY_NOTE } from "@/lib/company";

const SECTIONS: LegalSectionData[] = [
  {
    heading: "1. Scope and provider",
    content: (
      <>
        <p>
          These Terms & Conditions apply to the use of this website and to
          quotes, orders and deliveries made by {COMPANY.name},{" "}
          {COMPANY.street}, {COMPANY.postalCity}, {COMPANY.country} (&quot;we&quot;,
          &quot;us&quot;), see our <Link href="/imprint">Imprint</Link>.
        </p>
        <p>
          Our offers are addressed to businesses only, that is, persons who act
          in the exercise of their trade, business or profession (section 14 of
          the German Civil Code, BGB). If we agree something different in
          writing for an individual order, the written agreement prevails.
          Terms of the buyer or supplier that differ from these terms do not
          apply unless we have expressly agreed to them in writing. {SHOP_PRIVACY_NOTE}
        </p>
      </>
    ),
  },
  {
    heading: "2. Information on this website",
    content: (
      <p>
        Product descriptions, catalogues, images and other content on this
        website are for general information and are not a binding offer.
        Availability, specifications, prices and lead times are confirmed in
        our written quote and order confirmation. We take care to keep the
        content accurate and up to date but cannot guarantee it is complete
        or error-free.
      </p>
    ),
  },
  {
    heading: "3. Quotes and formation of contract",
    content: (
      <>
        <p>
          A quote request through the website, email or phone is free of charge
          and does not create a contract. Our quotes are non-binding unless
          they state a validity period. A contract is formed when we confirm
          your order in writing (order confirmation) or, where applicable, when
          both parties have signed the agreement.
        </p>
        <p>
          Please check the order confirmation carefully. If you do not object
          without undue delay, its content applies.
        </p>
      </>
    ),
  },
  {
    heading: "4. Prices and payment",
    content: (
      <p>
        Prices, currency, taxes, payment terms and any advance payment are
        those stated in the quote or order confirmation. Unless stated
        otherwise, prices exclude VAT, customs duties, import taxes and other
        charges levied in the country of destination. Bank charges are borne by
        the paying party as agreed. In case of late payment, statutory default
        interest and costs apply.
      </p>
    ),
  },
  {
    heading: "5. Delivery, risk and shipping terms",
    content: (
      <p>
        Delivery dates are estimates unless expressly confirmed as fixed. The
        agreed Incoterms® rule, as stated in the order confirmation, governs
        delivery, the transfer of risk and the allocation of transport,
        insurance and customs costs. We are entitled to make partial
        deliveries where reasonable for the buyer.
      </p>
    ),
  },
  {
    heading: "6. Inspection and notice of defects",
    content: (
      <p>
        For commercial buyers, the statutory duty to inspect the goods and give
        notice of defects without undue delay applies (sections 377, 381 of the
        German Commercial Code, HGB). Notices must be sent in writing with a
        description of the defect and, where possible, photos or an inspection
        report. Further details on remedies and refunds are in our{" "}
        <Link href="/refund-policy">Refund & Cancellation Policy</Link>.
      </p>
    ),
  },
  {
    heading: "7. Retention of title",
    content: (
      <p>
        To the extent permitted by the law applicable at the place of delivery,
        delivered goods remain our property until the purchase price has been
        paid in full, unless the order confirmation provides otherwise.
      </p>
    ),
  },
  {
    heading: "8. Liability",
    content: (
      <>
        <p>We are liable without limitation for:</p>
        <ul>
          <li>intent and gross negligence,</li>
          <li>injury to life, body or health,</li>
          <li>
            fraudulently concealed defects and assumed guarantees, and under the
            German Product Liability Act.
          </li>
        </ul>
        <p>
          In case of slightly negligent breach of an essential contractual
          obligation (one whose fulfilment makes proper performance possible
          and on which the other party may regularly rely), our liability is
          limited to the foreseeable damage typical for this type of contract.
          Any other liability for slight negligence is excluded. The above does
          not change the burden of proof.
        </p>
      </>
    ),
  },
  {
    heading: "9. Force majeure",
    content: (
      <p>
        We are not responsible for delay or non-performance caused by events
        beyond our reasonable control, such as natural disasters, war, strikes,
        port or carrier disruption, epidemics or government measures. Agreed
        periods are extended by the duration of the disruption. If it lasts
        more than a reasonable time, either party may withdraw from the
        affected part of the contract.
      </p>
    ),
  },
  {
    heading: "10. Export controls, sanctions and compliance",
    content: (
      <p>
        We comply with applicable export control, sanctions and anti-corruption
        laws. We may refuse, suspend or cancel an order, without liability, if
        performing it would breach such laws or if the buyer cannot provide
        required end-use or customs information. The buyer is responsible for
        compliance with the import rules of the destination country unless
        otherwise agreed.
      </p>
    ),
  },
  {
    heading: "11. Intellectual property and website use",
    content: (
      <>
        <p>
          The content of this website, including texts, graphics, logos and
          layout, is protected by copyright and other laws. Brands and product
          names belong to their respective owners. You may view and print the
          content for your own business information. Any other use requires our
          prior written consent.
        </p>
        <p>
          You agree not to misuse the website, for example by attempting to
          disrupt its operation, to gain unauthorised access, or to submit
          unlawful or misleading content through the forms. Links to external
          websites are for convenience and we are not responsible for their
          content.
        </p>
      </>
    ),
  },
  {
    heading: "12. Governing law and jurisdiction",
    content: (
      <p>
        The law of the Federal Republic of Germany applies. The UN Convention
        on Contracts for the International Sale of Goods (CISG) does not apply.
        If the buyer is a merchant, a legal entity under public law or a
        special fund under public law, the place of jurisdiction is Munich,
        Germany. We may also bring a claim at the buyer&apos;s registered seat.
      </p>
    ),
  },
  {
    heading: "13. Final provisions",
    content: (
      <p>
        If a provision of these terms is or becomes invalid, the remaining
        provisions stay in force. We may update these terms; the version
        published when you place your order applies to that order. Questions
        about these terms: <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a>.
      </p>
    ),
  },
];

export default function TermsContent() {
  return (
    <LegalDocument
      label="Terms and conditions details"
      sections={SECTIONS}
      updated={LEGAL_LAST_UPDATED}
    />
  );
}
