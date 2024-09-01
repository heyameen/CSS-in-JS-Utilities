import { CSSProperties } from "react";
import { appendToStyleElement, isServer } from "../helper/createStyle";

type KeyframeStyles = Record<string, CSSProperties>;
type AnimationDirection =
  | "normal"
  | "reverse"
  | "alternate"
  | "alternate-reverse";
type AnimationFillMode = "none" | "forwards" | "backwards" | "both";
type AnimationPlayState = "running" | "paused";
let keyframesStore: Set<string> = new Set();

export const keyframe = (name: string, frames: KeyframeStyles): string => {
  const keyframeString = Object.entries(frames)
    .map(([key, styles]) => {
      const cssStyles = Object.entries(styles)
        .map(([prop, value]) => `${prop}: ${value};`)
        .join(" ");
      return `${key} { ${cssStyles} }`;
    })
    .join(" ");
  const fullKeyFrame = `@keyframes ${name} { ${keyframeString} }`;
  if (!isServer) {
    appendToStyleElement(fullKeyFrame);
  }

  keyframesStore.add(fullKeyFrame);
  return fullKeyFrame;
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
): { animation: string } => {
  if (typeof duration === "number") duration = `${duration}ms`;
  if (typeof delay === "number") delay = `${delay}ms`;

  const isValidTimeUnit = (value: string) => /^\d+(\.\d+)?(ms|s)$/.test(value);

  if (!isValidTimeUnit(duration) || !isValidTimeUnit(delay)) {
    throw new Error("Invalid duration or delay value");
  }

  if (typeof iterationCount === "number" && iterationCount < 0) {
    throw new Error('Iteration count must be a positive number or "infinite".');
  }

  const animationString = `${name} ${duration} ${timingFunction} ${delay} ${iterationCount} ${direction} ${fillMode} ${playState}`;

  return { animation: animationString };
};

export const multipleAnimations = (
  ...animations: Array<{ animation: string } | string>
): { animation: string } => {
  const animationStrings = animations.map((anim) =>
    typeof anim === "string" ? anim : anim.animation,
  );
  return { animation: animationStrings.join(", ") };
};

export const getAllKeyframes = (): string => {
  return Array.from(keyframesStore).join("\n");
};

export const clearKeyframes = (): void => {
  keyframesStore.clear();
};
