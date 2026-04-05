"use client";

import { useRef, useEffect, useLayoutEffect, useState, useCallback } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeUp } from "@/lib/animations";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLang } from "@/lib/i18n/context";

gsap.registerPlugin(ScrollTrigger);

const EMOJIS = ["🇮🇹", "🏝️", "🌊", "🏖️", "🏪", "🏢", "💻"] as const;

type TimelineItemData = {
  period: string;
  emoji: string;
  title: string;
  location: string;
  description: string;
};

function TimelineCard({ item }: { item: TimelineItemData }) {
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

function TimelineRow({
  item,
  index,
  dotRef,
  active,
}: {
  item: TimelineItemData;
  index: number;
  dotRef: (el: HTMLDivElement | null) => void;
  active: boolean;
}) {
  const rowRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(rowRef, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();
  const isRight = index % 2 === 1;

  const dotEl = (
    <div
      ref={dotRef}
      style={{
        width: "14px",
        height: "14px",
        borderRadius: "50%",
        backgroundColor: active ? "var(--color-red)" : "var(--color-border-strong)",
        border: "2px solid var(--color-bg-secondary)",
        transition: "background-color 0.3s ease, box-shadow 0.3s ease",
        boxShadow: active ? "0 0 0 4px rgba(214,60,42,0.15)" : "none",
        zIndex: 3,
        position: "relative" as const,
        flexShrink: 0,
      }}
    />
  );

  return (
    <motion.div
      ref={rowRef}
      initial={prefersReducedMotion ? false : { opacity: 0, x: isRight ? 40 : -40 }}
      animate={isInView ? { opacity: 1, x: 0 } : undefined}
      transition={{ duration: 0.6, ease: [0.25, 0.46, 0.45, 0.94], delay: 0.1 }}
    >
      {/* Desktop: 2-column with dot at inner edge */}
      <div
        className="hidden lg:grid"
        style={{
          gridTemplateColumns: "1fr 1fr",
          paddingBottom: "3rem",
          gap: "2rem",
        }}
      >
        {/* Left column */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "1.5rem",
            justifyContent: isRight ? "flex-end" : "flex-start",
          }}
        >
          {!isRight && (
            <>
              <div style={{ flex: 1 }}>
                <TimelineCard item={item} />
              </div>
              {dotEl}
            </>
          )}
        </div>

        {/* Right column */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: "1.5rem",
          }}
        >
          {isRight && (
            <>
              {dotEl}
              <div style={{ flex: 1 }}>
                <TimelineCard item={item} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Mobile */}
      <div className="lg:hidden pb-10 pl-8 relative">
        <div
          style={{
            position: "absolute",
            left: 0,
            top: "8px",
            width: "10px",
            height: "10px",
            borderRadius: "50%",
            backgroundColor: active ? "var(--color-red)" : "var(--color-border-strong)",
            transition: "background-color 0.3s ease",
          }}
        />
        <TimelineCard item={item} />
      </div>
    </motion.div>
  );
}

export default function AboutStory() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });
  const prefersReducedMotion = useReducedMotion();
  const { t } = useLang();

  const TIMELINE: TimelineItemData[] = t.aboutStory.items.map((item, i) => ({
    period: item.period,
    emoji: EMOJIS[i] ?? "📍",
    title: item.title,
    location: item.location,
    description: item.body,
  }));

  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const clipRectRef = useRef<SVGRectElement>(null);
  const lineMobileRef = useRef<HTMLDivElement>(null);
  const dotRefs = useRef<(HTMLDivElement | null)[]>([]);
  const containerHeightRef = useRef(0);

  const [activeFlags, setActiveFlags] = useState<boolean[]>(() =>
    Array(TIMELINE.length).fill(false)
  );
  const [pathD, setPathD] = useState("");

  const setDotRef = useCallback((el: HTMLDivElement | null, index: number) => {
    dotRefs.current[index] = el;
  }, []);

  // Build SVG path — S-curves through each dot
  const buildPath = useCallback(() => {
    const container = containerRef.current;
    if (!container || dotRefs.current.length === 0) return "";

    const cRect = container.getBoundingClientRect();
    const points = dotRefs.current
      .filter((d): d is HTMLDivElement => d !== null)
      .map((dot) => {
        const r = dot.getBoundingClientRect();
        return {
          x: r.left + r.width / 2 - cRect.left,
          y: r.top + r.height / 2 - cRect.top,
        };
      });

    if (points.length < 2) return "";

    let d = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const curr = points[i];
      const next = points[i + 1];
      const midY = (curr.y + next.y) / 2;
      // S-curve: control points stay at curr.x then next.x at the midpoint height
      d += ` C ${curr.x} ${midY}, ${next.x} ${midY}, ${next.x} ${next.y}`;
    }
    return d;
  }, []);

  // Build path after Framer Motion animations settle
  useEffect(() => {
    const timer = setTimeout(() => setPathD(buildPath()), 900);
    return () => clearTimeout(timer);
  }, [buildPath]);

  // Rebuild on resize
  useEffect(() => {
    const handleResize = () => setPathD(buildPath());
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [buildPath]);

  // Immediately set clip rect to 0 height before browser paints
  useLayoutEffect(() => {
    const clipRect = clipRectRef.current;
    if (!pathD || !clipRect) return;
    clipRect.setAttribute("height", "0");
  }, [pathD]);

  // Keep SVG sized to container
  useEffect(() => {
    const svg = svgRef.current;
    const container = containerRef.current;
    if (!svg || !container) return;
    const sync = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      containerHeightRef.current = h;
      svg.setAttribute("width", String(w));
      svg.setAttribute("height", String(h));
      svg.setAttribute("viewBox", `0 0 ${w} ${h}`);
      if (clipRectRef.current) {
        clipRectRef.current.setAttribute("width", String(w + 100));
      }
    };
    sync();
    const ro = new ResizeObserver(sync);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  // Scroll-driven animation
  useEffect(() => {
    if (prefersReducedMotion) {
      setActiveFlags(Array(TIMELINE.length).fill(true));
      if (clipRectRef.current) {
        clipRectRef.current.setAttribute("height", String(containerHeightRef.current + 100));
      }
      return;
    }

    const clipRect = clipRectRef.current;
    const container = containerRef.current;
    const lineMobile = lineMobileRef.current;
    if (!container) return;

    const triggers: ScrollTrigger[] = [];

    if (clipRect && pathD) {
      const trig = ScrollTrigger.create({
        trigger: container,
        start: "top 70%",
        end: "bottom 70%",
        scrub: 0.8,
        onUpdate: (self) => {
          const progress = self.progress;
          const h = containerHeightRef.current * progress;
          clipRect.setAttribute("height", String(h));

          // Activate/deactivate dots bidirectionally
          setActiveFlags(() =>
            dotRefs.current.map((dot, i) => {
              if (!dot) return false;
              const dotFraction = dotRefs.current.length <= 1 ? 0 : i / (dotRefs.current.length - 1);
              return progress >= dotFraction - 0.02;
            })
          );
        },
      });
      triggers.push(trig);
    }

    if (lineMobile) {
      gsap.set(lineMobile, { scaleY: 0, transformOrigin: "top center" });
      const trig = ScrollTrigger.create({
        trigger: container,
        start: "top 70%",
        end: "bottom 70%",
        scrub: 0.8,
        onUpdate: (self) => {
          gsap.set(lineMobile, { scaleY: self.progress });
        },
      });
      triggers.push(trig);
    }

    return () => triggers.forEach((t) => t.kill());
  }, [prefersReducedMotion, TIMELINE.length, pathD]);

  return (
    <section
      id="parcours"
      ref={sectionRef}
      className="py-24 px-6 md:px-16 lg:px-24"
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
    >
      <div className="max-w-[1400px] mx-auto">
        <motion.p
          initial={prefersReducedMotion ? false : "hidden"}
          animate={isInView ? "visible" : "hidden"}
          variants={fadeUp}
          className="mb-4 text-xs tracking-[0.22em] uppercase"
          style={{ fontFamily: "var(--font-mono)", color: "var(--color-gray-mid)" }}
        >
          <span style={{ color: "var(--color-red)" }}>●</span> {t.aboutStory.label}
        </motion.p>

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
          {t.aboutStory.title}
        </motion.h2>

        <div className="relative" ref={containerRef}>
          {/* Desktop SVG path */}
          <svg
            ref={svgRef}
            className="hidden lg:block absolute inset-0"
            style={{
              overflow: "visible",
              pointerEvents: "none",
              zIndex: 1,
            }}
          >
            <defs>
              <clipPath id="timeline-clip">
                <rect ref={clipRectRef} x="-50" y="0" width="0" height="0" />
              </clipPath>
            </defs>
            <path
              ref={pathRef}
              d={pathD}
              fill="none"
              stroke="var(--color-red)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray="12 8"
              clipPath="url(#timeline-clip)"
            />
          </svg>

          {/* Mobile ghost line */}
          <div
            className="lg:hidden absolute left-[4px] top-[8px] bottom-0"
            style={{ width: "1px", backgroundColor: "var(--color-border)" }}
          />
          {/* Mobile animated line */}
          <div
            ref={lineMobileRef}
            className="lg:hidden absolute left-[4px] top-[8px] bottom-0"
            style={{
              width: "2px",
              backgroundColor: "var(--color-red)",
              transformOrigin: "top center",
              pointerEvents: "none",
              zIndex: 1,
            }}
          />

          {TIMELINE.map((item, index) => (
            <TimelineRow
              key={item.title}
              item={item}
              index={index}
              dotRef={(el) => setDotRef(el, index)}
              active={activeFlags[index]}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
