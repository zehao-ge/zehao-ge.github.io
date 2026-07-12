"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;

    const closeOnOutsidePress = (event: PointerEvent) => {
      if (!headerRef.current?.contains(event.target as Node)) setOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    document.addEventListener("pointerdown", closeOnOutsidePress);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeOnOutsidePress);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [open]);

  return (
    <header ref={headerRef} className={`nav-shell${scrolled ? " nav-scrolled" : ""}`}>
      <nav className="nav-inner" aria-label={site.ui.primaryNavigation}>
        <a className="nav-name" href="#top" onClick={() => setOpen(false)}>{site.identity.navWordmark}</a>
        <div id="mobile-navigation" className={`nav-links${open ? " nav-links-open" : ""}`}>
          {site.navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <ThemeToggle />
          <a className="cv-pill" href="/cv/GeZehao_CV.pdf">{site.ui.cv}</a>
          <button className={`menu-toggle${open ? " menu-toggle-open" : ""}`} type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? site.ui.menuClose : site.ui.menuOpen}>
            <span /><span />
          </button>
        </div>
      </nav>
    </header>
  );
}
