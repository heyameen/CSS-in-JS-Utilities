import { boxShadow, textShadow } from '../effects/shadows';

describe('Shadow Utilities', () => {
    describe('boxShadow', () => {
        test('creates correct styles with default values', () => {
            const result = boxShadow();
            expect(result).toEqual({
                boxShadow: '0px 2px 4px 0px rgba(0, 0, 0, 0.1)',
            });
        });

        test('creates correct styles with custom size', () => {
            const result = boxShadow('lg');
            expect(result).toEqual({
                boxShadow: '0px 4px 8px 0px rgba(0, 0, 0, 0.1)',
            });
        });

        test('creates correct styles with custom color', () => {
            const result = boxShadow('md', 'rgba(255, 0, 0, 0.5)');
            expect(result).toEqual({
                boxShadow: '0px 2px 4px 0px rgba(255, 0, 0, 0.5)',
            });
        });

        test('creates correct styles with inset shadow', () => {
            const result = boxShadow('sm', 'rgba(0, 0, 0, 0.1)', true);
            expect(result).toEqual({
                boxShadow: 'inset 0px 1px 2px 0px rgba(0, 0, 0, 0.1)',
            });
        });

        test('creates correct styles for all sizes', () => {
            const sizes: ('sm' | 'md' | 'lg' | 'xl' | '2xl')[] = ['sm', 'md', 'lg', 'xl', '2xl'];
            sizes.forEach(size => {
                const result = boxShadow(size);
                expect(result).toHaveProperty('boxShadow');
            });
        });

        test('throws error for invalid size', () => {
            // @ts-ignore
            expect(() => boxShadow('invalid')).toThrow('Invalid shadow size');
        });

        test('throws error for invalid color', () => {
            expect(() => boxShadow('md', 'not-a-color')).toThrow('Invalid color value');
        });
    });

    describe('textShadow', () => {
        test('creates correct styles with default values', () => {
            const result = textShadow();
            expect(result).toEqual({
                textShadow: '0px 2px 4px rgba(0, 0, 0, 0.1)',
            });
        });

        test('creates correct styles with custom size', () => {
            const result = textShadow('xl');
            expect(result).toEqual({
                textShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
            });
        });

        test('creates correct styles with custom color', () => {
            const result = textShadow('md', 'rgba(0, 255, 0, 0.5)');
            expect(result).toEqual({
                textShadow: '0px 2px 4px rgba(0, 255, 0, 0.5)',
            });
        });

        test('creates correct styles for all sizes', () => {
            const sizes: ('sm' | 'md' | 'lg' | 'xl' | '2xl')[] = ['sm', 'md', 'lg', 'xl', '2xl'];
            sizes.forEach(size => {
                const result = textShadow(size);
                expect(result).toHaveProperty('textShadow');
            });
        });

        test('throws error for invalid size', () => {
            // @ts-ignore
            expect(() => textShadow('invalid')).toThrow('Invalid shadow size');
        });

        test('throws error for invalid color', () => {
            expect(() => textShadow('md', 'not-a-color')).toThrow('Invalid color value');
        });
    });
});
