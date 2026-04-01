"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeUp, staggerContainer } from "@/lib/animations";

type PersonalCard = {
  icon: string;
  title: string;
  body: string;
};

const CARDS: PersonalCard[] = [
  {
    icon: "♥",
    title: "La famille",
    body: "Une femme, deux enfants. Mon équipe la plus importante. Tout le reste s'organise autour d'eux — les projets, les ambitions, les nuits de code.",
  },
  {
    icon: "⚽",
    title: "Le sport",
    body: "Football en semi-professionnel jusqu'à mes 17 ans (numèro 10, évidemment). Volleyball et Tennis mes autres passions. Et les dimanches à suivre la F1 avec un café. Le sport, c'est mon reset.",
  },
  {
    icon: "🍳",
    title: "La cuisine",
    body: "Pas un hobby. Une passion. Risotto, pasta fraîche, barbecue d'été. La cuisine c'est du management : timing, précision, improvisation — et le résultat fait sourire les gens.",
  },
  {
    icon: "🌍",
    title: "Les langues",
    body: "Français · Italiano · English · Español. Quatre langues, quatre façons de penser. « If you talk to a man in a language he understands, that goes to his head. If you talk to him in his own language, that goes to his heart. » — Nelson Mandela",
  },
];

export default function AboutPersonal() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

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
          03 — En dehors du code
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
          La vie, c&apos;est aussi ça.
        </motion.h2>

        {/* Cards grid */}
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
        >
          {CARDS.map((card) => (
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
