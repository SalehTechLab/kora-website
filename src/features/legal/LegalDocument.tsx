import type { ReactNode } from "react";
import { Container } from "@/components/ui";

export type LegalSectionData = { heading: string; content: ReactNode };

/** Shared body for legal pages (Imprint, Terms, Privacy, Refunds, Cookies). */
export default function LegalDocument({
  sections,
  label,
  updated,
}: {
  sections: LegalSectionData[];
  label: string;
  updated?: string;
}) {
  return (
    <section aria-label={label} className="bg-white">
      <Container className="pt-12 pb-20 md:pt-20 md:pb-28">
        {/* Readable line length, aligned to the page's left edge */}
        <div className="max-w-180">
          {updated && <p className="mb-10 text-sm text-ink">Last updated: {updated}</p>}
          {sections.map((section) => (
            <div key={section.heading} className="mb-10 last:mb-0">
              {/* Navy title with a thin crimson highlight under its second half */}
              <h2 className="mb-3.5 inline-block bg-linear-to-r from-crimson to-crimson bg-size-[62%_0.09em] bg-position-[100%_100%] bg-no-repeat pr-1 font-serif text-[clamp(1.5rem,1.2rem+1vw,1.875rem)] leading-tight font-bold tracking-heading text-navy">
                {section.heading}
              </h2>
              <div className="text-base leading-[1.75] text-ink [&_a]:font-semibold [&_a]:text-navy [&_a:hover]:text-crimson [&_h3]:mt-4 [&_h3]:mb-1.5 [&_h3]:text-base [&_h3]:font-bold [&_h3]:text-navy [&_li]:mb-1.5 [&_ol]:mb-3 [&_ol]:list-decimal [&_ol]:pl-5.5 [&_p]:mb-3 [&_ul]:mb-3 [&_ul]:list-disc [&_ul]:pl-5.5">
                {section.content}
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
