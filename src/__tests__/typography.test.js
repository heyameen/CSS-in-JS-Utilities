"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typography_1 = require("../typography/typography");
describe('Typography Utilities', () => {
    describe('fontSize', () => {
        test('creates correct styles with single value', () => {
            expect((0, typography_1.fontSize)('16px')).toEqual({ fontSize: '16px' });
        });
        test('creates correct styles with responsive values', () => {
            const result = (0, typography_1.fontSize)({ base: '16px', md: '18px', lg: '20px' });
            expect(result).toEqual({
                fontSize: '16px',
                '@media (min-width: 768px)': { fontSize: '18px' },
                '@media (min-width: 1024px)': { fontSize: '20px' },
            });
        });
        test('handles invalid breakpoint names', () => {
            const result = (0, typography_1.fontSize)({ base: '16px', invalid: '18px' });
            expect(result).toEqual({ fontSize: '16px' });
        });
        test('handles empty object', () => {
            expect((0, typography_1.fontSize)({})).toEqual({});
        });
        test('throws error for invalid CSS value', () => {
            expect(() => (0, typography_1.fontSize)('invalid')).toThrow();
        });
    });
    describe('fontWeight', () => {
        test('creates correct styles with single value', () => {
            expect((0, typography_1.fontWeight)('bold')).toEqual({ fontWeight: 'bold' });
        });
        test('creates correct styles with numeric weight', () => {
            expect((0, typography_1.fontWeight)(700)).toEqual({ fontWeight: 700 });
        });
        test('creates correct styles with responsive values', () => {
            const result = (0, typography_1.fontWeight)({ base: 'normal', md: 'bold' });
            expect(result).toEqual({
                fontWeight: 'normal',
                '@media (min-width: 768px)': { fontWeight: 'bold' },
            });
        });
        test('handles invalid weight value', () => {
            // @ts-ignore
            expect(() => (0, typography_1.fontWeight)('super-bold')).toThrow();
        });
    });
    describe('lineHeight', () => {
        test('creates correct styles with single value', () => {
            expect((0, typography_1.lineHeight)(1.5)).toEqual({ lineHeight: 1.5 });
        });
        test('creates correct styles with string value', () => {
            expect((0, typography_1.lineHeight)('2em')).toEqual({ lineHeight: '2em' });
        });
        test('creates correct styles with responsive values', () => {
            const result = (0, typography_1.lineHeight)({ base: 1.5, md: 1.6, lg: 1.7 });
            expect(result).toEqual({
                lineHeight: 1.5,
                '@media (min-width: 768px)': { lineHeight: 1.6 },
                '@media (min-width: 1024px)': { lineHeight: 1.7 },
            });
        });
        test('handles extremely large value', () => {
            expect((0, typography_1.lineHeight)(1000)).toEqual({ lineHeight: 1000 });
        });
    });
    describe('letterSpacing', () => {
        test('creates correct styles with single value', () => {
            expect((0, typography_1.letterSpacing)('0.05em')).toEqual({ letterSpacing: '0.05em' });
        });
        test('creates correct styles with numeric value', () => {
            expect((0, typography_1.letterSpacing)(2)).toEqual({ letterSpacing: 2 });
        });
        test('creates correct styles with responsive values', () => {
            const result = (0, typography_1.letterSpacing)({ base: '0.05em', md: '0.1em' });
            expect(result).toEqual({
                letterSpacing: '0.05em',
                '@media (min-width: 768px)': { letterSpacing: '0.1em' },
            });
        });
    });
    describe('textAlign', () => {
        test('creates correct styles with single value', () => {
            expect((0, typography_1.textAlign)('center')).toEqual({ textAlign: 'center' });
        });
        test('creates correct styles with responsive values', () => {
            const result = (0, typography_1.textAlign)({ base: 'left', md: 'center', lg: 'right' });
            expect(result).toEqual({
                textAlign: 'left',
                '@media (min-width: 768px)': { textAlign: 'center' },
                '@media (min-width: 1024px)': { textAlign: 'right' },
            });
        });
        test('handles invalid align value', () => {
            // @ts-ignore
            expect(() => (0, typography_1.textAlign)('middle')).toThrow();
        });
    });
    describe('textTransform', () => {
        test('creates correct styles with single value', () => {
            expect((0, typography_1.textTransform)('uppercase')).toEqual({ textTransform: 'uppercase' });
        });
        test('creates correct styles with responsive values', () => {
            const result = (0, typography_1.textTransform)({ base: 'none', md: 'uppercase' });
            expect(result).toEqual({
                textTransform: 'none',
                '@media (min-width: 768px)': { textTransform: 'uppercase' },
            });
        });
        test('handles invalid transform value', () => {
            // @ts-ignore
            expect(() => (0, typography_1.textTransform)('smallcaps')).toThrow();
        });
    });
    describe('fontFamily', () => {
        test('creates correct styles with single value', () => {
            expect((0, typography_1.fontFamily)('Arial, sans-serif')).toEqual({ fontFamily: 'Arial, sans-serif' });
        });
        test('creates correct styles with responsive values', () => {
            const result = (0, typography_1.fontFamily)({ base: 'Arial, sans-serif', md: 'Helvetica, sans-serif' });
            expect(result).toEqual({
                fontFamily: 'Arial, sans-serif',
                '@media (min-width: 768px)': { fontFamily: 'Helvetica, sans-serif' },
            });
        });
        test('handles empty string', () => {
            expect(() => (0, typography_1.fontFamily)('')).toThrow();
        });
    });
    describe('textDecoration', () => {
        test('creates correct styles with single value', () => {
            expect((0, typography_1.textDecoration)('underline')).toEqual({ textDecoration: 'underline' });
        });
        test('creates correct styles with responsive values', () => {
            const result = (0, typography_1.textDecoration)({ base: 'none', md: 'underline' });
            expect(result).toEqual({
                textDecoration: 'none',
                '@media (min-width: 768px)': { textDecoration: 'underline' },
            });
        });
        test('handles invalid decoration value', () => {
            // @ts-ignore
            expect(() => (0, typography_1.textDecoration)('dotted')).toThrow();
        });
    });
    describe('fontStyle', () => {
        test('creates correct styles with single value', () => {
            expect((0, typography_1.fontStyle)('italic')).toEqual({ fontStyle: 'italic' });
        });
        test('creates correct styles with responsive values', () => {
            const result = (0, typography_1.fontStyle)({ base: 'normal', md: 'italic' });
            expect(result).toEqual({
                fontStyle: 'normal',
                '@media (min-width: 768px)': { fontStyle: 'italic' },
            });
        });
        test('handles invalid style value', () => {
            // @ts-ignore
            expect(() => (0, typography_1.fontStyle)('slanted')).toThrow();
        });
    });
    describe('createTypography', () => {
        test('creates correct styles for heading preset', () => {
            const result = (0, typography_1.createTypography)('heading', { base: '24px', md: '32px' }, 'bold', 'center');
            expect(result).toEqual({
                fontSize: '24px',
                fontWeight: 'bold',
                textAlign: 'center',
                lineHeight: 1.2,
                letterSpacing: '-0.02em',
                '@media (min-width: 768px)': { fontSize: '32px' },
            });
        });
        test('creates correct styles for subheading preset', () => {
            const result = (0, typography_1.createTypography)('subheading', '20px', 600);
            expect(result).toEqual({
                fontSize: '20px',
                fontWeight: 600,
                textAlign: 'left',
                lineHeight: 1.3,
                letterSpacing: '-0.01em',
            });
        });
        test('creates correct styles for body preset', () => {
            const result = (0, typography_1.createTypography)('body', { base: '16px', lg: '18px' });
            expect(result).toEqual({
                fontSize: '16px',
                '@media (min-width: 1024px)': { fontSize: '18px' },
                fontWeight: 'normal',
                textAlign: 'left',
                lineHeight: 1.5,
            });
        });
        test('creates correct styles for caption preset', () => {
            const result = (0, typography_1.createTypography)('caption', '14px', 'normal', 'right');
            expect(result).toEqual({
                fontSize: '14px',
                fontWeight: 'normal',
                textAlign: 'right',
                lineHeight: 1.4,
                letterSpacing: '0.01em',
            });
        });
        test('handles invalid preset', () => {
            // @ts-ignore
            expect(() => (0, typography_1.createTypography)('invalid', '16px')).toThrow('Invalid typography preset');
        });
        test('handles responsive weight and align', () => {
            const result = (0, typography_1.createTypography)('body', '16px', { base: 'normal', md: 'bold' }, { base: 'left', lg: 'center' });
            expect(result).toEqual({
                fontSize: '16px',
                fontWeight: 'normal',
                '@media (min-width: 768px)': { fontWeight: 'bold' },
                textAlign: 'left',
                '@media (min-width: 1024px)': { textAlign: 'center' },
                lineHeight: 1.5,
            });
        });
    });
});
