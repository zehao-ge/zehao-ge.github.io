"use client";

import { site } from "@/content/site";
import { useNameLanguage } from "@/components/NameLanguageContext";
import { useParticleSwap } from "@/components/useParticleSwap";

const SWEEP = 380;
const LAG = 25;

export function ParticleName() {
  const { lang, toggleLang } = useNameLanguage();
  const targetText = lang === "en" ? site.header.heading : site.identity.chineseName;
  const targetLabel = lang === "en" ? site.ui.nameToggleToChinese : site.ui.nameToggleToEnglish;
  const { displayedText, elementRef, stageRef, textRef, canvasRef, animatingRef } = useParticleSwap<HTMLHeadingElement>({
    targetText,
    sweep: SWEEP,
    lag: LAG,
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
        <span className="particle-name-measure" aria-hidden="true">{site.identity.chineseName}</span>
        <span ref={textRef} className="particle-name-text">{displayedText}</span>
        <canvas ref={canvasRef} className="particle-name-canvas" aria-hidden="true" />
      </span>
      <span id="profile-name-instruction" className="sr-only">{targetLabel}</span>
    </h1>
  );
}
