"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion, useInView, useReducedMotion, AnimatePresence } from "framer-motion";
// useInView used in StackClient hero
import { fadeUp, staggerContainer } from "@/lib/animations";

type Skill = {
  label: string;
  core: boolean;
  description: string;
};

type Domain = {
  id: string;
  label: string;
  color: string;
  angle: number; // degrees, starting top
  skills: Skill[];
};

const DOMAINS: Domain[] = [
  {
    id: "frontend",
    label: "Frontend",
    color: "var(--color-red)",
    angle: 0,
    skills: [
      { label: "Next.js", core: true, description: "App Router, SSR/SSG, API routes — mon framework principal depuis 2023." },
      { label: "React", core: true, description: "Hooks, Context, composition de composants — base de tout ce que je construis." },
      { label: "TypeScript", core: true, description: "Strict mode, types génériques, inférence — plus de bugs silencieux." },
      { label: "Tailwind CSS", core: true, description: "Utility-first CSS — rapidité d'exécution sans sacrifier la rigueur." },
      { label: "Framer Motion", core: false, description: "Animations déclaratives, transitions de layout, AnimatePresence." },
      { label: "GSAP", core: false, description: "ScrollTrigger pour les effets cinématiques au scroll." },
    ],
  },
  {
    id: "backend",
    label: "Backend",
    color: "var(--color-yellow)",
    angle: 90,
    skills: [
      { label: "Ruby on Rails", core: true, description: "MVC complet, ActiveRecord, Hotwire — mon outil de prédilection pour aller vite." },
      { label: "Node.js", core: true, description: "API REST, Edge functions, workers asynchrones." },
      { label: "PostgreSQL", core: true, description: "Schémas relationnels, row-level security, requêtes complexes." },
      { label: "Redis", core: false, description: "Cache, sessions, queues — pour les systèmes qui doivent tenir la charge." },
      { label: "REST & GraphQL", core: false, description: "Design d'API propres, documentation, versioning." },
      { label: "Prisma", core: false, description: "ORM TypeScript-first pour les projets Next.js." },
    ],
  },
  {
    id: "web3",
    label: "Web3",
    color: "#6C8EF5",
    angle: 180,
    skills: [
      { label: "Solidity", core: true, description: "Smart contracts ERC-20/721/2981, patterns proxy, sécurité on-chain." },
      { label: "Ethers.js", core: true, description: "Interaction avec les contrats, gestion des wallets, events." },
      { label: "Hardhat", core: false, description: "Tests de contrats, déploiement, fork de mainnet pour les tests." },
      { label: "The Graph", core: false, description: "Indexation des events blockchain — rendre la blockchain requêtable." },
      { label: "Wagmi", core: false, description: "Hooks React pour connecter une app web à un wallet crypto." },
      { label: "IPFS", core: false, description: "Stockage décentralisé pour les métadonnées NFT." },
    ],
  },
  {
    id: "ops",
    label: "IA & Outils",
    color: "var(--color-gray-mid)",
    angle: 270,
    skills: [
      { label: "OpenAI API", core: true, description: "Intégration LLM, prompting, streaming, function calling." },
      { label: "Claude Code", core: true, description: "Développement assisté par IA — de la conception au déploiement, dans le terminal." },
      { label: "Vercel AI SDK", core: true, description: "Streaming côté serveur, RAG patterns, edge-compatible." },
      { label: "LangChain", core: false, description: "Chains, agents, mémoire conversationnelle pour les apps IA." },
      { label: "Figma", core: false, description: "Design de maquettes, prototypes, handoff développeur." },
      { label: "GitHub Actions", core: false, description: "CI/CD, tests automatisés, déploiements conditionnels." },
      { label: "Docker", core: false, description: "Containerisation, environnements reproductibles." },
    ],
  },
];

// SVG radar chart dimensions
const SIZE = 340;
const CENTER = SIZE / 2;
const MAX_RADIUS = 120;
const LEVELS = 4;

function polarToCartesian(angle: number, radius: number) {
  const rad = ((angle - 90) * Math.PI) / 180;
  return {
    x: CENTER + radius * Math.cos(rad),
    y: CENTER + radius * Math.sin(rad),
  };
}

function RadarChart({
  domains,
  activeDomain,
  onHover,
}: {
  domains: Domain[];
  activeDomain: string | null;
  onHover: (id: string | null) => void;
}) {
  const prefersReducedMotion = useReducedMotion();
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion) { setAnimated(true); return; }
    const t = setTimeout(() => setAnimated(true), 400);
    return () => clearTimeout(t);
  }, [prefersReducedMotion]);

  // Visual weights per domain — purely aesthetic, not correlated to skill list
  // frontend=0.85, backend=0.85, web3=0.60, ops=0.95
  const VISUAL_WEIGHTS: Record<string, number> = {
    frontend: 0.85,
    backend: 0.85,
    web3: 0.60,
    ops: 0.95,
  };
  const domainScores = domains.map((d) => VISUAL_WEIGHTS[d.id] ?? 0.8);

  // Polygon points
  const polygonPoints = domains.map((d, i) => {
    const r = animated ? domainScores[i] * MAX_RADIUS : 0;
    return polarToCartesian(d.angle, r);
  });

  const polygonPath = polygonPoints
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ") + " Z";

  return (
    <svg
      width={SIZE}
      height={SIZE}
      viewBox={`0 0 ${SIZE} ${SIZE}`}
      style={{ overflow: "visible" }}
      aria-hidden="true"
    >
      {/* Grid circles */}
      {Array.from({ length: LEVELS }).map((_, i) => {
        const r = ((i + 1) / LEVELS) * MAX_RADIUS;
        return (
          <circle
            key={i}
            cx={CENTER}
            cy={CENTER}
            r={r}
            fill="none"
            stroke="var(--color-border)"
            strokeWidth="1"
          />
        );
      })}

      {/* Axis lines */}
      {domains.map((d) => {
        const outer = polarToCartesian(d.angle, MAX_RADIUS + 8);
        return (
          <line
            key={d.id}
            x1={CENTER}
            y1={CENTER}
            x2={outer.x}
            y2={outer.y}
            stroke="var(--color-border)"
            strokeWidth="1"
          />
        );
      })}

      {/* Filled polygon */}
      <motion.path
        d={polygonPath}
        fill="var(--color-red)"
        fillOpacity={0.08}
        stroke="var(--color-red)"
        strokeWidth="1.5"
        strokeOpacity={0.4}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.3 }}
      />

      {/* Axis labels + dots */}
      {domains.map((d, i) => {
        const labelPos = polarToCartesian(d.angle, MAX_RADIUS + 28);
        const dotPos = polarToCartesian(d.angle, domainScores[i] * MAX_RADIUS);
        const isActive = activeDomain === d.id;

        return (
          <g key={d.id}>
            {/* Dot on polygon vertex */}
            <motion.circle
              cx={dotPos.x}
              cy={dotPos.y}
              r={isActive ? 7 : 5}
              fill={isActive ? d.color : "var(--color-red)"}
              style={{ cursor: "pointer", transition: "r 0.2s" }}
              onMouseEnter={() => onHover(d.id)}
              onMouseLeave={() => onHover(null)}
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.4, delay: 0.5 + i * 0.1 }}
            />
            {/* Pulse ring on active */}
            {isActive && (
              <motion.circle
                cx={dotPos.x}
                cy={dotPos.y}
                r={12}
                fill="none"
                stroke={d.color}
                strokeWidth="1"
                initial={{ scale: 0.5, opacity: 1 }}
                animate={{ scale: 1.8, opacity: 0 }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
            {/* Label */}
            <text
              x={labelPos.x}
              y={labelPos.y}
              textAnchor="middle"
              dominantBaseline="middle"
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                fill: isActive ? d.color : "var(--color-gray-mid)",
                cursor: "pointer",
                transition: "fill 0.2s",
                userSelect: "none",
              }}
              onMouseEnter={() => onHover(d.id)}
              onMouseLeave={() => onHover(null)}
            >
              {d.label}
            </text>
          </g>
        );
      })}

      {/* Center dot */}
      <circle cx={CENTER} cy={CENTER} r={3} fill="var(--color-red)" />
    </svg>
  );
}

function SkillItem({ skill, color, index }: { skill: Skill; color: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.35, delay: index * 0.05, ease: [0.25, 0.46, 0.45, 0.94] }}
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
        padding: "8px 0",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <motion.span
        animate={{ color: skill.core ? color : "var(--color-border-strong)" }}
        transition={{ duration: 0.3 }}
        style={{ fontSize: "8px", flexShrink: 0 }}
      >
        ●
      </motion.span>
      <span style={{
        fontFamily: "var(--font-mono)",
        fontSize: "13px",
        color: skill.core ? "var(--color-black)" : "var(--color-gray-dark)",
        fontWeight: skill.core ? 500 : 400,
      }}>
        {skill.label}
      </span>
    </motion.div>
  );
}

export default function StackClient() {
  const [activeDomain, setActiveDomain] = useState<string>("frontend");
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const prefersReducedMotion = useReducedMotion();

  const activeDomainData = DOMAINS.find((d) => d.id === activeDomain) ?? DOMAINS[0];

  // On hover-in: switch domain. On hover-out: keep last hovered (ignore null).
  const handleHover = useCallback((id: string | null) => {
    if (id !== null) setActiveDomain(id);
  }, []);

  return (
    <>
      {/* Hero */}
      <section style={{
        backgroundColor: "var(--color-bg-primary)",
        paddingTop: "120px",
        paddingBottom: "64px",
        borderBottom: "1px solid var(--color-border)",
      }}>
        <motion.div
          ref={heroRef}
          className="px-6 md:px-16 lg:px-24"
          style={{ maxWidth: "1400px", margin: "0 auto" }}
          initial={prefersReducedMotion ? false : "hidden"}
          animate={isHeroInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          <motion.p
            variants={prefersReducedMotion ? undefined : fadeUp}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--color-gray-mid)",
              textTransform: "uppercase",
              letterSpacing: "0.2em",
              marginBottom: "16px",
            }}
          >
            <span style={{ color: "var(--color-red)" }}>●</span> Stack technique
          </motion.p>
          <motion.h1
            variants={prefersReducedMotion ? undefined : fadeUp}
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(40px, 6vw, 72px)",
              color: "var(--color-black)",
              lineHeight: 1.05,
              margin: "0 0 20px",
              letterSpacing: "-0.02em",
            }}
          >
            L&apos;outillage.
          </motion.h1>
          <motion.p
            variants={prefersReducedMotion ? undefined : fadeUp}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              color: "var(--color-gray-mid)",
            }}
          >
            Survolez les axes du radar pour explorer chaque domaine.
          </motion.p>
        </motion.div>
      </section>

      {/* Main — radar + skills */}
      <section style={{ backgroundColor: "var(--color-bg-primary)", padding: "80px 0 96px" }}>
        <div className="px-6 md:px-16 lg:px-24" style={{ maxWidth: "1400px", margin: "0 auto" }}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

            {/* Left — Radar */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "32px" }}>
              <RadarChart
                domains={DOMAINS}
                activeDomain={activeDomain}
                onHover={handleHover}
              />

              {/* Domain tabs — mobile fallback */}
              <div
                className="flex flex-wrap gap-2 justify-center lg:hidden"
              >
                {DOMAINS.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => setActiveDomain(d.id)}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.06em",
                      padding: "6px 14px",
                      border: `1px solid ${activeDomain === d.id ? d.color : "var(--color-border-strong)"}`,
                      color: activeDomain === d.id ? d.color : "var(--color-gray-dark)",
                      background: "none",
                      cursor: "pointer",
                      transition: "all 0.2s",
                    }}
                  >
                    {d.label}
                  </button>
                ))}
              </div>

              {/* Legend */}
              <p style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                color: "var(--color-gray-mid)",
                textAlign: "center",
                fontStyle: "italic",
              }}>
                <motion.span
                  animate={{ color: activeDomainData.color }}
                  transition={{ duration: 0.3 }}
                >●</motion.span> core stack
              </p>
            </div>

            {/* Right — Skills detail */}
            <div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeDomainData.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.25 }}
                >
                  {/* Domain header */}
                  <div style={{
                    borderLeft: `3px solid ${activeDomainData.color}`,
                    paddingLeft: "20px",
                    marginBottom: "32px",
                  }}>
                    <p style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "var(--color-gray-mid)",
                      textTransform: "uppercase",
                      letterSpacing: "0.1em",
                      marginBottom: "6px",
                    }}>
                      Domaine
                    </p>
                    <h2 style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: "clamp(28px, 3vw, 40px)",
                      color: "var(--color-black)",
                      lineHeight: 1.1,
                    }}>
                      {activeDomainData.label}
                    </h2>
                  </div>

                  {/* Skills list */}
                  <div style={{ marginBottom: "40px" }}>
                    {activeDomainData.skills.map((skill, i) => (
                      <SkillItem
                        key={skill.label}
                        skill={skill}
                        color={activeDomainData.color}
                        index={i}
                      />
                    ))}
                  </div>

                  {/* Skill descriptions */}
                  <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                    {activeDomainData.skills.filter((s) => s.core).map((skill) => (
                      <div
                        key={skill.label}
                        style={{
                          display: "flex",
                          gap: "12px",
                          padding: "12px 16px",
                          backgroundColor: "var(--color-bg-secondary)",
                          borderLeft: `2px solid ${activeDomainData.color}`,
                        }}
                      >
                        <div>
                          <p style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "12px",
                            fontWeight: 500,
                            color: "var(--color-black)",
                            marginBottom: "3px",
                          }}>
                            {skill.label}
                          </p>
                          <p style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "13px",
                            color: "var(--color-gray-mid)",
                            lineHeight: 1.6,
                          }}>
                            {skill.description}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
