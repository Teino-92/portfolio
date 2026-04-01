"use client";

import { useEffect, useRef } from "react";
import { useInView, useReducedMotion, motion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type SkillDomain = {
  title: string;
  accent: string;
  skills: string[];
};

const DOMAINS: SkillDomain[] = [
  {
    title: "Opérations",
    accent: "var(--color-red)",
    skills: [
      "Leadership & management senior",
      "Pilotage stratégique & P&L",
      "KPIs & culture data",
      "Gestion de crise",
      "Amélioration continue",
      "Gouvernance & COPIL",
      "Process design",
    ],
  },
  {
    title: "Tech & Produit",
    accent: "var(--color-yellow)",
    skills: [
      "Ruby on Rails",
      "Next.js / React",
      "TypeScript / JavaScript",
      "SQL / PostgreSQL",
      "Solidity / Web3",
      "Figma",
      "AWS · Stripe · GitHub",
    ],
  },
  {
    title: "Humain & Transversal",
    accent: "var(--color-gray-light)",
    skills: [
      "Stakeholder management",
      "Conduite du changement",
      "4 langues courantes",
      "Pédagogie & mentorat",
      "Coordination multisites",
      "Esprit entrepreneurial",
      "Adaptabilité culturelle",
    ],
  },
];

export default function AboutSkills() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const itemsRef = useRef<HTMLElement[]>([]);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  useEffect(() => {
    if (prefersReducedMotion) return;
    const items = itemsRef.current;
    if (!items.length) return;

    const triggers: ScrollTrigger[] = [];

    items.forEach((el, index) => {
      gsap.set(el, { opacity: 0, x: -40 });
      const trigger = ScrollTrigger.create({
        trigger: el,
        start: "top 88%",
        onEnter: () => {
          gsap.fromTo(
            el,
            { opacity: 0, x: -40 },
            {
              opacity: 1,
              x: 0,
              duration: 0.5,
              ease: "power2.out",
              delay: (index % 7) * 0.06,
            }
          );
        },
        once: true,
      });
      triggers.push(trigger);
    });

    return () => triggers.forEach((t) => t.kill());
  }, [prefersReducedMotion]);

  return (
    <section
      id="competences"
      ref={ref}
      className="py-24 px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Label */}
        <motion.p
          initial={prefersReducedMotion ? false : "hidden"}
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mb-4 text-xs tracking-[0.22em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-gray-mid)" }}
        >
          <span style={{ color: "var(--color-red)" }}>●</span> 04 — Compétences
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
            color: "var(--color-black)",
            lineHeight: 1.1,
          }}
        >
          Opérations × Tech × Humain.
        </motion.h2>

        {/* Three columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {DOMAINS.map((domain) => (
            <div key={domain.title}>
              {/* Column header */}
              <div
                style={{
                  borderTop: `3px solid ${domain.accent}`,
                  paddingTop: "16px",
                  marginBottom: "24px",
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase" as const,
                    color: "var(--color-text-primary)",
                  }}
                >
                  {domain.title}
                </h3>
              </div>

              {/* Skills list */}
              <ul style={{ listStyle: "none", padding: 0, margin: 0 }} role="list">
                {domain.skills.map((skill) => (
                  <li
                    key={skill}
                    ref={addToRefs}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      color: "var(--color-text-secondary)",
                      padding: "7px 0",
                      borderBottom: "1px solid var(--color-border)",
                      display: "flex",
                      alignItems: "center",
                      gap: "10px",
                      willChange: "transform, opacity",
                    }}
                  >
                    <span
                      style={{ color: domain.accent, fontSize: "10px", flexShrink: 0 }}
                      aria-hidden="true"
                    >
                      —
                    </span>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
