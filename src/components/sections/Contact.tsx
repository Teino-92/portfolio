"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useLang } from "@/lib/i18n/context";

type SocialLink = {
  label: string;
  href: string;
};

const SOCIAL_LINKS: SocialLink[] = [
  { label: "GitHub", href: "https://github.com/Teino-92" },
  { label: "LinkedIn", href: "https://linkedin.com/in/m-garbugli" },
];

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-10% 0px" });
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLang();

  const containerVariants = prefersReducedMotion ? { hidden: {}, visible: {} } : staggerContainer;
  const itemVariants = prefersReducedMotion ? { hidden: {}, visible: {} } : fadeUp;

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ backgroundColor: "var(--color-red)" }}
      className="w-full py-32 px-6"
    >
      <div className="max-w-3xl mx-auto flex flex-col items-center text-center">
        {/* Label */}
        <motion.p
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-white)",
            opacity: 0.6,
            fontSize: "12px",
            letterSpacing: "0.12em",
            textTransform: "uppercase" as const,
          }}
          className="mb-8"
        >
          {t.contactSection.label}
        </motion.p>

        {/* Heading */}
        <motion.h2
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            fontFamily: "var(--font-display)",
            color: "var(--color-white)",
            fontWeight: 800,
            fontSize: "clamp(42px, 6vw, 64px)",
            letterSpacing: "-0.03em",
            lineHeight: 1.1,
          }}
          className="mb-6"
        >
          {t.contactSection.title}
        </motion.h2>

        {/* Subtext */}
        <motion.p
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{
            fontFamily: "var(--font-mono)",
            color: "var(--color-white)",
            opacity: 0.7,
            fontSize: "14px",
            letterSpacing: "0.06em",
          }}
          className="mb-12"
        >
          {t.contactSection.subtitle}
        </motion.p>

        {/* CTA */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="mb-12"
        >
          <a
            href="mailto:matteo.garbugli@yahoo.it"
            style={{
              display: "inline-block",
              backgroundColor: "var(--color-white)",
              color: "var(--color-black)",
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: "13px",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              textDecoration: "none",
              padding: "16px 36px",
              transition: "background-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--color-yellow)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--color-white)";
            }}
          >
            {t.contactSection.cta}
          </a>
        </motion.div>

        {/* Divider */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          style={{ backgroundColor: "rgba(253, 250, 244, 0.2)" }}
          className="w-full h-px mb-10"
        />

        {/* Social links */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          className="flex flex-wrap justify-center gap-8"
        >
          {SOCIAL_LINKS.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              style={{
                fontFamily: "var(--font-mono)",
                color: "var(--color-white)",
                fontSize: "12px",
                letterSpacing: "0.1em",
                textDecoration: "none",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                opacity: 0.6,
                transition: "opacity 0.2s ease",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "1";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.opacity = "0.6";
              }}
            >
              {link.label}
              <span aria-hidden="true" style={{ fontSize: "10px" }}>↗</span>
            </motion.a>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
