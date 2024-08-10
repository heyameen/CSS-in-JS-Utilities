type ShadowSize = "sm" | "md" | "lg" | "xl" | "2xl";
export declare const boxShadow: (size?: ShadowSize, color?: string, inset?: boolean) => {
    boxShadow: string;
};
export declare const textShadow: (size?: ShadowSize, color?: string) => {
    textShadow: string;
};
export {};
