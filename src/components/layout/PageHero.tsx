import { Container, Section, Eyebrow } from "@/components/ui";

type PageHeroProps = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
};

export default function PageHero({ id, eyebrow, title, description }: PageHeroProps) {
  return (
    <Section
      tone="navy"
      space="none"
      aria-labelledby={id}
      className="isolate bg-[radial-gradient(ellipse_60%_90%_at_78%_55%,color-mix(in_srgb,var(--color-crimson)_22%,transparent)_0%,transparent_62%)]"
    >
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[url('/images/patterns/logistics-doodle.svg')] bg-size-[440px] bg-center opacity-6"
      />
      <Container className="pt-16 pb-14 md:pt-24 md:pb-22">
        <div className="max-w-160">
          <Eyebrow light rule className="text-snow/70">
            {eyebrow}
          </Eyebrow>
          <h1
            id={id}
            className="mb-6 font-serif text-hero font-bold tracking-display text-snow"
          >
            {title}
          </h1>
          <p className="max-w-130 text-lead leading-body text-snow/80">
            {description}
          </p>
        </div>
      </Container>
    </Section>
  );
}
