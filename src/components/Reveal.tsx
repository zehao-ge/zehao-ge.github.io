"use client";

import { LazyMotion, domAnimation, m, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, className, priority = false }: { children: ReactNode; className?: string; priority?: boolean }) {
  const reduced = useReducedMotion();
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className={className}
        initial={reduced || priority ? false : { opacity: 0 }}
        whileInView={reduced || priority ? undefined : { opacity: 1 }}
        viewport={{ once: true, margin: "-10% 0px" }}
        transition={{ duration: reduced ? 0 : 0.6, ease: [0.28, 0.11, 0.32, 1] }}
      >
        {children}
      </m.div>
    </LazyMotion>
  );
}
