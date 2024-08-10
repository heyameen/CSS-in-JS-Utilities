"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const flex_1 = require("../layout/flex");
describe('Flex Utilities', () => {
    describe('flexContainer', () => {
        test('creates correct styles with default values', () => {
            const result = (0, flex_1.flexContainer)();
            expect(result).toEqual({
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
                alignItems: 'stretch',
            });
        });
        test('creates correct styles with custom values', () => {
            const result = (0, flex_1.flexContainer)('column', 'space-around', 'end');
            expect(result).toEqual({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'end',
            });
        });
        test('handles invalid flexDirection', () => {
            //@ts-ignore
            expect(() => (0, flex_1.flexContainer)('invalid')).toThrow();
        });
        test('handles invalid justifyContent', () => {
            //@ts-ignore
            expect(() => (0, flex_1.flexContainer)('row', 'invalid')).toThrow();
        });
        test('handles invalid alignItems', () => {
            //@ts-ignore
            expect(() => (0, flex_1.flexContainer)('row', 'start', 'invalid')).toThrow();
        });
    });
    describe('flexItem', () => {
        test('creates correct styles with default values', () => {
            const result = (0, flex_1.flexItem)();
            expect(result).toEqual({
                flex: '0 1 auto',
            });
        });
        test('creates correct styles with custom grow', () => {
            const result = (0, flex_1.flexItem)(2);
            expect(result).toEqual({
                flex: '2 1 auto',
            });
        });
        test('creates correct styles with custom grow and basis', () => {
            const result = (0, flex_1.flexItem)(2, '100px');
            expect(result).toEqual({
                flex: '2 1 100px',
            });
        });
        test('creates correct styles with custom grow, shrink, and basis', () => {
            const result = (0, flex_1.flexItem)(2, '100px', 0);
            expect(result).toEqual({
                flex: '2 0 100px',
            });
        });
        test('handles negative grow value', () => {
            expect(() => (0, flex_1.flexItem)(-1)).toThrow();
        });
        test('handles negative shrink value', () => {
            expect(() => (0, flex_1.flexItem)(1, 'auto', -1)).toThrow();
        });
        test('handles invalid basis value', () => {
            expect(() => (0, flex_1.flexItem)(1, 'invalid')).toThrow();
        });
    });
});
