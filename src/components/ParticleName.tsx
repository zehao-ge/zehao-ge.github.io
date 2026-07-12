"use client";

import { site } from "@/content/site";
import { useNameLanguage } from "@/components/NameLanguageContext";
import { useParticleSwap } from "@/components/useParticleSwap";

const H1_PARTICLES = {
  sweep: 380,
  lag: 25,
  dyingDensity: 0.48,
  rebornDensity: 1,
  velocityBase: 2.6,
  velocityRange: 2.8,
  accelerationBase: 0.26,
  accelerationRange: 0.18,
  reachBase: 28,
  reachRange: 46,
  verticalJitter: 0.15,
  reformDurationBase: 9,
  reformDurationRange: 6,
} as const;

export function ParticleName() {
  const { lang, toggleLang } = useNameLanguage();
  const targetText = lang === "en" ? site.header.heading : site.identity.chineseNameBare;
  const targetLabel = lang === "en" ? site.ui.nameToggleToChinese : site.ui.nameToggleToEnglish;
  const { displayedText, elementRef, stageRef, textRef, canvasRef, animatingRef } = useParticleSwap<HTMLHeadingElement>({
    targetText,
    parameters: H1_PARTICLES,
  });

  const toggleName = () => {
    if (animatingRef.current) return;
    animatingRef.current = true;
    toggleLang();
  };

  return (
    <h1
      ref={elementRef}
      id="profile-title"
      className="particle-name"
      role="button"
      tabIndex={0}
      aria-describedby="profile-name-instruction"
      onClick={toggleName}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          toggleName();
        }
      }}
    >
      <span ref={stageRef} className="particle-name-stage">
        <span className="particle-name-measure" aria-hidden="true">{site.header.heading}</span>
        <span className="particle-name-measure" aria-hidden="true">{site.identity.chineseNameBare}</span>
        <span ref={textRef} className="particle-name-text">{displayedText}</span>
        <canvas ref={canvasRef} className="particle-name-canvas" aria-hidden="true" />
      </span>
      <span id="profile-name-instruction" className="sr-only">{targetLabel}</span>
    </h1>
  );
}
