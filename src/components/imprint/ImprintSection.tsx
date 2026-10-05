"use client";

import type { ReactNode } from "react";
import styled from "styled-components";
import { Flex, Typography } from "antd";
import { colors } from "@/theme/themeConfig";

const { Text, Link } = Typography;

const muted = "#5b6577";

type ImprintEntry = { label: string; content: ReactNode };

const ENTRIES: ImprintEntry[] = [
  {
    label: "Company",
    content: (
      <address style={{ fontStyle: "normal" }}>
        Kora Trader
        <br />
        Lothstr. 19
        <br />
        80797 Munich
        <br />
        Germany
      </address>
    ),
  },
  { label: "Commercial Register", content: "HRB 207145" },
  {
    label: "Register Court",
    content: "Local Court of Munich (Amtsgericht München)",
  },
  { label: "VAT ID No.", content: "DE282283433" },
  { label: "Represented by", content: "Amna Sehar" },
  {
    label: "Contact",
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

const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 88px 32px 104px;

  @media (max-width: 767px) {
    padding: 56px 20px 72px;
  }
`;

const Label = styled(Text)`
  && {
    display: block;
    margin-bottom: 6px;
    font-family: var(--font-serif), Georgia, serif;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${colors.burgundy};
  }
`;

const Value = styled.div`
  font-size: 14px;
  line-height: 1.7;
  color: ${muted};
`;

export default function ImprintSection() {
  return (
    <Container>
      <Flex vertical gap={32}>
        {ENTRIES.map((entry) => (
          <div key={entry.label}>
            <Label>{entry.label}</Label>
            <Value>{entry.content}</Value>
          </div>
        ))}
      </Flex>
    </Container>
  );
}
