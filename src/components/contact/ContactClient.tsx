"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useLang } from "@/lib/i18n/context";

const SOCIAL_LINKS = [
  { label: "GitHub", href: "https://github.com/Teino-92" },
  { label: "LinkedIn", href: "https://linkedin.com/in/m-garbugli" },
];

type FormState = "idle" | "sending" | "sent" | "error";

function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLang();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");
    // Simulate send — replace with real API call (Resend, Formspree, etc.)
    await new Promise((r) => setTimeout(r, 1400));
    setState("sent");
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    backgroundColor: "var(--color-bg-secondary)",
    border: "1px solid var(--color-border-strong)",
    borderRadius: 0,
    padding: "14px 16px",
    fontFamily: "var(--font-mono)",
    fontSize: "13px",
    color: "var(--color-black)",
    outline: "none",
    transition: "border-color 0.2s",
    display: "block",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontFamily: "var(--font-mono)",
    fontSize: "10px",
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    color: "var(--color-gray-mid)",
    marginBottom: "6px",
  };

  return (
    <div>
      <p style={{
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        color: "var(--color-red)",
        textTransform: "uppercase",
        letterSpacing: "0.1em",
        marginBottom: "24px",
      }}>
        {t.contactPage.formLabel}
      </p>

      <AnimatePresence mode="wait">
        {state === "sent" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            style={{
              padding: "32px",
              backgroundColor: "var(--color-bg-secondary)",
              borderLeft: "3px solid #2D9B5A",
              textAlign: "center",
            }}
          >
            <p style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "24px",
              color: "var(--color-black)",
              marginBottom: "8px",
            }}>
              {t.contactPage.formSuccessTitle}
            </p>
            <p style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: "var(--color-gray-mid)",
            }}>
              {t.contactPage.formSuccessBody}
            </p>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "20px" }}
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="name" style={labelStyle}>{t.contactPage.formName}</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={form.name}
                  onChange={handleChange}
                  placeholder={t.contactPage.formNamePlaceholder}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-black)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border-strong)")}
                />
              </div>
              <div>
                <label htmlFor="email" style={labelStyle}>{t.contactPage.formEmail}</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={handleChange}
                  placeholder={t.contactPage.formEmailPlaceholder}
                  style={inputStyle}
                  onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-black)")}
                  onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border-strong)")}
                />
              </div>
            </div>

            <div>
              <label htmlFor="message" style={labelStyle}>{t.contactPage.formMessage}</label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                value={form.message}
                onChange={handleChange}
                placeholder={t.contactPage.formMessagePlaceholder}
                style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                onFocus={(e) => (e.currentTarget.style.borderColor = "var(--color-black)")}
                onBlur={(e) => (e.currentTarget.style.borderColor = "var(--color-border-strong)")}
              />
            </div>

            <button
              type="submit"
              disabled={state === "sending"}
              style={{
                alignSelf: "flex-start",
                backgroundColor: state === "sending" ? "var(--color-gray-mid)" : "var(--color-red)",
                color: "var(--color-white)",
                fontFamily: "var(--font-mono)",
                fontSize: "12px",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                padding: "14px 32px",
                border: "none",
                cursor: state === "sending" ? "not-allowed" : "pointer",
                transition: "background-color 0.2s",
              }}
              onMouseEnter={(e) => {
                if (state !== "sending")
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-red-dark)";
              }}
              onMouseLeave={(e) => {
                if (state !== "sending")
                  (e.currentTarget as HTMLButtonElement).style.backgroundColor = "var(--color-red)";
              }}
            >
              {state === "sending" ? t.contactPage.formSending : t.contactPage.formSubmit}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ContactClient() {
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const formRef = useRef<HTMLElement>(null);
  const isFormInView = useInView(formRef, { once: true, margin: "-60px" });
  const { t } = useLang();

  return (
    <>
      {/* Hero — fond rouge pleine largeur */}
      <motion.section
        ref={heroRef}
        style={{
          backgroundColor: "var(--color-red)",
          paddingTop: "140px",
          paddingBottom: "100px",
          minHeight: "60vh",
          display: "flex",
          alignItems: "center",
        }}
        initial={prefersReducedMotion ? false : "hidden"}
        animate={isHeroInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="px-6 md:px-16 lg:px-24 w-full" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <motion.p
            variants={prefersReducedMotion ? undefined : fadeUp}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "rgba(253,250,244,0.6)",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: "24px",
            }}
          >
            {t.contactPage.label}
          </motion.p>

          <motion.h1
            variants={prefersReducedMotion ? undefined : fadeUp}
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(44px, 7vw, 96px)",
              color: "var(--color-white)",
              lineHeight: 1.0,
              margin: "0 0 32px",
              letterSpacing: "-0.02em",
              maxWidth: "14ch",
            }}
          >
            {t.contactPage.title}
          </motion.h1>

          <motion.div
            variants={prefersReducedMotion ? undefined : fadeUp}
            style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "24px" }}
          >
            {/* Email — CTA principal */}
            <a
              href="mailto:matteo.garbugli@yahoo.it"
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 700,
                fontSize: "clamp(16px, 2.5vw, 22px)",
                color: "var(--color-white)",
                textDecoration: "none",
                letterSpacing: "-0.01em",
                borderBottom: "2px solid rgba(253,250,244,0.4)",
                paddingBottom: "2px",
                transition: "border-color 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--color-white)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(253,250,244,0.4)")}
            >
              matteo.garbugli@yahoo.it
            </a>

            {/* Social links */}
            <div style={{ display: "flex", gap: "16px" }}>
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "12px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase",
                    color: "rgba(253,250,244,0.7)",
                    textDecoration: "none",
                    transition: "color 0.2s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-white)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(253,250,244,0.7)")}
                >
                  {link.label} →
                </a>
              ))}
            </div>
          </motion.div>

          {/* Disponibilité */}
          <motion.div
            variants={prefersReducedMotion ? undefined : fadeUp}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              marginTop: "48px",
              padding: "10px 18px",
              backgroundColor: "rgba(253,250,244,0.1)",
              border: "1px solid rgba(253,250,244,0.2)",
            }}
          >
            <span style={{
              width: "7px",
              height: "7px",
              borderRadius: "50%",
              backgroundColor: "#4ADE80",
              display: "inline-block",
              flexShrink: 0,
            }} />
            <span style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--color-white)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}>
              {t.contactPage.available}
            </span>
          </motion.div>
        </div>
      </motion.section>

      {/* Formulaire */}
      <motion.section
        ref={formRef}
        style={{
          backgroundColor: "var(--color-bg-primary)",
          paddingBottom: "96px",
        }}
        initial={prefersReducedMotion ? false : "hidden"}
        animate={isFormInView ? "visible" : "hidden"}
        variants={staggerContainer}
      >
        <div className="px-6 md:px-16 lg:px-24" style={{ maxWidth: "1400px", margin: "0 auto", paddingTop: "80px" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

            {/* Left — context */}
            <motion.div variants={prefersReducedMotion ? undefined : fadeUp}>
              <h2 style={{
                fontFamily: "var(--font-serif)",
                fontStyle: "italic",
                fontSize: "clamp(28px, 3.5vw, 44px)",
                color: "var(--color-black)",
                lineHeight: 1.1,
                marginBottom: "24px",
              }}>
                {t.contactPage.lookingTitle}
              </h2>
              <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                {t.contactPage.items.map((text, i) => (
                  <div key={i} style={{ display: "flex", gap: "14px", alignItems: "flex-start" }}>
                    <span style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "14px",
                      color: "var(--color-red)",
                      flexShrink: 0,
                      marginTop: "1px",
                    }}>
                      →
                    </span>
                    <p style={{
                      fontFamily: "var(--font-body)",
                      fontSize: "15px",
                      lineHeight: 1.65,
                      color: "var(--color-text-secondary)",
                    }}>
                      {text}
                    </p>
                  </div>
                ))}
              </div>

              {/* Localisation */}
              <div style={{
                marginTop: "40px",
                padding: "20px 24px",
                backgroundColor: "var(--color-bg-secondary)",
                borderLeft: "3px solid var(--color-yellow)",
              }}>
                <p style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "11px",
                  color: "var(--color-gray-mid)",
                  textTransform: "uppercase",
                  letterSpacing: "0.08em",
                  marginBottom: "6px",
                }}>
                  {t.contactPage.locationLabel}
                </p>
                <p style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.6,
                }}>
                  {t.contactPage.locationBody}
                </p>
              </div>
            </motion.div>

            {/* Right — form */}
            <motion.div variants={prefersReducedMotion ? undefined : fadeUp}>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </motion.section>
    </>
  );
}
