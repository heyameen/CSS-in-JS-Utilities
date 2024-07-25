export type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const breakpoints: Record<'base' | Breakpoint, string> = {
    base: '0',
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px',
};

type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

export const responsive = <T extends Record<string, any>>(styles: {
    [K in keyof T]: ResponsiveValue<T[K]>;
}) => {
    const bps = ['base', ...Object.keys(breakpoints)] as ('base' | Breakpoint)[];

    return bps.reduce((acc, bp) => {
        const currentStyles = Object.entries(styles).reduce((styleAcc, [property, value]) => {
            if (typeof value === 'object' && value !== null) {
                if (bp in value && value[bp as keyof typeof value] !== undefined) {
                    styleAcc[property] = value[bp as keyof typeof value];
                }
            } else if (bp === 'base') {
                styleAcc[property] = value;
            }
            return styleAcc;
        }, {} as Record<string, any>);

        if (Object.keys(currentStyles).length > 0) {
            if (bp === 'base') {
                Object.assign(acc, currentStyles);
            } else {
                acc[`@media (min-width: ${breakpoints[bp as Breakpoint]})`] = currentStyles;
            }
        }

        return acc;
    }, {} as Record<string, any>);
};

