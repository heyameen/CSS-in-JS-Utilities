"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.multipleAnimations = exports.animation = exports.keyframe = void 0;
const keyframe = (name, frames) => {
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
exports.keyframe = keyframe;
const animation = (name, duration = "1s", timingFunction = "ease", delay = "0s", iterationCount = 1, direction = "normal", fillMode = "none", playState = "running") => {
    if (typeof duration === "number")
        duration = `${duration}ms`;
    if (typeof delay === "number")
        delay = `${delay}ms`;
    const isValidTimeUnit = (value) => /^\d+(\.\d+)?(ms|s)$/.test(value);
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
exports.animation = animation;
const multipleAnimations = (...animations) => {
    return { animation: animations.join(", ") };
};
exports.multipleAnimations = multipleAnimations;
