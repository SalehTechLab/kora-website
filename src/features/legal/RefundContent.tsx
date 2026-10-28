"use client";

import Link from "next/link";
import LegalDocument, { type LegalSectionData } from "./LegalDocument";
import { COMPANY, LEGAL_LAST_UPDATED, SHOP_PRIVACY_NOTE } from "@/lib/company";

const SECTIONS: LegalSectionData[] = [
  {
    heading: "1. Who this policy is for",
    content: (
      <>
        <p>
          This policy explains how cancellations, returns and refunds work for
          orders placed with {COMPANY.name}. Our trade and sourcing services
          are for business customers. For these orders there is no statutory
          right of withdrawal as there is for consumers, so cancellations and
          refunds follow this policy and your contract.
        </p>
        <p>
          If we ever sell to consumers, their mandatory statutory rights,
          including the 14-day right of withdrawal where it applies, are not
          limited by this policy. {SHOP_PRIVACY_NOTE}
        </p>
      </>
    ),
  },
  {
    heading: "2. Quotes and enquiries",
    content: (
      <p>
        Requesting a quote is free and non-binding. You can withdraw an enquiry
        at any time before you accept our quote and we have confirmed the order.
      </p>
    ),
  },
  {
    heading: "3. Cancelling a confirmed order",
    content: (
      <>
        <p>
          Once we have confirmed your order in writing, it is binding. You can
          ask us to cancel it in writing. Cancellation depends on how far the
          order has progressed:
        </p>
        <ul>
          <li>
            If we have not yet purchased, produced or shipped any goods for
            you, we will normally agree to cancel.
          </li>
          <li>
            If we have already incurred costs for sourcing, production,
            inspection, packaging, freight bookings or documentation, we may
            agree to cancel only if these costs are covered. We will tell you
            the amount before you decide.
          </li>
          <li>
            Goods that are custom-made, labelled or specially sourced for you,
            or already shipped, usually cannot be cancelled. Any exception
            is stated in your order confirmation.
          </li>
        </ul>
        <p>
          Terms agreed in your individual contract or order confirmation take
          precedence over this section.
        </p>
      </>
    ),
  },
  {
    heading: "4. Defective, damaged or incorrect goods",
    content: (
      <>
        <p>
          Please inspect the goods as soon as they arrive. If something is
          wrong, tell us in writing without undue delay (see section 6 of our{" "}
          <Link href="/terms">Terms & Conditions</Link>). Include your order
          number, a description of the problem and photos or an independent
          inspection report. For transport damage, also note it on the carrier&apos;s
          delivery document and keep the packaging.
        </p>
        <p>
          If your claim is justified, we will, within the law and your
          contract, repair or replace the goods, issue a credit note or refund
          the affected part of the price. Where we ask for the goods to be
          returned or kept for inspection, we will explain how and agree who
          bears the cost. Your statutory warranty rights remain unaffected.
        </p>
      </>
    ),
  },
  {
    heading: "5. Shortfalls and delivery delays",
    content: (
      <p>
        If the quantity delivered differs from the order, or delivery is
        significantly late, contact us promptly. We will work with you and the
        carrier on a solution, such as a supplementary delivery, a price
        adjustment or, where the delay is substantial and the law allows, a
        refund.
      </p>
    ),
  },
  {
    heading: "6. How refunds are paid",
    content: (
      <>
        <p>
          Approved refunds are paid to the account or payment method used for
          the original payment, in the original currency, without undue delay
          after we have accepted the claim and, where applicable, received and
          checked returned goods. Bank and transfer charges of the paying party
          are not refunded unless the error was ours.
        </p>
        <p>
          Amounts for goods or services that were properly delivered, and
          third-party fees already paid on your behalf (for example customs
          duties or carrier charges), are not refundable unless the law or your
          contract says otherwise.
        </p>
      </>
    ),
  },
  {
    heading: "7. How to contact us",
    content: (
      <p>
        Send cancellation requests and claims to{" "}
        <a href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a> or write to{" "}
        {COMPANY.name}, {COMPANY.street}, {COMPANY.postalCity}, {COMPANY.country}.
        Please quote your order number so we can respond quickly.
      </p>
    ),
  },
];

export default function RefundContent() {
  return (
    <LegalDocument
      label="Refund and cancellation details"
      sections={SECTIONS}
      updated={LEGAL_LAST_UPDATED}
    />
  );
}
