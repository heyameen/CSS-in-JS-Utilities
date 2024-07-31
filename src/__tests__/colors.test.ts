/**
 * @jest-environment jsdom
 */
import "@testing-library/jest-dom";
import {
  analogous,
  complementary,
  darken,
  lighten,
  toRgba,
} from "../color/colors";
import {
  hexToRgb,
  hslToHex,
  hslToRgb,
  parseColor,
  rgbToHex,
  rgbToHsl,
} from "../color/colorHelpers";

beforeAll(() => {
  // Mock createElement
  const mockElement = {
    style: {},
    remove: jest.fn(),
  };
  jest
    .spyOn(document, "createElement")
    .mockReturnValue(mockElement as unknown as HTMLElement);

  // Mock appendChild and removeChild
  jest.spyOn(document.body, "appendChild").mockImplementation((node) => node);
  jest.spyOn(document.body, "removeChild").mockImplementation((node) => node);

  // Mock getComputedStyle
  jest
    .spyOn(window, "getComputedStyle")
    .mockReturnValue({ color: "rgb(0, 0, 0)" } as CSSStyleDeclaration);
});

afterAll(() => {
  jest.restoreAllMocks();
});

function parseHex(hex: string): number {
  return parseInt(hex.slice(1), 16);
}

describe("Color Utility Functions", () => {
  describe("toRgba", () => {
    it("should convert valid colors to rgba", () => {
      expect(toRgba("#FF0000")).toBe("rgba(255, 0, 0, 1)");
      expect(toRgba("rgb(0, 255, 0)")).toBe("rgba(0, 255, 0, 1)");
      expect(toRgba("hsl(240, 100%, 50%)")).toBe("rgba(0, 0, 255, 1)");
    });

    it("should handle alpha values", () => {
      expect(toRgba("#FF0000", 0.5)).toBe("rgba(255, 0, 0, 0.5)");
    });

    it("should clamp alpha values", () => {
      expect(toRgba("#FF0000", 1.5)).toBe("rgba(255, 0, 0, 1)");
      expect(toRgba("#FF0000", -0.5)).toBe("rgba(255, 0, 0, 0)");
    });

    it("should throw an error for invalid colors", () => {
      expect(() => toRgba("not-a-color")).toThrow("Invalid color format");
    });

    it("should handle color keywords", () => {
      expect(toRgba("red")).toBe("rgba(255, 0, 0, 1)");
      expect(toRgba("blue")).toBe("rgba(0, 0, 255, 1)");
    });

    it("should handle edge case colors", () => {
      expect(toRgba("#000000")).toBe("rgba(0, 0, 0, 1)");
      expect(toRgba("#FFFFFF")).toBe("rgba(255, 255, 255, 1)");
    });
  });

  describe("lighten", () => {
    it("should lighten colors", () => {
      const colors = ["#000000", "#800000", "#FF0000", "#FFFFFF"];
      colors.forEach((color) => {
        const lightened = lighten(color, 20);
        expect(parseHex(lightened)).toBeGreaterThanOrEqual(parseHex(color));
      });
    });

    it("should handle 100% lightness", () => {
      expect(lighten("#000000", 100)).toBe("#FFFFFF");
    });

    it("should not go beyond 100% lightness", () => {
      expect(lighten("#FFFFFF", 20)).toBe("#FFFFFF");
    });

    it("should throw an error for invalid colors", () => {
      expect(() => lighten("invalid-color", 20)).toThrow(
        "Invalid color format",
      );
    });
    it("should handle 0% lightening", () => {
      expect(lighten("#800000", 0)).toBe("#800000");
    });
  });

  describe("darken", () => {
    it("should darken colors", () => {
      const colors = ["#FFFFFF", "#FF0000", "#800000", "#000000"];
      colors.forEach((color) => {
        const darkened = darken(color, 20);
        expect(parseHex(darkened)).toBeLessThanOrEqual(parseHex(color));
      });
    });

    it("should handle 0% lightness", () => {
      expect(darken("#FFFFFF", 100)).toBe("#000000");
    });

    it("should not go beyond 0% lightness", () => {
      expect(darken("#000000", 20)).toBe("#000000");
    });

    it("should throw an error for invalid colors", () => {
      expect(() => darken("invalid-color", 20)).toThrow("Invalid color format");
    });

    it("should handle 0% darkening", () => {
      expect(darken("#800000", 0)).toBe("#800000");
    });
  });

  describe("complementary", () => {
    it("should generate complementary colors correctly", () => {
      expect(complementary("#FF0000")).toBe("#00FFFF");
      expect(complementary("rgb(0, 255, 0)")).toBe("#FF00FF");
      expect(complementary("hsl(60, 100%, 50%)")).toBe("#0000FF");
    });

    it("should handle grayscale colors", () => {
      expect(complementary("#808080")).toBe("#808080");
    });

    it("should throw an error for invalid colors", () => {
      expect(() => complementary("invalid-color")).toThrow(
        "Invalid color format",
      );
    });

    it("should handle edge case colors", () => {
      expect(complementary("#000000")).toBe("#000000");
      expect(complementary("#FFFFFF")).toBe("#FFFFFF");
    });
  });

  describe("analogous", () => {
    it("should generate analogous color correctly for different inputs", () => {
      expect(analogous("#FF0000")).toBe("#FF8000");
      expect(analogous("#00FF00")).toBe("#00FF80");
      expect(analogous("#0000FF")).toBe("#8000FF");
    });

    it("should respect custom angles", () => {
      expect(analogous("#FF0000", 60)).toBe("#FFFF00");
      expect(analogous("#00FF00", 45)).toBe("#00FFBF");
      expect(analogous("#0000FF", 90)).toBe("#FF0080");
    });

    it("should produce colors close to expected values for edge cases", () => {
      const initialColor = "#0000FF";
      const angle = 90;
      const [initialR, initialG, initialB] = parseColor(initialColor);
      const [initialH, initialS, initialL] = rgbToHsl(
        initialR,
        initialG,
        initialB,
      );
      const expectedH = (initialH + angle) % 360;
      const [expectedR, expectedG, expectedB] = hslToRgb(
        expectedH,
        initialS,
        initialL,
      );
      const expectedColor = rgbToHex(expectedR, expectedG, expectedB);
      const result = analogous(initialColor, angle);

      const colorDifference = (color1: string, color2: string) => {
        const [r1, g1, b1] = parseColor(color1);
        const [r2, g2, b2] = parseColor(color2);
        return Math.sqrt(
          Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2),
        );
      };

      const difference = colorDifference(result, expectedColor);

      expect(difference).toBeLessThan(5);
    });

    it("should handle edge case angles", () => {
      expect(() => analogous("#FF0000", 0)).toThrow();
      expect(() => analogous("#FF0000", 360)).toThrow();
    });

    it("should handle different input color formats", () => {
      const hexResult = analogous("#FF0000");
      const rgbResult = analogous("rgb(255, 0, 0)");
      const hslResult = analogous("hsl(0, 100%, 50%)");

      expect(hexResult).toBe("#FF8000");
      expect(rgbResult).toBe("#FF8000");
      expect(hslResult).toBe("#FF8000");

      expect(hexResult).toBe(rgbResult);
      expect(rgbResult).toBe(hslResult);
    });
  });
});

describe("Color Conversion Functions", () => {
  describe("rgbToHex", () => {
    it("should convert RGB to hex correctly", () => {
      expect(rgbToHex(255, 0, 0)).toBe("#FF0000");
      expect(rgbToHex(0, 255, 0)).toBe("#00FF00");
      expect(rgbToHex(0, 0, 255)).toBe("#0000FF");
    });

    it("should handle edge cases", () => {
      expect(rgbToHex(0, 0, 0)).toBe("#000000");
      expect(rgbToHex(255, 255, 255)).toBe("#FFFFFF");
    });

    it("should clamp values", () => {
      expect(rgbToHex(300, -50, 1000)).toBe("#FF00FF");
    });

    it("should handle decimal values", () => {
      expect(rgbToHex(128.4, 0.6, 255.9)).toBe("#8001FF");
    });
  });

  describe("hexToRgb", () => {
    it("should convert hex to RGB correctly", () => {
      expect(hexToRgb("#FF0000")).toEqual([255, 0, 0]);
      expect(hexToRgb("#00FF00")).toEqual([0, 255, 0]);
      expect(hexToRgb("#0000FF")).toEqual([0, 0, 255]);
    });

    it("should handle short hex format", () => {
      expect(hexToRgb("#F00")).toEqual([255, 0, 0]);
    });

    it("should throw error for invalid hex", () => {
      expect(() => hexToRgb("#GG0000")).toThrow();
    });
  });

  describe("rgbToHsl", () => {
    it("should convert RGB to HSL correctly", () => {
      expect(rgbToHsl(255, 0, 0)).toEqual([0, 100, 50]);
      expect(rgbToHsl(0, 255, 0)).toEqual([120, 100, 50]);
      expect(rgbToHsl(0, 0, 255)).toEqual([240, 100, 50]);
    });

    it("should handle grayscale colors", () => {
      expect(rgbToHsl(128, 128, 128)).toEqual([0, 0, 50]);
    });

    it("should handle edge case colors", () => {
      expect(rgbToHsl(0, 0, 0)).toEqual([0, 0, 0]);
      expect(rgbToHsl(255, 255, 255)).toEqual([0, 0, 100]);
    });
  });

  describe("hslToRgb", () => {
    it("should convert HSL to RGB correctly", () => {
      expect(hslToRgb(0, 100, 50)).toEqual([255, 0, 0]);
      expect(hslToRgb(120, 100, 50)).toEqual([0, 255, 0]);
      expect(hslToRgb(240, 100, 50)).toEqual([0, 0, 255]);
    });

    it("should handle grayscale colors", () => {
      expect(hslToRgb(0, 0, 50)).toEqual([128, 128, 128]);
    });

    it("should handle edge case hues", () => {
      expect(hslToRgb(360, 100, 50)).toEqual([255, 0, 0]);
      expect(hslToRgb(-360, 100, 50)).toEqual([255, 0, 0]);
    });
  });

  describe("hslToHex", () => {
    it("should convert HSL to hex correctly", () => {
      expect(hslToHex(0, 100, 50)).toBe("#FF0000");
      expect(hslToHex(120, 100, 50)).toBe("#00FF00");
      expect(hslToHex(240, 100, 50)).toBe("#0000FF");
    });

    it("should handle grayscale colors", () => {
      expect(hslToHex(0, 0, 50)).toBe("#808080");
    });

    it("should handle edge case lightness", () => {
      expect(hslToHex(0, 0, 0)).toBe("#000000");
      expect(hslToHex(0, 0, 100)).toBe("#FFFFFF");
    });
  });
});
