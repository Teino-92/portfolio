"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useLang } from "@/lib/i18n/context";

type Variant = "light" | "red" | "dark";

type Plan = {
  tier: string;
  nameKey: "essential" | "studio" | "signature";
  price: string;
  tagKey: "landing" | "showcase" | "premium";
  descKey: "essential" | "studio" | "signature";
  itemsKey: "essential" | "studio" | "signature";
  ctaKey: "start" | "learnMore" | "talk";
  variant: Variant;
  exampleProjectId?: string;
};

const plans: Plan[] = [
  {
    tier: "01",
    nameKey: "essential",
    price: "700",
    tagKey: "landing",
    descKey: "essential",
    itemsKey: "essential",
    ctaKey: "start",
    variant: "light",
  },
  {
    tier: "02",
    nameKey: "studio",
    price: "2 000",
    tagKey: "showcase",
    descKey: "studio",
    itemsKey: "studio",
    ctaKey: "learnMore",
    variant: "red",
    exampleProjectId: "tiffany-salomon",
  },
  {
    tier: "03",
    nameKey: "signature",
    price: "5 000",
    tagKey: "premium",
    descKey: "signature",
    itemsKey: "signature",
    ctaKey: "talk",
    variant: "dark",
    exampleProjectId: "merci-murphy",
  },
];

type Theme = {
  bg: string;
  border: string;
  tierColor: string;
  tagBg: string;
  tagBorder: string;
  tagText: string;
  name: string;
  price: string;
  from: string;
  divider: string;
  desc: string;
  item: string;
  itemBorder: string;
  itemArrow: string;
  ctaBg: string;
  ctaText: string;
  ctaBorder: string;
};

const themes: Record<Variant, Theme> = {
  light: {
    bg: "var(--color-bg-secondary)",
    border: "1px solid var(--color-border)",
    tierColor: "var(--color-gray-light)",
    tagBg: "rgba(26,26,24,0.06)",
    tagBorder: "var(--color-red)",
    tagText: "var(--color-red)",
    name: "var(--color-black)",
    price: "var(--color-red)",
    from: "var(--color-gray-mid)",
    divider: "var(--color-border)",
    desc: "var(--color-text-secondary)",
    item: "var(--color-gray-dark)",
    itemBorder: "rgba(26,26,24,0.06)",
    itemArrow: "var(--color-red)",
    ctaBg: "transparent",
    ctaText: "var(--color-red)",
    ctaBorder: "var(--color-red)",
  },
  red: {
    bg: "var(--color-red)",
    border: "none",
    tierColor: "rgba(253,250,244,0.4)",
    tagBg: "rgba(253,250,244,0.12)",
    tagBorder: "var(--color-bg-primary)",
    tagText: "var(--color-bg-primary)",
    name: "var(--color-yellow)",
    price: "var(--color-bg-primary)",
    from: "rgba(253,250,244,0.6)",
    divider: "rgba(253,250,244,0.18)",
    desc: "rgba(253,250,244,0.85)",
    item: "rgba(253,250,244,0.9)",
    itemBorder: "rgba(253,250,244,0.12)",
    itemArrow: "var(--color-black)",
    ctaBg: "var(--color-bg-primary)",
    ctaText: "var(--color-red)",
    ctaBorder: "var(--color-bg-primary)",
  },
  dark: {
    bg: "var(--color-black)",
    border: "none",
    tierColor: "rgba(253,250,244,0.3)",
    tagBg: "rgba(253,250,244,0.08)",
    tagBorder: "var(--color-yellow)",
    tagText: "var(--color-yellow)",
    name: "var(--color-bg-primary)",
    price: "var(--color-yellow)",
    from: "rgba(253,250,244,0.4)",
    divider: "rgba(253,250,244,0.12)",
    desc: "rgba(253,250,244,0.7)",
    item: "rgba(253,250,244,0.85)",
    itemBorder: "rgba(253,250,244,0.08)",
    itemArrow: "var(--color-red)",
    ctaBg: "var(--color-red)",
    ctaText: "var(--color-bg-primary)",
    ctaBorder: "var(--color-red)",
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] },
  }),
};

export default function Pricing() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const { t } = useLang();
  const p = t.pricingSection;

  useEffect(() => {
    const mql = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mql.matches);
    update();
    mql.addEventListener("change", update);
    return () => mql.removeEventListener("change", update);
  }, []);

  const animate = prefersReducedMotion ? "visible" : isInView ? "visible" : "hidden";

  return (
    <section
      id="prestations"
      ref={ref}
      className="py-24 px-6 md:px-16 lg:px-24 relative overflow-hidden"
      style={{ backgroundColor: "var(--color-bg-primary)" }}
    >
      {/* Center divider line */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
          width: "1px",
          height: "100%",
          background: "var(--color-border)",
          zIndex: 0,
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-[1]">
        {/* Header */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0, y: -20 }}
          animate={isInView || prefersReducedMotion ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="mb-16"
        >
          <p
            className="mb-4 text-xs tracking-[0.22em] uppercase"
            style={{ fontFamily: "var(--font-mono)", color: "var(--color-gray-mid)" }}
          >
            <span style={{ color: "var(--color-red)" }}>●</span> {p.label}
          </p>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(42px, 7vw, 84px)",
              fontWeight: 800,
              lineHeight: 0.95,
              color: "var(--color-black)",
              letterSpacing: "-0.03em",
              margin: 0,
            }}
          >
            {p.titleLine1}
            <br />
            <span style={{ color: "var(--color-red)" }}>{p.titleLine2}</span>
          </h2>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          initial={prefersReducedMotion ? false : "hidden"}
          animate={animate}
          className="grid grid-cols-1 md:grid-cols-3 gap-[2px]"
        >
          {plans.map((plan, i) => {
            const th = themes[plan.variant];
            return (
              <motion.div
                key={plan.tier}
                custom={i}
                variants={cardVariants}
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  backgroundColor: th.bg,
                  border: th.border,
                  padding: "40px 36px",
                  cursor: "pointer",
                  transition: "transform 0.35s ease, box-shadow 0.35s ease",
                  transform: hovered === i ? "translateY(-6px)" : "translateY(0)",
                  boxShadow: hovered === i ? "0 12px 32px rgba(0,0,0,0.18)" : "none",
                  position: "relative",
                  overflow: "hidden",
                  textAlign: isMobile ? "center" : "left",
                }}
              >
                {/* Tier number */}
                <div
                  style={{
                    position: "absolute",
                    top: 24,
                    right: 28,
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    letterSpacing: "0.2em",
                    color: th.tierColor,
                    fontWeight: 500,
                  }}
                >
                  {plan.tier}
                </div>

                {/* Tag */}
                <div
                  style={{
                    display: "inline-block",
                    fontFamily: "var(--font-mono)",
                    fontSize: 10,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    fontWeight: 500,
                    color: th.tagText,
                    backgroundColor: th.tagBg,
                    padding: "4px 10px",
                    marginBottom: 28,
                    border: `1px solid ${th.tagBorder}`,
                  }}
                >
                  {p.tags[plan.tagKey]}
                </div>

                {/* Name */}
                <h3
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 32,
                    fontWeight: 800,
                    textTransform: "uppercase",
                    letterSpacing: "-0.02em",
                    color: th.name,
                    margin: "0 0 8px 0",
                  }}
                >
                  {p.names[plan.nameKey]}
                </h3>

                {/* Price */}
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 48,
                    fontWeight: 800,
                    color: th.price,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    marginBottom: 6,
                  }}
                >
                  {plan.price}{" "}
                  <span style={{ fontSize: 16, fontWeight: 500, opacity: 0.7 }}>€</span>
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    color: th.from,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginBottom: 28,
                  }}
                >
                  {p.from}
                </div>

                {/* Divider */}
                <div
                  style={{
                    height: 1,
                    background: th.divider,
                    marginBottom: 24,
                  }}
                />

                {/* Description */}
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: th.desc,
                    marginBottom: 24,
                  }}
                >
                  {p.descriptions[plan.descKey]}
                </p>

                {/* Items */}
                <ul style={{ listStyle: "none", padding: 0, margin: "0 0 36px 0" }}>
                  {p.items[plan.itemsKey].map((item, j) => (
                    <li
                      key={j}
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: 12,
                        color: th.item,
                        padding: "6px 0",
                        borderBottom: `1px solid ${th.itemBorder}`,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: isMobile ? "center" : "flex-start",
                        gap: 8,
                      }}
                    >
                      <span style={{ color: th.itemArrow, fontSize: 16, lineHeight: 1 }}>→</span>
                      {item}
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={`/contact?formula=${plan.nameKey}`}
                  style={{
                    display: "block",
                    textAlign: "center",
                    width: "100%",
                    padding: "14px 24px",
                    backgroundColor: th.ctaBg,
                    color: th.ctaText,
                    border: `2px solid ${th.ctaBorder}`,
                    fontFamily: "var(--font-mono)",
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: "0.2em",
                    textTransform: "uppercase",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    textDecoration: "none",
                  }}
                >
                  {p.ctas[plan.ctaKey]} →
                </a>

                {/* Lien exemple projet */}
                {plan.exampleProjectId && (
                  <a
                    href={`/projects?project=${plan.exampleProjectId}`}
                    style={{
                      display: "block",
                      textAlign: "center",
                      marginTop: 14,
                      fontFamily: "var(--font-mono)",
                      fontSize: 11,
                      fontWeight: 500,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      color: th.desc,
                      textDecoration: "none",
                      borderBottom: `1px solid transparent`,
                      paddingBottom: 2,
                      transition: "color 0.2s ease, border-color 0.2s ease",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = th.name;
                      (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = th.name;
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = th.desc;
                      (e.currentTarget as HTMLAnchorElement).style.borderBottomColor = "transparent";
                    }}
                  >
                    {p.seeExample} →
                  </a>
                )}
              </motion.div>
            );
          })}
        </motion.div>

        {/* SaaS footer */}
        <motion.div
          initial={prefersReducedMotion ? false : { opacity: 0 }}
          animate={isInView || prefersReducedMotion ? { opacity: 1 } : undefined}
          transition={{ delay: 0.7, duration: 0.6 }}
          style={{
            marginTop: 2,
            backgroundColor: "var(--color-yellow)",
            padding: "28px 36px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 16,
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: 11,
                letterSpacing: "0.2em",
                textTransform: "uppercase",
                color: "rgba(26,26,24,0.55)",
                fontWeight: 500,
                display: "block",
                marginBottom: 4,
              }}
            >
              {p.complex.label}
            </span>
            <span
              style={{
                fontFamily: "var(--font-display)",
                fontSize: 20,
                fontWeight: 800,
                color: "var(--color-black)",
                letterSpacing: "-0.02em",
                textTransform: "uppercase",
              }}
            >
              {p.complex.title}
            </span>
          </div>
          <a
            href="/contact?formula=custom"
            style={{
              padding: "14px 32px",
              backgroundColor: "var(--color-black)",
              color: "var(--color-bg-primary)",
              border: "none",
              fontFamily: "var(--font-mono)",
              fontSize: 11,
              fontWeight: 600,
              letterSpacing: "0.2em",
              textTransform: "uppercase",
              cursor: "pointer",
              textDecoration: "none",
              whiteSpace: "nowrap",
            }}
          >
            {p.complex.cta} →
          </a>
        </motion.div>
      </div>
    </section>
  );
}
