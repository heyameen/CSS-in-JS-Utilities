import {
  toRgba,
  lighten,
  darken,
  complementary,
  analogous,
} from "../color/colors";

describe("Color Utilities", () => {
  describe("toRgba", () => {
    it("should convert hex color to rgba", () => {
      expect(toRgba("#FF0000")).toBe("rgba(255, 0, 0, 1)");
    });

    it("should convert named color to rgba", () => {
      expect(toRgba("red")).toBe("rgba(255, 0, 0, 1)");
    });

    it("should handle alpha value", () => {
      expect(toRgba("#00FF00", 0.5)).toBe("rgba(0, 255, 0, 0.5)");
    });

    it("should clamp alpha value between 0 and 1", () => {
      expect(toRgba("#0000FF", 1.5)).toBe("rgba(0, 0, 255, 1)");
      expect(toRgba("#0000FF", -0.5)).toBe("rgba(0, 0, 255, 0)");
    });

    it("should throw error for invalid color", () => {
      expect(() => toRgba("invalid")).toThrow("Invalid color format");
    });
  });

  describe("lighten", () => {
    it("should lighten a color", () => {
      expect(lighten("#800000", 20)).toBe("#E60000");
    });

    it("should return white when lightening by 100%", () => {
      expect(lighten("#800000", 100)).toBe("#FFFFFF");
    });

    it("should throw error for invalid color", () => {
      expect(() => lighten("invalid", 20)).toThrow("Invalid color format");
    });
  });

  describe("darken", () => {
    it("should darken a color", () => {
      expect(darken("#FF0000", 20)).toBe("#990000");
    });

    it("should return black when darkening by 100%", () => {
      expect(darken("#FF0000", 100)).toBe("#000000");
    });

    it("should throw error for invalid color", () => {
      expect(() => darken("invalid", 20)).toThrow("Invalid color format");
    });
  });

  describe("complementary", () => {
    it("should return complementary color", () => {
      expect(complementary("#FF0000")).toBe("#00FFFF");
    });

    it("should throw error for invalid color", () => {
      expect(() => complementary("invalid")).toThrow("Invalid color format");
    });
  });

  describe("analogous", () => {
    it("should return analogous color with default angle", () => {
      expect(analogous("#FF0000")).toBe("#FF8000");
    });

    it("should return analogous color with custom angle", () => {
      expect(analogous("#FF0000", 60)).toBe("#FFFF00");
    });

    it("should throw error for invalid color", () => {
      expect(() => analogous("invalid")).toThrow("Invalid color format");
    });

    it("should throw error for invalid angle", () => {
      expect(() => analogous("#FF0000", 0)).toThrow(
        "Angle must be between 1 and 359 degrees.",
      );
      expect(() => analogous("#FF0000", 360)).toThrow(
        "Angle must be between 1 and 359 degrees.",
      );
    });
  });
});
