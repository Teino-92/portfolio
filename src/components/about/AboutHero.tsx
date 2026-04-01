"use client";

import { useRef } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";
import AnimatedText from "@/components/ui/AnimatedText";
import { useLang } from "@/lib/i18n/context";

export default function AboutHero() {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLang();

  const motionProps = (delay = 0) =>
    prefersReducedMotion
      ? {}
      : { initial: "hidden" as const, animate: "visible" as const, variants: fadeUp, transition: { delay } };

  return (
    <section
      className="relative min-h-screen overflow-hidden flex flex-col justify-center px-6 md:px-16 lg:px-24 py-32"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      {/* Background typographic texture */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-display)",
          fontWeight: 800,
          fontSize: "clamp(180px, 30vw, 380px)",
          letterSpacing: "-0.05em",
          color: "var(--color-bg-secondary)",
          whiteSpace: "nowrap",
          pointerEvents: "none",
          userSelect: "none",
          lineHeight: 1,
          zIndex: 0,
        }}
      >
        MG
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto w-full">
        {/* Label */}
        <motion.p
          {...motionProps(0.1)}
          className="mb-10 text-xs tracking-[0.22em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-gray-mid)" }}
        >
          <span style={{ color: "var(--color-red)" }}>●</span>{" "}
          {t.aboutHero.label}
        </motion.p>

        {/* Headline */}
        <div className="mb-16 max-w-4xl">
          <AnimatedText
            text={t.aboutHero.headline1}
            el="h1"
            delay={0.2}
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(40px, 6vw, 80px)",
              lineHeight: 1.1,
              color: "var(--color-black)",
              display: "block",
              marginBottom: "0.15em",
            }}
          />
          <AnimatedText
            text={t.aboutHero.headline2}
            el="span"
            delay={0.55}
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(40px, 6vw, 80px)",
              lineHeight: 1.1,
              color: "var(--color-red)",
              display: "block",
            }}
          />
        </div>

        {/* 2-col layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left — bio */}
          <motion.p
            {...motionProps(0.7)}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "17px",
              lineHeight: 1.75,
              color: "var(--color-text-secondary)",
              maxWidth: "520px",
            }}
          >
            {t.aboutHero.bio}
          </motion.p>

          {/* Right — stats */}
          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            animate="visible"
            variants={staggerContainer}
            className="grid grid-cols-2 gap-6"
          >
            {t.aboutHero.stats.map((stat) => (
              <motion.div
                key={stat.label}
                variants={prefersReducedMotion ? undefined : fadeUp}
                style={{
                  borderLeft: "2px solid var(--color-border-strong)",
                  paddingLeft: "20px",
                }}
              >
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-display)",
                    fontWeight: 800,
                    fontSize: "clamp(40px, 5vw, 60px)",
                    lineHeight: 1,
                    letterSpacing: "-0.03em",
                    color: "var(--color-yellow)",
                  }}
                >
                  {stat.value}
                </span>
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    letterSpacing: "0.08em",
                    textTransform: "uppercase" as const,
                    color: "var(--color-gray-mid)",
                    marginTop: "6px",
                  }}
                >
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase" as const,
            color: "var(--color-gray-light)",
          }}
        >
          scroll
        </span>
        <div
          style={{
            width: "1px",
            height: "48px",
            backgroundColor: "var(--color-border)",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              backgroundColor: "var(--color-red)",
            }}
            initial={{ height: 0, y: 0 }}
            animate={{ height: ["0%", "100%", "0%"], y: ["0%", "0%", "100%"] }}
            transition={{ duration: 1.6, repeat: Infinity, repeatDelay: 0.4, ease: "easeInOut" }}
          />
        </div>
      </div>
    </section>
  );
}
