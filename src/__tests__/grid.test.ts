import { gridContainer, gridItem } from '../layout/grid';

describe('Grid Utilities', () => {
    describe('gridContainer', () => {
        test('creates correct styles with default values', () => {
            const result = gridContainer();
            expect(result).toEqual({
                display: 'grid',
                gridTemplateColumns: 'repeat(1, 1fr)',
                gridTemplateRows: 'auto',
                gap: '1rem',
                justifyItems: 'stretch',
                alignItems: 'stretch',
                justifyContent: 'start',
                alignContent: 'start',
            });
        });

        test('creates correct styles with custom values', () => {
            const result = gridContainer(3, 2, '20px', 'center', 'end', 'space-between', 'space-around');
            expect(result).toEqual({
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gridTemplateRows: 'repeat(2, 1fr)',
                gap: '20px',
                justifyItems: 'center',
                alignItems: 'end',
                justifyContent: 'space-between',
                alignContent: 'space-around',
            });
        });

        test('handles string values for columns and rows', () => {
            const result = gridContainer('1fr 2fr', 'auto 1fr');
            expect(result).toEqual({
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gridTemplateRows: 'auto 1fr',
                gap: '1rem',
                justifyItems: 'stretch',
                alignItems: 'stretch',
                justifyContent: 'start',
                alignContent: 'start',
            });
        });

        test('throws error for invalid columns value', () => {
            expect(() => gridContainer(0)).toThrow('columns must be a positive number or a valid CSS value');
        });

        test('throws error for invalid rows value', () => {
            expect(() => gridContainer(1, 0)).toThrow('rows must be a positive number or a valid CSS value');
        });

        test('throws error for invalid gap value', () => {
            expect(() => gridContainer(1, 1, 'invalid')).toThrow('Invalid gap value');
        });

        test('throws error for invalid justifyItems value', () => {
            // @ts-ignore
            expect(() => gridContainer(1, 1, '1rem', 'invalid')).toThrow('Invalid justifyItems value');
        });

        test('throws error for invalid alignItems value', () => {
            // @ts-ignore
            expect(() => gridContainer(1, 1, '1rem', 'start', 'invalid')).toThrow('Invalid alignItems value');
        });

        test('throws error for invalid justifyContent value', () => {
            // @ts-ignore
            expect(() => gridContainer(1, 1, '1rem', 'start', 'start', 'invalid')).toThrow('Invalid justifyContent value');
        });

        test('throws error for invalid alignContent value', () => {
            // @ts-ignore
            expect(() => gridContainer(1, 1, '1rem', 'start', 'start', 'start', 'invalid')).toThrow('Invalid alignContent value');
        });
    });

    describe('gridItem', () => {
        test('creates correct styles with default values', () => {
            const result = gridItem();
            expect(result).toEqual({
                gridColumnStart: 'auto',
                gridColumnEnd: 'auto',
                gridRowStart: 'auto',
                gridRowEnd: 'auto',
                justifySelf: 'stretch',
                alignSelf: 'stretch',
            });
        });

        test('creates correct styles with custom values', () => {
            const result = gridItem(2, 4, 1, 3, 'start', 'end');
            expect(result).toEqual({
                gridColumnStart: 2,
                gridColumnEnd: 4,
                gridRowStart: 1,
                gridRowEnd: 3,
                justifySelf: 'start',
                alignSelf: 'end',
            });
        });

        test('handles "auto" values', () => {
            const result = gridItem('auto', 'auto', 'auto', 'auto', 'center', 'center');
            expect(result).toEqual({
                gridColumnStart: 'auto',
                gridColumnEnd: 'auto',
                gridRowStart: 'auto',
                gridRowEnd: 'auto',
                justifySelf: 'center',
                alignSelf: 'center',
            });
        });

        test('throws error for invalid colStart value', () => {
            expect(() => gridItem(0)).toThrow('colStart must be a positive number or "auto"');
        });

        test('throws error for invalid colEnd value', () => {
            expect(() => gridItem(1, 0)).toThrow('colEnd must be a positive number or "auto"');
        });

        test('throws error for invalid rowStart value', () => {
            expect(() => gridItem(1, 2, 0)).toThrow('rowStart must be a positive number or "auto"');
        });

        test('throws error for invalid rowEnd value', () => {
            expect(() => gridItem(1, 2, 1, 0)).toThrow('rowEnd must be a positive number or "auto"');
        });

        test('throws error for invalid justifySelf value', () => {
            // @ts-ignore
            expect(() => gridItem(1, 2, 1, 2, 'invalid')).toThrow('Invalid justifySelf value');
        });

        test('throws error for invalid alignSelf value', () => {
            // @ts-ignore
            expect(() => gridItem(1, 2, 1, 2, 'start', 'invalid')).toThrow('Invalid alignSelf value');
        });
    });
});
