"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responsive = void 0;
const breakpoints = {
    base: '0',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};
const responsive = (styles) => {
    const bps = ['base', ...Object.keys(breakpoints)];
    return bps.reduce((acc, bp) => {
        const currentStyles = Object.entries(styles).reduce((styleAcc, [property, value]) => {
            if (typeof value === 'object' && value !== null) {
                if (bp in value && value[bp] !== undefined) {
                    styleAcc[property] = value[bp];
                }
            }
            else if (bp === 'base') {
                styleAcc[property] = value;
            }
            return styleAcc;
        }, {});
        if (Object.keys(currentStyles).length > 0) {
            if (bp === 'base') {
                Object.assign(acc, currentStyles);
            }
            else {
                acc[`@media (min-width: ${breakpoints[bp]})`] = currentStyles;
            }
        }
        return acc;
    }, {});
};
exports.responsive = responsive;
