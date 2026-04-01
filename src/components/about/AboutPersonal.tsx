"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useLang } from "@/lib/i18n/context";

export default function AboutPersonal() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLang();

  return (
    <section
      id="personnel"
      ref={ref}
      className="py-24 px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: "var(--color-bg-accent)" }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Label */}
        <motion.p
          initial={prefersReducedMotion ? false : "hidden"}
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mb-4 text-xs tracking-[0.22em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-yellow)" }}
        >
          <span style={{ color: "var(--color-yellow)" }}>●</span>{" "}
          {t.aboutPersonal.label}
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={prefersReducedMotion ? false : "hidden"}
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mb-16"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontStyle: "italic",
            color: "var(--color-white)",
            lineHeight: 1.1,
          }}
        >
          {t.aboutPersonal.title}
        </motion.h2>

        {/* Cards grid */}
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {t.aboutPersonal.cards.map((card) => (
            <motion.div
              key={card.title}
              variants={prefersReducedMotion ? undefined : fadeUp}
              style={{
                backgroundColor: "rgba(253, 250, 244, 0.04)",
                border: "1px solid rgba(253, 250, 244, 0.08)",
                padding: "32px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              <span
                style={{
                  fontSize: "40px",
                  lineHeight: 1,
                  display: "block",
                  color: "var(--color-yellow)",
                }}
                aria-hidden="true"
              >
                {card.icon}
              </span>
              <h3
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "22px",
                  color: "var(--color-white)",
                  lineHeight: 1.2,
                }}
              >
                {card.title}
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "15px",
                  lineHeight: 1.7,
                  color: "rgba(253, 250, 244, 0.7)",
                }}
              >
                {card.body}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
