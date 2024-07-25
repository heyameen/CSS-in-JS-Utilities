import {Breakpoint, responsive} from '../responsive/breakpoints';
import isValidCSSUnit from "../helper/isValidCSSUnit";

type FontWeight = 'normal' | 'bold' | 'lighter' | 'bolder' | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type TextAlign = 'left' | 'right' | 'center' | 'justify';
type TextTransform = 'none' | 'capitalize' | 'uppercase' | 'lowercase';
type TextDecoration = 'none' | 'underline' | 'overline' | 'line-through';
type FontStyle = 'normal' | 'italic' | 'oblique';

export const fontSize = (size: string | number | Record<string, string | number>) => {
    if (typeof size === 'object') {
        Object.entries(size).forEach(([key, value]) => {
            if (!isValidCSSUnit(value)) {
                throw new Error(`Invalid font size value for ${key}: ${value}. Use a number or a string with a valid CSS unit.`);
            }
        });
    } else if (!isValidCSSUnit(size)) {
        throw new Error(`Invalid font size value: ${size}. Use a number or a string with a valid CSS unit.`);
    }
    return responsive({ fontSize: size });
};

export const fontWeight = (weight: FontWeight | Record<string, FontWeight>) => {
    if (typeof weight === 'string' && !['normal', 'bold', 'lighter', 'bolder'].includes(weight)) {
        throw new Error('Invalid font weight');
    }
    return responsive({ fontWeight: weight });
};

export const lineHeight = (height: string | number | Record<string, string | number>) => {
    if (typeof height === 'object') {
        Object.entries(height).forEach(([key, value]) => {
            if (!isValidCSSUnit(value) && typeof value !== 'number') {
                throw new Error(`Invalid line height value for ${key}: ${value}. Use a number or a string with a valid CSS unit.`);
            }
        });
    } else if (!isValidCSSUnit(height) && typeof height !== 'number') {
        throw new Error(`Invalid line height value: ${height}. Use a number or a string with a valid CSS unit.`);
    }
    return responsive({ lineHeight: height });
};

export const letterSpacing = (spacing: string | number | Record<string, string | number>) => {
    if (typeof spacing === 'object') {
        Object.entries(spacing).forEach(([key, value]) => {
            if (!isValidCSSUnit(value)) {
                throw new Error(`Invalid letter spacing value for ${key}: ${value}. Use a number or a string with a valid CSS unit.`);
            }
        });
    } else if (!isValidCSSUnit(spacing)) {
        throw new Error(`Invalid letter spacing value: ${spacing}. Use a number or a string with a valid CSS unit.`);
    }
    return responsive({ letterSpacing: spacing });
};

export const textAlign = (align: TextAlign | Record<string, TextAlign>) => {
    if (typeof align === 'string' && !['left', 'right', 'center', 'justify'].includes(align)) {
        throw new Error('Invalid text align');
    }
    return responsive({ textAlign: align });
};

export const textTransform = (transform: TextTransform | Record<string, TextTransform>) => {
    if (typeof transform === 'string' && !['none', 'capitalize', 'uppercase', 'lowercase'].includes(transform)) {
        throw new Error('Invalid text transform');
    }
    return responsive({ textTransform: transform });
};

export const fontFamily = (family: string | Record<string, string>) => {
    if (typeof family === 'string' && family.trim() === '') {
        throw new Error('Font family cannot be empty');
    }
    return responsive({ fontFamily: family });
};

export const textDecoration = (decoration: TextDecoration | Record<string, TextDecoration>) => {
    if (typeof decoration === 'string' && !['none', 'underline', 'overline', 'line-through'].includes(decoration)) {
        throw new Error('Invalid text decoration');
    }
    return responsive({ textDecoration: decoration });
};

export const fontStyle = (style: FontStyle | Record<string, FontStyle>) => {
    if (typeof style === 'string' && !['normal', 'italic', 'oblique'].includes(style)) {
        throw new Error('Invalid font style');
    }
    return responsive({ fontStyle: style });
};



function getPresetStyles(preset: 'heading' | 'subheading' | 'body' | 'caption') {
    switch (preset) {
        case 'heading':
            return { ...lineHeight(1.2), ...letterSpacing('-0.02em') };
        case 'subheading':
            return { ...lineHeight(1.3), ...letterSpacing('-0.01em') };
        case 'body':
            return { ...lineHeight(1.5) };
        case 'caption':
            return { ...lineHeight(1.4), ...letterSpacing('0.01em') };
    }
}

export function createTypography(
    preset: 'heading' | 'subheading' | 'body' | 'caption',
    size: string | Partial<Record<Breakpoint, string>>,
    weight: FontWeight | Partial<Record<Breakpoint, FontWeight>> = 'normal',
    align: TextAlign | Partial<Record<Breakpoint, TextAlign>> = 'left'
) {
    if (!['heading', 'subheading', 'body', 'caption'].includes(preset)) {
        throw new Error('Invalid typography preset');
    }
    return {
        ...fontSize(size),
        ...fontWeight(weight),
        ...textAlign(align),
        ...getPresetStyles(preset),
    };
}
