"use client";

import { useLang } from "@/lib/i18n/context";

const externalLinks = [
  { label: "GitHub", href: "https://github.com/Teino-92" },
  { label: "LinkedIn", href: "https://linkedin.com/in/m-garbugli" },
];

const linkStyle: React.CSSProperties = {
  fontFamily: "var(--font-mono)",
  fontWeight: 400,
  fontSize: "0.75rem",
  color: "var(--color-gray-mid)",
  textDecoration: "none",
  transition: "color 0.2s ease",
};

export default function Footer() {
  const { t } = useLang();

  const navLinks = [
    { label: t.header.nav.projects, href: "/projects" },
    { label: t.header.nav.stack, href: "/stack" },
    { label: t.header.nav.about, href: "/about" },
    { label: t.header.nav.contact, href: "/contact" },
  ];

  return (
    <footer
      style={{ backgroundColor: "var(--color-bg-accent)" }}
      aria-label={t.footer.aria}
    >
      <div
        className="px-6 md:px-16 lg:px-24 grid grid-cols-1 md:grid-cols-2 gap-12 py-16"
        style={{ maxWidth: "1400px", margin: "0 auto" }}
      >
        {/* Left — identity */}
        <div>
          <p
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "2rem",
              color: "var(--color-white)",
              lineHeight: 1,
              marginBottom: "0.75rem",
              letterSpacing: "-0.03em",
            }}
          >
            MG
          </p>
          <p
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.75rem",
              color: "var(--color-gray-mid)",
              textTransform: "uppercase" as const,
              letterSpacing: "0.04em",
            }}
          >
            {t.footer.tagline}
          </p>
        </div>

        {/* Right — two link columns */}
        <div className="grid grid-cols-2 gap-8">
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                color: "var(--color-gray-mid)",
                textTransform: "uppercase" as const,
                letterSpacing: "0.08em",
                marginBottom: "1rem",
              }}
            >
              {t.footer.nav}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {navLinks.map((link) => (
                <li key={link.href} style={{ marginBottom: "0.5rem" }}>
                  <a
                    href={link.href}
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-white)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-gray-mid)";
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.6875rem",
                color: "var(--color-gray-mid)",
                textTransform: "uppercase" as const,
                letterSpacing: "0.08em",
                marginBottom: "1rem",
              }}
            >
              {t.footer.links}
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
              {externalLinks.map((link) => (
                <li key={link.href} style={{ marginBottom: "0.5rem" }}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={linkStyle}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-white)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-gray-mid)";
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        className="px-6 md:px-16 lg:px-24 flex flex-wrap justify-between items-center gap-2 py-5"
        style={{
          maxWidth: "1400px",
          margin: "0 auto",
          borderTop: "1px solid rgba(253, 250, 244, 0.08)",
        }}
      >
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--color-gray-mid)" }}>
          {t.footer.rights}
        </p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "0.6875rem", color: "var(--color-gray-mid)" }}>
          {t.footer.made}
        </p>
      </div>
    </footer>
  );
}
