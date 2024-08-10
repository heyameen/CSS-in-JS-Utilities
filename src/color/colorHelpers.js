"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseColor = parseColor;
exports.hexToRgb = hexToRgb;
exports.rgbToHex = rgbToHex;
exports.hslToRgb = hslToRgb;
exports.rgbToHsl = rgbToHsl;
exports.hslToHex = hslToHex;
const colord_1 = require("colord");
const names_1 = __importDefault(require("colord/plugins/names"));
(0, colord_1.extend)([names_1.default]);
function parseColor(color) {
    const parsed = (0, colord_1.colord)(color);
    if (!parsed.isValid()) {
        throw new Error(`Invalid color format: ${color}`);
    }
    const { r, g, b } = parsed.toRgb();
    return [Math.round(r), Math.round(g), Math.round(b)];
}
function hexToRgb(hex) {
    const parsed = (0, colord_1.colord)(hex);
    if (!parsed.isValid()) {
        throw new Error("Invalid hex color.");
    }
    const { r, g, b } = parsed.toRgb();
    return [Math.round(r), Math.round(g), Math.round(b)];
}
function rgbToHex(r, g, b) {
    return (0, colord_1.colord)({ r, g, b }).toHex().toUpperCase();
}
function hslToRgb(h, s, l) {
    const { r, g, b } = (0, colord_1.colord)({ h, s, l }).toRgb();
    return [Math.round(r), Math.round(g), Math.round(b)];
}
function rgbToHsl(r, g, b) {
    const { h, s, l } = (0, colord_1.colord)({ r, g, b }).toHsl();
    return [Math.round(h), Math.round(s), Math.round(l)];
}
function hslToHex(h, s, l) {
    return (0, colord_1.colord)({ h, s, l }).toHex().toUpperCase();
}
