"use client";

import { site } from "@/content/site";
import { useParticleSwap } from "@/components/useParticleSwap";

const NAV_PARTICLES = {
  sweep: 260,
  lag: 22,
  dyingDensity: 1,
  rebornDensity: 1,
  velocityBase: 0.9,
  velocityRange: 1.1,
  accelerationBase: 0.09,
  accelerationRange: 0.07,
  reachBase: 10,
  reachRange: 12,
  verticalJitter: 0.1,
  reformDurationBase: 8,
  reformDurationRange: 5,
} as const;

export function NavParticleName({ targetText }: { targetText: string }) {
  const { displayedText, elementRef, stageRef, textRef, canvasRef } = useParticleSwap<HTMLSpanElement>({
    targetText,
    parameters: NAV_PARTICLES,
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
