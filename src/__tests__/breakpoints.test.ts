import {
  responsive,
  getResponsiveStyles,
  stringifyValue,
  clearStyles,
} from "../responsive/breakpoints";

// Mock the appendToStyleElement function
jest.mock("../helper/createStyle", () => ({
  appendToStyleElement: jest.fn(),
}));

describe("Responsive CSS-in-JS Utility", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Reset the responsiveProps and propIndex
    (global as any).responsiveProps = new Map();
    (global as any).propIndex = 0;
    clearStyles();
  });

  describe("responsive function", () => {
    it("should handle simple non-responsive styles", () => {
      const styles = responsive({
        color: "red",
        fontSize: "16px",
      });

      expect(styles).toEqual({
        color: "var(--css-in-js-utils-0)",
        fontSize: "var(--css-in-js-utils-1)",
      });
    });

    it("should handle responsive styles", () => {
      const styles = responsive({
        color: { base: "red", md: "blue" },
        fontSize: { base: "16px", lg: "20px" },
      });

      expect(styles).toEqual({
        color: "var(--css-in-js-utils-0)",
        fontSize: "var(--css-in-js-utils-1)",
      });
    });

    it("should handle mixed responsive and non-responsive styles", () => {
      const styles = responsive({
        color: "red",
        fontSize: { base: "16px", lg: "20px" },
      });

      expect(styles).toEqual({
        color: "var(--css-in-js-utils-0)",
        fontSize: "var(--css-in-js-utils-1)",
      });
    });
  });

  describe("getResponsiveStyles function", () => {
    it("should generate correct CSS for non-responsive styles", () => {
      responsive({
        color: "red",
        fontSize: "16px",
      });

      const css = getResponsiveStyles();
      expect(css).toBe(
        ":root { --css-in-js-utils-0: red;--css-in-js-utils-1: 16px; }",
      );
    });

    it("should generate correct CSS for responsive styles", () => {
      responsive({
        color: { base: "red", md: "blue" },
        fontSize: { base: "16px", lg: "20px" },
      });

      const css = getResponsiveStyles();
      expect(css).toBe(
        ":root { --css-in-js-utils-0: red;@media (min-width: 768px) { --css-in-js-utils-0: blue; }--css-in-js-utils-1: 16px;@media (min-width: 1024px) { --css-in-js-utils-1: 20px; } }",
      );
    });
  });

  describe("stringifyValue function", () => {
    it("should stringify simple values correctly", () => {
      const result = stringifyValue("red");
      expect(result).toBe("red");
    });

    it("should stringify numeric values correctly", () => {
      const result = stringifyValue(16);
      expect(result).toBe("16");
    });

    it("should stringify object values correctly", () => {
      const result = stringifyValue({ foo: "bar" });
      expect(result).toBe('{"foo":"bar"}');
    });

    it("should stringify responsive values correctly", () => {
      const result = stringifyValue({
        base: "red",
        md: "blue",
      });
      expect(result).toEqual({ base: "red", md: "blue" });
    });
  });
});
