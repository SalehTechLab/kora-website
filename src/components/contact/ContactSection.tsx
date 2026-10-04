"use client";

import { useState } from "react";
import styled from "styled-components";
import {
  App,
  Button,
  Col,
  ConfigProvider,
  Flex,
  Form,
  Input,
  Row,
  Select,
  Typography,
  type ThemeConfig,
} from "antd";
import { colors } from "@/theme/themeConfig";
import { submitQuoteRequest, type QuoteRequest } from "@/app/contact/actions";

const { Title, Paragraph, Text } = Typography;

const OFFICES = [
  {
    name: "Germany (Headquarters)",
    city: "Munich, Germany",
    email: "info@koratraders.com",
    phone: "+49 176 68257323",
  },
  {
    name: "Pakistan (Regional Office)",
    city: "Lahore, Pakistan",
    email: "info@koratraders.com",
  },
];

const INTERESTS = [
  "Product sourcing",
  "Procurement",
  "Logistics & freight",
  "Partnership",
  "Other",
].map((label) => ({ label, value: label }));

const muted = "#5b6577";

// Squared-off form controls to match the quote panel
const formTheme: ThemeConfig = {
  token: {
    borderRadius: 2,
    controlHeight: 42,
  },
  components: {
    Form: {
      labelFontSize: 12,
      labelColor: colors.navy,
      verticalLabelPadding: "0 0 6px",
      itemMarginBottom: 18,
    },
    Button: {
      borderRadius: 2,
      controlHeight: 42,
      paddingInline: 22,
      primaryShadow: "none",
    },
  },
};

const Container = styled.div`
  max-width: 1240px;
  margin: 0 auto;
  padding: 104px 32px;

  @media (max-width: 767px) {
    padding: 64px 20px;
  }
`;

const Eyebrow = styled(Text)`
  && {
    display: block;
    margin-bottom: 10px;
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${colors.burgundy};
  }
`;

// &&& beats antd's sibling margin rule (e.g. span + h2.ant-typography)
const SerifTitle = styled(Title)`
  &&& {
    font-family: var(--font-serif), Georgia, serif;
    margin-top: 0;
  }
`;

const Office = styled.div`
  padding-left: 16px;
  border-left: 2px solid ${colors.burgundy};
`;

const QuotePanel = styled.div`
  background: #e9eef3;
  border: 1px solid ${colors.blueGray};
  padding: 40px 44px;

  @media (max-width: 575px) {
    padding: 28px 20px;
  }

  .ant-form-item-label > label {
    font-weight: 600;
  }
`;

const toTelHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export default function ContactSection() {
  const [form] = Form.useForm<QuoteRequest>();
  const [submitting, setSubmitting] = useState(false);
  const { message } = App.useApp();

  const onFinish = async (values: QuoteRequest) => {
    setSubmitting(true);
    try {
      const result = await submitQuoteRequest(values);
      if (result.ok) {
        message.success(
          "Thanks, we received your request and will be in touch.",
        );
        form.resetFields();
      } else {
        message.error(result.error);
      }
    } catch {
      message.error("Something went wrong. Please try again or email us.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section aria-labelledby="get-in-touch-heading">
      <Container>
        <Row gutter={[64, 48]}>
          <Col xs={24} lg={10}>
            <Eyebrow>Get in touch</Eyebrow>
            <SerifTitle
              id="get-in-touch-heading"
              level={2}
              style={{
                fontSize: "clamp(1.75rem, 3vw, 2.25rem)",
                lineHeight: 1.2,
              }}
            >
              Two offices, one point of contact.
            </SerifTitle>
            <Paragraph style={{ color: muted, lineHeight: 1.7, maxWidth: 420 }}>
              Reach us directly, or send a request through the form and we will
              route it to the right team.
            </Paragraph>

            <Flex vertical gap={28} style={{ marginTop: 40 }}>
              {OFFICES.map((office) => (
                <Office key={office.name}>
                  <SerifTitle level={5} style={{ marginBottom: 4 }}>
                    {office.name}
                  </SerifTitle>
                  <Flex vertical gap={2}>
                    <Text style={{ color: muted, fontSize: 13 }}>
                      {office.city}
                    </Text>
                    <Typography.Link
                      href={`mailto:${office.email}`}
                      strong
                      style={{ fontSize: 13, marginTop: 6 }}
                    >
                      {office.email}
                    </Typography.Link>
                    {office.phone && (
                      <Typography.Link
                        href={toTelHref(office.phone)}
                        strong
                        style={{ fontSize: 13 }}
                      >
                        {office.phone}
                      </Typography.Link>
                    )}
                  </Flex>
                </Office>
              ))}
            </Flex>
          </Col>

          <Col xs={24} lg={14}>
            <ConfigProvider theme={formTheme}>
              <QuotePanel>
                <SerifTitle level={4} style={{ marginBottom: 24 }}>
                  Request a Quote
                </SerifTitle>
                <Form
                  form={form}
                  layout="vertical"
                  requiredMark={false}
                  onFinish={onFinish}
                  disabled={submitting}
                >
                  <Row gutter={16}>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="fullName"
                        label="Full Name"
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please enter your name",
                          },
                        ]}
                      >
                        <Input autoComplete="name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name="company" label="Company">
                        <Input autoComplete="organization" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item
                        name="email"
                        label="Email"
                        rules={[
                          {
                            required: true,
                            message: "Please enter your email",
                          },
                          {
                            type: "email",
                            message: "Please enter a valid email",
                          },
                        ]}
                      >
                        <Input type="email" autoComplete="email" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name="phone" label="Phone">
                        <Input type="tel" autoComplete="tel" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name="country" label="Country">
                        <Input autoComplete="country-name" />
                      </Form.Item>
                    </Col>
                    <Col xs={24} sm={12}>
                      <Form.Item name="interest" label="I'm interested in">
                        <Select
                          placeholder="Please select"
                          options={INTERESTS}
                        />
                      </Form.Item>
                    </Col>
                    <Col span={24}>
                      <Form.Item
                        name="message"
                        label="Message"
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: "Please tell us what you need",
                          },
                        ]}
                      >
                        <Input.TextArea
                          rows={4}
                          placeholder="Tell us what you need to source, buy or move."
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                  <Button type="primary" htmlType="submit" loading={submitting}>
                    Send Request
                  </Button>
                </Form>
              </QuotePanel>
            </ConfigProvider>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
