import { isValidColor } from "./colorValidator";
import {
  hslToHex,
  hslToRgb,
  parseColor,
  rgbToHex,
  rgbToHsl,
} from "./colorHelpers";

export const toRgba = (color: string, alpha: number = 1): string => {
  if (!isValidColor(color)) {
    throw new Error("Invalid color format");
  }
  const [r, g, b] = parseColor(color);
  alpha = Math.max(0, Math.min(1, alpha)); // Clamp alpha between 0 and 1
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Lighten a color by a percentage
export const lighten = (color: string, amount: number): string => {
  if (!isValidColor(color)) {
    throw new Error("Invalid color format");
  }
  const [h, s, l] = rgbToHsl(...parseColor(color));
  const newL = Math.min(100, l + amount);
  return hslToHex(h, s, newL);
};

// Darken a color by a percentage
export const darken = (color: string, percentage: number): string => {
  if (!isValidColor(color)) {
    throw new Error("Invalid color format");
  }
  const [r, g, b] = parseColor(color);
  console.log(`Initial RGB: ${r}, ${g}, ${b}`);

  // Calculate the amount to darken (20% of 255 is 51)
  const darkenAmount = Math.round((255 * percentage) / 100);
  console.log(`Darken amount: ${darkenAmount}`);

  // Subtract this amount from each component, ensuring we don't go below 0
  const newR = Math.max(0, r - darkenAmount);
  const newG = Math.max(0, g - darkenAmount);
  const newB = Math.max(0, b - darkenAmount);
  console.log(`Final RGB: ${newR}, ${newG}, ${newB}`);

  // Convert to hex and return
  const result = rgbToHex(newR, newG, newB);
  console.log(`Final HEX: ${result}`);

  return result;
};
console.log(darken("#FF6666", 20));
// Generate a complementary color
export const complementary = (color: string): string => {
  if (!isValidColor(color)) {
    throw new Error("Invalid color format");
  }
  const [h, s, l] = rgbToHsl(...parseColor(color));
  const newH = (h + 180) % 360;
  return hslToHex(newH, s, l);
};

// Generate an analogous color palette
export const analogous = (color: string, angle: number = 30): string => {
  if (!isValidColor(color)) {
    throw new Error("Invalid color format");
  }

  if (angle <= 0 || angle >= 360) {
    throw new Error("Angle must be between 1 and 359 degrees.");
  }

  const [r, g, b] = parseColor(color);
  let [h, s, l] = rgbToHsl(r, g, b);
  h = (h + angle) % 360;
  if (h < 0) h += 360;
  const [newR, newG, newB] = hslToRgb(h, s, l);

  return rgbToHex(newR, newG, newB);
};
