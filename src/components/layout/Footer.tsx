"use client";

import Link from "next/link";
import Image from "next/image";
import styled from "styled-components";
import {
  Button,
  Col,
  ConfigProvider,
  Divider,
  Flex,
  Layout,
  Row,
  Typography,
  type ThemeConfig,
} from "antd";
import {
  ArrowUpOutlined,
  FacebookFilled,
  InstagramOutlined,
  LinkedinFilled,
} from "@ant-design/icons";
import { colors } from "@/theme/themeConfig";

const { Title, Text, Paragraph } = Typography;

const COMMODITIES = [
  { label: "Himalayan Salt Products", href: "/products/himalayan-salt" },
  { label: "Surgical Instruments", href: "/products/surgical-instruments" },
  { label: "Tyres & Automotive Products", href: "/products/tyres-automotive" },
  { label: "Industrial Commodities", href: "/products/industrial-commodities" },
  { label: "Rice & Food Commodities", href: "/products/rice-food" },
  { label: "Textiles & Apparel", href: "/products/textiles-apparel" },
];

const LEGAL_LINKS = [
  { label: "About us", href: "/about" },
  { label: "Impressum", href: "/impressum" },
  { label: "Privacy Policy", href: "/privacy-policy" },
  { label: "Terms & Conditions", href: "/terms" },
];

// TODO: replace with the real Kora social profile URLs
const SOCIAL_LINKS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    icon: <LinkedinFilled />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/",
    icon: <FacebookFilled />,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    icon: <InstagramOutlined />,
  },
];

const OFFICES = [
  {
    name: "Munich Headquarters",
    address: "Leopoldstraße 120, 80802 München, Germany",
    phone: "+49 (0) 89 2154 7890",
  },
  {
    name: "Pakistan Operations",
    address: "Port Qasim Logistics Zone, Karachi, Pakistan",
    phone: "+92 (21) 3584 9200",
  },
];

const textSoft = "rgba(255, 255, 255, 0.82)";
const textMuted = "rgba(255, 255, 255, 0.62)";

// Dark theme scoped to the footer so antd components render correctly on navy
const footerTheme: ThemeConfig = {
  token: {
    colorText: textSoft,
    colorTextHeading: colors.white,
    colorTextDescription: textMuted,
    colorLink: textSoft,
    colorLinkHover: colors.white,
    colorLinkActive: colors.white,
    colorSplit: "rgba(255, 255, 255, 0.12)",
  },
  components: {
    Layout: {
      footerBg: "#0b1d38",
      footerPadding: "72px 0 32px",
    },
    Typography: {
      titleMarginTop: 0,
      titleMarginBottom: 20,
    },
    Button: {
      controlHeight: 36,
      fontWeight: 600,
      defaultShadow: "none",
      defaultColor: colors.white,
      defaultBg: "rgba(255, 255, 255, 0.08)",
      defaultBorderColor: "rgba(255, 255, 255, 0.16)",
      defaultHoverColor: colors.white,
      defaultHoverBg: colors.burgundy,
      defaultHoverBorderColor: colors.burgundy,
      defaultActiveColor: colors.white,
      defaultActiveBg: colors.burgundy,
      defaultActiveBorderColor: colors.burgundy,
    },
  },
};

const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 0 32px;

  @media (max-width: 767px) {
    padding: 0 20px;
  }
`;

const Slogan = styled(Text)`
  && {
    display: block;
    margin: 10px 0;
    font-family: var(--font-serif), Georgia, serif;
    font-style: italic;
    font-size: 17px;
    font-weight: 600;
    color: ${colors.white};
  }
`;

const ColumnTitle = styled(Title).attrs({ level: 5 })`
  && {
    font-size: 13px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
`;

const toTelHref = (phone: string) =>
  `tel:${phone.replace(/\(0\)/, "").replace(/[^\d+]/g, "")}`;

export default function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <ConfigProvider theme={footerTheme}>
      {/* antd scopes Layout tokens to .ant-layout, so Footer needs this parent */}
      <Layout>
        <Layout.Footer>
          <Container>
            <Row gutter={[48, 40]}>
              <Col xs={24} lg={6}>
                <Link href="/" aria-label="Kora Traders home">
                  <Image
                    src="/images/logo/kora-logo2.webp"
                    alt="Kora Traders"
                    width={547}
                    height={244}
                    sizes="110px"
                    style={{ width: 110, height: "auto" }}
                  />
                </Link>
                <Slogan>Connect. Trade. Grow.</Slogan>
                <Paragraph type="secondary" style={{ maxWidth: 340 }}>
                  Kora Traders is a Germany-based international trading company
                  sourcing, purchasing and delivering across global markets.
                </Paragraph>
                <Text type="secondary" style={{ fontSize: 12 }}>
                  Registered: Amtsgericht München
                  <br />
                  USt-IdNr / VAT: DE 348 912 045
                </Text>
              </Col>

              <Col xs={24} sm={12} lg={5}>
                <ColumnTitle>Key Commodities</ColumnTitle>
                <Flex vertical gap={12}>
                  {COMMODITIES.map((item) => (
                    <Typography.Link key={item.href} href={item.href}>
                      {item.label}
                    </Typography.Link>
                  ))}
                </Flex>
              </Col>

              <Col xs={12} sm={6} lg={4}>
                <ColumnTitle>Legal</ColumnTitle>
                <Flex vertical gap={12}>
                  {LEGAL_LINKS.map((item) => (
                    <Typography.Link key={item.href} href={item.href}>
                      {item.label}
                    </Typography.Link>
                  ))}
                </Flex>
              </Col>

              <Col xs={12} sm={6} lg={3}>
                <ColumnTitle>Reach out</ColumnTitle>
                <Flex vertical gap={12}>
                  {SOCIAL_LINKS.map((item) => (
                    <Typography.Link
                      key={item.label}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Flex gap={10} align="center">
                        {item.icon}
                        {item.label}
                      </Flex>
                    </Typography.Link>
                  ))}
                </Flex>
              </Col>

              <Col xs={24} lg={6}>
                <ColumnTitle>Global Offices</ColumnTitle>
                <Flex vertical gap={20}>
                  {OFFICES.map((office) => (
                    <Flex key={office.name} vertical gap={4}>
                      <Text strong style={{ color: colors.white }}>
                        {office.name}
                      </Text>
                      <Text type="secondary">{office.address}</Text>
                      <Text type="secondary">
                        Tel:{" "}
                        <Typography.Link href={toTelHref(office.phone)}>
                          {office.phone}
                        </Typography.Link>
                      </Text>
                    </Flex>
                  ))}
                </Flex>
              </Col>
            </Row>

            <Divider style={{ margin: "56px 0 24px" }} />

            <Flex justify="space-between" align="center" gap={16} wrap>
              <Text type="secondary">
                Copyright © {new Date().getFullYear()} Kora Traders. All rights
                reserved.
              </Text>
              <Button
                shape="round"
                icon={<ArrowUpOutlined />}
                iconPlacement="end"
                onClick={scrollToTop}
              >
                Back to top
              </Button>
            </Flex>
          </Container>
        </Layout.Footer>
      </Layout>
    </ConfigProvider>
  );
}
