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
      <svg className="theme-icon" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <circle cx="12" cy="12" r="7.5" fill="none" stroke="currentColor" strokeWidth="1.5" />
        <path d="M12 4.5a7.5 7.5 0 0 0 0 15Z" fill="currentColor" />
      </svg>
    </button>
  );
}
