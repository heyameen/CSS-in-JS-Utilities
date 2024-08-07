import { CSSProperties } from "react";

type KeyframeStyles = Record<string, CSSProperties>;
type AnimationDirection =
  | "normal"
  | "reverse"
  | "alternate"
  | "alternate-reverse";
type AnimationFillMode = "none" | "forwards" | "backwards" | "both";
type AnimationPlayState = "running" | "paused";

export const keyframe = (name: string, frames: KeyframeStyles): string => {
  const keyframeString = Object.entries(frames)
    .map(([key, styles]) => {
      const cssStyles = Object.entries(styles)
        .map(([prop, value]) => `${prop}: ${value};`)
        .join(" ");
      return `${key} { ${cssStyles} }`;
    })
    .join(" ");
  return `@keyframes ${name} { ${keyframeString} }`;
};

export const animation = (
  name: string,
  duration: string | number = "1s",
  timingFunction: string = "ease",
  delay: string | number = "0s",
  iterationCount: string | number = 1,
  direction: AnimationDirection = "normal",
  fillMode: AnimationFillMode = "none",
  playState: AnimationPlayState = "running",
): string => {
  if (typeof duration === "number") duration = `${duration}ms`;
  if (typeof delay === "number") delay = `${delay}ms`;

  const isValidTimeUnit = (value: string) => /^\d+(\.\d+)?(ms|s)$/.test(value);

  if (!isValidTimeUnit(duration) || !isValidTimeUnit(delay)) {
    throw new Error("Invalid duration or delay value");
  }

  if (typeof iterationCount === "number" && iterationCount < 0) {
    throw new Error('Iteration count must be a positive number or "infinite".');
  }

  return [
    name,
    duration,
    timingFunction,
    delay,
    iterationCount === "infinite" ? "infinite" : iterationCount.toString(),
    direction,
    fillMode,
    playState,
  ].join(" ");
};

export const multipleAnimations = (
  ...animations: string[]
): { animation: string } => {
  return { animation: animations.join(", ") };
};
