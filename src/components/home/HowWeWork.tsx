"use client";

import styled from "styled-components";
import { ConfigProvider, Typography, type ThemeConfig } from "antd";
import { colors } from "@/theme/themeConfig";
import ProcessJourney from "./ProcessJourney";

const { Title, Text, Paragraph } = Typography;

const sectionTheme: ThemeConfig = {
  components: {
    Typography: {
      titleMarginTop: 0,
    },
  },
};

const Section = styled.section`
  padding: 112px 0;
  background: ${colors.offWhite};

  @media (max-width: 767px) {
    padding: 72px 0;
  }
`;

const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;

  @media (max-width: 767px) {
    padding: 0 20px;
  }
`;

const Eyebrow = styled(Text)`
  && {
    display: block;
    margin-bottom: 16px;
    font-size: 13px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${colors.burgundy};
  }
`;

const Heading = styled(Title)`
  && {
    font-family: var(--font-serif), Georgia, "Times New Roman", serif;
    font-size: clamp(2rem, 4vw, 3rem);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }
`;

export default function HowWeWork() {
  return (
    <ConfigProvider theme={sectionTheme}>
      <Section aria-labelledby="how-we-work-heading">
        <Container>
          <Eyebrow>How we work</Eyebrow>
          <Heading level={2} id="how-we-work-heading">
            From First Contact to Final Delivery
          </Heading>
          <Paragraph
            type="secondary"
            style={{ maxWidth: 640, fontSize: 18, lineHeight: 1.6, marginBottom: 56 }}
          >
            From understanding your requirements to sourcing, procurement, and
            international shipping, we simplify global trade through a
            structured process built on transparency, reliability, and clear
            communication.
          </Paragraph>

          <ProcessJourney />
        </Container>
      </Section>
    </ConfigProvider>
  );
}
