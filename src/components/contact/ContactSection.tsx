"use client";

import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  App,
  Button,
  Checkbox,
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
import {
  ArrowRightOutlined,
  CheckOutlined,
  MailOutlined,
  PhoneOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { colors } from "@/theme/themeConfig";
import { Container, Eyebrow, SERIF, ease, useReveal } from "@/components/about/shared";
import { WHATSAPP_URL } from "@/components/layout/WhatsAppFloat";
import { submitQuoteRequest, type QuoteRequest } from "@/app/contact-us/actions";
import LiveTime from "./OfficeClock";

const { Title, Paragraph, Text } = Typography;

const EMAIL = "info@koratraders.com";

const CHANNELS = [
  {
    key: "whatsapp",
    icon: <WhatsAppOutlined />,
    label: "WhatsApp",
    value: "Chat with our team",
    note: "Quickest for a first question",
    href: WHATSAPP_URL,
    external: true,
  },
  {
    key: "email",
    icon: <MailOutlined />,
    label: "Email",
    value: EMAIL,
    note: "Send specs, lists and documents",
    href: `mailto:${EMAIL}`,
  },
  {
    key: "phone",
    icon: <PhoneOutlined />,
    label: "Call Munich HQ",
    value: "+49 176 68257323",
    note: "Speak to a person directly",
    href: "tel:+4917668257323",
  },
];

const OFFICES = [
  {
    name: "Germany",
    role: "Headquarters",
    address: ["Franz-Wolter-Straße", "81925 Munich"],
    phone: "+49 176 68257323",
    timeZone: "Europe/Berlin",
  },
  {
    name: "Pakistan",
    role: "Regional Office",
    address: ["Lahore"],
    phone: "+92 321 6491547",
    timeZone: "Asia/Karachi",
  },
];

const INTERESTS = [
  "Buying Products",
  "Supplying / Selling Products",
  "Product Sourcing & Procurement",
  "Logistics & Shipping",
  "Business Partnership",
  "Other Inquiry",
].map((label) => ({ label, value: label }));

const muted = "rgba(36, 44, 56, 0.75)";

// Squared-off form controls to match the quote panel
const formTheme: ThemeConfig = {
  token: {
    colorBgContainer: colors.white,
    borderRadius: 2,
    controlHeight: 42,
  },
  components: {
    Form: {
      labelFontSize: 12,
      labelColor: colors.softWhite,
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

const Section = styled.section`
  position: relative;
`;

/* ---------- channel cards (overlap the hero edge) ---------- */

const Channels = styled.div`
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: -64px;

  @media (max-width: 899px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 12px;
    margin-top: -56px;
  }
`;

const ChannelCard = styled(motion.a)`
  position: relative;
  display: flex;
  align-items: center;
  gap: 18px;
  overflow: hidden;
  padding: 24px 24px 24px 22px;
  background: ${colors.white};
  border: 1px solid rgba(140, 155, 176, 0.35);
  border-bottom: 3px solid transparent;
  box-shadow: 0 24px 48px -28px rgba(16, 41, 78, 0.45);
  color: ${colors.darkSlate};
  transition:
    border-color 0.3s ease,
    background 0.3s ease;
  outline-offset: 3px;

  &::after {
    content: "";
    position: absolute;
    inset: auto 0 0 0;
    height: 3px;
    background: ${colors.crimson};
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover::after,
  &:focus-visible::after {
    transform: scaleX(1);
  }

  .icon {
    flex: none;
    display: grid;
    place-items: center;
    width: 48px;
    height: 48px;
    font-size: 20px;
    background: ${colors.deepNavy};
    color: ${colors.softWhite};
    transition:
      background 0.3s ease,
      transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
  }

  &:hover .icon,
  &:focus-visible .icon {
    background: ${colors.crimson};
    transform: rotate(-8deg) scale(1.06);
  }

  .label {
    display: block;
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${colors.crimson};
  }

  .value {
    display: block;
    margin-top: 3px;
    font-family: ${SERIF};
    font-size: 18px;
    font-weight: 700;
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${colors.deepNavy};
    overflow-wrap: anywhere;
  }

  .note {
    display: block;
    margin-top: 4px;
    font-size: 13px;
    color: ${muted};
  }

  .arrow {
    margin-left: auto;
    flex: none;
    color: ${colors.steelGray};
    transition:
      transform 0.35s cubic-bezier(0.22, 1, 0.36, 1),
      color 0.3s ease;
  }

  &:hover .arrow,
  &:focus-visible .arrow {
    color: ${colors.crimson};
    transform: translateX(6px);
  }
`;

/* ---------- main two-column band ---------- */

const Band = styled.div`
  padding: 96px 0 112px;

  @media (max-width: 767px) {
    padding: 64px 0 72px;
  }
`;

// &&& beats antd's sibling margin rule (e.g. span + h2.ant-typography)
const SerifTitle = styled(Title)`
  &&& {
    font-family: ${SERIF};
    margin-top: 0;
  }
`;

const OfficeCard = styled(motion.div)`
  display: grid;
  grid-template-columns: minmax(0, 1fr) auto;
  gap: 4px 16px;
  padding: 20px 22px;
  background: ${colors.white};
  border: 1px solid rgba(140, 155, 176, 0.35);
  border-left: 3px solid ${colors.crimson};

  .clock {
    grid-row: 1 / span 2;
    grid-column: 2;
    align-self: center;
    text-align: right;
  }

  .clock time {
    display: block;
    font-family: ${SERIF};
    font-size: 30px;
    font-weight: 700;
    font-variant-numeric: tabular-nums;
    line-height: 1;
    color: ${colors.deepNavy};
  }

  .clock span {
    display: block;
    margin-top: 6px;
    font-size: 10px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    color: ${colors.steelGray};
  }
`;

/* ---------- quote panel ---------- */

const QuotePanel = styled.div`
  scroll-margin-top: 96px;
  background: ${colors.deepNavy};
  border: 1px solid ${colors.deepNavy};
  border-top: 4px solid ${colors.crimson};
  padding: 40px 44px;

  @media (max-width: 575px) {
    padding: 28px 20px;
  }

  .ant-form-item-label > label {
    font-weight: 600;
  }

  .ant-checkbox-wrapper {
    color: ${colors.softWhite};
    font-size: 13px;
  }

  .ant-checkbox-wrapper a {
    color: ${colors.white};
  }

  .ant-form-item-explain-error {
    color: ${colors.softWhite};
  }
`;

const Sent = styled(motion.div)`
  display: grid;
  justify-items: start;
  gap: 8px;
  padding: 24px 0;
  min-height: 420px;
  align-content: center;

  .tick {
    display: grid;
    place-items: center;
    width: 64px;
    height: 64px;
    margin-bottom: 16px;
    border-radius: 50%;
    background: ${colors.crimson};
    color: ${colors.white};
    font-size: 26px;
  }
`;

const toTelHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

export default function ContactSection() {
  const [form] = Form.useForm<QuoteRequest>();
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const { message } = App.useApp();
  const reveal = useReveal();
  const reduceMotion = useReducedMotion();

  // Prefill from the Products page: /contact-us?product=Industrial%20valves
  useEffect(() => {
    const product = new URLSearchParams(window.location.search)
      .get("product")
      ?.trim();
    if (!product) return;
    form.setFieldsValue({
      interest: "Product Sourcing & Procurement",
      message: `I'm looking for: ${product.slice(0, 200)}\n\nQuantity / specs / destination: `,
    });
  }, [form]);

  const onFinish = async (values: QuoteRequest) => {
    setSubmitting(true);
    try {
      const result = await submitQuoteRequest(values);
      if (result.ok) {
        form.resetFields();
        setSent(true);
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
    <Section aria-labelledby="get-in-touch-heading">
      <Container>
        <Channels>
          {CHANNELS.map((channel, i) => (
            <ChannelCard
              key={channel.key}
              href={channel.href}
              {...(channel.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              {...reveal(0.1 * i)}
              whileHover={reduceMotion ? undefined : { y: -6 }}
            >
              <span className="icon" aria-hidden="true">
                {channel.icon}
              </span>
              <span>
                <span className="label">{channel.label}</span>
                <span className="value">{channel.value}</span>
                <span className="note">{channel.note}</span>
              </span>
              <ArrowRightOutlined className="arrow" aria-hidden="true" />
            </ChannelCard>
          ))}
        </Channels>

        <Band>
          <Row gutter={[64, 56]}>
            <Col xs={24} lg={10}>
              <motion.div {...reveal(0)}>
                <Eyebrow>Get in touch</Eyebrow>
                <SerifTitle
                  id="get-in-touch-heading"
                  level={2}
                  style={{
                    fontSize: "clamp(1.9rem, 3.4vw, 2.6rem)",
                    lineHeight: 1.12,
                    letterSpacing: "-0.02em",
                    marginBottom: 16,
                  }}
                >
                  The sooner you start, the sooner it ships.
                </SerifTitle>
                <Paragraph
                  style={{ color: muted, lineHeight: 1.7, maxWidth: 440 }}
                >
                  Reach us directly, or send a request through the form and we
                  will route it to the right team.
                </Paragraph>
              </motion.div>

              <Flex vertical gap={14} style={{ marginTop: 32 }}>
                {OFFICES.map((office, i) => (
                  <OfficeCard key={office.name} {...reveal(0.08 * i)}>
                    <div>
                      <Text
                        style={{
                          display: "block",
                          fontSize: 11,
                          fontWeight: 600,
                          letterSpacing: "0.14em",
                          textTransform: "uppercase",
                          color: colors.crimson,
                        }}
                      >
                        {office.role}
                      </Text>
                      <SerifTitle
                        level={4}
                        style={{ margin: "2px 0 8px", fontSize: 20 }}
                      >
                        {office.name}
                      </SerifTitle>
                      <Flex vertical gap={2}>
                        {office.address.map((line) => (
                          <Text
                            key={line}
                            style={{ color: muted, fontSize: 13 }}
                          >
                            {line}
                          </Text>
                        ))}
                        <Typography.Link
                          href={toTelHref(office.phone)}
                          strong
                          style={{ fontSize: 13, marginTop: 6 }}
                        >
                          {office.phone}
                        </Typography.Link>
                      </Flex>
                    </div>
                    <div className="clock">
                      <LiveTime timeZone={office.timeZone} />
                      <span>Local time</span>
                    </div>
                  </OfficeCard>
                ))}
              </Flex>
            </Col>

            <Col xs={24} lg={14}>
              <ConfigProvider theme={formTheme}>
                <motion.div {...reveal(0.1)}>
                  <QuotePanel id="quote">
                    <AnimatePresence mode="wait" initial={false}>
                      {sent ? (
                        <Sent
                          key="sent"
                          role="status"
                          initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.7, ease }}
                        >
                          <motion.span
                            className="tick"
                            initial={reduceMotion ? false : { scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{
                              type: "spring",
                              stiffness: 260,
                              damping: 16,
                              delay: 0.2,
                            }}
                          >
                            <CheckOutlined />
                          </motion.span>
                          <SerifTitle
                            level={3}
                            style={{ color: colors.softWhite, margin: 0 }}
                          >
                            Request received.
                          </SerifTitle>
                          <Paragraph
                            style={{
                              maxWidth: 420,
                              color: "rgba(244, 246, 249, 0.82)",
                              lineHeight: 1.65,
                            }}
                          >
                            Thank you. Our team has your brief and will be in
                            touch with a straight answer. Need it sooner? Reach
                            us on WhatsApp.
                          </Paragraph>
                          <Flex gap={12} wrap style={{ marginTop: 8 }}>
                            <Button
                              type="primary"
                              icon={<WhatsAppOutlined />}
                              href={WHATSAPP_URL}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              Chat on WhatsApp
                            </Button>
                            <Button
                              ghost
                              style={{
                                color: colors.softWhite,
                                borderColor: "rgba(244, 246, 249, 0.36)",
                              }}
                              onClick={() => setSent(false)}
                            >
                              Send another request
                            </Button>
                          </Flex>
                        </Sent>
                      ) : (
                        <motion.div
                          key="form"
                          initial={reduceMotion ? false : { opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <SerifTitle
                            level={4}
                            style={{ marginBottom: 24, color: colors.softWhite }}
                          >
                            Request a Quote
                          </SerifTitle>
                          <Paragraph
                            style={{
                              color: colors.softWhite,
                              marginTop: -12,
                              marginBottom: 24,
                            }}
                          >
                            Tell us what you&apos;re looking for, and our team
                            will get back to you.
                          </Paragraph>
                          <Form
                            form={form}
                            layout="vertical"
                            requiredMark={(label, { required }) => (
                              <>
                                {label}
                                {required && (
                                  <span
                                    aria-hidden="true"
                                    style={{
                                      marginLeft: 4,
                                      color: colors.crimson,
                                    }}
                                  >
                                    *
                                  </span>
                                )}
                              </>
                            )}
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
                                  <Input
                                    autoComplete="name"
                                    placeholder="Your full name"
                                  />
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={12}>
                                <Form.Item
                                  name="company"
                                  label="Company Name"
                                >
                                  <Input
                                    autoComplete="organization"
                                    placeholder="Your company"
                                  />
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={12}>
                                <Form.Item
                                  name="email"
                                  label="Business Email"
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
                                  <Input
                                    type="email"
                                    autoComplete="email"
                                    placeholder="name@company.com"
                                  />
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={12}>
                                <Form.Item
                                  name="phone"
                                  label="Phone / WhatsApp"
                                  rules={[
                                    {
                                      required: true,
                                      whitespace: true,
                                      message:
                                        "Please enter your phone or WhatsApp number",
                                    },
                                  ]}
                                >
                                  <Input
                                    type="tel"
                                    autoComplete="tel"
                                    placeholder="+49 ..."
                                  />
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={12}>
                                <Form.Item
                                  name="country"
                                  label="Country"
                                  rules={[
                                    {
                                      required: true,
                                      whitespace: true,
                                      message: "Please enter your country",
                                    },
                                  ]}
                                >
                                  <Input
                                    autoComplete="country-name"
                                    placeholder="Your country"
                                  />
                                </Form.Item>
                              </Col>
                              <Col xs={24} sm={12}>
                                <Form.Item
                                  name="interest"
                                  label="I'm Interested In"
                                  rules={[
                                    {
                                      required: true,
                                      message:
                                        "Please select what you are interested in",
                                    },
                                  ]}
                                >
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
                                    placeholder="Tell us about the product, quantity, destination, specifications, or your business requirements..."
                                  />
                                </Form.Item>
                              </Col>
                              <Col span={24}>
                                <Form.Item
                                  name="consent"
                                  valuePropName="checked"
                                  rules={[
                                    {
                                      validator: (_, checked) =>
                                        checked
                                          ? Promise.resolve()
                                          : Promise.reject(
                                              new Error(
                                                "Please accept the Privacy Policy",
                                              ),
                                            ),
                                    },
                                  ]}
                                >
                                  <Checkbox>
                                    I agree to the processing of my
                                    information in accordance with the{" "}
                                    <Typography.Link
                                      href="/privacy-policy"
                                      target="_blank"
                                      underline
                                    >
                                      Privacy Policy
                                    </Typography.Link>
                                    .
                                    <span
                                      aria-hidden="true"
                                      style={{
                                        marginLeft: 4,
                                        color: colors.crimson,
                                      }}
                                    >
                                      *
                                    </span>
                                  </Checkbox>
                                </Form.Item>
                              </Col>
                            </Row>
                            <Button
                              type="primary"
                              htmlType="submit"
                              loading={submitting}
                            >
                              Submit Inquiry
                            </Button>
                          </Form>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </QuotePanel>
                </motion.div>
              </ConfigProvider>
            </Col>
          </Row>
        </Band>
      </Container>
    </Section>
  );
}
