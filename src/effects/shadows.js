"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.textShadow = exports.boxShadow = void 0;
const colord_1 = require("colord");
const shadowSizes = {
    sm: { x: 0, y: 1, blur: 2, spread: 0 },
    md: { x: 0, y: 2, blur: 4, spread: 0 },
    lg: { x: 0, y: 4, blur: 8, spread: 0 },
    xl: { x: 0, y: 8, blur: 16, spread: 0 },
    "2xl": { x: 0, y: 12, blur: 24, spread: 0 },
};
const boxShadow = (size = "md", color = "rgba(0, 0, 0, 0.1)", inset = false) => {
    if (!(size in shadowSizes)) {
        throw new Error("Invalid shadow size");
    }
    if (!(0, colord_1.colord)(color).isValid()) {
        throw new Error("Invalid color value");
    }
    const { x, y, blur, spread } = shadowSizes[size];
    const insetPrefix = inset ? "inset " : "";
    return {
        boxShadow: `${insetPrefix}${x}px ${y}px ${blur}px ${spread}px ${color}`,
    };
};
exports.boxShadow = boxShadow;
const textShadow = (size = "md", color = "rgba(0, 0, 0, 0.1)") => {
    if (!(size in shadowSizes)) {
        throw new Error("Invalid shadow size");
    }
    if (!(0, colord_1.colord)(color).isValid()) {
        throw new Error("Invalid color value");
    }
    const { x, y, blur } = shadowSizes[size];
    return {
        textShadow: `${x}px ${y}px ${blur}px ${color}`,
    };
};
exports.textShadow = textShadow;
