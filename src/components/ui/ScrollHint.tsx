"use client";

import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

interface ScrollHintProps {
  visible: boolean;
}

export default function ScrollHint({ visible }: ScrollHintProps) {
  const shouldReduce = useReducedMotion();

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] }}
          style={{
            position: "absolute",
            bottom: "28px",
            left: "50%",
            transform: "translateX(-50%)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "6px",
            zIndex: 20,
            pointerEvents: "none",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "11px",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.12em",
              color: "var(--color-gray-mid)",
            }}
          >
            Scroll
          </span>
          <motion.span
            animate={shouldReduce ? {} : { y: [0, 6, 0] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{
              display: "block",
              width: "1px",
              height: "28px",
              background:
                "linear-gradient(to bottom, var(--color-gray-mid), transparent)",
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
