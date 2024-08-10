import { CSSProperties } from "react";
type KeyframeStyles = Record<string, CSSProperties>;
type AnimationDirection = "normal" | "reverse" | "alternate" | "alternate-reverse";
type AnimationFillMode = "none" | "forwards" | "backwards" | "both";
type AnimationPlayState = "running" | "paused";
export declare const keyframe: (name: string, frames: KeyframeStyles) => string;
export declare const animation: (name: string, duration?: string | number, timingFunction?: string, delay?: string | number, iterationCount?: string | number, direction?: AnimationDirection, fillMode?: AnimationFillMode, playState?: AnimationPlayState) => string;
export declare const multipleAnimations: (...animations: string[]) => {
    animation: string;
};
export {};
