"use client";

import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, LoaderCircle, Mail, Phone } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Button, Container, Eyebrow } from "@/components/ui";
import { WhatsAppIcon } from "@/components/icons/BrandIcons";
import { cn } from "@/lib/cn";
import { ease, useReveal } from "@/lib/motion";
import { WHATSAPP_URL } from "@/components/layout/WhatsAppFloat";
import { submitQuoteRequest, type QuoteRequest } from "@/app/contact-us/actions";
import LiveTime from "./OfficeClock";
import { INTERESTS } from "./interests";

const EMAIL = "info@koratraders.com";
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const CHANNELS = [
  {
    key: "whatsapp",
    icon: <WhatsAppIcon className="size-5" />,
    label: "WhatsApp",
    value: "Chat with our team",
    note: "Quickest for a first question",
    href: WHATSAPP_URL,
    external: true,
  },
  {
    key: "email",
    icon: <Mail className="size-5" />,
    label: "Email",
    value: EMAIL,
    note: "Send specs, lists and documents",
    href: `mailto:${EMAIL}`,
  },
  {
    key: "phone",
    icon: <Phone className="size-5" />,
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

const toTelHref = (phone: string) => `tel:${phone.replace(/[^\d+]/g, "")}`;

/* ---------- form state + validation ---------- */

type Values = Omit<QuoteRequest, "website" | "startedAt">;
type Errors = Partial<Record<keyof Values, string>>;

const EMPTY: Values = {
  fullName: "",
  company: "",
  email: "",
  phone: "",
  country: "",
  interest: "",
  message: "",
  consent: false,
};

const FIELD_ORDER: (keyof Values)[] = [
  "fullName",
  "company",
  "email",
  "phone",
  "country",
  "interest",
  "message",
  "consent",
];

function validate(name: keyof Values, values: Values): string | undefined {
  switch (name) {
    case "fullName":
      return values.fullName.trim() ? undefined : "Please enter your name";
    case "email":
      if (!values.email.trim()) return "Please enter your email";
      return EMAIL_PATTERN.test(values.email.trim())
        ? undefined
        : "Please enter a valid email";
    case "interest":
      return values.interest ? undefined : "Please select what you are interested in";
    case "message":
      return values.message.trim() ? undefined : "Please tell us what you need";
    case "consent":
      return values.consent
        ? undefined
        : "Please confirm you have read the Privacy Policy";
    default:
      return undefined;
  }
}

/* ---------- form controls ---------- */

const control =
  "w-full rounded-xs border bg-white px-3 text-sm text-ink placeholder:text-steel-text disabled:cursor-not-allowed disabled:opacity-60";

const Required = () => (
  <span aria-hidden="true" className="ml-1 text-crimson">
    *
  </span>
);

function Field({
  id,
  label,
  required,
  error,
  className,
  children,
}: {
  id: string;
  label: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="block pb-1.5 text-xs font-semibold text-snow">
        {label}
        {required && <Required />}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1 text-sm text-snow">
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactSection() {
  const baseId = useId();
  const [values, setValues] = useState<Values>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const shownAt = useRef(0);
  const reveal = useReveal();
  const reduceMotion = useReducedMotion();

  const idOf = (name: keyof Values) => `${baseId}-${name}`;

  // Bot check: the server rejects submissions made seconds after the form appears
  useEffect(() => {
    shownAt.current = Date.now();
  }, [sent]);

  // Prefill from the Products page: /contact-us?product=Industrial%20valves
  useEffect(() => {
    const product = new URLSearchParams(window.location.search)
      .get("product")
      ?.trim();
    if (!product) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- reads window.location, unavailable during SSR
    setValues((v) => ({
      ...v,
      interest: "Product Sourcing & Procurement",
      message: `I'm looking for: ${product.slice(0, 200)}\n\nQuantity / specs / destination: `,
    }));
  }, []);

  const setField = <K extends keyof Values>(name: K, value: Values[K]) => {
    const next = { ...values, [name]: value };
    setValues(next);
    // Once a field has shown an error, re-check it as the user types
    if (errors[name]) setErrors((e) => ({ ...e, [name]: validate(name, next) }));
  };

  const blurField = (name: keyof Values) =>
    setErrors((e) => ({ ...e, [name]: validate(name, values) }));

  const aria = (name: keyof Values, required = false) => ({
    id: idOf(name),
    name,
    "aria-required": required || undefined,
    "aria-invalid": errors[name] ? (true as const) : undefined,
    "aria-describedby": errors[name] ? `${idOf(name)}-error` : undefined,
  });

  const fieldClass = (name: keyof Values) =>
    cn(control, errors[name] ? "border-crimson" : "border-steel/60");

  const onSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (submitting) return;

    const nextErrors: Errors = {};
    for (const name of FIELD_ORDER) {
      const message = validate(name, values);
      if (message) nextErrors[name] = message;
    }
    setErrors(nextErrors);
    const firstInvalid = FIELD_ORDER.find((name) => nextErrors[name]);
    if (firstInvalid) {
      formRef.current
        ?.querySelector<HTMLElement>(`#${CSS.escape(idOf(firstInvalid))}`)
        ?.focus();
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const result = await submitQuoteRequest({
        ...values,
        website: new FormData(formRef.current ?? undefined).get("website")?.toString(),
        startedAt: shownAt.current,
      });
      if (result.ok) {
        setValues(EMPTY);
        setErrors({});
        setSent(true);
      } else {
        setSubmitError(result.error);
      }
    } catch {
      setSubmitError("Something went wrong. Please try again or email us.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section aria-labelledby="get-in-touch-heading" className="relative">
      <Container>
        {/* channel cards (overlap the hero edge) */}
        <div className="relative z-2 -mt-14 grid grid-cols-1 gap-3 md:-mt-16 md:grid-cols-3 md:gap-5">
          {CHANNELS.map((channel, i) => (
            <motion.a
              key={channel.key}
              href={channel.href}
              {...(channel.external
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              {...reveal(0.1 * i)}
              whileHover={reduceMotion ? undefined : { y: -6 }}
              className="group relative flex items-center gap-4.5 overflow-hidden border border-b-3 border-steel/35 border-b-transparent bg-white p-6 pl-5.5 text-ink shadow-[0_24px_48px_-28px_color-mix(in_srgb,var(--color-navy)_45%,transparent)] transition-[border-color,background-color] duration-300 after:absolute after:inset-x-0 after:bottom-0 after:h-[3px] after:origin-left after:scale-x-0 after:bg-crimson after:transition-transform after:duration-500 after:ease-expo hover:after:scale-x-100 focus-visible:after:scale-x-100"
            >
              <span
                aria-hidden="true"
                className="grid size-12 flex-none place-items-center bg-navy text-snow transition-[background-color,transform] duration-500 ease-expo group-hover:-rotate-8 group-hover:scale-106 group-hover:bg-crimson group-focus-visible:-rotate-8 group-focus-visible:scale-106 group-focus-visible:bg-crimson"
              >
                {channel.icon}
              </span>
              <span>
                <span className="block text-micro font-semibold tracking-eyebrow text-crimson uppercase">
                  {channel.label}
                </span>
                <span className="mt-[3px] block font-serif text-lg leading-[1.2] font-bold tracking-heading [overflow-wrap:anywhere] text-navy">
                  {channel.value}
                </span>
                <span className="mt-1 block text-caption text-ink/75">{channel.note}</span>
              </span>
              <ArrowRight
                aria-hidden="true"
                className="ml-auto size-4 flex-none text-steel transition-[transform,color] duration-350 ease-expo group-hover:translate-x-1.5 group-hover:text-crimson group-focus-visible:translate-x-1.5 group-focus-visible:text-crimson"
              />
            </motion.a>
          ))}
        </div>

        {/* main two-column band */}
        <div className="grid gap-x-16 gap-y-14 pt-16 pb-18 md:pt-24 md:pb-28 lg:grid-cols-[10fr_14fr]">
          <div className="min-w-0">
            <motion.div {...reveal(0)}>
              <Eyebrow>Get in touch</Eyebrow>
              <h2
                id="get-in-touch-heading"
                className="mb-4 font-serif text-[clamp(1.9rem,3.4vw,2.6rem)] leading-[1.12] font-semibold tracking-heading"
              >
                The sooner you start, the sooner it ships.
              </h2>
              <p className="max-w-110 leading-body text-ink/75">
                Reach us directly, or send a request through the form and we will
                route it to the right team.
              </p>
            </motion.div>

            <div className="mt-8 flex flex-col gap-3.5">
              {OFFICES.map((office, i) => (
                <motion.div
                  key={office.name}
                  {...reveal(0.08 * i)}
                  className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-1 border border-l-3 border-steel/35 border-l-crimson bg-white px-5.5 py-5"
                >
                  <div>
                    <span className="block text-micro font-semibold tracking-eyebrow text-crimson uppercase">
                      {office.role}
                    </span>
                    <h3 className="mt-0.5 mb-2 font-serif text-xl font-semibold">
                      {office.name}
                    </h3>
                    <div className="flex flex-col gap-0.5">
                      {office.address.map((line) => (
                        <span key={line} className="text-caption text-ink/75">
                          {line}
                        </span>
                      ))}
                      <a
                        href={toTelHref(office.phone)}
                        className="mt-1.5 text-caption font-semibold text-navy transition-colors hover:text-crimson"
                      >
                        {office.phone}
                      </a>
                    </div>
                  </div>
                  <div className="col-start-2 row-span-2 row-start-1 self-center text-right">
                    <span className="block font-serif text-[30px] leading-none font-bold text-navy tabular-nums">
                      <LiveTime timeZone={office.timeZone} />
                    </span>
                    <span className="mt-1.5 block text-micro tracking-eyebrow text-steel-text uppercase">
                      Local time
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <motion.div {...reveal(0.1)} className="min-w-0">
            <div
              id="quote"
              className="on-dark scroll-mt-24 border border-t-4 border-navy border-t-crimson bg-navy px-5 py-7 text-snow sm:px-11 sm:py-10"
            >
              <AnimatePresence mode="wait" initial={false}>
                {sent ? (
                  <motion.div
                    key="sent"
                    role="status"
                    initial={reduceMotion ? false : { opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease }}
                    className="grid min-h-105 content-center justify-items-start gap-2 py-6"
                  >
                    <motion.span
                      className="mb-4 grid size-16 place-items-center rounded-full bg-crimson text-white"
                      initial={reduceMotion ? false : { scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 16,
                        delay: 0.2,
                      }}
                    >
                      <Check className="size-6.5" aria-hidden="true" />
                    </motion.span>
                    <h3 className="font-serif text-title font-semibold text-snow">
                      Request received.
                    </h3>
                    <p className="max-w-105 leading-body text-snow/80">
                      Thank you. Our team has your brief and will be in touch with
                      a straight answer. Need it sooner? Reach us on WhatsApp.
                    </p>
                    <div className="mt-2 flex flex-wrap gap-3">
                      <Button
                        href={WHATSAPP_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:border-white hover:bg-white hover:text-navy"
                      >
                        <WhatsAppIcon className="size-4" aria-hidden="true" />
                        Chat on WhatsApp
                      </Button>
                      <Button variant="outline-light" onClick={() => setSent(false)}>
                        Send another request
                      </Button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={reduceMotion ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <h3 className="mb-3 font-serif text-title font-semibold text-snow">
                      Request a Quote
                    </h3>
                    <p className="mb-6 text-snow">
                      Tell us what you&apos;re looking for, and our team will get back to
                      you.
                    </p>
                    <form
                      ref={formRef}
                      noValidate
                      onSubmit={onSubmit}
                      aria-busy={submitting || undefined}
                    >
                      {/* Honeypot: off-screen and skipped by keyboard/AT, so only bots fill it */}
                      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
                        <label>
                          Website
                          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
                        </label>
                      </div>
                      <fieldset
                        disabled={submitting}
                        className="m-0 grid min-w-0 gap-x-4 gap-y-4.5 border-0 p-0 sm:grid-cols-2"
                      >
                        <Field
                          id={idOf("fullName")}
                          label="Full Name"
                          required
                          error={errors.fullName}
                        >
                          <input
                            {...aria("fullName", true)}
                            type="text"
                            autoComplete="name"
                            placeholder="Your full name"
                            value={values.fullName}
                            onChange={(e) => setField("fullName", e.target.value)}
                            onBlur={() => blurField("fullName")}
                            className={cn(fieldClass("fullName"), "h-10.5")}
                          />
                        </Field>
                        <Field id={idOf("company")} label="Company Name (optional)">
                          <input
                            {...aria("company")}
                            type="text"
                            autoComplete="organization"
                            placeholder="Your company"
                            value={values.company}
                            onChange={(e) => setField("company", e.target.value)}
                            className={cn(fieldClass("company"), "h-10.5")}
                          />
                        </Field>
                        <Field
                          id={idOf("email")}
                          label="Business Email"
                          required
                          error={errors.email}
                        >
                          <input
                            {...aria("email", true)}
                            type="email"
                            autoComplete="email"
                            placeholder="name@company.com"
                            value={values.email}
                            onChange={(e) => setField("email", e.target.value)}
                            onBlur={() => blurField("email")}
                            className={cn(fieldClass("email"), "h-10.5")}
                          />
                        </Field>
                        <Field id={idOf("phone")} label="Phone / WhatsApp (optional)">
                          <input
                            {...aria("phone")}
                            type="tel"
                            autoComplete="tel"
                            placeholder="+49 ..."
                            value={values.phone}
                            onChange={(e) => setField("phone", e.target.value)}
                            className={cn(fieldClass("phone"), "h-10.5")}
                          />
                        </Field>
                        <Field id={idOf("country")} label="Country (optional)">
                          <input
                            {...aria("country")}
                            type="text"
                            autoComplete="country-name"
                            placeholder="Your country"
                            value={values.country}
                            onChange={(e) => setField("country", e.target.value)}
                            className={cn(fieldClass("country"), "h-10.5")}
                          />
                        </Field>
                        <Field
                          id={idOf("interest")}
                          label="I'm Interested In"
                          required
                          error={errors.interest}
                        >
                          <div className="relative">
                            <select
                              {...aria("interest", true)}
                              value={values.interest}
                              onChange={(e) => setField("interest", e.target.value)}
                              onBlur={() => blurField("interest")}
                              className={cn(
                                fieldClass("interest"),
                                "h-10.5 appearance-none pr-9",
                                !values.interest && "text-steel-text",
                              )}
                            >
                              <option value="" disabled>
                                Please select
                              </option>
                              {INTERESTS.map((label) => (
                                <option key={label} value={label} className="text-ink">
                                  {label}
                                </option>
                              ))}
                            </select>
                            <ChevronDown
                              aria-hidden="true"
                              className="pointer-events-none absolute top-1/2 right-3 size-4 -translate-y-1/2 text-steel-text"
                            />
                          </div>
                        </Field>
                        <Field
                          id={idOf("message")}
                          label="Message"
                          required
                          error={errors.message}
                          className="sm:col-span-2"
                        >
                          <textarea
                            {...aria("message", true)}
                            rows={4}
                            placeholder="Tell us about the product, quantity, destination, specifications, or your business requirements..."
                            value={values.message}
                            onChange={(e) => setField("message", e.target.value)}
                            onBlur={() => blurField("message")}
                            className={cn(fieldClass("message"), "block resize-y py-2.5")}
                          />
                        </Field>
                        <div className="sm:col-span-2">
                          <div className="flex items-start gap-2 text-caption text-snow">
                            <input
                              {...aria("consent")}
                              type="checkbox"
                              checked={values.consent}
                              onChange={(e) => setField("consent", e.target.checked)}
                              onBlur={() => blurField("consent")}
                              className="mt-0.5 size-4 flex-none cursor-pointer accent-crimson"
                            />
                            <label htmlFor={idOf("consent")} className="cursor-pointer">
                              I have read the{" "}
                              <a
                                href="/privacy-policy"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-white underline"
                              >
                                Privacy Policy
                              </a>{" "}
                              and understand that my details will be used to answer
                              this request.
                              <Required />
                            </label>
                          </div>
                          {errors.consent && (
                            <p
                              id={`${idOf("consent")}-error`}
                              role="alert"
                              className="mt-1 text-sm text-snow"
                            >
                              {errors.consent}
                            </p>
                          )}
                        </div>
                      </fieldset>

                      {submitError && (
                        <p
                          role="alert"
                          className="mt-5 border-l-4 border-crimson bg-white px-4 py-3 text-sm text-ink"
                        >
                          {submitError}
                        </p>
                      )}

                      <Button
                        type="submit"
                        disabled={submitting}
                        className="mt-6 hover:border-white hover:bg-white hover:text-navy"
                      >
                        {submitting && (
                          <LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
                        )}
                        Submit Inquiry
                      </Button>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}
