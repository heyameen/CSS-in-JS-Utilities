"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.flexContainer = flexContainer;
exports.flexItem = flexItem;
function flexContainer(direction = 'row', justify = 'start', align = 'stretch') {
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
function flexItem(grow = 0, basis = 'auto', shrink = 1) {
    if (grow < 0)
        throw new Error('grow must be non-negative');
    if (shrink < 0)
        throw new Error('shrink must be non-negative');
    if (typeof basis === 'string' && !['auto', 'content'].includes(basis) && !/^\d+(\.\d+)?(px|em|rem|%)$/.test(basis)) {
        throw new Error('Invalid basis value');
    }
    return {
        flex: `${grow} ${shrink} ${basis}`,
    };
}
