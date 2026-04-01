import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary":   "var(--color-bg-primary)",
        "bg-secondary": "var(--color-bg-secondary)",
        "bg-accent":    "var(--color-bg-accent)",
        red:            "var(--color-red)",
        "red-dark":     "var(--color-red-dark)",
        yellow:         "var(--color-yellow)",
        "yellow-light": "var(--color-yellow-light)",
        black:          "var(--color-black)",
        "gray-dark":    "var(--color-gray-dark)",
        "gray-mid":     "var(--color-gray-mid)",
        "gray-light":   "var(--color-gray-light)",
        white:          "var(--color-white)",
        "text-primary":   "var(--color-text-primary)",
        "text-secondary": "var(--color-text-secondary)",
        "text-muted":     "var(--color-text-muted)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        serif:   ["var(--font-serif)"],
        mono:    ["var(--font-mono)"],
        body:    ["var(--font-body)"],
      },
      borderColor: {
        DEFAULT: "var(--color-border)",
        strong:  "var(--color-border-strong)",
      },
      letterSpacing: {
        tight: "-0.03em",
      },
    },
  },
  plugins: [],
};
export default config;
