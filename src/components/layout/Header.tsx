"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { fadeIn } from "@/lib/animations";
import { useLang } from "@/lib/i18n/context";

interface NavLink {
  label: string;
  href: string;
}

export default function Header() {
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();
  const rafRef = useRef<number | null>(null);
  const { lang, t, toggleLang } = useLang();

  const NAV_LINKS: NavLink[] = [
    { label: t.header.nav.projects, href: "/projects" },
    { label: t.header.nav.stack, href: "/stack" },
    { label: t.header.nav.about, href: "/about" },
    { label: t.header.nav.contact, href: "/contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop;
        const scrollHeight =
          document.documentElement.scrollHeight -
          document.documentElement.clientHeight;
        setScrolled(scrollTop > 12);
        setScrollProgress(scrollHeight > 0 ? scrollTop / scrollHeight : 0);
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        role="banner"
        variants={shouldReduceMotion ? undefined : fadeIn}
        initial={shouldReduceMotion ? undefined : "hidden"}
        animate={shouldReduceMotion ? undefined : "visible"}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backgroundColor: "var(--color-bg-primary)",
          borderBottom: scrolled
            ? "1px solid var(--color-border)"
            : "1px solid transparent",
          transition: "border-color 0.3s ease",
        }}
      >
        <div
          className="px-6 md:px-16 lg:px-24"
          style={{
            maxWidth: "1400px",
            margin: "0 auto",
            height: "64px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo */}
          <a
            href="/"
            aria-label="MG — Retour à l'accueil"
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1.375rem",
              letterSpacing: "-0.03em",
              color: "var(--color-black)",
              textDecoration: "none",
              lineHeight: 1,
            }}
          >
            MG
          </a>

          {/* Desktop nav */}
          <nav aria-label={t.header.ariaNav} className="hidden md:flex items-center gap-10">
            <ul
              style={{
                display: "flex",
                alignItems: "center",
                gap: "2.5rem",
                listStyle: "none",
                margin: 0,
                padding: 0,
              }}
            >
              {NAV_LINKS.map(({ label, href }) => (
                <li key={href}>
                  <NavItem label={label} href={href} />
                </li>
              ))}
            </ul>
            {/* Language toggle */}
            <button
              onClick={toggleLang}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.7rem",
                letterSpacing: "0.1em",
                color: "var(--color-gray-mid)",
                background: "none",
                border: "1px solid var(--color-border-strong)",
                cursor: "pointer",
                padding: "4px 10px",
                transition: "color 0.2s, border-color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--color-black)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-black)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLButtonElement).style.color = "var(--color-gray-mid)";
                (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--color-border-strong)";
              }}
              aria-label={lang === "fr" ? "Switch to English" : "Passer en français"}
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
          </nav>

          {/* Hamburger button — mobile only */}
          <button
            className="md:hidden"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? t.header.ariaClose : t.header.ariaOpen}
            aria-expanded={menuOpen}
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              padding: "4px",
              display: "flex",
              flexDirection: "column",
              gap: "5px",
              zIndex: 60,
            }}
          >
            <span
              style={{
                display: "block",
                width: "22px",
                height: "1.5px",
                backgroundColor: "var(--color-black)",
                transition: "transform 0.2s ease, opacity 0.2s ease",
                transform: menuOpen ? "translateY(6.5px) rotate(45deg)" : "none",
              }}
            />
            <span
              style={{
                display: "block",
                width: "22px",
                height: "1.5px",
                backgroundColor: "var(--color-black)",
                transition: "opacity 0.2s ease",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              style={{
                display: "block",
                width: "22px",
                height: "1.5px",
                backgroundColor: "var(--color-black)",
                transition: "transform 0.2s ease, opacity 0.2s ease",
                transform: menuOpen ? "translateY(-6.5px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>

        {/* Scroll progress bar */}
        <div
          role="progressbar"
          aria-valuenow={Math.round(scrollProgress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={t.header.ariaProgress}
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            height: "2px",
            width: "100%",
            pointerEvents: "none",
          }}
        >
          <div
            style={{
              height: "100%",
              backgroundColor: "var(--color-red)",
              transform: `scaleX(${scrollProgress})`,
              transformOrigin: "left center",
              willChange: "transform",
              backfaceVisibility: "hidden",
            }}
          />
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={shouldReduceMotion ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.25, ease: [0.25, 0.46, 0.45, 0.94] }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 40,
              backgroundColor: "var(--color-bg-primary)",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "2.5rem",
            }}
          >
            {NAV_LINKS.map(({ label, href }) => (
              <a
                key={href}
                href={href}
                onClick={closeMenu}
                style={{
                  fontFamily: "var(--font-mono)",
                  fontWeight: 500,
                  fontSize: "1.25rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase" as const,
                  textDecoration: "none",
                  color: "var(--color-black)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-red)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLAnchorElement).style.color = "var(--color-black)";
                }}
              >
                {label}
              </a>
            ))}
            <button
              onClick={() => { toggleLang(); closeMenu(); }}
              style={{
                fontFamily: "var(--font-mono)",
                fontSize: "0.75rem",
                letterSpacing: "0.1em",
                color: "var(--color-gray-mid)",
                background: "none",
                border: "1px solid var(--color-border-strong)",
                cursor: "pointer",
                padding: "8px 20px",
                marginTop: "8px",
              }}
            >
              {lang === "fr" ? "EN" : "FR"}
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavItem({ label, href }: NavLink) {
  const [hovered, setHovered] = useState<boolean>(false);
  const shouldReduceMotion = useReducedMotion();

  return (
    <a
      href={href}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-mono)",
        fontWeight: 500,
        fontSize: "0.75rem",
        letterSpacing: "0.08em",
        textTransform: "uppercase" as const,
        textDecoration: "none",
        color: hovered ? "var(--color-red)" : "var(--color-gray-dark)",
        transition: shouldReduceMotion ? "none" : "color 0.2s ease",
      }}
    >
      {label}
    </a>
  );
}
