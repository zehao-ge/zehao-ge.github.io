"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, delay = 0, className, priority = false }: { children: ReactNode; delay?: number; className?: string; priority?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className={className}
        initial={reduced || priority ? false : { opacity: 0, y: 24 }}
        whileInView={reduced || priority ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay, ease: [0.28, 0.11, 0.32, 1] }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
