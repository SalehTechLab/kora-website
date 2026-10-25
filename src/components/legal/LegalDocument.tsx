"use client";

import type { ReactNode } from "react";
import styled from "styled-components";
import { Typography } from "antd";
import { colors } from "@/theme/themeConfig";

const { Title } = Typography;

export type LegalSectionData = { heading: string; content: ReactNode };

const Section = styled.section`
  background: ${colors.white};
`;

const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 80px 32px 112px;

  @media (max-width: 767px) {
    padding: 48px 20px 80px;
  }
`;

// Readable line length, aligned to the page's left edge
const Body = styled.div`
  max-width: 720px;
`;

const Block = styled.div`
  margin-bottom: 40px;

  &:last-child {
    margin-bottom: 0;
  }
`;

// Deep navy title with a thin crimson highlight under its second half
const Heading = styled(Title)`
  &&& {
    display: inline-block;
    margin: 0 0 14px;
    padding: 0 4px 0 0;
    font-family: var(--font-serif), Georgia, serif;
    font-size: clamp(1.5rem, 1.2rem + 1vw, 1.875rem);
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.02em;
    color: ${colors.deepNavy};
    background: linear-gradient(${colors.crimson}, ${colors.crimson}) no-repeat
      100% 100% / 62% 0.09em;
  }
`;

const Text = styled.div`
  font-size: 16px;
  line-height: 1.75;
  color: ${colors.darkSlate};

  p {
    margin: 0 0 12px;
  }

  && a {
    font-size: inherit;
    color: ${colors.deepNavy};
    font-weight: 600;
  }

  && a:hover {
    color: ${colors.crimson};
  }
`;

/** Shared body for legal pages (Imprint, Terms & Conditions, Privacy). */
export default function LegalDocument({
  sections,
  label,
}: {
  sections: LegalSectionData[];
  label: string;
}) {
  return (
    <Section aria-label={label}>
      <Container>
        <Body>
          {sections.map((section) => (
            <Block key={section.heading}>
              <Heading level={2}>{section.heading}</Heading>
              <Text>{section.content}</Text>
            </Block>
          ))}
        </Body>
      </Container>
    </Section>
  );
}
