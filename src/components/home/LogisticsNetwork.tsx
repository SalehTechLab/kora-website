"use client";

import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import {
  Button,
  Col,
  ConfigProvider,
  Row,
  Typography,
  type ThemeConfig,
} from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";
import { colors } from "@/theme/themeConfig";

const { Title, Text, Paragraph } = Typography;

const MODES = [
  {
    title: "Road Freight",
    image: "/images/services/road-freight-small.png",
    width: 1000,
    height: 920,
    href: "/services/road-freight",
    description:
      "Flexible FTL and LTL trucking solutions for domestic and cross-border shipments, including first-mile pickup and last-mile delivery.",
  },
  {
    title: "Rail Freight",
    image: "/images/services/rail-freight-small.png",
    width: 1000,
    height: 920,
    href: "/services/rail-freight",
    description:
      "Cost-effective rail transportation for bulk cargo and long-distance shipments across major trade corridors.",
  },
  {
    title: "Sea Freight",
    image: "/images/services/sea-freight-small.png",
    width: 1000,
    height: 920,
    href: "/services/sea-freight",
    description:
      "Reliable FCL and LCL ocean freight solutions for international shipments, containerized cargo, and bulk goods.",
  },
  {
    title: "Air Freight",
    image: "/images/services/air-freight-small.png",
    width: 1000,
    height: 920,
    href: "/services/air-freight",
    description:
      "Fast and flexible air cargo solutions for urgent, high-value, and time-sensitive international shipments.",
  },
];

// White CTA that reads on the burgundy hover state
const sectionTheme: ThemeConfig = {
  components: {
    Typography: {
      titleMarginTop: 0,
    },
    Button: {
      controlHeight: 40,
      defaultShadow: "none",
      defaultColor: colors.darkSlate,
      defaultBg: colors.softWhite,
      defaultBorderColor: colors.softWhite,
      defaultHoverColor: colors.crimson,
      defaultHoverBg: colors.softWhite,
      defaultHoverBorderColor: colors.softWhite,
      defaultActiveColor: colors.crimson,
      defaultActiveBg: colors.softWhite,
      defaultActiveBorderColor: colors.softWhite,
    },
  },
};

const ease = "cubic-bezier(0.22, 1, 0.36, 1)";

const Section = styled.section`
  padding: 112px 0;
  background: ${colors.white};

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
    color: ${colors.crimson};
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

const Media = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  right: 24px;
  height: 240px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: top left;
  transition: transform 0.5s ${ease};

  img {
    width: auto;
    max-width: 100%;
    height: 100%;
    object-fit: contain;
  }
`;

const CardTitle = styled(Title).attrs({ level: 3 })`
  && {
    position: absolute;
    font-size: 22px;
    left: 24px;
    right: 24px;
    bottom: 32px;
    margin: 0;
    font-weight: 700;
    transition:
      opacity 0.3s ease,
      transform 0.4s ${ease};
  }
`;

const Details = styled.div`
  position: absolute;
  left: 24px;
  right: 24px;
  bottom: 28px;
  opacity: 0;
  transform: translateY(16px);
  transition:
    opacity 0.35s ease,
    transform 0.5s ${ease};

  .ant-typography {
    color: ${colors.softWhite};
  }
`;

const Card = styled.article`
  position: relative;
  height: 400px;
  overflow: hidden;
  cursor: pointer;
  background: transparent;
  transition: background-color 0.4s ${ease};

  &:hover,
  &:focus-within,
  &[data-active="true"] {
    background: ${colors.crimson};

    ${Media} {
      transform: scale(0.5);
    }

    ${CardTitle} {
      opacity: 0;
      transform: translateY(-12px);
    }

    ${Details} {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @media (prefers-reduced-motion: reduce) {
    &,
    ${Media}, ${CardTitle}, ${Details} {
      transition-duration: 0.01ms;
    }
  }
`;

export default function LogisticsNetwork() {
  // Tap support for touch devices, where :hover isn't reliable
  const [active, setActive] = useState<string | null>(null);

  return (
    <ConfigProvider theme={sectionTheme}>
      <Section aria-labelledby="logistics-network-heading">
        <Container>
          <Eyebrow>How we deliver</Eyebrow>
          <Heading level={2} id="logistics-network-heading">
            Our Logistics Network
          </Heading>
          <Paragraph
            type="secondary"
            style={{ maxWidth: 640, fontSize: 18, lineHeight: 1.6, marginBottom: 56 }}
          >
            Whichever route your cargo needs to take, we run the mode that fits
            it best, coordinated end to end so nothing gets lost between
            handoffs.
          </Paragraph>

          <Row gutter={[24, 24]}>
            {MODES.map((mode) => (
              <Col key={mode.title} xs={24} sm={12} lg={6}>
                <Card
                  data-active={active === mode.title}
                  onClick={() =>
                    setActive((current) =>
                      current === mode.title ? null : mode.title,
                    )
                  }
                >
                  <Media>
                    <Image
                      src={mode.image}
                      alt=""
                      width={mode.width}
                      height={mode.height}
                      loading="eager"
                      sizes="(max-width: 575px) 90vw, (max-width: 991px) 45vw, 280px"
                    />
                  </Media>

                  <CardTitle>{mode.title}</CardTitle>

                  <Details>
                    <Paragraph style={{ marginBottom: 24, fontSize: 15, lineHeight: 1.6 }}>
                      {mode.description}
                    </Paragraph>
                    <Button
                      href={mode.href}
                      icon={<ArrowRightOutlined />}
                      iconPlacement="end"
                      onClick={(event) => event.stopPropagation()}
                    >
                      More Details
                    </Button>
                  </Details>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </Section>
    </ConfigProvider>
  );
}
