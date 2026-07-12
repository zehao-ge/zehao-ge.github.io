"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { site } from "@/content/site";

const SWEEP = 900;
const LAG = 260;
const FRAME_MS = 1000 / 60;
const SAMPLE_DENSITY = 0.42;

type Point = { x: number; y: number };
type Sample = { points: Point[]; textWidth: number };
type DustParticle = Point & {
  delay: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  fade: number;
};
type ReformParticle = Point & {
  startX: number;
  startY: number;
  delay: number;
  duration: number;
  lift: number;
  sway: number;
};

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function sampleText(text: string, stage: HTMLElement, textElement: HTMLElement, dpr: number): Sample {
  const bounds = stage.getBoundingClientRect();
  const width = Math.max(1, Math.ceil(bounds.width));
  const height = Math.max(1, Math.ceil(bounds.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(width * dpr);
  canvas.height = Math.ceil(height * dpr);
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return { points: [], textWidth: width };

  const style = getComputedStyle(textElement);
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  context.font = style.font || `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  context.fillStyle = "#000";

  const metrics = context.measureText(text);
  const fontSize = Number.parseFloat(style.fontSize) || 44;
  const ascent = metrics.actualBoundingBoxAscent || fontSize * 0.8;
  const descent = metrics.actualBoundingBoxDescent || fontSize * 0.2;
  const baseline = (height - ascent - descent) / 2 + ascent;
  context.fillText(text, 0, baseline);

  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
  const points: Point[] = [];
  const scanWidth = Math.min(width, Math.ceil(metrics.width) + 2);
  for (let y = 0; y < height; y += 1) {
    const pixelY = Math.min(canvas.height - 1, Math.floor((y + 0.5) * dpr));
    for (let x = 0; x < scanWidth; x += 1) {
      const pixelX = Math.min(canvas.width - 1, Math.floor((x + 0.5) * dpr));
      const alpha = pixels[(pixelY * canvas.width + pixelX) * 4 + 3];
      if (alpha > 90 && Math.random() < SAMPLE_DENSITY) points.push({ x, y });
    }
  }

  return { points, textWidth: Math.max(1, metrics.width) };
}

export function ParticleName() {
  const [showChinese, setShowChinese] = useState(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const stageRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const animatingRef = useRef(false);
  const currentText = showChinese ? site.identity.chineseName : site.header.heading;
  const targetLabel = showChinese ? site.ui.nameToggleToEnglish : site.ui.nameToggleToChinese;

  useEffect(() => () => {
    if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
  }, []);

  const toggleName = () => {
    if (animatingRef.current) return;

    const heading = headingRef.current;
    const stage = stageRef.current;
    const textElement = textRef.current;
    const canvas = canvasRef.current;
    if (!heading || !stage || !textElement || !canvas) return;

    const nextChinese = !showChinese;
    const nextText = nextChinese ? site.identity.chineseName : site.header.heading;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setShowChinese(nextChinese);
      return;
    }

    if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    animationFrameRef.current = null;
    animatingRef.current = true;

    const previousTransition = heading.style.transition;
    const previousTransform = heading.style.transform;
    heading.style.transition = "none";
    heading.style.transform = "scale(1)";
    void heading.offsetHeight;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const source = sampleText(currentText, stage, textElement, dpr);
    const target = sampleText(nextText, stage, textElement, dpr);
    const bounds = stage.getBoundingClientRect();
    const width = Math.max(1, Math.ceil(bounds.width));
    const height = Math.max(1, Math.ceil(bounds.height));
    canvas.width = Math.ceil(width * dpr);
    canvas.height = Math.ceil(height * dpr);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    const context = canvas.getContext("2d");

    requestAnimationFrame(() => {
      heading.style.transition = previousTransition;
      heading.style.transform = previousTransform;
    });

    if (!context || source.points.length === 0 || target.points.length === 0) {
      animatingRef.current = false;
      setShowChinese(nextChinese);
      return;
    }

    const color = getComputedStyle(heading).color;
    const dust: DustParticle[] = source.points.map((point) => {
      const random = Math.random();
      return {
        ...point,
        delay: (point.x / source.textWidth) * SWEEP + Math.random() * 60,
        vx: 1 + random * 2.2,
        vy: (Math.random() - 0.62) * 1,
        ax: 0.18 + Math.random() * 0.13,
        ay: -0.024 - Math.random() * 0.024,
        fade: -0.036 - Math.random() * 0.024,
      };
    });
    const reform: ReformParticle[] = target.points.map((point) => {
      const random = Math.random();
      return {
        ...point,
        startX: point.x + 40 + Math.random() * (width * 0.35),
        startY: height - 4 - Math.random() * 12,
        delay: (point.x / target.textWidth) * SWEEP + LAG + Math.random() * 70,
        duration: 60 + Math.random() * 26,
        lift: -20 - Math.random() * 26,
        sway: (random - 0.5) * 16,
      };
    });
    const finishAt = Math.max(...reform.map((particle) => particle.delay + particle.duration * FRAME_MS));

    textElement.style.color = "transparent";
    canvas.style.opacity = "1";
    let startedAt: number | null = null;

    const render = (timestamp: number) => {
      startedAt ??= timestamp;
      const elapsed = timestamp - startedAt;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, width, height);
      context.fillStyle = color;

      dust.forEach((particle) => {
        if (elapsed < particle.delay) {
          context.globalAlpha = 1;
          context.fillRect(particle.x, particle.y, 1, 1);
          return;
        }
        const age = (elapsed - particle.delay) / FRAME_MS;
        const opacity = Math.max(0, 1 + particle.fade * age);
        if (opacity <= 0) return;
        context.globalAlpha = opacity;
        context.fillRect(
          particle.x + particle.vx * age + 0.5 * particle.ax * age * age,
          particle.y + particle.vy * age + 0.5 * particle.ay * age * age,
          1,
          1,
        );
      });

      reform.forEach((particle) => {
        if (elapsed < particle.delay) return;
        const age = (elapsed - particle.delay) / FRAME_MS;
        const progress = Math.min(age / particle.duration, 1);
        const eased = easeOutCubic(progress);
        const arc = Math.sin(progress * Math.PI);
        context.globalAlpha = Math.min(1, age * 0.05);
        context.fillRect(
          particle.startX + (particle.x - particle.startX) * eased + particle.sway * arc,
          particle.startY + (particle.y - particle.startY) * eased + particle.lift * arc,
          1,
          1,
        );
      });
      context.globalAlpha = 1;

      if (elapsed < finishAt) {
        animationFrameRef.current = requestAnimationFrame(render);
        return;
      }

      flushSync(() => setShowChinese(nextChinese));
      textElement.style.color = "";
      canvas.style.opacity = "0";
      context.clearRect(0, 0, width, height);
      animationFrameRef.current = null;
      animatingRef.current = false;
    };

    animationFrameRef.current = requestAnimationFrame(render);
  };

  return (
    <h1
      ref={headingRef}
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
        <span ref={textRef} className="particle-name-text">{currentText}</span>
        <canvas ref={canvasRef} className="particle-name-canvas" aria-hidden="true" />
      </span>
      <span id="profile-name-instruction" className="sr-only">{targetLabel}</span>
    </h1>
  );
}
