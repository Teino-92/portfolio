"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

const TYPED_TEXT = "Matteo Garbugli";
const TYPING_START_DELAY_MS = 700;

function useTypewriter(target: string, startDelayMs: number, enabled: boolean) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!enabled) {
      setCount(target.length);
      return;
    }
    setCount(0);
    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const startId = setTimeout(() => {
      const tick = (i: number) => {
        if (cancelled || i > target.length) return;
        setCount(i);
        if (i === target.length) return;
        const ch = target[i];
        const delay = ch === " " ? 25 : 35 + Math.random() * 60;
        timeouts.push(setTimeout(() => tick(i + 1), delay));
      };
      tick(0);
    }, startDelayMs);
    timeouts.push(startId);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, [target, startDelayMs, enabled]);

  return count;
}

export default function AnimatedLogo() {
  const shouldReduce = useReducedMotion();
  const typedCount = useTypewriter(TYPED_TEXT, TYPING_START_DELAY_MS, !shouldReduce);

  const containerStyle = {
    display: "inline-grid",
    gridTemplateColumns: "1fr",
    gap: "4px",
    lineHeight: 1,
  } as const;

  const mgStyle = {
    fontFamily: "var(--font-display)",
    fontWeight: 800,
    fontSize: "32px",
    letterSpacing: "-0.03em",
    color: "var(--color-black)",
    lineHeight: 1,
    textAlign: "center" as const,
  };

  const bandStyle = {
    backgroundColor: "var(--color-black)",
    padding: "3px 8px",
    textAlign: "center" as const,
    lineHeight: 1.2,
    fontFamily: "var(--font-mono)",
    fontWeight: 500,
    fontSize: "9px",
    letterSpacing: "0.18em",
    textTransform: "uppercase" as const,
    color: "var(--color-white)",
  };

  if (shouldReduce) {
    return (
      <div style={containerStyle}>
        <span style={mgStyle}>MG</span>
        <span style={bandStyle}>{TYPED_TEXT}</span>
      </div>
    );
  }

  const visible = TYPED_TEXT.slice(0, typedCount);

  return (
    <div style={containerStyle}>
      {/* MG — slide droite→gauche + flou→net */}
      <motion.span
        initial={{ opacity: 0, x: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
        transition={{
          duration: 0.7,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        style={{
          ...mgStyle,
          willChange: "transform, filter, opacity",
        }}
      >
        MG
      </motion.span>

      {/* Bandeau noir + typewriter avec caret inline */}
      <div style={{ ...bandStyle, position: "relative" }}>
        {/* Phantom invisible pour réserver la largeur finale */}
        <span
          aria-hidden="true"
          style={{
            display: "inline-block",
            whiteSpace: "pre",
            visibility: "hidden",
          }}
        >
          {TYPED_TEXT}
        </span>
        {/* Texte typé + caret superposé, aligné à gauche du phantom */}
        <span
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "0 8px",
          }}
        >
          <span style={{ whiteSpace: "pre" }}>
            {visible}
            <motion.span
              aria-hidden="true"
              initial={{ opacity: 1 }}
              animate={{ opacity: [1, 1, 0, 0, 1] }}
              transition={{
                duration: 1.0,
                repeat: Infinity,
                times: [0, 0.5, 0.5, 1, 1],
                ease: "linear",
              }}
              style={{
                display: "inline-block",
                width: "0.55em",
                height: "1em",
                backgroundColor: "var(--color-white)",
                verticalAlign: "middle",
                marginLeft: "1px",
                transform: "translateY(-1px)",
              }}
            />
          </span>
        </span>
      </div>
    </div>
  );
}
