import { Breakpoint } from '../responsive/breakpoints';
type FontWeight = 'normal' | 'bold' | 'lighter' | 'bolder' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type TextAlign = 'left' | 'right' | 'center' | 'justify';
type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase';
type TextDecoration = 'none' | 'underline' | 'overline' | 'line-through';
type FontStyle = 'normal' | 'italic' | 'oblique';
export declare const fontSize: (size: string | number | Record<string, string | number>) => Record<string, any>;
export declare const fontWeight: (weight: FontWeight | Record<string, FontWeight>) => Record<string, any>;
export declare const lineHeight: (height: string | number | Record<string, string | number>) => Record<string, any>;
export declare const letterSpacing: (spacing: string | number | Record<string, string | number>) => Record<string, any>;
export declare const textAlign: (align: TextAlign | Record<string, TextAlign>) => Record<string, any>;
export declare const textTransform: (transform: TextTransform | Record<string, TextTransform>) => Record<string, any>;
export declare const fontFamily: (family: string | Record<string, string>) => Record<string, any>;
export declare const textDecoration: (decoration: TextDecoration | Record<string, TextDecoration>) => Record<string, any>;
export declare const fontStyle: (style: FontStyle | Record<string, FontStyle>) => Record<string, any>;
export declare function createTypography(preset: 'heading' | 'subheading' | 'body' | 'caption', size: string | Partial<Record<Breakpoint, string>>, weight?: FontWeight | Partial<Record<Breakpoint, FontWeight>>, align?: TextAlign | Partial<Record<Breakpoint, TextAlign>>): {
    [x: string]: any;
};
export {};
