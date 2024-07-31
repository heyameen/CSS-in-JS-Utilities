import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";
import mixPlugin from "colord/plugins/mix";
import harmoniesPlugin from "colord/plugins/harmonies";

extend([namesPlugin, mixPlugin, harmoniesPlugin]);

export const toRgba = (color: string, alpha: number = 1): string => {
  const parsed = colord(color);
  if (!parsed.isValid()) {
    throw new Error("Invalid color format");
  }
  alpha = Math.max(0, Math.min(1, alpha)); // Clamp alpha between 0 and 1
  const { r, g, b } = parsed.toRgb();
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
};

// Lighten a color by a percentage
export const lighten = (color: string, amount: number): string => {
  const parsed = colord(color);
  if (!parsed.isValid()) {
    throw new Error("Invalid color format");
  }
  return parsed
    .lighten(amount / 100)
    .toHex()
    .toUpperCase();
};

// Darken a color by a percentage
export const darken = (color: string, percentage: number): string => {
  const parsed = colord(color);
  if (!parsed.isValid()) {
    throw new Error("Invalid color format");
  }

  return parsed
    .darken(percentage / 100)
    .toHex()
    .toUpperCase();
};

// Generate a complementary color
export const complementary = (color: string): string => {
  const parsed = colord(color);
  if (!parsed.isValid()) {
    throw new Error("Invalid color format");
  }
  return parsed.rotate(180).toHex().toUpperCase();
};

// Generate an analogous color
export const analogous = (color: string, angle: number = 30): string => {
  const parsed = colord(color);
  if (!parsed.isValid()) {
    throw new Error("Invalid color format");
  }

  if (angle <= 0 || angle >= 360) {
    throw new Error("Angle must be between 1 and 359 degrees.");
  }

  return parsed.rotate(angle).toHex().toUpperCase();
};
