type TransitionProperty = 'all' | 'none' | string;
type TransitionTiming = 'ease' | 'ease-in' | 'ease-out' | 'ease-in-out' | 'linear' | string;
export declare function transition(property?: TransitionProperty, duration?: number, timing?: TransitionTiming, delay?: number): {
    transition: string;
};
export declare function multipleTransitions(...transitions: ReturnType<typeof transition>[]): {
    transition: string;
};
export {};
