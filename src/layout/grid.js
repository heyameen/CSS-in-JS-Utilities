"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.gridContainer = gridContainer;
exports.gridItem = gridItem;
function gridContainer(columns = 1, rows = 'auto', gap = '1rem', justifyItems = 'stretch', alignItems = 'stretch', justifyContent = 'start', alignContent = 'start') {
    if (typeof columns === 'number' && columns < 1) {
        throw new Error('columns must be a positive number or a valid CSS value');
    }
    if (typeof rows === 'number' && rows < 1) {
        throw new Error('rows must be a positive number or a valid CSS value');
    }
    if (!/^\d+(\.\d+)?(px|em|rem|%)$/.test(gap)) {
        throw new Error('Invalid gap value');
    }
    if (!['start', 'end', 'center', 'stretch'].includes(justifyItems)) {
        throw new Error('Invalid justifyItems value');
    }
    if (!['start', 'end', 'center', 'stretch'].includes(alignItems)) {
        throw new Error('Invalid alignItems value');
    }
    if (!['start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly'].includes(justifyContent)) {
        throw new Error('Invalid justifyContent value');
    }
    if (!['start', 'end', 'center', 'stretch', 'space-around', 'space-between', 'space-evenly'].includes(alignContent)) {
        throw new Error('Invalid alignContent value');
    }
    return {
        display: 'grid',
        gridTemplateColumns: typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns,
        gridTemplateRows: typeof rows === 'number' ? `repeat(${rows}, 1fr)` : rows,
        gap,
        justifyItems,
        alignItems,
        justifyContent,
        alignContent,
    };
}
function gridItem(colStart = 'auto', colEnd = 'auto', rowStart = 'auto', rowEnd = 'auto', justifySelf = 'stretch', alignSelf = 'stretch') {
    if (typeof colStart === 'number' && colStart < 1) {
        throw new Error('colStart must be a positive number or "auto"');
    }
    if (typeof colEnd === 'number' && colEnd < 1) {
        throw new Error('colEnd must be a positive number or "auto"');
    }
    if (typeof rowStart === 'number' && rowStart < 1) {
        throw new Error('rowStart must be a positive number or "auto"');
    }
    if (typeof rowEnd === 'number' && rowEnd < 1) {
        throw new Error('rowEnd must be a positive number or "auto"');
    }
    if (!['start', 'end', 'center', 'stretch'].includes(justifySelf)) {
        throw new Error('Invalid justifySelf value');
    }
    if (!['start', 'end', 'center', 'stretch'].includes(alignSelf)) {
        throw new Error('Invalid alignSelf value');
    }
    return {
        gridColumnStart: colStart,
        gridColumnEnd: colEnd,
        gridRowStart: rowStart,
        gridRowEnd: rowEnd,
        justifySelf,
        alignSelf,
    };
}
