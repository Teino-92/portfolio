"use client";

import { useRef, useEffect, useState, type MutableRefObject } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TimelineItem = {
  period: string;
  emoji: string;
  title: string;
  location: string;
  description: string;
};

const TIMELINE: TimelineItem[] = [
  {
    period: "Les origines",
    emoji: "🇮🇹",
    title: "Milan, point de départ",
    location: "Milan, Italie",
    description:
      "100% italien, né à Milan. Lycée commerce et langues — français, anglais — dans une ville qui t'apprend que l'esthétique et la rigueur ne sont pas opposées. À 18 ans, valise bouclée, cap sur la Grèce.",
  },
  {
    period: "2010 — 2012",
    emoji: "🏝️",
    title: "Rhodes & Crète",
    location: "Grèce",
    description:
      "Presque trois ans dans l'hôtellerie grecque, entre Rhodes et la Crète. Immersion totale dans le service haut de gamme : gérer des clients exigeants sous 40°C forge une forme de calme opérationnel qu'aucune école ne t'enseigne.",
  },
  {
    period: "Fin 2012 — 2014",
    emoji: "🌊",
    title: "Stavanger, cap au nord",
    location: "Norvège",
    description:
      "L'envie de voir autre chose. Un billet pour la Norvège, une ville pétrolière au bord du fjord, un restaurant. Premier vrai pas seul dans le grand froid — au sens propre comme au figuré. J'ai appris que l'excellence opérationnelle commence par l'humain.",
  },
  {
    period: "2014",
    emoji: "🏖️",
    title: "Punta Cana — et la rencontre",
    location: "République Dominicaine",
    description:
      "Soleil, animation, coordination de 15 personnes, 200+ clients par semaine. Et surtout : la rencontre avec celle qui allait devenir ma femme. Depuis ce jour, Paris est devenu home.",
  },
  {
    period: "2014 — 2019",
    emoji: "🏪",
    title: "Des Petits Hauts",
    location: "Paris, France",
    description:
      "Cogérant d'une boutique mode à Paris avec ma femme. 700K€/an de CA, 100% de rétention client. La P&L, le recrutement, la fidélisation, les stocks — le vrai business, les mains dans le cambouis. J'ai compris là que les détails comptent et que la constance, avec des clients exigeants, n'est pas négociable.",
  },
  {
    period: "2019 — 2025",
    emoji: "🏢",
    title: "Welcome at Work",
    location: "Paris, France",
    description:
      "Six ans à pousser des limites. De Welcome Manager Senior à Operating Manager : des équipes, des process, du COPIL, de la data. Un terrain de jeu où j'ai pu combiner tout ce que j'avais appris — l'humain de l'hôtellerie, la rigueur du retail, l'ambition du business. +10%/an en moyen de CA Btob sur mon périmètre. Et la conviction que la technologie pouvait aller beaucoup plus loin.",
  },
  {
    period: "2025 — aujourd'hui",
    emoji: "💻",
    title: "Le Wagon → Freelance",
    location: "Paris, France",
    description:
      "Le déclic tech. Bootcamp intensif : Rails, JavaScript, SQL, Git. Et maintenant je code ce que j'imagine. Trois SaaS, des projets Web3, une façon de travailler qui n'a jamais été aussi alignée avec qui je suis. Dix ans d'opérations. Un ingénieur en plus.",
  },
];

function TimelineItem({
  item,
  index,
  dotRef,
}: {
  item: TimelineItem;
  index: number;
  dotRef: (el: HTMLDivElement | null) => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const isRight = index % 2 === 1;
  const [dotActive, setDotActive] = useState(false);
  const dotElRef = useRef<HTMLDivElement>(null) as MutableRefObject<HTMLDivElement | null>;

  // Observe dot visibility to "light it up"
  useEffect(() => {
    if (prefersReducedMotion) { setDotActive(true); return; }
    const el = dotElRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setDotActive(true); observer.disconnect(); } },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [prefersReducedMotion]);

  const dotStyle = {
    width: "14px",
    height: "14px",
    borderRadius: "50%",
    backgroundColor: dotActive ? "var(--color-red)" : "var(--color-border-strong)",
    border: `2px solid var(--color-bg-secondary)`,
    flexShrink: 0 as const,
    marginTop: "8px",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
    boxShadow: dotActive ? "0 0 0 4px rgba(214,60,42,0.15)" : "none",
    zIndex: 2,
    position: "relative" as const,
  };

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? false : { opacity: 0, x: isRight ? 40 : -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
      className={`relative grid grid-cols-1 lg:grid-cols-2 gap-0 mb-0`}
    >
      {/* Desktop: alternating content */}
      <div
        className={`hidden lg:block ${isRight ? "order-2" : "order-1"}`}
        style={{ padding: "0 3rem 3rem" }}
      >
        {!isRight && <TimelineCard item={item} />}
      </div>

      {/* Center line + dot */}
      <div
        className="hidden lg:flex flex-col items-center"
        style={{ order: 1 }}
      >
        <div
          ref={(el) => { dotElRef.current = el; dotRef(el); }}
          style={dotStyle}
        />
      </div>

      <div
        className={`hidden lg:block ${isRight ? "order-1" : "order-3"}`}
        style={{ padding: "0 3rem 3rem" }}
      >
        {isRight && <TimelineCard item={item} />}
      </div>

      {/* Mobile: always full width */}
      <div className="lg:hidden pb-10 pl-8 relative">
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "8px",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: dotActive ? "var(--color-red)" : "var(--color-border-strong)",
            transition: "background-color 0.3s ease",
          }}
        />
        <TimelineCard item={item} />
      </div>
    </motion.div>
  );
}

function TimelineCard({ item }: { item: TimelineItem }) {
  return (
    <div>
      <div className="flex items-center gap-3 mb-2">
        <span style={{ fontSize: "20px" }}>{item.emoji}</span>
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "11px",
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            color: "var(--color-red)",
          }}
        >
          {item.period}
        </span>
      </div>
      <h3
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(20px, 2.5vw, 26px)",
          color: "var(--color-black)",
          lineHeight: 1.15,
          marginBottom: "6px",
        }}
      >
        {item.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--color-gray-mid)",
          letterSpacing: "0.06em",
          marginBottom: "12px",
        }}
      >
        {item.location}
      </p>
      <p
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "15px",
          lineHeight: 1.7,
          color: "var(--color-text-secondary)",
        }}
      >
        {item.description}
      </p>
    </div>
  );
}

export default function AboutStory() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();

  // Refs for the animated progress lines
  const timelineContainerRef = useRef<HTMLDivElement>(null);
  const lineDesktopRef = useRef<HTMLDivElement>(null);
  const lineMobileRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<HTMLDivElement[]>([]);

  const addDotRef = (el: HTMLDivElement | null) => {
    if (el && !dotRefs.current.includes(el)) {
      dotRefs.current.push(el);
    }
  };

  useEffect(() => {
    if (prefersReducedMotion) return;
    const container = timelineContainerRef.current;
    const lineDesktop = lineDesktopRef.current;
    const lineMobile = lineMobileRef.current;
    if (!container) return;

    const triggers: ScrollTrigger[] = [];

    // Animate the desktop progress line
    if (lineDesktop) {
      gsap.set(lineDesktop, { scaleY: 0, transformOrigin: "top center" });
      const t = ScrollTrigger.create({
        trigger: container,
        start: "top 70%",
        end: "bottom 70%",
        scrub: 0.8,
        onUpdate: (self) => {
          gsap.set(lineDesktop, { scaleY: self.progress });
        },
      });
      triggers.push(t);
    }

    // Animate the mobile progress line
    if (lineMobile) {
      gsap.set(lineMobile, { scaleY: 0, transformOrigin: "top center" });
      const t = ScrollTrigger.create({
        trigger: container,
        start: "top 70%",
        end: "bottom 70%",
        scrub: 0.8,
        onUpdate: (self) => {
          gsap.set(lineMobile, { scaleY: self.progress });
        },
      });
      triggers.push(t);
    }

    return () => triggers.forEach((t) => t.kill());
  }, [prefersReducedMotion]);

  return (
    <section
      id="parcours"
      ref={ref}
      className="py-24 px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
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
          <span style={{ color: "var(--color-red)" }}>●</span> 02 — Le parcours
        </motion.p>

        {/* Title */}
        <motion.h2
          initial={prefersReducedMotion ? false : "hidden"}
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mb-20"
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(36px, 5vw, 56px)",
            fontStyle: "italic",
            color: "var(--color-black)",
            lineHeight: 1.1,
          }}
        >
          Une trajectoire atypique.
        </motion.h2>

        {/* Timeline */}
        <div className="relative" ref={timelineContainerRef}>

          {/* Desktop — ghost line (always visible, faint) */}
          <div
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
            style={{ width: "1px", backgroundColor: "var(--color-border)" }}
          />
          {/* Desktop — animated red progress line */}
          <div
            ref={lineDesktopRef}
            className="hidden lg:block absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
            style={{
              width: "2px",
              backgroundColor: "var(--color-red)",
              transformOrigin: "top center",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {/* Mobile — ghost line */}
          <div
            className="lg:hidden absolute left-[4px] top-0 bottom-0"
            style={{ width: "1px", backgroundColor: "var(--color-border)" }}
          />
          {/* Mobile — animated red progress line */}
          <div
            ref={lineMobileRef}
            className="lg:hidden absolute left-[4px] top-0 bottom-0"
            style={{
              width: "2px",
              backgroundColor: "var(--color-red)",
              transformOrigin: "top center",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {TIMELINE.map((item, index) => (
            <TimelineItem key={item.title} item={item} index={index} dotRef={addDotRef} />
          ))}
        </div>
      </div>
    </section>
  );
}
