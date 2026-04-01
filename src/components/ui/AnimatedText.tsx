"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import type { Transition } from "framer-motion";

type AnimatedTextEl = "h1" | "h2" | "h3" | "p" | "span";

type AnimatedTextProps = {
  text: string;
  el?: AnimatedTextEl;
  className?: string;
  style?: React.CSSProperties;
  delay?: number;
};

const charTransition = (wordIndex: number, charIndex: number, delay: number): Transition => ({
  duration: 0.6,
  ease: [0.25, 0.46, 0.45, 0.94],
  delay: delay + wordIndex * 0.12 + charIndex * 0.035,
});

const charVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (custom: { wordIndex: number; charIndex: number; delay: number }) => ({
    opacity: 1,
    y: 0,
    transition: charTransition(custom.wordIndex, custom.charIndex, custom.delay),
  }),
};

export default function AnimatedText({
  text,
  el: El = "p",
  className,
  style,
  delay = 0,
}: AnimatedTextProps) {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const prefersReducedMotion = useReducedMotion();

  const words = text.split(" ");

  if (prefersReducedMotion) {
    return (
      <El ref={ref as React.RefObject<never>} className={className} style={style}>
        {text}
      </El>
    );
  }

  return (
    <El
      ref={ref as React.RefObject<never>}
      className={className}
      style={{ ...style, display: "block" }}
    >
      <span
        style={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          margin: "-1px",
          overflow: "hidden",
          clip: "rect(0,0,0,0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
      >
        {text}
      </span>
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          style={{ display: "inline-block", whiteSpace: "pre" }}
          aria-hidden="true"
        >
          {Array.from(word).map((char, charIndex) => (
            <span
              key={`${char}-${charIndex}`}
              style={{ display: "inline-block", overflow: "hidden" }}
            >
              <motion.span
                style={{ display: "inline-block" }}
                variants={charVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={{ wordIndex, charIndex, delay }}
              >
                {char}
              </motion.span>
            </span>
          ))}
          {wordIndex < words.length - 1 && (
            <span style={{ display: "inline-block" }}>&nbsp;</span>
          )}
        </span>
      ))}
    </El>
  );
}
