"use client";

import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from "react";
import { fr } from "./fr";
import { en } from "./en";
import type { Translations } from "./fr";

type Lang = "fr" | "en";

interface LangContextValue {
  lang: Lang;
  t: Translations;
  toggleLang: () => void;
}

const LangContext = createContext<LangContextValue>({
  lang: "fr",
  t: fr,
  toggleLang: () => {},
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("fr");

  // Load from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("lang") as Lang | null;
    if (saved === "fr" || saved === "en") {
      setLang(saved);
    }
  }, []);

  const toggleLang = useCallback(() => {
    setLang((prev) => {
      const next = prev === "fr" ? "en" : "fr";
      localStorage.setItem("lang", next);
      return next;
    });
  }, []);

  const t = lang === "fr" ? fr : en;

  return (
    <LangContext.Provider value={{ lang, t, toggleLang }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  return useContext(LangContext);
}
