"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fontStyle = exports.textDecoration = exports.fontFamily = exports.textTransform = exports.textAlign = exports.letterSpacing = exports.lineHeight = exports.fontWeight = exports.fontSize = void 0;
exports.createTypography = createTypography;
const breakpoints_1 = require("../responsive/breakpoints");
const isValidCSSUnit_1 = __importDefault(require("../helper/isValidCSSUnit"));
const fontSize = (size) => {
    if (typeof size === 'object') {
        Object.entries(size).forEach(([key, value]) => {
            if (!(0, isValidCSSUnit_1.default)(value)) {
                throw new Error(`Invalid font size value for ${key}: ${value}. Use a number or a string with a valid CSS unit.`);
            }
        });
    }
    else if (!(0, isValidCSSUnit_1.default)(size)) {
        throw new Error(`Invalid font size value: ${size}. Use a number or a string with a valid CSS unit.`);
    }
    return (0, breakpoints_1.responsive)({ fontSize: size });
};
exports.fontSize = fontSize;
const fontWeight = (weight) => {
    if (typeof weight === 'string' && !['normal', 'bold', 'lighter', 'bolder'].includes(weight)) {
        throw new Error('Invalid font weight');
    }
    return (0, breakpoints_1.responsive)({ fontWeight: weight });
};
exports.fontWeight = fontWeight;
const lineHeight = (height) => {
    if (typeof height === 'object') {
        Object.entries(height).forEach(([key, value]) => {
            if (!(0, isValidCSSUnit_1.default)(value) && typeof value !== 'number') {
                throw new Error(`Invalid line height value for ${key}: ${value}. Use a number or a string with a valid CSS unit.`);
            }
        });
    }
    else if (!(0, isValidCSSUnit_1.default)(height) && typeof height !== 'number') {
        throw new Error(`Invalid line height value: ${height}. Use a number or a string with a valid CSS unit.`);
    }
    return (0, breakpoints_1.responsive)({ lineHeight: height });
};
exports.lineHeight = lineHeight;
const letterSpacing = (spacing) => {
    if (typeof spacing === 'object') {
        Object.entries(spacing).forEach(([key, value]) => {
            if (!(0, isValidCSSUnit_1.default)(value)) {
                throw new Error(`Invalid letter spacing value for ${key}: ${value}. Use a number or a string with a valid CSS unit.`);
            }
        });
    }
    else if (!(0, isValidCSSUnit_1.default)(spacing)) {
        throw new Error(`Invalid letter spacing value: ${spacing}. Use a number or a string with a valid CSS unit.`);
    }
    return (0, breakpoints_1.responsive)({ letterSpacing: spacing });
};
exports.letterSpacing = letterSpacing;
const textAlign = (align) => {
    if (typeof align === 'string' && !['left', 'right', 'center', 'justify'].includes(align)) {
        throw new Error('Invalid text align');
    }
    return (0, breakpoints_1.responsive)({ textAlign: align });
};
exports.textAlign = textAlign;
const textTransform = (transform) => {
    if (typeof transform === 'string' && !['none', 'capitalize', 'uppercase', 'lowercase'].includes(transform)) {
        throw new Error('Invalid text transform');
    }
    return (0, breakpoints_1.responsive)({ textTransform: transform });
};
exports.textTransform = textTransform;
const fontFamily = (family) => {
    if (typeof family === 'string' && family.trim() === '') {
        throw new Error('Font family cannot be empty');
    }
    return (0, breakpoints_1.responsive)({ fontFamily: family });
};
exports.fontFamily = fontFamily;
const textDecoration = (decoration) => {
    if (typeof decoration === 'string' && !['none', 'underline', 'overline', 'line-through'].includes(decoration)) {
        throw new Error('Invalid text decoration');
    }
    return (0, breakpoints_1.responsive)({ textDecoration: decoration });
};
exports.textDecoration = textDecoration;
const fontStyle = (style) => {
    if (typeof style === 'string' && !['normal', 'italic', 'oblique'].includes(style)) {
        throw new Error('Invalid font style');
    }
    return (0, breakpoints_1.responsive)({ fontStyle: style });
};
exports.fontStyle = fontStyle;
function getPresetStyles(preset) {
    switch (preset) {
        case 'heading':
            return Object.assign(Object.assign({}, (0, exports.lineHeight)(1.2)), (0, exports.letterSpacing)('-0.02em'));
        case 'subheading':
            return Object.assign(Object.assign({}, (0, exports.lineHeight)(1.3)), (0, exports.letterSpacing)('-0.01em'));
        case 'body':
            return Object.assign({}, (0, exports.lineHeight)(1.5));
        case 'caption':
            return Object.assign(Object.assign({}, (0, exports.lineHeight)(1.4)), (0, exports.letterSpacing)('0.01em'));
    }
}
function createTypography(preset, size, weight = 'normal', align = 'left') {
    if (!['heading', 'subheading', 'body', 'caption'].includes(preset)) {
        throw new Error('Invalid typography preset');
    }
    return Object.assign(Object.assign(Object.assign(Object.assign({}, (0, exports.fontSize)(size)), (0, exports.fontWeight)(weight)), (0, exports.textAlign)(align)), getPresetStyles(preset));
}
