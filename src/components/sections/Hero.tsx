"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion } from "framer-motion";
import { heroVariants } from "@/lib/animations";
import AnimatedText from "@/components/ui/AnimatedText";

const ParticleGlobe = dynamic(
  () => import("@/components/three/ParticleGlobe"),
  { ssr: false }
);

const HEADLINE_LINES = ["Bâtisseur", "d'applications", "qui ont du sens.", "Web & SaaS."];


export default function Hero() {
  const prefersReducedMotion = useReducedMotion();

  const motionProps = (i: number) =>
    prefersReducedMotion
      ? {}
      : {
          initial: "hidden" as const,
          animate: "visible" as const,
          variants: heroVariants,
          custom: i,
        };

  return (
    <section
      className="relative h-screen min-h-[640px] overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      {/* Globe 3D — arrière-plan */}
      <div
        className="absolute inset-0 opacity-30 md:opacity-55"
        aria-hidden="true"
      >
        <ParticleGlobe />
      </div>

      {/* Grain texture overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E")`,
          backgroundRepeat: "repeat",
          backgroundSize: "128px 128px",
          opacity: 0.6,
          mixBlendMode: "multiply",
        }}
        aria-hidden="true"
      />

      {/* Contenu */}
      <div className="relative z-10 flex flex-col justify-center h-full px-6 md:px-16 lg:px-24 max-w-[1400px] mx-auto">

        {/* Titre principal */}
        <h1 className="mb-8" aria-label={HEADLINE_LINES.join(" ")}>
          {HEADLINE_LINES.map((line, i) => (
            <AnimatedText
              key={line}
              text={line}
              el="span"
              delay={0.15 + i * 0.18}
              style={{
                fontFamily: "var(--font-display)",
                fontWeight: 800,
                fontSize: "clamp(48px, 7vw, 100px)",
                letterSpacing: "-0.03em",
                color: "var(--color-black)",
                lineHeight: 1.05,
                display: "block",
              }}
            />
          ))}
        </h1>

        {/* Sous-titre */}
        <motion.p
          {...motionProps(4)}
          className="mb-12 max-w-xl"
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(13px, 1.5vw, 16px)",
            lineHeight: 1.7,
            color: "var(--color-gray-mid)",
          }}
        >
          Rails · Next.js · Solidity · IA — de l&apos;idée au produit.
          <br />
          3 SaaS lancés, des centaines d&apos;utilisateurs, zéro template.
        </motion.p>

        {/* CTAs */}
        <motion.div
          {...motionProps(5)}
          className="flex flex-wrap gap-4 items-center"
        >
          <a
            href="/projects"
            className="cta-primary group relative inline-flex items-center gap-3 overflow-hidden px-8 py-4"
            style={{
              backgroundColor: "var(--color-red)",
              color: "var(--color-white)",
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            <span className="relative z-10">Voir les projets</span>
            <span
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1"
              aria-hidden="true"
            >
              →
            </span>
            {/* Hover fill */}
            <span
              className="absolute inset-0 translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0"
              style={{ backgroundColor: "var(--color-red-dark)" }}
              aria-hidden="true"
            />
          </a>

          <a
            href="/contact"
            className="cta-outline group inline-flex items-center gap-3 px-8 py-4"
            style={{
              border: "1.5px solid var(--color-border-strong)",
              color: "var(--color-gray-dark)",
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              letterSpacing: "0.1em",
              textTransform: "uppercase",
              textDecoration: "none",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "var(--color-red)";
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--color-red)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLAnchorElement).style.borderColor =
                "var(--color-border-strong)";
              (e.currentTarget as HTMLAnchorElement).style.color =
                "var(--color-gray-dark)";
            }}
          >
            Démarrer une conversation
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={prefersReducedMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        aria-hidden="true"
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--color-gray-light)",
          }}
        >
          scroll
        </span>
        <ScrollBar />
      </motion.div>
    </section>
  );
}

function ScrollBar() {
  return (
    <div
      className="relative overflow-hidden"
      style={{
        width: "1px",
        height: "48px",
        backgroundColor: "var(--color-border)",
      }}
    >
      <motion.div
        className="absolute top-0 left-0 w-full"
        style={{ backgroundColor: "var(--color-red)" }}
        initial={{ height: 0, y: 0 }}
        animate={{ height: ["0%", "100%", "0%"], y: ["0%", "0%", "100%"] }}
        transition={{
          duration: 1.6,
          repeat: Infinity,
          repeatDelay: 0.4,
          ease: "easeInOut",
        }}
      />
    </div>
  );
}
