import { responsive } from '../responsive/breakpoints';

describe('Responsive Utilities', () => {
    describe('responsive', () => {
        test('creates correct styles with single values', () => {
            const result = responsive({
                color: 'red',
                fontSize: '16px',
            });
            expect(result).toEqual({
                color: 'red',
                fontSize: '16px',
            });
        });

        test('creates correct styles with responsive values', () => {
            const result = responsive({
                display: { base: 'block', md: 'flex' },
                padding: { base: '1rem', lg: '2rem' },
            });
            expect(result).toEqual({
                display: 'block',
                padding: '1rem',
                '@media (min-width: 768px)': {
                    display: 'flex',
                },
                '@media (min-width: 1024px)': {
                    padding: '2rem',
                },
            });
        });

        test('handles multiple properties with different breakpoints', () => {
            const result = responsive({
                flexDirection: { base: 'column', lg: 'row' },
                fontSize: { base: '14px', md: '16px', xl: '18px' },
                margin: { sm: '1rem', xl: '2rem' },
            });
            expect(result).toEqual({
                flexDirection: 'column',
                fontSize: '14px',
                '@media (min-width: 640px)': {
                    margin: '1rem',
                },
                '@media (min-width: 768px)': {
                    fontSize: '16px',
                },
                '@media (min-width: 1024px)': {
                    flexDirection: 'row',
                },
                '@media (min-width: 1280px)': {
                    fontSize: '18px',
                    margin: '2rem',
                },
            });
        });

        test('ignores undefined values', () => {
            const result = responsive({
                color: { base: 'black', md: undefined, lg: 'white' },
            });
            expect(result).toEqual({
                color: 'black',
                '@media (min-width: 1024px)': {
                    color: 'white',
                },
            });
        });

        test('handles empty input', () => {
            const result = responsive({});
            expect(result).toEqual({});
        });

        test('preserves non-responsive values alongside responsive ones', () => {
            const result = responsive({
                display: 'flex',
                flexDirection: { base: 'column', md: 'row' },
                alignItems: 'center',
            });
            expect(result).toEqual({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                '@media (min-width: 768px)': {
                    flexDirection: 'row',
                },
            });
        });

        test('handles all breakpoints', () => {
            const result = responsive({
                padding: { base: '0', sm: '1rem', md: '2rem', lg: '3rem', xl: '4rem', '2xl': '5rem' },
            });
            expect(result).toEqual({
                padding: '0',
                '@media (min-width: 640px)': { padding: '1rem' },
                '@media (min-width: 768px)': { padding: '2rem' },
                '@media (min-width: 1024px)': { padding: '3rem' },
                '@media (min-width: 1280px)': { padding: '4rem' },
                '@media (min-width: 1536px)': { padding: '5rem' },
            });
        });
    });
});
