"use client";

import { useEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import {
  runParticleDissolve,
  type ParticleDissolveController,
  type ParticleDissolveParameters,
} from "@/components/particleDissolve";

export function useParticleSwap<T extends HTMLElement>({
  targetText,
  parameters,
}: {
  targetText: string;
  parameters: ParticleDissolveParameters;
}) {
  const [displayedText, setDisplayedText] = useState(targetText);
  const displayedTextRef = useRef(targetText);
  const elementRef = useRef<T>(null);
  const stageRef = useRef<HTMLSpanElement>(null);
  const textRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const controllerRef = useRef<ParticleDissolveController | null>(null);
  const animatingRef = useRef(false);

  useEffect(() => {
    if (displayedTextRef.current === targetText) {
      animatingRef.current = false;
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      displayedTextRef.current = targetText;
      setDisplayedText(targetText);
      animatingRef.current = false;
      return;
    }

    const element = elementRef.current;
    const stage = stageRef.current;
    const textElement = textRef.current;
    const canvas = canvasRef.current;
    if (!element || !stage || !textElement || !canvas) {
      displayedTextRef.current = targetText;
      setDisplayedText(targetText);
      animatingRef.current = false;
      return;
    }

    controllerRef.current?.cancel();
    animatingRef.current = true;
    let completedSynchronously = false;
    const controller = runParticleDissolve({
      element,
      stage,
      textElement,
      canvas,
      fromText: displayedTextRef.current,
      targetText,
      parameters,
      onComplete: () => {
        completedSynchronously = true;
        displayedTextRef.current = targetText;
        flushSync(() => setDisplayedText(targetText));
        animatingRef.current = false;
        controllerRef.current = null;
      },
    });
    controllerRef.current = completedSynchronously ? null : controller;

    return () => {
      controller.cancel();
      if (controllerRef.current === controller) controllerRef.current = null;
      animatingRef.current = false;
    };
  }, [parameters, targetText]);

  return { displayedText, elementRef, stageRef, textRef, canvasRef, animatingRef };
}
