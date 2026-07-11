"use client";

import { useEffect, useState } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 0);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  return (
    <header className={`nav-shell${scrolled ? " nav-scrolled" : ""}`}>
      <nav className="nav-inner" aria-label={site.ui.primaryNavigation}>
        <a className="nav-name" href="#top" onClick={() => setOpen(false)}>{site.identity.name}</a>
        <div className={`nav-links${open ? " nav-links-open" : ""}`}>
          {site.navigation.map((item) => (
            <a key={item.href} href={item.href} onClick={() => setOpen(false)}>
              {item.label}
            </a>
          ))}
        </div>
        <div className="nav-actions">
          <ThemeToggle />
          <a className="cv-pill" href="/cv/GeZehao_CV.pdf">{site.ui.cv}</a>
          <button className={`menu-toggle${open ? " menu-toggle-open" : ""}`} type="button" onClick={() => setOpen(!open)} aria-expanded={open} aria-label={open ? site.ui.menuClose : site.ui.menuOpen}>
            <span /><span />
          </button>
        </div>
      </nav>
    </header>
  );
}
