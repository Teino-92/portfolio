"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useLang } from "@/lib/i18n/context";

export default function AboutCTA() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLang();

  return (
    <section
      ref={ref}
      className="py-32 px-6"
      style={{ backgroundColor: "var(--color-red)" }}
    >
      <motion.div
        initial={prefersReducedMotion ? false : "hidden"}
        animate={isInView ? "visible" : "hidden"}
        variants={staggerContainer}
        className="max-w-3xl mx-auto flex flex-col items-center text-center gap-10"
      >
        {/* Quote */}
        <motion.blockquote
          variants={prefersReducedMotion ? undefined : fadeUp}
          style={{
            fontFamily: "var(--font-serif)",
            fontStyle: "italic",
            fontSize: "clamp(28px, 4.5vw, 52px)",
            lineHeight: 1.2,
            color: "var(--color-white)",
            margin: 0,
          }}
        >
          &ldquo;{t.aboutCTA.quote}&rdquo;
        </motion.blockquote>

        {/* Divider */}
        <motion.div
          variants={prefersReducedMotion ? undefined : fadeUp}
          style={{
            width: "48px",
            height: "1px",
            backgroundColor: "rgba(253,250,244,0.4)",
          }}
        />

        {/* Buttons */}
        <motion.div
          variants={prefersReducedMotion ? undefined : fadeUp}
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="/#projets"
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
              padding: "16px 32px",
              transition: "background-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.backgroundColor = "var(--color-yellow)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLAnchorElement;
              el.style.backgroundColor = "var(--color-white)";
            }}
          >
            {t.aboutCTA.ctaProjects}
          </a>

          <a
            href="/#contact"
            style={{
              display: "inline-block",
              backgroundColor: "transparent",
              color: "var(--color-white)",
              fontFamily: "var(--font-mono)",
              fontWeight: 500,
              fontSize: "13px",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              textDecoration: "none",
              padding: "16px 32px",
              border: "1.5px solid rgba(253,250,244,0.5)",
              transition: "border-color 0.2s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-white)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor = "rgba(253,250,244,0.5)";
            }}
          >
            {t.aboutCTA.ctaContact}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
