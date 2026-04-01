"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import AnimatedText from "@/components/ui/AnimatedText";
import type { Variants, Transition } from "framer-motion";
import { useLang } from "@/lib/i18n/context";

const statVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.7,
      ease: [0.25, 0.46, 0.45, 0.94],
    } as Transition,
  }),
};

const textStagger: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.3 },
  },
};

export default function About() {
  const shouldReduceMotion = useReducedMotion();
  const { t } = useLang();
  const STATS = [
    { value: "3", label: t.aboutSection.stat1Label },
    { value: t.aboutSection.stat2Value, label: t.aboutSection.stat2Label },
  ];
  const sectionRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const sectionInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const statsInView = useInView(statsRef, { once: true, margin: "-60px" });
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
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:gap-24">
          {/* Left — Stats */}
          <motion.div
            ref={statsRef}
            initial={animate ? "hidden" : false}
            animate={statsInView ? "visible" : "hidden"}
            variants={animate ? staggerContainer : undefined}
            className="flex flex-col justify-center gap-12"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                custom={i}
                variants={animate ? statVariants : undefined}
                className="flex flex-col gap-2"
              >
                <span
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: "clamp(72px, 10vw, 96px)",
                    fontWeight: 800,
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    color: "var(--color-yellow)",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    fontWeight: 500,
                    textTransform: "uppercase" as const,
                    letterSpacing: "0.08em",
                    color: "rgba(253, 250, 244, 0.55)",
                  }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>

          {/* Right — Bio */}
          <motion.div
            ref={textRef}
            initial={animate ? "hidden" : false}
            animate={textInView ? "visible" : "hidden"}
            variants={animate ? textStagger : undefined}
            className="flex flex-col justify-center gap-8"
          >
            <AnimatedText
              text={t.aboutSection.title}
              el="p"
              delay={0.2}
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(22px, 3vw, 28px)",
                fontStyle: "italic",
                lineHeight: 1.35,
                color: "var(--color-white)",
              }}
            />

            <motion.p
              variants={animate ? fadeUp : undefined}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "17px",
                lineHeight: 1.7,
                color: "rgba(253, 250, 244, 0.7)",
              }}
            >
              {t.aboutSection.body}
            </motion.p>

            <motion.p
              variants={animate ? fadeUp : undefined}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "17px",
                lineHeight: 1.7,
                color: "rgba(253, 250, 244, 0.7)",
              }}
            >
              {t.aboutSection.cta}
            </motion.p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
