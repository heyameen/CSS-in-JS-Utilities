import { colord, extend } from "colord";
import namesPlugin from "colord/plugins/names";

extend([namesPlugin]);

export function parseColor(color: string): [number, number, number] {
  const parsed = colord(color);

  if (!parsed.isValid()) {
    throw new Error(`Invalid color format: ${color}`);
  }

  const { r, g, b } = parsed.toRgb();
  return [Math.round(r), Math.round(g), Math.round(b)];
}

export function hexToRgb(hex: string): [number, number, number] {
  const parsed = colord(hex);
  if (!parsed.isValid()) {
    throw new Error("Invalid hex color.");
  }

  const { r, g, b } = parsed.toRgb();
  return [Math.round(r), Math.round(g), Math.round(b)];
}

export function rgbToHex(r: number, g: number, b: number): string {
  return colord({ r, g, b }).toHex().toUpperCase();
}

export function hslToRgb(
  h: number,
  s: number,
  l: number,
): [number, number, number] {
  const { r, g, b } = colord({ h, s, l }).toRgb();
  return [Math.round(r), Math.round(g), Math.round(b)];
}

export function rgbToHsl(
  r: number,
  g: number,
  b: number,
): [number, number, number] {
  const { h, s, l } = colord({ r, g, b }).toHsl();
  return [Math.round(h), Math.round(s), Math.round(l)];
}

export function hslToHex(h: number, s: number, l: number): string {
  return colord({ h, s, l }).toHex().toUpperCase();
}
