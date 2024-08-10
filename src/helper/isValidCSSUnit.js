"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = isValidCSSUnit;
function isValidCSSUnit(value) {
    if (typeof value === 'number')
        return true;
    return /^-?\d+(\.\d+)?(px|em|rem|%|vh|vw|vmin|vmax|ex|ch)$/.test(value);
}
