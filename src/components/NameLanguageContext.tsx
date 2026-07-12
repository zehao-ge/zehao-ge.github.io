"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

export type NameLanguage = "en" | "zh";

type NameLanguageValue = {
  lang: NameLanguage;
  hovering: boolean;
  setHovering: (hovering: boolean) => void;
  toggleLang: () => void;
};

const NameLanguageContext = createContext<NameLanguageValue | null>(null);

export function NameLanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<NameLanguage>("en");
  const [hovering, setHovering] = useState(false);
  const toggleLang = useCallback(() => setLang((current) => current === "en" ? "zh" : "en"), []);
  const value = useMemo(() => ({ lang, hovering, setHovering, toggleLang }), [hovering, lang, toggleLang]);

  return <NameLanguageContext.Provider value={value}>{children}</NameLanguageContext.Provider>;
}

export function useNameLanguage() {
  const value = useContext(NameLanguageContext);
  if (!value) throw new Error("useNameLanguage must be used within NameLanguageProvider");
  return value;
}
