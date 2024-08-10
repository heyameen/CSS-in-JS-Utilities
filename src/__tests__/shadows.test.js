"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const shadows_1 = require("../effects/shadows");
describe('Shadow Utilities', () => {
    describe('boxShadow', () => {
        test('creates correct styles with default values', () => {
            const result = (0, shadows_1.boxShadow)();
            expect(result).toEqual({
                boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
            });
        });
        test('creates correct styles with custom size', () => {
            const result = (0, shadows_1.boxShadow)('lg');
            expect(result).toEqual({
                boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.1)',
            });
        });
        test('creates correct styles with custom color', () => {
            const result = (0, shadows_1.boxShadow)('md', 'rgba(255, 0, 0, 0.5)');
            expect(result).toEqual({
                boxShadow: '0px 2px 4px 0px rgba(255, 0, 0, 0.5)',
            });
        });
        test('creates correct styles with inset shadow', () => {
            const result = (0, shadows_1.boxShadow)('sm', 'rgba(0, 0, 0, 0.1)', true);
            expect(result).toEqual({
                boxShadow: 'inset 0px 1px 2px 0px rgba(0, 0, 0, 0.1)',
            });
        });
        test('creates correct styles for all sizes', () => {
            const sizes = ['sm', 'md', 'lg', 'xl', '2xl'];
            sizes.forEach(size => {
                const result = (0, shadows_1.boxShadow)(size);
                expect(result).toHaveProperty('boxShadow');
            });
        });
        test('throws error for invalid size', () => {
            // @ts-ignore
            expect(() => (0, shadows_1.boxShadow)('invalid')).toThrow('Invalid shadow size');
        });
        test('throws error for invalid color', () => {
            expect(() => (0, shadows_1.boxShadow)('md', 'not-a-color')).toThrow('Invalid color value');
        });
    });
    describe('textShadow', () => {
        test('creates correct styles with default values', () => {
            const result = (0, shadows_1.textShadow)();
            expect(result).toEqual({
                textShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            });
        });
        test('creates correct styles with custom size', () => {
            const result = (0, shadows_1.textShadow)('xl');
            expect(result).toEqual({
                textShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
            });
        });
        test('creates correct styles with custom color', () => {
            const result = (0, shadows_1.textShadow)('md', 'rgba(0, 255, 0, 0.5)');
            expect(result).toEqual({
                textShadow: '0px 2px 4px rgba(0, 255, 0, 0.5)',
            });
        });
        test('creates correct styles for all sizes', () => {
            const sizes = ['sm', 'md', 'lg', 'xl', '2xl'];
            sizes.forEach(size => {
                const result = (0, shadows_1.textShadow)(size);
                expect(result).toHaveProperty('textShadow');
            });
        });
        test('throws error for invalid size', () => {
            // @ts-ignore
            expect(() => (0, shadows_1.textShadow)('invalid')).toThrow('Invalid shadow size');
        });
        test('throws error for invalid color', () => {
            expect(() => (0, shadows_1.textShadow)('md', 'not-a-color')).toThrow('Invalid color value');
        });
    });
});
