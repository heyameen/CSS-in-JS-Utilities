"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @jest-environment jsdom
 */
require("@testing-library/jest-dom");
const colors_1 = require("../color/colors");
const colorHelpers_1 = require("../color/colorHelpers");
beforeAll(() => {
    // Mock createElement
    const mockElement = {
        style: {},
        remove: jest.fn(),
    };
    jest
        .spyOn(document, "createElement")
        .mockReturnValue(mockElement);
    // Mock appendChild and removeChild
    jest.spyOn(document.body, "appendChild").mockImplementation((node) => node);
    jest.spyOn(document.body, "removeChild").mockImplementation((node) => node);
    // Mock getComputedStyle
    jest
        .spyOn(window, "getComputedStyle")
        .mockReturnValue({ color: "rgb(0, 0, 0)" });
});
afterAll(() => {
    jest.restoreAllMocks();
});
function parseHex(hex) {
    return parseInt(hex.slice(1), 16);
}
describe("Color Utility Functions", () => {
    describe("toRgba", () => {
        it("should convert valid colors to rgba", () => {
            expect((0, colors_1.toRgba)("#FF0000")).toBe("rgba(255, 0, 0, 1)");
            expect((0, colors_1.toRgba)("rgb(0, 255, 0)")).toBe("rgba(0, 255, 0, 1)");
            expect((0, colors_1.toRgba)("hsl(240, 100%, 50%)")).toBe("rgba(0, 0, 255, 1)");
        });
        it("should handle alpha values", () => {
            expect((0, colors_1.toRgba)("#FF0000", 0.5)).toBe("rgba(255, 0, 0, 0.5)");
        });
        it("should clamp alpha values", () => {
            expect((0, colors_1.toRgba)("#FF0000", 1.5)).toBe("rgba(255, 0, 0, 1)");
            expect((0, colors_1.toRgba)("#FF0000", -0.5)).toBe("rgba(255, 0, 0, 0)");
        });
        it("should throw an error for invalid colors", () => {
            expect(() => (0, colors_1.toRgba)("not-a-color")).toThrow("Invalid color format");
        });
        it("should handle color keywords", () => {
            expect((0, colors_1.toRgba)("red")).toBe("rgba(255, 0, 0, 1)");
            expect((0, colors_1.toRgba)("blue")).toBe("rgba(0, 0, 255, 1)");
        });
        it("should handle edge case colors", () => {
            expect((0, colors_1.toRgba)("#000000")).toBe("rgba(0, 0, 0, 1)");
            expect((0, colors_1.toRgba)("#FFFFFF")).toBe("rgba(255, 255, 255, 1)");
        });
    });
    describe("lighten", () => {
        it("should lighten colors", () => {
            const colors = ["#000000", "#800000", "#FF0000", "#FFFFFF"];
            colors.forEach((color) => {
                const lightened = (0, colors_1.lighten)(color, 20);
                expect(parseHex(lightened)).toBeGreaterThanOrEqual(parseHex(color));
            });
        });
        it("should handle 100% lightness", () => {
            expect((0, colors_1.lighten)("#000000", 100)).toBe("#FFFFFF");
        });
        it("should not go beyond 100% lightness", () => {
            expect((0, colors_1.lighten)("#FFFFFF", 20)).toBe("#FFFFFF");
        });
        it("should throw an error for invalid colors", () => {
            expect(() => (0, colors_1.lighten)("invalid-color", 20)).toThrow("Invalid color format");
        });
        it("should handle 0% lightening", () => {
            expect((0, colors_1.lighten)("#800000", 0)).toBe("#800000");
        });
    });
    describe("darken", () => {
        it("should darken colors", () => {
            const colors = ["#FFFFFF", "#FF0000", "#800000", "#000000"];
            colors.forEach((color) => {
                const darkened = (0, colors_1.darken)(color, 20);
                expect(parseHex(darkened)).toBeLessThanOrEqual(parseHex(color));
            });
        });
        it("should handle 0% lightness", () => {
            expect((0, colors_1.darken)("#FFFFFF", 100)).toBe("#000000");
        });
        it("should not go beyond 0% lightness", () => {
            expect((0, colors_1.darken)("#000000", 20)).toBe("#000000");
        });
        it("should throw an error for invalid colors", () => {
            expect(() => (0, colors_1.darken)("invalid-color", 20)).toThrow("Invalid color format");
        });
        it("should handle 0% darkening", () => {
            expect((0, colors_1.darken)("#800000", 0)).toBe("#800000");
        });
    });
    describe("complementary", () => {
        it("should generate complementary colors correctly", () => {
            expect((0, colors_1.complementary)("#FF0000")).toBe("#00FFFF");
            expect((0, colors_1.complementary)("rgb(0, 255, 0)")).toBe("#FF00FF");
            expect((0, colors_1.complementary)("hsl(60, 100%, 50%)")).toBe("#0000FF");
        });
        it("should handle grayscale colors", () => {
            expect((0, colors_1.complementary)("#808080")).toBe("#808080");
        });
        it("should throw an error for invalid colors", () => {
            expect(() => (0, colors_1.complementary)("invalid-color")).toThrow("Invalid color format");
        });
        it("should handle edge case colors", () => {
            expect((0, colors_1.complementary)("#000000")).toBe("#000000");
            expect((0, colors_1.complementary)("#FFFFFF")).toBe("#FFFFFF");
        });
    });
    describe("analogous", () => {
        it("should generate analogous color correctly for different inputs", () => {
            expect((0, colors_1.analogous)("#FF0000")).toBe("#FF8000");
            expect((0, colors_1.analogous)("#00FF00")).toBe("#00FF80");
            expect((0, colors_1.analogous)("#0000FF")).toBe("#8000FF");
        });
        it("should respect custom angles", () => {
            expect((0, colors_1.analogous)("#FF0000", 60)).toBe("#FFFF00");
            expect((0, colors_1.analogous)("#00FF00", 45)).toBe("#00FFBF");
            expect((0, colors_1.analogous)("#0000FF", 90)).toBe("#FF0080");
        });
        it("should produce colors close to expected values for edge cases", () => {
            const initialColor = "#0000FF";
            const angle = 90;
            const [initialR, initialG, initialB] = (0, colorHelpers_1.parseColor)(initialColor);
            const [initialH, initialS, initialL] = (0, colorHelpers_1.rgbToHsl)(initialR, initialG, initialB);
            const expectedH = (initialH + angle) % 360;
            const [expectedR, expectedG, expectedB] = (0, colorHelpers_1.hslToRgb)(expectedH, initialS, initialL);
            const expectedColor = (0, colorHelpers_1.rgbToHex)(expectedR, expectedG, expectedB);
            const result = (0, colors_1.analogous)(initialColor, angle);
            const colorDifference = (color1, color2) => {
                const [r1, g1, b1] = (0, colorHelpers_1.parseColor)(color1);
                const [r2, g2, b2] = (0, colorHelpers_1.parseColor)(color2);
                return Math.sqrt(Math.pow(r1 - r2, 2) + Math.pow(g1 - g2, 2) + Math.pow(b1 - b2, 2));
            };
            const difference = colorDifference(result, expectedColor);
            expect(difference).toBeLessThan(5);
        });
        it("should handle edge case angles", () => {
            expect(() => (0, colors_1.analogous)("#FF0000", 0)).toThrow();
            expect(() => (0, colors_1.analogous)("#FF0000", 360)).toThrow();
        });
        it("should handle different input color formats", () => {
            const hexResult = (0, colors_1.analogous)("#FF0000");
            const rgbResult = (0, colors_1.analogous)("rgb(255, 0, 0)");
            const hslResult = (0, colors_1.analogous)("hsl(0, 100%, 50%)");
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
            expect((0, colorHelpers_1.rgbToHex)(255, 0, 0)).toBe("#FF0000");
            expect((0, colorHelpers_1.rgbToHex)(0, 255, 0)).toBe("#00FF00");
            expect((0, colorHelpers_1.rgbToHex)(0, 0, 255)).toBe("#0000FF");
        });
        it("should handle edge cases", () => {
            expect((0, colorHelpers_1.rgbToHex)(0, 0, 0)).toBe("#000000");
            expect((0, colorHelpers_1.rgbToHex)(255, 255, 255)).toBe("#FFFFFF");
        });
        it("should clamp values", () => {
            expect((0, colorHelpers_1.rgbToHex)(300, -50, 1000)).toBe("#FF00FF");
        });
        it("should handle decimal values", () => {
            expect((0, colorHelpers_1.rgbToHex)(128.4, 0.6, 255.9)).toBe("#8001FF");
        });
    });
    describe("hexToRgb", () => {
        it("should convert hex to RGB correctly", () => {
            expect((0, colorHelpers_1.hexToRgb)("#FF0000")).toEqual([255, 0, 0]);
            expect((0, colorHelpers_1.hexToRgb)("#00FF00")).toEqual([0, 255, 0]);
            expect((0, colorHelpers_1.hexToRgb)("#0000FF")).toEqual([0, 0, 255]);
        });
        it("should handle short hex format", () => {
            expect((0, colorHelpers_1.hexToRgb)("#F00")).toEqual([255, 0, 0]);
        });
        it("should throw error for invalid hex", () => {
            expect(() => (0, colorHelpers_1.hexToRgb)("#GG0000")).toThrow();
        });
    });
    describe("rgbToHsl", () => {
        it("should convert RGB to HSL correctly", () => {
            expect((0, colorHelpers_1.rgbToHsl)(255, 0, 0)).toEqual([0, 100, 50]);
            expect((0, colorHelpers_1.rgbToHsl)(0, 255, 0)).toEqual([120, 100, 50]);
            expect((0, colorHelpers_1.rgbToHsl)(0, 0, 255)).toEqual([240, 100, 50]);
        });
        it("should handle grayscale colors", () => {
            expect((0, colorHelpers_1.rgbToHsl)(128, 128, 128)).toEqual([0, 0, 50]);
        });
        it("should handle edge case colors", () => {
            expect((0, colorHelpers_1.rgbToHsl)(0, 0, 0)).toEqual([0, 0, 0]);
            expect((0, colorHelpers_1.rgbToHsl)(255, 255, 255)).toEqual([0, 0, 100]);
        });
    });
    describe("hslToRgb", () => {
        it("should convert HSL to RGB correctly", () => {
            expect((0, colorHelpers_1.hslToRgb)(0, 100, 50)).toEqual([255, 0, 0]);
            expect((0, colorHelpers_1.hslToRgb)(120, 100, 50)).toEqual([0, 255, 0]);
            expect((0, colorHelpers_1.hslToRgb)(240, 100, 50)).toEqual([0, 0, 255]);
        });
        it("should handle grayscale colors", () => {
            expect((0, colorHelpers_1.hslToRgb)(0, 0, 50)).toEqual([128, 128, 128]);
        });
        it("should handle edge case hues", () => {
            expect((0, colorHelpers_1.hslToRgb)(360, 100, 50)).toEqual([255, 0, 0]);
            expect((0, colorHelpers_1.hslToRgb)(-360, 100, 50)).toEqual([255, 0, 0]);
        });
    });
    describe("hslToHex", () => {
        it("should convert HSL to hex correctly", () => {
            expect((0, colorHelpers_1.hslToHex)(0, 100, 50)).toBe("#FF0000");
            expect((0, colorHelpers_1.hslToHex)(120, 100, 50)).toBe("#00FF00");
            expect((0, colorHelpers_1.hslToHex)(240, 100, 50)).toBe("#0000FF");
        });
        it("should handle grayscale colors", () => {
            expect((0, colorHelpers_1.hslToHex)(0, 0, 50)).toBe("#808080");
        });
        it("should handle edge case lightness", () => {
            expect((0, colorHelpers_1.hslToHex)(0, 0, 0)).toBe("#000000");
            expect((0, colorHelpers_1.hslToHex)(0, 0, 100)).toBe("#FFFFFF");
        });
    });
});
