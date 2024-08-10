"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.analogous = exports.complementary = exports.darken = exports.lighten = exports.toRgba = void 0;
const colord_1 = require("colord");
const names_1 = __importDefault(require("colord/plugins/names"));
const mix_1 = __importDefault(require("colord/plugins/mix"));
const harmonies_1 = __importDefault(require("colord/plugins/harmonies"));
(0, colord_1.extend)([names_1.default, mix_1.default, harmonies_1.default]);
const toRgba = (color, alpha = 1) => {
    const parsed = (0, colord_1.colord)(color);
    if (!parsed.isValid()) {
        throw new Error("Invalid color format");
    }
    alpha = Math.max(0, Math.min(1, alpha)); // Clamp alpha between 0 and 1
    const { r, g, b } = parsed.toRgb();
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};
exports.toRgba = toRgba;
// Lighten a color by a percentage
const lighten = (color, amount) => {
    const parsed = (0, colord_1.colord)(color);
    if (!parsed.isValid()) {
        throw new Error("Invalid color format");
    }
    return parsed
        .lighten(amount / 100)
        .toHex()
        .toUpperCase();
};
exports.lighten = lighten;
// Darken a color by a percentage
const darken = (color, percentage) => {
    const parsed = (0, colord_1.colord)(color);
    if (!parsed.isValid()) {
        throw new Error("Invalid color format");
    }
    return parsed
        .darken(percentage / 100)
        .toHex()
        .toUpperCase();
};
exports.darken = darken;
// Generate a complementary color
const complementary = (color) => {
    const parsed = (0, colord_1.colord)(color);
    if (!parsed.isValid()) {
        throw new Error("Invalid color format");
    }
    return parsed.rotate(180).toHex().toUpperCase();
};
exports.complementary = complementary;
// Generate an analogous color
const analogous = (color, angle = 30) => {
    const parsed = (0, colord_1.colord)(color);
    if (!parsed.isValid()) {
        throw new Error("Invalid color format");
    }
    if (angle <= 0 || angle >= 360) {
        throw new Error("Angle must be between 1 and 359 degrees.");
    }
    return parsed.rotate(angle).toHex().toUpperCase();
};
exports.analogous = analogous;
