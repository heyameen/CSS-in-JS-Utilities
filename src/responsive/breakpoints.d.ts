export type Breakpoint = 'base' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;
export declare const responsive: <T extends Record<string, any>>(styles: { [K in keyof T]: ResponsiveValue<T[K]>; }) => Record<string, any>;
export {};
