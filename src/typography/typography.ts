import { Breakpoint, responsive } from "../responsive/breakpoints";
import isValidCSSUnit from "../helper/isValidCSSUnit";

// Types
type FontWeight =
  | "normal"
  | "bold"
  | "lighter"
  | "bolder"
  | 100
  | 200
  | 300
  | 400
  | 500
  | 600
  | 700
  | 800
  | 900;
type TextAlign = "left" | "right" | "center" | "justify";
type TextTransform = "none" | "capitalize" | "uppercase" | "lowercase";
type TextDecoration = "none" | "underline" | "overline" | "line-through";
type FontStyle = "normal" | "italic" | "oblique";
type TypographyPreset = "heading" | "subheading" | "body" | "caption";

type CSSValue = string | number;
type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;

// Helper Functions
const validateCSSValue = (value: CSSValue, propertyName: string) => {
  if (!isValidCSSUnit(value)) {
    throw new Error(
      `Invalid ${propertyName} value: ${value}. Use a number or a string with a valid CSS unit.`,
    );
  }
};

const validateResponsiveValue = (
  value: ResponsiveValue<CSSValue>,
  propertyName: string,
) => {
  if (typeof value === "object" && value !== null) {
    Object.entries(value).forEach(([key, val]) =>
      validateCSSValue(val, `${propertyName} for ${key}`),
    );
  } else {
    validateCSSValue(value, propertyName);
  }
};

const createResponsiveProperty = <T>(
  property: string,
  value: ResponsiveValue<T>,
) => {
  return responsive({ [property]: value });
};

// Typography Functions
export const fontSize = (size: ResponsiveValue<CSSValue>) => {
  validateResponsiveValue(size, "font size");
  return createResponsiveProperty("fontSize", size);
};

export const fontWeight = (weight: ResponsiveValue<FontWeight>) => {
  return createResponsiveProperty("fontWeight", weight);
};

export const lineHeight = (height: ResponsiveValue<CSSValue>) => {
  validateResponsiveValue(height, "line height");
  return createResponsiveProperty("lineHeight", height);
};

export const letterSpacing = (spacing: ResponsiveValue<CSSValue>) => {
  validateResponsiveValue(spacing, "letter spacing");
  return createResponsiveProperty("letterSpacing", spacing);
};

export const textAlign = (align: ResponsiveValue<TextAlign>) => {
  return createResponsiveProperty("textAlign", align);
};

export const textTransform = (transform: ResponsiveValue<TextTransform>) => {
  return createResponsiveProperty("textTransform", transform);
};

export const fontFamily = (family: ResponsiveValue<string>) => {
  if (typeof family === "string" && family.trim() === "") {
    throw new Error("Font family cannot be empty");
  }
  return createResponsiveProperty("fontFamily", family);
};

export const textDecoration = (decoration: ResponsiveValue<TextDecoration>) => {
  return createResponsiveProperty("textDecoration", decoration);
};

export const fontStyle = (style: ResponsiveValue<FontStyle>) => {
  return createResponsiveProperty("fontStyle", style);
};

const presetStyles: Record<TypographyPreset, Record<string, any>> = {
  heading: { ...lineHeight(1.2), ...letterSpacing("-0.02em") },
  subheading: { ...lineHeight(1.3), ...letterSpacing("-0.01em") },
  body: { ...lineHeight(1.5) },
  caption: { ...lineHeight(1.4), ...letterSpacing("0.01em") },
};

export function createTypography(
  preset: TypographyPreset,
  size: ResponsiveValue<CSSValue>,
  weight: ResponsiveValue<FontWeight> = "normal",
  align: ResponsiveValue<TextAlign> = "left",
) {
  if (!presetStyles[preset]) {
    throw new Error("Invalid typography preset");
  }
  return {
    ...fontSize(size),
    ...fontWeight(weight),
    ...textAlign(align),
    ...presetStyles[preset],
  };
}
