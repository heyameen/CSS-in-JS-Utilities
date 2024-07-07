import { flexContainer, flexItem } from '../layout/flex';

describe('Flex Utilities', () => {
    describe('flexContainer', () => {
        test('creates correct styles with default values', () => {
            const result = flexContainer();
            expect(result).toEqual({
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'start',
                alignItems: 'stretch',
            });
        });

        test('creates correct styles with custom values', () => {
            const result = flexContainer('column', 'space-around', 'end');
            expect(result).toEqual({
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-around',
                alignItems: 'end',
            });
        });

        test('handles invalid flexDirection', () => {
            //@ts-ignore
            expect(() => flexContainer('invalid')).toThrow();
        });

        test('handles invalid justifyContent', () => {
            //@ts-ignore
            expect(() => flexContainer('row', 'invalid')).toThrow();
        });

        test('handles invalid alignItems', () => {
            //@ts-ignore
            expect(() => flexContainer('row', 'start', 'invalid')).toThrow();
        });
    });

    describe('flexItem', () => {
        test('creates correct styles with default values', () => {
            const result = flexItem();
            expect(result).toEqual({
                flex: '0 1 auto',
            });
        });

        test('creates correct styles with custom grow', () => {
            const result = flexItem(2);
            expect(result).toEqual({
                flex: '2 1 auto',
            });
        });

        test('creates correct styles with custom grow and basis', () => {
            const result = flexItem(2, '100px');
            expect(result).toEqual({
                flex: '2 1 100px',
            });
        });

        test('creates correct styles with custom grow, shrink, and basis', () => {
            const result = flexItem(2, '100px', 0);
            expect(result).toEqual({
                flex: '2 0 100px',
            });
        });

        test('handles negative grow value', () => {
            expect(() => flexItem(-1)).toThrow();
        });

        test('handles negative shrink value', () => {
            expect(() => flexItem(1, 'auto', -1)).toThrow();
        });

        test('handles invalid basis value', () => {
            expect(() => flexItem(1, 'invalid')).toThrow();
        });
    });
});