"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/content/site";
import { ThemeToggle } from "./ThemeToggle";

type LineCoordinates = readonly [x1: number, y1: number, x2: number, y2: number];

const CLOSED_ICON: readonly LineCoordinates[] = [
  [18, 22, 46, 22],
  [18, 32, 46, 32],
  [18, 42, 46, 42],
];

const OPEN_ICON: readonly LineCoordinates[] = [
  [19.5, 30.5, 32, 18],
  [32, 18, 32, 46],
  [32, 18, 44.5, 30.5],
];

const ICON_DURATION = 340;

function easeOutBack(t: number) {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
}

function setLineCoordinates(line: SVGLineElement | null, coordinates: LineCoordinates) {
  if (!line) return;
  const [x1, y1, x2, y2] = coordinates;
  line.setAttribute("x1", String(x1));
  line.setAttribute("y1", String(y1));
  line.setAttribute("x2", String(x2));
  line.setAttribute("y2", String(y2));
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const iconRef = useRef<SVGSVGElement>(null);
  const lineOneRef = useRef<SVGLineElement>(null);
  const lineTwoRef = useRef<SVGLineElement>(null);
  const lineThreeRef = useRef<SVGLineElement>(null);
  const iconFrameRef = useRef<number | null>(null);
  const iconScaleRef = useRef<Animation | null>(null);
  const currentCoordinatesRef = useRef<LineCoordinates[]>(CLOSED_ICON.map((line) => [...line]));

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

  useEffect(() => {
    const lines = [lineOneRef.current, lineTwoRef.current, lineThreeRef.current];
    const target = open ? OPEN_ICON : CLOSED_ICON;
    const start = currentCoordinatesRef.current.map((line) => [...line] as LineCoordinates);

    if (iconFrameRef.current !== null) cancelAnimationFrame(iconFrameRef.current);
    iconScaleRef.current?.cancel();

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const alreadyAtTarget = start.every((line, lineIndex) =>
      line.every((coordinate, coordinateIndex) => coordinate === target[lineIndex][coordinateIndex]),
    );

    if (reducedMotion || alreadyAtTarget) {
      target.forEach((coordinates, index) => setLineCoordinates(lines[index], coordinates));
      currentCoordinatesRef.current = target.map((line) => [...line]);
      return;
    }

    iconScaleRef.current = iconRef.current?.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(0.85)", offset: 0.4 },
        { transform: "scale(1)" },
      ],
      { duration: ICON_DURATION, easing: "ease-in-out" },
    ) ?? null;

    let startedAt: number | null = null;
    const animateCoordinates = (timestamp: number) => {
      startedAt ??= timestamp;
      const progress = Math.min((timestamp - startedAt) / ICON_DURATION, 1);
      const easedProgress = easeOutBack(progress);
      const next = start.map((line, lineIndex): LineCoordinates => [
        line[0] + (target[lineIndex][0] - line[0]) * easedProgress,
        line[1] + (target[lineIndex][1] - line[1]) * easedProgress,
        line[2] + (target[lineIndex][2] - line[2]) * easedProgress,
        line[3] + (target[lineIndex][3] - line[3]) * easedProgress,
      ]);

      next.forEach((coordinates, index) => setLineCoordinates(lines[index], coordinates));
      currentCoordinatesRef.current = next;

      if (progress < 1) {
        iconFrameRef.current = requestAnimationFrame(animateCoordinates);
      } else {
        target.forEach((coordinates, index) => setLineCoordinates(lines[index], coordinates));
        currentCoordinatesRef.current = target.map((line) => [...line]);
        iconFrameRef.current = null;
      }
    };

    iconFrameRef.current = requestAnimationFrame(animateCoordinates);

    return () => {
      if (iconFrameRef.current !== null) cancelAnimationFrame(iconFrameRef.current);
      iconFrameRef.current = null;
      iconScaleRef.current?.cancel();
      iconScaleRef.current = null;
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
          <a className="connect-pill" href="/connect">{site.ui.connect}</a>
          <button className="menu-toggle" type="button" onClick={() => setOpen((current) => !current)} aria-expanded={open} aria-controls="mobile-navigation" aria-label={open ? site.ui.menuClose : site.ui.menuOpen}>
            <svg ref={iconRef} className="menu-icon" viewBox="0 0 64 64" width="32" height="32" aria-hidden="true" focusable="false">
              <line ref={lineOneRef} stroke="currentColor" strokeWidth="2" strokeLinecap="round" x1="18" y1="22" x2="46" y2="22" />
              <line ref={lineTwoRef} stroke="currentColor" strokeWidth="2" strokeLinecap="round" x1="18" y1="32" x2="46" y2="32" />
              <line ref={lineThreeRef} stroke="currentColor" strokeWidth="2" strokeLinecap="round" x1="18" y1="42" x2="46" y2="42" />
            </svg>
          </button>
        </div>
      </nav>
    </header>
  );
}
