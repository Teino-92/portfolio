"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Project } from "@/lib/data/projects";

interface Props {
  project: Project | null;
  onClose: () => void;
}

const statusConfig = {
  production: { label: "En production", color: "#2D9B5A", bg: "rgba(45,155,90,0.12)" },
  prototype: { label: "Prototype", color: "#F2A622", bg: "rgba(242,166,34,0.12)" },
  archived: { label: "Archivé", color: "#7A7870", bg: "rgba(122,120,112,0.12)" },
};

type Tab = "business" | "tech" | "code";

function Tooltip({ text, children }: { text: string; children: React.ReactNode }) {
  const [rect, setRect] = useState<DOMRect | null>(null);
  const triggerRef = useRef<HTMLSpanElement>(null);

  const handleMouseEnter = () => {
    if (triggerRef.current) setRect(triggerRef.current.getBoundingClientRect());
  };
  const handleMouseLeave = () => setRect(null);

  const tooltipTop = rect ? rect.bottom + 8 : 0;
  const tooltipLeft = rect ? rect.left : 0;

  return (
    <span
      ref={triggerRef}
      style={{ display: "inline-block" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <span
        style={{
          borderBottom: "1px dashed var(--color-red)",
          cursor: "help",
          color: "var(--color-red)",
          fontFamily: "var(--font-mono)",
          fontSize: "13px",
        }}
      >
        {children}
      </span>
      <AnimatePresence>
        {rect && (
          <motion.div
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 4 }}
            transition={{ duration: 0.15 }}
            style={{
              position: "fixed",
              top: `${tooltipTop}px`,
              left: `${tooltipLeft}px`,
              transform: "none",
              backgroundColor: "var(--color-bg-accent)",
              color: "var(--color-white)",
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              lineHeight: 1.5,
              padding: "10px 14px",
              width: "240px",
              zIndex: 200,
              pointerEvents: "none",
            }}
          >
            {text}
            <span
              style={{
                position: "absolute",
                top: "-4px",
                left: "16px",
                width: 0,
                height: 0,
                borderLeft: "4px solid transparent",
                borderRight: "4px solid transparent",
                borderBottom: "4px solid var(--color-bg-accent)",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}

function CodeBlock({ code, language, caption }: { code: string; language: string; caption: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <div
        style={{
          backgroundColor: "var(--color-bg-accent)",
          borderRadius: 0,
          overflow: "hidden",
        }}
      >
        {/* Header bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "10px 16px",
            borderBottom: "1px solid rgba(253,250,244,0.08)",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: "var(--color-gray-mid)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            {language}
          </span>
          <button
            onClick={handleCopy}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              color: copied ? "var(--color-yellow)" : "var(--color-gray-mid)",
              background: "none",
              border: "none",
              cursor: "pointer",
              transition: "color 0.2s ease",
            }}
          >
            {copied ? "Copié ✓" : "Copier"}
          </button>
        </div>
        {/* Code */}
        <pre
          style={{
            margin: 0,
            padding: "20px",
            overflowX: "auto",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            lineHeight: 1.7,
            color: "var(--color-white)",
          }}
        >
          <code>{code}</code>
        </pre>
      </div>
      <p
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--color-gray-mid)",
          marginTop: "8px",
          fontStyle: "italic",
        }}
      >
        {caption}
      </p>
    </div>
  );
}

export default function ProjectDeepDive({ project, onClose }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const [activeTab, setActiveTab] = useState<Tab>("business");
  const panelRef = useRef<HTMLDivElement>(null);

  // Reset tab when project changes
  useEffect(() => {
    if (project) setActiveTab("business");
  }, [project?.id]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  if (!project) return null;

  const status = statusConfig[project.status];

  const tabs: { id: Tab; label: string }[] = [
    { id: "business", label: "Vue d'ensemble" },
    { id: "tech", label: "Stack & Décisions" },
    { id: "code", label: "Code" },
  ];

  return (
    <AnimatePresence>
      {project && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            style={{
              position: "fixed",
              inset: 0,
              backgroundColor: "rgba(26,26,24,0.7)",
              zIndex: 60,
              backdropFilter: "blur(2px)",
            }}
          />

          {/* Panel */}
          <motion.div
            key="panel"
            ref={panelRef}
            initial={prefersReducedMotion ? false : { x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "fixed",
              top: 0,
              right: 0,
              bottom: 0,
              width: "min(680px, 100vw)",
              backgroundColor: "var(--color-bg-primary)",
              zIndex: 70,
              overflowY: "auto",
              display: "flex",
              flexDirection: "column",
            }}
            role="dialog"
            aria-modal="true"
            aria-label={`Détails du projet ${project.title}`}
          >
            {/* Header */}
            <div
              style={{
                padding: "32px 40px 24px",
                borderBottom: "1px solid var(--color-border)",
                position: "sticky",
                top: 0,
                backgroundColor: "var(--color-bg-primary)",
                zIndex: 10,
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "flex-start",
                  marginBottom: "16px",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      marginBottom: "8px",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: "var(--color-gray-mid)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                      }}
                    >
                      {project.year}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "11px",
                        color: status.color,
                        backgroundColor: status.bg,
                        padding: "2px 8px",
                        textTransform: "uppercase",
                        letterSpacing: "0.06em",
                      }}
                    >
                      {status.label}
                    </span>
                  </div>
                  <h2
                    style={{
                      fontFamily: "var(--font-serif)",
                      fontStyle: "italic",
                      fontSize: "clamp(24px, 4vw, 36px)",
                      color: "var(--color-black)",
                      margin: 0,
                      lineHeight: 1.1,
                    }}
                  >
                    {project.title}
                  </h2>
                  <p
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "13px",
                      color: "var(--color-gray-mid)",
                      margin: "6px 0 0",
                    }}
                  >
                    {project.tagline}
                  </p>
                </div>
                <button
                  onClick={onClose}
                  aria-label="Fermer"
                  style={{
                    background: "none",
                    border: "1px solid var(--color-border)",
                    cursor: "pointer",
                    width: "36px",
                    height: "36px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--color-gray-mid)",
                    fontSize: "18px",
                    flexShrink: 0,
                    transition: "border-color 0.2s, color 0.2s",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-black)";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--color-black)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border)";
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--color-gray-mid)";
                  }}
                >
                  ×
                </button>
              </div>

              {/* Tabs */}
              <div style={{ display: "flex", gap: "0", borderBottom: "1px solid var(--color-border)", marginTop: "8px" }}>
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    style={{
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      textTransform: "uppercase",
                      letterSpacing: "0.08em",
                      color: activeTab === tab.id ? "var(--color-black)" : "var(--color-gray-mid)",
                      background: "none",
                      border: "none",
                      borderBottom: activeTab === tab.id ? "2px solid var(--color-red)" : "2px solid transparent",
                      padding: "8px 16px 10px",
                      cursor: "pointer",
                      transition: "color 0.2s",
                      marginBottom: "-1px",
                    }}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Content */}
            <div style={{ padding: "32px 40px", flex: 1 }}>
              <AnimatePresence mode="wait">
                {activeTab === "business" && (
                  <motion.div
                    key="business"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Problem */}
                    <div style={{ marginBottom: "32px" }}>
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          color: "var(--color-red)",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: "12px",
                        }}
                      >
                        ● Le problème résolu
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-body)",
                          fontSize: "16px",
                          lineHeight: 1.7,
                          color: "var(--color-gray-dark)",
                        }}
                      >
                        {project.problem}
                      </p>
                    </div>

                    {/* Metrics */}
                    <div style={{ marginBottom: "32px" }}>
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          color: "var(--color-red)",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: "16px",
                        }}
                      >
                        ● Résultats clés
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                        {project.metrics.map((metric, i) => (
                          <div
                            key={i}
                            style={{
                              display: "flex",
                              alignItems: "flex-start",
                              gap: "12px",
                              padding: "14px 16px",
                              backgroundColor: "var(--color-bg-secondary)",
                              borderLeft: "3px solid var(--color-yellow)",
                            }}
                          >
                            <span
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "13px",
                                color: "var(--color-text-secondary)",
                                lineHeight: 1.5,
                              }}
                            >
                              {metric}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Tags */}
                    <div style={{ marginBottom: "32px" }}>
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          color: "var(--color-red)",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: "12px",
                        }}
                      >
                        ● Technologies utilisées
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {project.tags.map((tag) => (
                          <span
                            key={tag}
                            style={{
                              fontFamily: "var(--font-mono)",
                              fontSize: "11px",
                              textTransform: "uppercase",
                              letterSpacing: "0.06em",
                              padding: "4px 10px",
                              backgroundColor: "var(--color-bg-accent)",
                              color: "var(--color-white)",
                            }}
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Links */}
                    {(project.url || project.github) && (
                      <div style={{ display: "flex", gap: "12px" }}>
                        {project.url && (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-block",
                              backgroundColor: "var(--color-red)",
                              color: "var(--color-white)",
                              fontFamily: "var(--font-mono)",
                              fontSize: "12px",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              textDecoration: "none",
                              padding: "12px 24px",
                              transition: "background-color 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--color-red-dark)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLAnchorElement).style.backgroundColor = "var(--color-red)";
                            }}
                          >
                            Voir le projet →
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{
                              display: "inline-block",
                              border: "1px solid var(--color-border-strong)",
                              color: "var(--color-black)",
                              fontFamily: "var(--font-mono)",
                              fontSize: "12px",
                              letterSpacing: "0.08em",
                              textTransform: "uppercase",
                              textDecoration: "none",
                              padding: "12px 24px",
                              transition: "border-color 0.2s",
                            }}
                            onMouseEnter={(e) => {
                              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-black)";
                            }}
                            onMouseLeave={(e) => {
                              (e.currentTarget as HTMLAnchorElement).style.borderColor = "var(--color-border-strong)";
                            }}
                          >
                            GitHub
                          </a>
                        )}
                      </div>
                    )}
                  </motion.div>
                )}

                {activeTab === "tech" && (
                  <motion.div
                    key="tech"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {/* Stack with tooltips */}
                    <div style={{ marginBottom: "32px" }}>
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          color: "var(--color-red)",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: "12px",
                        }}
                      >
                        ● Stack technique
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          color: "var(--color-gray-mid)",
                          marginBottom: "16px",
                          fontStyle: "italic",
                        }}
                      >
                        Survolez les termes soulignés pour une explication simple
                      </p>
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                        {project.tags.map((tag) =>
                          project.techTooltips[tag] ? (
                            <Tooltip key={tag} text={project.techTooltips[tag]}>
                              {tag}
                            </Tooltip>
                          ) : (
                            <span
                              key={tag}
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "13px",
                                color: "var(--color-text-secondary)",
                              }}
                            >
                              {tag}
                            </span>
                          )
                        )}
                      </div>
                    </div>

                    {/* Decisions */}
                    <div>
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          color: "var(--color-red)",
                          textTransform: "uppercase",
                          letterSpacing: "0.1em",
                          marginBottom: "16px",
                        }}
                      >
                        ● Décisions d&apos;architecture
                      </p>
                      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                        {project.decisions.map((decision, i) => (
                          <div
                            key={i}
                            style={{
                              borderLeft: "3px solid var(--color-border-strong)",
                              paddingLeft: "20px",
                            }}
                          >
                            <p
                              style={{
                                fontFamily: "var(--font-mono)",
                                fontSize: "13px",
                                color: "var(--color-black)",
                                marginBottom: "6px",
                                lineHeight: 1.5,
                              }}
                            >
                              {decision.technical}
                            </p>
                            <p
                              style={{
                                fontFamily: "var(--font-body)",
                                fontSize: "14px",
                                color: "var(--color-gray-mid)",
                                lineHeight: 1.6,
                                fontStyle: "italic",
                              }}
                            >
                              {decision.plainLanguage}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}

                {activeTab === "code" && (
                  <motion.div
                    key="code"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.2 }}
                  >
                    {project.codeSnippet ? (
                      <>
                        <p
                          style={{
                            fontFamily: "var(--font-mono)",
                            fontSize: "11px",
                            color: "var(--color-red)",
                            textTransform: "uppercase",
                            letterSpacing: "0.1em",
                            marginBottom: "8px",
                          }}
                        >
                          ● Extrait de code significatif
                        </p>
                        <p
                          style={{
                            fontFamily: "var(--font-body)",
                            fontSize: "15px",
                            color: "var(--color-gray-dark)",
                            lineHeight: 1.7,
                            marginBottom: "4px",
                          }}
                        >
                          Ce snippet illustre une décision technique centrale du projet.
                        </p>
                        <CodeBlock
                          code={project.codeSnippet.code}
                          language={project.codeSnippet.language}
                          caption={project.codeSnippet.caption}
                        />
                      </>
                    ) : (
                      <p
                        style={{
                          fontFamily: "var(--font-mono)",
                          fontSize: "13px",
                          color: "var(--color-gray-mid)",
                        }}
                      >
                        Code source non disponible publiquement.
                      </p>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
