"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transition = transition;
exports.multipleTransitions = multipleTransitions;
const validTimingFunctions = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'];
function transition(property = 'all', duration = 300, timing = 'ease', delay = 0) {
    if (duration < 0) {
        throw new Error('Duration must be a non-negative number');
    }
    if (delay < 0) {
        throw new Error('Delay must be a non-negative number');
    }
    if (!validTimingFunctions.includes(timing) && !timing.startsWith('cubic-bezier')) {
        throw new Error('Invalid timing function');
    }
    return {
        transition: `${property} ${duration}ms ${timing} ${delay}ms`,
    };
}
function multipleTransitions(...transitions) {
    transitions.forEach(t => {
        if (typeof t !== 'object' || !('transition' in t)) {
            throw new Error('Invalid transition object');
        }
    });
    const transitionString = transitions
        .map(t => t.transition)
        .join(', ');
    return {
        transition: transitionString,
    };
}
