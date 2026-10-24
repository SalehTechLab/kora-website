"use client";

import { useRef } from "react";
import styled from "styled-components";
import { Button, Col, Divider, Flex, Row, Tag, Typography } from "antd";
import { ArrowRightOutlined, CheckOutlined } from "@ant-design/icons";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { colors } from "@/theme/themeConfig";
import { Container, Headline, SERIF, useReveal } from "@/components/about/shared";
import CatalogueCover from "./CatalogueCover";
import { SHOP_URL, type Product } from "./productData";

const { Paragraph, Text } = Typography;

const Section = styled.section<{ $tint: boolean }>`
  position: relative;
  overflow: hidden;
  scroll-margin-top: 128px;
  padding: 120px 0;
  background: ${({ $tint }) => ($tint ? colors.softWhite : colors.white)};

  @media (max-width: 767px) {
    padding: 72px 0;
  }
`;

const CoverCol = styled(motion.div)`
  position: relative;
  width: min(100%, 420px);
  margin-inline: auto;

  @media (max-width: 767px) {
    padding-right: 4%;
  }
`;

const Supplies = styled.ul`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 12px 24px;
  margin: 28px 0 24px;
  list-style: none;

  li {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 14.5px;
    line-height: 1.4;
    color: ${colors.darkSlate};
  }

  .anticon {
    margin-top: 3px;
    font-size: 11px;
    color: ${colors.crimson};
  }

  @media (max-width: 479px) {
    grid-template-columns: minmax(0, 1fr);
  }
`;

type ProductSpreadProps = { product: Product; index: number };

export default function ProductSpread({ product, index }: ProductSpreadProps) {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const reveal = useReveal();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const coverY = useTransform(scrollYProgress, [0, 1], reduceMotion ? [0, 0] : [36, -36]);


  return (
    <Section
      ref={ref}
      id={product.id}
      $tint={index % 2 === 1}
      aria-labelledby={`${product.id}-heading`}
    >
      <Container>
        <Row gutter={[64, 56]} align="middle">
          <Col xs={{ span: 24, order: 2 }} lg={{ span: 12, order: 1 }}>
            <motion.div {...reveal(0)}>
              <Headline level={2} id={`${product.id}-heading`}>
                {product.name}
              </Headline>
              <Text
                style={{
                  display: "block",
                  marginTop: 14,
                  fontFamily: SERIF,
                  fontSize: "clamp(1.05rem, 1rem + 0.4vw, 1.3rem)",
                  fontStyle: "italic",
                  color: colors.crimson,
                }}
              >
                {product.tagline}
              </Text>
            </motion.div>

            <motion.div {...reveal(0.1)}>
              <Paragraph
                style={{
                  maxWidth: 540,
                  margin: 0,
                  fontSize: "clamp(0.95rem, 0.9rem + 0.3vw, 1.0625rem)",
                  lineHeight: 1.7,
                }}
              >
                {product.description}
              </Paragraph>

              <Supplies aria-label={`${product.name} we supply`}>
                {product.supplies.map((item) => (
                  <li key={item}>
                    <CheckOutlined />
                    {item}
                  </li>
                ))}
              </Supplies>

              <Flex gap={8} wrap align="center">
                <Text type="secondary" style={{ fontSize: 12, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  Buy it as
                </Text>
                {product.models.map((model) => (
                  <Tag key={model} variant="outlined" style={{ margin: 0, borderRadius: 999 }}>
                    {model}
                  </Tag>
                ))}
              </Flex>

              <Divider style={{ margin: "32px 0 28px" }} />

              <Flex gap={12} wrap align="center">
                <Button
                  type="primary"
                  size="large"
                  href={SHOP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View products from our shop
                  <ArrowRightOutlined />
                </Button>
                <Button
                  size="large"
                  href={product.catalogue}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View catalogue
                </Button>
              </Flex>
            </motion.div>
          </Col>

          <Col xs={{ span: 24, order: 1 }} lg={{ span: 12, order: 2 }}>
            <CoverCol
              style={{ y: coverY }}
              initial={reduceMotion ? false : { opacity: 0, scale: 0.9, rotate: -4 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.div
                animate={reduceMotion ? undefined : { y: [0, -10, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              >
                <CatalogueCover product={product} index={index} />
              </motion.div>
            </CoverCol>
          </Col>
        </Row>
      </Container>
    </Section>
  );
}
