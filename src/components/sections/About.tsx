"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import AnimatedText from "@/components/ui/AnimatedText";
import { useLang } from "@/lib/i18n/context";

const textStagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLang();
  const sectionRef = useRef<HTMLElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const textInView = useInView(textRef, { once: true, margin: "-60px" });

  const animate = !shouldReduceMotion;

  return (
    <section
      id="about"
      ref={sectionRef}
      style={{ backgroundColor: "var(--color-bg-accent)" }}
      className="relative w-full overflow-hidden py-24 md:py-32 lg:py-40"
    >
      {/* Label */}
      <motion.div
        initial={animate ? { opacity: 0, y: 20 } : false}
        animate={sectionInView ? { opacity: 1, y: 0 } : undefined}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="mx-auto max-w-7xl px-6 md:px-16 mb-16"
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            fontWeight: 500,
            textTransform: "uppercase" as const,
            letterSpacing: "0.1em",
            color: "var(--color-yellow)",
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span aria-hidden="true">●</span>
          {t.aboutSection.label}
        </span>
      </motion.div>

      <div className="mx-auto max-w-7xl px-6 md:px-16">
        <motion.div
          ref={textRef}
          initial={animate ? "hidden" : false}
          animate={textInView ? "visible" : "hidden"}
          variants={animate ? staggerContainer : undefined}
          className="flex flex-col gap-10 max-w-3xl"
        >
          <AnimatedText
            text={t.aboutSection.title}
            el="p"
            delay={0.2}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(28px, 4vw, 42px)",
              fontStyle: "italic",
              lineHeight: 1.25,
              color: "var(--color-white)",
            }}
          />

          <motion.p
            variants={animate ? fadeUp : undefined}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "18px",
              lineHeight: 1.75,
              color: "rgba(253, 250, 244, 0.7)",
              maxWidth: "60ch",
            }}
          >
            {t.aboutSection.body}
          </motion.p>

          <motion.p
            variants={animate ? fadeUp : undefined}
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(16px, 2vw, 20px)",
              fontStyle: "italic",
              lineHeight: 1.5,
              color: "rgba(253, 250, 244, 0.45)",
              borderLeft: "2px solid var(--color-yellow)",
              paddingLeft: "20px",
            }}
          >
            {t.aboutSection.cta}
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
