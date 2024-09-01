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
import { responsive } from "../responsive/breakpoints";

// Mock the responsive function
jest.mock("../responsive/breakpoints", () => ({
  responsive: jest.fn((styles) => styles),
}));

jest.mock("../helper/isValidCSSUnit", () => ({
  __esModule: true,
  default: jest.fn((value) => {
    if (typeof value === "number") return true;
    return typeof value === "string" && /^[\d.]+(px|em|rem|%)$/.test(value);
  }),
}));

describe("Typography Module", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("fontSize", () => {
    it("should create a responsive fontSize property", () => {
      const result = fontSize("16px");
      expect(responsive).toHaveBeenCalledWith({ fontSize: "16px" });
      expect(result).toEqual({ fontSize: "16px" });
    });

    it("should handle responsive values", () => {
      const result = fontSize({ base: "16px", md: "18px" });
      expect(responsive).toHaveBeenCalledWith({
        fontSize: { base: "16px", md: "18px" },
      });
      expect(result).toEqual({ fontSize: { base: "16px", md: "18px" } });
    });

    it("should throw an error for invalid CSS values", () => {
      expect(() => fontSize("invalid")).toThrow("Invalid font size value");
    });
  });

  describe("fontWeight", () => {
    it("should create a responsive fontWeight property", () => {
      const result = fontWeight("bold");
      expect(responsive).toHaveBeenCalledWith({ fontWeight: "bold" });
      expect(result).toEqual({ fontWeight: "bold" });
    });

    it("should handle numeric font weights", () => {
      const result = fontWeight(700);
      expect(responsive).toHaveBeenCalledWith({ fontWeight: 700 });
      expect(result).toEqual({ fontWeight: 700 });
    });
  });

  describe("lineHeight", () => {
    it("should create a responsive lineHeight property", () => {
      const result = lineHeight(1.5);
      expect(responsive).toHaveBeenCalledWith({ lineHeight: 1.5 });
      expect(result).toEqual({ lineHeight: 1.5 });
    });

    it("should throw an error for invalid CSS values", () => {
      expect(() => lineHeight("invalid")).toThrow("Invalid line height value");
    });
  });

  describe("letterSpacing", () => {
    it("should create a responsive letterSpacing property", () => {
      const result = letterSpacing("0.1em");
      expect(responsive).toHaveBeenCalledWith({ letterSpacing: "0.1em" });
      expect(result).toEqual({ letterSpacing: "0.1em" });
    });

    it("should throw an error for invalid CSS values", () => {
      expect(() => letterSpacing("invalid")).toThrow(
        "Invalid letter-spacing value",
      );
    });
  });

  describe("textAlign", () => {
    it("should create a responsive textAlign property", () => {
      const result = textAlign("center");
      expect(responsive).toHaveBeenCalledWith({ textAlign: "center" });
      expect(result).toEqual({ textAlign: "center" });
    });
  });

  describe("textTransform", () => {
    it("should create a responsive textTransform property", () => {
      const result = textTransform("uppercase");
      expect(responsive).toHaveBeenCalledWith({ textTransform: "uppercase" });
      expect(result).toEqual({ textTransform: "uppercase" });
    });
  });

  describe("fontFamily", () => {
    it("should create a responsive fontFamily property", () => {
      const result = fontFamily("Arial, sans-serif");
      expect(responsive).toHaveBeenCalledWith({
        fontFamily: "Arial, sans-serif",
      });
      expect(result).toEqual({ fontFamily: "Arial, sans-serif" });
    });

    it("should throw an error for empty font family", () => {
      expect(() => fontFamily("")).toThrow("Font family cannot be empty");
    });
  });

  describe("textDecoration", () => {
    it("should create a responsive textDecoration property", () => {
      const result = textDecoration("underline");
      expect(responsive).toHaveBeenCalledWith({ textDecoration: "underline" });
      expect(result).toEqual({ textDecoration: "underline" });
    });
  });

  describe("fontStyle", () => {
    it("should create a responsive fontStyle property", () => {
      const result = fontStyle("italic");
      expect(responsive).toHaveBeenCalledWith({ fontStyle: "italic" });
      expect(result).toEqual({ fontStyle: "italic" });
    });
  });

  describe("createTypography", () => {
    it("should create a typography configuration with default values", () => {
      const result = createTypography("body", "16px");
      expect(result).toEqual({
        fontSize: "16px",
        fontWeight: "normal",
        textAlign: "left",
        lineHeight: 1.5,
      });
    });

    it("should create a typography configuration with custom values", () => {
      const result = createTypography("heading", "24px", "bold", "center");
      expect(result).toEqual({
        fontSize: "24px",
        fontWeight: "bold",
        textAlign: "center",
        lineHeight: 1.2,
        letterSpacing: "-0.02em",
      });
    });

    it("should throw an error for invalid preset", () => {
      expect(() => createTypography("invalid" as any, "16px")).toThrow(
        "Invalid typography preset",
      );
    });
  });
});
