type TransitionProperty = 'all' | 'none' | string;
type TransitionTiming = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | string;

const validTimingFunctions = ['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'];

export function transition(
    property: TransitionProperty = 'all',
    duration: number = 300,
    timing: TransitionTiming = 'ease',
    delay: number = 0
) {
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

export function multipleTransitions(...transitions: ReturnType<typeof transition>[]) {
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
