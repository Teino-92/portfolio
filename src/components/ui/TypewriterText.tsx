"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  CSSProperties,
  ElementType,
  useEffect,
  useRef,
  useState,
} from "react";

interface TypewriterTextProps {
  text: string;
  el?: ElementType;
  startDelayMs?: number;
  startWhenVisible?: boolean;
  caretColor?: string;
  style?: CSSProperties;
  onDone?: () => void;
}

export default function TypewriterText({
  text,
  el: Tag = "p",
  startDelayMs = 0,
  startWhenVisible = true,
  caretColor = "currentColor",
  style,
  onDone,
}: TypewriterTextProps) {
  const shouldReduce = useReducedMotion();
  const [count, setCount] = useState(0);
  const [active, setActive] = useState(!startWhenVisible);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!startWhenVisible) return;
    const node = containerRef.current;
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.2 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [startWhenVisible]);

  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const doneFiredRef = useRef(false);
  const countRef = useRef(0);

  useEffect(() => {
    if (shouldReduce) {
      setCount(text.length);
      countRef.current = text.length;
      if (!doneFiredRef.current) {
        doneFiredRef.current = true;
        onDoneRef.current?.();
      }
      return;
    }
    if (!active) return;

    let cancelled = false;
    const timeouts: ReturnType<typeof setTimeout>[] = [];

    const startId = setTimeout(() => {
      const tick = (i: number) => {
        if (cancelled || i > text.length) return;
        countRef.current = i;
        setCount(i);
        if (i === text.length) {
          if (!doneFiredRef.current) {
            doneFiredRef.current = true;
            onDoneRef.current?.();
          }
          return;
        }
        const ch = text[i];
        const delay = ch === " " ? 18 : 25 + Math.random() * 45;
        timeouts.push(setTimeout(() => tick(i + 1), delay));
      };
      // Reprend où on était (utile si re-run StrictMode)
      tick(countRef.current);
    }, countRef.current === 0 ? startDelayMs : 0);
    timeouts.push(startId);

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active]);

  const visible = text.slice(0, count);
  const done = count >= text.length;

  return (
    <Tag
      ref={containerRef as never}
      style={{ ...style, position: "relative" }}
    >
      {/* Phantom invisible — réserve la hauteur/largeur finale */}
      <span aria-hidden="true" style={{ visibility: "hidden", whiteSpace: "pre-wrap" }}>
        {text}
      </span>
      <span
        style={{
          position: "absolute",
          inset: 0,
          whiteSpace: "pre-wrap",
        }}
      >
        {visible}
        {!done && !shouldReduce && (
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
              backgroundColor: caretColor,
              verticalAlign: "middle",
              marginLeft: "2px",
              transform: "translateY(-2px)",
            }}
          />
        )}
      </span>
    </Tag>
  );
}
