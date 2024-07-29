import { isValidColor } from "./colorValidator";

export function parseColor(color: string): [number, number, number] {
  if (color.startsWith("#")) {
    return hexToRgb(color);
  } else if (color.startsWith("rgb")) {
    const match = color.match(/\d+/g);
    if (match) {
      return match.map(Number) as [number, number, number];
    }
  } else if (color.startsWith("hsl")) {
    const match = color.match(/\d+/g);
    if (match) {
      const [h, s, l] = match.map(Number);
      return hslToRgb(h, s, l);
    }
  }
  throw new Error("Invalid color format");
}

export function hexToRgb(hex: string): [number, number, number] {
  // Ensure the hex color starts with '#'
  if (!hex.startsWith("#")) {
    hex = "#" + hex;
  }

  // Use isValidColor to check if it's a valid hex color
  if (!isValidColor(hex)) {
    throw new Error("Invalid hex color.");
  }

  // Remove the hash
  hex = hex.slice(1);

  // Parse the hex string
  let r: number, g: number, b: number;
  if (hex.length === 3) {
    r = parseInt(hex[0] + hex[0], 16);
    g = parseInt(hex[1] + hex[1], 16);
    b = parseInt(hex[2] + hex[2], 16);
  } else if (hex.length === 6) {
    r = parseInt(hex.slice(0, 2), 16);
    g = parseInt(hex.slice(2, 4), 16);
    b = parseInt(hex.slice(4, 6), 16);
  } else {
    throw new Error("Invalid hex color.");
  }

  return [r, g, b];
}

export function rgbToHex(r: number, g: number, b: number): string {
  r = Math.floor(Math.max(0, Math.min(255, r)));
  g = Math.floor(Math.max(0, Math.min(255, g)));
  b = Math.floor(Math.max(0, Math.min(255, b)));

  const toHex = (c: number): string => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

export function hslToRgb(
  h: number,
  s: number,
  l: number,
): [number, number, number] {
  // Ensure h is between 0 and 360
  h = ((h % 360) + 360) % 360;
  // Ensure s and l are between 0 and 100
  s = Math.max(0, Math.min(100, s));
  l = Math.max(0, Math.min(100, l));

  // Convert s and l to decimals
  s /= 100;
  l /= 100;

  const c = (1 - Math.abs(2 * l - 1)) * s;
  const x = c * (1 - Math.abs(((h / 60) % 2) - 1));
  const m = l - c / 2;

  let r, g, b;
  if (h < 60) {
    [r, g, b] = [c, x, 0];
  } else if (h < 120) {
    [r, g, b] = [x, c, 0];
  } else if (h < 180) {
    [r, g, b] = [0, c, x];
  } else if (h < 240) {
    [r, g, b] = [0, x, c];
  } else if (h < 300) {
    [r, g, b] = [x, 0, c];
  } else {
    [r, g, b] = [c, 0, x];
  }

  return [
    Math.round((r + m) * 255),
    Math.round((g + m) * 255),
    Math.round((b + m) * 255),
  ];
}

export function rgbToHsl(
  r: number,
  g: number,
  b: number,
): [number, number, number] {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s;
  const l = (max + min) / 2;

  if (max === min) {
    h = s = 0;
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return [Math.round(h * 360), Math.round(s * 100), Math.round(l * 100)];
}

export function hslToHex(h: number, s: number, l: number): string {
  h = ((h % 360) + 360) % 360;
  s = Math.max(0, Math.min(100, s)) / 100;
  l = Math.max(0, Math.min(100, l)) / 100;

  if (l === 1) {
    // Edge case: 100% lightness always results in white
    return "#FFFFFF";
  }

  if (l === 0) {
    // Edge case: 0% lightness always results in black
    return "#000000";
  }

  const [r, g, b] = hslToRgb(h, s * 100, l * 100);

  const toHex = (c: number): string => {
    const hex = c.toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}
