import { transition, multipleTransitions } from '../effects/transitions';

describe('Transition Utilities', () => {
    describe('transition', () => {
        test('creates correct styles with default values', () => {
            const result = transition();
            expect(result).toEqual({
                transition: 'all 300ms ease 0ms',
            });
        });

        test('creates correct styles with custom values', () => {
            const result = transition('opacity', 500, 'ease-in-out', 100);
            expect(result).toEqual({
                transition: 'opacity 500ms ease-in-out 100ms',
            });
        });

        test('handles custom property names', () => {
            const result = transition('background-color');
            expect(result).toEqual({
                transition: 'background-color 300ms ease 0ms',
            });
        });

        test('handles custom timing functions', () => {
            const result = transition('all', 300, 'cubic-bezier(0.25, 0.1, 0.25, 1)');
            expect(result).toEqual({
                transition: 'all 300ms cubic-bezier(0.25, 0.1, 0.25, 1) 0ms',
            });
        });

        test('handles negative duration', () => {
            // @ts-ignore
            expect(() => transition('opacity', -200)).toThrow('Duration must be a non-negative number');
        });

        test('handles negative delay', () => {
            // @ts-ignore
            expect(() => transition('opacity', 200, 'ease', -100)).toThrow('Delay must be a non-negative number');
        });

        test('handles invalid timing function', () => {
            // @ts-ignore
            expect(() => transition('opacity', 200, 'invalid-timing')).toThrow('Invalid timing function');
        });
    });

    describe('multipleTransitions', () => {
        test('combines multiple transitions correctly', () => {
            const result = multipleTransitions(
                transition('opacity', 300, 'ease'),
                transition('transform', 500, 'ease-out', 100)
            );
            expect(result).toEqual({
                transition: 'opacity 300ms ease 0ms, transform 500ms ease-out 100ms',
            });
        });

        test('handles single transition', () => {
            const result = multipleTransitions(
                transition('color', 200)
            );
            expect(result).toEqual({
                transition: 'color 200ms ease 0ms',
            });
        });

        test('handles empty input', () => {
            const result = multipleTransitions();
            expect(result).toEqual({
                transition: '',
            });
        });

        test('handles invalid transition object', () => {
            // @ts-ignore
            expect(() => multipleTransitions({ invalid: 'object' })).toThrow('Invalid transition object');
        });

        test('handles mix of valid and invalid transitions', () => {
            expect(() => multipleTransitions(
                transition('opacity', 300),
                // @ts-ignore
                { invalid: 'object' },
                transition('transform', 500)
            )).toThrow('Invalid transition object');
        });
    });
});
