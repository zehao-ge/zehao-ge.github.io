"use client";

import { site } from "@/content/site";

export function ThemeToggle() {
  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    document.documentElement.style.colorScheme = next ? "dark" : "light";
    localStorage.setItem("theme", next ? "dark" : "light");
  }

  return (
    <button className="theme-toggle" type="button" onClick={toggle} aria-label={site.ui.toggleTheme}>
      <span className="theme-glyph theme-glyph-light" aria-hidden="true">{site.ui.themeGlyphLight}</span>
      <span className="theme-glyph theme-glyph-dark" aria-hidden="true">{site.ui.themeGlyphDark}</span>
    </button>
  );
}
