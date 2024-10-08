export default function isValidCSSUnit(value: string | number): boolean {
  if (typeof value === "number") return true;
  return /^-?\d*\.?\d+(%|px|em|rem|vh|vw|vmin|vmax|ch|ex|cm|mm|in|pt|pc)$/.test(
    value,
  );
}
