import {
  fontSize,
  fontWeight,
  lineHeight,
  letterSpacing,
  textAlign,
  textTransform,
  fontFamily,
  textDecoration,
  fontStyle,
  createTypography,
} from "../typography/typography";

describe("Typography Utilities", () => {
  describe("fontSize", () => {
    test("creates correct styles with single value", () => {
      expect(fontSize("16px")).toEqual({ fontSize: { base: "16px" } });
    });

    test("creates correct styles with responsive values", () => {
      const result = fontSize({ base: "16px", md: "18px", lg: "20px" });
      expect(result).toEqual({
        fontSize: { base: "16px", md: "18px", lg: "20px" },
      });
    });
  });

  describe("fontWeight", () => {
    test("creates correct styles with single value", () => {
      expect(fontWeight("bold")).toEqual({ fontWeight: { base: "bold" } });
    });

    test("creates correct styles with numeric weight", () => {
      expect(fontWeight(700)).toEqual({ fontWeight: { base: 700 } });
    });

    test("creates correct styles with responsive values", () => {
      const result = fontWeight({ base: "normal", md: "bold" });
      expect(result).toEqual({ fontWeight: { base: "normal", md: "bold" } });
    });
  });

  describe("lineHeight", () => {
    test("creates correct styles with single value", () => {
      expect(lineHeight(1.5)).toEqual({ lineHeight: { base: 1.5 } });
    });

    test("creates correct styles with string value", () => {
      expect(lineHeight("2em")).toEqual({ lineHeight: { base: "2em" } });
    });

    test("creates correct styles with responsive values", () => {
      const result = lineHeight({ base: 1.5, md: 1.6, lg: 1.7 });
      expect(result).toEqual({ lineHeight: { base: 1.5, md: 1.6, lg: 1.7 } });
    });
  });

  describe("letterSpacing", () => {
    test("creates correct styles with single value", () => {
      expect(letterSpacing("0.05em")).toEqual({
        letterSpacing: { base: "0.05em" },
      });
    });

    test("creates correct styles with numeric value", () => {
      expect(letterSpacing(2)).toEqual({ letterSpacing: { base: 2 } });
    });

    test("creates correct styles with responsive values", () => {
      const result = letterSpacing({ base: "0.05em", md: "0.1em" });
      expect(result).toEqual({
        letterSpacing: { base: "0.05em", md: "0.1em" },
      });
    });
  });

  describe("textAlign", () => {
    test("creates correct styles with single value", () => {
      expect(textAlign("center")).toEqual({ textAlign: { base: "center" } });
    });

    test("creates correct styles with responsive values", () => {
      const result = textAlign({ base: "left", md: "center", lg: "right" });
      expect(result).toEqual({
        textAlign: { base: "left", md: "center", lg: "right" },
      });
    });
  });

  describe("textTransform", () => {
    test("creates correct styles with single value", () => {
      expect(textTransform("uppercase")).toEqual({
        textTransform: "uppercase",
      });
    });

    test("creates correct styles with responsive values", () => {
      const result = textTransform({ base: "none", md: "uppercase" });
      expect(result).toEqual({
        textTransform: { base: "none", md: "uppercase" },
      });
    });
  });

  describe("fontFamily", () => {
    test("creates correct styles with single value", () => {
      expect(fontFamily("Arial, sans-serif")).toEqual({
        fontFamily: "Arial, sans-serif",
      });
    });

    test("creates correct styles with responsive values", () => {
      const result = fontFamily({
        base: "Arial, sans-serif",
        md: "Helvetica, sans-serif",
      });
      expect(result).toEqual({
        fontFamily: { base: "Arial, sans-serif", md: "Helvetica, sans-serif" },
      });
    });
  });

  describe("textDecoration", () => {
    test("creates correct styles with single value", () => {
      expect(textDecoration("underline")).toEqual({
        textDecoration: "underline",
      });
    });

    test("creates correct styles with responsive values", () => {
      const result = textDecoration({ base: "none", md: "underline" });
      expect(result).toEqual({
        textDecoration: { base: "none", md: "underline" },
      });
    });
  });

  describe("fontStyle", () => {
    test("creates correct styles with single value", () => {
      expect(fontStyle("italic")).toEqual({ fontStyle: "italic" });
    });

    test("creates correct styles with responsive values", () => {
      const result = fontStyle({ base: "normal", md: "italic" });
      expect(result).toEqual({ fontStyle: { base: "normal", md: "italic" } });
    });
  });

  describe("createTypography", () => {
    test("creates correct styles for heading preset", () => {
      const result = createTypography(
        "heading",
        { base: "24px", md: "32px" },
        "bold",
        "center",
      );
      expect(result).toEqual({
        fontSize: "24px",
        fontWeight: "bold",
        textAlign: "center",
        lineHeight: "1.2",
        letterSpacing: "-0.02em",
        "@media (min-width: 768px)": {
          fontSize: "32px",
        },
      });
    });

    test("creates correct styles for body preset", () => {
      const result = createTypography("body", { base: "16px", lg: "18px" });
      expect(result).toEqual({
        fontSize: "16px",
        fontWeight: "normal",
        textAlign: "left",
        lineHeight: "1.5",
        "@media (min-width: 1024px)": {
          fontSize: "18px",
        },
      });
    });

    test("handles invalid preset", () => {
      expect(() => createTypography("invalid" as any, "16px")).toThrow(
        "Invalid typography preset",
      );
    });
  });
});
