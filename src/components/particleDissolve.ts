const FRAME_MS = 1000 / 60;

type Point = { x: number; y: number };
type Sample = { points: Point[]; lo: number; hi: number; lineBottom: number };
type DustParticle = Point & {
  delay: number;
  vx: number;
  vy: number;
  ax: number;
  reach: number;
  lifetime: number;
};
type ReformParticle = Point & {
  startX: number;
  startY: number;
  delay: number;
  duration: number;
};

export type ParticleDissolveParameters = {
  sweep: number;
  lag: number;
  dyingDensity: number;
  rebornDensity: number;
  velocityBase: number;
  velocityRange: number;
  accelerationBase: number;
  accelerationRange: number;
  reachBase: number;
  reachRange: number;
  overhangReachBase: number;
  overhangReachRange: number;
  verticalJitter: number;
  reformDurationBase: number;
  reformDurationRange: number;
};

type ParticleDissolveOptions = {
  element: HTMLElement;
  stage: HTMLElement;
  textElement: HTMLElement;
  canvas: HTMLCanvasElement;
  fromText: string;
  targetText: string;
  parameters: ParticleDissolveParameters;
  onComplete: () => void;
};

export type ParticleDissolveController = { cancel: () => void };

function easeOutCubic(progress: number) {
  return 1 - Math.pow(1 - progress, 3);
}

function sampleText(
  text: string,
  stage: HTMLElement,
  textElement: HTMLElement,
  dpr: number,
  density: number,
): Sample {
  const bounds = stage.getBoundingClientRect();
  const width = Math.max(1, Math.ceil(bounds.width));
  const height = Math.max(1, Math.ceil(bounds.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.ceil(width * dpr);
  canvas.height = Math.ceil(height * dpr);
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return { points: [], lo: 0, hi: 0, lineBottom: height - 1 };

  const style = getComputedStyle(textElement);
  context.setTransform(dpr, 0, 0, dpr, 0, 0);
  context.font = `${style.fontStyle} ${style.fontVariant} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
  if ("letterSpacing" in context) context.letterSpacing = style.letterSpacing;
  context.textAlign = "left";
  context.textBaseline = "alphabetic";
  context.fillStyle = "#000";

  const metrics = context.measureText(text);
  const fontSize = Number.parseFloat(style.fontSize) || 44;
  const ascent = metrics.actualBoundingBoxAscent || fontSize * 0.8;
  const descent = metrics.actualBoundingBoxDescent || fontSize * 0.2;
  const baseline = (height - ascent - descent) / 2 + ascent;
  const lineBottom = Math.min(height - 1, Math.max(0, Math.ceil(baseline + descent)));
  context.fillText(text, 0, baseline);

  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
  const points: Point[] = [];
  let lo = Number.POSITIVE_INFINITY;
  let hi = Number.NEGATIVE_INFINITY;
  const scanWidth = Math.min(width, Math.ceil(metrics.width) + 2);
  for (let y = 0; y < height; y += 1) {
    const pixelY = Math.min(canvas.height - 1, Math.floor((y + 0.5) * dpr));
    for (let x = 0; x < scanWidth; x += 1) {
      const pixelX = Math.min(canvas.width - 1, Math.floor((x + 0.5) * dpr));
      const alpha = pixels[(pixelY * canvas.width + pixelX) * 4 + 3];
      if (alpha <= 90) continue;
      lo = Math.min(lo, x);
      hi = Math.max(hi, x);
      if (density >= 1 || Math.random() < density) points.push({ x, y });
    }
  }

  return {
    points,
    lo: Number.isFinite(lo) ? lo : 0,
    hi: Number.isFinite(hi) ? hi : 0,
    lineBottom,
  };
}

export function runParticleDissolve({
  element,
  stage,
  textElement,
  canvas,
  fromText,
  targetText,
  parameters,
  onComplete,
}: ParticleDissolveOptions): ParticleDissolveController {
  const previousTransition = element.style.transition;
  const previousTransform = element.style.transform;
  element.style.transition = "none";
  element.style.transform = "scale(1)";
  void element.offsetHeight;

  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  const source = sampleText(fromText, stage, textElement, dpr, parameters.dyingDensity);
  const target = sampleText(targetText, stage, textElement, dpr, parameters.rebornDensity);
  const bounds = stage.getBoundingClientRect();
  const width = Math.max(1, Math.ceil(bounds.width));
  const height = Math.max(1, Math.ceil(bounds.height));
  const maximumReach = Math.max(
    parameters.reachBase + parameters.reachRange,
    parameters.overhangReachBase + parameters.overhangReachRange,
  );
  const canvasWidth = width + Math.ceil(maximumReach);
  canvas.width = Math.ceil(canvasWidth * dpr);
  canvas.height = Math.ceil(height * dpr);
  canvas.style.width = `${canvasWidth}px`;
  canvas.style.height = `${height}px`;
  const context = canvas.getContext("2d");

  const restoreElementStyles = () => {
    element.style.transition = previousTransition;
    element.style.transform = previousTransform;
  };

  if (!context || source.points.length === 0 || target.points.length === 0) {
    onComplete();
    textElement.style.color = "";
    canvas.style.opacity = "0";
    void element.offsetHeight;
    restoreElementStyles();
    return { cancel: () => undefined };
  }

  const spanSource = Math.max(1, source.hi - source.lo);
  const spanTarget = Math.max(1, target.hi - target.lo);
  const spanFront = Math.min(spanSource, spanTarget);
  const color = getComputedStyle(element).color;
  const dust: DustParticle[] = source.points.map((point) => {
    const rel = (point.x - source.lo) / spanFront;
    const u = Math.min(rel, 1);
    const isOverhang = rel > 1;
    const g = 2.1 - 1.3 * u;
    const vx = isOverhang
      ? (parameters.velocityBase * 0.7 + Math.random() * parameters.velocityRange * 0.8) * g
      : (parameters.velocityBase + Math.random() * parameters.velocityRange) * g;
    const ax = isOverhang
      ? (parameters.accelerationBase * 0.8 + Math.random() * parameters.accelerationRange * 0.8) * g
      : (parameters.accelerationBase + Math.random() * parameters.accelerationRange) * g;
    const reach = isOverhang
      ? parameters.overhangReachBase + Math.random() * parameters.overhangReachRange
      : parameters.reachBase + Math.random() * parameters.reachRange;
    return {
      ...point,
      delay: isOverhang
        ? parameters.sweep + (rel - 1) * parameters.sweep * 0.55 + Math.random() * 24
        : u * parameters.sweep + Math.random() * 14,
      vx,
      vy: (Math.random() * 2 - 1) * parameters.verticalJitter,
      ax,
      reach,
      lifetime: (-vx + Math.sqrt(vx * vx + 2 * ax * reach)) / ax,
    };
  });

  const cornerX = target.lo;
  const cornerY = target.lineBottom;
  const reform: ReformParticle[] = target.points.map((point) => {
    const rel = (point.x - target.lo) / spanFront;
    const startX = cornerX - 6 - Math.random() * 26;
    const startY = cornerY - 2 - Math.random() * 8;
    const distanceToTarget = Math.hypot(point.x - startX, point.y - startY);
    return {
      ...point,
      startX,
      startY,
      delay: rel * parameters.sweep + parameters.lag + Math.random() * 12,
      duration:
        parameters.reformDurationBase
        + Math.random() * parameters.reformDurationRange
        + distanceToTarget * 0.028,
    };
  });

  const dustFinishAt = Math.max(...dust.map((particle) => particle.delay + particle.lifetime * FRAME_MS));
  const reformFinishAt = Math.max(...reform.map((particle) => particle.delay + particle.duration * FRAME_MS));
  const finishAt = Math.max(dustFinishAt, reformFinishAt);

  textElement.style.color = "transparent";
  canvas.style.opacity = "1";
  let animationFrame: number | null = null;
  let startedAt: number | null = null;
  let cancelled = false;

  const clearCanvas = () => {
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, canvasWidth, height);
    canvas.style.opacity = "0";
  };

  const revealRealText = () => {
    element.style.transition = "none";
    element.style.transform = "scale(1)";
    textElement.style.color = "";
    void element.offsetHeight;
    restoreElementStyles();
  };

  const render = (timestamp: number) => {
    if (cancelled) return;
    startedAt ??= timestamp;
    const elapsed = timestamp - startedAt;
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.clearRect(0, 0, canvasWidth, height);
    context.fillStyle = color;

    dust.forEach((particle) => {
      if (elapsed < particle.delay) {
        context.globalAlpha = 1;
        context.fillRect(particle.x + 0.125, particle.y + 0.125, 0.75, 0.75);
        return;
      }
      const age = (elapsed - particle.delay) / FRAME_MS;
      const distance = particle.vx * age + 0.5 * particle.ax * age * age;
      const opacity = Math.max(0, 1 - distance / particle.reach);
      if (opacity <= 0) return;
      context.globalAlpha = opacity;
      context.fillRect(particle.x + distance + 0.125, particle.y + particle.vy * age + 0.125, 0.75, 0.75);
    });

    reform.forEach((particle) => {
      if (elapsed < particle.delay) return;
      const age = (elapsed - particle.delay) / FRAME_MS;
      const progress = Math.min(age / particle.duration, 1);
      const eased = easeOutCubic(progress);
      const size = 0.75 + 0.25 * eased * eased + 0.35 * Math.sin(eased * Math.PI);
      const x = particle.startX + (particle.x - particle.startX) * eased;
      const y = particle.startY + (particle.y - particle.startY) * eased;
      context.globalAlpha = Math.min(1, age * 0.34);
      context.fillRect(x - (size - 1) / 2, y - (size - 1) / 2, size, size);
    });
    context.globalAlpha = 1;

    if (elapsed < finishAt) {
      animationFrame = requestAnimationFrame(render);
      return;
    }

    clearCanvas();
    onComplete();
    revealRealText();
    animationFrame = null;
  };

  animationFrame = requestAnimationFrame(render);

  return {
    cancel: () => {
      cancelled = true;
      if (animationFrame !== null) cancelAnimationFrame(animationFrame);
      animationFrame = null;
      clearCanvas();
      revealRealText();
    },
  };
}
