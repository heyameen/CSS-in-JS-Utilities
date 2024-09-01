import { colord, extend, type AnyColor } from "colord";
import namesPlugin from "colord/plugins/names";
import { isValidColor } from "../color/colorHelpers";

extend([namesPlugin]);

type ShadowSize = "sm" | "md" | "lg" | "xl" | "2xl" | "custom";

interface ShadowValues {
  x: number;
  y: number;
  blur: number;
  spread: number;
}

const shadowSizes: Record<Exclude<ShadowSize, "custom">, ShadowValues> = {
  sm: { x: 0, y: 1, blur: 2, spread: 0 },
  md: { x: 0, y: 2, blur: 4, spread: 0 },
  lg: { x: 0, y: 4, blur: 8, spread: 0 },
  xl: { x: 0, y: 8, blur: 16, spread: 0 },
  "2xl": { x: 0, y: 12, blur: 24, spread: 0 },
};

/**
 * Generates a box-shadow CSS property.
 * @param size - The size of the shadow, or custom values.
 * @param color - The color of the shadow.
 * @param inset - Whether the shadow should be inset.
 * @returns An object with the boxShadow CSS property.
 */
export const boxShadow = (
  size: ShadowSize | ShadowValues = "md",
  color: AnyColor = "rgba(0, 0, 0, 0.1)",
  inset: boolean = false,
) => {
  let shadowValues: ShadowValues;

  if (typeof size === "object") {
    shadowValues = size;
  } else if (size in shadowSizes) {
    shadowValues = shadowSizes[size as Exclude<ShadowSize, "custom">];
  } else {
    throw new Error(
      `Invalid shadow size: ${size}. Use a predefined size or provide custom values.`,
    );
  }

  if (!isValidColor(color)) {
    throw new Error(`Invalid color value: ${color}`);
  }

  const { x, y, blur, spread } = shadowValues;
  const insetPrefix = inset ? "inset " : "";
  return {
    boxShadow: `${insetPrefix}${x}px ${y}px ${blur}px ${spread}px ${color}`,
  };
};

/**
 * Generates a text-shadow CSS property.
 * @param size - The size of the shadow, or custom values.
 * @param color - The color of the shadow.
 * @returns An object with the textShadow CSS property.
 */
export const textShadow = (
  size: ShadowSize | Omit<ShadowValues, "spread"> = "md",
  color: AnyColor = "rgba(0, 0, 0, 0.1)",
) => {
  let shadowValues: Omit<ShadowValues, "spread">;

  if (typeof size === "object") {
    shadowValues = size;
  } else if (size in shadowSizes) {
    const { spread, ...rest } =
      shadowSizes[size as Exclude<ShadowSize, "custom">];
    shadowValues = rest;
  } else {
    throw new Error(
      `Invalid shadow size: ${size}. Use a predefined size or provide custom values.`,
    );
  }

  if (!colord(color).isValid()) {
    throw new Error(`Invalid color value: ${color}`);
  }

  const { x, y, blur } = shadowValues;
  return {
    textShadow: `${x}px ${y}px ${blur}px ${color}`,
  };
};
