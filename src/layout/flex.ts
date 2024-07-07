export function flexContainer(
    direction: 'row' | 'column' = 'row',
    justify: 'start' | 'end' | 'center' | 'space-between' | 'space-around' = 'start',
    align: 'start' | 'end' | 'center' | 'stretch' | 'baseline' = 'stretch'
) {
    if (!['row', 'column'].includes(direction)) {
        throw new Error('Invalid flexDirection');
    }
    if (!['start', 'end', 'center', 'space-between', 'space-around'].includes(justify)) {
        throw new Error('Invalid justifyContent');
    }
    if (!['start', 'end', 'center', 'stretch', 'baseline'].includes(align)) {
        throw new Error('Invalid alignItems');
    }

    return {
        display: 'flex',
        flexDirection: direction,
        justifyContent: justify,
        alignItems: align,
    };
}

export function flexItem(grow: number = 0, basis: string | number = 'auto', shrink: number = 1) {
    if (grow < 0) throw new Error('grow must be non-negative');
    if (shrink < 0) throw new Error('shrink must be non-negative');
    if (typeof basis === 'string' && !['auto', 'content'].includes(basis) && !/^\d+(\.\d+)?(px|em|rem|%)$/.test(basis)) {
        throw new Error('Invalid basis value');
    }

    return {
        flex: `${grow} ${shrink} ${basis}`,
    };
}