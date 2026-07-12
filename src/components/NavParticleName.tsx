"use client";

import { site } from "@/content/site";
import { useParticleSwap } from "@/components/useParticleSwap";

const SWEEP = 220;
const LAG = 20;

export function NavParticleName({ targetText }: { targetText: string }) {
  const { displayedText, elementRef, stageRef, textRef, canvasRef } = useParticleSwap<HTMLSpanElement>({
    targetText,
    sweep: SWEEP,
    lag: LAG,
  });

  return (
    <span ref={elementRef} className="nav-name-rest nav-particle-name">
      <span ref={stageRef} className="nav-particle-stage">
        <span className="nav-particle-measure" aria-hidden="true">{site.identity.chineseName}</span>
        <span className="nav-particle-measure" aria-hidden="true">{site.identity.navWordmark}</span>
        <span ref={textRef} className="nav-particle-text">{displayedText}</span>
        <canvas ref={canvasRef} className="nav-particle-canvas" aria-hidden="true" />
      </span>
    </span>
  );
}
