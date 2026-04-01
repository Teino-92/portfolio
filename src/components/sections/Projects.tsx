"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence, useInView, useReducedMotion } from "framer-motion";
import { staggerContainer, fadeUp } from "@/lib/animations";
import { projects, getProjectText, type Project } from "@/lib/data/projects";
import Tag from "@/components/ui/Tag";
import { useLang } from "@/lib/i18n/context";

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { t, lang } = useLang();

  const animate = !prefersReducedMotion && isInView ? "visible" : prefersReducedMotion ? "visible" : "hidden";
  // Homepage selection: izi-rh (large), merci-murphy + metrik as small cards
  const HOMEPAGE_IDS = ["izi-rh", "merci-murphy", "saas-analytics"];
  const homepageProjects = HOMEPAGE_IDS.map((id) => projects.find((p) => p.id === id)).filter(Boolean) as typeof projects;
  const featured = homepageProjects[0];
  const rest = homepageProjects.slice(1);
  const selectedProject = projects.find((p) => p.id === selectedId) ?? null;
  const selectedText = selectedProject ? getProjectText(selectedProject, lang) : null;

  return (
    <>
      <section
        id="projets"
        ref={ref}
        className="py-24 px-6 md:px-16 lg:px-24"
        style={{ backgroundColor: "var(--color-bg-secondary)" }}
      >
        <div className="max-w-[1400px] mx-auto">
          {/* Label */}
          <motion.p
            initial={prefersReducedMotion ? false : "hidden"}
            animate={animate}
            variants={fadeUp}
            className="mb-4 text-xs tracking-[0.22em] uppercase"
            style={{ fontFamily: "var(--font-mono)", color: "var(--color-gray-mid)" }}
          >
            <span style={{ color: "var(--color-red)" }}>●</span> {t.projectsSection.label}
          </motion.p>

          {/* Titre */}
          <motion.h2
            initial={prefersReducedMotion ? false : "hidden"}
            animate={animate}
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
            {t.projectsSection.title}
          </motion.h2>

          {/* Grille */}
          <motion.div
            initial={prefersReducedMotion ? false : "hidden"}
            animate={animate}
            variants={staggerContainer}
            className="grid grid-cols-1 lg:grid-cols-3 gap-4"
          >
            {featured && (
              <motion.div variants={fadeUp} className="lg:col-span-2">
                <ProjectCard
                  project={featured}
                  large
                  onSelect={setSelectedId}
                  details={t.projectsSection.details}
                />
              </motion.div>
            )}

            <div className="flex flex-col gap-4">
              {rest.slice(0, 2).map((project) => (
                <motion.div key={project.id} variants={fadeUp}>
                  <ProjectCard
                    project={project}
                    onSelect={setSelectedId}
                    details={t.projectsSection.details}
                  />
                </motion.div>
              ))}
            </div>

            {rest.slice(2).map((project) => (
              <motion.div key={project.id} variants={fadeUp}>
                <ProjectCard
                  project={project}
                  onSelect={setSelectedId}
                  details={t.projectsSection.details}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Expanded modal */}
      <AnimatePresence>
        {selectedId && selectedProject && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setSelectedId(null)}
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 100,
                backgroundColor: "var(--color-black)",
                cursor: "pointer",
              }}
            />

            {/* Expanded card */}
            <div
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 101,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                padding: "1.5rem",
                pointerEvents: "none",
              }}
            >
              <motion.div
                key={selectedId}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
                style={{
                  backgroundColor: "var(--color-bg-primary)",
                  border: "1px solid var(--color-border)",
                  borderLeft: "3px solid var(--color-red)",
                  padding: "clamp(28px, 5vw, 48px)",
                  maxWidth: "640px",
                  width: "100%",
                  maxHeight: "90vh",
                  overflowY: "auto",
                  position: "relative",
                  pointerEvents: "auto",
                }}
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedId(null)}
                  aria-label={t.projectsSection.close}
                  style={{
                    position: "absolute",
                    top: "20px",
                    right: "20px",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    fontFamily: "var(--font-mono)",
                    fontSize: "18px",
                    color: "var(--color-gray-mid)",
                    lineHeight: 1,
                    padding: "4px 8px",
                  }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--color-black)";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLButtonElement).style.color = "var(--color-gray-mid)";
                  }}
                >
                  ×
                </button>

                {/* Year */}
                <span
                  style={{
                    display: "block",
                    fontFamily: "var(--font-mono)",
                    fontSize: "11px",
                    color: "var(--color-gray-light)",
                    letterSpacing: "0.1em",
                    marginBottom: "16px",
                  }}
                >
                  {selectedProject.year}
                </span>

                {/* Title */}
                <h2
                  style={{
                    fontFamily: "var(--font-serif)",
                    fontSize: "clamp(28px, 4vw, 40px)",
                    color: "var(--color-black)",
                    lineHeight: 1.1,
                    marginBottom: "8px",
                  }}
                >
                  {selectedProject.title}
                </h2>

                {/* Tagline */}
                <p
                  style={{
                    fontFamily: "var(--font-mono)",
                    fontSize: "13px",
                    color: "var(--color-gray-mid)",
                    letterSpacing: "0.05em",
                    marginBottom: "24px",
                  }}
                >
                  {selectedText?.tagline ?? selectedProject.tagline}
                </p>

                {/* Description */}
                <p
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "16px",
                    lineHeight: 1.7,
                    color: "var(--color-text-secondary)",
                    marginBottom: "24px",
                  }}
                >
                  {selectedText?.description ?? selectedProject.description}
                </p>

                {/* Tags */}
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginBottom: "28px" }}>
                  {selectedProject.tags.map((tag) => (
                    <Tag key={tag} label={tag} variant="dark" />
                  ))}
                </div>

                {/* Links */}
                <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
                  {selectedProject.url && (
                    <a
                      href={selectedProject.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase" as const,
                        color: "var(--color-white)",
                        backgroundColor: "var(--color-red)",
                        textDecoration: "none",
                        padding: "10px 20px",
                      }}
                    >
                      {t.projectsSection.viewSite}
                    </a>
                  )}
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{
                        fontFamily: "var(--font-mono)",
                        fontSize: "12px",
                        letterSpacing: "0.1em",
                        textTransform: "uppercase" as const,
                        color: "var(--color-gray-dark)",
                        border: "1px solid var(--color-border-strong)",
                        textDecoration: "none",
                        padding: "10px 20px",
                      }}
                    >
                      GitHub →
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

function ProjectCard({
  project,
  large = false,
  onSelect,
  details,
}: {
  project: Project;
  large?: boolean;
  onSelect: (id: string) => void;
  details: string;
}) {
  const { lang } = useLang();
  const { tagline, description } = getProjectText(project, lang);
  const linkHref = project.url ?? project.github ?? "#";

  const cardContent = (
    <>
      <span
        className="block mb-4"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "11px",
          color: "var(--color-gray-light)",
          letterSpacing: "0.1em",
        }}
      >
        {project.year}
      </span>

      <h3
        className="mb-2"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: large ? "clamp(24px, 3vw, 36px)" : "22px",
          color: "var(--color-black)",
          lineHeight: 1.15,
        }}
      >
        {project.title}
      </h3>

      <p
        className="mb-4"
        style={{
          fontFamily: "var(--font-mono)",
          fontSize: "12px",
          color: project.image ? "var(--color-gray-dark)" : "var(--color-gray-mid)",
          letterSpacing: "0.05em",
        }}
      >
        {tagline}
      </p>

      <p
        className="mb-6 flex-1"
        style={{
          fontFamily: "var(--font-body)",
          fontSize: "15px",
          lineHeight: 1.65,
          color: "var(--color-text-secondary)",
        }}
      >
        {description}
      </p>

      <div className="flex flex-wrap gap-2 mb-6">
        {project.tags.map((tag) => (
          <Tag key={tag} label={tag} variant="dark" />
        ))}
      </div>

      <div className="flex items-center justify-between">
        <button
          onClick={(e) => { e.stopPropagation(); onSelect(project.id); }}
          style={{
            background: "none",
            border: "none",
            cursor: "pointer",
            fontFamily: "var(--font-mono)",
            fontSize: "12px",
            letterSpacing: "0.1em",
            textTransform: "uppercase" as const,
            color: "var(--color-red)",
            padding: 0,
          }}
        >
          {details}
        </button>

        {linkHref !== "#" && (
          <a
            href={linkHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              letterSpacing: "0.1em",
              textTransform: "uppercase" as const,
              color: "var(--color-gray-mid)",
              textDecoration: "none",
            }}
          >
            ↗
          </a>
        )}
      </div>
    </>
  );

  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="group h-full flex flex-col"
      style={{
        backgroundColor: "var(--color-bg-primary)",
        border: "1px solid var(--color-border)",
        borderLeft: "3px solid transparent",
        padding: large ? "40px" : "28px",
        transition: "border-left-color 0.2s ease",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.borderLeftColor = "var(--color-red)";
        setHovered(true);
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.borderLeftColor = "transparent";
        setHovered(false);
      }}
    >
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
      {project.image && (
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to bottom, rgba(245,240,232,0.75) 0%, rgba(245,240,232,0.55) 100%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
      )}
      <div style={{ position: "relative", zIndex: 1 }}>
        {cardContent}
      </div>
    </article>
  );
}
