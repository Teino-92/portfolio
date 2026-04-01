"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
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

  const toggleLang = useCallback(() => {
    setLang((prev) => (prev === "fr" ? "en" : "fr"));
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
