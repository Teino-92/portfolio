"use client";

import { useReducedMotion } from "framer-motion";
import { useLang } from "@/lib/i18n/context";

interface Props {
  tags: string[];
  active: string;
  onChange: (tag: string) => void;
}

export default function ProjectsFilter({ tags, active, onChange }: Props) {
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLang();

  return (
    <div
      style={{
        position: "sticky",
        top: "64px",
        zIndex: 30,
        backgroundColor: "var(--color-bg-primary)",
        borderBottom: "1px solid var(--color-border)",
      }}
    >
      <div
        className="px-6 md:px-16 lg:px-24"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          paddingTop: "16px",
          paddingBottom: "16px",
          display: "flex",
          flexWrap: "wrap",
          gap: "8px",
          alignItems: "center",
        }}
      >
        <span
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "10px",
            color: "var(--color-gray-mid)",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginRight: "8px",
          }}
        >
          Filter
        </span>
        {[{ key: "all", label: t.projectsPage.filterAll }, ...tags.map((tag) => ({ key: tag, label: tag }))].map(({ key, label }) => {
          const isActive = active === key;
          return (
            <button
              key={key}
              onClick={() => onChange(key)}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "11px",
                textTransform: "uppercase",
                letterSpacing: "0.06em",
                padding: "5px 12px",
                border: isActive
                  ? "1px solid var(--color-red)"
                  : "1px solid var(--color-border-strong)",
                backgroundColor: isActive ? "var(--color-red)" : "transparent",
                color: isActive ? "var(--color-white)" : "var(--color-gray-dark)",
                cursor: "pointer",
                transition: prefersReducedMotion
                  ? "none"
                  : "background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease",
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-black)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--color-black)";
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border-strong)";
                  (e.currentTarget as HTMLButtonElement).style.color = "var(--color-gray-dark)";
                }
              }}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
