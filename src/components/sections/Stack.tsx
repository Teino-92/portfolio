"use client";

import { useEffect, useRef } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

type TechItem = {
  label: string;
  core: boolean;
};

type DomainGroup = {
  title: string;
  items: TechItem[];
};

const domains: DomainGroup[] = [
  {
    title: "Frontend",
    items: [
      { label: "Next.js", core: true },
      { label: "React", core: true },
      { label: "TypeScript", core: true },
      { label: "Tailwind CSS", core: true },
      { label: "Framer Motion", core: false },
      { label: "GSAP", core: false },
      { label: "React Three Fiber", core: false },
    ],
  },
  {
    title: "Backend",
    items: [
      { label: "Ruby on Rails", core: true },
      { label: "Node.js", core: true },
      { label: "PostgreSQL", core: true },
      { label: "Redis", core: false },
      { label: "Hotwire / Turbo", core: false },
      { label: "REST & GraphQL", core: false },
    ],
  },
  {
    title: "Web3",
    items: [
      { label: "Solidity", core: true },
      { label: "Ethers.js", core: true },
      { label: "Hardhat", core: false },
      { label: "The Graph", core: false },
      { label: "IPFS", core: false },
      { label: "ERC-20 / ERC-721", core: false },
    ],
  },
  {
    title: "IA / Outils",
    items: [
      { label: "OpenAI API", core: true },
      { label: "LangChain", core: false },
      { label: "Vercel AI SDK", core: false },
      { label: "Figma", core: false },
      { label: "Docker", core: false },
      { label: "GitHub Actions", core: false },
    ],
  },
];

export default function Stack() {
  const shouldReduceMotion = useReducedMotion();
  const itemsRef = useRef<HTMLElement[]>([]);

  const addToRefs = (el: HTMLElement | null) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  useEffect(() => {
    if (shouldReduceMotion) return;

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

    return () => {
      triggers.forEach((t) => t.kill());
    };
  }, [shouldReduceMotion]);

  return (
    <section
      id="stack"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
      className="py-24 px-6 md:px-16 lg:px-24"
      aria-label="Stack technique"
    >
      <div
        className="max-w-[1400px] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-16 lg:gap-24"
        style={{ borderTop: "1px solid var(--color-border)" }}
      >
        {/* Left — label + title */}
        <div className="flex flex-col gap-6 pt-16">
          <span
            style={{
              fontFamily: "var(--font-mono)",
              color: "var(--color-gray-mid)",
              fontSize: "11px",
              letterSpacing: "0.12em",
              textTransform: "uppercase" as const,
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span style={{ color: "var(--color-red)" }} aria-hidden="true">●</span>
            03 — Stack technique
          </span>

          <h2
            style={{
              fontFamily: "var(--font-serif)",
              color: "var(--color-text-primary)",
              fontSize: "clamp(2rem, 4vw, 3rem)",
              lineHeight: 1.15,
              fontStyle: "italic",
            }}
          >
            Outils &amp; maîtrises
          </h2>

          <p
            style={{
              fontFamily: "var(--font-body)",
              color: "var(--color-text-muted)",
              fontSize: "1rem",
              lineHeight: 1.65,
              maxWidth: "28ch",
            }}
          >
            Une stack choisie pour sa cohérence — pas pour sa longueur.
            Les points rouges marquent les outils du quotidien.
          </p>
        </div>

        {/* Right — groups */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 pt-16">
          {domains.map((group) => (
            <div key={group.title} className="flex flex-col gap-4">
              <h3
                style={{
                  fontFamily: "var(--font-display)",
                  fontWeight: 700,
                  fontSize: "0.85rem",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase" as const,
                  color: "var(--color-text-secondary)",
                  paddingBottom: "0.5rem",
                  borderBottom: "1px solid var(--color-border-strong)",
                }}
              >
                {group.title}
              </h3>

              <ul className="flex flex-col gap-2" role="list">
                {group.items.map((item) => (
                  <li
                    key={item.label}
                    ref={addToRefs}
                    className="flex items-center gap-2"
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      fontWeight: item.core ? 500 : 400,
                      color: item.core
                        ? "var(--color-text-primary)"
                        : "var(--color-text-secondary)",
                      willChange: "transform, opacity",
                    }}
                  >
                    <span
                      style={{
                        color: item.core ? "var(--color-red)" : "var(--color-gray-light)",
                        fontSize: "10px",
                        flexShrink: 0,
                      }}
                      aria-hidden="true"
                    >
                      ●
                    </span>
                    {item.label}
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
