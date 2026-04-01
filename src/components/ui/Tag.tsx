type TagVariant = "yellow" | "dark";

type TagProps = {
  label: string;
  variant?: TagVariant;
};

const styles: Record<TagVariant, React.CSSProperties> = {
  yellow: {
    backgroundColor: "var(--color-yellow)",
    color: "var(--color-black)",
  },
  dark: {
    backgroundColor: "var(--color-bg-accent)",
    color: "var(--color-yellow-light)",
  },
};

export default function Tag({ label, variant = "dark" }: TagProps) {
  return (
    <span
      style={{
        ...styles[variant],
        fontFamily: "var(--font-mono)",
        fontSize: "11px",
        fontWeight: 500,
        letterSpacing: "0.1em",
        textTransform: "uppercase" as const,
        padding: "3px 8px",
        display: "inline-block",
        lineHeight: 1.6,
      }}
    >
      {label}
    </span>
  );
}
