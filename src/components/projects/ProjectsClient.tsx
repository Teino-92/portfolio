"use client";

import { useMemo, useState, useRef } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { projects } from "@/lib/data/projects";
import type { Project } from "@/lib/data/projects";
import ProjectsFilter from "./ProjectsFilter";
import ProjectDeepDive from "./ProjectDeepDive";
import { fadeUp, staggerContainer } from "@/lib/animations";
import { useLang } from "@/lib/i18n/context";

const statusColors = {
  production: { color: "#2D9B5A", bg: "rgba(45,155,90,0.12)" },
  prototype:  { color: "#F2A622", bg: "rgba(242,166,34,0.12)" },
  archived:   { color: "#7A7870", bg: "rgba(122,120,112,0.12)" },
  development:{ color: "#4A90D9", bg: "rgba(74,144,217,0.12)" },
};

function ProjectCard({
  project,
  onClick,
  index,
}: {
  project: Project;
  onClick: () => void;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const { t } = useLang();
  const statusConfig = {
    production:  { label: t.status.production,  ...statusColors.production },
    prototype:   { label: t.status.prototype,   ...statusColors.prototype },
    archived:    { label: t.status.archived,    ...statusColors.archived },
    development: { label: t.status.development, ...statusColors.development },
  };
  const status = statusConfig[project.status];

  return (
    <motion.div
      ref={ref}
      initial={prefersReducedMotion ? false : { opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 0.5,
        delay: prefersReducedMotion ? 0 : index * 0.08,
        ease: [0.25, 0.46, 0.45, 0.94],
      }}
    >
      <button
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          width: "100%",
          textAlign: "left",
          background: "none",
          border: "none",
          cursor: "pointer",
          padding: 0,
        }}
        aria-label={`Voir les détails de ${project.title}`}
      >
        <div
          style={{
            backgroundColor: "var(--color-bg-secondary)",
            padding: "32px",
            borderLeft: hovered ? "3px solid var(--color-red)" : "3px solid transparent",
            transition: "border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease",
            transform: hovered ? "translateY(-2px)" : "translateY(0)",
            boxShadow: hovered ? "0 8px 24px rgba(26,26,24,0.08)" : "none",
            height: "100%",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Background preview image */}
          {project.image && (
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url(${project.image})`,
                backgroundSize: "cover",
                backgroundPosition: "top center",
                opacity: hovered ? 0.35 : 0.18,
                transition: "opacity 0.4s ease",
                pointerEvents: "none",
              }}
            />
          )}
          {/* Gradient scrim — ensures text legibility over dark images */}
          {project.image && (
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, rgba(237,232,222,0.75) 0%, rgba(237,232,222,0.55) 100%)",
                pointerEvents: "none",
                zIndex: 0,
              }}
            />
          )}
          {/* Card content — above background image */}
          <div style={{ position: "relative", zIndex: 1 }}>
          {/* Top row */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              marginBottom: "16px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
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
                  fontSize: "10px",
                  color: status.color,
                  backgroundColor: status.bg,
                  padding: "2px 7px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                }}
              >
                {status.label}
              </span>
            </div>
            <span
              style={{
                color: hovered ? "var(--color-red)" : "var(--color-gray-light)",
                fontSize: "18px",
                transition: "color 0.2s, transform 0.2s",
                transform: hovered ? "translate(2px, -2px)" : "none",
                display: "block",
              }}
            >
              →
            </span>
          </div>

          {/* Title */}
          <h2
            style={{
              fontFamily: "var(--font-serif)",
              fontStyle: "italic",
              fontSize: "clamp(22px, 3vw, 28px)",
              color: "var(--color-black)",
              margin: "0 0 8px",
              lineHeight: 1.1,
            }}
          >
            {project.title}
          </h2>

          {/* Tagline */}
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              color: project.image ? "var(--color-gray-dark)" : "var(--color-gray-mid)",
              margin: "0 0 20px",
              lineHeight: 1.5,
            }}
          >
            {project.tagline}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "10px",
                  textTransform: "uppercase",
                  letterSpacing: "0.06em",
                  padding: "3px 8px",
                  backgroundColor: "var(--color-yellow)",
                  color: "var(--color-black)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
          </div>{/* end content wrapper */}
        </div>
      </button>
    </motion.div>
  );
}

export default function ProjectsClient() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });
  const { t } = useLang();

  // Collect all unique tags
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    projects.forEach((p) => p.tags.forEach((t) => tagSet.add(t)));
    return Array.from(tagSet);
  }, []);

  // Filter projects — archived always last
  const filtered = useMemo(() => {
    const list = activeFilter === "all" ? projects : projects.filter((p) => p.tags.includes(activeFilter));
    return [...list].sort((a, b) => {
      if (a.status === "archived" && b.status !== "archived") return 1;
      if (a.status !== "archived" && b.status === "archived") return -1;
      return 0;
    });
  }, [activeFilter]);

  return (
    <>
      {/* Hero */}
      <section
        style={{
          backgroundColor: "var(--color-bg-secondary)",
          paddingTop: "120px",
          paddingBottom: "64px",
          borderBottom: "1px solid var(--color-border)",
        }}
      >
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
            {t.projectsPage.label}
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
            {t.projectsPage.title}
          </motion.h1>

          <motion.p
            variants={prefersReducedMotion ? undefined : fadeUp}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "13px",
              color: "var(--color-gray-mid)",
              letterSpacing: "0.04em",
            }}
          >
            {projects.length.toString().padStart(2, "0")} {t.projectsPage.subtitle}
          </motion.p>
        </motion.div>
      </section>

      {/* Filters */}
      <ProjectsFilter
        tags={allTags}
        active={activeFilter}
        onChange={setActiveFilter}
      />

      {/* Grid */}
      <section
        style={{
          backgroundColor: "var(--color-bg-primary)",
          paddingBottom: "96px",
        }}
      >
        <div
          className="px-6 md:px-16 lg:px-24"
          style={{ maxWidth: "1400px", margin: "0 auto", paddingTop: "48px" }}
        >
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? (
              <motion.div
                key={activeFilter}
                initial={prefersReducedMotion ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                {filtered.map((project, i) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    onClick={() => setSelectedProject(project)}
                    index={i}
                  />
                ))}
              </motion.div>
            ) : (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "13px",
                  color: "var(--color-gray-mid)",
                  textAlign: "center",
                  padding: "64px 0",
                }}
              >
                {t.projectsPage.empty}
              </motion.p>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Deep dive panel */}
      <ProjectDeepDive
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}
